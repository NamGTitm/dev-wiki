---
title: unittest và doctest
description: Hai công cụ testing có sẵn trong Python và cách đặt chúng cạnh test runner hiện đại.
slug: /standard-library/testing-tools
category: standard-library
categoryLabel: Standard library
order: 1390
difficulty: intermediate
keywords: [unittest, doctest, TestCase, mock, test runner]
updated: 2026-09-18
related: ["/testing/strategy", "/testing/unittest-mocking", "/testing/pytest-overview"]
---

`unittest` cung cấp `TestCase`, assertions, fixtures và `unittest.mock`; chạy bằng `python -m unittest`. Nó phù hợp khi muốn không phụ thuộc framework ngoài hoặc cần tương thích hệ sinh thái unittest.

`doctest` chạy các ví dụ prompt trong docstring, hữu ích cho ví dụ nhỏ và tài liệu API. Nó không thay thế test edge case, integration test hay property test: output phải ổn định, và doctest dễ trở nên giòn nếu format hiển thị thay đổi.

Tách test khỏi implementation detail. Mock boundary như network/client clock, không mock mọi hàm nội bộ; nếu test phải biết quá nhiều call order thì có thể contract đang quá chặt. Dù dùng runner nào, test vẫn cần deterministic, isolation và failure message có ích.
