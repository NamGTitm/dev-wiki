---
title: Clean Code trong C++
description: Viết code có tên gọi rõ, scope nhỏ, ownership dễ hiểu và API thể hiện hợp đồng.
slug: /cpp/ky-thuat/clean-code
category: engineering
categoryLabel: Kỹ nghệ phần mềm C++
order: 24000
difficulty: intermediate
keywords: [clean code C++, naming, const correctness, ownership, API design]
updated: 2026-10-20
collection: cpp
collectionLabel: C++
collectionDescription: Cách xây dựng, kiểm tra, debug và bảo vệ ứng dụng C++ có thể bảo trì.
related: ["/cpp/ky-thuat/header-source-modules", "/cpp/trung-cap/classes-constructors", "/cpp/tra-cuu/best-practices"]
---

Clean code làm cho ý định, hợp đồng và quyền sở hữu dữ liệu dễ đọc. Mục tiêu là giảm lỗi khi sửa và review, không phải tối ưu số dòng.

## Thói quen hữu ích

- Chọn tên nói rõ miền dữ liệu: `user_count`, `deadline`, `is_valid`.
- Giữ function tập trung vào một trách nhiệm; tách nhánh phức tạp thành hàm có tên.
- Dùng `const` khi object không cần thay đổi; dùng kiểu trả về/tham số để thể hiện mutability.
- Ưu tiên STL, RAII và Rule of Zero; làm rõ owner và object được mượn.
- Xác thực input ở boundary, giữ invariant ở class/domain layer.
- Chọn kiểu và đơn vị rõ; `timeout_ms` dễ hiểu hơn `timeout` nếu đơn vị có thể nhầm.
- Không dùng macro cho hằng số hoặc function thông thường; macro không có scope/type và có thể đánh giá đối số bất ngờ.

## Ví dụ: API rõ hơn

```cpp
#include <string>

bool has_name(const std::string& name) {
    return !name.empty();
}

int main() {
    const std::string user_name{"An"};
    return has_name(user_name) ? 0 : 1;
}
```

API nhận `const&` vì chỉ đọc, tên diễn đạt predicate và caller biết kết quả là bool.

## Lỗi thường gặp

- Hàm dài làm input validation, I/O, tính toán và persistence cùng lúc.
- Dùng global mutable state hoặc `using namespace std;` trong header.
- Comment lặp lại code thay vì giải thích invariant hoặc quyết định khó thấy.
- Tối ưu vi mô làm mất rõ ràng trước khi có profile.

## Tự luyện

Chọn một hàm dài trong project học tập, chia phần parse/validate và phần tính toán. Thử viết test cho phần tính mà không cần I/O.

## Đọc tiếp

Tổ chức file qua [header và translation unit](/cpp/ky-thuat/header-source-modules); xem [best practices tra cứu nhanh](/cpp/tra-cuu/best-practices).
