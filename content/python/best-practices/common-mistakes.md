---
title: Common mistakes trong Python
description: Những lỗi semantics phổ biến về mutable state, scope, async, import, time và security.
slug: /best-practices/common-mistakes
category: best-practices
categoryLabel: Best practices
order: 1440
difficulty: intermediate
keywords: [common mistakes, mutable default, is vs ==, shallow copy, bare except, blocking async]
updated: 2026-09-18
related: ["/co-ban/copying-aliasing", "/ham/parameters", "/async", "/security/secure-coding"]
---

**Mutable default:** `def add(x, items=[]): ...` giữ list giữa các lần gọi; dùng `None` rồi tạo list trong hàm. **Identity:** `is` dành cho singleton như `None`, còn value dùng `==`. **List mutation:** không xóa phần tử ngay khi đang duyệt nếu không hiểu index shift.

**Scope:** closure trong loop có late binding; bind value hoặc tạo factory. **Import:** wildcard import và circular import làm namespace khó đoán. **Time:** naive datetime và giả định encoding mặc định gây bug theo máy. **Async:** quên `await` trả coroutine chưa chạy; `time.sleep` chặn event loop.

**Security:** `eval`, `pickle`, `shell=True` và SQL string interpolation có trust boundary nguy hiểm. Mỗi warning cần một fix cụ thể, không chỉ “hãy cẩn thận”.
