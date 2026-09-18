---
title: Context manager và with
description: Đảm bảo cleanup tài nguyên bằng with, __enter__, __exit__ và contextlib.
slug: /file/context-manager
category: files
categoryLabel: File & IO
order: 710
difficulty: intermediate
keywords: [context manager, with, __enter__, __exit__, contextlib, cleanup]
updated: 2026-09-18
related: ["/file", "/exception", "/async/cancellation"]
---

Context manager quản lý một khoảng thời gian sử dụng tài nguyên. `with resource() as value` gọi `__enter__`, chạy body, rồi gọi `__exit__` kể cả khi body ném exception.

```python
from contextlib import contextmanager

@contextmanager
def transaction():
    print("begin")
    try:
        yield
    except Exception:
        print("rollback")
        raise
    else:
        print("commit")
```

`__exit__` trả `True` sẽ suppress exception; mặc định nên để lỗi nổi lên. Có thể ghép nhiều context manager trong một `with`. Với coroutine, dùng `async with` và async context manager để cleanup không blocking event loop.
