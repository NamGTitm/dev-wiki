---
title: async và await
description: Hiểu coroutine, event loop và khi nào asyncio giúp xử lý I/O đồng thời.
slug: /async
category: async
categoryLabel: Async
order: 1000
difficulty: advanced
keywords: [async python, await, asyncio, coroutine, event loop, task]
updated: 2026-09-18
related: ["/advanced/generator", "/exception", "/typing"]
---

`async def` tạo coroutine function. `await` nhường quyền điều khiển trong lúc chờ một thao tác I/O, cho phép event loop phục vụ task khác.

```python
import asyncio

async def refresh_cache() -> str:
    await asyncio.sleep(0.1)  # mô phỏng I/O
    return "cache-ready"

async def main() -> None:
    result = await refresh_cache()
    print(result)

asyncio.run(main())
```

Async không làm CPU-bound code tự nhiên nhanh hơn. Nếu một hàm blocking chạy trong event loop, nó chặn mọi task khác. Với nhiều thao tác I/O độc lập, `asyncio.gather` có thể chạy chúng đồng thời; hãy xử lý timeout, cancellation và exception một cách tường minh.

## Tạo task và structured concurrency

`await refresh_cache()` chạy coroutine tại điểm đó. Nếu muốn bắt đầu nhiều công việc I/O trước khi chờ kết quả, tạo task:

```python
async def main() -> None:
    first = asyncio.create_task(fetch("/first"))
    second = asyncio.create_task(fetch("/second"))
    results = await asyncio.gather(first, second)
```

Task là handle có lifecycle riêng; nếu tạo task mà không giữ hoặc await nó, exception có thể bị báo muộn và task có thể sống lâu hơn dự kiến. Với code mới cần nhiều task có cùng scope, `asyncio.TaskGroup` (Python 3.11+) thể hiện structured concurrency tốt hơn: khi một task lỗi, nhóm sẽ hủy các task còn lại và gom lỗi theo quy tắc `ExceptionGroup`.

Coroutine có thể bị hủy tại điểm await và thường nên để `asyncio.CancelledError` lan truyền sau khi đã cleanup. Đừng nuốt cancellation bằng `except Exception` hay `except BaseException` nếu không có lý do rất rõ; timeout và shutdown phụ thuộc vào tín hiệu này. Dùng `asyncio.to_thread` cho một hàm blocking ngắn khi cần giữ event loop responsive, nhưng vẫn phải giới hạn worker và không biến nó thành hàng đợi vô hạn.
