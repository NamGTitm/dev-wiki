---
title: pathlib
description: Xây đường dẫn và thao tác file bằng object API portable thay vì nối chuỗi thủ công.
slug: /standard-library/pathlib
category: standard-library
categoryLabel: Standard library
order: 1320
difficulty: beginner
keywords: [pathlib, Path, file path, glob, mkdir, read_text]
updated: 2026-09-18
related: ["/file", "/standard-library/overview", "/security/secure-coding"]
---

`Path` biểu diễn đường dẫn theo semantics của hệ điều hành:

```python
from pathlib import Path

root = Path("reports")
for file in root.glob("*.csv"):
    print(file.name, file.stat().st_size)
```

Dùng `/` để ghép path, `exists`, `is_file`, `mkdir`, `read_text`, `write_text`, `open` cho thao tác phổ biến. Nêu rõ encoding khi đọc text. Với path đến từ user, resolve và kiểm tra nó nằm trong thư mục được phép trước khi đọc/ghi để tránh path traversal.
