---
title: Tuple trong Python
description: Dùng tuple cho nhóm giá trị có thứ tự, cấu trúc ổn định và có thể unpack.
slug: /collection/tuple
category: collections
categoryLabel: Collections
order: 310
difficulty: beginner
keywords: [tuple python, unpacking, immutable, namedtuple]
updated: 2026-09-18
related: ["/collection/list", "/co-ban/kieu-du-lieu"]
---

Tuple là sequence immutable. Nó diễn đạt tốt một bản ghi nhỏ có cấu trúc cố định:

```python
point = (10, 24)
x, y = point
```

Tuple có thể làm key của dict nếu mọi phần tử bên trong đều hashable. Dùng tuple để thể hiện “số lượng và thứ tự này là một phần của dữ liệu”, còn list khi collection cần thay đổi.

## Unpacking an toàn

```python
first, *middle, last = ["a", "b", "c", "d"]
```

Nếu bản ghi có nhiều trường và cần tên rõ nghĩa, `dataclass` thường dễ đọc hơn tuple vị trí.
