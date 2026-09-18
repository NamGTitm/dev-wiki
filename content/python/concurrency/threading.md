---
title: Threading và race condition
description: Dùng thread, Lock, Queue và concurrent.futures cho I/O concurrency; hiểu giới hạn của GIL.
slug: /concurrency/threading
category: concurrency
categoryLabel: Concurrency
order: 1030
difficulty: advanced
keywords: [threading, thread, race condition, Lock, Queue, ThreadPoolExecutor, GIL]
updated: 2026-09-18
related: ["/async/concurrency", "/internals/gil", "/concurrency/multiprocessing"]
---

Thread hữu ích khi nhiều công việc chờ I/O hoặc khi thư viện native nhả GIL. Race condition xảy ra khi nhiều thread đọc/ghi state chung mà invariant không được bảo vệ.

```python
from concurrent.futures import ThreadPoolExecutor

with ThreadPoolExecutor(max_workers=4) as pool:
    results = list(pool.map(fetch_url, urls))
```

`Lock`, `RLock`, `Semaphore`, `Event` và `Queue` là các primitive chính. Ưu tiên truyền message qua Queue hoặc giữ state immutable thay vì chia sẻ mutable state. GIL của build CPython mặc định hạn chế việc chạy đồng thời bytecode Python CPU-bound, nhưng không có nghĩa Python không multithreading được.
