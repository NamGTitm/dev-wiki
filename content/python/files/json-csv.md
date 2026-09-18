---
title: JSON, CSV và configuration file
description: Trao đổi dữ liệu text có cấu trúc bằng json và csv, xử lý encoding và input không tin cậy.
slug: /file/json-csv
category: files
categoryLabel: File & IO
order: 720
difficulty: beginner
keywords: [JSON, CSV, json, csv, configuration, encoding]
updated: 2026-09-18
related: ["/file", "/security/secure-coding", "/standard-library/json"]
---

JSON phù hợp cho object, list, string, number và boolean có schema rõ. CSV phù hợp với bảng phẳng cần trao đổi với spreadsheet. Cả hai đều là text format, không phải cơ chế lưu object Python tùy ý.

```python
import json
from pathlib import Path

settings = json.loads(Path("settings.json").read_text(encoding="utf-8"))
Path("settings.out.json").write_text(json.dumps(settings, indent=2), encoding="utf-8")
```

Dữ liệu từ file hoặc user là untrusted input: validate field, type và giới hạn kích thước trước khi dùng. Không dùng `pickle` để thay JSON khi input có thể bị sửa. Với CSV, luôn cân nhắc delimiter, header, newline và encoding thay vì giả định file luôn chuẩn.
