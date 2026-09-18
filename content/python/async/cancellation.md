---
title: Async cancellation, timeout và TaskGroup
description: Quản lý timeout, cancellation và structured concurrency mà không nuốt CancelledError.
slug: /async/cancellation
category: async
categoryLabel: Async
order: 1020
difficulty: advanced
keywords: [asyncio cancellation, timeout, TaskGroup, CancelledError, shield]
updated: 2026-09-18
related: ["/async", "/async/concurrency", "/exception/exception-groups"]
---

Task bị cancel sẽ nhận `asyncio.CancelledError` tại một điểm await. Cleanup nên đặt trong `finally` và thường phải re-raise sau khi dọn xong:

```python
async def worker():
    try:
        await do_io()
    finally:
        await close_resource()
```

`asyncio.timeout()` giới hạn thời gian; `TaskGroup` gom task theo structured concurrency. Khi một task thất bại, task còn lại bị cancel và lỗi có thể được gom thành ExceptionGroup. Nuốt `CancelledError` có thể làm TaskGroup hoặc timeout hoạt động sai.

`shield` chỉ bảo vệ một awaitable khỏi cancellation bên ngoài trong phạm vi cụ thể; nó không phải cách biến mọi work thành “không thể hủy”. Luôn đặt policy timeout và retry theo business operation.
