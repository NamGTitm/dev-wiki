---
title: Undefined Behavior và memory safety
description: Nhận biết hành vi không xác định, lỗi lifetime, race và các công cụ phát hiện lỗi C++.
slug: /cpp/ky-thuat/ub-memory-safety
category: engineering
categoryLabel: Kỹ nghệ phần mềm C++
order: 24060
difficulty: advanced
keywords: [undefined behavior, memory safety, out of bounds, dangling, sanitizer, data race]
updated: 2026-10-20
collection: cpp
collectionLabel: C++
collectionDescription: Cách xây dựng, kiểm tra, debug và bảo vệ ứng dụng C++ có thể bảo trì.
related: ["/cpp/bat-dau/references-pointers", "/cpp/trung-cap/stack-heap-lifetime", "/cpp/stl/iterators-invalidation", "/cpp/tra-cuu/memory-errors"]
---

Undefined behavior (UB) là chương trình thực hiện thao tác mà chuẩn C++ không quy định hành vi. Compiler được phép tối ưu dựa trên giả định UB không xảy ra; chương trình có thể sai, crash hoặc chỉ lỗi khi tối ưu/bản build khác.

## Lỗi cần phòng tránh

- Đọc/ghi ngoài giới hạn array hoặc vector.
- Dereference null, dangling pointer/reference hoặc iterator hết hiệu lực.
- Tràn số nguyên có dấu, chia số nguyên cho 0, shift quá độ rộng kiểu.
- Data race giữa threads không có đồng bộ.
- Dùng object ngoài lifetime hoặc vi phạm alignment/type aliasing.

Unsigned arithmetic wrap modulo theo chuẩn trong nhiều phép toán, nhưng vẫn có thể gây bug logic và cần kiểm tra; không dùng unsigned như cách “chữa” signed overflow.

## Defensive C++

- Ưu tiên `std::vector`, `std::string`, `std::array`, span/view có lifetime rõ.
- Dùng `at()` khi cần checked access; `operator[]` chỉ dùng khi invariant đã bảo đảm.
- Gắn ownership với RAII/smart pointer; xác thực size trước allocation/copy.
- Dùng mutex/atomic đúng memory model; không dựa vào timing.
- Bật warning và sanitizer trong build dev/CI khi toolchain hỗ trợ.

## Sanitizer

Với một số GCC/Clang trên nền tảng hỗ trợ, AddressSanitizer và UndefinedBehaviorSanitizer có thể bật bằng `-fsanitize=address,undefined -fno-omit-frame-pointer`. ThreadSanitizer dùng riêng; sanitizer có chi phí và không chứng minh chương trình không lỗi.

## Lỗi thường gặp

- Tin rằng compiler không tối ưu nên lỗi UB “vẫn chạy ổn”.
- Dùng sanitizer như thay thế review, tests hoặc input validation.
- Tắt warning thay vì sửa nguyên nhân.
- Dựa vào debug build để kết luận release build an toàn.

## Tự luyện

Chạy test với input rỗng, cực lớn và chỉ số sát biên. Bật sanitizer nếu compiler có, rồi giải thích vì sao việc không thấy cảnh báo không phải chứng minh không có UB.

## Đọc tiếp

Ôn [pointer lifetime](/cpp/bat-dau/references-pointers), [iterator invalidation](/cpp/stl/iterators-invalidation) và [lỗi bộ nhớ thường gặp](/cpp/tra-cuu/memory-errors).
