---
title: Prefix Sum và Difference Array
description: Trả lời truy vấn tổng đoạn và cập nhật nhiều range bằng mảng phụ tích lũy.
slug: /cpp/thuat-toan/prefix-sum-difference-array
category: algorithms
categoryLabel: Thuật toán và Competitive Programming
order: 23030
difficulty: intermediate
keywords: [prefix sum, cumulative sum, difference array, range sum, range update]
updated: 2026-10-22
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/thuat-toan/two-pointers-sliding-window", "/cpp/thuat-toan/do-phuc-tap", "/cpp/bat-dau/mang-string"]
---

Prefix sum lưu tổng tích lũy để biến truy vấn tổng đoạn thành phép trừ hai giá trị đã tính. Difference array lưu thay đổi tại ranh giới để gom nhiều cập nhật trên đoạn rồi dựng lại dãy bằng một lần quét. Cả hai kỹ thuật chuyển chi phí từ mỗi truy vấn/cập nhật sang bước tiền xử lý hoặc bước khôi phục.

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

Tiền xử lý O(n), mỗi truy vấn O(1), bộ nhớ phụ O(n). Chọn kiểu đủ rộng cho tổng prefix vì tràn ở bất kỳ bước cộng nào đều làm sai các truy vấn sau.

Với left = 1 và right = 3, tổng là 1 + 4 + 2 = 7 nên chương trình in 7. Chỉ số inclusive phải thỏa left <= right < values.size(); dạng half-open [left, end) cho phép đoạn rỗng khi left == end và dùng prefix[end] - prefix[left].

Prefix sum vẫn trả lời đúng khi phần tử âm vì công thức chỉ dựa trên phép cộng. Tuy nhiên, prefix không nhất thiết tăng dần; không thể áp dụng binary search lên các giá trị đó nếu chưa chứng minh predicate đơn điệu.

## Difference array

Muốn cộng `delta` vào inclusive `[left, right]`, cộng `delta` tại `diff[left]` và trừ tại `diff[right + 1]` nếu vị trí đó nằm trong buffer. Prefix-sum của `diff` tạo mảng sau mọi cập nhật. M cập nhật và N phần tử: O(M + N).

```cpp
#include <cstddef>
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

Trong ví dụ, dãy ban đầu được xem là toàn số 0; sau cập nhật đoạn [1, 3] thêm 4, output là 0 4 4 4 0. Với m cập nhật và dãy dài n, ghi các ranh giới mất O(m), rồi quét dựng kết quả mất O(n), tổng O(m + n).

Nếu dãy có giá trị ban đầu và không rỗng, có thể khởi tạo diff[0] = a[0] và diff[i] = a[i] - a[i - 1] với i > 0, rồi áp dụng các cập nhật lên diff. Difference array phù hợp khi cập nhật được gom trước và chỉ cần khôi phục kết quả sau đó; nếu phải hỏi tổng đoạn xen kẽ với cập nhật, cần cấu trúc dữ liệu hỗ trợ cập nhật động như Fenwick tree hoặc segment tree.

## Lỗi thường gặp

- Lệch một chỉ số giữa inclusive range và half-open range.
- Quên prefix sentinel ở vị trí 0.
- Dùng `int` khiến tổng tràn.
- Dùng difference array khi cần truy vấn xen kẽ cập nhật động; khi đó cần cấu trúc khác như Fenwick tree.

## Chọn quy ước chỉ số

Chọn một quy ước cho toàn thuật toán và chuyển đổi tại ranh giới input. Với inclusive [l, r], độ dài là r - l + 1; với half-open [l, end), độ dài là end - l và điểm kết thúc được phép bằng n. Prefix sum tự nhiên dùng half-open vì prefix[0] là sentinel, còn thao tác difference array thường nhận range inclusive nên cần vị trí r + 1.

## Đọc tiếp

Xem [two pointers và sliding window](/cpp/thuat-toan/two-pointers-sliding-window), cùng [độ phức tạp](/cpp/thuat-toan/do-phuc-tap).
