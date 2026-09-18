---
title: pyproject.toml
description: Vai trò của pyproject.toml trong build system, metadata và cấu hình công cụ Python.
slug: /packaging/pyproject
category: packaging
categoryLabel: Packaging
order: 1210
difficulty: intermediate
keywords: [pyproject toml, package, wheel, build system]
updated: 2026-09-18
related: ["/packaging/pip", "/module/module"]
---

`pyproject.toml` là điểm cấu hình tiêu chuẩn cho nhiều công cụ Python: build backend, metadata package, lint, formatter và test.

```toml
[project]
name = "billing-service"
version = "0.1.0"
requires-python = ">=3.12"
dependencies = ["httpx>=0.27"]
```

Tách dependency chạy production khỏi dependency phát triển khi công cụ hỗ trợ. Khi publish wheel, kiểm tra file nào thực sự được đưa vào package và chạy test từ một môi trường sạch.
