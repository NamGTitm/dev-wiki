---
title: Iterable và iterator
description: Hiểu iteration protocol, iter, next, StopIteration và điều thực sự xảy ra trong vòng for.
slug: /iteration/iterable-iterator
category: iteration
categoryLabel: Iteration
order: 450
difficulty: intermediate
keywords: [iterable, iterator, iter, next, StopIteration, iteration protocol]
updated: 2026-09-18
related: ["/dieu-khien/for", "/advanced/generator", "/co-ban/builtins"]
---

Iterable là object có thể cung cấp iterator, thường qua `__iter__`. Iterator có `__next__` và báo hết dữ liệu bằng `StopIteration`.

```python
items = ["draft", "review"]
iterator = iter(items)
print(next(iterator))  # draft
print(next(iterator))  # review
```

`for item in items` gần tương đương việc gọi `iter(items)`, gọi `next` lặp lại, rồi bắt `StopIteration`. Iterator thường bị consume; gọi lại `iter(iterator)` không nhất thiết reset nó. Nếu cần lặp lại nhiều lần, giữ iterable có thể tạo iterator mới.

Custom iterator cần cẩn thận state và exception. Generator tự động implement protocol nên thường là lựa chọn gọn hơn.
