---
title: Hàm trong Python
description: Thiết kế hàm nhỏ, rõ contract với parameter, return value và type hint.
slug: /ham/function
category: functions
categoryLabel: Hàm
order: 400
difficulty: beginner
keywords: [function python, def, return, parameter, argument]
updated: 2026-09-18
related: ["/ham/scope", "/co-ban/bien", "/co-ban/kieu-du-lieu"]
---

Hàm gom một đoạn logic thành một khối có tên để có thể gọi lại.

```python
def calculate_total(subtotal: int, discount_rate: float = 0.0) -> int:
    return round(subtotal * (1 - discount_rate))
```

Gọi hàm:

```python
total = calculate_total(280_000, discount_rate=0.1)
```

## Parameter và argument

Trong:

```python
def greet(name):
    print(f"Hello {name}")
```

`name` là **parameter**.

Khi gọi:

```python
greet("Nam")
```

`"Nam"` là **argument**.

Có thể truyền theo vị trí:

```python
calculate_total(280_000, 0.1)
```

hoặc theo tên:

```python
calculate_total(
    subtotal=280_000,
    discount_rate=0.1,
)
```

Keyword argument dễ đọc hơn khi hàm có nhiều giá trị dễ nhầm.

## `return`

`return` gửi kết quả ra khỏi hàm:

```python
def add(a, b):
    return a + b

result = add(2, 3)
```

Nếu không có `return`:

```python
def log_message():
    print("Done")
```

hàm sẽ trả:

```python
None
```

`print()` và `return` không giống nhau:

```python
def add(a, b):
    print(a + b)
```

đoạn trên chỉ in kết quả, không trả nó cho code bên ngoài.

## Default parameter

Có thể đặt giá trị mặc định:

```python
def greet(name, prefix="Hello"):
    return f"{prefix} {name}"
```

Khi đó:

```python
greet("Nam")
greet("Nam", "Hi")
```

đều hợp lệ.

## Tránh mutable default

Không nên:

```python
def add_item(item, items=[]):
    items.append(item)
    return items
```

`items` được tạo một lần và có thể giữ dữ liệu giữa nhiều lần gọi.

Dùng:

```python
def add_item(item, items=None):
    if items is None:
        items = []

    items.append(item)
    return items
```

Đây là bug Python rất dễ gặp khi debug state bất thường.

## Type hint

Type hint giúp mô tả contract của hàm:

```python
def add(a: int, b: int) -> int:
    return a + b
```

Nhưng Python không tự chặn:

```python
add("1", "2")
```

chỉ vì đã khai báo `int`.

Type hint hỗ trợ IDE, static checker và người đọc code, không thay thế runtime validation.

## Hàm nên làm một việc

Nên:

```python
def calculate_total(...):
    ...

def save_invoice(...):
    ...
```

thay vì một hàm vừa tính toán, vừa ghi database, vừa gửi email, vừa log.

Hàm nhỏ thường dễ:

```text
đọc
test
debug
reuse
```

## Debug nhanh

Nếu function trả kết quả lạ, kiểm tra:

```python
print(type(value))
print(value)
```

Nếu nhận:

```text
None
```

hãy kiểm tra function có thật sự `return` hay chỉ `print`.

Nếu state bị giữ lại giữa nhiều lần gọi, kiểm tra mutable default:

```python
items=[]
config={}
cache=set()
```

Quy tắc ngắn:

```text
input  -> parameter
logic  -> function body
output -> return
```

Một hàm tốt nên có input rõ, output rõ và ít side effect ẩn.