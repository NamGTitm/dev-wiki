---
title: JavaScript chạy ở đâu?
description: Chọn runtime phù hợp và nhận biết API nào chỉ tồn tại trong môi trường đó.
slug: /javascript/bat-dau/javascript-chay-o-dau
category: getting-started
categoryLabel: Bắt đầu
order: 10010
difficulty: beginner
keywords: [runtime JavaScript, browser, Node.js, engine]
updated: 2026-10-03
collection: javascript
collectionLabel: JavaScript
related: ["/javascript/bat-dau/javascript-la-gi", "/javascript/bat-dau/browser-va-nodejs"]
---

JavaScript chạy bên trong một **runtime**. Runtime chọn engine để thực thi ngôn ngữ và bổ sung API để chương trình tương tác với môi trường.

```text
Browser: JavaScript engine + DOM + fetch + Web APIs
Node.js: JavaScript engine + file system + process + network APIs
```

Một số API như `JSON.parse` dùng được ở cả hai nơi. `document.querySelector` cần DOM của browser; `node:fs` thuộc Node.js.

## Điểm cần nhớ

Engine thực thi JavaScript, còn runtime quyết định thêm những API nào có sẵn. Đừng giả định một API tồn tại ở mọi môi trường.
