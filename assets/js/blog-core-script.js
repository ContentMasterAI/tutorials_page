/**
 * Blog Widget Core Script
 * Namespace: BlogWidget
 * Version: 1.0.0
 */

(function(window, document) {
    'use strict';
    
    // Create namespace
    window.BlogWidget = window.BlogWidget || {};
    
    // Store instances to support multiple widgets on same page
    window.BlogWidget.instances = window.BlogWidget.instances || {};
    
    /**
     * Limit consecutive <br> tags in HTML
     */
    function limitConsecutiveBrTagsAdvanced(html) {
        if (!html || typeof html !== 'string') {
            return html || '';
        }
        
        let normalized = html
            .replace(/<br\s*\/?>/gi, '<br>')
            .replace(/<br\s*>/gi, '<br>');
        
        normalized = normalized
            .replace(/(<br>)[\s\r\n]*(<br>)/gi, '$1$2')
            .replace(/(<br>)[\s\r\n]*(<br>)[\s\r\n]*(<br>)/gi, '$1$2');
        
        normalized = normalized.replace(/(<br>){3,}/gi, '<br><br>');
        
        normalized = normalized
            .replace(/^(<br>)+/gi, '')
            .replace(/(<br>)+$/gi, '');
        
        return normalized;
    }
    
    /**
     * Copy content to clipboard with support for iOS and fallback methods
     */
    async function copyGeneratedContentToClipboard(containerElement) {
        async function getOriginalContentForCopy(element) {
            let contentToUse;
            const htmlContent = element.innerHTML;
            const matches = htmlContent.match(/<!-- original-content:(.*?) -->/);
            
            if (matches && matches[1]) {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = decodeURIComponent(matches[1]);
                contentToUse = tempDiv;
            } else {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = htmlContent;
                
                // Remove temporary elements
                const elementsToRemove = [
                    '.loading-indicator',
                    '.edit-alert',
                    '[id*="collapsible_"]',
                    'a[id$="_button"]'
                ];
                
                elementsToRemove.forEach(selector => {
                    const elements = tempDiv.querySelectorAll(selector);
                    elements.forEach(el => el.remove());
                });
                
                contentToUse = tempDiv;
            }

            const textContent = contentToUse.innerHTML
                .replace(/<br\s*\/?>/gi, '\n')
                .replace(/<\/p>/gi, '\n\n')
                .replace(/<\/div>/gi, '\n')
                .replace(/<\/h[1-6]>/gi, '\n\n')
                .replace(/<\/li>/gi, '\n')
                .replace(/<[^>]+>/g, '')
                .replace(/\n\s*\n\s*\n/g, '\n\n')
                .trim();

            let htmlForClipboard = contentToUse.innerHTML;
            
            // Convert images to base64
            const images = contentToUse.getElementsByTagName('img');
            for(let img of images) {
                try {
                    const response = await fetch(img.src);
                    const blob = await response.blob();
                    const base64 = await new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.onloadend = () => resolve(reader.result);
                        reader.readAsDataURL(blob);
                    });
                    htmlForClipboard = htmlForClipboard.replace(img.src, base64);
                } catch(err) {
                    console.warn('Failed to convert image to base64:', err);
                }
            }

            return {
                text: textContent,
                html: htmlForClipboard
            };
        }

        try {
            const content = await getOriginalContentForCopy(containerElement);
            const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
            
            if (isIOS) {
                const tempTextArea = document.createElement('textarea');
                tempTextArea.value = content.text;
                tempTextArea.contentEditable = true;
                tempTextArea.readOnly = false;
                
                tempTextArea.style.position = 'fixed';
                tempTextArea.style.left = '-9999px';
                tempTextArea.style.top = '0';
                tempTextArea.style.opacity = '0';
                
                document.body.appendChild(tempTextArea);
                
                const range = document.createRange();
                range.selectNodeContents(tempTextArea);
                
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
                
                tempTextArea.setSelectionRange(0, content.text.length);
                
                try {
                    document.execCommand('copy');
                    showCopyNotification(containerElement);
                } catch(err) {
                    console.error('iOS copy failed:', err);
                    alert('Copy failed. Please try selecting and copying manually.');
                }
                
                document.body.removeChild(tempTextArea);
                selection.removeAllRanges();
                
            } else {
                const clipboardItems = [
                    new ClipboardItem({
                        'text/plain': new Blob([content.text], { type: 'text/plain' }),
                        'text/html': new Blob([content.html], { type: 'text/html' })
                    })
                ];

                await navigator.clipboard.write(clipboardItems);
                showCopyNotification(containerElement);
            }

        } catch(err) {
            console.error('Copy failed:', err);
            
            try {
                const content = await getOriginalContentForCopy(containerElement);
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    await navigator.clipboard.writeText(content.text);
                    showCopyNotification(containerElement, true);
                } else {
                    throw new Error('Clipboard API not available');
                }
            } catch(clipErr) {
                console.error('All copy methods failed:', clipErr);
                alert('Copy failed. Please try selecting and copying manually.');
            }
        }
    }

    /**
     * Show copy notification
     */
    function showCopyNotification(containerElement, textOnly = false) {
        const widgetContainer = containerElement.closest('.blog-widget');
        if (!widgetContainer) return;
        
        const notification = widgetContainer.querySelector('.copy-notification');
        if (!notification) return;
        
        const title = notification.querySelector('.title');
        if (title) {
            title.textContent = textOnly ? 'Content Copied (Text Only)!' : 'Content Copied Successfully!';
        }
        
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 5000);
    }
    
    /**
     * Process URLs in content
     */
    function processUrls(content) {
        const urlListPattern = /(-\s*(?:<[^>]*>)?https?:\/\/[^<\s]+(?:<\/[^>]*>)?)/gi;
        const urlMatches = content.match(urlListPattern);
        
        if (urlMatches && urlMatches.length >= 2) {
            content = content.replace(urlListPattern, '<br>$1');
            content = content.replace(/^<br>/, '');
        } else {
            const consecutiveUrlPattern = /(https?:\/\/[^\s<>"']+)(\s*[^\w\s<]*\s*)(https?:\/\/[^\s<>"']+)/gi;
            
            content = content.replace(consecutiveUrlPattern, function(match, url1, separator, url2) {
                if (!separator.includes('<br>')) {
                    return url1 + '<br>' + separator + url2;
                }
                return match;
            });
        }
        
        content = content.replace(/(<br>\s*){2,}/gi, '<br>');
        
        const urlRegex = /(?<!<[^>]*)(https?:\/\/[^\s<>"']+)(?![^<]*>)/gi;
        
        content = content.replace(urlRegex, function(match, url) {
            const beforeUrl = content.substring(0, content.indexOf(match));
            const openLinksBefore = (beforeUrl.match(/<a\b[^>]*>/gi) || []).length;
            const closeLinksBefore = (beforeUrl.match(/<\/a>/gi) || []).length;
            
            if (openLinksBefore > closeLinksBefore) {
                return match;
            }
            
            const cleanUrl = url.replace(/[.,;:!?]*$/, '');
            const trailingPunc = url.substring(cleanUrl.length);
            
            return `<a href="${cleanUrl}" target="_blank" rel="noopener noreferrer">${cleanUrl}</a>${trailingPunc}`;
        });
        
        return content;
    }

    /**
     * Convert basic markdown to HTML
     */
    function markdownToHtml(text) {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/__(.*?)__/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/_(.*?)_/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code>$1</code>')
            .replace(/\n\n/g, '<br><br>')
            .replace(/\n/g, '<br>');
    }

    /**
     * Parse HTML content
     */
    function parseContentHtml(html) {
        if (typeof html !== 'string') {
            console.error('Input must be an HTML string');
            return { title: '', sections: [] };
        }
        
        try {
            const result = {
                title: '',
                sections: []
            };

            // Find title
            const titleMatch = html.match(/\[\[TITLE:\s*(.*?)\s*\]\]/);
            if (titleMatch && titleMatch[1] && titleMatch[1].trim()) {
                const titleWithTags = titleMatch[1].trim();
                let cleanTitle = titleWithTags;
                if (typeof document !== 'undefined') {
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = titleWithTags;
                    cleanTitle = tempDiv.textContent || tempDiv.innerText || titleWithTags;
                } else {
                    cleanTitle = titleWithTags.replace(/<[^>]*>/g, '');
                }
                result.title = cleanTitle;
            } else {
                const titleFallback = html.match(/\[\[TITLE:\s*([^\]]+)\s*\]\]/);
                if (titleFallback && titleFallback[1] && titleFallback[1].trim()) {
                    const titleWithTags = titleFallback[1].trim();
                    let cleanTitle = titleWithTags;
                    if (typeof document !== 'undefined') {
                        const tempDiv = document.createElement('div');
                        tempDiv.innerHTML = titleWithTags;
                        cleanTitle = tempDiv.textContent || tempDiv.innerText || titleWithTags;
                    } else {
                        cleanTitle = titleWithTags.replace(/<[^>]*>/g, '');
                    }
                    result.title = cleanTitle;
                } else {
                    const markdownTitleMatch = html.match(/^#\s+(.+)/m);
                    if (markdownTitleMatch && markdownTitleMatch[1] && markdownTitleMatch[1].trim()) {
                        result.title = markdownTitleMatch[1].trim();
                    }
                }
            }

            // Parse sections
            const allSections = [];
            let sectionCount = 0;
            const skipTitles = ['Introduction', 'Conclusion', 'References'];

            // Find HTML sections
            const htmlSectionRegex = /###\s*(.*?)(?=###|##|<strong>Section\s+\d+:|$)/gs;
            let htmlMatch;

            while ((htmlMatch = htmlSectionRegex.exec(html)) !== null) {
                if (htmlMatch[1]) {
                    let sectionContent = htmlMatch[1].trim();
                    const sectionLines = sectionContent.split('\n');
                    let sectionTitle = sectionLines[0].trim();
                    
                    sectionTitle = sectionTitle.replace(/^[#\s]+/, '').trim();
                    
                    const remainingContent = sectionContent.substring(sectionLines[0].length).trim();
                    sectionContent = `<h3>${sectionTitle}</h3>${remainingContent ? '\n\n' + remainingContent : ''}`;
                    
                    sectionContent = sectionContent.replace(/[\r\n]*\s*---\s*[\r\n]*/g, '\n\n');
                    sectionContent = sectionContent.replace(/\n{3,}/g, '\n\n');
                    sectionContent = sectionContent.trim();
                    
                    sectionContent = processUrls(sectionContent);
                    
                    allSections.push({
                        type: 'html',
                        title: sectionTitle,
                        content: sectionContent,
                        position: htmlMatch.index
                    });
                }
            }

            // Find Markdown sections
            const lines = html.split('\n');
            let currentMarkdownSection = null;
            let currentPosition = 0;

            for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                const markdownMatch = line.match(/^##\s+(.+)$/);
                
                if (i > 0) {
                    currentPosition += lines[i-1].length + 1;
                }
                
                if (markdownMatch) {
                    if (currentMarkdownSection) {
                        let cleanTitle = currentMarkdownSection.title.replace(/^[#\s]+/, '').trim();
                        let processedContent = `<h2>${cleanTitle}</h2>\n\n${currentMarkdownSection.content.trim()}`;
                        
                        processedContent = processedContent.replace(/[\r\n]*\s*---\s*[\r\n]*/g, '\n\n');
                        processedContent = processedContent.replace(/\n{3,}/g, '\n\n');
                        processedContent = processedContent.trim();
                        
                        processedContent = processUrls(processedContent);
                        processedContent = markdownToHtml(processedContent);
                        
                        allSections.push({
                            type: 'markdown',
                            title: cleanTitle,
                            content: processedContent,
                            position: currentMarkdownSection.position
                        });
                    }
                    
                    currentMarkdownSection = {
                        title: markdownMatch[1].trim(),
                        content: '',
                        position: currentPosition
                    };
                } else if (currentMarkdownSection) {
                    if (!line.match(/^###\s+/) && !line.match(/<strong>Section\s+\d+:/)) {
                        if (currentMarkdownSection.content) {
                            currentMarkdownSection.content += '\n';
                        }
                        currentMarkdownSection.content += line;
                    }
                }
            }

            // Handle last markdown section
            if (currentMarkdownSection) {
                let cleanTitle = currentMarkdownSection.title.replace(/^[#\s]+/, '').trim();
                let processedContent = `<h2>${cleanTitle}</h2>\n\n${currentMarkdownSection.content.trim()}`;
                
                processedContent = processedContent.replace(/[\r\n]*\s*---\s*[\r\n]*/g, '\n\n');
                processedContent = processedContent.replace(/\n{3,}/g, '\n\n');
                processedContent = processedContent.trim();
                
                processedContent = processUrls(processedContent);
                processedContent = markdownToHtml(processedContent);
                
                allSections.push({
                    type: 'markdown',
                    title: cleanTitle,
                    content: processedContent,
                    position: currentMarkdownSection.position
                });
            }

            // Find strong sections
            const strongSectionRegex = /<strong>Section\s+\d+:\s*(.*?)<\/strong>/gi;
            const strongMatches = [...html.matchAll(strongSectionRegex)];

            strongMatches.forEach((match) => {
                if (match[1]) {
                    let sectionTitle = match[1].trim();
                    sectionTitle = sectionTitle.replace(/^[#\s]+/, '').trim();
                    
                    const headerStart = match.index;
                    const headerEnd = match.index + match[0].length;
                    const remainingText = html.substring(headerEnd);
                    
                    let nextSectionStart = remainingText.search(/<strong>Section\s+\d+:/);
                    if (nextSectionStart === -1) {
                        nextSectionStart = remainingText.length;
                    }
                    
                    let sectionContent = remainingText.substring(0, nextSectionStart).trim();
                    
                    sectionContent = sectionContent.replace(/[\r\n]*\s*---\s*[\r\n]*/g, '\n\n');
                    sectionContent = sectionContent.replace(/\n{3,}/g, '\n\n');
                    sectionContent = sectionContent.trim();
                    
                    const titleHtml = `<strong>${sectionTitle}</strong>`;
                    sectionContent = titleHtml + '\n\n' + sectionContent;
                    
                    sectionContent = processUrls(sectionContent);
                    
                    allSections.push({
                        type: 'strong',
                        title: sectionTitle,
                        content: sectionContent,
                        position: headerStart
                    });
                }
            });

            // Sort sections by position
            allSections.sort((a, b) => a.position - b.position);

            // Process sections
            allSections.forEach(section => {
                const shouldBeNumbered = !skipTitles.some(skipTitle => 
                    section.title.toLowerCase().trim() === skipTitle.toLowerCase()
                );
                
                const sectionNumber = shouldBeNumbered ? ++sectionCount : '';
                
                let finalContent = section.content;
                
                // Clean excessive <br> tags
                finalContent = finalContent.replace(/(<br\s*\/?>[\s\r\n]*){3,}/gi, '<br><br>');
                finalContent = finalContent.replace(/<br\s*\/?>\s*(<figure|<\/figure|<img|<figcaption|<\/figcaption)/gi, '$1');
                finalContent = finalContent.replace(/(figure>|\/figcaption>)\s*<br\s*\/?>/gi, '$1');
                finalContent = finalContent.replace(/<br\s*\/?>\s*(<h[1-6]|<\/h[1-6]|<div|<\/div|<p|<\/p|<strong>)/gi, '$1');
                finalContent = finalContent.replace(/(h[1-6]>|\/div>|\/p>|\/strong>)\s*<br\s*\/?>/gi, '$1');
                finalContent = finalContent.replace(/^(<br\s*\/?>[\s\r\n]*)+/i, '');
                finalContent = finalContent.replace(/(<br\s*\/?>[\s\r\n]*)+$/i, '');
                finalContent = finalContent.replace(/(<br\s*\/?>[\s\r\n]*){3,}/gi, '<br><br>');
                
                // Clean URL lists
                finalContent = finalContent.replace(/(<br>\s*-\s*(?:<[^>]*>)*<a[^>]*>https?:\/\/[^<]+<\/a>(?:<\/[^>]*>)*[^<\r\n]*)\s*[\r\n]+\s*(<br>\s*-)/gi, '$1\n$2');
                finalContent = finalContent.replace(/(<h[1-6]>[^<]+<\/h[1-6]>|<strong>[^<]+<\/strong>)\s*(<br>\s*){2,}(\s*<br>\s*-\s*(?:<[^>]*>)*<a)/gi, '$1<br>$3');
                finalContent = finalContent.replace(/<(h[1-6])[^>]*><strong><\1[^>]*>([^<]+)<\/\1><\/strong><\/\1>/gi, '<$1>$2</$1>');
                
                result.sections.push({
                    title: section.title,
                    content: finalContent,
                    id: 'section-' + result.sections.length,
                    number: sectionNumber,
                    type: section.type
                });
            });

            return result;

        } catch (error) {
            console.error('Error parsing HTML content:', error);
            return { title: '', sections: [] };
        }
    }
    
    /**
     * Render content HTML simple
     */
    function renderContentHtmlSimple(raw_html) {
        let parsedContent = parseContentHtml(raw_html);
        if (!parsedContent || !Array.isArray(parsedContent.sections)) {
            return raw_html;
        }
        
        if (!parsedContent.title || !parsedContent.title.trim()) {
            return raw_html;
        }
        
        let html = '';
        html += `<h3>${parsedContent.title.trim()}</h3>`;
        
        parsedContent.sections.forEach(section => {
            if (section && section.content) {
                html += section.content.trim();
            }
        });
        return limitConsecutiveBrTagsAdvanced(html.trim());
    }
    
    /**
     * Create edit alert box
     */
    function createEditAlert() {
        const alertElement = document.createElement('div');
        // alertElement.className = 'edit-alert';
        
        // alertElement.innerHTML = `
        //     <div class="edit-alert-icon">✏️</div>
        //     <div class="edit-alert-content">
        //         <div class="edit-alert-title">Want to Make Changes?</div>
        //         <div class="edit-alert-text">You can edit both images and text content in your dashboard</div>
        //     </div>
        //     <br>
        //     <button class="edit-alert-button" onclick="window.open('https://contentmaster.ai/login.html?auth_screen=signin', '_blank')">
        //         Go to Dashboard
        //     </button>
        // `;
        
        return alertElement;
    }
    
    /**
     * Show error messages
     */
    function showError(containerElement, message) {
        const loadingIndicator = containerElement.querySelector('.loading-indicator');
        if (loadingIndicator) {
            loadingIndicator.style.display = 'none';
        }
        
        const errorContainer = document.createElement('div');
        errorContainer.className = 'error-container';
        errorContainer.innerHTML = `
            <p><strong>Unable to load content</strong></p>
            <p>${message}</p>
        `;
        
        containerElement.appendChild(errorContainer);
    }
    
    /**
     * Process content after loading
     */
    function processContent(contentElement) {
        const images = contentElement.querySelectorAll('img');
        images.forEach(img => {
            img.setAttribute('loading', 'lazy');
            img.style.maxWidth = '100%';
            img.onerror = function() {
                this.src = '/api/placeholder/800/400';
                this.alt = 'Temporary image';
            };
        });
        
        const iframes = contentElement.querySelectorAll('iframe');
        iframes.forEach(iframe => {
            const wrapper = document.createElement('div');
            wrapper.className = 'embed-container';
            
            const parent = iframe.parentNode;
            parent.insertBefore(wrapper, iframe);
            wrapper.appendChild(iframe);
        });
        
        const links = contentElement.querySelectorAll('a');
        links.forEach(link => {
            if (link.hostname !== window.location.hostname) {
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
            }
        });
        
        const tables = contentElement.querySelectorAll('table');
        tables.forEach(table => {
            if (!table.parentNode.classList.contains('table-responsive')) {
                const wrapper = document.createElement('div');
                wrapper.className = 'table-responsive';
                wrapper.style.overflowX = 'auto';
                table.parentNode.insertBefore(wrapper, table);
                wrapper.appendChild(table);
            }
        });
        
        const sectionTitles = contentElement.querySelectorAll('h3');
        sectionTitles.forEach(title => {
            title.style.fontWeight = '700';
            title.style.fontSize = '26px';
            title.style.marginBottom = '20px';
            
            if (title.hasAttribute('data-number') && title.getAttribute('data-number') !== '') {
                title.classList.add('numbered-title');
            }
            
            const parent = title.parentNode;
            const nextSibling = title.nextSibling;
            const br = document.createElement('br');
            
            if (nextSibling) {
                parent.insertBefore(br, nextSibling);
            } else {
                parent.appendChild(br);
            }
        });
    }
    
    /**
     * Create Table of Contents
     */
    function createTableOfContents(sections) {
        if (!sections || sections.length === 0) return null;
        
        const tocElement = document.createElement('div');
        tocElement.className = 'table-of-contents';
        
        const tocTitle = document.createElement('h3');
        tocTitle.textContent = 'Table of Contents';
        tocElement.appendChild(tocTitle);
        
        const tocList = document.createElement('ul');
        
        sections.forEach(section => {
            const listItem = document.createElement('li');
            
            if (section.number) {
                listItem.setAttribute('data-number', section.number);
            }
            
            const link = document.createElement('a');
            link.href = '#' + section.id;
            link.innerHTML = section.title;
            listItem.appendChild(link);
            tocList.appendChild(listItem);
        });
        
        tocElement.appendChild(tocList);
        return tocElement;
    }
    
    /**
     * Create structured content
     */
    function createStructuredContent(parsedContent) {
        const fragment = document.createDocumentFragment();
        
        if (parsedContent.title) {
            const titleElement = document.createElement('h1');
            titleElement.className = 'blog-title';
            titleElement.textContent = parsedContent.title;
            fragment.appendChild(titleElement);
        }
        
        if (parsedContent.sections.length > 0) {
            const tocElement = createTableOfContents(parsedContent.sections);
            if (tocElement) {
                fragment.appendChild(tocElement);
            }
        } else {
            const editAlert = createEditAlert();
            fragment.appendChild(editAlert);
        }
        
        parsedContent.sections.forEach(section => {
            const sectionElement = document.createElement('div');
            sectionElement.id = section.id;
            sectionElement.className = 'blog-section';
            
            let modifiedContent = section.content;
            const firstLineEnd = modifiedContent.indexOf('\n');
            if (firstLineEnd !== -1) {
                const title = modifiedContent.substring(0, firstLineEnd);
                let boldTitle = title;
                if (!title.includes('<strong>') && !title.includes('<b>')) {
                    boldTitle = '<strong>' + title + '</strong>';
                }
                
                let titleHtml;
                if (section.number) {
                    titleHtml = `<h3 class="numbered-title" data-number="${section.number}">${boldTitle}</h3>`;
                } else {
                    titleHtml = `<h3>${boldTitle}</h3>`;
                }
                
                modifiedContent = titleHtml + '<br>' + modifiedContent.substring(firstLineEnd);
            }
            
            const contentElement = document.createElement('div');
            contentElement.className = 'blog-content';
            contentElement.innerHTML = modifiedContent;
            
            sectionElement.appendChild(contentElement);
            fragment.appendChild(sectionElement);
        });

        const editAlert = createEditAlert();
        fragment.appendChild(editAlert);
        
        return fragment;
    }

    /**
     * Main Blog Widget Class
     */
    function BlogWidget(containerId, options = {}) {
        this.containerId = containerId;
        this.container = document.getElementById(containerId);
        this.options = Object.assign({
            apiUrl: 'https://contentmaster.ai/app/dashboard/get_content',
            topicId: null,
            companyId: '',
            showCopyButton: true
        }, options);
        
        if (!this.container) {
            console.error('Blog Widget: Container not found:', containerId);
            return;
        }
        
        // Add widget class and setup
        this.container.classList.add('blog-widget');
        this.setupWidget();
        
        // Store instance
        window.BlogWidget.instances[containerId] = this;
    }
    
    BlogWidget.prototype.setupWidget = function() {
        // Create widget structure
        this.container.innerHTML = `
            ${this.options.showCopyButton ? `
            <button class="copy-button" onclick="BlogWidget.instances['${this.containerId}'].copyContent()">
                <svg class="copy-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                </svg>
                Copy
            </button>
            ` : ''}
            <div class="blog-container">
                <div class="loading-indicator">
                    <div class="spinner"></div>
                    <p>Loading content...</p>
                </div>
            </div>
            <div class="copy-notification">
                <div class="title">Content Copied Successfully!</div>
                <div class="warning">⚠️ Note: Images will only be accessible for 7 days. Please upload them to your own server for permanent hosting.</div>
            </div>
        `;
        
        this.blogContainer = this.container.querySelector('.blog-container');
    };
    
    BlogWidget.prototype.loadContent = function(topicId, companyId = '') {
        this.options.topicId = topicId;
        this.options.companyId = companyId || '';
        
        if (!topicId) {
            showError(this.blogContainer, "No topic_id provided. Please provide a valid topic_id.");
            return;
        }
        
        this.fetchContent();
    };
    
    BlogWidget.prototype.fetchContent = function() {
        const loadingIndicator = this.blogContainer.querySelector('.loading-indicator');
        if (loadingIndicator) {
            loadingIndicator.style.display = 'flex';
        }
        
        const xhr = new XMLHttpRequest();
        xhr.open('POST', this.options.apiUrl, true);
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        
        const self = this;
        
        xhr.onload = function() {
            if (loadingIndicator) {
                loadingIndicator.style.display = 'none';
            }
            
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    const response = JSON.parse(xhr.responseText);
                    
                    if (response && response.html) {
                        self.renderContent(response.html);
                    } else {
                        showError(self.blogContainer, "No HTML content found in server response.");
                    }
                    
                } catch (error) {
                    console.error("Error parsing response:", error);
                    showError(self.blogContainer, "Unable to parse server response. Error details: " + error.message);
                }
            } else {
                console.error("Server error:", xhr.status);
                showError(self.blogContainer, `Server error (${xhr.status}): Unable to connect to server or server rejected the request.`);
            }
        };
        
        xhr.onerror = function() {
            console.error("Network error");
            if (loadingIndicator) {
                loadingIndicator.style.display = 'none';
            }
            showError(self.blogContainer, "Network connection error. Please check your internet connection and try again.");
        };
        
        xhr.ontimeout = function() {
            console.error("Request timed out");
            if (loadingIndicator) {
                loadingIndicator.style.display = 'none';
            }
            showError(self.blogContainer, "Request timed out. Please try again later.");
        };
        
        const data = JSON.stringify({
            topic_id: this.options.topicId,
            company_id: this.options.companyId
        });
        
        xhr.send(data);
    };
    
    BlogWidget.prototype.renderContent = function(htmlContent) {
        const processedHtml = renderContentHtmlSimple(htmlContent);
        
        if (processedHtml === htmlContent) {
            // No title found, display original content
            const contentElement = document.createElement('div');
            contentElement.className = 'blog-content';
            
            const editAlert = createEditAlert();
            
            contentElement.innerHTML = limitConsecutiveBrTagsAdvanced(htmlContent);
            processContent(contentElement);
            contentElement.innerHTML = limitConsecutiveBrTagsAdvanced(contentElement.innerHTML);
            
            this.blogContainer.innerHTML = '';
            this.blogContainer.appendChild(editAlert);
            this.blogContainer.appendChild(contentElement);
        } else {
            // Title found, create structured content
            const parsedContent = parseContentHtml(htmlContent);
            const structuredContent = createStructuredContent(parsedContent);
            
            this.blogContainer.innerHTML = '';
            this.blogContainer.appendChild(structuredContent);
            
            processContent(this.blogContainer);
            this.blogContainer.innerHTML = limitConsecutiveBrTagsAdvanced(this.blogContainer.innerHTML);
        }
        
        // Set page title if available
        const parsedForTitle = parseContentHtml(htmlContent);
        if (parsedForTitle.title) {
            document.title = parsedForTitle.title;
        }
    };
    
    BlogWidget.prototype.copyContent = function() {
        copyGeneratedContentToClipboard(this.blogContainer);
    };
    
    // Export to namespace
    window.BlogWidget.create = function(containerId, options) {
        return new BlogWidget(containerId, options);
    };
    
    window.BlogWidget.loadContent = function(containerId, topicId, companyId) {
        const instance = window.BlogWidget.instances[containerId];
        if (instance) {
            instance.loadContent(topicId, companyId);
        } else {
            console.error('Blog Widget instance not found for container:', containerId);
        }
    };
    
})(window, document);