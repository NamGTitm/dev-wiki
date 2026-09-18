---
title: Cấu trúc project Python cơ bản
description: Chọn cấu trúc vừa đủ cho script, package và ứng dụng lớn mà không over-engineer.
slug: /bat-dau/project-structure
category: getting-started
categoryLabel: Bắt đầu
order: 70
difficulty: beginner
keywords: [project structure, package layout, src layout, tests, pyproject]
updated: 2026-09-18
related: ["/module/module", "/module/packages", "/packaging/pyproject"]
---

Một script nhỏ có thể chỉ cần `main.py` và `README.md`. Khi code có nhiều module hoặc cần phát hành, tách rõ source, test và cấu hình:

```text
invoice_tool/
├── pyproject.toml
├── README.md
├── src/invoice_tool/
│   ├── __init__.py
│   └── cli.py
└── tests/
    └── test_cli.py
```

Không áp cấu trúc enterprise cho mọi bài tập. Điều quan trọng là người mới biết file nào là code chạy, file nào là test, dependency khai báo ở đâu và lệnh khởi động là gì. Khi package lớn dần, có thể tách theo domain thay vì tạo một module khổng lồ.
