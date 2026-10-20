---
title: Biến: const, let và var
description: So sánh scope, gán lại, khai báo lại và hoisting của const, let, var.
slug: /javascript/co-ban/bien
category: fundamentals
categoryLabel: Cơ bản
order: 10110
difficulty: beginner
keywords: [biến JavaScript, const, let, var, scope, hoisting]
updated: 2026-10-03
collection: javascript
collectionLabel: JavaScript
related: ["/javascript/co-ban/kieu-du-lieu", "/javascript/co-ban/function"]
---

`const`, `let` và `var` đều khai báo binding, nhưng khác nhau về phạm vi và khả năng khai báo lại. `const` không cho gán binding sang giá trị khác; nó không làm object hoặc array trở thành bất biến.

```js
const settings = { theme: "light" };
settings.theme = "dark";

let count = 0;
count += 1;
```

- `const`: block scope, không gán lại binding và không khai báo lại trong cùng scope.
- `let`: block scope, có thể gán lại nhưng không thể khai báo lại trong cùng scope.
- `var`: function scope (hoặc global), có thể gán lại và khai báo lại trong cùng scope.

`let` và `const` được hoist nhưng nằm trong temporal dead zone cho tới dòng khai báo, nên truy cập sớm sẽ lỗi `ReferenceError`. `var` được hoist và khởi tạo thành `undefined`, dễ che giấu lỗi thứ tự thực thi. Khai báo `var` lặp lại trong cùng scope được phép.

## Điểm cần nhớ

Ưu tiên `const` khi không cần gán lại; dùng `let` khi binding cần thay đổi. Tránh `var` trong code mới vì function scope và khai báo lặp làm phạm vi khó đoán.
