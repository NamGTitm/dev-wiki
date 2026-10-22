---
title: Number Theory: GCD, LCM và số nguyên tố
description: Tính ước chung lớn nhất, bội chung nhỏ nhất và sàng Eratosthenes.
slug: /cpp/thuat-toan/number-theory
category: algorithms
categoryLabel: Thuật toán và Competitive Programming
order: 23080
difficulty: intermediate
keywords: [number theory, gcd, lcm, std::gcd, prime, sieve of Eratosthenes]
updated: 2026-10-22
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
    const long long multiple{std::lcm(a, b)};
    std::cout << divisor << ' ' << multiple << '\n';
}
```

Phép tính `(a / gcd) * b` giảm nguy cơ tràn so với `a * b / gcd` nhưng không loại bỏ tràn; với input lớn cần kiểm tra miền. Ví dụ giả định số dương nhỏ.

Với 84 và 30, Euclid lần lượt lấy phần dư 84 % 30 = 24, 30 % 24 = 6 và 24 % 6 = 0; ước chung lớn nhất là 6. LCM của hai số dương là 420. Chia trước khi nhân giảm nguy cơ tràn trong cách tính thủ công, nhưng std::lcm cũng yêu cầu kết quả biểu diễn được trong kiểu trả về. Nếu cần xử lý mọi giá trị signed, phải chú ý trường hợp trị tuyệt đối không biểu diễn được, chẳng hạn giá trị nhỏ nhất của kiểu.

## Sàng Eratosthenes

Để tìm mọi số nguyên tố không vượt n, đánh dấu bội từ `p*p` khi p chưa bị đánh dấu. Thời gian O(n log log n), bộ nhớ O(n). Dùng kiểu đủ rộng cho `p*p` hoặc chỉ chạy khi `p <= n / p` để tránh overflow.

Đoạn sàng dưới đây trả về bảng đánh dấu từ 0 đến n. Khi p còn là số nguyên tố, các bội nhỏ hơn p² đã được xử lý bởi ước nguyên tố nhỏ hơn; vì vậy bắt đầu từ p² tránh lặp việc đánh dấu. Điều kiện p <= n / p tương đương p² <= n mà không cần nhân trước.

```cpp
#include <cstddef>
#include <iostream>
#include <vector>

std::vector<unsigned char> sieve(std::size_t n) {
    std::vector<unsigned char> is_prime(n + 1, 1);
    is_prime[0] = 0;
    if (n >= 1) is_prime[1] = 0;

    for (std::size_t p = 2; p <= n / p; ++p) {
        if (!is_prime[p]) continue;
        for (std::size_t multiple = p * p; multiple <= n;) {
            is_prime[multiple] = 0;
            if (n - multiple < p) break;
            multiple += p;
        }
    }
    return is_prime;
}

int main() {
    constexpr std::size_t limit{30};
    const auto is_prime{sieve(limit)};
    for (std::size_t value = 2; value <= limit; ++value) {
        if (is_prime[value]) std::cout << value << ' ';
    }
    std::cout << '\n';
}
```

Với limit bằng 30, output là 2 3 5 7 11 13 17 19 23 29. Bảng cần O(n) bộ nhớ; tổng số lần đánh dấu là O(n log log n). Ví dụ giả định n + 1 phần tử vừa với bộ nhớ và kích thước container.

## Lỗi thường gặp

- Xem 0 và 1 là số nguyên tố; cả hai đều không nguyên tố.
- Bắt đầu đánh dấu từ `2*p`, làm phép tính lặp thừa.
- Tràn khi tính LCM hoặc `p*p`.
- Dùng `std::gcd` với kiểu không nhất quán hoặc giả định số âm có ý nghĩa miền giống số dương.

## Chọn thuật toán theo giới hạn

Thử chia từng số để kiểm tra nguyên tố phù hợp khi chỉ có ít truy vấn; sàng Eratosthenes phù hợp khi cần bảng nguyên tố cho mọi số tới một giới hạn. Sàng lưu trạng thái cho toàn miền nên không thích hợp nếu giới hạn rất lớn so với bộ nhớ. Với input n = 0 hoặc n = 1, không có số nguyên tố nào; với n = 2, bảng chỉ đánh dấu 2.

## Đọc tiếp

Xem [bit manipulation](/cpp/thuat-toan/bit-manipulation) và [giới hạn kiểu dữ liệu](/cpp/tra-cuu/kieu-du-lieu).
