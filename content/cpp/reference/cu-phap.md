---
title: C++ syntax cheatsheet
description: Tra nhanh cú pháp khai báo, điều khiển, hàm, class, STL và lệnh biên dịch C++17.
slug: /cpp/tra-cuu/cu-phap
category: reference
categoryLabel: Tra cứu và xử lý lỗi
order: 25000
difficulty: beginner
keywords: [C++ syntax, cheatsheet, declaration, control flow, compile command]
updated: 2026-10-20
collection: cpp
collectionLabel: C++
collectionDescription: Bảng tra cú pháp, container, thuật toán, lỗi thường gặp và best practices C++.
related: ["/cpp/bat-dau/chuong-trinh-dau-tien", "/cpp/tra-cuu/kieu-du-lieu", "/cpp/tra-cuu/stl-containers"]
---

Dùng trang này để nhớ nhanh hình thức cú pháp. Đọc bài liên kết để hiểu semantics, lifetime và trường hợp biên.

## Cấu trúc chương trình

```cpp
#include <iostream>

int main() {
    std::cout << "Hello\n";
    return 0;
}
```

## Cú pháp hay dùng

```text
Khai báo:           int count{0};
Hằng:               const int limit{100};
Điều kiện:          if (condition) { ... } else { ... }
Switch:             switch (value) { case 1: ...; break; default: ...; }
For:                for (int i = 0; i < n; ++i) { ... }
While:              while (condition) { ... }
Range-for:          for (const auto& item : items) { ... }
Hàm:                Result function(Argument argument) { return result; }
Reference:          void update(int& value);
Pointer nullable:   int* value{nullptr};
Class member:       object.method();
Namespace:          std::vector<int>
Lambda:             [](int value) { return value > 0; }
```

`...` là ký hiệu minh họa, không phải code có thể biên dịch. Kiểu trả về `void` nghĩa là không trả giá trị.

## Lệnh compiler

```sh
g++ -std=c++17 -Wall -Wextra -Wpedantic main.cpp -o app
clang++ -std=c++17 -Wall -Wextra -Wpedantic main.cpp -o app
```

MSVC: `cl /std:c++17 /EHsc /W4 main.cpp`. C++17 là baseline của bộ tài liệu.

## Lỗi nhanh

- Thiếu `;` sau statement hoặc class definition.
- Thiếu header trực tiếp, ví dụ `<vector>` khi dùng `std::vector`.
- Dùng `=` khi cần `==`.
- Dùng biến/iterator trước khi khởi tạo hoặc sau khi hết lifetime.

## Kiểm tra nhanh

Đọc một dòng cú pháp ở trên và tìm bài chi tiết trước khi dựa vào ví dụ trong API production.

## Đọc tiếp

Tra [kiểu dữ liệu](/cpp/tra-cuu/kieu-du-lieu), [container](/cpp/tra-cuu/stl-containers) hoặc [lỗi compiler/runtime](/cpp/tra-cuu/debugging-errors).
