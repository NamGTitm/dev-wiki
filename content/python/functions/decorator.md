---
title: Decorator
description: Bọc một hàm để thêm logging, đo thời gian hoặc policy mà không sửa logic chính.
slug: /ham/decorator
category: functions
categoryLabel: Hàm
order: 420
difficulty: advanced
keywords: [decorator python, wrapper, functools wraps, higher order function]
updated: 2026-09-18
related: ["/ham/function", "/ham/scope", "/standard-library/functools"]
---

Decorator là callable nhận một callable khác và trả về callable mới. Dùng `functools.wraps` để giữ metadata của hàm gốc.

```python
from functools import wraps

def traced(function):
    @wraps(function)
    def wrapper(*args, **kwargs):
        print(f"calling {function.__name__}")
        return function(*args, **kwargs)
    return wrapper

@traced
def publish(title: str) -> None:
    print(title)
```

Decorator phù hợp cho cross-cutting concern như logging, retry hoặc authorization. Đừng ẩn business rule quan trọng trong quá nhiều lớp wrapper; khi debug, sự trong suốt của call stack cũng là một tính năng.
