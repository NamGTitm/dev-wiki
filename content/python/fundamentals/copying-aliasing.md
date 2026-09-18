---
title: Aliasing, shallow copy và deep copy
description: Hiểu khi nào hai tên dùng chung object và chọn cách copy đúng cho cấu trúc lồng nhau.
slug: /co-ban/copying-aliasing
category: fundamentals
categoryLabel: Cơ bản
order: 150
difficulty: intermediate
keywords: [aliasing, shallow copy, deep copy, copy, mutable]
updated: 2026-09-18
related: ["/co-ban/object-model", "/collection/list", "/best-practices/common-mistakes"]
---

Assignment không copy object mutable:

```python
original = {"tags": ["python"]}
alias = original
alias["tags"].append("docs")
```

`original` cũng đổi vì cả hai tên trỏ cùng dict. `original.copy()` hoặc `copy.copy()` chỉ copy lớp ngoài; list `tags` bên trong vẫn dùng chung. `copy.deepcopy()` duyệt và copy sâu hơn, nhưng có thể đắt, không phù hợp với mọi object và có thể gặp vòng tham chiếu.

Hãy chọn cách copy theo ownership: nếu object immutable, share thường an toàn; nếu cần snapshot của dữ liệu lồng nhau, copy rõ ràng; nếu có thể, thiết kế API trả object mới và tránh chia sẻ state mutable giữa các boundary.
