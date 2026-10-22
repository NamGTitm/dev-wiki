---
title: Move semantics và rvalue references
description: Hiểu lvalue, rvalue, std::move và cách type chuyển resource mà không copy không cần thiết.
slug: /cpp/stl/move-semantics
category: modern
categoryLabel: STL và C++ hiện đại
order: 22080
difficulty: advanced
keywords: [move semantics, rvalue reference, std::move, moved-from, perfect forwarding]
updated: 2026-10-22
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/stl/lambda-auto-range", "/cpp/stl/raii-smart-pointers", "/cpp/trung-cap/stack-heap-lifetime"]
---

Move semantics cho phép một kiểu chuyển hoặc tái sử dụng resource thay vì sao chép resource đó. Cơ chế này hữu ích với object sở hữu bộ nhớ, file handle hoặc tài nguyên khác, đặc biệt khi chuyển object giữa các API và container.

## Value category và rvalue reference

Cần tách **kiểu của biến** khỏi **value category của biểu thức**:

- Một biểu thức **lvalue** có identity ổn định; ví dụ tên biến đã khai báo.
- Một biểu thức **rvalue** thường biểu diễn giá trị tạm. Trong nhóm này có prvalue và xvalue.
- `T&&` là rvalue reference trong ngữ cảnh thông thường; nó có thể bind với rvalue.
- Dù biến được khai báo kiểu `T&&`, biểu thức dùng tên biến đó vẫn là lvalue. Muốn chuyển tiếp value category, cần `std::move` hoặc `std::forward` đúng ngữ cảnh.

## std::move chỉ cast

`std::move(x)` không tự di chuyển dữ liệu. Nó là phép cast cho phép overload nhận rvalue được chọn. Nếu kiểu không có move constructor/assignment phù hợp, thao tác có thể vẫn copy.

```cpp
#include <iostream>
#include <memory>
#include <utility>

int main() {
    auto source = std::make_unique<int>(42);
    auto destination = std::move(source);

    std::cout << *destination << ' '
              << std::boolalpha << !source << '\n';
}
```

Kết quả là `42 true`. Với `std::unique_ptr`, move chuyển quyền sở hữu và làm pointer nguồn rỗng. Không nên suy rộng trạng thái rỗng này cho mọi kiểu sau move.

## Trạng thái moved-from

Object sau move vẫn phải tuân theo hợp đồng của kiểu đó. Các object thư viện chuẩn thường ở trạng thái **hợp lệ nhưng không xác định** (*valid but unspecified*), trừ nơi tiêu chuẩn quy định cụ thể hơn. Có thể hủy chúng và gán giá trị mới; chỉ gọi thêm thao tác khi hợp đồng cho phép.

Kiểu do dự án định nghĩa phải có hợp đồng tương tự rõ ràng cho move constructor và move assignment. Move không phải cách “xóa object”; object nguồn vẫn còn lifetime và destructor vẫn chạy.

## Khi nào dùng move?

- Chuyển ownership từ một owner đơn nhất sang owner khác, ví dụ chuyển `std::unique_ptr`.
- Truyền object lớn theo giá trị khi hàm chủ ý nhận ownership hoặc sẽ lưu object đó.
- Chuyển object vào container hoặc giữa các phần tử khi không cần giữ nội dung nguồn.
- Viết kiểu quản lý resource ở mức thấp, sau khi đã xác định copy/move/destructor cần có.

Hàm chỉ mượn dữ liệu thường nhận `const T&` khi đọc hoặc `T&` khi cần sửa. Hàm muốn sở hữu một bản giá trị có thể nhận `T` theo giá trị và move vào nơi lưu. Chỉ thêm overload `T&&` khi hợp đồng API cần phân biệt rõ trường hợp chuyển ownership.

## Quy tắc dùng an toàn

- Không gọi `std::move` lên object mà phần sau còn cần nội dung cũ.
- Trả object local trực tiếp bằng `return local;`. NRVO hoặc move phù hợp thường được áp dụng; thêm `std::move` có thể cản trở copy elision.
- Move từ `const T` thường không chọn move constructor nhận `T&&`, vì const không thể bind vào reference không-const; kết quả có thể là copy.
- Move constructor của kiểu tự định nghĩa phải để object đích sở hữu resource hợp lệ và không giải phóng cùng resource hai lần.
- Đừng giả định move luôn O(1) hoặc luôn nhanh hơn copy; điều đó phụ thuộc vào kiểu.

## Perfect forwarding

`std::forward<T>(value)` dùng trong template với forwarding reference để giữ nguyên value category của đối số khi chuyển tiếp nó. Đây là kỹ thuật cho API generic như factory hoặc wrapper. Nó khác `std::move`: `move` luôn cast sang rvalue, còn `forward` giữ lvalue/rvalue ban đầu theo kiểu template đã suy luận.

Không dùng forwarding reference chỉ vì thấy cú pháp `T&&`. Tham số `T&&` là forwarding reference khi `T` được suy luận trong ngữ cảnh phù hợp; `std::vector<T>&&` hay kiểu đã xác định không phải forwarding reference.

## Lỗi thường gặp

- Nghĩ `std::move` tự gọi move hoặc bảo đảm không copy.
- Dùng moved-from string/vector như thể nội dung cũ vẫn còn nguyên.
- Move từ object const rồi thắc mắc vì sao bị copy.
- Tự định nghĩa một special member function mà không xem xét quy tắc sinh copy/move còn lại.
- Dùng `std::move` trong câu lệnh return cho mọi biến local.

## Đọc tiếp

Xem [RAII và smart pointers](/cpp/stl/raii-smart-pointers) để hiểu ownership resource, và [vòng đời object](/cpp/trung-cap/stack-heap-lifetime) để theo dõi lifetime.
