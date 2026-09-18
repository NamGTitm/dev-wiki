---
title: Lambda, callback và higher-order function
description: Dùng function như dữ liệu, truyền callback và biết khi nào lambda làm code khó đọc.
slug: /ham/lambda-callbacks
category: functions
categoryLabel: Hàm
order: 440
difficulty: intermediate
keywords: [lambda, callback, higher-order function, first-class function]
updated: 2026-09-18
related: ["/ham/function", "/collection/comprehensions", "/standard-library/functools"]
---

Function là first-class object: có thể gán cho tên, lưu trong collection, truyền vào hàm khác hoặc trả về từ hàm.

```python
def apply_discount(prices: list[int], rule) -> list[int]:
    return [rule(price) for price in prices]

discounted = apply_discount([100_000, 200_000], lambda price: round(price * 0.9))
```

Lambda phù hợp với callback ngắn, không có statement và không cần docstring. Nếu logic có tên, nhiều nhánh hoặc được dùng lại, viết `def` sẽ rõ hơn. Khi callback cần giữ state, closure hoặc `functools.partial` thường biểu đạt ý định tốt hơn lambda lồng nhiều lớp.
