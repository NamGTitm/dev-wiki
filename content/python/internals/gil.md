---
title: Global Interpreter Lock (GIL)
description: GIL của CPython, CPU-bound và IO-bound, thread/process, free-threaded build từ Python 3.13+.
slug: /internals/gil
category: internals
categoryLabel: Python internals
order: 1720
difficulty: advanced
keywords: [GIL, Global Interpreter Lock, CPython, free-threaded, threading, multiprocessing]
updated: 2026-09-18
related: ["/concurrency/threading", "/concurrency/multiprocessing", "/internals/cpython"]
---

GIL là lock trong build CPython mặc định bảo vệ một số invariant khi thực thi bytecode Python. Nó khiến nhiều thread không đồng thời chạy bytecode Python CPU-bound trong cùng interpreter theo cách nhiều người kỳ vọng, nhưng thread vẫn hữu ích cho I/O và extension có nhả GIL.

CPU-bound cần throughput thường cân nhắc multiprocessing, native extension hoặc thuật toán tốt hơn. I/O-bound thường dùng thread hoặc asyncio. Đây là trade-off của CPython, không phải câu “Python không chạy đa luồng”.

Python 3.13 giới thiệu free-threaded build tùy chọn; Python 3.14 tiếp tục cải thiện nhưng build này có trade-off và compatibility riêng. Tài liệu phải ghi rõ interpreter/build target, không suy ra mọi Python đều free-threaded hay mọi package native đã thread-safe.
