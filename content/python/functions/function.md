---
title: Hàm trong Python
description: Thiết kế hàm nhỏ, rõ contract với parameter, return value và type hint.
slug: /ham/function
category: functions
categoryLabel: Hàm
order: 400
difficulty: beginner
keywords: [function python, def, return, parameter, argument]
updated: 2026-09-18
related: ["/ham/scope", "/co-ban/bien", "/co-ban/kieu-du-lieu"]
---

Hàm đóng gói một thao tác có tên, đầu vào và đầu ra rõ ràng. Hàm tốt thường làm một việc và dễ gọi lại.

```python
def calculate_total(subtotal: int, discount_rate: float = 0.0) -> int:
    """Return the rounded total after a percentage discount."""
    return round(subtotal * (1 - discount_rate))

total = calculate_total(280_000, discount_rate=0.1)
```

## Parameter và argument

Parameter là tên trong định nghĩa; argument là giá trị khi gọi. Dùng keyword argument cho giá trị dễ gây nhầm, đặc biệt khi hàm có nhiều tham số cùng kiểu.

Tránh mutable default như `items=[]`; giá trị mặc định được tạo một lần khi định nghĩa hàm và có thể bị giữ lại giữa các lần gọi.

## Contract và return

Không có `return` hoặc `return` trống đều trả `None`. Hãy ghi rõ output và side effect trong docstring khi function được dùng bởi module khác. Annotation giúp đọc contract nhưng không tự validate runtime; dữ liệu từ JSON vẫn cần kiểm tra.

Hàm nên nhận dependency qua parameter thay vì đọc global state ẩn. Khi function có quá nhiều flag làm thay đổi nhiều behavior, tách use case hoặc tạo object cấu hình có tên thường dễ test hơn.
