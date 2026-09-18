---
title: Biến trong Python
description: Hiểu assignment, tên biến và cách Python gắn tên với object trong bộ nhớ.
slug: /co-ban/bien
category: fundamentals
categoryLabel: Cơ bản
order: 100
difficulty: beginner
keywords: [biến python, variable, assignment, name binding]
updated: 2026-09-18
related: ["/co-ban/kieu-du-lieu", "/co-ban/toan-tu", "/collection/list"]
---

Trong Python, biến là một cái tên trỏ tới object, không phải chiếc hộp có kiểu cố định. Assignment tạo hoặc cập nhật liên kết đó:

```python
deadline_days = 14
deadline_days = deadline_days - 2
print(deadline_days)  # 12
```

## Đặt tên

Dùng `snake_case` cho biến và hàm, đặt tên thể hiện ý nghĩa: `retry_limit` tốt hơn `n`. Hằng số theo quy ước viết hoa như `DEFAULT_TIMEOUT = 10`.

## Multiple assignment

```python
width, height = 1280, 720
width, height = height, width
```

Python đánh giá vế phải trước rồi mới gán, nên phép hoán đổi trên không cần biến tạm.

## Dễ nhầm

Hai tên có thể trỏ cùng một object. Điều này quan trọng với object mutable như list: `backup = items` không tạo bản sao. Khi cần bản sao, dùng `items.copy()` hoặc `copy.deepcopy()` tùy cấu trúc dữ liệu.
