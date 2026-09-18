---
title: match và pattern matching
description: Dùng structural pattern matching từ Python 3.10 để rẽ nhánh theo cấu trúc dữ liệu.
slug: /dieu-khien/match
category: control-flow
categoryLabel: Điều khiển luồng
order: 250
difficulty: intermediate
keywords: [match, pattern matching, case, guard, Python 3.10]
updated: 2026-09-18
related: ["/dieu-khien/if-elif-else", "/co-ban/object-model", "/oop/dataclasses"]
---

`match` so khớp shape và value, không chỉ là `switch` đổi tên. Feature có từ Python 3.10:

```python
def describe(message: dict[str, object]) -> str:
    match message:
        case {"kind": "created", "id": item_id}:
            return f"Created {item_id}"
        case {"kind": kind} if kind in {"deleted", "archived"}:
            return f"Closed: {kind}"
        case _:
            return "Unknown event"
```

`case _` là wildcard; guard sau pattern là điều kiện bổ sung. Pattern matching có thể destructure sequence, mapping và class. Dùng khi cấu trúc input là trọng tâm; với vài điều kiện đơn giản, `if/elif` thường dễ đọc hơn.
