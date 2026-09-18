---
title: Comprehension trong Python
description: List, dict, set comprehension và generator expression với điều kiện, lồng nhau và giới hạn đọc hiểu.
slug: /collection/comprehensions
category: collections
categoryLabel: Collections
order: 350
difficulty: intermediate
keywords: [list comprehension, dict comprehension, set comprehension, generator expression]
updated: 2026-09-18
related: ["/collection/list", "/collection/dictionary", "/advanced/generator"]
---

Comprehension diễn đạt “tạo collection từ iterable” trong một expression:

```python
prices = [120_000, 85_000, 240_000]
vat_by_price = {price: round(price * 1.08) for price in prices}
large_prices = [price for price in prices if price >= 100_000]
```

Có thể có nhiều `for`, điều kiện và destructuring, nhưng mỗi lớp lồng làm mental model nặng hơn. Khi body cần side effect, nhiều nhánh hoặc exception handling, quay về loop thường.

Generator expression dùng ngoặc tròn và lazy hơn list comprehension:

```python
total = sum(price for price in prices if price >= 100_000)
```

Đừng dùng comprehension chỉ để gọi function có side effect rồi bỏ kết quả; loop nói rõ ý định hơn.
