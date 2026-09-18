---
title: Chiến lược kiểm thử Python
description: Phân biệt unit, integration, regression test và chọn boundary để test có giá trị.
slug: /testing/strategy
category: testing
categoryLabel: Testing
order: 1510
difficulty: intermediate
keywords: [unit test, integration test, regression test, testing strategy, fixture]
updated: 2026-09-18
related: ["/testing/assert", "/testing/unittest-mocking", "/typing"]
---

Unit test kiểm tra một đơn vị nhỏ với dependency được kiểm soát; integration test kiểm tra boundary thật như database hoặc filesystem; regression test giữ lại case từng gây bug. Một suite tốt không tối ưu số lượng test mà tối ưu độ tin cậy của signal.

```python
def test_total_uses_discount():
    assert calculate_total(200_000, 0.1) == 180_000
```

Test behavior observable, tên test nói rõ scenario và tránh kiểm tra implementation detail. Mock ở boundary bạn sở hữu, không mock từng function nội bộ. Khi test flaky, tìm race, clock, network và shared state thay vì retry vô hạn.
