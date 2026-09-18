---
title: Best practice: error handling
description: Một số nguyên tắc để lỗi có context, log đúng chỗ và không che mất nguyên nhân thật.
slug: /best-practices/error-handling
category: best-practices
categoryLabel: Best practices
order: 1400
difficulty: intermediate
keywords: [error handling, logging, best practices, bare except]
updated: 2026-09-18
related: ["/exception", "/file", "/typing"]
---

Lỗi tốt giúp người vận hành biết chuyện gì xảy ra, ở đâu và có thể làm gì tiếp theo. Hãy bắt exception gần boundary nơi bạn có thể thêm context hoặc trả response phù hợp.

```python
try:
    config = load_config()
except OSError as error:
    logger.exception("Không thể đọc cấu hình từ %s", config_path)
    raise RuntimeError("Ứng dụng không thể khởi động") from error
```

Không dùng bare `except`, không log rồi nuốt lỗi, và không đưa secret vào message. Ở boundary, chuyển lỗi nội bộ sang error code ổn định; trong core, giữ exception gốc để debug.
