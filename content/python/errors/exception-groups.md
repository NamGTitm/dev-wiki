---
title: ExceptionGroup và except*
description: Gom nhiều lỗi đồng thời trong Python 3.11+ và xử lý từng nhóm bằng except*.
slug: /exception/exception-groups
category: errors
categoryLabel: Exception
order: 620
difficulty: advanced
keywords: [ExceptionGroup, except*, Python 3.11, asyncio, concurrent errors]
updated: 2026-09-18
related: ["/exception", "/async/cancellation", "/async/concurrency"]
---

Khi nhiều task chạy đồng thời có thể cùng thất bại, một exception đơn không đủ biểu đạt toàn bộ lỗi. `ExceptionGroup` chứa nhiều exception và `except*` lọc các thành phần phù hợp:

```python
try:
    raise ExceptionGroup("validation", [ValueError("email"), TypeError("age")])
except* ValueError as group:
    print("Sửa input:", group.exceptions)
except* TypeError as group:
    print("Sai type:", group.exceptions)
```

Feature có từ Python 3.11 và xuất hiện trong structured concurrency như `asyncio.TaskGroup`. `except*` không phải bản thay thế mọi `except`; dùng khi thật sự có nhiều lỗi cần xử lý độc lập. Không nuốt nhóm lỗi mà không log hoặc re-raise phần không xử lý.
