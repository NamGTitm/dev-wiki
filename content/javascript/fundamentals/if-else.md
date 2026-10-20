---
title: if / else
description: Rẽ nhánh bằng điều kiện boolean và tránh lỗi truthy, falsy thường gặp.
slug: /javascript/co-ban/dieu-kien
category: fundamentals
categoryLabel: Cơ bản
order: 10140
difficulty: beginner
keywords: [if else JavaScript, điều kiện, truthy falsy, boolean]
updated: 2026-10-03
collection: javascript
collectionLabel: JavaScript
related: ["/javascript/co-ban/toan-tu", "/javascript/co-ban/switch", "/javascript/co-ban/vong-lap-for"]
---

`if` chạy một khối khi điều kiện được chuyển thành `true`; `else if` kiểm tra trường hợp tiếp theo và `else` xử lý phần còn lại.

```js
if (score >= 90) {
  result = "A";
} else if (score >= 70) {
  result = "B";
} else {
  result = "C";
}
```

Điều kiện không bắt buộc phải là boolean: `0`, `""`, `null`, `undefined` và `NaN` là falsy; object và array rỗng vẫn truthy.

## Lỗi thường gặp

Nếu cần phân biệt rõ `0` với giá trị chưa nhập, kiểm tra `value == null` hoặc `value === 0` thay vì `if (value)`.
