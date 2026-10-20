---
title: Browser và Node.js
description: So sánh hai runtime JavaScript phổ biến và cách chạy cùng một đoạn mã.
slug: /javascript/bat-dau/browser-va-nodejs
category: getting-started
categoryLabel: Bắt đầu
order: 10020
difficulty: beginner
keywords: [browser JavaScript, Node.js, DOM, runtime]
updated: 2026-10-03
collection: javascript
collectionLabel: JavaScript
related: ["/javascript/bat-dau/javascript-chay-o-dau", "/javascript/bat-dau/chay-javascript"]
---

Browser chạy JavaScript trong trang web và cung cấp DOM, sự kiện giao diện cùng Web APIs. Node.js chạy JavaScript ngoài browser, thường dùng cho script, công cụ dòng lệnh và server.

```js
// Browser
document.title = "Trang của tôi";

// Node.js
console.log(process.version);
```

`document` không được Node.js cung cấp mặc định; `process` không phải API web tiêu chuẩn. Cả hai runtime đều có engine JavaScript và `console`.

## Điểm cần nhớ

Chọn browser cho mã tương tác trang web; chọn Node.js khi cần chạy file JavaScript hoặc công cụ ngoài browser.
