---
title: Class và object
description: Mô hình hóa state và behavior bằng class, instance, method và dataclass.
slug: /oop/class-object
category: oop
categoryLabel: OOP
order: 800
difficulty: intermediate
keywords: [class python, object, instance, self, dataclass]
updated: 2026-09-18
related: ["/oop/inheritance", "/co-ban/kieu-du-lieu", "/module/module"]
---

Class là khuôn mô tả dữ liệu và hành vi; object là một instance cụ thể của class.

```python
from dataclasses import dataclass

@dataclass(frozen=True)
class Money:
    amount: int
    currency: str = "VND"

    def display(self) -> str:
        return f"{self.amount:,} {self.currency}"
```

`self` là instance hiện tại. Hãy giữ invariant của object rõ ràng và hạn chế public mutable state nếu có nhiều rule cần bảo vệ.

Không phải mọi dữ liệu đều cần class. Với record đơn giản, dataclass gọn hơn; với logic thuần biến đổi input thành output, function thường dễ test hơn.

Instance attribute nằm trong từng object; class attribute được chia sẻ qua class và các instance nếu không bị shadow. Đặt mutable class attribute như `tags = []` dễ tạo shared state ngoài ý muốn. `property` phù hợp khi cần giữ invariant nhưng vẫn cung cấp API attribute-like.

`__new__` tạo instance trước `__init__` khởi tạo state; phần lớn class thông thường chỉ cần `__init__`. Khi cần behavior protocol như iteration, indexing hoặc context manager, hãy đọc thêm bài Python Data Model thay vì tạo method tùy ý.
