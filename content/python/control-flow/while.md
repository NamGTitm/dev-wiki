---
title: Vòng lặp while
description: Lặp theo điều kiện, quản lý trạng thái và tránh vòng lặp vô hạn.
slug: /dieu-khien/while
category: control-flow
categoryLabel: Điều khiển luồng
order: 220
difficulty: beginner
keywords: [while loop, vòng lặp while, break, retry]
updated: 2026-09-18
related: ["/dieu-khien/for", "/dieu-khien/break-continue"]
---

Dùng `while` khi số lần lặp phụ thuộc vào một trạng thái thay đổi dần, chẳng hạn retry đến khi thành công hoặc đọc đến cuối stream.

```python
attempt = 0
max_attempts = 3
while attempt < max_attempts:
    attempt += 1
    print(f"Thử lần {attempt}")
```

Mọi nhánh dẫn tới lần kiểm tra tiếp theo phải cập nhật trạng thái hoặc kết thúc vòng lặp. Nếu không, chương trình có thể treo vì vòng lặp vô hạn.
