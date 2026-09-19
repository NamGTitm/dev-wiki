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

Tạo file `hello.py`:

```python
name = "Nam"
print(f"Xin chào, {name}!")
```

Chạy trong terminal:

```bash
python hello.py
```

Trên một số hệ thống:

```bash
python3 hello.py
```

Kết quả:

```text
Xin chào, Nam!
```

## File `.py`

File có đuôi `.py` chứa source code Python.

Ví dụ:

```text
project/
└── hello.py
```

Python đọc file từ trên xuống và thực thi từng câu lệnh.

## `print()`

`print()` đưa dữ liệu ra terminal:

```python
print("Hello")
print(123)
```

Có thể in biến:

```python
name = "Nam"
print(name)
```

Hoặc dùng f-string:

```python
print(f"Xin chào, {name}")
```

## Chạy đúng thư mục

Nếu terminal không nằm trong thư mục chứa file, Python có thể báo:

```text
can't open file 'hello.py'
```

Kiểm tra thư mục hiện tại:

```bash
python -c "import os; print(os.getcwd())"
```

Hoặc truyền đúng đường dẫn:

```bash
python path/to/hello.py
```

## Kiểm tra interpreter

Nếu file chạy khác với trong IDE, kiểm tra Python đang được dùng:

```bash
python -c "import sys; print(sys.executable)"
```

IDE và terminal có thể đang dùng hai interpreter khác nhau.

## REPL

Chạy:

```bash
python
```

để mở Python REPL.

Ví dụ:

```python
>>> 2 ** 10
1024

>>> "Python".upper()
'PYTHON'
```

REPL phù hợp để thử nhanh biểu thức hoặc API.

Thoát bằng:

```python
exit()
```

Logic của project nên nằm trong file `.py` để dễ chạy lại, debug, test và review.

## Debug nhanh

Nếu `hello.py` không chạy:

```bash
python --version
python -c "import sys; print(sys.executable)"
python -c "import os; print(os.getcwd())"
```

Kiểm tra ba thứ trước:

```text
Python có tồn tại không
đang dùng đúng interpreter không
terminal có đang ở đúng thư mục không
```

Với Python, chương trình đầu tiên thực chất chỉ cần hiểu đúng chuỗi này:

```text
file .py -> Python interpreter -> output
```