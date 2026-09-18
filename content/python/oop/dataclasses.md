---
title: Dataclass trong Python
description: Tạo record có type hint với dataclass, field, frozen, slots, default_factory và post_init.
slug: /oop/dataclasses
category: oop
categoryLabel: OOP
order: 850
difficulty: intermediate
keywords: [dataclass, field, default_factory, frozen, slots, post_init]
updated: 2026-09-18
related: ["/oop/class-object", "/oop/data-model", "/collection/choose-collection"]
---

`@dataclass` sinh `__init__`, `__repr__`, so sánh và các method khác từ annotation:

```python
from dataclasses import dataclass, field

@dataclass(slots=True)
class Job:
    name: str
    tags: list[str] = field(default_factory=list)
```

`default_factory` tạo list mới cho từng instance; dùng `tags=[]` sẽ chia sẻ mutable default. `frozen=True` ngăn assignment sau khởi tạo nhưng không tự biến object lồng nhau thành immutable. `slots=True` giảm overhead instance dictionary và chặn attribute tùy ý, nhưng có trade-off với inheritance và reflection.

Dataclass phù hợp cho data object nội bộ. Nếu cần tuple semantics hoặc backward-compatible positional record, NamedTuple là lựa chọn khác; nếu behavior nhiều hơn data, normal class có thể rõ hơn.
