---
title: if, elif và else
description: Rẽ nhánh logic bằng điều kiện rõ ràng, dễ mở rộng và dễ kiểm thử.
slug: /dieu-khien/if-elif-else
category: control-flow
categoryLabel: Điều khiển luồng
order: 200
difficulty: beginner
keywords: [if, elif, else, điều kiện, conditional]
updated: 2026-09-18
related: ["/co-ban/toan-tu", "/dieu-khien/for", "/dieu-khien/while"]
---

`if` dùng để chạy code khi một điều kiện đúng.

```python
age = 18

if age >= 18:
    print("Đủ tuổi")
```

## `if`, `elif`, `else`

```python
score = 82

if score >= 90:
    level = "excellent"
elif score >= 70:
    level = "good"
else:
    level = "needs-review"
```

Python kiểm tra từ trên xuống.

Nhánh đầu tiên đúng sẽ được chạy, các `elif` phía sau bị bỏ qua.

```text
score = 82

score >= 90  -> False
score >= 70  -> True
else         -> không chạy
```

Vì vậy thứ tự điều kiện rất quan trọng.

Sai:

```python
if score >= 70:
    level = "good"
elif score >= 90:
    level = "excellent"
```

Điểm `95` sẽ vào nhánh đầu tiên và không bao giờ tới `>= 90`.

## Không bắt buộc có `else`

```python
if is_admin:
    show_admin_panel()
```

Chỉ thêm `else` khi thực sự có logic cho trường hợp còn lại.

## Kết hợp điều kiện

Dùng `and` khi tất cả điều kiện phải đúng:

```python
if is_logged_in and is_admin:
    show_admin_panel()
```

Dùng `or` khi chỉ cần một điều kiện đúng:

```python
if is_owner or is_admin:
    allow_edit()
```

Dùng `not` để đảo điều kiện:

```python
if not is_logged_in:
    redirect_login()
```

## Guard clause

Trong function, xử lý trường hợp lỗi hoặc không hợp lệ trước:

```python
def can_publish(is_owner: bool, has_draft: bool) -> bool:
    if not is_owner or not has_draft:
        return False

    return True
```

Cách này thường dễ đọc hơn nesting:

```python
def can_publish(is_owner, has_draft):
    if is_owner:
        if has_draft:
            return True

    return False
```

## Tránh điều kiện quá dài

Khó đọc:

```python
if user.is_active and user.email_verified and not user.banned and user.role == "admin":
    ...
```

Rõ hơn:

```python
can_manage = (
    user.is_active
    and user.email_verified
    and not user.banned
    and user.role == "admin"
)

if can_manage:
    ...
```

Nếu điều kiện có ý nghĩa riêng, đặt tên cho nó thay vì để một dòng boolean dài ngoằng.

## Debug nhanh

Nếu code chạy sai nhánh, kiểm tra:

```python
print(condition)
print(type(condition))
```

Và đặc biệt xem lại **thứ tự `if` / `elif`**.

Quy tắc cần nhớ:

```text
if   -> điều kiện đầu tiên
elif -> thử tiếp nếu nhánh trước sai
else -> trường hợp còn lại
```

Python chỉ chạy một nhánh trong cùng chuỗi `if` / `elif` / `else`.