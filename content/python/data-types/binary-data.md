---
title: bytes, bytearray và memoryview
description: Chọn đúng kiểu cho dữ liệu nhị phân, encoding và buffer mà không nhầm với string.
slug: /co-ban/binary-data
category: data-types
categoryLabel: Kiểu dữ liệu
order: 190
difficulty: intermediate
keywords: [bytes, bytearray, memoryview, encode, decode, binary data]
updated: 2026-09-18
related: ["/co-ban/string", "/file", "/standard-library/security-modules"]
---

`str` là text; `bytes` là chuỗi byte bất biến; `bytearray` là phiên bản mutable; `memoryview` cho phép nhìn vào buffer mà không copy dữ liệu.

```python
message = "Xin chào"
payload = message.encode("utf-8")
decoded = payload.decode("utf-8")
```

Encoding phải thống nhất giữa producer và consumer. Không gọi `.decode()` lên string hoặc `.encode()` lên bytes một cách tùy tiện. Khi xử lý file, socket hay hash, giữ dữ liệu ở bytes càng lâu càng tốt và chỉ decode tại boundary text.
