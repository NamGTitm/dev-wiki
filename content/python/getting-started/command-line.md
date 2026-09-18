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

Hai lệnh thường gặp là `python file.py` và `python -m package.module`. Cách thứ hai chạy module trong ngữ cảnh package, vì vậy thường phù hợp với tool có import nội bộ.

```bash
python -m pip install -r requirements.txt
python -m invoice_tool.cli --dry-run
```

Process có exit code; `0` thường nghĩa là thành công, số khác báo lỗi. `stdout` dành cho output bình thường, `stderr` dành cho diagnostic. Khi viết CLI, đừng trộn log và dữ liệu machine-readable vào cùng một stream nếu shell script sẽ consume output.

Trên Windows, `py -3.14` có thể chọn launcher version cụ thể; trên macOS/Linux, `python3` thường được dùng để tránh đụng Python hệ thống.
