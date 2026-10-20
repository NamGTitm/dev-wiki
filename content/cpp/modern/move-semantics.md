---
title: Move semantics và rvalue references
description: Hiểu lvalue, rvalue, std::move và cách type chuyển resource mà không copy không cần thiết.
slug: /cpp/stl/move-semantics
category: modern
categoryLabel: STL và C++ hiện đại
order: 22080
difficulty: advanced
keywords: [move semantics, rvalue reference, std::move, moved-from, perfect forwarding]
updated: 2026-10-20
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/stl/lambda-auto-range", "/cpp/stl/raii-smart-pointers", "/cpp/trung-cap/stack-heap-lifetime"]
---

Move semantics cho phép type chuyển quyền sở hữu resource từ object sắp hết giá trị thay vì sao chép resource đó. Nó hữu ích trong container và API nhận object lớn; compiler cũng tự tối ưu nhiều trường hợp.

## Lvalue, rvalue và `std::move`

Lvalue là biểu thức có identity ổn định để tham chiếu; rvalue thường là giá trị tạm. `T&&` là rvalue reference trong ngữ cảnh thường. `std::move(x)` không tự chuyển dữ liệu: nó cast `x` sang rvalue để overload move constructor/assignment được chọn.

```cpp
#include <iostream>
#include <string>
#include <utility>

int main() {
    std::string source{"large text"};
    std::string destination{std::move(source)};
    std::cout << destination.size() << '\n';
}
```

Sau khi move, `source` vẫn hợp lệ nhưng trạng thái thường không xác định theo hợp đồng type; chỉ hủy nó hoặc gán giá trị mới, trừ khi API ghi rõ có thể làm gì tiếp.

## Quy tắc dùng

- Không gọi `std::move` lên object sau đó còn cần giá trị cũ.
- Trả local object theo giá trị; NRVO thường loại bỏ copy. Thêm `std::move` vào `return local;` có thể cản trở NRVO.
- Move constructor của type tùy chỉnh cần giữ object đích hợp lệ và xử lý nguồn đúng.
- Perfect forwarding dùng forwarding reference và `std::forward`; chỉ dùng khi API generic thực sự cần bảo toàn value category.

## Lỗi thường gặp

- Nghĩ `std::move` là thao tác giải phóng hoặc đảm bảo không copy.
- Dùng moved-from string/vector như còn nguyên nội dung.
- Move từ `const T`; overload move thường cần `T&&` không-const nên có thể rơi về copy.
- Tạo move constructor riêng mà quên nghĩ về copy/move assignment và destructor.

## Tự luyện

Truyền `std::string` vào hàm nhận theo `const&`, theo giá trị và theo `&&`. Viết hợp đồng rõ cho từng hàm; chọn cách đơn giản nhất trước khi tối ưu.

## Đọc tiếp

Xem [RAII và smart pointers](/cpp/stl/raii-smart-pointers) để hiểu ownership resource.
