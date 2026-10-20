---
title: Undefined Behavior và lỗi bộ nhớ thường gặp
description: Nhận diện out-of-bounds, dangling pointer, double free, leak và data race.
slug: /cpp/tra-cuu/memory-errors
category: reference
categoryLabel: Tra cứu và xử lý lỗi
order: 25050
difficulty: intermediate
keywords: [memory errors, dangling pointer, double free, memory leak, UB, out of bounds]
updated: 2026-10-20
collection: cpp
collectionLabel: C++
collectionDescription: Bảng tra cú pháp, container, thuật toán, lỗi thường gặp và best practices C++.
related: ["/cpp/ky-thuat/ub-memory-safety", "/cpp/bat-dau/references-pointers", "/cpp/stl/raii-smart-pointers"]
---

Lỗi bộ nhớ có thể làm hỏng dữ liệu xa nơi phát sinh. Chúng thường phụ thuộc input, compiler optimization hoặc timing nên cần invariant rõ, tests và công cụ hỗ trợ.

## Triệu chứng và sửa

```text
Out of bounds       index ngoài [0, size); xác thực biên hoặc dùng at().
Dangling pointer    object đã hết lifetime; điều chỉnh ownership/lifetime.
Use after free      dùng resource sau giải phóng; dùng RAII và bỏ alias cũ.
Double delete       nhiều nơi cùng nghĩ mình sở hữu; xác định một owner.
Memory leak         allocation không được giải phóng; dùng container/unique_ptr.
Stack overflow      recursion quá sâu hoặc stack object quá lớn; dùng lặp/heap owner.
Data race           shared mutable access thiếu đồng bộ; dùng mutex/atomic đúng.
```

## Công cụ

AddressSanitizer tìm một số lỗi truy cập bộ nhớ; UBSan phát hiện một số UB; ThreadSanitizer tìm một số race. Valgrind và debugger hữu ích trên nền tảng phù hợp. Không công cụ nào chứng minh toàn chương trình không có lỗi.

## Phòng tránh

- Dùng `std::vector`/`std::string` thay buffer raw nếu phù hợp.
- Giữ ownership đơn nhất; smart pointer phải phản ánh ownership thật.
- Không giữ iterator/reference qua thao tác invalidating container.
- Test input rỗng, biên, lớn và lỗi.

## Kiểm tra nhanh

Khi crash, tìm nơi object được tạo, ai sở hữu, lúc nào bị hủy và mọi alias còn tồn tại. Xem [memory safety](/cpp/ky-thuat/ub-memory-safety).

## Đọc tiếp

Học [pointer/reference](/cpp/bat-dau/references-pointers), [RAII](/cpp/stl/raii-smart-pointers) và [debugging](/cpp/ky-thuat/debugging).
