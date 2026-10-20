---
title: Mảng và chuỗi trong C++
description: Duyệt mảng một chiều, biểu diễn bảng hai chiều và thao tác chuỗi bằng std::string.
slug: /cpp/bat-dau/mang-string
category: fundamentals
categoryLabel: C++ căn bản
order: 20080
difficulty: beginner
keywords: [array C++, mảng hai chiều, std::string, char array, index]
updated: 2026-10-20
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/bat-dau/ham-pham-vi", "/cpp/bat-dau/references-pointers", "/cpp/trung-cap/vector-struct-enum", "/cpp/thuat-toan/prefix-sum-difference-array"]
---

Mảng lưu nhiều phần tử cùng kiểu theo thứ tự. `std::string` lưu chuỗi ký tự và cung cấp thao tác tiện hơn mảng `char`. `std::array` có kích thước cố định tại compile time; với kích thước linh hoạt, dùng [`std::vector`](/cpp/trung-cap/vector-struct-enum).

## Mảng một chiều

```cpp
#include <array>
#include <iostream>

int main() {
    std::array<int, 4> scores{7, 9, 8, 10};
    int total{};
    for (int score : scores) total += score;
    std::cout << total << '\n';
}
```

Chỉ số bắt đầu từ 0 nên phần tử cuối có chỉ số `size() - 1`. Truy cập `scores.at(i)` kiểm tra biên và ném exception nếu sai; `scores[i]` không kiểm tra.

## Mảng hai chiều

```cpp
#include <iostream>

int main() {
int grid[2][3]{{1, 2, 3}, {4, 5, 6}};
    std::cout << grid[1][2] << '\n';
}
```

`grid[row][column]`; cả hai chỉ số đều phải trong giới hạn. Với bảng kích thước lúc chạy hoặc container lồng nhau, cân nhắc `std::vector`.

## `std::string`

```cpp
#include <iostream>
#include <string>

int main() {
    const std::string first{"Dev"};
    const std::string second{"Hubs"};
    std::string full{first + second};
    full += " Wiki";
    std::cout << full << '\n';
}
```

`std::string` là chuỗi byte theo encoding được chương trình sử dụng; `size()` đếm `char`, không nhất thiết là số ký tự người dùng nhìn thấy khi UTF-8 có ký tự nhiều byte. Đọc cả dòng bằng `std::getline(std::cin, text)`.

## Mảng `char` và lỗi thường gặp

Chuỗi C kiểu `char[]` cần phần tử kết thúc `\0`. Nếu không có byte kết thúc hoặc vùng chứa quá nhỏ, API C có thể đọc/ghi vượt biên. Code mới nên dùng `std::string` trừ khi giao tiếp API yêu cầu buffer byte cụ thể.

- Không truy cập chỉ số âm hoặc bằng `size()`.
- Không dùng `sizeof(array)` như độ dài sau khi mảng đã chuyển thành pointer trong tham số hàm.
- Không dùng `strlen` trực tiếp cho dữ liệu nhị phân có byte 0 ở giữa.

## Tự luyện

Tính phần tử lớn nhất và tổng đường chéo chính của ma trận vuông. Với mảng rỗng hoặc kích thước 0, quyết định rõ hành vi thay vì đọc phần tử đầu.

## Đọc tiếp

Tìm hiểu [references và pointers](/cpp/bat-dau/references-pointers) và xem [sequence containers](/cpp/stl/sequence-containers).
