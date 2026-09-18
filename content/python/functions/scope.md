---
title: Scope và LEGB
description: Hiểu phạm vi tên biến, closure và cách tránh phụ thuộc vào global state.
slug: /ham/scope
category: functions
categoryLabel: Hàm
order: 410
difficulty: intermediate
keywords: [scope, LEGB, local global nonlocal, closure]
updated: 2026-09-18
related: ["/ham/function", "/ham/decorator"]
---

Python tìm tên theo thứ tự LEGB: Local, Enclosing, Global, Built-in. Khi đọc một tên, interpreter tìm từ phạm vi gần nhất ra ngoài.

```python
tax_rate = 0.08

def total_with_tax(amount: float) -> float:
    return amount * (1 + tax_rate)
```

Code dựa vào global dễ khó kiểm thử. Ưu tiên truyền dependency qua parameter. `nonlocal` và `global` có chỗ dùng, nhưng nên hạn chế vì chúng làm thay đổi state bên ngoài hàm.

Closure là hàm giữ lại giá trị từ enclosing scope. Decorator tận dụng cơ chế này để bọc hành vi mà không sửa body hàm gốc.
