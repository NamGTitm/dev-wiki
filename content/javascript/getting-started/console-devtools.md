---
title: Console và DevTools
description: Dùng console và Developer Tools để quan sát giá trị, lỗi và hành vi trang web.
slug: /javascript/bat-dau/console-devtools
category: getting-started
categoryLabel: Bắt đầu
order: 10050
difficulty: beginner
keywords: [console.log, DevTools, debug JavaScript, debugger]
updated: 2026-10-03
collection: javascript
collectionLabel: JavaScript
related: ["/javascript/bat-dau/chay-javascript", "/javascript/co-ban/syntax-co-ban"]
---

`console` giúp quan sát dữ liệu trong lúc chạy; DevTools của browser còn cho phép xem lỗi, đặt breakpoint và kiểm tra network.

```js
const user = { name: "NamGT", active: true };
console.log(user);
console.table([user]);
```

Mở DevTools bằng menu của browser hoặc phím tắt của hệ điều hành, rồi chọn tab **Console**. Dùng breakpoint trong **Sources** để dừng chương trình và xem giá trị tại từng bước.

## Điểm cần nhớ

Log có thể lộ dữ liệu nhạy cảm và thường không nên để lại trong code production. Xóa log tạm sau khi debug.
