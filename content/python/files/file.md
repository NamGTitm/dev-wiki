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

## File object và mode

`open(path, "r", encoding="utf-8")` mở text để đọc; `w` ghi đè, `a` append, `x` yêu cầu file chưa tồn tại. Thêm `b` cho binary như `rb`/`wb`. `readline` đọc một dòng, iterate file đọc streaming, `seek` di chuyển cursor và `tell` trả vị trí theo semantics của stream.

Đừng dựa vào encoding mặc định của máy. Với file lớn, tránh `read()` toàn bộ. Khi ghi file quan trọng, cân nhắc ghi file tạm rồi replace atomic theo nhu cầu durability của ứng dụng.
