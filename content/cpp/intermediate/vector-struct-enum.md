---
title: std::vector, struct và enum
description: Quản lý danh sách động và biểu diễn dữ liệu có cấu trúc bằng struct, enum class.
slug: /cpp/trung-cap/vector-struct-enum
category: intermediate
categoryLabel: C++ trung cấp
order: 21000
difficulty: beginner
keywords: [std::vector, dynamic array, struct, enum class, vector push_back]
updated: 2026-10-22
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/bat-dau/mang-string", "/cpp/stl/sequence-containers", "/cpp/stl/associative-containers"]
---

`std::vector<T>` là dãy phần tử cùng kiểu được lưu liên tiếp trong bộ nhớ. Vector tự quản lý vùng nhớ và có thể tăng kích thước khi thêm phần tử, nên thường là lựa chọn mặc định cho một danh sách mà số phần tử chỉ biết lúc chạy. Khai báo nó bằng header `<vector>`.

## Tạo, đọc và cập nhật vector

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> scores{8, 9, 7};
    scores.push_back(10);

    int total{};
    for (const int score : scores) {
        total += score;
    }

    std::cout << "So diem: " << scores.size() << '\n';
    std::cout << "Tong: " << total << '\n';
}
```

`size()` là số phần tử đang có; `capacity()` là số phần tử vector có thể chứa trước khi cần xin vùng nhớ mới. Hai giá trị này khác nhau: `reserve(n)` có thể tăng `capacity()` nhưng không tạo thêm phần tử và không đổi `size()`. Nếu cần tạo sẵn `n` phần tử, dùng constructor phù hợp, chẳng hạn `std::vector<int> values(3, 5)`.

Lưu ý cách khởi tạo bằng ngoặc nhọn: `std::vector<int> values{3, 5}` tạo vector có hai phần tử `3` và `5`, còn `std::vector<int> values(3, 5)` tạo ba phần tử, mỗi phần tử bằng `5`. Dạng ngoặc tròn cũng có thể dùng để chỉ kích thước mà chưa chỉ giá trị: `std::vector<int> values(3)` tạo ba số nguyên được khởi tạo bằng `0`.

## Truy cập và duyệt

- `v[i]` truy cập nhanh nhưng không kiểm tra chỉ số. Chỉ dùng khi chương trình đã bảo đảm `i < v.size()`; truy cập ngoài phạm vi là hành vi không xác định.
- `v.at(i)` kiểm tra phạm vi và ném `std::out_of_range` nếu chỉ số sai.
- `v.empty()` kiểm tra danh sách có phần tử hay không. Không gọi `front()` hoặc `back()` khi vector rỗng.
- Duyệt bằng range-based `for` giúp tránh tự quản lý chỉ số. Dùng `const auto&` khi phần tử lớn và chỉ cần đọc; dùng `auto&` khi cần sửa phần tử.

```cpp
for (const auto& score : scores) {
    std::cout << score << '\n';
}
```

`std::vector<bool>` là trường hợp đặc biệt của thư viện chuẩn: nó có thể đóng gói bit và không trả về tham chiếu `bool` thông thường. Nếu cần tham chiếu hoặc địa chỉ của từng phần tử boolean, hãy cân nhắc `std::vector<char>` hoặc một kiểu lưu trữ khác.

## Khi thêm và xóa phần tử

`push_back(value)` thêm một phần tử đã có; `emplace_back(args...)` dựng phần tử tại vị trí cuối từ các đối số constructor. Với kiểu đơn giản như `int`, `push_back` thường rõ ràng và đủ dùng. `insert` thêm vào vị trí bất kỳ, còn `erase` xóa phần tử hoặc một đoạn; các thao tác ở giữa dãy phải dịch chuyển phần tử phía sau nên thường tốn O(n).

Vector giữ các phần tử liên tiếp. Khi không còn đủ `capacity()`, vector có thể cấp vùng nhớ mới và chuyển các phần tử sang đó. Khi việc này xảy ra, mọi pointer, reference và iterator đang trỏ vào phần tử cũ đều mất hiệu lực. Ngay cả khi không cấp lại vùng nhớ, chèn hoặc xóa ở giữa cũng làm mất hiệu lực các iterator và reference từ vị trí thay đổi trở về sau. Vì vậy, đừng giữ reference tới một phần tử rồi tiếp tục thêm/xóa mà không xem quy tắc invalidation. Xem thêm [iterator invalidation](/cpp/stl/iterators-invalidation).

`reserve` hữu ích khi đã ước lượng được số phần tử để giảm số lần cấp lại bộ nhớ, nhưng không nên phụ thuộc vào mức tăng `capacity()` cụ thể vì chính sách tăng là chi tiết triển khai. Gọi `reserve` cũng có thể làm mọi iterator và reference mất hiệu lực nếu cần cấp vùng nhớ mới.

## Mô hình hóa dữ liệu bằng `struct` và `enum class`

```cpp
#include <string>

enum class Status {
    waiting,
    active,
    done
};

struct Task {
    int id{};
    std::string title;
    Status status{Status::waiting};
};
```

`struct` gom các giá trị có quan hệ thành một kiểu có ý nghĩa. Trong C++, `struct` vẫn có thể có constructor, hàm thành viên, kế thừa và kiểm soát truy cập; điểm khác mặc định so với `class` là thành viên của `struct` là `public`, còn của `class` là `private`. Dùng `struct` thường hợp với bản ghi dữ liệu công khai, còn `class` thường hợp khi kiểu cần bảo vệ invariant.

Các dấu `{}` khởi tạo thành viên mặc định để `Task task{};` không để `id` ở trạng thái chưa xác định. Khi dữ liệu cần giữ một invariant phức tạp, không nên để caller tùy ý sửa mọi trường; đóng gói dữ liệu trong class và cung cấp thao tác có kiểm tra.

`enum class` đặt tên trạng thái trong một phạm vi riêng, vì vậy phải viết `Status::active`. Nó không tự chuyển thành số nguyên như `enum` không scoped, giúp tránh nhầm lẫn giữa các loại trạng thái. Dùng `switch` để xử lý các trạng thái và quyết định rõ cách xử lý giá trị không mong đợi nếu dữ liệu đến từ file, mạng hoặc phép ép kiểu. Nếu giá trị enum được lưu thành định dạng lâu dài, hãy định nghĩa quy ước số và khả năng tương thích thay vì dựa vào thứ tự khai báo.

## Chọn cấu trúc phù hợp

Vector phù hợp khi cần danh sách có thứ tự, truy cập theo chỉ số O(1), duyệt tuần tự hiệu quả và thêm phần tử ở cuối thường xuyên. Nếu số phần tử cố định tại compile time, cân nhắc `std::array`; nếu cần tìm theo khóa, tập hợp duy nhất hoặc hàng đợi, xem [các container STL](/cpp/stl/sequence-containers) và [container kết hợp](/cpp/stl/associative-containers).

## Lỗi thường gặp

- Đọc `v[0]`, `front()` hoặc `back()` khi vector rỗng.
- Nhầm `capacity()` với số phần tử thực tế `size()`.
- Giữ pointer, reference hoặc iterator qua thao tác có thể cấp lại vùng nhớ hoặc dịch chuyển phần tử.
- Dùng `reserve(n)` với kỳ vọng nó tạo ra `n` phần tử.
- Dùng enum không scoped khiến tên trạng thái rò ra scope ngoài hoặc dễ bị chuyển nhầm thành số.

## Đọc tiếp

Xem [sequence containers](/cpp/stl/sequence-containers), [container kết hợp](/cpp/stl/associative-containers), rồi học [class và encapsulation](/cpp/trung-cap/classes-constructors).
