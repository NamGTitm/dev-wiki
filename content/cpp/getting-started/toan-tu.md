---
title: Toán tử và biểu thức
description: Dùng toán tử số học, so sánh, logic, gán và hiểu thứ tự đánh giá trong C++.
slug: /cpp/bat-dau/toan-tu
category: fundamentals
categoryLabel: C++ căn bản
order: 20050
difficulty: beginner
keywords: [toán tử C++, arithmetic, comparison, logical, precedence, modulo]
updated: 2026-10-20
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/bat-dau/bien-kieu-du-lieu", "/cpp/bat-dau/nhap-xuat-dieu-kien-vong-lap", "/cpp/tra-cuu/cu-phap"]
---

Biểu thức kết hợp giá trị và toán tử để tạo ra một giá trị mới. Hiểu kiểu toán hạng và thứ tự đánh giá giúp tránh lỗi khó nhìn thấy.

## Các nhóm thường dùng

- Số học: `+`, `-`, `*`, `/`, `%` với số nguyên.
- So sánh: `==`, `!=`, `<`, `<=`, `>`, `>=` trả về `bool`.
- Logic: `&&`, `||`, `!`; `&&` và `||` short-circuit, nghĩa là vế phải có thể không được tính.
- Gán: `=`, `+=`, `-=`, `*=`, `/=`.
- Tăng giảm: `++i`, `i++`, `--i`, `i--`.

```cpp
#include <iostream>

int main() {
    const int total{17};
    const int people{5};
    const int quotient{total / people};
    const int remainder{total % people};
    const bool valid{people > 0 && total >= people};
    std::cout << quotient << ' ' << remainder << ' ' << valid << '\n';
}
```

Khi cả hai toán hạng là số nguyên, `/` bỏ phần lẻ theo hướng về 0. Dùng `17.0 / 5` nếu cần kết quả dấu phẩy động.

## Ưu tiên và ngoặc

`*` có ưu tiên cao hơn `+`, còn toán tử so sánh thường được đánh giá trước `&&`. Đừng bắt người đọc phải nhớ cả bảng ưu tiên cho biểu thức phức tạp:

```cpp
#include <iostream>

int main() {
    const int age{20};
    const bool has_ticket{true};
    const bool is_guest{false};
    const bool can_enter{(age >= 18) && (has_ticket || is_guest)};
    std::cout << can_enter << '\n';
}
```

Thứ tự ưu tiên không đồng nghĩa với thứ tự đánh giá mọi toán hạng. Tránh biểu thức thay đổi cùng một biến nhiều lần như `i++ + i++`; kết quả có thể không xác định hoặc không được thứ tự hóa như mong muốn.

## Lỗi thường gặp

- Viết `=` thay vì `==` khi so sánh.
- Chia nguyên nhưng mong nhận số thực.
- Chia cho 0 hoặc để số nguyên có dấu tràn miền.
- Ghép nhiều phép tăng giảm vào một biểu thức.

## Tự luyện

Viết biểu thức kiểm tra một số nằm trong đoạn đóng `[low, high]`. Gợi ý: dùng hai so sánh và `&&`.

## Đọc tiếp

Áp dụng biểu thức vào [nhập xuất, điều kiện và vòng lặp](/cpp/bat-dau/nhap-xuat-dieu-kien-vong-lap).
