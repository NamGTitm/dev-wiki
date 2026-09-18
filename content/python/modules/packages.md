---
title: Package, __init__.py và public API
description: Tổ chức regular package, namespace package, entrypoint và API công khai ổn định.
slug: /module/packages
category: modules
categoryLabel: Module & package
order: 520
difficulty: intermediate
keywords: [package, __init__.py, namespace package, __all__, public API]
updated: 2026-09-18
related: ["/module/module", "/module/import-system", "/packaging/src-layout"]
---

Package là namespace chứa module và package con. Regular package thường có `__init__.py`; namespace package có thể ghép từ nhiều thư mục và không bắt buộc file đó.

`__init__.py` nên nhẹ: định nghĩa public API nhỏ hoặc metadata, không nên chạy migration hay tạo network connection khi chỉ import package. `__all__` ảnh hưởng wildcard import và có thể tài liệu hóa tên công khai, nhưng không phải security boundary.

Entry point của package có thể là `python -m package` khi có `__main__.py`, hoặc console script khai báo trong packaging metadata. Relative import làm dependency nội bộ rõ hơn trong package; absolute import thường dễ đọc hơn ở project lớn.
