---
title: Multiprocessing và ProcessPoolExecutor
description: Chạy CPU-bound work trên process riêng, truyền dữ liệu qua pickle và quản lý shared state.
slug: /concurrency/multiprocessing
category: concurrency
categoryLabel: Concurrency
order: 1040
difficulty: advanced
keywords: [multiprocessing, ProcessPoolExecutor, CPU-bound, process, IPC]
updated: 2026-09-18
related: ["/concurrency/threading", "/performance/profiling", "/internals/gil"]
---

Process có address space riêng, nên phù hợp hơn cho CPU-bound workload trên CPython GIL-enabled. `ProcessPoolExecutor` cung cấp API pool tương tự thread nhưng argument/result phải serialize được.

```python
from concurrent.futures import ProcessPoolExecutor

with ProcessPoolExecutor() as pool:
    totals = list(pool.map(score_document, documents))
```

Mỗi process có startup cost và memory riêng. Code khởi động process cần bảo vệ entrypoint bằng `if __name__ == "__main__":`, đặc biệt trên Windows. Shared state cần IPC như Queue, Pipe, Manager hoặc storage ngoài; đừng giả định biến global được chia sẻ như thread.
