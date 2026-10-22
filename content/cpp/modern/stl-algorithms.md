---
title: STL algorithms
description: Dùng sort, find, count, lower_bound và các thuật toán chuẩn trên range iterator.
slug: /cpp/stl/stl-algorithms
category: modern
categoryLabel: STL và C++ hiện đại
order: 22060
difficulty: intermediate
keywords: [std::sort, std::find, std::count, lower_bound, algorithm, comparator]
updated: 2026-10-22
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/stl/stl-la-gi", "/cpp/stl/lambda-auto-range", "/cpp/thuat-toan/tim-kiem-sap-xep"]
---

Header `<algorithm>` cung cấp các thao tác tổng quát trên khoảng iterator. Dùng algorithm có tên rõ thường giúp người đọc nhận ra ý định nhanh hơn và giảm lỗi chỉ số, nhưng mỗi algorithm vẫn có yêu cầu riêng về iterator, thứ tự dữ liệu và callable.

## Ví dụ: sắp xếp, đếm và tìm

```cpp
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
    std::vector<int> values{7, 2, 5, 2, 9};

    std::sort(values.begin(), values.end());
    const auto count = std::count(values.begin(), values.end(), 2);
    const auto found = std::lower_bound(
        values.begin(), values.end(), 5);

    std::cout << count << ' ';
    if (found != values.end()) {
        std::cout << *found;
    }
    std::cout << '\n';
}
```

Kết quả là `2 5`. `std::sort` sắp xếp vector; sau đó `std::count` đếm giá trị bằng `2`, còn `std::lower_bound` trả iterator tới phần tử đầu tiên không nhỏ hơn `5`.

Các thuật toán làm việc với khoảng nửa mở `[first, last)`: iterator đầu được xử lý, iterator cuối chỉ làm mốc dừng. Khi truyền range, hai iterator phải thuộc cùng một dãy hợp lệ.

## Nhóm thuật toán thường dùng

| Nhu cầu | Thuật toán | Ghi chú |
|---|---|---|
| Tìm giá trị | `std::find`, `std::find_if` | Duyệt tuyến tính, O(n) |
| Đếm | `std::count`, `std::count_if` | Duyệt tuyến tính, O(n) |
| Sắp xếp | `std::sort` | Cần iterator truy cập ngẫu nhiên; O(n log n) phép so sánh |
| Sắp xếp ổn định | `std::stable_sort` | Giữ thứ tự tương đối của phần tử tương đương; có thể cần thêm bộ nhớ |
| Tìm min/max | `std::min_element`, `std::max_element` | Trả iterator; O(n) |
| Tìm trong range đã sắp xếp | `std::lower_bound`, `std::upper_bound` | O(log n) phép so sánh; hiệu quả bước nhảy phụ thuộc loại iterator |

Độ phức tạp số phép so sánh không phải lúc nào cũng bằng số bước iterator. Ví dụ, tìm kiếm nhị phân trên `vector` có thể nhảy tới giữa range trong O(1), nhưng với `list`, việc tiến iterator tới giữa có thể cần O(n) bước.

## Sắp xếp và comparator

Mặc định, `std::sort` sắp xếp theo thứ tự tăng dần với `operator<`. Có thể truyền comparator để định nghĩa thứ tự khác:

```cpp
#include <algorithm>
#include <string>
#include <utility>
#include <vector>

int main() {
    std::vector<std::pair<int, std::string>> results{
        {80, "An"}, {95, "Binh"}, {95, "Chi"}
    };

    std::sort(results.begin(), results.end(),
        [](const auto& left, const auto& right) {
            if (left.first != right.first) {
                return left.first > right.first;
            }
            return left.second < right.second;
        });
}
```

Comparator phải tạo strict weak ordering. Tránh `a <= b`: một giá trị không được xem là đứng trước chính nó theo quan hệ này. Nếu cần giữ thứ tự ban đầu giữa phần tử tương đương, dùng `std::stable_sort`.

## Tìm kiếm nhị phân

`std::lower_bound(first, last, value)` yêu cầu range đã được partition theo phép so sánh tìm kiếm; trong thực tế, điều này thường có nghĩa là dãy đã sắp xếp theo cùng comparator. Hàm trả vị trí đầu tiên mà phần tử không đứng trước `value`. Nếu trả `last`, vị trí chèn nằm sau mọi phần tử thỏa thứ tự đó.

`std::upper_bound` tìm vị trí đầu tiên mà `value` đứng trước phần tử. Cặp kết quả `[lower_bound, upper_bound)` biểu diễn các phần tử tương đương với key trong range đã sắp, hữu ích khi có giá trị lặp.

Không dùng `lower_bound` để thay `find` trên dãy chưa sắp xếp. Nếu chỉ cần tìm tuyến tính, `std::find` hoặc `std::find_if` thường là lựa chọn đúng.

## Xóa phần tử có điều kiện trong C++17

`std::remove_if` không thay đổi kích thước container. Nó dồn các phần tử cần giữ về đầu range và trả iterator đánh dấu phần cuối mới của phần được giữ; các phần tử sau iterator đó vẫn thuộc container nhưng không nên được dùng như một kết quả xác định.

Với `vector`, kết hợp với `erase` để thật sự giảm kích thước:

```cpp
#include <algorithm>
#include <vector>

int main() {
    std::vector<int> values{1, 2, 3, 4, 5, 6};

    const auto new_end = std::remove_if(
        values.begin(), values.end(),
        [](int value) { return value % 2 == 0; });
    values.erase(new_end, values.end());
}
```

Đây thường được gọi là erase-remove idiom. Từ C++20, `std::erase_if` cung cấp giao diện gọn hơn cho nhiều container; kiểm tra chuẩn tối thiểu của dự án trước khi dùng.

`std::unique` cũng chỉ dồn phần tử trùng liền kề và trả vị trí kết thúc mới; nó không tự thay đổi kích thước. Muốn loại bản sao toàn cục, thường cần sắp xếp trước rồi mới gọi `unique`, nếu việc đổi thứ tự là phù hợp.

## Lỗi thường gặp

- Gọi `lower_bound` trên dãy không được sắp theo comparator tương ứng.
- Dùng `std::sort` với `list`; algorithm này cần random-access iterator. Dùng `list::sort()` hoặc chuyển sang container phù hợp.
- Quên `#include <algorithm>`.
- Dùng comparator không nhất quán, chẳng hạn `<=`.
- Nghĩ `remove_if` hoặc `unique` tự xóa phần tử khỏi container.
- Tính iterator offset bằng phép trừ trên iterator không hỗ trợ random access.

## C++20 Ranges

C++20 bổ sung ranges algorithms như `std::ranges::sort`, nhận range trực tiếp và giảm khả năng truyền nhầm hai iterator. Ranges cũng có projections và views, nhưng có quy tắc lifetime riêng; xem [lambda, auto và range-based for](/cpp/stl/lambda-auto-range) cùng [các mốc chuẩn C++](/cpp/stl/cpp17-20-23).

## Đọc tiếp

Xem [STL là gì](/cpp/stl/stl-la-gi), [lambda và auto](/cpp/stl/lambda-auto-range), rồi đối chiếu với [tìm kiếm và sắp xếp](/cpp/thuat-toan/tim-kiem-sap-xep).
