---
title: Time complexity và space complexity
description: Đọc chi phí Big-O theo behavior collection và tránh biến average case thành guarantee.
slug: /performance/complexity
category: performance
categoryLabel: Performance
order: 1610
difficulty: intermediate
keywords: [Big O, time complexity, space complexity, algorithm, lookup]
updated: 2026-09-18
related: ["/collection/choose-collection", "/performance/profiling", "/standard-library/collections-itertools"]
---

Complexity mô tả cách thời gian hoặc memory tăng theo input. List membership thường O(n), append amortized O(1), dict/set lookup average-case O(1) nhưng không phải guarantee tuyệt đối cho mọi hash collision hay workload.

```python
allowed = set(allowed_ids)
matches = [row for row in rows if row["id"] in allowed]
```

Đổi list lookup lặp lại sang set có thể giảm thời gian, nhưng phải trả memory và mất semantics thứ tự. Space complexity tính cả object tạm, cache và materialization của generator. Đo workload thật sau khi hiểu bottleneck; Big-O không thay thế benchmark.
