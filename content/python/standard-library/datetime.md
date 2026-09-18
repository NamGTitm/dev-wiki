---
title: datetime, timezone và zoneinfo
description: Làm việc với date, time, timedelta, UTC và timezone-aware datetime mà không tạo bug múi giờ.
slug: /standard-library/datetime
category: standard-library
categoryLabel: Standard library
order: 1340
difficulty: intermediate
keywords: [datetime, date, time, timedelta, timezone, UTC, zoneinfo, naive datetime]
updated: 2026-09-18
related: ["/co-ban/numbers", "/standard-library/overview", "/best-practices/common-mistakes"]
---

Naive datetime không mang timezone; aware datetime có offset/timezone. Trong hệ thống phân tán, lưu và truyền instant ở UTC, chỉ chuyển sang timezone hiển thị ở boundary.

```python
from datetime import datetime, timezone

created_at = datetime.now(timezone.utc)
print(created_at.isoformat())
```

`timedelta` biểu diễn khoảng thời gian, không phải timezone. Với timezone thực tế có DST, dùng `zoneinfo.ZoneInfo("Asia/Ho_Chi_Minh")` thay vì tự cộng offset. Parse input phải biết format và timezone; đừng gọi `.replace(tzinfo=...)` để “convert” một instant nếu bạn chưa hiểu giá trị ban đầu.
