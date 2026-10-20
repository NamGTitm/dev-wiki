---
title: Object
description: Dùng object để nhóm thuộc tính, đọc dữ liệu an toàn và tạo bản sao nông khi cập nhật.
slug: /javascript/co-ban/object
category: fundamentals
categoryLabel: Cơ bản
order: 10200
difficulty: beginner
keywords: [object JavaScript, thuộc tính, destructuring, spread, object]
updated: 2026-10-03
collection: javascript
collectionLabel: JavaScript
related: ["/javascript/co-ban/array", "/javascript/co-ban/string"]
---

Object lưu dữ liệu theo cặp key-value. Key thường là string hoặc symbol; cú pháp literal dùng `{}`.

```js
const user = { name: "NamGT", active: true };
const { name } = user;
const updatedUser = { ...user, active: false };
```

Đọc thuộc tính tùy chọn bằng `user.email`; dùng `user.email ?? "Chưa có"` để xử lý thiếu dữ liệu. Spread tạo bản sao **nông**: object lồng bên trong vẫn dùng chung tham chiếu.

## Lỗi thường gặp

`"name" in user` cũng kiểm tra thuộc tính kế thừa. Với kiểm tra thuộc tính riêng, dùng `Object.hasOwn(user, "name")`.
