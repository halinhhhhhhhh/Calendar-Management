# Lockscreen Calendar

Ứng dụng web ưu tiên mobile giúp người dùng nhìn thấy lịch trình tiếp theo, deadline và note quan trọng ngay khi mở điện thoại.

## Tài liệu

- [Phân tích tổng hợp](docs/analysis.md)
- [Kế hoạch phát triển](docs/development.md)

## Kiểm thử và build

```bash
npm test
npm run build
```

## Trang công khai

Build tạo ba trang độc lập:

- `/` — ứng dụng Calendar Management.
- `/privacy` — chính sách bảo mật.
- `/support` — chính sách và thông tin hỗ trợ.

Cấu hình liên hệ hỗ trợ qua `.env` (xem `.env.example`):

```bash
VITE_SUPPORT_EMAIL=support@example.com
VITE_SUPPORT_HOURS="Monday to Friday, 9:00-17:00 (GMT+7)"
```

## Stack dự kiến

- TypeScript
- React
- CSS viết tay hoặc CSS Modules
- Font tối ưu cho mobile: `Inter` hoặc `Plus Jakarta Sans`, kèm fallback `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`

## Định hướng

- Tối ưu cho màn hình nhỏ
- Ưu tiên thông tin nhìn lướt
- Lưu dữ liệu cá nhân bằng `localStorage` trên cùng trình duyệt/thiết bị
