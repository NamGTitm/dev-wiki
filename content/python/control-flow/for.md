---
title: Vòng lặp for
description: Duyệt iterable bằng for, chọn biến vòng lặp rõ nghĩa và tránh thay đổi collection sai cách.
slug: /dieu-khien/for
category: control-flow
categoryLabel: Điều khiển luồng
order: 210
difficulty: beginner
keywords: [for loop, vòng lặp for, iterable, enumerate, zip]
updated: 2026-09-18
related: ["/dieu-khien/range", "/collection/list", "/ham/function"]
---

`for` duyệt từng phần tử của một iterable. Hãy duyệt trực tiếp collection khi không cần index:

```python
pending = ["invoice-104", "invoice-105", "invoice-106"]
for invoice_id in pending:
    print(f"Đang xử lý {invoice_id}")
```

Khi cần vị trí, dùng `enumerate`; khi ghép hai dãy, dùng `zip`:

```python
for position, invoice_id in enumerate(pending, start=1):
    print(position, invoice_id)
```

Tránh xóa phần tử ngay trên list đang duyệt. Hãy tạo list mới bằng comprehension hoặc lọc trước để không bỏ sót phần tử.
