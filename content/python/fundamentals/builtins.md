---
title: Built-in functions quan trọng
description: Tra cứu nhóm built-in thường dùng như len, enumerate, zip, map, filter, sorted và isinstance.
slug: /co-ban/builtins
category: fundamentals
categoryLabel: Cơ bản
order: 170
difficulty: beginner
keywords: [builtins, len, enumerate, zip, map, filter, sorted, isinstance, callable]
updated: 2026-09-18
related: ["/dieu-khien/for", "/collection/comprehensions", "/co-ban/object-model"]
---

Built-in là tên có sẵn trong namespace `builtins`, không cần import. Nhóm tạo/biến đổi gồm `int`, `float`, `str`, `list`, `dict`, `set`; nhóm kiểm tra gồm `type`, `isinstance`, `callable`, `hasattr`; nhóm duyệt gồm `len`, `iter`, `next`, `enumerate`, `zip`, `reversed`.

```python
records = [("An", 82), ("Bình", 91)]
for rank, (name, score) in enumerate(sorted(records, key=lambda item: item[1], reverse=True), start=1):
    print(rank, name, score)
```

`all` và `any` short-circuit; `sum`, `min`, `max` nhận iterable; `repr` dành cho representation có ích khi debug; `help`, `dir`, `id` hữu ích trong khám phá. Cẩn thận shadow built-in như đặt variable tên `list` hoặc `id`, vì tên gốc sẽ khó gọi lại trong scope đó.
