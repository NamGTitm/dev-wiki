---
title: Đọc traceback và debug exception
description: Đọc traceback từ dưới lên, phân biệt exception type với frame và tạo minimal reproduction.
slug: /exception/traceback
category: errors
categoryLabel: Exception
order: 610
difficulty: beginner
keywords: [traceback, debug, exception type, stack trace, breakpoint, pdb]
updated: 2026-09-18
related: ["/exception", "/debugging/workflow", "/standard-library/logging"]
---

Traceback cho biết exception đi qua những frame nào. Thường hãy đọc dòng cuối trước để biết exception type và message, sau đó đi ngược lên frame trong code của bạn để tìm input hoặc assumption sai.

```python
def load_limit(raw: str) -> int:
    return int(raw)

load_limit("ten")  # ValueError
```

`breakpoint()` mở debugger mặc định của Python; `pdb` cho phép xem local variable, step và stack. Debug tốt là thu nhỏ input đến case tái hiện được, kiểm tra invariant tại boundary và sửa nguyên nhân thay vì chỉ bắt exception để đổi message.

Trong production, dùng logger có context và giữ exception chaining. Không paste secret vào traceback hoặc issue tracker.
