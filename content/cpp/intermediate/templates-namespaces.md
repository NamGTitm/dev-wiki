---
title: Templates và namespace
description: Viết hàm generic, tránh trùng tên và tổ chức khai báo trong header C++.
slug: /cpp/trung-cap/templates-namespaces
category: intermediate
categoryLabel: C++ trung cấp
order: 21060
difficulty: intermediate
keywords: [C++ templates, function template, namespace, generic programming, header]
updated: 2026-10-20
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/trung-cap/overloading-default-arguments", "/cpp/trung-cap/inheritance-polymorphism", "/cpp/ky-thuat/header-source-modules"]
---

Template cho phép viết code làm việc với nhiều kiểu, miễn kiểu đó đáp ứng các thao tác mà code yêu cầu. Namespace nhóm tên để giảm xung đột giữa thư viện và module.

## Function template

```cpp
#include <iostream>

namespace math_tools {
template <typename T>
T add(T left, T right) {
    return left + right;
}
}

int main() {
    std::cout << math_tools::add(2, 3) << '\n';
    std::cout << math_tools::add(1.5, 2.5) << '\n';
}
```

Compiler suy ra `T` từ đối số. Hai đối số ở đây cần cùng kiểu; `add(2, 1.5)` không suy ra một `T` duy nhất nếu không chỉ rõ hoặc thiết kế overload phù hợp. C++20 concepts có thể diễn tả yêu cầu kiểu tường minh.

## Namespace và tổ chức mã

`math_tools::add` chỉ rõ hàm thuộc namespace. Trong header công khai, giữ tên đủ rõ và tránh `using namespace std;` ở global scope vì nó có thể gây đụng tên cho mọi file include header đó.

Template thường cần định nghĩa nhìn thấy tại nơi instantiate, vì vậy thường đặt định nghĩa trong header. Với hàm không template, header có thể khai báo còn `.cpp` cung cấp định nghĩa. Xem [translation units](/cpp/ky-thuat/header-source-modules).

## Lỗi thường gặp

- Khai báo template trong `.cpp` rồi không cung cấp định nghĩa cho caller khác translation unit.
- Dùng `using namespace` trong public header.
- Template yêu cầu nhiều operation ngầm mà không ghi rõ trong thiết kế.
- Cho rằng template luôn nhanh hơn hoặc dễ debug hơn đa hình runtime.

## Tự luyện

Viết template `maximum` cho hai giá trị cùng kiểu có thể so sánh. Thử `int`, `std::string` và kiểu không có `operator<` để quan sát yêu cầu của template.

## Đọc tiếp

Xem [STL dựa trên templates](/cpp/stl/stl-la-gi) và [cách chia header/source](/cpp/ky-thuat/header-source-modules).
