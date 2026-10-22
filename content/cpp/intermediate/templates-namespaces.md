---
title: Templates và namespace
description: Viết hàm generic có yêu cầu kiểu rõ ràng và tổ chức tên trong header C++.
slug: /cpp/trung-cap/templates-namespaces
category: intermediate
categoryLabel: C++ trung cấp
order: 21060
difficulty: intermediate
keywords: [C++ templates, function template, namespace, generic programming, header]
updated: 2026-10-22
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/trung-cap/overloading-default-arguments", "/cpp/trung-cap/inheritance-polymorphism", "/cpp/ky-thuat/header-source-modules"]
---

Function template mô tả một họ hàm được tạo cho các kiểu khác nhau. Kiểu tham số có thể được suy ra từ lời gọi, còn compiler kiểm tra các phép toán mà thân hàm sử dụng khi template được instantiate. Namespace nhóm tên liên quan và hạn chế xung đột giữa thư viện, module hoặc nhóm phát triển.

## Function template

```cpp
#include <iostream>
#include <string>

namespace math_tools {
template <typename T>
T maximum(T left, T right) {
    return left < right ? right : left;
}
}

int main() {
    std::cout << math_tools::maximum(2, 3) << '\n';
    std::cout << math_tools::maximum(1.5, 2.5) << '\n';
    std::cout << math_tools::maximum(std::string{"alpha"},
                                     std::string{"beta"}) << '\n';
}
```

Compiler suy ra `T` từ đối số. Hàm này yêu cầu `T` có thể truyền/đưa về kết quả theo cách dùng ở đây và hỗ trợ phép so sánh `<`. Hai đối số `int` và `double` không suy ra được cùng một `T`, vì vậy `maximum(2, 2.5)` không hợp lệ với template này. Có thể chỉ rõ `maximum<double>(2, 2.5)` nếu muốn cả hai đối số được chuyển sang `double`, hoặc thiết kế một hàm dùng kiểu chung phù hợp với yêu cầu của API.

Template không tự ghi ra một danh sách kiểu cụ thể. Compiler tạo specialization phù hợp khi gặp lời gọi cần nó; lỗi trong thân template có thể chỉ xuất hiện lúc kiểu đó được dùng. Do vậy, hãy ghi nhận các operation mà kiểu đối số phải hỗ trợ, dù chuẩn C++17 chưa có cú pháp concepts để diễn đạt chúng thành ràng buộc ngay tại khai báo.

## Namespace và tên đầy đủ

`math_tools::maximum` ghi rõ hàm thuộc namespace nào. Scope này giảm khả năng đụng tên và giúp API thể hiện nơi khai báo. Từ C++17 có thể viết namespace lồng nhau gọn hơn:

```cpp
namespace app::geometry {
struct Point {
    double x{};
    double y{};
};
}
```

Trong function hoặc một scope nhỏ, `using app::geometry::Point;` có thể giúp tránh lặp tên dài. Tránh `using namespace std;` trong header công khai hoặc namespace scope vì mọi file include header có thể nhận thêm các tên gây xung đột. Header nên include các khai báo mà nó trực tiếp cần thay vì trông chờ caller include hộ.

Một namespace có thể mở rộng ở nhiều khai báo, thường qua nhiều header. Đặt tên theo domain của thư viện; không đặt hàm của mình vào `namespace std`, ngoại trừ những customization được chuẩn cho phép cụ thể.

## Template trong header và translation unit

Thông thường, nơi instantiate template phải nhìn thấy định nghĩa của template, nên cả khai báo lẫn định nghĩa được đặt trong header. Nhiều translation unit có thể include cùng định nghĩa template nếu tuân thủ quy tắc ODR. Ngược lại, nếu định nghĩa một hàm thông thường không phải `inline` trong header rồi include header đó ở nhiều translation unit, chương trình có thể gặp multiple definition khi link. Xem [header, source và modules](/cpp/ky-thuat/header-source-modules).

Có kỹ thuật explicit instantiation để định nghĩa template trong source file và chỉ phát hành một số specialization đã chọn, nhưng nó cần khai báo rõ các kiểu được hỗ trợ. Với template tổng quát dùng ở nhiều kiểu, đặt định nghĩa trong header là cách phổ biến.

## Templates và đa hình runtime

Template tạo code theo kiểu cụ thể tại compile time; virtual function dispatch qua interface base theo kiểu object tại runtime. Template hợp khi thao tác cần thiết được biết lúc biên dịch và muốn API hoạt động trên các kiểu đáp ứng những thao tác đó. Interface ảo hợp khi cần thay thế implementation lúc chạy hoặc tập kiểu cụ thể được tập hợp động. Mỗi cách có tradeoff về liên kết, lỗi biên dịch, khả năng mở rộng và cách sở hữu object; xem [kế thừa và đa hình](/cpp/trung-cap/inheritance-polymorphism).

Template không mặc nhiên nhanh hơn hoặc dễ debug hơn. Việc instantiate nhiều kiểu có thể làm tăng thời gian biên dịch và kích thước chương trình; lỗi type checking có thể dài do phát sinh qua nhiều tầng template.

## Concepts từ C++20

C++20 thêm concepts để diễn đạt một số yêu cầu kiểu ngay trên template, giúp giao diện và chẩn đoán lỗi rõ hơn. Ví dụ dưới đây **không thuộc baseline C++17**:

```cpp
#include <concepts>

template <std::totally_ordered T>
    requires std::copy_constructible<T>
T maximum(T left, T right) {
    return left < right ? right : left;
}
```

Với tài liệu và code C++17, mô tả yêu cầu bằng API, overload hoặc trait phù hợp; không dùng cú pháp concepts nếu cấu hình biên dịch chưa nâng lên C++20.

## Lỗi thường gặp

- Đặt định nghĩa template trong `.cpp` nhưng không cung cấp specialization cho translation unit của caller.
- Dùng `using namespace` trong public header và làm lộ tên vào caller.
- Không nhận ra các operation ẩn mà thân template yêu cầu ở kiểu đối số.
- Nghĩ rằng `T` luôn được suy ra thành kiểu chung của các đối số.
- Dùng template chỉ vì muốn “generic” dù các implementation thật sự có hành vi khác nhau.
- Cho rằng template luôn nhanh hơn hoặc luôn cho thông báo lỗi dễ hiểu hơn đa hình runtime.

## Đọc tiếp

Xem [STL dựa trên templates](/cpp/stl/stl-la-gi), cách [chia header/source](/cpp/ky-thuat/header-source-modules), rồi so sánh với [đa hình runtime](/cpp/trung-cap/inheritance-polymorphism).
