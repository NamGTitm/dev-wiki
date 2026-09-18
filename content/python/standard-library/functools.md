---
title: functools
description: Các công cụ chuẩn cho higher-order function, cache và thao tác callable.
slug: /standard-library/functools
category: standard-library
categoryLabel: Standard library
order: 1300
difficulty: advanced
keywords: [functools, lru_cache, wraps, partial, reduce]
updated: 2026-09-18
related: ["/ham/decorator", "/advanced/generator"]
---

`functools` chứa các tiện ích khi làm việc với callable. `wraps` giữ metadata khi viết decorator; `partial` cố định một phần argument; `lru_cache` memoize các hàm thuần với input hashable.

```python
from functools import lru_cache

@lru_cache(maxsize=128)
def fibonacci(n: int) -> int:
    if n < 2:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)
```

Cache cần policy: dữ liệu có thay đổi không, key có thể tăng vô hạn không và khi nào cần invalidation. Đừng thêm cache trước khi đo đạc bottleneck.
