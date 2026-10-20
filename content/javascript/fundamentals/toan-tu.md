---
title: Toán tử
description: Dùng toán tử số học, so sánh, logic, nullish và gán với các semantics dễ đoán.
slug: /javascript/co-ban/toan-tu
category: fundamentals
categoryLabel: Cơ bản
order: 10130
difficulty: beginner
keywords: [toán tử JavaScript, strict equality, toán tử logic, nullish coalescing]
updated: 2026-10-03
collection: javascript
collectionLabel: JavaScript
related: ["/javascript/co-ban/dieu-kien", "/javascript/co-ban/kieu-du-lieu"]
---

Toán tử kết hợp giá trị để tạo kết quả. JavaScript có toán tử số học như `+`, `-`, `*`, `/`; so sánh như `===`, `<`; và logic như `&&`, `||`, `!`.

```js
const total = 12 + 3;
const isReady = total >= 15 && total < 20;
const label = input ?? "Mặc định";
```

Ưu tiên `===` và `!==` để tránh ép kiểu ngầm. `||` chọn vế phải khi vế trái falsy; `??` chỉ chọn vế phải khi vế trái là `null` hoặc `undefined`.

## Lỗi thường gặp

`+` vừa cộng số vừa nối chuỗi: `"2" + 3` cho ra `"23"`. Chuyển đổi kiểu rõ ràng khi dữ liệu đến từ form hoặc API.
