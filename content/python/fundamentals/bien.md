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

Trong Python, biến là **tên tham chiếu tới một object**.

```python
count = 10
name = "Nam"
```

Python không khóa kiểu của biến:

```python
value = 10
value = "hello"
```

Tên `value` chỉ được gắn sang object khác.

## Assignment

Dấu `=` dùng để gán:

```python
deadline_days = 14
deadline_days = deadline_days - 2
```

Sau đó:

```python
print(deadline_days)
```

kết quả:

```text
12
```

Có thể viết ngắn:

```python
deadline_days -= 2
```

## Đặt tên

Nên dùng `snake_case`:

```python
retry_limit = 3
user_name = "Nam"
```

Tránh tên mơ hồ:

```python
x = 3
n = 10
```

nếu chúng đại diện cho dữ liệu có ý nghĩa rõ ràng.

Hằng số thường viết hoa theo quy ước:

```python
DEFAULT_TIMEOUT = 10
MAX_RETRIES = 3
```

Python không ngăn việc thay đổi các giá trị này; đây chỉ là convention.

## Gán nhiều biến

```python
width, height = 1280, 720
```

Hoán đổi:

```python
width, height = height, width
```

Không cần biến tạm.

## Hai biến có thể trỏ cùng object

```python
items = ["a", "b"]
backup = items
```

`backup` không phải bản sao.

```python
backup.append("c")

print(items)
```

kết quả:

```text
['a', 'b', 'c']
```

Vì cả hai tên cùng trỏ tới một list.

Muốn tạo bản sao nông:

```python
backup = items.copy()
```

Với cấu trúc nested cần copy hoàn toàn:

```python
from copy import deepcopy

backup = deepcopy(items)
```

## Kiểm tra khi debug

Xem giá trị:

```python
print(value)
```

Xem kiểu:

```python
print(type(value))
```

Kiểm tra hai tên có trỏ cùng object không:

```python
print(a is b)
```

Điểm cần nhớ:

```text
biến = tên
object = dữ liệu thực
assignment = gắn tên với object
```

Với object mutable như `list` và `dict`, hãy đặc biệt chú ý việc nhiều biến cùng tham chiếu tới một object.