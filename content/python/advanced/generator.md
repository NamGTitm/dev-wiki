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

## yield from và exhaustion

`yield from child()` chuyển tiếp toàn bộ giá trị của generator con và cả return value cuối nếu cần. Khi generator bị consume hết, lần `next` tiếp theo ném `StopIteration`; vòng `for` tự bắt exception này.

```python
def all_lines(groups):
    for group in groups:
        yield from non_empty_lines(group)
```

Generator expression là cách gọn cho pipeline ngắn. Nếu cần rewind, random access hoặc debug từng bước nhiều lần, materialize có chủ đích thành list.
