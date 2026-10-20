---
title: Kiểu dữ liệu
description: Nhận diện primitive, object, null, undefined và cách kiểm tra kiểu trong JavaScript.
slug: /javascript/co-ban/kieu-du-lieu
category: fundamentals
categoryLabel: Cơ bản
order: 10120
difficulty: beginner
keywords: [kiểu dữ liệu JavaScript, primitive, object, typeof, null, undefined]
updated: 2026-10-03
collection: javascript
collectionLabel: JavaScript
related: ["/javascript/co-ban/bien", "/javascript/co-ban/array", "/javascript/co-ban/object"]
---

JavaScript có các primitive như `string`, `number`, `bigint`, `boolean`, `undefined`, `symbol` và `null`; các giá trị còn lại thuộc nhóm object. Array và function cũng là object theo mô hình ngôn ngữ, dù có cú pháp và hành vi chuyên biệt.

```js
typeof "wiki";       // "string"
typeof 42;           // "number"
typeof undefined;    // "undefined"
typeof null;         // "object" (lỗi lịch sử)
Array.isArray([]);   // true
```

`typeof null` trả về `"object"` vì tương thích lịch sử; dùng `value === null` để kiểm tra null. `typeof` cũng trả về `"function"` với callable function.

## Điểm cần nhớ

Kiểu của biến không cố định. Giá trị có kiểu; một binding có thể được gán sang giá trị thuộc kiểu khác nếu dùng `let`.
