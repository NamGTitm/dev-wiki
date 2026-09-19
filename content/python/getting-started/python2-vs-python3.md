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
----------------------------------------------------

Python 2 đã hết hỗ trợ. Project mới nên dùng Python 3; wiki này target **Python 3.14**.

## Khác biệt dễ gặp

### `print`

Python 2:

```python
print "Hello"
```

Python 3:

```python
print("Hello")
```

### Phép chia

Python 2:

```python
5 / 2
# 2
```

Python 3:

```python
5 / 2
# 2.5

5 // 2
# 2
```

### Text và bytes

Python 3 phân biệt rõ:

```python
"hello"   # str
b"hello"  # bytes
```

Đây là nguồn lỗi phổ biến khi migrate code xử lý:

- file,
- network,
- encoding,
- database.

### Exception syntax

Code Python 2 có thể dùng:

```python
except ValueError, error:
    pass
```

Python 3 dùng:

```python
except ValueError as error:
    pass
```

## Khi gặp project Python 2

Đừng chỉ sửa syntax.

Cần kiểm tra:

```text
dependency có hỗ trợ Python 3 không
text và bytes có thay đổi behavior không
phép chia có ảnh hưởng kết quả không
encoding có assumptions cũ không
test có cover logic quan trọng không
```

Nếu buộc phải bảo trì Python 2, hãy cô lập environment riêng.

Không nên trộn Python 2 và Python 3 trong cùng codebase nếu có thể tránh.

## Debug nhanh

Kiểm tra version đang chạy:

```bash
python --version
```

Trong code:

```python
import sys

print(sys.version)
```

Nếu gặp syntax lạ, Unicode bug hoặc behavior chia số khác dự kiến, hãy kiểm tra Python version trước.

Quy tắc ngắn:

```text
code mới     -> Python 3
code Python 2 -> xem như legacy cần migrate
```