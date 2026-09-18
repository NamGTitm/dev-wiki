---
title: Memory, generator và weak reference
description: Quản lý lifetime object, lazy pipeline, gc và weak reference ở mức ứng dụng.
slug: /performance/memory
category: performance
categoryLabel: Performance
order: 1620
difficulty: advanced
keywords: [memory, generator, gc, weakref, reference counting, memory leak]
updated: 2026-09-18
related: ["/advanced/generator", "/internals/memory-management", "/performance/profiling"]
---

List giữ toàn bộ phần tử; generator chỉ tạo phần tử khi consumer yêu cầu. Với file hoặc stream lớn, lazy pipeline có thể giảm peak memory, nhưng iterator chỉ đi một lần và giữ closure/captured object nếu thiết kế bất cẩn.

CPython có reference counting và cyclic garbage collector, nhưng “memory leak” ở app Python vẫn có thể đến từ cache không giới hạn, global collection, callback giữ reference hoặc extension native. `weakref` cho phép tham chiếu không giữ object sống, phù hợp cho cache phụ trợ.

Đo bằng profiler/memory tracer trước khi tối ưu; gọi `gc.collect()` bừa bãi hiếm khi là fix đúng cho ownership sai.
