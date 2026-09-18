---
title: Type hints hiện đại
description: Dùng annotation, TypedDict, Protocol và generic để làm rõ contract của code Python.
slug: /typing
category: typing
categoryLabel: Typing
order: 1100
difficulty: intermediate
keywords: [type hints, typing python, TypedDict, Protocol, Generic, Union]
updated: 2026-09-18
related: ["/ham/function", "/oop/class-object", "/async"]
---

Type hint không thay đổi runtime semantics của Python, nhưng giúp IDE, type checker và người đọc hiểu contract.

```python
from collections.abc import Iterable

def total(values: Iterable[int]) -> int:
    return sum(values)
```

## Chọn abstraction phù hợp

Dùng `TypedDict` cho mapping có schema cố định, `Protocol` cho interface dựa trên behavior, và generic khi một hàm bảo toàn mối quan hệ kiểu giữa input và output. Với Python hiện đại, `list[str]` và `str | None` thường dễ đọc hơn syntax cũ.

Type hint tốt vẫn cần test runtime: dữ liệu từ JSON, network hoặc user input không tự trở nên an toàn chỉ vì đã annotate.
