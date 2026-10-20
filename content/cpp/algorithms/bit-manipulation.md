---
title: Bit Manipulation và tối ưu thời gian, bộ nhớ
description: Dùng bitmask an toàn và tối ưu thuật toán trước khi tối ưu vi mô.
slug: /cpp/thuat-toan/bit-manipulation
category: algorithms
categoryLabel: Thuật toán và Competitive Programming
order: 23120
difficulty: intermediate
keywords: [bit manipulation, bitmask, shift, popcount, optimization, memory]
updated: 2026-10-20
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/thuat-toan/number-theory", "/cpp/thuat-toan/do-phuc-tap", "/cpp/ky-thuat/profiling-performance"]
---

Bit manipulation làm việc trực tiếp với biểu diễn nhị phân, hữu ích cho flags, tập con nhỏ và protocol. Dùng kiểu unsigned để phép dịch và mask dễ phân tích; bit shift âm hoặc shift count ngoài độ rộng là lỗi.

## Thao tác cơ bản

```cpp
#include <cstdint>
#include <iostream>

int main() {
    std::uint32_t flags{};
    const unsigned bit_index{3};
    const std::uint32_t mask{std::uint32_t{1} << bit_index};
    flags |= mask;
    const bool enabled{(flags & mask) != 0};
    flags &= ~mask;
    std::cout << enabled << ' ' << flags << '\n';
}
```

Với `uint32_t`, chỉ dịch từ 0 đến 31; kiểm tra index trước nếu nó đến từ input. Shift `1 << k` có thể sai nếu literal `1` là signed và shift tới bit dấu.

## Bitmask tập con

Mask có thể biểu diễn tập con của tối đa w phần tử với w bit. Duyệt `0 .. 2^n - 1` có O(2^n) mask; chỉ phù hợp n nhỏ. Chuyển 2^n sang kiểu đúng miền trước khi tính để tránh overflow.

## Tối ưu có thứ tự

- Chọn thuật toán và cấu trúc dữ liệu tốt hơn trước.
- Đo bằng profiler trên workload đại diện.
- Giảm allocation/copy hoặc lưu dữ liệu liên tục khi profiler chỉ ra nút thắt.
- Tối ưu memory phải xét cả peak usage, không chỉ `sizeof` một object.

## Lỗi thường gặp

- Dùng bit trick khó đọc thay cho phép toán rõ.
- Shift số âm hoặc dịch quá số bit của kiểu.
- Dùng macro không có kiểu và gây đánh giá đối số nhiều lần.
- Tối ưu trước khi đo, làm code phức tạp mà không cải thiện.

## Tự luyện

Lưu trạng thái bật/tắt của 8 tùy chọn trong một byte. Viết thao tác test, set, clear và toggle; giới hạn bit index từ 0 đến 7.

## Đọc tiếp

Ôn [Big O](/cpp/thuat-toan/do-phuc-tap), [kiểu số](/cpp/tra-cuu/kieu-du-lieu) và [profiling](/cpp/ky-thuat/profiling-performance).
