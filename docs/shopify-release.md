# Shopify release package

## Mục tiêu

Đóng gói và kiểm tra ứng dụng trước khi tạo phiên bản Shopify App. Tài liệu này không thay cho việc phân phối web app: Shopify CLI chỉ triển khai cấu hình app và extension, còn web app phải được deploy riêng lên HTTPS công khai.

## Điều kiện bắt buộc trước khi public

1. **Hosting web app**: deploy thư mục `dist/` lên một domain HTTPS công khai, cố định, không dùng URL `trycloudflare.com` tạm thời.
2. **Cấu hình app**: cập nhật `shopify.app.calendar-management.toml`:
   - `application_url` bằng URL hosting thật.
   - `redirect_urls` chỉ khai báo khi ứng dụng bổ sung luồng xác thực riêng trong tương lai.
3. **URL công khai**: cấu hình `https://<domain>/privacy` cho Privacy Policy URL và `https://<domain>/support` cho Support URL trong Shopify Partner Dashboard.
4. **Xác thực Shopify**: chạy `npx shopify app deploy -c calendar-management` và đăng nhập bằng tài khoản Partner/Development store có quyền với app.
5. **Nội dung listing**: chuẩn bị từ `docs/app-store-listing.md` và `docs/legal.md`; nhập ở Shopify Partner Dashboard tên thương mại, mô tả, icon 512×512, screenshot, chính sách bảo mật, URL hỗ trợ và thông tin liên hệ.
6. **Kiểm tra luồng cài đặt**: xác nhận cài đặt app, embedded navigation, khởi tạo `localStorage` và tính năng chính hoạt động trên merchant store.
7. **Phê duyệt và công bố**: submit listing theo checklist app review của Shopify; chỉ release khi mọi kiểm thử và build pass.

## Quy trình đóng gói

```bash
npm ci
npm test
npm run build
npx shopify app build -c calendar-management
npx shopify app deploy -c calendar-management
```

Lệnh `deploy` tạo phiên bản app. Với bản nghiêm túc dùng cho review, có thể thêm `--no-release` để tạo snapshot chưa public.

## Lệnh verify sau deploy

```bash
npm run build
npm test
npx shopify app build -c calendar-management
```

Sau đó mở URL app từ Shopify admin trên store kiểm thử, chạy chính các luồng trong `docs/test-flows.md`.

## Giới hạn hiện tại

- Dữ liệu người dùng chỉ nằm trong `localStorage` của trình duyệt, chưa đồng bộ theo tài khoản Shopify hoặc nhiều thiết bị.
- Web app không dùng backend/đăng nhập riêng và dữ liệu chỉ nằm trong `localStorage`, vì vậy hiện tại phù hợp làm embedded utility demo trên một store hơn là app public đa merchant.
- Chưa có asset marketing và nội dung listing bắt buộc của Shopify App Store.
- Logo chuẩn bị tại `public/icons/app-icon.svg`; Shopify Partner Dashboard vẫn yêu cầu upload icon raster đúng định dạng danh mục hiện hành.
