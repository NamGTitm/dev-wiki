---
title: pytest là gì?
description: Overview về pytest, fixture và plugin ecosystem; phân biệt rõ đây là công cụ third-party.
slug: /testing/pytest-overview
category: testing
categoryLabel: Testing
order: 1530
difficulty: beginner
keywords: [pytest, fixture, third-party, test runner, parametrize]
updated: 2026-09-18
related: ["/testing/strategy", "/testing/unittest-mocking", "/packaging/pip"]
---

pytest là test framework third-party phổ biến, không đi kèm Python. Nó phát hiện function test, dùng plain `assert`, fixture dependency injection và plugin ecosystem.

```python
def test_slug_is_stable():
    assert make_slug("Hello Python") == "hello-python"
```

Fixture nên cung cấp resource và cleanup rõ ràng. Parametrize giúp chạy cùng behavior trên nhiều input. Dù dùng pytest hay unittest, nguyên tắc vẫn là test behavior, cô lập boundary hợp lý và chạy suite trong môi trường sạch.
