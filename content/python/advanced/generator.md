---
title: Generator và yield
description: Xử lý stream dữ liệu theo kiểu lazy để giảm memory và diễn đạt pipeline rõ hơn.
slug: /advanced/generator
category: advanced
categoryLabel: Nâng cao
order: 900
difficulty: advanced
keywords: [generator python, yield, lazy evaluation, iterator]
updated: 2026-09-18
related: ["/dieu-khien/for", "/async", "/collection/list"]
---

Generator function tạm dừng tại `yield` và tiếp tục khi consumer yêu cầu giá trị tiếp theo. Nó phù hợp với file lớn, cursor hoặc pipeline dữ liệu.

```python
def non_empty_lines(lines):
    for line in lines:
        cleaned = line.strip()
        if cleaned:
            yield cleaned

for line in non_empty_lines(["  deploy  ", "", "monitor"]):
    print(line)
```

Generator chỉ đi một chiều và chỉ chạy khi được consume. Nếu cần truy cập ngẫu nhiên hoặc lặp lại nhiều lần, list có thể phù hợp hơn. Đừng biến mọi logic thành generator chỉ vì nó “tiết kiệm memory”; hãy chọn theo lifetime dữ liệu.
