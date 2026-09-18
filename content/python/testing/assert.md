---
title: assert và tư duy kiểm thử
description: Dùng assert để kiểm tra invariant trong development và xây chiến lược test đáng tin.
slug: /testing/assert
category: testing
categoryLabel: Testing
order: 1500
difficulty: intermediate
keywords: [assert python, testing, invariant, unittest, pytest]
updated: 2026-09-18
related: ["/ham/function", "/exception", "/typing"]
---

`assert condition` kiểm tra một giả định trong code. Khi giả định sai, Python ném `AssertionError`, giúp lỗi lộ ra gần nguyên nhân.

```python
def split_total(total: int, parts: int) -> list[int]:
    assert total >= 0
    assert parts > 0
    return [total // parts] * parts
```

Assert phù hợp cho invariant nội bộ, không phải để validate input không tin cậy hoặc thay thế kiểm thử. Khi chạy với tối ưu hóa, assertion có thể bị loại bỏ. Với hành vi cần đảm bảo ở production, hãy dùng điều kiện và exception rõ ràng.
