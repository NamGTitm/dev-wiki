---
title: pip và dependency
description: Cài package, pin dependency và giữ môi trường Python tái lập được.
slug: /packaging/pip
category: packaging
categoryLabel: Packaging
order: 1200
difficulty: beginner
keywords: [pip, package, dependency, requirements, pypi]
updated: 2026-09-18
related: ["/bat-dau/virtual-environment", "/packaging/pyproject"]
---

`pip` là package installer phổ biến của Python. Luôn chạy qua interpreter đang dùng:

```bash
python -m pip install httpx
python -m pip freeze > requirements.txt
```

Trong project mới, `pyproject.toml` thường là nơi tốt hơn để khai báo metadata và dependency. Pin phiên bản trực tiếp hoặc dùng lockfile theo công cụ của đội để build có thể tái lập.

Không cài package tùy tiện vào global Python. Review license, nguồn phát hành và quyền của dependency trước khi đưa vào production.
