---
title: Two Pointers và Sliding Window
description: Dùng hai chỉ số để xử lý dãy có invariant, cửa sổ và truy vấn tuyến tính.
slug: /cpp/thuat-toan/two-pointers-sliding-window
category: algorithms
categoryLabel: Thuật toán và Competitive Programming
order: 23040
difficulty: intermediate
keywords: [two pointers, sliding window, subarray, invariant, positive numbers]
updated: 2026-10-20
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/thuat-toan/prefix-sum-difference-array", "/cpp/thuat-toan/tim-kiem-sap-xep", "/cpp/thuat-toan/do-phuc-tap"]
---

Two pointers duy trì hai chỉ số thay vì thử mọi cặp. Sliding window là trường hợp hai đầu tạo cửa sổ liên tục. Kỹ thuật thường giảm O(n²) xuống O(n), nhưng chỉ đúng khi invariant cho phép di chuyển con trỏ có hướng.

## Cửa sổ với số dương

Ví dụ tìm đoạn liên tiếp ngắn nhất có tổng ít nhất `target`, khi mọi phần tử **dương**:

```cpp
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
    const std::vector<int> values{2, 3, 1, 2, 4, 3};
    const long long target{7};
    std::size_t best{values.size() + 1};
    std::size_t left{};
    long long sum{};

    for (std::size_t right = 0; right < values.size(); ++right) {
        sum += values[right];
        while (sum >= target) {
            best = std::min(best, right - left + 1);
            sum -= values[left++];
        }
    }
    std::cout << (best == values.size() + 1 ? 0 : best) << '\n';
}
```

Mỗi pointer chỉ tăng, nên thời gian O(n), bộ nhớ phụ O(1). Output 0 nghĩa là không tìm thấy đoạn. Tính đúng dựa vào mọi số dương: khi bỏ trái, tổng chỉ giảm; với số âm invariant này không còn đúng.

## Two pointers trên dãy đã sort

Để tìm cặp có tổng `target`, đặt một pointer đầu và một pointer cuối của dãy sort. Nếu tổng nhỏ thì tăng pointer trái; nếu lớn thì giảm pointer phải. Thời gian O(n) sau khi sort, bộ nhớ tùy cách sort và cách lưu dữ liệu.

## Lỗi thường gặp

- Dùng sliding window tổng đơn điệu trên dãy có số âm.
- Không chứng minh vì sao bỏ phần tử trái không làm mất đáp án tối ưu.
- Vòng `while` không tiến pointer, gây lặp vô hạn.
- Dùng unsigned index rồi trừ khi `left > right`.

## Tự luyện

Đếm số đoạn có tổng không quá K khi mọi phần tử dương. Giải thích vì sao khi thêm `values[right]`, mọi suffix của cửa sổ hợp lệ đều tạo một đoạn hợp lệ.

## Đọc tiếp

Xem [prefix sum](/cpp/thuat-toan/prefix-sum-difference-array) và [binary search](/cpp/thuat-toan/tim-kiem-sap-xep).
