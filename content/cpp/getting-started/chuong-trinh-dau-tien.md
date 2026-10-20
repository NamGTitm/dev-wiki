---
title: Chương trình C++ đầu tiên
description: Viết, biên dịch và chạy chương trình C++17 tối giản từ terminal.
slug: /cpp/bat-dau/chuong-trinh-dau-tien
category: fundamentals
categoryLabel: C++ căn bản
order: 20030
difficulty: beginner
keywords: [Hello World C++, main, include, biên dịch, chạy C++]
updated: 2026-10-20
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/bat-dau/cai-dat-moi-truong", "/cpp/bat-dau/bien-kieu-du-lieu", "/cpp/bat-dau/ham-pham-vi"]
---

Chương trình đầu tiên giúp bạn kiểm tra compiler và hiểu cấu trúc tối thiểu của một file C++. Bạn cần biết cách tạo file văn bản và chạy lệnh trong terminal.

## Ví dụ

Lưu thành `main.cpp`:

```cpp
#include <iostream>

int main() {
    std::cout << "Xin chao, C++!\n";
    return 0;
}
```

Biên dịch và chạy:

```sh
g++ -std=c++17 -Wall -Wextra -Wpedantic main.cpp -o hello
./hello
```

Kết quả:

```text
Xin chao, C++!
```

## Các thành phần

- `#include <iostream>` đưa khai báo của luồng nhập xuất chuẩn vào translation unit.
- `int main()` là điểm bắt đầu của chương trình hosted C++.
- `std::cout` ghi dữ liệu ra output; `\n` xuống dòng.
- `return 0` báo kết thúc thành công. Trong `main`, có thể bỏ `return 0` mà ý nghĩa vẫn là trả về 0.
- `std::` chỉ rõ tên thuộc namespace chuẩn, tránh cần `using namespace std;`.

Compiler có hai bước khái quát: dịch source và liên kết các object/library thành executable. Với một file, compiler thường gộp các bước trong cùng một lệnh.

## Lỗi thường gặp

- **Thiếu `;`**: compiler thường báo lỗi ở dòng kế tiếp; kiểm tra cả dòng trước vị trí báo lỗi.
- **Không tìm thấy `iostream` hoặc `g++`**: kiểm tra compiler và toolchain, không sửa source để lách lỗi môi trường.
- **Sai thư mục**: lệnh không tìm thấy `main.cpp`; chạy `pwd` hoặc `cd` đến nơi chứa file.

## Tự luyện

Sửa chương trình để in tên bạn trên hai dòng. Sau đó dùng `std::cout` để in `2 + 3` và dự đoán kết quả trước khi build.

## Đọc tiếp

Học [biến, kiểu dữ liệu và biên dịch](/cpp/bat-dau/bien-kieu-du-lieu), rồi thực hành [nhập xuất](/cpp/bat-dau/nhap-xuat-dieu-kien-vong-lap).
