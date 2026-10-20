---
title: Recursion và Backtracking
description: Khám phá không gian trạng thái bằng đệ quy, lựa chọn, kiểm tra và hoàn tác.
slug: /cpp/thuat-toan/de-quy-quay-lui
category: algorithms
categoryLabel: Thuật toán và Competitive Programming
order: 23050
difficulty: intermediate
keywords: [backtracking, recursion, pruning, state space, permutation, combination]
updated: 2026-10-20
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/trung-cap/de-quy-call-stack", "/cpp/thuat-toan/quy-hoach-dong", "/cpp/thuat-toan/do-phuc-tap"]
---

Backtracking thử các lựa chọn để xây lời giải; nếu trạng thái hiện tại vi phạm điều kiện hoặc không thể dẫn tới đáp án, thuật toán dừng nhánh đó. Dùng cho tổ hợp, hoán vị, Sudoku và bài tìm cấu hình khi n đủ nhỏ.

## Mẫu chọn – gọi – hoàn tác

```cpp
#include <iostream>
#include <vector>

void generate(int n, int next, std::vector<int>& chosen) {
    if (static_cast<int>(chosen.size()) == n) {
        for (int value : chosen) std::cout << value << ' ';
        std::cout << '\n';
        return;
    }

    for (int value = next; value <= 4; ++value) {
        chosen.push_back(value);
        generate(n, value + 1, chosen);
        chosen.pop_back();
    }
}

int main() {
    std::vector<int> chosen;
    generate(2, 1, chosen);
}
```

Ví dụ sinh tổ hợp 2 số trong `{1,2,3,4}`. Số trạng thái phụ thuộc bài toán; sinh mọi tổ hợp k phần tử có C(n,k) lá, còn hoán vị có thể tới n! lá. Bộ nhớ stack và `chosen` thường O(độ sâu).

## Pruning

Prune khi đã chứng minh nhánh không thể tạo nghiệm. Điều kiện cắt sai có thể bỏ mất đáp án. Có thể sắp lựa chọn để phát hiện sớm hoặc dùng bound, nhưng độ phức tạp worst-case vẫn có thể tăng theo hàm mũ.

## Lỗi thường gặp

- Quên hoàn tác trạng thái trước lựa chọn kế tiếp.
- Base case không bao phủ mọi trạng thái hợp lệ.
- Không kiểm tra giới hạn n; đệ quy sâu hoặc số nghiệm lớn gây quá thời gian/bộ nhớ.
- In nghiệm ngay cả khi bài cần đếm hoặc chỉ cần một nghiệm.

## Tự luyện

Sinh mọi chuỗi bit độ dài n không có hai bit 1 liên tiếp. Nêu trạng thái tối thiểu cần lưu và điều kiện prune.

## Đọc tiếp

Khi trạng thái lặp lại, chuyển sang [Dynamic Programming](/cpp/thuat-toan/quy-hoach-dong); trước đó hãy phân tích [độ phức tạp](/cpp/thuat-toan/do-phuc-tap).
