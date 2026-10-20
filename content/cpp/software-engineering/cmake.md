---
title: CMake và build systems
description: Khai báo executable, source và yêu cầu C++17 bằng CMake thay vì hardcode lệnh build.
slug: /cpp/ky-thuat/cmake
category: engineering
categoryLabel: Kỹ nghệ phần mềm C++
order: 24020
difficulty: intermediate
keywords: [CMake, build system, CMAKE_CXX_STANDARD, target, generator]
updated: 2026-10-20
collection: cpp
collectionLabel: C++
collectionDescription: Cách xây dựng, kiểm tra, debug và bảo vệ ứng dụng C++ có thể bảo trì.
related: ["/cpp/ky-thuat/header-source-modules", "/cpp/ky-thuat/unit-testing", "/cpp/stl/cpp17-20-23"]
---

CMake mô tả targets và yêu cầu build, rồi sinh project cho Make, Ninja, Visual Studio, Xcode hoặc generator khác. Dùng nó khi chương trình có nhiều file, dependency, test hoặc nhiều nền tảng.

## Project tối thiểu

```cmake
cmake_minimum_required(VERSION 3.20)
project(hello_cpp LANGUAGES CXX)

add_executable(hello main.cpp)
target_compile_features(hello PRIVATE cxx_std_17)
```

Build trong thư mục riêng:

```sh
cmake -S . -B build
cmake --build build
```

Target-level `cxx_std_17` thể hiện nhu cầu của executable; dependency có thể khai báo requirements riêng. Tránh đặt compiler flags riêng cho một nền tảng ở phạm vi global nếu CMake có API portable.

## Targets và dependency

Mỗi executable/library nên là target tường minh. Gắn include directories, compile features, definitions và link libraries vào target sở hữu chúng. Khi tạo thư viện nội bộ, phân biệt dependency `PRIVATE`, `PUBLIC`, `INTERFACE` theo việc caller có cần kế thừa dependency đó không.

## Lỗi thường gặp

- Chạy build trực tiếp trong source tree và để file generated lẫn source.
- Hardcode đường dẫn tuyệt đối hoặc tên compiler.
- Dùng `file(GLOB ...)` rồi mong mọi generator tự nhận source mới.
- Đặt chuẩn C++ chỉ trên máy developer mà không ghi vào build configuration.

## Tự luyện

Thêm `math.cpp` và `math.hpp`, build chung thành executable. Sau đó tạo một test executable riêng và cho CTest chạy nó.

## Tài liệu tiếp

Hướng dẫn chính thức: [CMake Tutorial](https://cmake.org/cmake/help/latest/guide/tutorial/). Xem thêm [unit testing](/cpp/ky-thuat/unit-testing) và [header/source](/cpp/ky-thuat/header-source-modules).
