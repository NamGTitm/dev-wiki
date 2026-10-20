---
title: Number Theory: GCD, LCM và số nguyên tố
description: Tính ước chung lớn nhất, bội chung nhỏ nhất và sàng Eratosthenes.
slug: /cpp/thuat-toan/number-theory
category: algorithms
categoryLabel: Thuật toán và Competitive Programming
order: 23080
difficulty: intermediate
keywords: [number theory, gcd, lcm, std::gcd, prime, sieve of Eratosthenes]
updated: 2026-10-20
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/thuat-toan/bit-manipulation", "/cpp/thuat-toan/tim-kiem-sap-xep", "/cpp/tra-cuu/kieu-du-lieu"]
---

Number theory xuất hiện trong bài chia hết, phân số, số nguyên tố và tối ưu phép tính. Thư viện chuẩn C++17 có `std::gcd` và `std::lcm` trong `<numeric>`.

## GCD và LCM

Euclid dựa trên `gcd(a, b) = gcd(b, a % b)`, lặp đến khi `b = 0`. Thời gian O(log min(a,b)). `std::lcm(a,b)` có thể tràn nếu kết quả không biểu diễn được; cần kiểm tra giới hạn trước.

```cpp
#include <iostream>
#include <numeric>

int main() {
    const long long a{84};
    const long long b{30};
    const long long divisor{std::gcd(a, b)};
    const long long multiple{(a / divisor) * b};
    std::cout << divisor << ' ' << multiple << '\n';
}
```

Phép tính `(a / gcd) * b` giảm nguy cơ tràn so với `a * b / gcd` nhưng không loại bỏ tràn; với input lớn cần kiểm tra miền. Ví dụ giả định số dương nhỏ.

## Sàng Eratosthenes

Để tìm mọi số nguyên tố không vượt n, đánh dấu bội từ `p*p` khi p chưa bị đánh dấu. Thời gian O(n log log n), bộ nhớ O(n). Dùng kiểu đủ rộng cho `p*p` hoặc chỉ chạy khi `p <= n / p` để tránh overflow.

## Lỗi thường gặp

- Xem 0 và 1 là số nguyên tố; cả hai đều không nguyên tố.
- Bắt đầu đánh dấu từ `2*p`, làm phép tính lặp thừa.
- Tràn khi tính LCM hoặc `p*p`.
- Dùng `std::gcd` với kiểu không nhất quán hoặc giả định số âm có ý nghĩa miền giống số dương.

## Tự luyện

Đếm số nguyên tố đến n bằng sieve. Thử n = 0, 1, 2 và một giới hạn lớn; kiểm tra kiểu chỉ số và memory budget.

## Đọc tiếp

Xem [bit manipulation](/cpp/thuat-toan/bit-manipulation) và [giới hạn kiểu dữ liệu](/cpp/tra-cuu/kieu-du-lieu).
