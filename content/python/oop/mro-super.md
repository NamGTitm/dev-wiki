---
title: Multiple inheritance, MRO và super
description: Method Resolution Order và cooperative inheritance trong Python, với các trade-off thực tế.
slug: /oop/mro-super
category: oop
categoryLabel: OOP
order: 870
difficulty: advanced
keywords: [multiple inheritance, MRO, super, method resolution order, mixin]
updated: 2026-09-18
related: ["/oop/inheritance", "/oop/data-model", "/oop/descriptors"]
---

Python dùng C3 linearization để tính Method Resolution Order (MRO), thứ tự class được tìm khi lookup method. `Class.mro()` cho phép xem kết quả.

```python
class LoggedMixin:
    def save(self):
        print("saving")
        return super().save()
```

`super()` không đơn giản là “gọi parent trực tiếp”; nó tiếp tục tìm trong MRO từ vị trí hiện tại. Cooperative multiple inheritance yêu cầu mọi class nhận signature tương thích và gọi `super()` đúng cách. Mixin nên nhỏ, không giữ state ẩn và mô tả một capability.

Nếu hierarchy bắt đầu cần giải thích bằng sơ đồ dài, composition thường là lựa chọn bền hơn. Đừng dùng multiple inheritance chỉ để tái sử dụng vài dòng code.
