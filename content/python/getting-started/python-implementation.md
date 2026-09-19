---
title: Python implementation và CPython
description: Phân biệt Python language với CPython, PyPy và các implementation khác trước khi đi sâu vào internals.
slug: /bat-dau/implementation
category: getting-started
categoryLabel: Bắt đầu
order: 50
difficulty: beginner
keywords: [CPython, Python implementation, PyPy, interpreter, bytecode]
updated: 2026-09-18
related: ["/bat-dau/python-la-gi", "/internals/cpython", "/internals/execution-model"]
---

**Python** là ngôn ngữ: cú pháp, object model, module, exception và các behavior được đặc tả.

**Implementation** là chương trình thực sự chạy code Python.

## CPython

CPython là implementation phổ biến và mặc định của Python.

Luồng thực thi đơn giản:

```text id="15x7rc"
source .py
   ↓
bytecode
   ↓
CPython interpreter
```

CPython được viết chủ yếu bằng C.

Kiểm tra implementation đang chạy:

```python id="hgkh9i"
import platform

print(platform.python_implementation())
```

Thường sẽ trả về:

```text id="6e7o21"
CPython
```

## Implementation khác

Một số implementation phổ biến:

```text id="v8n6xl"
CPython -> implementation mặc định
PyPy    -> có JIT, có thể nhanh hơn với một số workload
Jython  -> chạy trên JVM
IronPython -> chạy trên .NET
```

Không phải mọi implementation đều hoạt động giống nhau ở mức internals.

## Language behavior và implementation detail

Điểm quan trọng nhất khi đọc tài liệu Python là phân biệt:

```text id="ym06aw"
language guarantee
implementation detail
```

Ví dụ:

```text id="9r2cex"
dict giữ insertion order
```

là behavior của Python hiện đại.

Nhưng:

```text id="mpp1i1"
memory layout của dict
reference counting
chi tiết GIL
kích thước object
```

chủ yếu là implementation detail của CPython.

## Khi debug

Kiểm tra nhanh runtime:

```python id="w5lsp7"
import platform
import sys

print(platform.python_implementation())
print(sys.version)
```

Nếu bug liên quan đến:

- performance,
- memory,
- native extension,
- garbage collection,
- threading,

hãy kiểm tra implementation trước khi kết luận behavior đó là "do Python".

Quy tắc cần nhớ:

```text id="3h93gh"
Python = ngôn ngữ
CPython = một cách triển khai Python
```

Code portable nên dựa vào behavior được Python quy định, không phụ thuộc vào internals riêng của CPython trừ khi bạn chủ động chấp nhận ràng buộc đó.