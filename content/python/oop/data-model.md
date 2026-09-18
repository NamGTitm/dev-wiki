---
title: Python Data Model
description: Protocol dunder là cách object tham gia vào cú pháp Python: iteration, comparison, indexing và context.
slug: /oop/data-model
category: oop
categoryLabel: OOP
order: 820
difficulty: advanced
keywords: [Python data model, dunder, protocol, special method, object protocol]
updated: 2026-09-18
related: ["/oop/dunder", "/oop/descriptors", "/co-ban/object-model"]
---

Python không hỏi object có thuộc class cụ thể hay không cho mọi thao tác; nó thường gọi protocol. `len(value)` tìm `__len__`, `for value in items` dùng `__iter__`, `a + b` tìm special method số học.

```python
class Batch:
    def __init__(self, items):
        self.items = list(items)
    def __len__(self):
        return len(self.items)
    def __iter__(self):
        return iter(self.items)
```

Protocol giúp object custom hòa vào ngôn ngữ, nhưng special method cần giữ invariant của protocol. Nếu `__eq__` thay đổi mà `__hash__` không còn nhất quán, object có thể hỏng khi làm dict key. Đây là nơi duck typing, data model và type Protocol gặp nhau.
