---
title: Regular expression với re
description: Pattern, match, search, group, named group, quantifier và các bẫy thường gặp.
slug: /standard-library/re
category: standard-library
categoryLabel: Standard library
order: 1330
difficulty: intermediate
keywords: [regex, regular expression, re, match, search, groups, lookahead]
updated: 2026-09-18
related: ["/co-ban/string", "/standard-library/overview", "/security/secure-coding"]
---

Regex mô tả pattern text. `re.search` tìm ở bất kỳ vị trí nào, `re.match` bắt đầu từ đầu string, `re.fullmatch` yêu cầu toàn bộ string khớp; `finditer` cho iterator các Match object.

```python
import re

pattern = re.compile(r"(?P<user>[a-z0-9._-]+)@(?P<host>[a-z0-9.-]+)")
match = pattern.fullmatch("nam@example.com")
if match:
    print(match.group("user"), match.group("host"))
```

Dùng raw string cho pattern để backslash không bị Python string parser xử lý trước. Quantifier greedy có thể backtrack nhiều; với input lớn hoặc không tin cậy, pattern phức tạp có thể gây chậm. Regex không phải parser cho mọi ngôn ngữ lồng nhau.
