---
title: Set trong Python
description: Loại trùng và thực hiện phép hợp, giao, hiệu trên các tập phần tử.
slug: /collection/set
category: collections
categoryLabel: Collections
order: 330
difficulty: beginner
keywords: [set python, unique, union, intersection]
updated: 2026-09-18
related: ["/collection/list", "/collection/dictionary"]
---

Set chứa các phần tử không trùng nhau và không nên được dùng khi thứ tự là dữ liệu quan trọng.

```python
frontend = {"alice", "minh", "lan"}
reviewers = {"lan", "duy"}
both = frontend & reviewers
only_frontend = frontend - reviewers
```

Set thường là lựa chọn tốt để kiểm tra membership nhiều lần hoặc loại trùng. Nếu cần giữ thứ tự xuất hiện và chỉ loại trùng, hãy cân nhắc `dict.fromkeys(items)`.
