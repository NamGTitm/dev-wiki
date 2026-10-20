---
title: Dynamic Programming
description: Định nghĩa trạng thái, chuyển trạng thái và thứ tự tính để tránh giải lặp bài toán con.
slug: /cpp/thuat-toan/quy-hoach-dong
category: algorithms
categoryLabel: Thuật toán và Competitive Programming
order: 23070
difficulty: intermediate
keywords: [dynamic programming, DP, state, transition, memoization, tabulation]
updated: 2026-10-20
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/thuat-toan/de-quy-quay-lui", "/cpp/thuat-toan/greedy", "/cpp/thuat-toan/do-phuc-tap"]
---

Dynamic Programming lưu lời giải bài toán con để không tính lại. Thường áp dụng khi có cấu trúc bài toán con chồng lặp và lời giải tối ưu có thể dựng từ lời giải nhỏ hơn.

## Thiết kế DP

- **State**: thông tin tối thiểu xác định bài toán con.
- **Transition**: cách tính state từ state trước.
- **Base case**: giá trị của trạng thái nhỏ nhất.
- **Order**: thứ tự đảm bảo dependency đã tính.
- **Answer**: state nào trả lời bài toán gốc.

## Ví dụ: số cách leo bậc

Mỗi lượt đi 1 hoặc 2 bậc. `ways[n] = ways[n-1] + ways[n-2]`; quy ước `ways[0] = 1`.

```cpp
#include <cstddef>
#include <iostream>
#include <vector>

int main() {
    int n{};
    if (!(std::cin >> n) || n < 0) return 1;
    std::vector<long long> ways(static_cast<std::size_t>(n) + 1);
    ways[0] = 1;
    if (n >= 1) ways[1] = 1;
    for (int step = 2; step <= n; ++step) {
        ways[step] = ways[step - 1] + ways[step - 2];
    }
    std::cout << ways[n] << '\n';
}
```

Thời gian O(n), bộ nhớ O(n); có thể giảm xuống O(1) nếu chỉ cần hai trạng thái trước. Số cách tăng nhanh nên giới hạn n hoặc dùng modulo/kiểu phù hợp.

## Memoization và tabulation

Memoization là top-down đệ quy có cache; tabulation là bottom-up lặp. Chọn theo độ rõ của dependency, độ sâu stack và số state thực sự cần tính.

## Lỗi thường gặp

- Định nghĩa state thiếu thông tin dẫn đến transition sai.
- Quên base case hoặc thứ tự tính.
- Dùng `int` khiến số cách/tổng tràn.
- DP O(n²) khi n quá lớn; tối ưu state chỉ sau khi đúng.

## Tự luyện

Đếm số cách đổi tiền với mệnh giá cho trước và mỗi đồng được dùng không giới hạn. Nêu rõ thứ tự vòng lặp khi đếm tổ hợp; thử target 0 và trường hợp không thể tạo target.

## Đọc tiếp

So sánh với [greedy](/cpp/thuat-toan/greedy), [backtracking](/cpp/thuat-toan/de-quy-quay-lui) và [Big O](/cpp/thuat-toan/do-phuc-tap).
