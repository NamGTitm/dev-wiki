---
title: Dictionary trong Python
description: Lưu dữ liệu theo cặp key-value, tra cứu nhanh và mô hình hóa record trong ứng dụng.
slug: /collection/dictionary
category: collections
categoryLabel: Collections
order: 320
difficulty: beginner
keywords: [dictionary python, dict, key value, mapping]
updated: 2026-09-18
related: ["/collection/list", "/collection/set", "/co-ban/kieu-du-lieu"]
---

Dictionary ánh xạ key sang value. Dùng nó khi dữ liệu được truy cập bằng tên hoặc mã định danh thay vì vị trí.

```python
user = {"id": 42, "name": "An", "roles": ["editor"]}
user["active"] = True

for key, value in user.items():
    print(key, value)
```

`dict.get(key, default)` hữu ích khi key có thể vắng mặt. Tránh dùng `if key in data` rồi truy cập lại nếu bạn chỉ cần lấy giá trị một lần.

Key phải hashable, nên list không thể làm key nhưng tuple phù hợp nếu các phần tử của tuple cũng hashable.

## API thường dùng

`get` đọc với default; `setdefault` đọc hoặc tạo value khi thiếu; `update` merge mapping; `pop` xóa một key và trả value; `popitem` lấy cặp cuối cùng theo insertion order hiện hành. `keys`, `values`, `items` trả view object phản ánh thay đổi của dict, không phải snapshot list.

Từ Python 3.9, `left | right` tạo dict merge mới còn `left |= right` cập nhật tại chỗ. Khi key trùng, value bên phải thắng. Dictionary giữ insertion order như language behavior hiện đại, nhưng không nên nhầm điều đó với sorted order.
