---
title: Python glossary
description: Glossary ngắn của các thuật ngữ object, binding, iterable, descriptor, coroutine và internals.
slug: /reference/glossary
category: best-practices
categoryLabel: Best practices
order: 1450
difficulty: beginner
keywords: [glossary, object, binding, iterable, iterator, generator, coroutine, descriptor, MRO, GIL]
updated: 2026-09-18
related: ["/co-ban/object-model", "/iteration/iterable-iterator", "/internals/gil"]
---

- **Object:** giá trị có identity, type và value.
- **Binding:** liên kết một name với object.
- **Namespace:** mapping từ name tới object.
- **Iterable:** object có thể cung cấp iterator.
- **Iterator:** object trả phần tử kế tiếp qua `__next__`.
- **Generator:** iterator được tạo bằng function có `yield`.
- **Coroutine:** computation có thể tạm dừng bằng `await`.
- **Descriptor:** object điều khiển attribute access qua `__get__`/`__set__`.
- **MRO:** thứ tự lookup method trong hierarchy.
- **GIL:** lock của CPython build mặc định liên quan thực thi bytecode.

Glossary chỉ là điểm vào; mỗi thuật ngữ nên dẫn tới bài giải thích behavior và trade-off đầy đủ.
