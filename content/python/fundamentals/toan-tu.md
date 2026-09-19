---
title: Toán tử và biểu thức
description: Các toán tử số học, so sánh, logic và cách viết biểu thức dễ đọc.
slug: /co-ban/toan-tu
category: fundamentals
categoryLabel: Cơ bản
order: 120
difficulty: beginner
keywords: [operators, expression, arithmetic, comparison, logical operators]
updated: 2026-09-18
related: ["/co-ban/bien", "/dieu-khien/if-elif-else"]
---

**Biểu thức** là đoạn code tạo ra một giá trị.

```python
total = price * quantity
is_valid = age >= 18
```

Toán tử dùng để tính toán, so sánh hoặc kết hợp các giá trị.

## Toán tử số học

```python
a + b    # cộng
a - b    # trừ
a * b    # nhân
a / b    # chia
a // b   # chia lấy phần nguyên
a % b    # chia lấy dư
a ** b   # lũy thừa
```

Ví dụ:

```python
10 / 3
# 3.333...

10 // 3
# 3

10 % 3
# 1

2 ** 3
# 8
```

`/` luôn là phép chia thông thường, còn `//` là floor division.

## Toán tử so sánh

```python
a == b   # bằng
a != b   # khác
a > b
a >= b
a < b
a <= b
```

Kết quả là `True` hoặc `False`:

```python
age = 20

age >= 18
# True
```

Python hỗ trợ chained comparison:

```python
0 <= score <= 100
```

thay vì:

```python
score >= 0 and score <= 100
```

## Toán tử logic

```python
and
or
not
```

Ví dụ:

```python
if is_logged_in and is_admin:
    ...

if is_owner or is_admin:
    ...

if not is_active:
    ...
```

`and` cần cả hai điều kiện đúng.

`or` chỉ cần một điều kiện đúng.

`not` đảo giá trị logic.

## `==` và `is`

`==` so sánh **giá trị**:

```python
a = [1, 2]
b = [1, 2]

a == b
# True
```

`is` kiểm tra hai biến có trỏ tới **cùng object**:

```python
a is b
# False
```

Dùng `is` khi kiểm tra `None`:

```python
if value is None:
    ...
```

Không dùng:

```python
value == None
```

Và không dùng `is` để so sánh string hoặc số:

```python
name == "Nam"
```

## Toán tử gán

```python
count += 1
count -= 1
price *= 2
total /= 10
```

Ví dụ:

```python
count = 5
count += 1

print(count)
# 6
```

Tương đương:

```python
count = count + 1
```

## Thứ tự tính toán

Python có operator precedence:

```python
result = 2 + 3 * 4
# 14
```

Phép nhân chạy trước phép cộng.

Nếu biểu thức có thể gây nhầm, dùng ngoặc:

```python
result = (2 + 3) * 4
# 20
```

Đừng bắt người đọc phải nhớ toàn bộ bảng precedence chỉ để hiểu một dòng code.

## Conditional expression

Có thể chọn giá trị bằng một biểu thức ngắn:

```python
status = "adult" if age >= 18 else "minor"
```

Phù hợp với logic đơn giản.

Nếu điều kiện bắt đầu dài hoặc có nhiều nhánh, dùng `if` / `elif` / `else`.

## Debug nhanh

Nếu biểu thức cho kết quả lạ, tách nó ra:

```python
has_access = is_active and is_admin

print(is_active)
print(is_admin)
print(has_access)
```

Đừng debug một biểu thức boolean dài 200 ký tự trong đầu.

Nhớ nhanh:

```text
+ - * / // % **  -> tính toán
== != < > <= >=  -> so sánh
and or not       -> logic
==               -> cùng giá trị
is               -> cùng object
```