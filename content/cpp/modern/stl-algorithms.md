---
title: STL algorithms
description: Dùng sort, find, count, lower_bound và các thuật toán chuẩn trên range iterator.
slug: /cpp/stl/stl-algorithms
category: modern
categoryLabel: STL và C++ hiện đại
order: 22060
difficulty: intermediate
keywords: [std::sort, std::find, std::count, lower_bound, algorithm, comparator]
updated: 2026-10-20
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/stl/stl-la-gi", "/cpp/stl/lambda-auto-range", "/cpp/thuat-toan/tim-kiem-sap-xep"]
---

`<algorithm>` cung cấp thao tác trên range iterator. Các hàm này thường ngắn, dễ kiểm tra hơn vòng lặp tự viết và biểu đạt đúng ý định.

## Ví dụ

```cpp
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
    std::vector<int> values{7, 2, 5, 2, 9};
    std::sort(values.begin(), values.end());
    const auto count{std::count(values.begin(), values.end(), 2)};
    const auto found{std::lower_bound(values.begin(), values.end(), 5)};
    std::cout << count << ' ' << (found - values.begin()) << '\n';
}
```

## Thuật toán phổ biến

- `std::sort(first, last)`: sắp xếp; O(n log n) so sánh, không ổn định.
- `std::stable_sort`: giữ thứ tự tương đối của phần tử tương đương; thường cần thêm bộ nhớ.
- `std::find`/`std::find_if`: tìm phần tử đầu thỏa điều kiện; O(n).
- `std::count`/`std::count_if`: đếm; O(n).
- `std::lower_bound`: binary search, yêu cầu range đã sắp xếp theo comparator tương thích; O(log n) bước với random-access iterator.
- `std::min_element`/`std::max_element`: tìm min/max; O(n).

Comparator cho `sort` cần strict weak ordering. Đừng viết `a <= b`; dùng `a < b` hoặc comparator tương đương đúng tính chất.

## Lỗi thường gặp

- Gọi `lower_bound` trên dãy chưa sắp xếp.
- Quên `#include <algorithm>`.
- Dùng `std::sort` khi cần giữ thứ tự các phần tử bằng nhau.
- Dùng `begin()` và `end()` không cùng container.

## Tự luyện

Sắp xếp danh sách cặp `(điểm, tên)` theo điểm giảm dần, rồi tên tăng dần khi bằng điểm. Viết comparator xác định thứ tự nhất quán.

## Đọc tiếp

Học [lambda và auto](/cpp/stl/lambda-auto-range), rồi xem [tìm kiếm và sắp xếp](/cpp/thuat-toan/tim-kiem-sap-xep).
