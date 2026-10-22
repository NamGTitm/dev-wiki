---
title: Standard Template Library là gì?
description: Hiểu vai trò của containers, iterators, algorithms và function objects trong STL.
slug: /cpp/stl/stl-la-gi
category: modern
categoryLabel: STL và C++ hiện đại
order: 22000
difficulty: intermediate
keywords: [STL, standard library, container, iterator, algorithm, function object]
updated: 2026-10-22
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/stl/sequence-containers", "/cpp/stl/stl-algorithms", "/cpp/stl/iterators-invalidation"]
---

STL là tên gọi phổ biến cho nhóm công cụ của thư viện chuẩn C++ xoay quanh **containers, iterators, algorithms và callable objects**. Những thành phần này phối hợp với nhau để lưu dữ liệu và xử lý dữ liệu bằng các giao diện dùng chung.

Trong tài liệu này, STL được dùng theo nghĩa quen thuộc đó. Thư viện chuẩn C++ rộng hơn STL: nó còn có chuỗi, nhập xuất, quản lý bộ nhớ, xử lý thời gian, hệ thống tệp, luồng đồng thời và nhiều thành phần khác.

## Bốn mảnh ghép

- **Container** quản lý một tập hợp phần tử, ví dụ `std::vector`, `std::map` và `std::unordered_set`.
- **Iterator** định vị phần tử trong container và cung cấp cách duyệt. Cặp iterator thường biểu diễn một khoảng `[first, last)`.
- **Algorithm** thao tác trên khoảng iterator, ví dụ `std::sort`, `std::find` và `std::count`.
- **Callable** là quy tắc được gọi như một hàm, chẳng hạn function pointer, function object hoặc lambda. Thuật toán nhận callable để biết cách so sánh hay lọc phần tử.

Ví dụ sau sắp xếp dữ liệu, đếm số lần xuất hiện và tìm phần tử đầu tiên thỏa điều kiện:

```cpp
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
    std::vector<int> values{4, 1, 3, 1, 8};

    std::sort(values.begin(), values.end());
    const auto ones = std::count(values.begin(), values.end(), 1);
    const auto first_large =
        std::find_if(values.begin(), values.end(),
                     [](int value) { return value > 3; });

    std::cout << ones << ' ';
    if (first_large != values.end()) {
        std::cout << *first_large;
    }
    std::cout << '\n';
}
```

Kết quả:

```text
2 4
```

Khoảng `[first, last)` **bao gồm `first` nhưng không bao gồm `last`**. Vì vậy, khoảng rỗng có thể biểu diễn bằng `first == last`, và `end()` có thể làm mốc kết thúc mà không cần trỏ tới một phần tử hợp lệ.

## Vì sao iterator nối được container với algorithm?

Thuật toán không cần biết dữ liệu được lưu trong `vector`, mảng hay một cấu trúc khác; nó cần loại iterator đáp ứng những thao tác cần thiết. Chẳng hạn, `std::find` chỉ cần duyệt lần lượt, còn `std::sort` cần iterator truy cập ngẫu nhiên nên dùng được với `vector` nhưng không dùng trực tiếp với `list`.

Điều này tách hai quyết định:

1. Chọn cấu trúc lưu trữ theo cách chương trình cần truy cập và thay đổi dữ liệu.
2. Chọn thuật toán theo công việc cần làm trên một khoảng dữ liệu.

Thuật toán chuẩn vẫn có yêu cầu về iterator, thứ tự dữ liệu và callable. Dùng đúng giao diện không tự làm cho những điều kiện đó đúng.

## Chọn container theo thao tác

Hãy bắt đầu từ các thao tác chi phối chương trình:

- Cần truy cập theo chỉ số và duyệt tuần tự nhanh: thường bắt đầu với [`std::vector`](/cpp/stl/sequence-containers).
- Cần tra cứu theo key và duyệt theo thứ tự: cân nhắc [`std::map` hoặc `std::set`](/cpp/stl/associative-containers).
- Chỉ cần tra cứu theo key, không cần thứ tự: cân nhắc [`std::unordered_map` hoặc `std::unordered_set`](/cpp/stl/unordered-containers).
- Cần giới hạn cách lấy phần tử theo LIFO, FIFO hoặc ưu tiên: dùng [`stack`, `queue` hoặc `priority_queue`](/cpp/stl/container-adapters).

Đây là điểm khởi đầu, không phải quy tắc thay thế đo đạc. Độ phức tạp lý thuyết, locality bộ nhớ, kích thước dữ liệu và thao tác thực tế đều ảnh hưởng kết quả.

## Chọn algorithm và callable

Các algorithm trong `<algorithm>` biểu đạt ý định như tìm, sắp xếp, đếm hoặc xóa theo điều kiện. Ví dụ, `std::count_if` mô tả rõ việc đếm phần tử thỏa predicate thay vì phải tự quản lý biến đếm trong vòng lặp.

Với comparator dùng cho sắp xếp, quy tắc phải tạo **strict weak ordering**. Không dùng `a <= b` làm comparator: quan hệ này không thỏa điều kiện cần cho những algorithm sắp xếp. Xem thêm [STL algorithms](/cpp/stl/stl-algorithms).

## Header và chuẩn C++

Mỗi thành phần cần header khai báo nó; không dựa vào việc một header khác vô tình include hộ:

| Thành phần | Header thường dùng |
|---|---|
| `std::vector`, `std::list`, `std::deque` | `<vector>`, `<list>`, `<deque>` |
| `std::map`, `std::set` | `<map>`, `<set>` |
| `std::unordered_map`, `std::unordered_set` | `<unordered_map>`, `<unordered_set>` |
| `std::sort`, `std::find`, `std::count_if` | `<algorithm>` |
| `std::greater`, `std::less` | `<functional>` |

Các ví dụ trong nhóm bài này dùng C++17 làm nền. `std::ranges` và ranges algorithms thuộc C++20; xem [các mốc C++17, C++20 và C++23](/cpp/stl/cpp17-20-23) trước khi dùng chúng.

## Lỗi thường gặp

- Chọn container theo tên quen thuộc mà không xét thao tác thường xuyên.
- Truyền hai iterator không thuộc cùng một khoảng hợp lệ.
- Gọi algorithm trên iterator đã mất hiệu lực sau khi container thay đổi.
- Giả định thứ tự duyệt của unordered container ổn định.
- Tự viết lại algorithm chuẩn rồi bỏ sót trường hợp biên.

## Đọc tiếp

So sánh [sequence containers](/cpp/stl/sequence-containers), [associative containers](/cpp/stl/associative-containers) và [STL algorithms](/cpp/stl/stl-algorithms).
