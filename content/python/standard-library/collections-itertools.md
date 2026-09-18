---
title: collections, itertools và operator
description: Các công cụ chuẩn để nhóm, đếm, tạo pipeline và tránh tự viết loop dễ lỗi.
slug: /standard-library/collections-itertools
category: standard-library
categoryLabel: Standard library
order: 1380
difficulty: intermediate
keywords: [collections, Counter, defaultdict, deque, itertools, groupby, operator]
updated: 2026-09-18
related: ["/collection/choose-collection", "/advanced/generator", "/standard-library/functools"]
---

`Counter` đếm frequency, `defaultdict` tạo default khi thiếu key, `deque` hỗ trợ append/pop hai đầu. `itertools` cung cấp iterator building blocks như `chain`, `islice`, `product`, `groupby` và `accumulate`.

```python
from collections import Counter

counts = Counter(["ok", "failed", "ok"])
print(counts["ok"])  # 2
```

`groupby` chỉ gom các phần tử kề nhau có cùng key, nên thường cần sort trước. Các công cụ này tạo pipeline lazy; hãy biết lúc nào consumer consume hết và lúc nào cần materialize thành list.
