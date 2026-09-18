---
title: Descriptor protocol
description: Hiểu __get__, __set__, data descriptor, non-data descriptor và vì sao method là descriptor.
slug: /oop/descriptors
category: oop
categoryLabel: OOP
order: 840
difficulty: advanced
keywords: [descriptor, __get__, __set__, __delete__, property, method binding]
updated: 2026-09-18
related: ["/oop/data-model", "/oop/class-object", "/oop/dataclasses"]
---

Descriptor là object định nghĩa `__get__`, `__set__` hoặc `__delete__`. Khi đặt trên class, descriptor điều khiển attribute access.

```python
class Positive:
    def __set_name__(self, owner, name): self.name = name
    def __get__(self, instance, owner=None): return instance.__dict__[self.name]
    def __set__(self, instance, value):
        if value <= 0: raise ValueError("must be positive")
        instance.__dict__[self.name] = value
```

Data descriptor có `__set__`/`__delete__` và thường ưu tiên hơn instance dictionary; non-data descriptor chỉ có `__get__` và có thể bị instance attribute che. `property`, bound method và nhiều framework field đều dựa trên cơ chế này. Đây là implementation behavior cụ thể của object attribute lookup, nên hãy kiểm tra lookup order trước khi viết descriptor phức tạp.
