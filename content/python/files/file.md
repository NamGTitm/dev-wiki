---
title: File, pathlib và context manager
description: Đọc ghi file an toàn với pathlib, encoding rõ ràng và khối with.
slug: /file
category: files
categoryLabel: File & IO
order: 700
difficulty: beginner
keywords: [file python, pathlib, open, read, write, context manager]
updated: 2026-09-18
related: ["/exception", "/co-ban/string", "/module/module"]
---

`pathlib.Path` biểu diễn đường dẫn theo cách độc lập hệ điều hành. Dùng `with` để file luôn được đóng đúng cách.

```python
from pathlib import Path

notes = Path("data") / "notes.txt"
notes.parent.mkdir(parents=True, exist_ok=True)
notes.write_text("Ship small changes.\n", encoding="utf-8")
content = notes.read_text(encoding="utf-8")
```

Với file lớn, đọc từng dòng hoặc theo chunk thay vì nạp toàn bộ vào RAM. Khi xử lý đường dẫn do user cung cấp, kiểm tra scope cho phép và tránh để input trở thành đường dẫn tùy ý ra ngoài thư mục dữ liệu.
