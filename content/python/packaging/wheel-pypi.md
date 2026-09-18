---
title: Wheel, sdist và PyPI
description: Phân biệt source distribution với wheel và hiểu flow build, upload, install của package.
slug: /packaging/wheel-pypi
category: packaging
categoryLabel: Packaging
order: 1220
difficulty: intermediate
keywords: [wheel, sdist, PyPI, package distribution, build, upload]
updated: 2026-09-18
related: ["/packaging/pyproject", "/packaging/src-layout", "/packaging/pip"]
---

Source distribution (`sdist`) chứa source và metadata để build; wheel (`.whl`) là artifact cài đặt nhanh hơn, có thể chứa code đã build cho platform/ABI cụ thể. PyPI là index phân phối package, không phải dependency resolver duy nhất.

Flow hiện đại là khai báo `pyproject.toml`, build artifact bằng tool build, kiểm tra nội dung rồi upload lên TestPyPI/PyPI. Cài package từ PyPI không đồng nghĩa code đã an toàn; review maintainer, release và dependency supply chain vẫn cần thiết.

Package metadata nên khai báo `requires-python`, dependencies, optional dependencies và license rõ. Đừng xây workflow mới quanh `python setup.py install`; dùng frontend như `python -m pip install .` hoặc công cụ build theo backend.
