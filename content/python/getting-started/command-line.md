---
title: Command line cho Python developer
description: Chạy module, truyền tham số, kiểm tra interpreter và phân biệt stdout, stderr.
slug: /bat-dau/command-line
category: getting-started
categoryLabel: Bắt đầu
order: 80
difficulty: beginner
keywords: [command line, terminal, python -m, stdout, stderr, exit code]
updated: 2026-09-18
related: ["/bat-dau/hello-world", "/cli/argparse", "/packaging/pip"]
---

Command line là cách trực tiếp nhất để chạy và debug Python mà không phụ thuộc IDE.

## Chạy Python

Chạy một file:

```bash
python main.py
```

Trên macOS/Linux có thể dùng:

```bash
python3 main.py
```

Kiểm tra phiên bản:

```bash
python --version
```

Kiểm tra chính xác interpreter đang chạy:

```bash
python -c "import sys; print(sys.executable)"
```

Lệnh này đặc biệt hữu ích khi máy có nhiều Python hoặc đang dùng `.venv`.

## `python -m`

`-m` chạy một module thông qua hệ thống import của Python:

```bash
python -m package.module
```

Ví dụ:

```bash
python -m pip install requests
python -m invoice_tool.cli
```

Với code nằm trong package, nên ưu tiên:

```bash
python -m package.module
```

thay vì:

```bash
python package/module.py
```

Cách này giữ đúng package context và tránh nhiều lỗi import nội bộ.

## Pip đúng interpreter

Nếu máy có nhiều Python, tránh gọi `pip` một cách mù quáng.

Dùng:

```bash
python -m pip install requests
```

Kiểm tra pip đang thuộc Python nào:

```bash
python -m pip --version
```

Nếu `python` và `pip` trỏ sang hai environment khác nhau, package có thể cài thành công nhưng chương trình vẫn báo:

```text
ModuleNotFoundError
```

## Truyền tham số

Ví dụ:

```bash
python app.py input.txt --verbose
```

Python nhận các argument qua:

```python
import sys

print(sys.argv)
```

Với CLI thực tế có nhiều option như:

```text
--output
--verbose
--dry-run
```

nên dùng `argparse` thay vì tự parse `sys.argv`.

## Working directory

Relative path được tính từ thư mục hiện tại của terminal, không nhất thiết từ vị trí file Python.

Kiểm tra:

```bash
python -c "import os; print(os.getcwd())"
```

Nếu code chạy ở thư mục này nhưng lỗi ở thư mục khác, hãy kiểm tra working directory trước.

## `stdout` và `stderr`

Output bình thường đi vào `stdout`:

```python
print("done")
```

Lỗi hoặc diagnostic nên đi vào `stderr`:

```python
import sys

print("Invalid config", file=sys.stderr)
```

Quy ước:

```text
stdout -> dữ liệu/kết quả
stderr -> lỗi, warning, diagnostic
```

Điều này quan trọng khi output được shell script, CI/CD hoặc chương trình khác đọc.

Ví dụ CLI xuất JSON thì đừng trộn log vào stdout:

```python
import sys

print("Loading...", file=sys.stderr)
print('{"status": "ok"}')
```

## Exit code

Process trả về một exit code khi kết thúc:

```text
0     -> thành công
khác 0 -> lỗi hoặc trạng thái thất bại
```

Trong Python:

```python
import sys

sys.exit(1)
```

CI/CD và shell script thường dựa vào exit code để xác định command có thành công hay không.

## Windows và nhiều phiên bản Python

Windows thường có Python Launcher:

```bash
py --version
```

Chọn version cụ thể:

```bash
py -3.14
```

Xem các version đã cài:

```bash
py -0
```

## Checklist debug nhanh

Khi Python hoặc dependency có vấn đề, kiểm tra theo thứ tự:

```bash
python --version
python -c "import sys; print(sys.executable)"
python -m pip --version
python -c "import os; print(os.getcwd())"
```

Bốn lệnh này thường đủ để phát hiện phần lớn lỗi liên quan đến:

```text
sai Python version
sai virtual environment
pip cài nhầm environment
sai working directory
```

Command line không cần học thuộc hàng chục lệnh. Với Python, quan trọng nhất là luôn biết **interpreter nào đang chạy, module chạy trong context nào, dependency được cài vào đâu và process kết thúc ra sao**.