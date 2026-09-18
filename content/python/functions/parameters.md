---
title: Parameters, arguments và signature
description: Hiểu positional, keyword-only, positional-only, default, args và kwargs trong hàm Python.
slug: /ham/parameters
category: functions
categoryLabel: Hàm
order: 430
difficulty: intermediate
keywords: [parameters, arguments, positional-only, keyword-only, args, kwargs, signature]
updated: 2026-09-18
related: ["/ham/function", "/co-ban/unpacking-walrus", "/best-practices/common-mistakes"]
---

Signature hiện đại có thể quy định cách caller truyền argument:

```python
def connect(host, /, port=443, *, timeout=5, secure=True):
    ...
```

Tham số trước `/` chỉ truyền positional; sau `*` chỉ truyền keyword. Ràng buộc này làm API tự mô tả và cho phép đổi tên implementation mà không phá caller.

`*args` gom positional arguments thành tuple; `**kwargs` gom keyword arguments thành dict. Khi gọi, `func(*values, **options)` unpack theo chiều ngược lại. Default argument được tạo tại thời điểm định nghĩa, nên mutable default như `items=[]` có thể giữ state giữa các lần gọi. Dùng `None` làm sentinel rồi tạo list bên trong.
