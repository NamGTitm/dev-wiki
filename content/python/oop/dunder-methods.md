---
title: Dunder methods quan trọng
description: Tra cứu __repr__, __str__, __eq__, __hash__, __getitem__, __call__ và arithmetic methods.
slug: /oop/dunder
category: oop
categoryLabel: OOP
order: 830
difficulty: advanced
keywords: [dunder methods, __repr__, __str__, __eq__, __hash__, __getitem__, __call__]
updated: 2026-09-18
related: ["/oop/data-model", "/oop/class-object", "/oop/descriptors"]
---

`__repr__` nên hữu ích cho developer và cố gắng không mơ hồ; `__str__` dành cho text thân thiện. `__bool__` quyết định truth value, `__len__` có thể làm object falsey khi trả `0`.

`__eq__` định nghĩa equality; object mutable hoặc equality tùy state thường không nên hash. `__getitem__`, `__setitem__`, `__contains__` tạo cảm giác mapping/sequence. `__call__` cho phép instance được gọi như function.

Arithmetic dunder như `__add__` nên trả `NotImplemented` khi gặp operand không hỗ trợ thay vì cố đoán. `NotImplemented` khác `NotImplementedError`: cái đầu là tín hiệu cho binary operation thử phép phản xạ hoặc trả TypeError; cái sau là exception báo API chưa triển khai.
