---
title: Execution model, frame và bytecode
description: Từ source code đến code object, frame và bytecode trong CPython mà không nhầm với ngôn ngữ Python.
slug: /internals/execution-model
category: internals
categoryLabel: Python internals
order: 1730
difficulty: advanced
keywords: [execution model, code object, frame, bytecode, compile, dis, __pycache__]
updated: 2026-09-18
related: ["/bat-dau/implementation", "/internals/cpython", "/standard-library/overview"]
---

CPython parse source, tạo code object chứa bytecode và metadata, rồi thực thi trong interpreter. Frame giữ execution state như local namespace, instruction position và reference tới code object.

```python
import dis

def total(a, b):
    return a + b

dis.dis(total)
```

`.pyc` trong `__pycache__` là cache bytecode cho import; không phải source portable độc lập và không nên commit. Opcode, frame layout và cache strategy là implementation details có thể thay đổi theo version. Dùng `dis`, `inspect` và official docs để học, nhưng đừng dùng opcode cụ thể làm API contract của ứng dụng.
