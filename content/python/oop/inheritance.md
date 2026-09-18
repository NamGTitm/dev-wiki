---
title: Inheritance và composition
description: Chọn giữa kế thừa và composition khi mô hình hóa hành vi mở rộng.
slug: /oop/inheritance
category: oop
categoryLabel: OOP
order: 810
difficulty: intermediate
keywords: [inheritance python, composition, polymorphism, super]
updated: 2026-09-18
related: ["/oop/class-object", "/ham/decorator"]
---

Inheritance mô tả quan hệ “is-a”; composition mô tả “has-a”. Trong ứng dụng lớn, composition thường linh hoạt hơn vì bạn có thể thay collaborator mà không tạo cây class sâu.

```python
class EmailNotifier:
    def send(self, message: str) -> None:
        print(f"Email: {message}")

class OrderService:
    def __init__(self, notifier: EmailNotifier) -> None:
        self.notifier = notifier
```

Polymorphism không nhất thiết cần inheritance: chỉ cần object cung cấp method mà consumer cần. Đây là tinh thần duck typing, nhưng interface nên được làm rõ bằng Protocol khi project lớn.
