---
title: C++ là gì và các phiên bản
description: Tìm hiểu C++, compiler, thư viện chuẩn và cách chọn chuẩn ngôn ngữ cho dự án.
slug: /cpp/bat-dau/cpp-la-gi
category: fundamentals
categoryLabel: C++ căn bản
order: 20010
difficulty: beginner
keywords: [C++, C++17, C++20, C++23, compiler, standard library]
updated: 2026-10-20
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/bat-dau/cai-dat-moi-truong", "/cpp/bat-dau/lo-trinh-hoc", "/cpp/stl/cpp17-20-23"]
---

C++ là ngôn ngữ lập trình biên dịch, đa mục đích, cho phép viết ứng dụng cấp cao nhưng vẫn kiểm soát được tài nguyên và hiệu năng. Bài này giúp bạn hiểu các thành phần của một chương trình và chọn một chuẩn ngôn ngữ làm nền.

## C++ được dùng khi nào?

C++ thường xuất hiện trong game engine, trình duyệt, công cụ đồ họa, hệ thống nhúng, thư viện hiệu năng cao, ứng dụng desktop và phần mềm hệ thống. Với script ngắn hoặc ứng dụng web thông thường, ngôn ngữ khác có thể đơn giản hơn; hãy chọn theo yêu cầu của sản phẩm và đội ngũ.

## Compiler và thư viện chuẩn

- **Compiler** dịch mã nguồn thành chương trình cho nền tảng mục tiêu. Ví dụ: GCC, Clang và MSVC.
- **Thư viện chuẩn** cung cấp `std::string`, `std::vector`, thuật toán, luồng nhập xuất và nhiều công cụ khác.
- **C++ standard** xác định cú pháp và hành vi chuẩn. Compiler và thư viện có thể triển khai các phần khác nhau của một chuẩn.

```text
source.cpp -> compiler + standard library -> executable
```

## Những mốc thường gặp

- **C++98/03**: nền tảng chuẩn hóa ban đầu.
- **C++11**: `auto`, lambda, move semantics, smart pointers và nhiều thay đổi lớn.
- **C++14**: hoàn thiện một số tính năng C++11.
- **C++17**: structured bindings, `std::optional`, `std::variant`, filesystem và nhiều cải tiến STL.
- **C++20**: concepts, ranges, coroutines, modules và format; mức hỗ trợ thư viện không đồng đều.
- **C++23**: bản chuẩn công bố sau C++20, có nhiều bổ sung nhỏ; mức hỗ trợ phụ thuộc phiên bản compiler và thư viện.

## Chuẩn dùng trong bộ tài liệu

Ví dụ cơ bản dùng **C++17** để tương thích rộng và có STL hiện đại. Bài dùng C++20 hoặc C++23 sẽ ghi rõ. Hãy đặt chuẩn tường minh thay vì dựa vào mặc định compiler:

```sh
g++ -std=c++17 -Wall -Wextra -Wpedantic main.cpp -o app
```

Với MSVC, chọn `/std:c++17`. Chuẩn ngôn ngữ không đảm bảo mọi thư viện đã triển khai đủ tính năng; kiểm tra bảng hỗ trợ của compiler trước khi dùng API mới.

## Lỗi thường gặp

- **Nhầm C++ với compiler**: C++ là ngôn ngữ và chuẩn; GCC, Clang, MSVC là các implementation.
- **Dựa vào extension riêng**: chương trình có thể chỉ build trên một compiler. Chọn chuẩn tường minh và tránh API không chuẩn nếu chưa có lý do.
- **Nghĩ rằng C++23 đồng nghĩa hỗ trợ đầy đủ**: compiler có thể chấp nhận cờ `-std=c++23` nhưng một số tính năng thư viện vẫn chưa sẵn sàng.

## Tự luyện

Giải thích vai trò của source code, compiler và thư viện chuẩn. Sau đó tìm compiler đang cài và ghi lại chuẩn cao nhất mà compiler lẫn thư viện hỗ trợ cho tính năng bạn cần.

## Đọc tiếp

Xem [cách cài compiler trên từng hệ điều hành](/cpp/bat-dau/cai-dat-moi-truong), rồi đọc [cách viết chương trình đầu tiên](/cpp/bat-dau/chuong-trinh-dau-tien).
