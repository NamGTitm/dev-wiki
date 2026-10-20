---
title: Chạy JavaScript
description: Chạy file JavaScript bằng Node.js hoặc thử nhanh trong console của browser.
slug: /javascript/bat-dau/chay-javascript
category: getting-started
categoryLabel: Bắt đầu
order: 10040
difficulty: beginner
keywords: [chạy JavaScript, node file, script JavaScript, runtime]
updated: 2026-10-03
collection: javascript
collectionLabel: JavaScript
related: ["/javascript/bat-dau/cai-nodejs", "/javascript/bat-dau/console-devtools"]
---

Tạo file `hello.js`, rồi chạy từ thư mục chứa file:

```js
const name = "NamGT";
console.log(`Xin chào, ${name}!`);
```

```sh
node hello.js
```

Để thử một biểu thức nhanh, mở Developer Tools của browser và nhập mã trong Console. Console chạy trong ngữ cảnh của trang đang mở.

## Lỗi thường gặp

- `Cannot find module`: đường dẫn file hoặc thư mục hiện tại không đúng.
- `node is not recognized`: Node.js chưa có trong `PATH` hoặc terminal chưa tải cấu hình mới.
