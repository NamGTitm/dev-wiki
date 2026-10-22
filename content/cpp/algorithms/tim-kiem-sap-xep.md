---
title: Searching và sorting
description: So sánh linear search, binary search và các cách sắp xếp thường dùng trong C++.
slug: /cpp/thuat-toan/tim-kiem-sap-xep
category: algorithms
categoryLabel: Thuật toán và Competitive Programming
order: 23020
difficulty: beginner
keywords: [linear search, binary search, sorting, std::sort, std::lower_bound]
updated: 2026-10-22
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/stl/stl-algorithms", "/cpp/thuat-toan/binary-search-answer", "/cpp/thuat-toan/do-phuc-tap"]
---

Searching tìm phần tử thỏa điều kiện; sorting sắp dữ liệu để hỗ trợ truy vấn hoặc tạo output có thứ tự. Khi chọn thuật toán, cần xét dữ liệu đã sort chưa, có bao nhiêu truy vấn và kết quả cần là một giá trị, iterator hay cả đoạn trùng lặp.

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
    const auto after{std::upper_bound(values.begin(), values.end(), 5)};
    std::cout << std::boolalpha
              << (found != values.end() && *found == 5) << ' '
              << (after - found) << '\n';
}
```

Khi dãy đã sort, ví dụ trên trở thành {2, 2, 5, 8, 9}. lower_bound trỏ đến 5, còn upper_bound trỏ đến phần tử đầu tiên lớn hơn 5; hiệu hai iterator là 1, nên chương trình in true 1. Nếu tìm 2, hiệu hai biên là 2 vì giá trị đó xuất hiện hai lần. Cả hai hàm cần range được sắp xếp theo thứ tự tương thích với phép so sánh mà chúng dùng.

Với vector hoặc array, iterator truy cập ngẫu nhiên nên binary search cần O(log n) bước di chuyển. Với iterator chỉ hỗ trợ đi tới phần tử kế tiếp, số phép so sánh vẫn logarithmic nhưng tổng số bước iterator có thể là O(n).

## Sorting

`std::sort` bảo đảm O(n log n) phép so sánh theo yêu cầu của thư viện chuẩn và không giữ thứ tự tương đối của các phần tử tương đương. Dùng `std::stable_sort` khi thứ tự cũ giữa các phần tử tương đương mang ý nghĩa; thuật toán này có thể cần thêm bộ nhớ.

Khi có q truy vấn trên cùng một dãy, sort một lần rồi binary search tốn khoảng O(n log n + q log n) trên vector; quét lại từ đầu cho từng truy vấn tốn tới O(qn). Nếu chỉ có một truy vấn, so sánh chi phí này với một lần quét tuyến tính trước khi sort.

Comparator tùy chỉnh phải tạo strict weak ordering. Không dùng phép so sánh <= vì khi so một giá trị với chính nó, comparator trả true. Nếu sort theo thứ tự tùy chỉnh, lower_bound và upper_bound cũng phải nhận comparator tương thích; không thể tìm theo thứ tự tăng mặc định trên range đã sort giảm dần.

## Lỗi thường gặp

- Binary search trên dãy chưa sort hoặc comparator không khớp thứ tự sort.
- Không kiểm tra iterator bằng `end()` trước khi dereference.
- Comparator không tạo strict weak ordering.
- Sắp xếp rồi quên chi phí O(n log n) khi chỉ có một truy vấn nhỏ.

## Đọc tiếp

Xem [STL algorithms](/cpp/stl/stl-algorithms) và áp dụng binary search lên kết quả trong [binary search on answer](/cpp/thuat-toan/binary-search-answer).
