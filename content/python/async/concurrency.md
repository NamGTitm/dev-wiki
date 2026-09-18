---
title: Asyncio, concurrency và event loop
description: Phân biệt synchronous, asynchronous, concurrency, parallelism, coroutine, task và future.
slug: /async/concurrency
category: async
categoryLabel: Async
order: 1010
difficulty: advanced
keywords: [asyncio, concurrency, parallelism, coroutine, task, future, event loop]
updated: 2026-09-18
related: ["/async", "/async/cancellation", "/concurrency/threading"]
---

Concurrency là nhiều công việc cùng tiến triển; parallelism là thực sự chạy đồng thời trên nhiều execution unit. `asyncio` thường dùng một event loop điều phối coroutine khi chúng `await` I/O.

```python
import asyncio

async def fetch(name: str, delay: float) -> str:
    await asyncio.sleep(delay)
    return name

async def main():
    first, second = await asyncio.gather(fetch("A", .1), fetch("B", .1))
    return first, second
```

`asyncio.create_task` schedule coroutine chạy trong background của loop; `Future` là placeholder kết quả thấp-level hơn Task. Async code không làm CPU-bound work tự nhiên nhanh hơn. Một lệnh blocking như `time.sleep()` trong event loop sẽ chặn mọi task khác; dùng async API hoặc chuyển blocking work sang thread/process phù hợp.
