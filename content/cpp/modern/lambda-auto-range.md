---
title: Lambda, auto và range-based for
description: Viết callable ngắn, suy luận kiểu cục bộ và duyệt phần tử theo range.
slug: /cpp/stl/lambda-auto-range
category: modern
categoryLabel: STL và C++ hiện đại
order: 22070
difficulty: intermediate
keywords: [lambda C++, capture, auto, structured bindings, range-based for]
updated: 2026-10-20
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/stl/stl-algorithms", "/cpp/stl/cpp17-20-23", "/cpp/stl/move-semantics"]
---

Lambda là callable có thể viết tại chỗ, thường dùng làm predicate hoặc comparator. `auto` suy ra kiểu từ initializer; range-based `for` duyệt phần tử mà không viết iterator tường minh.

## Lambda và capture

```cpp
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
    const int threshold{5};
    std::vector<int> values{2, 7, 4, 9};
    const auto count{std::count_if(values.begin(), values.end(),
        [threshold](int value) { return value >= threshold; })};
    std::cout << count << '\n';
}
```

`[threshold]` capture by value. `[&threshold]` capture by reference; lambda không được dùng sau khi object tham chiếu đã hết lifetime. `[=]`/`[&]` capture ngầm nhiều biến có thể che giấu dependency, nên ghi capture tường minh trong code quan trọng.

## `auto` và structured bindings

```cpp
#include <map>

int main() {
    std::map<int, int> counts{{1, 3}, {2, 5}};
    for (const auto& [key, value] : counts) {
        (void)key;
        (void)value;
    }
}
```

Structured bindings cần C++17. Dùng `const auto&` để tránh copy khi chỉ đọc object lớn. Dùng `auto` khi kiểu dài hoặc suy luận giúp code rõ; đừng dùng để che giấu kiểu quan trọng của API.

## Lỗi thường gặp

- Capture reference rồi giữ lambda lâu hơn object gốc.
- Dùng `[&]` trong asynchronous callback có lifetime dài.
- Copy phần tử lớn vô tình trong vòng lặp `for (auto item : values)`.
- Sửa container trong lúc range-based for duyệt nó.

## Tự luyện

Viết lambda lọc số dương và comparator sắp xếp string theo độ dài rồi alphabet. Xác định biến nào được capture và theo cách nào.

## Đọc tiếp

Xem [STL algorithms](/cpp/stl/stl-algorithms), [move semantics](/cpp/stl/move-semantics) và [các mốc chuẩn C++](/cpp/stl/cpp17-20-23).
