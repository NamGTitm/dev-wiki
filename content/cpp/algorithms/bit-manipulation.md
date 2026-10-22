---
title: Bit Manipulation và tối ưu thời gian, bộ nhớ
description: Dùng bitmask an toàn và tối ưu thuật toán trước khi tối ưu vi mô.
slug: /cpp/thuat-toan/bit-manipulation
category: algorithms
categoryLabel: Thuật toán và Competitive Programming
order: 23120
difficulty: intermediate
keywords: [bit manipulation, bitmask, shift, popcount, optimization, memory]
updated: 2026-10-22
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/thuat-toan/number-theory", "/cpp/thuat-toan/do-phuc-tap", "/cpp/ky-thuat/profiling-performance"]
---

Bit manipulation đọc hoặc thay đổi từng bit của giá trị, hữu ích cho flags, tập con nhỏ và định dạng dữ liệu. Nó có thể biểu đạt nhiều trạng thái trong một số nguyên, nhưng chỉ nên dùng khi ranh giới bit rõ ràng và cách viết vẫn dễ kiểm tra. Dùng kiểu unsigned có độ rộng xác định để phép dịch và mask dễ phân tích; dịch âm hoặc dịch số bit bằng/vượt độ rộng kiểu gây hành vi không xác định.

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

Sau khi đặt bit số 3, enabled là true và flags có giá trị 8. Lệnh clear xóa bit đó nên output là 1 0. Với uint32_t, chỉ số bit hợp lệ từ 0 đến 31; nếu bit_index đến từ input, kiểm tra nó trước khi dịch.

| Thao tác | Biểu thức | Tác dụng |
|---|---|---|
| Kiểm tra | (value & mask) != 0 | Xác định bit đã bật |
| Bật | value |= mask | Đặt bit thành 1 |
| Tắt | value &= ~mask | Đặt bit thành 0 |
| Đảo | value ^= mask | Đổi 0 thành 1 hoặc 1 thành 0 |

Tạo mask từ đúng kiểu unsigned, chẳng hạn uint32_t{1} << bit_index. Literal signed 1 có thể không biểu diễn được bit cao nhất; ép kiểu sau phép dịch không sửa được vấn đề vì phép dịch đã xảy ra trước đó.

## Bitmask tập con

Mask có thể biểu diễn tập con của tối đa w phần tử với w bit: bit thứ i cho biết phần tử i có thuộc tập con hay không. Duyệt mọi mask có 2^n trạng thái và dùng O(1) bộ nhớ mỗi trạng thái; nếu với mỗi mask lại quét n bit để dựng tập con, tổng thời gian là O(n × 2^n). Vì số trạng thái tăng theo hàm mũ, kỹ thuật này chỉ phù hợp khi n nhỏ.

Phép dịch cần count nhỏ hơn độ rộng kiểu bên trái. Khi dùng uint64_t, n phải nhỏ hơn 64 để tính 1ULL << n hợp lệ; giới hạn bộ nhớ và thời gian thường khiến giới hạn thực tế thấp hơn nhiều. Tính số mask sau khi chọn kiểu phù hợp, không tính 2^n bằng int rồi mới gán sang kiểu rộng.

std::popcount trong header `<bit>` chỉ có từ C++20, trong khi các ví dụ của collection này dùng C++17. Với C++17, có thể đếm bit bằng một vòng lặp trên unsigned value; chỉ dùng intrinsic riêng của compiler khi chấp nhận đánh đổi tính portable và ghi rõ phụ thuộc đó.

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

Big O giúp phát hiện thuật toán tăng quá nhanh nhưng không xác định hotspot trên workload thật. Đo baseline bằng input đại diện, xác định CPU, allocation hay peak memory là mục tiêu, rồi đổi một điểm và đo lại. Micro-optimization như thay biểu thức bằng bit trick không thay thế bước chọn thuật toán hoặc đo; nếu không cải thiện bottleneck, nó chỉ làm code khó đọc hơn.

## Đọc và bảo trì bitmask

Đặt tên mask theo ý nghĩa của trạng thái thay vì rải các hằng số bit trong code. Kiểm tra width, kiểu signedness và miền của chỉ số tại nơi nhận dữ liệu; thao tác trên bit cao cần được review cùng kiểu số cụ thể. Bitmask phù hợp khi số trạng thái nhỏ, cố định và cần thao tác trực tiếp, còn container hoặc enum rõ nghĩa thường dễ bảo trì hơn khi trạng thái mở rộng.

## Đọc tiếp

Ôn [Big O](/cpp/thuat-toan/do-phuc-tap), [kiểu số](/cpp/tra-cuu/kieu-du-lieu) và [profiling](/cpp/ky-thuat/profiling-performance).
