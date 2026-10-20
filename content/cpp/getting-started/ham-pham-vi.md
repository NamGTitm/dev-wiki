---
title: Hàm, tham số và phạm vi biến
description: Chia chương trình thành hàm, truyền dữ liệu, trả kết quả và hiểu scope cơ bản.
slug: /cpp/bat-dau/ham-pham-vi
category: fundamentals
categoryLabel: C++ căn bản
order: 20070
difficulty: beginner
keywords: [function C++, tham số, return, scope, local variable, lifetime]
updated: 2026-10-20
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/bat-dau/nhap-xuat-dieu-kien-vong-lap", "/cpp/bat-dau/references-pointers", "/cpp/trung-cap/overloading-default-arguments"]
---

Hàm đặt tên cho một thao tác để tái sử dụng và kiểm tra riêng. Tách logic thành hàm giúp `main` dễ đọc và giảm lặp code.

## Cú pháp

```cpp
#include <iostream>

int add(int left, int right) {
    return left + right;
}

int main() {
    const int result{add(2, 3)};
    std::cout << result << '\n';
}
```

`int` trước tên hàm là kiểu trả về; `left`, `right` là tham số. `return` trả kết quả và kết thúc lời gọi. Hàm `void` không trả giá trị. Trong C++ cần khai báo hàm trước khi được gọi, thường bằng prototype trong header hoặc đặt định nghĩa phía trên caller.

## Truyền theo giá trị và tham chiếu

Tham số giá trị tạo bản sao; sửa bản sao không sửa biến bên ngoài. Dùng `const T&` cho object lớn chỉ đọc để tránh sao chép và ngăn sửa qua tham số:

```cpp
#include <iostream>
#include <string>

bool is_named(const std::string& name) {
    return !name.empty();
}

int main() {
    const std::string name{"An"};
    std::cout << is_named(name) << '\n';
}
```

Tham chiếu phải gắn với object hợp lệ. Bài [references và pointers](/cpp/bat-dau/references-pointers) giải thích thêm về lifetime.

## Scope và lifetime

Biến khai báo trong `{}` chỉ truy cập được trong block đó. Biến local tự động bị hủy khi rời scope. Không trả về reference hoặc pointer tới biến local vì object đã hết lifetime.

## Lỗi thường gặp

- In kết quả trong hàm thay vì `return` khiến caller không nhận được giá trị.
- Gọi hàm với sai số lượng hoặc kiểu tham số.
- Cùng tên hàm nhưng khác kiểu trả về không tạo overload hợp lệ.
- Trả reference tới local gây dangling reference.

## Tự luyện

Viết `int square(int value)` và hàm `bool is_even(int value)`. Kiểm tra với số âm, 0 và số dương; dự đoán kết quả của `is_even(-4)`.

## Đọc tiếp

Học [function overloading và default arguments](/cpp/trung-cap/overloading-default-arguments) và xem [đệ quy, call stack](/cpp/trung-cap/de-quy-call-stack).
