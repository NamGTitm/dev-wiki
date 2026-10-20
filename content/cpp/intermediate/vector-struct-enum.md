---
title: std::vector, struct và enum
description: Lưu danh sách có kích thước thay đổi và mô hình hóa dữ liệu bằng struct, enum class.
slug: /cpp/trung-cap/vector-struct-enum
category: intermediate
categoryLabel: C++ trung cấp
order: 21000
difficulty: beginner
keywords: [std::vector, dynamic array, struct, enum class, vector push_back]
updated: 2026-10-20
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/bat-dau/mang-string", "/cpp/stl/sequence-containers", "/cpp/stl/associative-containers"]
---

`std::vector<T>` là dãy phần tử cùng kiểu, lưu liên tiếp trong bộ nhớ và có thể tăng kích thước. Dùng nó thay mảng cố định khi số phần tử chỉ biết lúc chạy; cần include `<vector>`.

## Tạo và dùng vector

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> scores{8, 9, 7};
    scores.push_back(10);
    int total{};
    for (int score : scores) total += score;
    std::cout << total << '\n';
}
```

`size()` trả số phần tử; `empty()` kiểm tra rỗng; `push_back()` thêm phần tử; `at(i)` kiểm tra chỉ số và `operator[]` không kiểm tra. `reserve(n)` cấp trước capacity nhưng không thay đổi `size()`.

## Dữ liệu tự định nghĩa

```cpp
#include <iostream>

enum class Status { waiting, active, done };

struct Task {
    int id{};
    Status status{Status::waiting};
};

int main() {
    const Task task{1, Status::active};
    std::cout << task.id << '\n';
}
```

`struct` gom dữ liệu có liên hệ. Thành viên `struct` mặc định public; `class` mặc định private. `enum class` tạo tập trạng thái có tên và không tự chuyển thành số nguyên, giúp tránh nhập nhằng.

## Chọn cấu trúc

`std::vector` phù hợp đa số danh sách vì truy cập theo chỉ số O(1) và cache locality tốt. Nếu kích thước cố định tại compile time, dùng `std::array`. Nếu cần map/set hoặc hàng đợi, xem [các container STL](/cpp/stl/sequence-containers).

## Lỗi thường gặp

- Truy cập `v[0]` khi vector rỗng.
- Nhầm `capacity()` với `size()`.
- Giữ pointer/reference/iterator đến phần tử sau khi thêm làm vector reallocate; xem [iterator invalidation](/cpp/stl/iterators-invalidation).
- Dùng enum không có tên rõ hoặc `enum` không scoped khiến tên rò ra scope ngoài.

## Tự luyện

Tạo `struct Product` gồm tên và giá, lưu nhiều sản phẩm trong vector, rồi tính tổng giá. Quyết định cách xử lý vector rỗng và giá trị âm không hợp lệ.

## Đọc tiếp

Xem [sequence containers](/cpp/stl/sequence-containers), rồi học [class và encapsulation](/cpp/trung-cap/classes-constructors).
