---
title: Hello World và cách chạy file .py
description: Viết, lưu và chạy chương trình Python đầu tiên từ terminal hoặc IDE.
slug: /bat-dau/hello-world
category: getting-started
categoryLabel: Bắt đầu
order: 30
difficulty: beginner
keywords: [hello world, chạy file py, python script, print]
updated: 2026-09-18
related: ["/bat-dau/cai-dat-python", "/co-ban/string"]
---

Tạo file `hello.py` và đặt một chương trình nhỏ có đầu ra rõ ràng:

```python
name = "Nam"
print(f"Xin chào, {name}!")
```

Chạy file từ thư mục chứa nó:

```bash
python hello.py
```

## Vì sao nên chạy từ terminal?

Terminal cho bạn biết chính xác interpreter, thư mục hiện tại và tham số truyền vào. Đây là nền tảng tốt trước khi dùng IDE hoặc hệ thống build.

## REPL

Chạy `python` không kèm tên file để mở REPL, nơi phù hợp để thử nhanh một biểu thức:

```python
>>> 2 ** 10
1024
```

REPL hữu ích để khám phá API, nhưng logic của ứng dụng nên nằm trong file để có thể kiểm thử và review.
