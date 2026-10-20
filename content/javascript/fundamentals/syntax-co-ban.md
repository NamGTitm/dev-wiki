---
title: Syntax cơ bản
description: Nắm câu lệnh, biểu thức, dấu ngoặc, comment và quy tắc đặt tên trong JavaScript.
slug: /javascript/co-ban/syntax-co-ban
category: fundamentals
categoryLabel: Cơ bản
order: 10100
difficulty: beginner
keywords: [syntax JavaScript, câu lệnh, biểu thức, camelCase]
updated: 2026-10-03
collection: javascript
collectionLabel: JavaScript
related: ["/javascript/co-ban/bien", "/javascript/co-ban/kieu-du-lieu"]
---

JavaScript phân biệt chữ hoa và chữ thường. Một biểu thức tạo ra giá trị; câu lệnh thực hiện hành động. Dấu chấm phẩy thường được dùng để kết thúc câu lệnh, dù automatic semicolon insertion đôi khi chèn nó theo quy tắc riêng.

```js
const total = 3 + 4;
if (total > 5) {
  console.log(total);
}
```

Khối lệnh dùng `{}`. Comment một dòng bắt đầu bằng `//`; comment nhiều dòng nằm giữa `/*` và `*/`. Tên biến thường dùng `camelCase` và không thể là từ khóa như `const`.

## Lỗi thường gặp

`name` và `Name` là hai định danh khác nhau. Thiếu ngoặc hoặc đặt sai phạm vi của `{}` cũng thường gây lỗi parse khó đọc.
