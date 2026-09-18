---
title: Python interpreter và REPL
description: Hiểu interpreter, interactive prompt, help, dir và workflow thử nghiệm nhanh.
slug: /bat-dau/interpreter-repl
category: getting-started
categoryLabel: Bắt đầu
order: 60
difficulty: beginner
keywords: [interpreter, REPL, interactive shell, help, dir, IDLE]
updated: 2026-09-18
related: ["/bat-dau/hello-world", "/co-ban/builtins", "/bat-dau/command-line"]
---

REPL là viết tắt của Read–Eval–Print Loop: đọc biểu thức, đánh giá, in kết quả rồi lặp lại. Đây là nơi tốt để khám phá API hoặc kiểm tra một giả thuyết nhỏ, không phải nơi lý tưởng để lưu business logic.

```python
>>> from pathlib import Path
>>> path = Path("report.txt")
>>> path.suffix
'.txt'
>>> help(Path.read_text)
```

`dir(value)` liệt kê tên có thể truy cập, `type(value)` cho biết type, còn `id(value)` trả identity trong runtime hiện tại. `help()` đọc docstring và thông tin help của object.

Khi thử nghiệm xong, chuyển code có ý nghĩa vào file, module hoặc test. REPL state dễ chứa biến cũ khiến một đoạn code “chạy được” nhưng không tái lập được từ đầu.
