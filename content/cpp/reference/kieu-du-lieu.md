---
title: Kiểu dữ liệu và giới hạn
description: Tra kiểu số C++, signedness, numeric_limits và các lưu ý về overflow.
slug: /cpp/tra-cuu/kieu-du-lieu
category: reference
categoryLabel: Tra cứu và xử lý lỗi
order: 25010
difficulty: beginner
keywords: [C++ data types, numeric_limits, int, long long, size_t, overflow]
updated: 2026-10-20
collection: cpp
collectionLabel: C++
collectionDescription: Bảng tra cú pháp, container, thuật toán, lỗi thường gặp và best practices C++.
related: ["/cpp/bat-dau/bien-kieu-du-lieu", "/cpp/thuat-toan/number-theory", "/cpp/ky-thuat/ub-memory-safety"]
---

Độ rộng chính xác của một số kiểu built-in phụ thuộc implementation. Dùng `<limits>` để hỏi compiler hiện tại thay vì ghi cứng một miền giả định.

## Kiểu thường gặp

```text
bool           giá trị true/false
char           code unit hẹp; encoding phụ thuộc hệ thống
short/int      số nguyên có dấu, độ rộng implementation-dependent
long/long long số nguyên có dấu, giới hạn tối thiểu do standard quy định
float/double   số dấu phẩy động gần đúng
std::size_t    số không dấu thường dùng cho kích thước
std::string    chuỗi byte có quản lý bộ nhớ
```

```cpp
#include <iostream>
#include <limits>

int main() {
    std::cout << std::numeric_limits<int>::min() << ' '
              << std::numeric_limits<int>::max() << '\n';
}
```

`<cstdint>` cung cấp `std::int32_t`/`std::uint64_t` nếu implementation có kiểu đúng độ rộng. `long` không nhất thiết cùng số bit trên Windows và Unix.

## Signed và unsigned

Signed overflow là UB. Unsigned wrap theo modulo 2^N, có thể gây logic sai. Trộn signed/unsigned làm phép so sánh hoặc trừ bất ngờ; kiểm tra miền trước khi cast và trước khi tính.

## Chọn kiểu

- Dùng `int` cho giá trị đếm nhỏ khi constraint đảm bảo vừa.
- Dùng `long long` cho tổng/tích lớn hơn miền `int`.
- Dùng `std::size_t` cho size/index khi phù hợp API; tránh trừ khi có thể nhỏ hơn 0.
- Dùng integer cho tiền theo đơn vị nhỏ nhất hoặc decimal type phù hợp domain, không dùng binary `double` để so sánh tiền chính xác.

## Lỗi thường gặp

- Cho rằng `sizeof(int) == 4` trên mọi implementation.
- Tính `a * b` trong `int` rồi mới gán vào `long long`; phép tràn xảy ra trước assignment.
- Ép số âm thành unsigned rồi thấy giá trị rất lớn.
- Dùng `numeric_limits<T>::max()` làm sentinel rồi cộng thêm có thể tràn.

## Kiểm tra nhanh

Tính giới hạn lớn nhất cho tổng/tích từ constraint trước khi viết kiểu. Tách cast trước phép tính khi thật sự cần kiểu rộng hơn.

## Đọc tiếp

Xem [biến và kiểu](/cpp/bat-dau/bien-kieu-du-lieu), [GCD/LCM](/cpp/thuat-toan/number-theory) và [undefined behavior](/cpp/ky-thuat/ub-memory-safety).
