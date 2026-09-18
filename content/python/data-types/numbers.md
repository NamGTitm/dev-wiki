---
title: Number, float và Decimal
description: Số nguyên arbitrary precision, float IEEE 754, complex, NaN, infinity và rounding.
slug: /co-ban/numbers
category: data-types
categoryLabel: Kiểu dữ liệu
order: 180
difficulty: intermediate
keywords: [int, float, complex, decimal, NaN, infinity, rounding, IEEE 754]
updated: 2026-09-18
related: ["/co-ban/kieu-du-lieu", "/co-ban/toan-tu", "/standard-library/datetime"]
---

`int` có precision tùy kích thước bộ nhớ, nên không overflow ở một giới hạn 32-bit cố định như nhiều ngôn ngữ. `float` thường là IEEE 754 double precision và có sai số biểu diễn:

```python
print(0.1 + 0.2 == 0.3)  # False
```

Đây không phải lỗi của phép cộng; nhiều phân số thập phân không có biểu diễn nhị phân hữu hạn. Dùng `math.isclose` cho so sánh gần đúng. Với tiền tệ hoặc decimal cần kiểm soát, dùng `decimal.Decimal` thay vì cộng float rồi round ở cuối.

`complex` dùng phần thực và ảo; `bool` là subtype của `int`, nên `True == 1` là đúng nhưng không có nghĩa nên trộn chúng trong mọi API. `float("nan")` không bằng chính nó, còn infinity cần xử lý trước khi tính toán.
