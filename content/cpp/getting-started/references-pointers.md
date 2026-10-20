---
title: References và pointers cơ bản
description: Phân biệt truyền giá trị, reference và pointer, đồng thời tránh truy cập object hết vòng đời.
slug: /cpp/bat-dau/references-pointers
category: fundamentals
categoryLabel: C++ căn bản
order: 20090
difficulty: beginner
keywords: [reference C++, pointer, address, nullptr, dereference, dangling]
updated: 2026-10-20
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/bat-dau/ham-pham-vi", "/cpp/bat-dau/mang-string", "/cpp/trung-cap/stack-heap-lifetime", "/cpp/stl/raii-smart-pointers"]
---

Reference và pointer cho phép truy cập một object thông qua tên hoặc địa chỉ thay vì tạo bản sao. Dùng chúng khi cần truyền object lớn, biểu diễn optional link hoặc làm việc với API; phải đảm bảo object còn sống.

## Reference

```cpp
#include <iostream>

void add_bonus(int& score) {
    score += 5;
}

void print_score(const int& score) {
    std::cout << score << '\n';
}

int main() {
    int score{10};
    add_bonus(score);
    print_score(score);
}
```

`T&` là lvalue reference; `const T&` cho phép đọc mà không sao chép. Reference phải được khởi tạo khi khai báo và không thể đổi sang trỏ object khác. Không có null reference hợp lệ.

## Pointer

```cpp
#include <iostream>

int main() {
int score{10};
int* pointer{&score};
*pointer = 12;

int* optional_score{nullptr};
if (optional_score != nullptr) {
    std::cout << *optional_score;
}
    std::cout << ' ' << score << '\n';
}
```

`&score` lấy địa chỉ, `*pointer` dereference. Pointer có thể là `nullptr` hoặc trỏ sai/hết hạn; chỉ dereference khi chắc chắn nó trỏ tới object còn sống.

## Chọn cách truyền

- Kiểu nhỏ như `int`, `bool`: truyền theo giá trị thường đơn giản nhất.
- Object lớn, chỉ đọc: `const T&`.
- Object phải sửa: `T&`.
- Có thể không có object hoặc API dùng sentinel: `T*`, kiểm tra null.
- Ownership động: ưu tiên smart pointer ở [RAII](/cpp/stl/raii-smart-pointers), không tự quản lý `new`/`delete` nếu không cần.

## Lỗi thường gặp

- Trả pointer/reference tới biến local đã bị hủy.
- Dereference `nullptr`.
- Dùng pointer sau khi vùng chứa `std::vector` reallocate; địa chỉ cũ có thể mất hiệu lực.
- Sửa object qua pointer/reference khi hợp đồng hàm chỉ nên đọc; dùng `const`.

## Tự luyện

Viết hàm đổi chỗ hai số bằng `int&`. Viết thêm hàm nhận `const std::string&` và trả về độ dài chuỗi, không tạo bản sao.

## Đọc tiếp

Tìm hiểu [stack, heap và lifetime](/cpp/trung-cap/stack-heap-lifetime), rồi học [smart pointers](/cpp/stl/raii-smart-pointers).
