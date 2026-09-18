---
title: Exception và xử lý lỗi
description: Dùng try, except, raise và exception chaining để lỗi rõ nghĩa và có thể khôi phục.
slug: /exception
category: errors
categoryLabel: Exception
order: 600
difficulty: intermediate
keywords: [exception python, try except, raise, custom exception]
updated: 2026-09-18
related: ["/file", "/ham/function", "/best-practices/error-handling"]
---

Exception diễn tả một điều kiện khiến luồng bình thường không thể tiếp tục. Bắt exception ở nơi bạn có đủ thông tin để xử lý hoặc thêm context.

```python
try:
    port = int(raw_port)
except ValueError as error:
    raise ValueError("PORT phải là một số nguyên") from error
```

Bắt exception cụ thể thay vì `except Exception` hoặc bare `except`. Nếu không thể khôi phục, hãy để lỗi nổi lên với message và context tốt.

## else và finally

`else` chạy khi không có exception; `finally` chạy dù thành công hay thất bại, phù hợp để dọn tài nguyên. Với file và lock, ưu tiên context manager để tránh quên cleanup.
