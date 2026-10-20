---
title: Cài Node.js
description: Cài Node.js, xác nhận phiên bản và chạy thử chương trình mà không phụ thuộc hệ điều hành.
slug: /javascript/bat-dau/cai-nodejs
category: getting-started
categoryLabel: Bắt đầu
order: 10030
difficulty: beginner
keywords: [cài Node.js, node --version, npm, JavaScript]
updated: 2026-10-03
collection: javascript
collectionLabel: JavaScript
related: ["/javascript/bat-dau/chay-javascript", "/javascript/bat-dau/browser-va-nodejs"]
---

Cài bản Node.js LTS từ trang chính thức hoặc trình quản lý phiên bản phù hợp với hệ điều hành. Bản LTS thường phù hợp cho project cần môi trường ổn định.

Mở terminal mới và kiểm tra:

```sh
node --version
npm --version
```

`node` chạy runtime; `npm` quản lý package và script đi kèm Node.js. Nếu terminal không nhận lệnh sau khi cài, mở terminal mới hoặc kiểm tra `PATH`.

## Điểm cần nhớ

Project có thể ghim phiên bản Node.js riêng. Kiểm tra `package.json`, `.nvmrc` hoặc cấu hình CI trước khi đổi phiên bản.
