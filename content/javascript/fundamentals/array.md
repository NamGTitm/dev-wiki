---
title: Array
description: Tạo và duyệt array, dùng các phương thức phổ biến và nhận biết thao tác thay đổi dữ liệu.
slug: /javascript/co-ban/array
category: fundamentals
categoryLabel: Cơ bản
order: 10190
difficulty: beginner
keywords: [array JavaScript, mảng, map, filter, find, mutation]
updated: 2026-10-03
collection: javascript
collectionLabel: JavaScript
related: ["/javascript/co-ban/object", "/javascript/co-ban/function"]
---

Array là cấu trúc có thứ tự với chỉ số bắt đầu từ `0`. Trong JavaScript, array là một dạng object chuyên biệt, không phải kiểu nguyên thủy tách rời khỏi object.

```js
const prices = [10, 20, 30];
const discounted = prices.map((price) => price * 0.9);
const available = prices.filter((price) => price >= 20);
```

`map` tạo array mới từ mỗi phần tử; `filter` giữ các phần tử thỏa điều kiện; `find` trả về phần tử đầu tiên phù hợp hoặc `undefined`. `push` và `sort` thay đổi array gốc.

## Điểm cần nhớ

`const items = []` vẫn cho phép `items.push(...)`: binding không đổi dù object bị sửa. `Array.isArray(value)` là cách đáng tin cậy để kiểm tra array.
