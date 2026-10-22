---
title: Recursion và Backtracking
description: Khám phá không gian trạng thái bằng đệ quy, lựa chọn, kiểm tra và hoàn tác.
slug: /cpp/thuat-toan/de-quy-quay-lui
category: algorithms
categoryLabel: Thuật toán và Competitive Programming
order: 23050
difficulty: intermediate
keywords: [backtracking, recursion, pruning, state space, permutation, combination]
updated: 2026-10-22
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/trung-cap/de-quy-call-stack", "/cpp/thuat-toan/quy-hoach-dong", "/cpp/thuat-toan/do-phuc-tap"]
---

Backtracking duyệt cây các lựa chọn để xây lời giải từng bước. Mỗi lời gọi biểu diễn một trạng thái một phần; thuật toán chọn một bước, đi sâu, rồi hoàn tác để thử lựa chọn kế tiếp. Khi trạng thái đã vi phạm điều kiện hoặc không còn cách nào dẫn tới đáp án, nhánh đó được cắt sớm.

## Mẫu chọn – gọi – hoàn tác

```cpp
#include <iostream>
#include <cstddef>
#include <vector>

void generate(int n, int next, std::vector<int>& chosen) {
    if (static_cast<int>(chosen.size()) == n) {
        for (int value : chosen) std::cout << value << ' ';
        std::cout << '\n';
        return;
    }

    for (int value = next; value <= 4; ++value) {
        if (chosen.size() + static_cast<std::size_t>(5 - value)
            < static_cast<std::size_t>(n)) break;
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

Chương trình in sáu tổ hợp theo thứ tự duyệt: 1 2, 1 3, 1 4, 2 3, 2 4, 3 4. Ở mọi lời gọi, chosen chứa các số đã chọn theo thứ tự tăng; next là giá trị nhỏ nhất có thể chọn tiếp. Sau lời gọi con, pop_back khôi phục trạng thái trước nhánh đó, nhờ vậy nhánh kế tiếp không bị ảnh hưởng.

Với n phần tử chọn k, số lá là C(n, k). Nhánh được cắt nếu số phần tử còn lại không đủ để hoàn thành tổ hợp; như vậy mỗi trạng thái đã mở rộng là tổ tiên của ít nhất một kết quả. Tổng chi phí kể cả in k giá trị mỗi lá là O(k × C(n, k)), còn stack và vector trạng thái dùng O(k) bộ nhớ.

## Pruning

Chỉ prune khi có căn cứ rằng nhánh hiện tại không thể tạo nghiệm hợp lệ hoặc không thể cải thiện đáp án tốt nhất. Điều kiện cắt sai có thể làm mất đáp án. Sắp thứ tự lựa chọn hoặc dùng một bound có thể giúp phát hiện nhánh vô ích sớm hơn, nhưng trong trường hợp xấu số trạng thái vẫn có thể tăng theo hàm mũ.

## Lỗi thường gặp

- Quên hoàn tác trạng thái trước lựa chọn kế tiếp.
- Base case không bao phủ mọi trạng thái hợp lệ.
- Không kiểm tra giới hạn n; đệ quy sâu hoặc số nghiệm lớn gây quá thời gian/bộ nhớ.
- In nghiệm ngay cả khi bài cần đếm hoặc chỉ cần một nghiệm.

## Backtracking và quy hoạch động

Backtracking giữ các nhánh riêng vì cần liệt kê nghiệm, tìm một nghiệm hoặc so sánh những lựa chọn chưa thể gộp. Nếu nhiều nhánh đi tới cùng một trạng thái và phần còn lại chỉ phụ thuộc trạng thái đó, memoization có thể tránh giải lặp; khi mục tiêu là tính giá trị tối ưu, bài toán thường chuyển thành quy hoạch động. Hai kỹ thuật có thể cùng xuất hiện: một thuật toán vẫn quay lui nhưng cache kết quả của state lặp.

## Đọc tiếp

Khi trạng thái lặp lại, chuyển sang [Dynamic Programming](/cpp/thuat-toan/quy-hoach-dong); trước đó hãy phân tích [độ phức tạp](/cpp/thuat-toan/do-phuc-tap).
