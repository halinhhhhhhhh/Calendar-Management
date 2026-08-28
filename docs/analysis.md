# Phân Tích Tổng Hợp - Lockscreen Calendar

## 1. Tóm tắt sản phẩm

Lockscreen Calendar là một ứng dụng web mobile-first giúp người dùng xem nhanh lịch trình sắp tới mà không phải mở app lịch nhiều lần trong ngày. Sản phẩm tập trung vào trải nghiệm nhìn lướt, hiển thị lịch tiếp theo, deadline và note quan trọng ngay trên bề mặt truy cập nhanh.

## 2. Vấn đề người dùng

Người dùng mục tiêu thường phải kiểm tra lịch học, lịch họp, deadline và việc cá nhân nhiều lần trong ngày. Việc mở ứng dụng lịch đầy đủ liên tục gây tốn thời gian, làm giảm nhịp làm việc và dễ bỏ sót việc quan trọng.

## 3. Đối tượng mục tiêu

- Sinh viên có nhiều lịch học, bài tập và deadline
- Người đi làm có nhiều cuộc họp và nhiệm vụ trong ngày
- Người có lịch trình dày, thường xuyên dùng điện thoại để kiểm tra việc sắp tới

## 4. Giá trị cốt lõi

- Mở điện thoại lên là biết ngay việc tiếp theo
- Giảm số lần phải vào app lịch truyền thống
- Hiển thị lịch trình theo cách ngắn gọn, rõ ràng, dễ đọc
- Cho phép gắn note nhanh vào các mốc quan trọng

## 5. Tính năng chính

- Hiển thị lịch trình tiếp theo
- Hiển thị 3 đến 5 mục quan trọng nhất trong ngày
- Hiển thị deadline và note ghim
- Nhập và quản lý lịch trình ngay trong ứng dụng
- Thêm note thủ công nhanh
- Nhắc việc theo thời gian
- Chế độ ẩn nội dung nhạy cảm

## 6. Phạm vi hiển thị trên mobile

Với sản phẩm web, màn hình khóa hệ điều hành không thể được điều khiển trực tiếp chỉ bằng web thuần. Vì vậy, nên xem Lockscreen Calendar theo hướng:

- Web app là trung tâm quản lý dữ liệu
- Mobile UI là giao diện xem nhanh và tương tác
- Nếu cần hiển thị thật trên lock screen, sau này có thể bổ sung lớp widget hoặc native wrapper theo nền tảng

## 7. Yêu cầu giao diện

- Mobile-first
- Chữ lớn, tương phản rõ
- Chỉ hiển thị thông tin quan trọng nhất
- Không nhồi quá nhiều chi tiết vào một màn hình
- Ưu tiên khoảng trắng, nhịp đọc nhanh và trạng thái rõ ràng
- Có trạng thái trống, loading, lỗi và đồng bộ

## 8. Công nghệ xây dựng

### Frontend

- TypeScript để tăng an toàn kiểu dữ liệu
- React để xây dựng giao diện theo component
- CSS viết tay để kiểm soát chặt layout, spacing, màu sắc và responsive behavior

### Gợi ý triển khai

- Vite cho môi trường phát triển nhanh
- PWA để tăng cảm giác như app trên di động
- Local storage hoặc IndexedDB cho dữ liệu tạm
- Storage layer riêng cho dữ liệu cá nhân

## 9. Typography cho thiết bị di động

Để hiển thị tốt trên điện thoại, nên dùng font sans rõ nét, có độ dễ đọc cao ở kích thước nhỏ.

Khuyến nghị:

- Font chính: `Inter`
- Phương án thay thế: `Plus Jakarta Sans`
- Fallback: `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`

Nguyên tắc typography:

- Kích thước chữ mặc định tối thiểu 16px
- Dòng văn bản không quá dài
- Tránh font quá mảnh hoặc quá trang trí
- Giữ tiêu đề ngắn, rõ, dễ scan

## 10. Kiến trúc dữ liệu

- Event: tiêu đề, thời gian bắt đầu, thời gian kết thúc, nguồn lịch, trạng thái
- Note: nội dung, mức ưu tiên, ngày liên quan, trạng thái ghim
- Reminder: thời điểm nhắc, loại nhắc, trạng thái đã xem

## 11. Luồng người dùng chính

- Người dùng mở app
- Ứng dụng hiển thị việc tiếp theo và các mục quan trọng trong ngày
- Người dùng chạm để xem chi tiết hoặc mở lịch đầy đủ
- Người dùng thêm note nhanh hoặc đánh dấu việc đã xong

## 12. Rủi ro và lưu ý

- Web thuần không thể thay thế hoàn toàn lock screen native experience
- Cần truyền thông rõ giới hạn dữ liệu chỉ tồn tại trên cùng trình duyệt/thiết bị
- Cần kiểm tra kỹ khả năng chịu lỗi của `localStorage`
- Nếu hiển thị quá nhiều thông tin, trải nghiệm sẽ mất đi tính “nhìn lướt”

## 13. MVP đề xuất

- Trang chính hiển thị lịch tiếp theo
- Danh sách deadline trong ngày
- Note ghim nhanh
- Chế độ dark/light đơn giản
- Responsive tốt cho màn hình điện thoại

## 14. Tiêu chí thành công

- Người dùng nhìn thấy lịch tiếp theo trong dưới 2 giây
- Giảm số lần phải mở app lịch truyền thống trong ngày
- Tăng tỉ lệ quay lại app hằng ngày
- Người dùng cảm thấy app đủ rõ để dùng như một bảng điều khiển cá nhân
