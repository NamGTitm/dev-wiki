---
title: Python syntax và API cheatsheet
description: Bản tra cứu nhanh cho syntax, collection method, file mode, format specifier và exception.
slug: /reference/cheatsheets
category: best-practices
categoryLabel: Best practices
order: 1460
difficulty: beginner
keywords: [cheatsheet, syntax, list methods, dict methods, file modes, format specifier]
updated: 2026-09-18
related: ["/co-ban/builtins", "/collection/list", "/collection/dictionary", "/file"]
---

```python
items = ["a", "b"]
items.append("c")
items.extend(["d", "e"])
mapping = {key: value for key, value in pairs}
for index, item in enumerate(items, start=1):
    print(f"{index:02d}: {item}")
```

File mode thường dùng: `r` đọc, `w` ghi đè, `a` append, `x` tạo mới, thêm `b` cho binary, thêm `+` cho đọc/ghi. Dùng `with open(..., encoding="utf-8")`. Bắt exception cụ thể, log context và để lỗi nổi lên nếu không thể recover.

Cheatsheet là bảng nhớ nhanh, không thay thế bài giải thích semantics hoặc security boundary.
