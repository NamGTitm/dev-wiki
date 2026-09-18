---
title: enum cho trạng thái và tập giá trị hữu hạn
description: Mô hình hóa trạng thái rõ ràng hơn string rời rạc, đồng thời hiểu Enum, IntEnum và serialization.
slug: /standard-library/enum
category: standard-library
categoryLabel: Standard library
order: 1340
difficulty: intermediate
keywords: [enum, Enum, IntEnum, StrEnum, status, state machine]
updated: 2026-09-18
related: ["/oop/enum", "/dieu-khien/match", "/standard-library/json"]
---

`Enum` biểu diễn một tập giá trị có tên:

```python
from enum import StrEnum, auto

class State(StrEnum):
    queued = auto()
    running = auto()
    done = auto()

if current is State.running:
    print("đang xử lý")
```

So sánh identity với member (`current is State.running`) thường dễ đọc. `member.name` là tên member và `member.value` là giá trị; đừng mặc định rằng value sẽ serialize đúng hợp đồng API. `StrEnum` hữu ích khi giá trị cần hoạt động như string; `IntEnum` chỉ nên dùng khi tương thích số nguyên là yêu cầu thật sự, vì phép tính số có thể làm mất ngữ nghĩa enum.

Enum hợp với trạng thái, quyền hạn, protocol version và lựa chọn hữu hạn. Nếu tập giá trị đến từ database hoặc user có thể mở rộng tùy ý, dùng string/record có validation sẽ linh hoạt hơn. Khi đổi tên member, cân nhắc tương thích dữ liệu đã lưu và migration.
