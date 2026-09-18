---
title: break và continue
description: Điều khiển sớm vòng lặp và cách giữ logic vòng lặp dễ đọc.
slug: /dieu-khien/break-continue
category: control-flow
categoryLabel: Điều khiển luồng
order: 240
difficulty: beginner
keywords: [break, continue, loop control, vòng lặp]
updated: 2026-09-18
related: ["/dieu-khien/for", "/dieu-khien/while"]
---

`break` kết thúc vòng lặp ngay; `continue` bỏ qua phần còn lại của lượt hiện tại và chuyển sang lượt kế tiếp.

```python
for event in events:
    if event is None:
        continue
    if event == "shutdown":
        break
    handle(event)
```

Nếu có quá nhiều `break` và `continue`, hãy tách logic xử lý thành hàm hoặc đổi sang pipeline rõ ràng hơn. `for ... else` cũng có thể diễn đạt “không tìm thấy” mà không cần cờ trạng thái riêng.
