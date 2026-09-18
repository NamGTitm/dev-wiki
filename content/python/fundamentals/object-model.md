---
title: Python object model
description: Object gồm identity, type và value; name chỉ là binding trỏ tới object trong runtime.
slug: /co-ban/object-model
category: fundamentals
categoryLabel: Cơ bản
order: 140
difficulty: intermediate
keywords: [object model, identity, type, value, binding, reference, hashable]
updated: 2026-09-18
related: ["/co-ban/bien", "/co-ban/kieu-du-lieu", "/co-ban/copying-aliasing"]
---

Trong Python, mọi giá trị đều là object. Object có identity, type và value. Tên được bind tới object; tên không phải chiếc hộp chứa dữ liệu và type không “nằm trong” variable.

```python
a = [1, 2]
b = a
b.append(3)
print(a)  # [1, 2, 3]
print(a is b)  # True
```

`b = a` tạo thêm binding tới cùng list. `a == b` hỏi hai object có value tương đương hay không; `a is b` hỏi có cùng identity hay không. Chỉ dùng `is` cho singleton như `None`, không dùng để so sánh string hoặc số.

Object có lifecycle: được tạo, được bind bởi tên hoặc container, rồi có thể được thu hồi khi không còn reference hữu ích. Chi tiết thu hồi phụ thuộc implementation; code đúng không nên dựa vào thời điểm destructor chạy.
