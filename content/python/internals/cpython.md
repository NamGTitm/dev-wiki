---
title: CPython, object model và bytecode
description: Cách nhìn đúng về CPython, object model và bytecode mà không đơn giản hóa sai.
slug: /internals/cpython
category: internals
categoryLabel: Python internals
order: 1700
difficulty: advanced
keywords: [CPython, bytecode, object model, reference counting, garbage collection]
updated: 2026-09-18
related: ["/co-ban/kieu-du-lieu", "/performance/profiling", "/async"]
---

CPython là một implementation của Python, không phải toàn bộ ngôn ngữ Python. Nó biên dịch source thành bytecode rồi thực thi qua virtual machine.

```python
import dis

def add(left: int, right: int) -> int:
    return left + right

dis.dis(add)
```

Chi tiết quản lý object, reference counting và cyclic garbage collection là đặc tính của CPython và có thể thay đổi theo phiên bản. GIL cũng không nên được mô tả như “Python không chạy song song”: I/O concurrency, multiprocessing và các extension nhả GIL tạo ra những trade-off khác nhau.
