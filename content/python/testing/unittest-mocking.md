---
title: unittest, mock và patch
description: Standard library testing với TestCase, setup, mock và nguyên tắc patch đúng nơi lookup.
slug: /testing/unittest-mocking
category: testing
categoryLabel: Testing
order: 1520
difficulty: intermediate
keywords: [unittest, TestCase, mock, patch, setup, teardown]
updated: 2026-09-18
related: ["/testing/strategy", "/testing/assert", "/module/import-system"]
---

`unittest` là standard library, cung cấp `TestCase`, assertion, setup/teardown và mock. `pytest` là third-party và có workflow riêng.

```python
from unittest.mock import patch

@patch("billing.service.fetch_rate")
def test_total_uses_rate(fetch_rate):
    fetch_rate.return_value = 1.08
    assert calculate_with_rate(100, "VND") == 108
```

Patch nơi code đang lookup tên, không nhất thiết nơi object được định nghĩa. Mock quá sâu khiến test xanh nhưng refactor nhỏ cũng làm vỡ suite. Dùng fake đơn giản khi behavior quan trọng hơn call count, và luôn assert output/side effect mà user thật sự quan tâm.
