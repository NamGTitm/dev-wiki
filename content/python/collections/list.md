---
title: List trong Python
description: List cho dữ liệu có thứ tự, có thể thay đổi và thường xuyên cần thêm hoặc lọc phần tử.
slug: /collection/list
category: collections
categoryLabel: Collections
order: 300
difficulty: beginner
keywords: [list python, collection, indexing, slicing, mutable]
updated: 2026-09-18
related: ["/collection/tuple", "/collection/dictionary", "/co-ban/kieu-du-lieu"]
---

List đại diện cho một dãy phần tử có thứ tự. Nó phù hợp với hàng đợi nhỏ, kết quả truy vấn, danh sách bước xử lý hoặc dữ liệu cần cập nhật.

```python
tasks = ["review", "test", "deploy"]
first_task = tasks[0]
last_two = tasks[-2:]
tasks.append("monitor")
```

## Indexing và slicing

Index bắt đầu từ `0`, index âm đếm từ cuối. Slicing tạo một list mới và dùng quy tắc `start:stop:step`, trong đó `stop` không bao gồm.

## Khi nào không nên dùng list?

Nếu cần tra cứu theo khóa, dùng `dict`; cần loại trùng, dùng `set`; cần dữ liệu bất biến, cân nhắc `tuple`. Xóa đầu list nhiều lần có thể chậm; với queue, dùng `collections.deque`.

## Comprehension

```python
urgent = [task for task in tasks if task in {"review", "deploy"}]
```

Giữ comprehension ngắn và đơn giản. Logic nhiều nhánh nên dùng vòng lặp thường để dễ debug.
