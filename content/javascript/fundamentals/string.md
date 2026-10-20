---
title: String
description: Tạo chuỗi, nội suy giá trị và xử lý các thao tác chuỗi thường gặp.
slug: /javascript/co-ban/string
category: fundamentals
categoryLabel: Cơ bản
order: 10210
difficulty: beginner
keywords: [string JavaScript, template literal, chuỗi, includes, trim]
updated: 2026-10-03
collection: javascript
collectionLabel: JavaScript
related: ["/javascript/co-ban/kieu-du-lieu", "/javascript/co-ban/array"]
---

String biểu diễn văn bản và là immutable: thao tác chuỗi tạo giá trị mới thay vì sửa chuỗi cũ.

```js
const name = "NamGT";
const greeting = `Xin chào, ${name}!`;
const normalized = "  DevHubs  ".trim().toLowerCase();
```

Template literal dùng dấu backtick để nội suy biểu thức. Phương thức hữu ích gồm `includes`, `slice`, `replace` và `trim`.

## Lỗi thường gặp

`length` đếm đơn vị UTF-16, không phải lúc nào cũng bằng số ký tự người dùng nhìn thấy; emoji có thể chiếm nhiều đơn vị. Dùng `Intl.Segmenter` khi cần xử lý theo grapheme trong ngôn ngữ tự nhiên.
