---
title: Biến, kiểu dữ liệu và quá trình biên dịch
description: Khai báo biến, chọn kiểu an toàn và hiểu header, translation unit, compile, link.
slug: /cpp/bat-dau/bien-kieu-du-lieu
category: fundamentals
categoryLabel: C++ căn bản
order: 20040
difficulty: beginner
keywords: [biến C++, const, kiểu dữ liệu, integer overflow, translation unit, linker]
updated: 2026-10-20
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/bat-dau/chuong-trinh-dau-tien", "/cpp/bat-dau/toan-tu", "/cpp/ky-thuat/header-source-modules", "/cpp/tra-cuu/kieu-du-lieu"]
---

Biến đặt tên cho một object có kiểu và thời gian sống. Chọn kiểu đúng giúp compiler bắt lỗi và giúp code diễn đạt miền giá trị.

## Khai báo và khởi tạo

```cpp
#include <iostream>
#include <string>

int main() {
    int age{16};
    const double pi{3.14159};
    std::string name{"An"};
    auto score{95};
    std::cout << age << ' ' << pi << ' ' << name << ' ' << score << '\n';
}
```

Ưu tiên khởi tạo ngay khi khai báo. Dấu `{}` giúp phát hiện nhiều phép chuyển đổi thu hẹp không an toàn. `const` cấm sửa object qua tên đó; `auto` suy ra kiểu từ biểu thức khởi tạo nhưng biến vẫn có kiểu tĩnh.

## Một số kiểu cơ bản

- `bool`: `true` hoặc `false`.
- `char`: đơn vị ký tự hẹp; mã hóa ký tự phụ thuộc encoding. Không mặc định một `char` chứa mọi ký tự Unicode.
- `int`, `long`, `long long`: số nguyên có dấu với độ rộng phụ thuộc implementation trong một số trường hợp.
- `float`, `double`: số dấu phẩy động gần đúng, không phù hợp để lưu tiền chính xác.
- `std::string`: chuỗi ký tự tiện dụng trong C++.
- `std::size_t`: kiểu không dấu thường dùng cho kích thước và chỉ số container.

Nếu cần độ rộng bit cố định, dùng `std::int32_t` hoặc `std::uint64_t` từ `<cstdint>` khi implementation có kiểu tương ứng.

## Source đến executable

Mỗi file `.cpp` được xử lý thành một **translation unit** sau khi tiền xử lý `#include`. Compiler tạo object file; linker kết hợp object files và libraries. Header thường chứa khai báo, còn định nghĩa được đặt trong `.cpp`; vi phạm quy tắc định nghĩa có thể gây lỗi linker. Chi tiết nằm ở [header và translation units](/cpp/ky-thuat/header-source-modules).

## Lỗi thường gặp

- **Dùng biến chưa khởi tạo**: giá trị không hợp lệ hoặc hành vi không xác định; khởi tạo biến trước khi đọc.
- **Tràn số nguyên có dấu**: nếu phép tính vượt miền biểu diễn, hành vi là undefined behavior; chọn kiểu đủ lớn và kiểm tra trước phép tính.
- **So sánh số thực bằng `==`**: sai số biểu diễn có thể làm kết quả bất ngờ; so sánh theo tolerance khi bài toán cho phép.

## Tự luyện

Khai báo số lượng sản phẩm, giá và tổng tiền. Chọn kiểu cho từng biến; nếu tổng có thể lớn, giải thích vì sao `int` có thể chưa đủ.

## Đọc tiếp

Học [toán tử và biểu thức](/cpp/bat-dau/toan-tu), sau đó xem [bảng kiểu dữ liệu và giới hạn](/cpp/tra-cuu/kieu-du-lieu).
