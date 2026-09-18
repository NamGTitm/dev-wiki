---
title: Enum, IntEnum và Flag
description: Biểu diễn tập giá trị hữu hạn có tên, tránh dùng magic string hoặc magic number.
slug: /oop/enum
category: oop
categoryLabel: OOP
order: 860
difficulty: intermediate
keywords: [Enum, IntEnum, Flag, auto, aliases, enum Python]
updated: 2026-09-18
related: ["/oop/dataclasses", "/dieu-khien/match", "/standard-library/enum"]
---

`Enum` biểu diễn các lựa chọn có identity và tên rõ:

```python
from enum import Enum, auto

class Status(Enum):
    DRAFT = auto()
    PUBLISHED = auto()
```

Dùng `Status.PUBLISHED` thay vì rải string `"published"` khắp code. `IntEnum` tương thích với integer nhưng có thể khiến equality với số gây bất ngờ. `Flag` phù hợp với bit flags có thể kết hợp; `auto()` sinh value và giúp tránh tự quản lý số không cần thiết.

Khi serialize, quyết định rõ dùng member name hay value và validate khi parse input bên ngoài.
