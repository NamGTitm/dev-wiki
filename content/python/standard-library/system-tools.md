---
title: os, sys, shutil, tempfile và importlib
description: Nhóm công cụ chuẩn cho môi trường chạy, file hệ thống, thư mục tạm và import động.
slug: /standard-library/system-tools
category: standard-library
categoryLabel: Standard library
order: 1350
difficulty: intermediate
keywords: [os, sys, shutil, tempfile, importlib, environment, subprocess, filesystem]
updated: 2026-09-18
related: ["/standard-library/pathlib", "/standard-library/subprocess", "/module/import-system"]
---

`pathlib` nên là API chính cho path; `os` vẫn quan trọng khi đọc environment (`os.environ`), quyền/process hiện tại và các primitive hệ điều hành. `sys.argv`, `sys.path`, `sys.stderr` mô tả interpreter đang chạy; tránh sửa `sys.path` tùy tiện vì nó che giấu lỗi đóng gói.

`shutil.copytree`, `move`, `rmtree` giúp thao tác cây thư mục. Các hàm xóa là destructive: kiểm tra path đã resolve và giới hạn trong thư mục được phép trước khi gọi. Với dữ liệu tạm, `tempfile.TemporaryDirectory` tự dọn dẹp tốt hơn tự ghép tên file trong `/tmp`.

```python
import os
import tempfile
from pathlib import Path

with tempfile.TemporaryDirectory() as name:
    output = Path(name) / "result.txt"
    output.write_text(os.environ.get("APP_MESSAGE", "ok"), encoding="utf-8")
```

`importlib.import_module("package.plugin")` hữu ích cho plugin system, nhưng tên module đến từ cấu hình phải được allowlist và load lỗi cần được báo rõ. Import động không thay thế thiết kế dependency rõ ràng.
