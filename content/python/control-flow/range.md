---
title: range trong Python
description: Tạo dãy số lười bằng range và hiểu start, stop, step.
slug: /dieu-khien/range
category: control-flow
categoryLabel: Điều khiển luồng
order: 230
difficulty: beginner
keywords: [range, start stop step, dãy số, loop]
updated: 2026-09-18
related: ["/dieu-khien/for", "/co-ban/bien"]
---

`range` biểu diễn một dãy số theo kiểu lazy, nên không tạo sẵn cả list trong bộ nhớ.

```python
for page in range(1, 4):
    print(f"Tải trang {page}")

for index in range(10, 2, -2):
    print(index)  # 10, 8, 6, 4
```

Giá trị `stop` không bao giờ được bao gồm. Nếu bạn chỉ cần duyệt phần tử của collection, ưu tiên duyệt collection trực tiếp thay vì `range(len(items))`.
