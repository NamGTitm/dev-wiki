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

Python là tên của ngôn ngữ và tập hợp các quy tắc về cú pháp, object, module, exception cùng thư viện chuẩn. **Implementation** là chương trình thực thi các quy tắc đó.

## CPython là gì?

CPython là implementation mặc định và được dùng rộng rãi nhất. Nó viết chủ yếu bằng C, biên dịch source thành bytecode rồi chạy bytecode trong interpreter. Nhiều package native và chi tiết như reference counting, GIL hay layout object là đặc tính của CPython, không phải cam kết chung của mọi Python implementation.

PyPy dùng JIT để tối ưu một số workload Python; các implementation khác phục vụ JVM, .NET hoặc môi trường đặc biệt. Code portable nên dựa vào behavior được ngôn ngữ hoặc standard library quy định, không dựa vào địa chỉ object hay memory layout nội bộ.

## Cách dùng thông tin này

Khi tài liệu nói “Python làm X”, hãy hỏi X là language guarantee hay implementation detail. Ví dụ dict giữ insertion order là behavior ngôn ngữ hiện đại; kích thước bucket của dict lại là chi tiết CPython có thể thay đổi.
