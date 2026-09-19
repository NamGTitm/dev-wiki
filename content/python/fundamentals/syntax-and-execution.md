---
title: Syntax, statement và expression
description: Phân biệt expression, statement, literal, identifier, keyword và indentation trong Python.
slug: /co-ban/syntax
category: fundamentals
categoryLabel: Cơ bản
order: 130
difficulty: beginner
keywords: [syntax, statement, expression, identifier, keyword, literal, indentation]
updated: 2026-09-18
related: ["/co-ban/bien", "/co-ban/toan-tu", "/bat-dau/interpreter-repl"]
---

**Syntax** là tập quy tắc xác định code Python viết thế nào mới hợp lệ.

## Expression

Expression tạo ra một giá trị:

```python id="x4m3qp"
price * quantity
age >= 18
name.upper()
```

Ví dụ:

```python id="8j4mps"
subtotal = price * quantity
```

`price * quantity` là expression.

## Statement

Statement là một chỉ dẫn hoàn chỉnh:

```python id="hbd3zr"
total = 100

if total > 50:
    print(total)

return total
```

Assignment, `if`, `for`, `while`, `import` và `return` đều là statement.

Một statement có thể chứa nhiều expression.

## Literal

Literal là giá trị được viết trực tiếp trong code:

```python id="7nqcb8"
42
3.14
"hello"
True
None
[1, 2, 3]
{"name": "Nam"}
```

## Identifier

Identifier là tên do bạn đặt:

```python id="4ntux9"
user_name = "Nam"

def calculate_total():
    ...
```

`user_name` và `calculate_total` là identifier.

Tên hợp lệ có thể chứa:

```text id="73pxcv"
chữ cái
số
_
```

nhưng không được bắt đầu bằng số:

```python id="0eswmp"
user2 = "Nam"    # hợp lệ
2user = "Nam"    # SyntaxError
```

## Keyword

Keyword là từ Python dành riêng cho syntax:

```text id="cz44vh"
if
else
for
while
def
class
return
import
True
False
None
```

Không thể dùng chúng làm tên biến:

```python id="dprc2s"
class = "admin"
```

sẽ gây `SyntaxError`.

## Indentation

Python dùng indentation để xác định block:

```python id="3mt16u"
if is_admin:
    print("Admin")
    show_panel()

print("Done")
```

Hai dòng thụt vào thuộc `if`.

Dòng cuối nằm ngoài block.

Sai indentation có thể gây:

```text id="sufbp1"
IndentationError
```

hoặc tệ hơn, code vẫn chạy nhưng sai logic.

Thông thường dùng **4 spaces** cho mỗi cấp indentation.

## Multiline

Với expression dài, ưu tiên ngoặc:

```python id="ui4kxu"
can_publish = (
    is_active
    and is_verified
    and not is_banned
)
```

Tránh dùng `\` nếu không cần:

```python id="2xdj0w"
can_publish = is_active and \
    is_verified
```

Ngoặc ít lỗi hơn và formatter xử lý tốt hơn.

## Một statement mỗi dòng

Python cho phép:

```python id="a1h7g5"
a = 1; b = 2
```

nhưng nên viết:

```python id="3u0gy3"
a = 1
b = 2
```

Dễ đọc và debug hơn.

## Debug nhanh

Nếu gặp:

```text id="ngmxad"
SyntaxError
IndentationError
```

kiểm tra trước:

```text id="66ol9s"
thiếu dấu :
ngoặc chưa đóng
string chưa đóng
indent sai
dùng keyword làm tên
```

Nhớ nhanh:

```text id="bdh5ac"
expression -> tạo giá trị
statement  -> thực hiện chỉ dẫn
literal    -> giá trị viết trực tiếp
identifier -> tên do mình đặt
keyword    -> từ dành riêng của Python
indentation -> xác định block
```