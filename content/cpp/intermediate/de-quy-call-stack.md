---
title: Đệ quy và call stack
description: Hiểu lời gọi đệ quy, điều kiện dừng, trạng thái lời gọi và giới hạn độ sâu.
slug: /cpp/trung-cap/de-quy-call-stack
category: intermediate
categoryLabel: C++ trung cấp
order: 21020
difficulty: intermediate
keywords: [đệ quy C++, recursion, call stack, base case, stack overflow]
updated: 2026-10-20
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/bat-dau/ham-pham-vi", "/cpp/thuat-toan/de-quy-quay-lui", "/cpp/thuat-toan/quy-hoach-dong"]
---

Đệ quy là cách một hàm giải bài toán bằng cách gọi lại chính nó trên dữ liệu nhỏ hơn. Dùng khi bài toán có cấu trúc tự đồng dạng, như cây hoặc quay lui; lặp thường dễ kiểm soát hơn với phép tính tuyến tính đơn giản.

## Hai phần bắt buộc

- **Base case**: trả kết quả trực tiếp và dừng.
- **Recursive case**: biến đổi input để tiến gần base case.

```cpp
#include <iostream>

long long factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

int main() {
    int n{};
    if (!(std::cin >> n) || n < 0 || n > 20) return 1;
    std::cout << factorial(n) << '\n';
}
```

Mỗi lần gọi giữ tham số và trạng thái riêng trên call stack. Với đoạn code trên, thời gian O(n), stack O(n). Giới hạn `n <= 20` giúp kết quả không vượt `long long`; độ sâu đệ quy còn bị giới hạn bởi stack runtime.

## Lỗi thường gặp

- Thiếu base case hoặc input không tiến tới base case gây đệ quy vô hạn.
- Độ sâu quá lớn gây stack overflow; cân nhắc vòng lặp hoặc cấu trúc dữ liệu tường minh.
- Tính lại cùng bài toán con nhiều lần như Fibonacci đệ quy thuần; dùng memoization/DP.
- Phân tích chỉ thời gian mà quên bộ nhớ stack.

## Tự luyện

Viết hàm đệ quy tính tổng chữ số của số nguyên không âm. Base case là số nhỏ hơn 10; recursive case bỏ chữ số cuối. Sau đó thử input 0 và số có một chữ số.

## Đọc tiếp

Ứng dụng đệ quy vào [backtracking](/cpp/thuat-toan/de-quy-quay-lui) và [quy hoạch động](/cpp/thuat-toan/quy-hoach-dong).
