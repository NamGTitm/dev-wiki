---
title: Import system và sys.modules
description: Module được tìm, thực thi và cache như thế nào; tránh circular import và import side effect.
slug: /module/import-system
category: modules
categoryLabel: Module & package
order: 510
difficulty: advanced
keywords: [import system, sys.modules, sys.path, import cache, circular import]
updated: 2026-09-18
related: ["/module/module", "/module/packages", "/internals/execution-model"]
---

Khi gặp `import service`, Python tìm module theo import machinery và `sys.path`. Nếu tìm thấy, module được tạo và thực thi lần đầu; object module sau đó được cache trong `sys.modules`.

```python
import sys
import json

assert "json" in sys.modules
```

Cache tránh chạy lại top-level code trong mỗi lần import. Vì vậy import có side effect như mở connection hoặc đăng ký global handler cần được cân nhắc. `importlib.reload` chạy lại module nhưng không reset mọi reference đã được import sang nơi khác.

Circular import xảy ra khi A cần B trong lúc B chưa khởi tạo xong. Giải pháp tốt thường là tách dependency chung, chuyển import vào boundary thật sự cần, hoặc thiết kế module dependency một chiều; không nên dùng local import như cách che một vòng phụ thuộc không rõ ràng.
