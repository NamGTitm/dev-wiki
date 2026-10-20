---
title: switch
description: Chọn nhánh theo giá trị bằng switch và tránh fall-through ngoài ý muốn.
slug: /javascript/co-ban/switch
category: fundamentals
categoryLabel: Cơ bản
order: 10150
difficulty: beginner
keywords: [switch JavaScript, case, default, fall-through]
updated: 2026-10-03
collection: javascript
collectionLabel: JavaScript
related: ["/javascript/co-ban/dieu-kien", "/javascript/co-ban/toan-tu"]
---

`switch` phù hợp khi cần so sánh một biểu thức với nhiều giá trị cụ thể. Các `case` dùng so sánh nghiêm ngặt; `default` chạy khi không khớp nhánh nào.

```js
switch (status) {
  case "ready":
    message = "Có thể tiếp tục";
    break;
  case "pending":
    message = "Đang xử lý";
    break;
  default:
    message = "Không xác định";
}
```

Không có `break` thì việc thực thi rơi tiếp xuống case sau (fall-through). Có thể cố ý gom nhiều case chung một nhánh, nhưng cần thể hiện rõ ý định.

## Điểm cần nhớ

Dùng `if / else` cho điều kiện dạng khoảng hoặc biểu thức phức tạp; dùng `switch` cho nhiều giá trị phân biệt của cùng một biểu thức.
