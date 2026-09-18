---
title: Chọn collection nào trong Python?
description: So sánh list, tuple, dict, set và deque theo semantics, ownership và chi phí tra cứu.
slug: /collection/choose-collection
category: collections
categoryLabel: Collections
order: 360
difficulty: intermediate
keywords: [list tuple dict set, choose collection, data structure, deque]
updated: 2026-09-18
related: ["/collection/list", "/collection/tuple", "/collection/dictionary", "/collection/set"]
---

Chọn theo câu hỏi mà code cần trả lời:

- Cần sequence có thứ tự và cập nhật: `list`.
- Cần record nhỏ, ổn định, unpack được: `tuple` hoặc dataclass nếu cần tên field.
- Cần tra cứu theo key: `dict`.
- Cần membership và phép tập hợp: `set`/`frozenset`.
- Cần queue hai đầu: `collections.deque`.

List membership thường quét tuyến tính; dict/set lookup trung bình nhanh nhưng phụ thuộc hash và workload. Đừng chọn set chỉ vì “O(1)” nếu thứ tự là một phần semantics. Với dữ liệu lồng nhau, quyết định mutable hay immutable cũng quan trọng như tốc độ.
