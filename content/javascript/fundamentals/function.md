---
title: Function
description: Khai báo function, truyền tham số, trả kết quả và hiểu scope cơ bản.
slug: /javascript/co-ban/function
category: fundamentals
categoryLabel: Cơ bản
order: 10180
difficulty: beginner
keywords: [function JavaScript, tham số, return, arrow function, scope]
updated: 2026-10-03
collection: javascript
collectionLabel: JavaScript
related: ["/javascript/co-ban/bien", "/javascript/co-ban/array", "/javascript/co-ban/object"]
---

Function đóng gói hành vi để có thể gọi lại. `return` kết thúc lời gọi và gửi giá trị về nơi gọi; nếu bỏ qua, kết quả là `undefined`.

```js
function add(left, right) {
  return left + right;
}

const double = (value) => value * 2;
```

Function declaration được hoist trong phạm vi khai báo. Function expression gán vào `const` chỉ dùng được sau dòng khởi tạo. Arrow function không tự có `this` riêng; dùng khi phù hợp với ngữ cảnh thay vì thay mọi function.

## Lỗi thường gặp

Gọi function không đồng nghĩa với trả kết quả: `console.log(value)` chỉ in ra, không thay thế `return value`.
