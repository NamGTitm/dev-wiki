---
title: Function overloading và default arguments
description: Tạo các hàm cùng tên với chữ ký khác nhau và khai báo giá trị tham số mặc định.
slug: /cpp/trung-cap/overloading-default-arguments
category: intermediate
categoryLabel: C++ trung cấp
order: 21010
difficulty: intermediate
keywords: [function overloading, default argument, overload resolution, function signature]
updated: 2026-10-20
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/bat-dau/ham-pham-vi", "/cpp/trung-cap/templates-namespaces", "/cpp/trung-cap/de-quy-call-stack"]
---

Overloading cho phép dùng một tên hàm cho nhiều thao tác liên quan; compiler chọn hàm dựa trên số lượng và kiểu đối số. Default argument đặt giá trị dùng khi caller bỏ qua tham số cuối.

## Overloading

```cpp
#include <cstddef>
#include <iostream>
#include <string>

int length_of(int value) { return value; }
std::size_t length_of(const std::string& value) { return value.size(); }

int main() {
    const int number{length_of(7)};
    const std::size_t letters{length_of(std::string{"C++"})};
    std::cout << number << ' ' << letters << '\n';
}
```

Chữ ký overload được phân biệt bằng danh sách tham số; chỉ khác kiểu trả về là không đủ. Overload có thể gây mơ hồ nếu nhiều phép chuyển đổi đều hợp lệ, nên tránh các tập overload khó đoán.

## Default argument

```cpp
#include <iostream>
#include <string>

std::string greet(const std::string& name, const std::string& prefix = "Xin chao") {
    return prefix + ", " + name;
}

int main() {
    std::cout << greet("An") << '\n';
}
```

Tham số mặc định thường đặt ở khai báo mà caller nhìn thấy, chẳng hạn header; chỉ khai báo một lần cho cùng scope. Tham số có default phải đứng sau các tham số bắt buộc.

## Lỗi thường gặp

- Khai báo overload chỉ khác kiểu trả về.
- Viết default argument lặp lại cả trong header lẫn định nghĩa.
- Dùng nhiều default khiến một lời gọi khớp nhiều overload.
- Cho rằng overload được chọn theo kiểu trả về dự định của caller.

## Tự luyện

Viết `area` cho hình vuông và hình chữ nhật sao cho lời gọi không mơ hồ. Thêm default tên đơn vị vào hàm format; đặt default ở đúng một declaration.

## Đọc tiếp

Tìm hiểu [templates và namespace](/cpp/trung-cap/templates-namespaces) và [đệ quy, call stack](/cpp/trung-cap/de-quy-call-stack).
