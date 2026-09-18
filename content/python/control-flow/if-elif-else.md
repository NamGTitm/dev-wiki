---
title: if, elif và else
description: Rẽ nhánh logic bằng điều kiện rõ ràng, dễ mở rộng và dễ kiểm thử.
slug: /dieu-khien/if-elif-else
category: control-flow
categoryLabel: Điều khiển luồng
order: 200
difficulty: beginner
keywords: [if, elif, else, điều kiện, conditional]
updated: 2026-09-18
related: ["/co-ban/toan-tu", "/dieu-khien/for", "/dieu-khien/while"]
---

`if` chạy một khối khi điều kiện đúng. `elif` cho các nhánh thay thế và `else` xử lý phần còn lại.

```python
score = 82

if score >= 90:
    level = "excellent"
elif score >= 70:
    level = "good"
else:
    level = "needs-review"
```

## Guard clauses

Trong hàm, trả về sớm cho trường hợp không hợp lệ giúp giảm nesting:

```python
def can_publish(is_owner: bool, has_draft: bool) -> bool:
    if not is_owner or not has_draft:
        return False
    return True
```

Đừng nhồi nhiều điều kiện không liên quan vào một dòng. Nếu điều kiện có tên riêng, hãy tách thành biến boolean hoặc hàm nhỏ.
