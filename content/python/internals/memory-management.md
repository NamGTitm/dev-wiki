---
title: Reference counting và garbage collection
description: Lifetime object trong CPython, cyclic references và giới hạn khi nói về memory management.
slug: /internals/memory-management
category: internals
categoryLabel: Python internals
order: 1710
difficulty: advanced
keywords: [reference counting, garbage collection, cyclic references, gc, weakref, CPython]
updated: 2026-09-18
related: ["/internals/cpython", "/performance/memory", "/co-ban/object-model"]
---

CPython theo dõi reference count của nhiều object; khi count về zero, object thường được giải phóng ngay. Reference cycle có thể khiến count không về zero, nên cyclic GC phát hiện và xử lý các cycle không còn reachable.

Đây là implementation detail, không phải language guarantee về thời điểm cleanup. `__del__` làm lifecycle phức tạp và không nên là cơ chế duy nhất để đóng file/socket; dùng context manager cho resource ngoài Python heap.

Object giữ reference gián tiếp qua closure, cache, class attribute hoặc callback rất dễ sống lâu hơn mong muốn. Dùng ownership rõ, weakref khi phù hợp và profiler khi nghi ngờ leak.
