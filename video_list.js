const video_list = [
    {
        lang: "en",
        videos: [
            {
                category: "beginner",
                list: [
                    {id: "vsbHF4ZunFs", url: "https://youtube.com/shorts/x15m_HhksKA?feature=share", title: "Create your first video - Quick mode", desc: "Quickly create a video about a specific idea or topic with just a few clicks."},
                    {id: "olQnZ2i-h4c", url: "https://youtube.com/shorts/7hOass3AIvY", title: "Create your first video - Advance mode", desc: "Create your first video with ContentMaster in minutes using Deep Research."},
                    {id: "B3FmoA7UuiU", url: "https://youtube.com/shorts/Yc3Q88CsaFA?feature=share", title: "Create your first post or SEO blog", desc: "Have you ever spent hours writing a blog post only to feel dissatisfied with the result?"},
                    {id: "yinM7vhyS0E", url: "https://youtube.com/shorts/PxxWmLs1vF0?feature=share", title: "Create tutorial, training videos from scratch", desc: "78% of users prefer watching tutorial videos"},
                    {id: "roboWZ9XGVI", url: "https://youtube.com/shorts/5aK3uIDfkhc?feature=share", title: "Enhance existing tutorial, training, education videos", desc: "Translate, avatar and more."}
                ]
            },
            {
                category: "advanced",
                list: [
                    {id: "bs4NmU9Mkao", url: "https://youtube.com/shorts/VcToH_MWqGI?feature=share", title: "Create your avatar with hair and clothing templates", desc: "Your professional appearance is just as important as your voice and the content of your video. "},
                    {id: "_eLtLvtmk7o", url: "https://youtube.com/shorts/gM8UxNoWzYs?feature=share", title: "Set up voice cloning for your avatar", desc: "Did you know that you can create a digital version of yourself for videos without standing in front of a camera?"},
                    {id: "FdigGWyc52I", url: "https://youtube.com/shorts/fJI66zpa7Fc", title: "Generate thumbnails with AI", desc: "Did you know? Over 90% of viewers decide to click on your video based on the thumbnail."},
                    {id: "QTOVIywMcS8", url: "https://youtube.com/shorts/IjM1Zvmf1ac", title: "Edit video scenes with Scene builder", desc: "You do not need to be a video editing expert to create high-quality content. "},
                    {id: "BMMh5AbY4BE", url: "https://youtube.com/shorts/qz-cLUWjgkk?feature=share", title: "Translate or dubbing a video", desc: "Did you know that 60% of potential customers will leave if they cannot find content in their own language? "},
                    {id: "gzn0AY2y3J4", url: "https://youtube.com/shorts/fOk-lgOLH-k?feature=share", title: "Schedule content production for the entire week", desc: "Platforms that prioritize creators who post regularly make it essential to maintain a consistent content schedule."},
                    {id: "YFB8SuytbTU", url: "https://youtu.be/f8w6XhXJ0pw", title: "Combine ContentMaster Deep Research and Google VEO", desc: "For videos with good storylines, realistic illustrations, market data, and useful knowledge for your audience."},
                    {id: "Hrb0ty8Q7Zc", url: "https://youtube.com/shorts/FY9-jFWrrZ4", title: "Use Google VEO/Kling AI for scenes", desc: "Make illustrative videos for each scene more vivid and engaging."},
                    {id: "UJSLK9jMMuc", url: "https://youtube.com/shorts/vj0ZpfAcozw?feature=share", title: "Use custom audio from ElevenLabs/SUNO", desc: "You can utilize audio sources with voice from third parties such as ElevenLabs or even music like SUNO to lipsync for your avatar."},
                    {id: "NdmoNBau5WM", url: "https://youtube.com/shorts/MNDuGjgv4O4?feature=share", title: "How to record your screen using QuickTime/OBS", desc: "Here's how you can use free software along with ContentMaster to create professional and quick tutorial videos."},
                    {id: "o0EbSwhyaqk", url: "https://youtube.com/shorts/kJqyPLLu5iE?feature=share", title: "Merge audio files using QuickTime", desc: "Here's how to quickly and easily merge multiple audio files using QuickTime for free."},
                    {id: "7P8iWB71OTE", url: "https://youtube.com/shorts/1pqmE6qatpM?feature=share", title: "Compress screen record files using HandBrake", desc: "Here's how you can use HandBrake for free to reduce their size."}
                ]
            },
            {
                category: "daily_usage",
                list: [
                    {id: "rOMIqwHQj1o", url: "https://youtube.com/shorts/OShzjOoxigc", title: "Turn trending topics into videos", desc: "Have you ever felt like you are creating content that no one sees? "},
                    {id: "Lgz0PNhswiI", url: "https://youtube.com/shorts/yPWbH-Laog8?feature=share", title: "Turn video into great video", desc: "Transform a dull video into a captivating masterpiece that attracts customers with ContentMaster."},
                    {id: "l-MxW6gZJwo", url: "https://youtube.com/shorts/3_VgwfV4Lgo?feature=share", title: "Remix a video into a masterpiece", desc: "Remix a video to make it more engaging with ContentMaster. "},
                    {id: "_64YZlksOWA", url: "https://youtube.com/shorts/O1cMrcaFBXU?feature=share", title: "Transforming a video into an SEO article", desc: "Transforming a video into an SEO article for your website has never been easier with ContentMaster."},
                    {id: "ji-J4YHzOuc", url: "https://youtube.com/shorts/dhQTHaeK9d4?feature=share", title: "Transform a blog into blog++", desc: "Elevate an SEO article to new heights with the latest market data, illustrative images, and Google search optimization, all with just a few clicks"},
                    {id: "iUgVijDujso", url: "https://youtube.com/shorts/GQRCNB5sr8A?feature=share", title: "Turn a social media post into a video", desc: "While browsing social media, you will undoubtedly come across fascinating content or brilliant ideas that you wish to transform into a video, correct?"},
                    {id: "r_Ax3v14fLA", url: "https://youtube.com/shorts/RhoRN8KIJS0?feature=share", title: "Turn a blog into a video", desc: "Transform a blog post into a video in just a few minutes with ContentMaster."},
                    {id: "0lcRf7zKnDA", url: "https://youtube.com/shorts/0lcRf7zKnDA?feature=share", title: "How contentMaster splits scenes", desc: "Here is an example of scene separation based on narration."},
                    {id: "IcHDIr1Rswc", url: "https://youtube.com/shorts/nqzLqe1coIk?feature=share", title: "Create Vlog, POV, faceless video", desc: "Here's how to create a faceless vlog with a natural, expressive voice without spending too much time using ContentMaster."},
                    {id: "yYIQawHFEsM", url: "https://youtu.be/g-5VLyRIhro", title: "The output of the Vlog/POV/Faceless tutorial", desc: "Output of the Vlog, POV, faceless video creation tutorial"},
                    {id: "pyYFObpw6xY", url: "https://youtube.com/shorts/4RDfaMMIpUo", title: "Zoom Effect for Tutorial Videos", desc: "Three steps to quickly create a tutorial video, featuring a zoom effect, professional voiceover, and a chatbot that learns from the video."},
                    {id: "S3s8x3Db-z0", url: "https://youtube.com/shorts/9hNBD2kcXdc?feature=share", title: "Create Product usage guides or assembly video", desc: "Three steps to quickly create a product assembly tutorial video along with a self-learning chatbot for customer inquiries using ContentMaster"}
                ]
            }
        ]
    },
    {
        lang: "vi",
        videos: [
            {
                category: "beginner",
                list: [
                    {id: "vsbHF4ZunFs", url: "https://youtube.com/shorts/vsbHF4ZunFs?feature=share", title: "Tạo video đầu tiên - Chế độ nhanh", desc: "Tạo nhanh một video về một ý tưởng hoặc chủ đề cụ thể chỉ với vài cú click chuột."},
                    {id: "olQnZ2i-h4c", url: "https://youtube.com/shorts/olQnZ2i-h4c?feature=share", title: "Tạo video đầu tiên - Chế độ nâng cao", desc: "Tạo nhanh một video với các tùy chỉnh nâng cao cùng deep research."},
                    {id: "B3FmoA7UuiU", url: "https://youtube.com/shorts/B3FmoA7UuiU?feature=share", title: "Tạo post mạng xã hội hoặc SEO blog đầu tiên", desc: "Đã bao giờ bạn mất hàng giờ để viết một bài blog mà vẫn không hài lòng?"},
                    {id: "yinM7vhyS0E", url: "https://youtube.com/shorts/yinM7vhyS0E?feature=share", title: "Làm tutorial, training, education videos từ đầu", desc: "Bạn có biết rằng 78% người dùng thích xem video hướng dẫn hơn là đọc tài liệu?"},
                    {id: "roboWZ9XGVI", url: "https://youtube.com/shorts/roboWZ9XGVI?feature=share", title: "Nâng cấp tutorial, training, education videos hiện có", desc: "Chuyển ngữ, add thêm avatar, nhạc nền cùng nhiều tuỳ chọn khác."},
                ]
            },
            {
                category: "advanced",
                list: [
                    {id: "bs4NmU9Mkao", url: "https://youtube.com/shorts/bs4NmU9Mkao", title: "Tạo avatar gương mặt bạn với thư viện mẫu tóc, quần áo", desc: "Thiết lập avatar với gương mặt và giọng nói của bạn cùng hàng trăm mẫu quần áo và kiểu tóc."},
                    {id: "_eLtLvtmk7o", url: "https://youtube.com/shorts/_eLtLvtmk7o", title: "Nhân bản giọng nói của bạn cho avatar", desc: "Dùng giọng nói của bạn để truyền đạt thông tin trong video, tăng nhận diện thương hiệu cá nhân."},
                    {id: "FdigGWyc52I", url: "https://youtube.com/shorts/FdigGWyc52I", title: "Tạo thumbnail với AI", desc: "Bạn có biết không? Hơn 90% người xem quyết định click vào video của bạn dựa trên thumbnail"},
                    {id: "BMMh5AbY4BE", url: "https://youtube.com/shorts/BMMh5AbY4BE?feature=share", title: "Tạo nhiều phiên bản ngôn ngữ cho video", desc: "Bạn có biết rằng 60% khách hàng tiềm năng sẽ rời đi nếu không tìm thấy nội dung bằng ngôn ngữ của họ?"},
                    {id: "gzn0AY2y3J4", url: "https://youtube.com/shorts/gzn0AY2y3J4?feature=share", title: "Lên lịch sản xuất nội dung cho cả tuần", desc: "Các nền tảng ưu tiên người sáng tạo đăng tải thường xuyên nên việc đăng tải nội dung đều đặn là rất quan trọng."},
                    {id: "QTOVIywMcS8", url: "https://youtube.com/shorts/QTOVIywMcS8?feature=share", title: "Chỉnh sửa video với Scene builder", desc: "Bạn không cần phải là chuyên gia edit video để tạo ra nội dung chất lượng cao."},
                    {id: "YFB8SuytbTU", url: "https://youtube.com/shorts/YFB8SuytbTU?feature=share", title: "Kết hợp ContenMaster Deep Research và Google VEO", desc: "Cho video có storyline tốt, minh họa chân thực, dữ liệu thị trường, kiến thức bổ ích cho khán giả của bạn."},
                    {id: "Hrb0ty8Q7Zc", url: "https://youtube.com/shorts/Hrb0ty8Q7Zc?feature=share", title: "Dùng Google VEO/Kling AI cho scene", desc: "Làm video minh họa cho từng scene trở nên sống động hơn."},
                    {id: "UJSLK9jMMuc", url: "https://youtube.com/shorts/UJSLK9jMMuc?feature=share", title: "Dùng custom audio từ ElevenLabs/SUNO", desc: "Bạn có thể sử dụng các nguồn âm thanh có giọng nói đến từ các bên thứ ba."},
                    {id: "NdmoNBau5WM", url: "https://youtube.com/shorts/NdmoNBau5WM?feature=share", title: "Cách ghi hình hoặc screen record chuẩn bằng QuickTime/OBS", desc: "Hướng dẫn cách dùng các phần mềm miễn phí như QuickTime hay OBS ghi màn hình chuẩn dùng cho ContentMaster"},
                    {id: "o0EbSwhyaqk", url: "https://youtube.com/shorts/o0EbSwhyaqk?feature=share", title: "Nối nhiều audio files bằng QuickTime", desc: "Nối nhiều file audio để upload lên ContentMaster"},
                    {id: "7P8iWB71OTE", url: "https://youtube.com/shorts/7P8iWB71OTE?feature=share", title: "Nén các file screen record bằng HandBrake", desc: "Nén file khi nó quá lớn để có thể upload lên ContentMaster"},
                    {id: "43Y7fkKA-mU", url: "https://youtube.com/shorts/43Y7fkKA-mU?feature=share", title: "ContentMaster tách các scene tự động thế nào?", desc: "Here is an example of scene separation based on narration."}
                ]
            },
            {
                category: "daily_usage",
                list: [
                    {id: "rOMIqwHQj1o", url: "https://youtube.com/shorts/rOMIqwHQj1o", title: "Biến chủ đề hot & trend thành video", desc: "Bạn có bao giờ cảm thấy như mình đang tạo ra nội dung mà không ai nhìn thấy?"},
                    {id: "Lgz0PNhswiI", url: "https://youtube.com/shorts/Lgz0PNhswiI?feature=share", title: "Nâng cấp toàn diện một video nhàm chán thành kiệt tác", desc: "Nâng cấp toàn diện một video nhàm chán thành kiệt tác thu hút khách hàng với ContentMaster."},
                    {id: "l-MxW6gZJwo", url: "https://youtube.com/shorts/l-MxW6gZJwo?feature=share", title: "Remix video để nó trở thành siêu phẩm", desc: "Remix một video để trở nên thu hút hơn với ContentMaster."},
                    {id: "_64YZlksOWA", url: "https://youtube.com/shorts/_64YZlksOWA?feature=share", title: "Biến một video thành một SEO article", desc: "Biến một video thành một SEO article để đăng lên website chưa bao giờ dễ dàng như thế với ContentMaster. "},
                    {id: "ji-J4YHzOuc", url: "https://youtube.com/shorts/ji-J4YHzOuc?feature=share", title: "Biến bài blog tầm thường thành blog xịn", desc: "Nâng cấp một bài viết SEO lên một tầm cao mới với dữ liệu thị trường mới nhất, hình ảnh minh họa và tối ưu hóa tìm kiếm."},
                    {id: "iUgVijDujso", url: "https://youtube.com/shorts/iUgVijDujso", title: "Biến social post thành video", desc: "Trong quá trình lướt mạng xã hội, hẳn bạn sẽ gặp những nội dung hay ý tưởng tuyệt vời và muốn biến ngay nó thành video đúng không nào?"},
                    {id: "r_Ax3v14fLA", url: "https://youtube.com/shorts/r_Ax3v14fLA?feature=share", title: "Biến một bài blog thành video nhanh và dễ", desc: "Chuyển đổi một bài blog thành video chỉ trong vài phút với ContentMaster"},
                    {id: "IcHDIr1Rswc", url: "https://youtube.com/shorts/IcHDIr1Rswc?feature=share", title: "Tạo Vlog, POV, faceless video", desc: "Cách làm vlog nhanh và cảm xúc với ContentMaster"},
                    {id: "yYIQawHFEsM", url: "https://youtu.be/TU_iktFnZDk", title: "Video kết quả của Vlog/POV/Faceless tutorial", desc: "Kết quả của video hướng dẫn tạo Vlog, POV, faceless video"},
                    {id: "pyYFObpw6xY", url: "https://youtube.com/shorts/pyYFObpw6xY?feature=share", title: "Hiệu ứng zoom cho Tutorial Videos", desc: "3 bước để nhanh chóng hoàn thành một video hướng dẫn sử dụng trong vòng 15 phút với hiệu ứng zoom"},
                    {id: "S3s8x3Db-z0", url: "https://youtube.com/shorts/S3s8x3Db-z0", title: "Video hướng dẫn lắp ráp sản phẩm", desc: "3 bước để hoàn thành một video hướng dẫn lắp ráp sản phẩm một cách nhanh chóng kèm chatbot tự học nội dung"}
                ]
            }
        ]
    }
    // Add sample data for other languages as needed
];