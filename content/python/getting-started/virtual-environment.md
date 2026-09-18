---
title: Virtual environment với venv
description: Tách dependency theo từng project để cài đặt an toàn và tái lập được.
slug: /bat-dau/virtual-environment
category: getting-started
categoryLabel: Bắt đầu
order: 40
difficulty: beginner
keywords: [venv, virtualenv, môi trường ảo, dependency]
updated: 2026-09-18
related: ["/bat-dau/cai-dat-python", "/packaging/pip"]
---

Môi trường ảo là một thư mục chứa interpreter và package độc lập với các project khác. Nó tránh tình trạng project A vô tình dùng phiên bản thư viện của project B.

```bash
python -m venv .venv
python -m pip install --upgrade pip
python -m pip install requests
```

Dùng `python -m pip` thay vì gọi `pip` trần giúp chắc chắn pip thuộc đúng interpreter đang hoạt động.

## Đưa môi trường ảo vào workflow

Thêm `.venv/` vào `.gitignore`, ghi dependency vào `requirements.txt` hoặc `pyproject.toml`, và hướng dẫn contributor cách tạo lại môi trường. Không commit cả thư mục `.venv` vì nó phụ thuộc hệ điều hành và đường dẫn máy cá nhân.
