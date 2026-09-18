---
title: Toán tử và biểu thức
description: Các toán tử số học, so sánh, logic và cách viết biểu thức dễ đọc.
slug: /co-ban/toan-tu
category: fundamentals
categoryLabel: Cơ bản
order: 120
difficulty: beginner
keywords: [operators, expression, arithmetic, comparison, logical operators]
updated: 2026-09-18
related: ["/co-ban/bien", "/dieu-khien/if-elif-else"]
---

Biểu thức là code tạo ra một giá trị. Toán tử kết hợp các giá trị đó thành logic của chương trình.

```python
subtotal = 280_000
discount = 0.1 if subtotal >= 200_000 else 0
total = subtotal * (1 - discount)
```

Các nhóm chính gồm số học (`+`, `-`, `*`, `/`, `//`, `%`, `**`), so sánh (`==`, `!=`, `<`, `>=`) và logic (`and`, `or`, `not`). Dùng ngoặc khi ưu tiên chưa rõ thay vì dựa vào trí nhớ về precedence.

## `is` và `==`

`==` so sánh giá trị, còn `is` kiểm tra identity. Dùng `is None` để kiểm tra `None`, nhưng không dùng `is` thay cho `==` khi so sánh chuỗi hoặc số.
