---
title: subprocess và command line
description: Chạy process con, capture output, timeout, exit code và tránh shell injection.
slug: /standard-library/subprocess
category: standard-library
categoryLabel: Standard library
order: 1360
difficulty: intermediate
keywords: [subprocess, run, Popen, shell, stdout, stderr, timeout]
updated: 2026-09-18
related: ["/bat-dau/command-line", "/security/subprocess-paths", "/standard-library/overview"]
---

`subprocess.run` là API cấp cao cho command hoàn thành:

```python
from subprocess import run

result = run(["python", "--version"], capture_output=True, text=True, check=True, timeout=5)
print(result.stdout or result.stderr)
```

Truyền argv dạng list, không bật `shell=True` nếu không cần. `check=True` biến exit code khác 0 thành `CalledProcessError`; `timeout` tránh process treo vô hạn. Với stream dài hoặc process sống lâu, dùng `Popen` và thiết kế backpressure thay vì gọi `communicate` không giới hạn.
