---
title: Protocol, Generic và type narrowing
description: Dùng structural typing, generic, TypeGuard và TypeIs để diễn tả contract mà không ép inheritance.
slug: /typing/protocols-generics
category: typing
categoryLabel: Typing
order: 1110
difficulty: advanced
keywords: [Protocol, Generic, TypeVar, TypeGuard, TypeIs, structural typing, type narrowing]
updated: 2026-09-18
related: ["/typing", "/oop/data-model", "/ham/function"]
---

`Protocol` mô tả behavior cần có thay vì yêu cầu class kế thừa một base class. Đây là structural typing: object phù hợp nếu có các member cần thiết.

```python
from typing import Protocol

class Storable(Protocol):
    def save(self) -> None: ...

def persist(item: Storable) -> None:
    item.save()
```

`TypeVar` giữ mối quan hệ kiểu giữa input/output; `Generic` đóng gói class hoặc function có tham số kiểu. `TypeGuard` cho phép narrowing sang kiểu không nhất thiết là subtype; `TypeIs` có từ Python 3.13 và cho phép checker thu hẹp cả nhánh false khi predicate đúng contract.

Type checker mới diễn giải các annotation này; runtime Python không tự chặn argument sai kiểu. Đừng dùng `cast` để che dữ liệu chưa validate.
