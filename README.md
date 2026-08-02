# Hướng dẫn chỉnh sửa nội dung và hình ảnh cho trang web

Trang web đã được cấu hình lại để ưu tiên sử dụng ảnh cục bộ nhằm đảm bảo tốc độ tải trang và tính ổn định. Toàn bộ hình ảnh và video đã được thay thế thành định dạng đường dẫn `/images/...` và `/videos/...`.

Dưới đây là danh sách chi tiết các tệp tin bạn cần chuẩn bị để thêm vào thư mục `public/images` và `public/videos`.

## Cách thức hoạt động
1. Trang web sẽ đọc file từ thư mục `public` của mã nguồn.
2. Với ảnh tên là `hero-1.jpg`, bạn chỉ cần copy ảnh có cùng tên đó vào `public/images/`.
3. Bạn cũng có thể mở các file `tsx` liệt kê dưới đây để đổi tên ảnh (ví dụ từ `/images/hero-1.jpg` thành `/images/anh-cua-toi.jpg`) nếu muốn.

---

## 1. Phần Đầu Trang (Hero Section) - `src/components/Hero.tsx`
- **Hình ảnh cần chuẩn bị (Thư mục `public/images/`):**
  - `hero-bg.jpg` (Ảnh nền)
  - `hero-1.jpg` đến `hero-8.jpg` (8 ảnh băng chuyền chạy ngang)
  - `logo.png` (Logo trường THPT Cẩm Giàng, nằm phía trên cùng góc ngoài banner)

## 2. Phần Dòng Thời Gian (History Section) - `src/components/History.tsx`
- **Hình ảnh cần chuẩn bị (Thư mục `public/images/`):**
  - Có 5 giai đoạn, mỗi giai đoạn 3 ảnh (1 chính, 2 phụ), được cấu hình qua danh sách `MILESTONES`.
  - Từ `history-1.jpg` đến `history-15.jpg` (Tổng cộng 15 ảnh).

## 3. Phần Ký Ức Hình Ảnh (Gallery Section) - `src/components/Gallery.tsx`
- **Hình ảnh cần chuẩn bị (Thư mục `public/images/`):**
  - Từ `gallery-1.jpg` đến `gallery-15.jpg` (Tổng cộng 15 ảnh, thuộc tính `url` list `PHOTOS`).

## 4. Phần Thước Phim Ký Ức (Video Section) - `src/components/VideoSection.tsx` & `src/components/Hero.tsx`
- **Video cần chuẩn bị (Thư mục `public/videos/`):**
  - Cần ít nhất 1 video tên `video-1.mp4`.
- **Hình ảnh cần chuẩn bị (Thư mục `public/images/`):**
  - `videosection-1.jpg` (Ảnh bìa poster khi chưa bấm play video).

## 5. Phần Bảng Vàng (HallOfFame Section) - `src/components/HallOfFame.tsx`
- **Hình ảnh cần chuẩn bị (Thư mục `public/images/`):**
  - Cần 12 ảnh chân dung hoặc chứng nhận ở danh sách `HONORS`.
  - Tên mặc định: `halloffame-1.jpg` đến `halloffame-12.jpg`.
  - `carbon-fibre.png` (Một dạng mẫu phủ Texture, bạn có thể tải 1 mẫu pattern bất kỳ làm ảnh nền).

## 6. Phần Cựu Học Sinh (Alumni Section) - `src/components/Alumni.tsx`
- **Hình ảnh cần chuẩn bị (Thư mục `public/images/`):**
  - `alumni-1.jpg` đến `alumni-4.jpg` (Ảnh trên bản đồ)
  - `alumni-5.jpg` đến `alumni-7.jpg` (Ảnh cựu học sinh đại diện bên dưới bản đồ)
  - (Tổng 7 ảnh)

## 7. Phần Tri Ân Thầy Cô (TeachersTribute Section) - `src/components/TeachersTribute.tsx`
- **Hình ảnh cần chuẩn bị (Thư mục `public/images/`):**
  - Từ `teacherstribute-1.jpg` đến `teacherstribute-8.jpg` tùy thuộc vào ds `TEACHERS` (Tổng 8 ảnh).

## 8. Phần Ký Ức Học Trò (Memories Section) - `src/components/Memories.tsx`
- **Hình ảnh cần chuẩn bị (Thư mục `public/images/`):**
  - `memories-1.jpg` đến `memories-4.jpg` cho 4 câu chuyện kỷ niệm mẫu (Tổng 4 ảnh).

## 9. Chế độ đọc sách (BookLayout Section) - `src/components/BookLayout.tsx`
- **Hình ảnh cần chuẩn bị (Thư mục `public/images/`):**
  - Từ `booklayout-1.jpg` đến `booklayout-5.jpg` (5 ảnh làm bìa và nội dung minh hoạ trang sách).

---

## TỔNG KẾT
Cách dễ nhất là bạn tạo **79** tấm ảnh và **1** video, sau đó đổi tên cho giống hệt danh sách bên trên và ném tất cả vào thư mục `/public/images` (và `/public/videos` đối với video). 

Nếu bạn muốn tạo cấu trúc riêng (ví dụ gom ảnh theo thư mục `/public/images/lich-su/`), hãy tự do làm điều đó và vào từng phần components (như `Hero.tsx`, `Gallery.tsx`) để đổi lại biến `img` và `url`.
