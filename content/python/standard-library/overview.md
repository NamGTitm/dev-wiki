---
title: Standard library theo nhóm
description: Bản đồ nhanh các module chuẩn để biết nên tìm API ở đâu trước khi thêm dependency third-party.
slug: /standard-library/overview
category: standard-library
categoryLabel: Standard library
order: 1310
difficulty: beginner
keywords: [standard library, built-in modules, stdlib, Python modules]
updated: 2026-09-18
related: ["/standard-library/pathlib", "/standard-library/logging", "/packaging/pip"]
---

Standard library đi kèm Python: `pathlib`, `os`, `shutil` cho file; `json`, `csv`, `sqlite3` cho dữ liệu; `datetime`, `zoneinfo` cho thời gian; `re` cho regex; `logging`, `argparse`, `subprocess` cho ứng dụng; `collections`, `itertools`, `functools` cho data processing.

Hãy tìm standard library trước khi thêm dependency, nhưng đừng biến “không cài thêm package” thành mục tiêu tuyệt đối. Third-party có thể cho API tốt hơn, hiệu năng tốt hơn hoặc hỗ trợ protocol thực tế. Document này là bản đồ; mỗi module quan trọng có bài riêng trong nhóm Standard library.
