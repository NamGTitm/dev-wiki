---

title: Python interpreter và REPL
description: Hiểu interpreter, interactive prompt, help, dir và workflow thử nghiệm nhanh.
slug: /bat-dau/interpreter-repl
category: getting-started
categoryLabel: Bắt đầu
order: 60
difficulty: beginner
keywords: [interpreter, REPL, interactive shell, help, dir, IDLE]
updated: 2026-09-18
related: ["/bat-dau/hello-world", "/co-ban/builtins", "/bat-dau/command-line"]
------------------------------------------------------------------------------

Python interpreter là chương trình thực thi code Python.

Kiểm tra interpreter đang dùng:

```bash
python -c "import sys; print(sys.executable)"
```

Nếu máy có nhiều Python hoặc virtual environment, lệnh này giúp xác định chính xác bản đang chạy.

## REPL

Chạy:

```bash
python
```

để mở REPL.

REPL là viết tắt của:

```text
Read -> Eval -> Print -> Loop
```

Nó đọc biểu thức, thực thi, in kết quả rồi chờ lệnh tiếp theo.

Ví dụ:

```python
>>> 2 ** 10
1024

>>> "python".upper()
'PYTHON'
```

REPL phù hợp để:

- thử một biểu thức,
- kiểm tra API,
- test nhanh giả thuyết,
- xem object đang chứa gì.

Không nên dùng REPL để lưu logic chính của project.

## `type()`

Kiểm tra type của object:

```python
>>> value = 42
>>> type(value)
<class 'int'>
```

Rất hữu ích khi debug dữ liệu không đúng kiểu mong đợi.

## `dir()`

Liệt kê các attribute và method có thể truy cập:

```python
>>> text = "hello"
>>> dir(text)
```

Nếu không nhớ object có method nào, `dir()` là cách tra nhanh ngay trong runtime.

## `help()`

Xem tài liệu tích hợp:

```python
>>> help(str.split)
```

Hoặc:

```python
>>> from pathlib import Path
>>> help(Path.read_text)
```

`help()` thường hiển thị:

- function signature,
- docstring,
- mô tả parameter,
- thông tin object.

## `id()`

Kiểm tra identity của object trong runtime hiện tại:

```python
>>> value = []
>>> id(value)
140234567890
```

`id()` chủ yếu hữu ích khi cần kiểm tra hai biến có đang tham chiếu cùng một object hay không.

Ví dụ:

```python
>>> a = []
>>> b = a
>>> id(a) == id(b)
True
```

## REPL có state

REPL giữ lại biến từ các lệnh trước:

```python
>>> x = 10
>>> x + 5
15
```

Điều này tiện để thử nghiệm, nhưng cũng dễ gây nhầm.

Một đoạn code có thể chạy trong REPL vì biến cũ vẫn còn, nhưng thất bại khi chạy lại từ đầu.

Khi nghi ngờ, hãy restart REPL và thử lại trong trạng thái sạch.

## Workflow nên dùng

Dùng REPL để thử nhanh:

```text
thử ý tưởng
   ↓
xác nhận behavior
   ↓
đưa code vào file/module/test
```

REPL là bàn thử nghiệm, không phải nơi lưu code lâu dài.

Nếu một đoạn code bắt đầu quan trọng, hãy đưa nó vào file `.py` để có thể chạy lại, test và review một cách tái lập.