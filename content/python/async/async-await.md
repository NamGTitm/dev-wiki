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
