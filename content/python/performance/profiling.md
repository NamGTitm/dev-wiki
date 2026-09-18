---
title: Đo và tối ưu hiệu năng
description: Bắt đầu từ số đo với timeit, profiler và lựa chọn cấu trúc dữ liệu đúng.
slug: /performance/profiling
category: performance
categoryLabel: Performance
order: 1600
difficulty: advanced
keywords: [profiling, performance, timeit, memory, complexity]
updated: 2026-09-18
related: ["/collection/list", "/advanced/generator", "/standard-library/functools"]
---

Tối ưu hiệu năng nên bắt đầu bằng câu hỏi “đo ở đâu?” thay vì đoán. `timeit` phù hợp cho micro-benchmark nhỏ; profiler phù hợp để tìm hot path trong chương trình thật.

```python
from timeit import timeit

duration = timeit("sum(range(10_000))", number=1_000)
print(f"{duration:.3f}s")
```

Kiểm tra cả độ phức tạp và memory. List comprehension thường nhanh và rõ, nhưng generator giúp giảm memory khi pipeline lớn. Cache chỉ tốt khi hit rate, invalidation và giới hạn bộ nhớ đã được hiểu.
