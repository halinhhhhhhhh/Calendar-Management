# Kế Hoạch Phát Triển - Lockscreen Calendar

## 1. Mục tiêu kỹ thuật

- Xây dựng giao diện mobile-first bằng TypeScript và React
- Giữ CSS linh hoạt để tùy biến nhanh theo từng kích thước màn hình
- Tạo trải nghiệm nhẹ, nhanh, dễ mở lại nhiều lần trong ngày

## 2. Cấu trúc đề xuất

- `src/components`: các component giao diện tái sử dụng
- `src/pages`: màn hình chính, màn hình chi tiết, màn hình cài đặt
- `src/styles`: token, variables, layout, theme
- `src/features`: lịch, note, reminder, sync
- `src/lib`: helper, format thời gian, API client

## 3. Công nghệ chính

- React
- TypeScript
- CSS viết tay hoặc CSS Modules
- Vite cho dev server và build

## 4. Thiết kế responsive

- Tối ưu trước cho màn hình nhỏ
- Dùng layout một cột cho nội dung chính
- Chỉ mở rộng sang nhiều cột ở tablet hoặc màn hình lớn
- Ưu tiên touch target đủ lớn cho thao tác ngón tay

## 5. Font và hệ chữ

- Dùng `Inter` làm font mặc định để tăng độ rõ nét
- Có thể đổi sang `Plus Jakarta Sans` nếu muốn cảm giác thương hiệu hơn
- Luôn có fallback hệ thống để hiển thị ổn định trên mọi thiết bị

## 6. Các giai đoạn làm sản phẩm

### Giai đoạn 1

- Dựng layout chính
- Tạo mock data
- Hiển thị lịch tiếp theo và note ghim

### Giai đoạn 2

- Đồng bộ dữ liệu lịch
- Thêm note nhanh
- Thêm trạng thái loading, empty và error

### Giai đoạn 3

- Tối ưu mobile UX
- Bổ sung chế độ riêng tư
- Tinh chỉnh typography và spacing

### Giai đoạn 4

- PWA
- Notification
- Tối ưu hiệu năng

## 7. Chất lượng cần đảm bảo

- Tốc độ tải nhanh
- Giao diện dễ đọc
- Tránh quá nhiều màu và chi tiết
- Trạng thái dữ liệu rõ ràng
- Dễ mở rộng về sau nếu thêm native layer
