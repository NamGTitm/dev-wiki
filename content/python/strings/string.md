---
title: String trong Python
description: Làm việc với chuỗi, indexing, slicing, method, Unicode và f-string.
slug: /co-ban/string
category: strings
categoryLabel: Chuỗi
order: 340
difficulty: beginner
keywords: [string python, str, f-string, unicode, encoding]
updated: 2026-09-18
related: ["/co-ban/kieu-du-lieu", "/co-ban/bien", "/co-ban/toan-tu"]
---

String là sequence immutable của các ký tự Unicode. Bạn có thể index, slice và gọi method mà không làm thay đổi string gốc.

```python
customer = "Nguyễn An"
display = customer.strip().title()
message = f"Xin chào {display}"
```

## Formatting

Ưu tiên f-string khi ghép giá trị vào câu. Với dữ liệu do người dùng nhập, xử lý và escape theo ngữ cảnh trước khi đưa vào HTML, SQL hoặc shell.

## Encoding

Khi đọc ghi file, nêu rõ encoding nếu dữ liệu đi qua nhiều hệ thống:

```python
from pathlib import Path

content = Path("notes.txt").read_text(encoding="utf-8")
```

`encode()` chuyển string thành bytes; `decode()` chuyển bytes về string. Đừng nhầm byte length với số ký tự Unicode.
