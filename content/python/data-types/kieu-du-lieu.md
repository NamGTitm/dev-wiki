---
title: Kiểu dữ liệu trong Python
description: Bản đồ nhanh về số, chuỗi, boolean, None, bytes và chuyển đổi kiểu.
slug: /co-ban/kieu-du-lieu
category: data-types
categoryLabel: Kiểu dữ liệu
order: 110
difficulty: beginner
keywords: [data types, int, float, str, bool, none, bytes, mutable immutable]
updated: 2026-09-18
related: ["/co-ban/bien", "/co-ban/toan-tu", "/collection/list"]
---

Python có một hệ thống object thống nhất. Một số kiểu nền tảng thường gặp:

```python
count = 3                 # int
ratio = 0.75              # float
enabled = True            # bool
label = "production"     # str
payload = b"OK"          # bytes
missing = None            # NoneType
```

## Chuyển đổi kiểu

Chuyển đổi tường minh giúp code dễ đọc và tránh bất ngờ từ input luôn là chuỗi:

```python
raw_port = "8080"
port = int(raw_port)
assert port > 0
```

## Mutable và immutable

`int`, `float`, `bool`, `str`, `tuple` là immutable: thao tác “thay đổi” tạo object mới. `list`, `dict`, `set` là mutable và có thể thay đổi tại chỗ. Khi truyền object vào hàm, hãy biết hàm đang mutate hay tạo object mới để tránh side effect.
