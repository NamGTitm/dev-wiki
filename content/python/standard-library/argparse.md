---
title: argparse cho CLI
description: Khai báo command, option, flag, positional argument và exit code bằng argparse.
slug: /cli/argparse
category: standard-library
categoryLabel: Standard library
order: 1390
difficulty: beginner
keywords: [argparse, CLI, command line, flags, options, sys.argv]
updated: 2026-09-18
related: ["/bat-dau/command-line", "/standard-library/subprocess", "/best-practices/project-structure"]
---

`argparse` đọc `sys.argv` và sinh help/validation cho command-line app:

```python
import argparse

parser = argparse.ArgumentParser()
parser.add_argument("path")
parser.add_argument("--dry-run", action="store_true")
args = parser.parse_args()
```

Positional argument phù hợp với input bắt buộc theo thứ tự; option phù hợp với cấu hình có tên. Xác định kiểu và default rõ ràng, dùng exit code khác 0 cho lỗi input. Với CLI nhiều subcommand, dùng `add_subparsers` và mỗi command một handler để không tạo `main` khổng lồ.
