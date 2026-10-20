---
title: Prefix Sum và Difference Array
description: Trả lời truy vấn tổng đoạn và cập nhật nhiều range bằng mảng phụ tích lũy.
slug: /cpp/thuat-toan/prefix-sum-difference-array
category: algorithms
categoryLabel: Thuật toán và Competitive Programming
order: 23030
difficulty: intermediate
keywords: [prefix sum, cumulative sum, difference array, range sum, range update]
updated: 2026-10-20
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/thuat-toan/two-pointers-sliding-window", "/cpp/thuat-toan/do-phuc-tap", "/cpp/bat-dau/mang-string"]
---

Prefix sum biến nhiều truy vấn tổng đoạn thành phép trừ hai prefix. Difference array gom cập nhật trên nhiều đoạn để cuối cùng dựng lại từng phần tử.

## Prefix sum

Với `prefix[0] = 0`, đặt `prefix[i + 1] = prefix[i] + values[i]`. Tổng đoạn inclusive `[left, right]` là `prefix[right + 1] - prefix[left]`.

```cpp
#include <cstddef>
#include <iostream>
#include <vector>

int main() {
    const std::vector<int> values{3, 1, 4, 2};
    std::vector<long long> prefix(values.size() + 1);
    for (std::size_t i = 0; i < values.size(); ++i) {
        prefix[i + 1] = prefix[i] + values[i];
    }
    const std::size_t left{1};
    const std::size_t right{3};
    std::cout << prefix[right + 1] - prefix[left] << '\n';
}
```

Tiền xử lý O(n), mỗi truy vấn O(1), bộ nhớ O(n). Chỉ số trong ví dụ thỏa `left <= right < n`. Chọn kiểu đủ rộng cho prefix sum.

## Difference array

Muốn cộng `delta` vào inclusive `[left, right]`, cộng `delta` tại `diff[left]` và trừ tại `diff[right + 1]` nếu vị trí đó nằm trong buffer. Prefix-sum của `diff` tạo mảng sau mọi cập nhật. M cập nhật và N phần tử: O(M + N).

```cpp
#include <iostream>
#include <vector>

int main() {
    constexpr std::size_t size{5};
    std::vector<long long> difference(size + 1);
    const std::size_t left{1};
    const std::size_t right{3};
    const long long delta{4};
    difference[left] += delta;
    difference[right + 1] -= delta;

    long long current{};
    for (std::size_t i = 0; i < size; ++i) {
        current += difference[i];
        std::cout << current << ' ';
    }
    std::cout << '\n';
}
```

## Lỗi thường gặp

- Lệch một chỉ số giữa inclusive range và half-open range.
- Quên prefix sentinel ở vị trí 0.
- Dùng `int` khiến tổng tràn.
- Dùng difference array khi cần truy vấn xen kẽ cập nhật động; khi đó cần cấu trúc khác như Fenwick tree.

## Tự luyện

Trả lời nhiều truy vấn `[l, r]` và sau đó cộng giá trị vào nhiều đoạn. Thử đoạn một phần tử, cả mảng và đoạn cuối chạm `n - 1`.

## Đọc tiếp

Xem [two pointers và sliding window](/cpp/thuat-toan/two-pointers-sliding-window), cùng [độ phức tạp](/cpp/thuat-toan/do-phuc-tap).
