# Shopify release package

## Mục tiêu

Đóng gói và kiểm tra ứng dụng trước khi tạo phiên bản Shopify App. Tài liệu này không thay cho việc phân phối web app: Shopify CLI chỉ triển khai cấu hình app và extension, còn web app phải được deploy riêng lên HTTPS công khai.

## Điều kiện bắt buộc trước khi public

1. **Hosting web app**: deploy thư mục `dist/` lên một domain HTTPS công khai, cố định, không dùng URL `trycloudflare.com` tạm thời.
2. **Cấu hình app**: cập nhật `shopify.app.calendar-management.toml`:
   - `application_url` bằng URL hosting thật.
   - `redirect_urls` chỉ khai báo khi ứng dụng bổ sung luồng xác thực riêng trong tương lai.
3. **URL công khai**: cấu hình `https://<domain>/privacy` cho Privacy Policy URL và `https://<domain>/support` cho Support URL trong Shopify Partner Dashboard.
4. **Xác thực Shopify**: chạy `npx shopify app deploy -c calendar-management --allow-updates` và đăng nhập bằng tài khoản Partner/Development store có quyền với app.
5. **Nội dung listing**: chuẩn bị từ `docs/app-store-listing.md` và `docs/legal.md`; nhập ở Shopify Partner Dashboard tên thương mại, mô tả, icon 512×512, screenshot, chính sách bảo mật, URL hỗ trợ và thông tin liên hệ.
6. **Kiểm tra luồng cài đặt**: xác nhận cài đặt app, embedded navigation, khởi tạo `localStorage` và tính năng chính hoạt động trên merchant store.
7. **Phê duyệt và công bố**: submit listing theo checklist app review của Shopify; chỉ release khi mọi kiểm thử và build pass.

## Quy trình đóng gói

```bash
npm ci
npm test
npm run build
npx shopify app build -c calendar-management
npx shopify app deploy -c calendar-management --allow-updates
```

Lệnh `deploy` tạo và phát hành một phiên bản cấu hình app. Phiên bản production hiện tại đã được triển khai với URL Cloudflare Workers chính thức.

## Lệnh verify sau deploy

```bash
npm run build
npm test
npx shopify app build -c calendar-management
```

Sau đó mở URL app từ Shopify admin trên store kiểm thử, chạy chính các luồng trong `docs/test-flows.md`.

## Giới hạn hiện tại

- Dữ liệu người dùng chỉ nằm trong `localStorage` của trình duyệt, chưa đồng bộ theo tài khoản Shopify hoặc nhiều thiết bị.
- BR-16 của MVP cấm backend và authentication. Một app Shopify công khai, đa merchant cần luồng OAuth/backend và lưu trữ không phụ thuộc `localStorage` trong iframe. Xung đột này chặn việc submit App Store cho đến khi Product Owner phê duyệt thay đổi requirement.
- Web app không dùng backend/đăng nhập riêng và dữ liệu chỉ nằm trong `localStorage`, vì vậy hiện tại phù hợp làm embedded utility demo trên một store hơn là app public đa merchant.
- Chưa có asset marketing và nội dung listing bắt buộc của Shopify App Store.
- Logo chuẩn bị tại `public/icons/app-icon.svg`; Shopify Partner Dashboard vẫn yêu cầu upload icon raster đúng định dạng danh mục hiện hành.

## Checklist tự xác nhận trên Shopify

### 1. Product Owner / Partner account

- [ ] Đăng nhập Shopify Partner Dashboard bằng tài khoản chủ sở hữu app.
- [ ] Xác nhận app `Calendar Management` đúng organization và không dùng app demo `commercial-upside-app`.
- [ ] Xác nhận app có quyền truy cập development store dùng để test.

### 2. Public URL configuration

- [x] Cập nhật URL Cloudflare Workers chính thức trong `application_url` và `app_preferences.url`.
- [x] Deploy cấu hình app bằng `npx shopify app deploy -c calendar-management --allow-updates`.
- [ ] Xác nhận `/privacy` và `/support` mở công khai từ URL chính thức.
- [ ] Không khai báo `redirect_urls` cho đến khi app có luồng xác thực riêng.

### 3. Embedded installation test

- [ ] Cài app vào development store.
- [ ] Mở app từ Shopify admin và xác nhận nó hiển thị embedded.
- [ ] Thêm/sửa/hoàn thành/xóa ít nhất một event, deadline, note.
- [ ] Reload lại Shopify admin và xác nhận dữ liệu còn trong cùng trình duyệt.
- [ ] Xóa dữ liệu trình duyệt và xác nhận UI hiển thị trạng thái trống.

### 4. App listing

- [ ] Xác nhận tên thương mại, tagline, mô tả ngắn, và mô tả chi tiết trong `docs/app-store-listing.md`.
- [ ] Upload icon raster 512×512 xuất từ `public/icons/app-icon.svg`.
- [ ] Upload screenshot dashboard ở light/dark và mobile/desktop.
- [ ] Kiểm tra không cam kết sync đa thiết bị, backup, collaboration, hoặc tích hợp lịch ngoài.
- [ ] Nhập danh mục, từ khóa, pricing, khu vực phục vụ, và thông tin liên hệ.

### 5. Privacy and security

- [ ] Xác nhận app không thu thập hay truyền Shopify merchant data.
- [ ] Nhập Privacy Policy URL từ `/privacy`.
- [ ] Nhập Support URL từ `/support`.
- [ ] Xác nhận không lưu access token vào `localStorage`.
- [ ] Hoàn thành các câu hỏi privacy/security review theo dữ liệu thực tế của app.

### 6. Release gate

- [ ] Xác nhận không dùng URL tunnel tạm ở bất kỳ cấu hình production nào.
- [ ] Chạy `npm test` và `npm run build` trên commit cuối.
- [ ] Chạy `npx shopify app build -c calendar-management`.
- [ ] Chạy `npx shopify app deploy -c calendar-management --allow-updates` chỉ sau khi URL chính thức đã được cập nhật.
- [ ] Kiểm tra toàn bộ luồng trong `docs/test-flows.md`.
- [ ] Submit App Store review chỉ sau khi Supervisor xác nhận public URL, QA, build, và embedded test đều pass.
