---
title: Header, source và C++ modules
description: Chia khai báo, định nghĩa và dependency giữa translation units mà không tạo include cycle.
slug: /cpp/ky-thuat/header-source-modules
category: engineering
categoryLabel: Kỹ nghệ phần mềm C++
order: 24010
difficulty: intermediate
keywords: [header file, source file, translation unit, include guard, C++ modules]
updated: 2026-10-20
collection: cpp
collectionLabel: C++
collectionDescription: Cách xây dựng, kiểm tra, debug và bảo vệ ứng dụng C++ có thể bảo trì.
related: ["/cpp/trung-cap/templates-namespaces", "/cpp/ky-thuat/cmake", "/cpp/ky-thuat/clean-code"]
---

Chia chương trình thành header và source giúp compiler build từng translation unit và tạo public API ổn định. Mỗi `.cpp` được compile riêng; linker kết hợp object files và libraries.

## Header và implementation

Header chứa declarations mà caller cần. Dùng include guard portable:

```cpp
#ifndef DEVHUBS_MATH_HPP
#define DEVHUBS_MATH_HPP

int add(int left, int right);

#endif
```

Định nghĩa đặt trong `.cpp`:

```cpp
#include "math.hpp"

int add(int left, int right) {
    return left + right;
}
```

Đặt prototype vào `math.hpp` và hai định nghĩa ở `math.cpp`. `main.cpp` có thể gọi API đó:

```cpp
#include "math.hpp"

int main() {
    return add(2, 3) == 5 ? 0 : 1;
}
```

Build ba file cùng lúc: `g++ -std=c++17 main.cpp math.cpp -o app`.

`#pragma once` được nhiều compiler hỗ trợ nhưng không thuộc core language standard. Header nên tự include các header cần cho declaration của nó và tránh kéo dependency không cần thiết. Định nghĩa non-inline cùng external linkage đặt trong header có thể gây multiple definition.

## Dependency và template

Đưa forward declaration vào header khi đủ, include đầy đủ nơi cần complete type. Template thường phải để definition nhìn thấy khi instantiate, thường trong header. Tránh include cycle; thiết kế dependency một chiều.

## C++20 modules

Modules thay một phần cơ chế textual include bằng interface/implementation unit và module import. Dù thuộc C++20, workflow build, module cache và hỗ trợ toolchain vẫn khác nhau; áp dụng khi compiler/IDE/CI của dự án hỗ trợ ổn định.

## Lỗi thường gặp

- Header không có guard và bị include lặp.
- Định nghĩa hàm global trong header được include nhiều translation unit.
- Dựa vào header khác include hộ dependency.
- Circular include phản ánh module boundaries chưa rõ.

## Tự luyện

Chia `main` và hàm `add` thành `main.cpp`, `math.cpp`, `math.hpp`, sau đó build cả hai `.cpp` cùng lúc.

## Đọc tiếp

Build nhiều translation unit bằng [CMake](/cpp/ky-thuat/cmake) và giữ dependency rõ theo [Clean Code](/cpp/ky-thuat/clean-code).
