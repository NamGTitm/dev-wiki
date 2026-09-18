---
title: Python 2 và Python 3
description: Vì sao code mới nên dùng Python 3 và những khác biệt lịch sử cần nhận diện khi bảo trì legacy.
slug: /bat-dau/python2-vs-python3
category: getting-started
categoryLabel: Bắt đầu
order: 90
difficulty: beginner
keywords: [Python 2, Python 3, legacy, migration, print function]
updated: 2026-09-18
related: ["/bat-dau/python-la-gi", "/co-ban/syntax"]
---

Python 2 đã hết vòng đời hỗ trợ; project mới nên dùng Python 3 được hỗ trợ, hiện wiki target Python 3.14. Những khác biệt dễ gặp khi đọc code cũ gồm `print` là statement trong Python 2, phép chia số nguyên, text/bytes và syntax exception.

```python
print("Đây là Python 3")
```

Đừng chỉ đổi `print` để gọi là migration. Kiểm tra encoding, dependency, test và behavior khi chia số. Nếu phải bảo trì code Python 2, cô lập môi trường và lập kế hoạch chuyển dần thay vì trộn syntax hai thế hệ trong cùng module.
