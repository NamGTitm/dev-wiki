---
title: logging trong ứng dụng Python
description: Logger, handler, formatter, level và exception logging cho ứng dụng thực tế.
slug: /standard-library/logging
category: standard-library
categoryLabel: Standard library
order: 1350
difficulty: intermediate
keywords: [logging, logger, handler, formatter, level, logger.exception]
updated: 2026-09-18
related: ["/exception", "/exception/traceback", "/best-practices/configuration"]
---

Dùng logger theo module thay vì `print()` rải khắp code:

```python
import logging

logger = logging.getLogger(__name__)
logger.info("processing invoice_id=%s", invoice_id)
```

Logger tạo record; handler quyết định nơi xuất; formatter quyết định hình thức; level lọc mức chi tiết. `logger.exception` dùng trong `except` để ghi traceback. Không nối string eager nếu format argument đủ, và không ghi password, token hoặc dữ liệu cá nhân nhạy cảm.

Root logger phù hợp để cấu hình ở entrypoint. Library nên tạo logger nhưng không tự cấu hình global handler khiến ứng dụng dùng library bị đổi output ngoài ý muốn.
