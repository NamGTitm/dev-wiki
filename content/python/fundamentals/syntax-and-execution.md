---
title: Syntax, statement và expression
description: Phân biệt expression, statement, literal, identifier, keyword và indentation trong Python.
slug: /co-ban/syntax
category: fundamentals
categoryLabel: Cơ bản
order: 130
difficulty: beginner
keywords: [syntax, statement, expression, identifier, keyword, literal, indentation]
updated: 2026-09-18
related: ["/co-ban/bien", "/co-ban/toan-tu", "/bat-dau/interpreter-repl"]
---

Expression là đoạn code tạo ra giá trị, như `price * quantity`. Statement là một chỉ dẫn hoàn chỉnh, như assignment, `if`, `for` hoặc `return`. Một statement có thể chứa nhiều expression.

```python
subtotal = price * quantity  # expression ở vế phải, assignment là statement
```

Identifier là tên của variable, function hoặc class; keyword như `if`, `class`, `return` dành riêng cho syntax. Literal là cách viết trực tiếp một giá trị như `42`, `"ready"`, `[1, 2]`.

Indentation không chỉ để format; nó xác định block. Whitespace thừa ở cuối dòng không thay đổi behavior nhưng nên để formatter xử lý. Semicolon có thể tách statement trên một dòng nhưng làm code khó đọc; hãy dùng mỗi dòng một statement. Dấu `\\` cho multiline cũ dễ lỗi, ưu tiên ngoặc cho expression dài.
