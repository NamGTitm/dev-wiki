---
title: src layout và editable install
description: Vì sao src layout giúp phát hiện import nhầm source tree và cách dùng editable install.
slug: /packaging/src-layout
category: packaging
categoryLabel: Packaging
order: 1230
difficulty: intermediate
keywords: [src layout, editable install, pip install -e, package layout]
updated: 2026-09-18
related: ["/bat-dau/project-structure", "/module/packages", "/packaging/pyproject"]
---

Trong src layout, package nằm dưới `src/`, không nằm ngay root repository. Điều này buộc project cài đặt package trước khi import, giúp phát hiện package data hoặc import path sai sớm hơn.

```bash
python -m pip install --editable .
```

Editable install tạo liên kết để thay đổi source phản ánh ngay trong môi trường dev, nhưng không phải bản build để phát hành. Test package từ wheel/sdist trong môi trường sạch để tránh phụ thuộc vào file chỉ tồn tại trong checkout.
