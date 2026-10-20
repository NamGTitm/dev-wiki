---
title: JavaScript là gì?
description: Phân biệt JavaScript, ECMAScript, engine và API của môi trường chạy.
slug: /javascript/bat-dau/javascript-la-gi
category: getting-started
categoryLabel: Bắt đầu
order: 10000
difficulty: beginner
keywords: [javascript, ECMAScript, JavaScript engine, ngôn ngữ lập trình]
updated: 2026-10-03
collection: javascript
collectionLabel: JavaScript
collectionDescription: Nền tảng JavaScript thực tế, từ runtime đến những cấu trúc thường dùng.
related: ["/javascript/bat-dau/javascript-chay-o-dau", "/javascript/bat-dau/browser-va-nodejs"]
---

JavaScript là ngôn ngữ lập trình được chuẩn hóa để chạy trong nhiều môi trường. Nó không đồng nghĩa với trình duyệt: cùng một ngôn ngữ có thể chạy trong browser, Node.js và các runtime khác.

## Bốn khái niệm cần tách biệt

- **JavaScript** là tên ngôn ngữ mà developer thường dùng.
- **ECMAScript** là đặc tả chuẩn hóa các cú pháp và hành vi cốt lõi của ngôn ngữ.
- **JavaScript engine** đọc và thực thi mã, ví dụ V8 hoặc SpiderMonkey.
- **API môi trường** cung cấp chức năng bên ngoài ngôn ngữ: browser có DOM, còn Node.js có API đọc file và làm việc với hệ điều hành.

```js
const message = "Xin chào";
console.log(message);
```

`const` thuộc ngôn ngữ; `console` được runtime cung cấp. API cụ thể có thể khác giữa browser và Node.js.

## Điểm cần nhớ

Khi code không chạy, hãy xác định lỗi nằm ở cú pháp JavaScript hay một API chỉ có trong runtime khác.
