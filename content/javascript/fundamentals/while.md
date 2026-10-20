---
title: Vòng lặp while
description: Lặp khi điều kiện còn đúng và bảo đảm trạng thái có thể tiến đến điểm dừng.
slug: /javascript/co-ban/vong-lap-while
category: fundamentals
categoryLabel: Cơ bản
order: 10170
difficulty: beginner
keywords: [while JavaScript, vòng lặp, điều kiện dừng, do while]
updated: 2026-10-03
collection: javascript
collectionLabel: JavaScript
related: ["/javascript/co-ban/vong-lap-for", "/javascript/co-ban/dieu-kien"]
---

`while` kiểm tra điều kiện trước mỗi lượt và chạy khối lệnh khi điều kiện đúng.

```js
let attempts = 0;
while (attempts < 3) {
  attempts += 1;
}
```

`do...while` chạy thân vòng lặp ít nhất một lần rồi mới kiểm tra điều kiện.

## Lỗi thường gặp

Nếu trạng thái trong điều kiện không thay đổi, vòng lặp có thể chạy mãi. Hãy xác định rõ biến nào tiến đến điểm dừng và điều gì xảy ra khi dữ liệu đầu vào rỗng.
