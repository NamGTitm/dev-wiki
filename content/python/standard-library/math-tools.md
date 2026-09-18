---
title: math, decimal, fractions, random và statistics
description: Chọn đúng công cụ số học, xác suất và thống kê thay vì dùng float cho mọi bài toán.
slug: /standard-library/math-tools
category: standard-library
categoryLabel: Standard library
order: 1360
difficulty: intermediate
keywords: [math, decimal, fractions, random, secrets, statistics, float, precision]
updated: 2026-09-18
related: ["/co-ban/numbers", "/standard-library/security-modules", "/best-practices/common-mistakes"]
---

`math` cung cấp hàm số thực như `sqrt`, `isclose`, `ceil`, `floor`, `gcd`; dùng `math.isclose` khi so sánh float do sai số biểu diễn nhị phân. `decimal.Decimal` phù hợp cho tiền tệ khi cần quy tắc làm tròn rõ ràng. `fractions.Fraction` giữ phân số chính xác và hữu ích trong tính toán hữu tỉ.

`random` là PRNG cho mô phỏng, shuffle và dữ liệu test; không dùng nó cho token, mật khẩu hoặc quyết định bảo mật. Với mục đích đó, dùng `secrets`. `statistics` cung cấp mean, median, quantiles cho dữ liệu nhỏ trong bộ nhớ; dataset lớn hoặc phân tích chuyên sâu cần công cụ phù hợp hơn.

```python
from decimal import Decimal
from math import isclose

total = Decimal("0.10") + Decimal("0.20")
assert total == Decimal("0.30")
assert isclose(0.1 + 0.2, 0.3, rel_tol=1e-12)
```

Hãy ghi rõ đơn vị, precision và cách rounding trong domain model. Đừng trộn `float` và `Decimal` ngầm; chuyển đổi tại boundary với quy ước được kiểm thử.
