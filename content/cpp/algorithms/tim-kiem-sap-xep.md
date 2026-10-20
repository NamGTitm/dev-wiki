---
title: Searching và sorting
description: So sánh linear search, binary search và các cách sắp xếp thường dùng trong C++.
slug: /cpp/thuat-toan/tim-kiem-sap-xep
category: algorithms
categoryLabel: Thuật toán và Competitive Programming
order: 23020
difficulty: beginner
keywords: [linear search, binary search, sorting, std::sort, std::lower_bound]
updated: 2026-10-20
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/stl/stl-algorithms", "/cpp/thuat-toan/binary-search-answer", "/cpp/thuat-toan/do-phuc-tap"]
---

Searching tìm phần tử đáp ứng điều kiện; sorting sắp dữ liệu theo thứ tự để hỗ trợ truy vấn hoặc output. Hãy chọn cách dựa trên số truy vấn và trạng thái ban đầu của dữ liệu.

## Linear search

`std::find` duyệt tuần tự, O(n) thời gian, O(1) bộ nhớ phụ. Dùng tốt cho dãy nhỏ hoặc một lần tìm kiếm.

## Binary search

Binary search giảm nửa khoảng tìm mỗi bước nên O(log n), nhưng range phải được sắp xếp hoặc có predicate đơn điệu. `std::lower_bound` trả iterator đầu tiên có giá trị không nhỏ hơn key. Nếu dãy chưa sort và chỉ tìm một lần, sort trước có thể không đáng.

```cpp
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
    std::vector<int> values{8, 2, 5, 2, 9};
    std::sort(values.begin(), values.end());
    const auto found{std::lower_bound(values.begin(), values.end(), 5)};
    std::cout << (found != values.end() && *found == 5) << '\n';
}
```

## Sorting

`std::sort` thường dùng introsort với O(n log n) so sánh ở worst case trong standard library hiện đại; hợp đồng chuẩn đặt giới hạn O(n log n). Nó không ổn định. Dùng `std::stable_sort` nếu thứ tự tương đối các phần tử tương đương là yêu cầu.

## Lỗi thường gặp

- Binary search trên dãy chưa sort hoặc comparator không khớp thứ tự sort.
- Không kiểm tra iterator bằng `end()` trước khi dereference.
- Comparator không tạo strict weak ordering.
- Sắp xếp rồi quên chi phí O(n log n) khi chỉ có một truy vấn nhỏ.

## Tự luyện

Tìm vị trí xuất hiện đầu tiên và cuối cùng của `x` trong dãy đã sort bằng hai lần `lower_bound`/`upper_bound`. Thử khi `x` không tồn tại và khi dãy rỗng.

## Đọc tiếp

Xem [STL algorithms](/cpp/stl/stl-algorithms) và áp dụng binary search lên kết quả trong [binary search on answer](/cpp/thuat-toan/binary-search-answer).
