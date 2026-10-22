---
title: Lambda, auto và range-based for
description: Viết callable ngắn, suy luận kiểu cục bộ và duyệt phần tử theo range.
slug: /cpp/stl/lambda-auto-range
category: modern
categoryLabel: STL và C++ hiện đại
order: 22070
difficulty: intermediate
keywords: [lambda C++, capture, auto, structured bindings, range-based for]
updated: 2026-10-22
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/stl/stl-algorithms", "/cpp/stl/cpp17-20-23", "/cpp/stl/move-semantics"]
---

Lambda là callable được viết tại chỗ. Nó đặc biệt hữu ích khi algorithm cần predicate hoặc comparator ngắn. `auto` yêu cầu compiler suy luận kiểu từ initializer; range-based `for` duyệt phần tử mà không cần viết iterator tường minh.

## Lambda và capture

```cpp
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
    const int threshold{5};
    std::vector<int> values{2, 7, 4, 9};

    const auto count = std::count_if(
        values.begin(), values.end(),
        [threshold](int value) {
            return value >= threshold;
        });

    std::cout << count << '\n';
}
```

`[threshold]` capture biến theo giá trị; lambda giữ một bản sao. `[&threshold]` capture theo reference nên lambda chỉ an toàn khi object gốc còn sống mỗi lần lambda được gọi. Capture tường minh giúp thấy dependency của callable.

Các dạng capture thường dùng:

| Cú pháp | Ý nghĩa |
|---|---|
| `[x]` | Capture `x` theo giá trị |
| `[&x]` | Capture `x` theo reference |
| `[limit = threshold]` | Tạo capture mới từ biểu thức; init-capture có từ C++14 |
| `[ptr = std::move(owner)]` | Chuyển ownership vào closure bằng init-capture |
| `[]` | Không capture biến cục bộ |

Capture theo giá trị không có nghĩa mọi dữ liệu mà biến đó trỏ tới cũng được sao chép. Chẳng hạn, copy một raw pointer chỉ copy địa chỉ. Khi lambda được giữ để chạy sau này hoặc đưa vào tác vụ bất đồng bộ, hãy kiểm tra lifetime của mọi object mà capture tham chiếu hoặc trỏ tới.

Lambda có thể khai báo `mutable` nếu cần sửa bản capture theo giá trị; việc sửa đó ảnh hưởng bản sao bên trong closure chứ không làm đổi biến gốc.

## auto và kiểu suy luận

`auto` phù hợp khi kiểu dài hoặc lặp lại kiểu trả về rõ hơn tên kiểu:

```cpp
#include <vector>

int main() {
    std::vector<int> values{1, 2, 3};
    const auto found = values.begin();
}
```

Mặc định, `auto value = expression` tạo biến theo kết quả suy luận và thường copy nếu initializer là object lvalue. Khi chỉ đọc object lớn, `const auto&` tránh copy; khi cần sửa phần tử container, dùng `auto&`.

`auto` không phải lúc nào cũng giữ nguyên kiểu hoặc qualifier ban đầu. Hãy chọn reference/cv-qualifier tường minh khi copy, quyền sửa hoặc lifetime quan trọng. Không dùng `auto` để che một kiểu có ý nghĩa với hợp đồng API.

## Structured bindings

C++17 cho phép đặt tên cho các thành phần của cặp hoặc cấu trúc phù hợp:

```cpp
#include <iostream>
#include <map>

int main() {
    const std::map<int, int> counts{{1, 3}, {2, 5}};
    for (const auto& [key, value] : counts) {
        std::cout << key << ": " << value << '\n';
    }
}
```

Dùng `const auto& [key, value]` để đọc mà không copy từng cặp. Dạng `auto [key, value]` có thể tạo bản sao; chọn reference khi muốn thao tác trên phần tử gốc hoặc tránh copy.

## Range-based for

`for (const auto& item : values)` phù hợp để đọc tuần tự mà không copy mỗi phần tử. Dùng `auto&` khi cần sửa trực tiếp phần tử; dùng `auto item` khi chủ ý xử lý một bản sao độc lập.

Vòng lặp range-based không cho phép tùy ý thay đổi cấu trúc container đang duyệt. Chèn hoặc xóa có thể làm iterator ẩn bên trong vòng lặp mất hiệu lực; xem [iterator invalidation](/cpp/stl/iterators-invalidation). Nếu cần xóa phần tử, dùng iterator loop có xử lý kết quả `erase` hoặc API như `std::erase_if` từ C++20.

## Generic lambda

Từ C++14, lambda có thể dùng tham số `auto`:

```cpp
auto twice = [](const auto& value) {
    return value + value;
};
```

Đây là generic lambda: compiler tạo dạng callable phù hợp cho kiểu đối số được truyền. Cách viết này hữu ích trong algorithm tổng quát, nhưng không nên dùng khi kiểu cụ thể giúp người đọc hiểu hợp đồng rõ hơn.

## Lỗi thường gặp

- Capture reference rồi giữ lambda lâu hơn object gốc.
- Capture ngầm bằng `[&]` trong callback có lifetime dài mà không xét biến nào thực sự được dùng.
- Copy phần tử lớn vô tình với `for (auto item : values)`.
- Sửa container trong lúc range-based for đang duyệt.
- Giả định `auto` luôn suy ra reference hoặc giữ nguyên constness của initializer.

## Đọc tiếp

Xem [STL algorithms](/cpp/stl/stl-algorithms), [move semantics](/cpp/stl/move-semantics) và [các mốc chuẩn C++](/cpp/stl/cpp17-20-23).
