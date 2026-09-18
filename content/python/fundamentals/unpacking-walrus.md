---
title: Unpacking và walrus operator
description: Dùng starred expression, unpacking và := để viết code gọn mà vẫn dễ đọc.
slug: /co-ban/unpacking-walrus
category: fundamentals
categoryLabel: Cơ bản
order: 160
difficulty: intermediate
keywords: [unpacking, starred expression, walrus operator, :=, positional-only]
updated: 2026-09-18
related: ["/ham/parameters", "/co-ban/syntax", "/collection/tuple"]
---

Unpacking tách một iterable thành nhiều tên:

```python
first, *middle, last = ["draft", "review", "ship", "monitor"]
```

Starred expression cũng dùng khi gọi hàm: `send(*recipients, **options)`. Hãy chắc chắn shape dữ liệu đúng; unpack sai số phần tử sẽ ném `ValueError`.

Walrus `:=` vừa gán vừa trả lại giá trị, có từ Python 3.8. Nó hữu ích khi kết quả cần dùng trong điều kiện và trong cùng scope:

```python
while (line := stream.readline()):
    process(line)
```

Đừng dùng walrus để nhồi logic vào điều kiện khó đọc. Nếu tên tạm cần xuất hiện ở nhiều bước, assignment riêng thường rõ hơn.
