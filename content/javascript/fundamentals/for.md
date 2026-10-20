---
title: Vòng lặp for
description: Lặp với for khi cần kiểm soát bộ đếm hoặc số vòng lặp rõ ràng.
slug: /javascript/co-ban/vong-lap-for
category: fundamentals
categoryLabel: Cơ bản
order: 10160
difficulty: beginner
keywords: [for JavaScript, vòng lặp, break, continue]
updated: 2026-10-03
collection: javascript
collectionLabel: JavaScript
related: ["/javascript/co-ban/vong-lap-while", "/javascript/co-ban/array"]
---

`for` gom phần khởi tạo, điều kiện tiếp tục và cập nhật bộ đếm vào một chỗ.

```js
for (let index = 0; index < items.length; index += 1) {
  console.log(items[index]);
}
```

Điều kiện được kiểm tra trước mỗi vòng. `break` thoát vòng lặp; `continue` bỏ phần còn lại của lượt hiện tại. Khi chỉ cần lấy từng giá trị, `for...of` thường dễ đọc hơn.

## Lỗi thường gặp

Sai điều kiện như `index <= items.length` sẽ truy cập ngoài phạm vi. Kiểm tra điểm bắt đầu và điều kiện dừng khi debug vòng lặp.
