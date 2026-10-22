---
title: Dynamic Programming
description: Định nghĩa trạng thái, chuyển trạng thái và thứ tự tính để tránh giải lặp bài toán con.
slug: /cpp/thuat-toan/quy-hoach-dong
category: algorithms
categoryLabel: Thuật toán và Competitive Programming
order: 23070
difficulty: intermediate
keywords: [dynamic programming, DP, state, transition, memoization, tabulation]
updated: 2026-10-22
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

State phải giữ đủ thông tin để những quyết định về sau không cần biết toàn bộ lịch sử đã tạo ra nó. Sau khi chọn state, viết transition từ các state nhỏ hơn rồi xác định base case; thứ tự tính phải đi từ dependency về phía answer. Nếu hai lịch sử khác nhau cho cùng một state và tương lai chỉ phụ thuộc state đó, ta có thể gộp chúng thay vì giải lại riêng từng lịch sử.

## Ví dụ: số cách leo bậc

Mỗi lượt đi 1 hoặc 2 bậc. `ways[n] = ways[n-1] + ways[n-2]`; quy ước `ways[0] = 1`.

```cpp
#include <cstddef>
#include <iostream>
#include <vector>

int main() {
    int n{};
    if (!(std::cin >> n) || n < 0 || n > 91) return 1;
    std::vector<long long> ways(static_cast<std::size_t>(n) + 1);
    ways[0] = 1;
    if (n >= 1) ways[1] = 1;
    for (int step = 2; step <= n; ++step) {
        ways[step] = ways[step - 1] + ways[step - 2];
    }
    std::cout << ways[n] << '\n';
}
```

Với n = 5, các giá trị lần lượt là 1, 1, 2, 3, 5, 8 nên chương trình in 8. ways[0] = 1 biểu diễn một cách để đứng ở bậc 0: không thực hiện bước nào. Quy ước này làm transition hoạt động tự nhiên ở các trạng thái đầu.

Mảng lưu toàn bộ trạng thái nên thời gian và bộ nhớ đều O(n). Vì mỗi bước chỉ đọc hai giá trị ngay trước đó, có thể giữ hai biến thay vì vector và giảm bộ nhớ phụ xuống O(1). Ví dụ giới hạn n <= 91 được chọn để tổng vẫn nằm trong long long; với giới hạn lớn hơn, cần kiểm tra tràn, dùng số lớn hơn hoặc tính modulo theo yêu cầu bài.

## Memoization và tabulation

Memoization là top-down đệ quy có cache; tabulation là bottom-up lặp. Chọn theo độ rõ của dependency, độ sâu stack và số state thực sự cần tính.

Với memoization, cache cần phân biệt state chưa tính với state đã tính nhưng có giá trị bằng 0; một giá trị mặc định không đủ nếu 0 là kết quả hợp lệ. Với tabulation, mọi state phụ thuộc phải được tính trước khi đọc. Hai cách dùng chung recurrence và cùng độ phức tạp khi đều tính cùng số state, nhưng cách đi qua không gian trạng thái có thể khác.

## Lỗi thường gặp

- Định nghĩa state thiếu thông tin dẫn đến transition sai.
- Quên base case hoặc thứ tự tính.
- Dùng `int` khiến số cách/tổng tràn.
- DP O(n²) khi n quá lớn; tối ưu state chỉ sau khi đúng.

## Giảm bộ nhớ và truy vết

Chỉ nén mảng trạng thái khi đã xác định các giá trị cũ nào còn được transition sử dụng. Bài leo bậc chỉ cần hai state trước nên có thể dùng hai biến; với bài cần dựng lại đường đi hoặc tập lựa chọn, phải lưu thêm parent/decision hoặc tái tính, vì chỉ giữ answer cuối có thể làm mất thông tin truy vết.

## Thứ tự vòng lặp trong đổi tiền

Với mệnh giá 1, 3, 4 và target 6, đặt ways[x] là số tổ hợp tạo được tổng x. Đặt ways[0] = 1 vì có đúng một cách tạo tổng 0: không lấy đồng nào. Duyệt từng mệnh giá ở vòng ngoài rồi tăng amount ở vòng trong cho phép dùng lại đồng đang xét nhưng không đếm các hoán vị của cùng tổ hợp.

```cpp
#include <cstddef>
#include <iostream>
#include <vector>

int main() {
    constexpr std::size_t target{6};
    const std::vector<std::size_t> coins{1, 3, 4};
    std::vector<unsigned long long> ways(target + 1);
    ways[0] = 1;

    for (std::size_t coin : coins) {
        for (std::size_t amount = coin; amount <= target; ++amount) {
            ways[amount] += ways[amount - coin];
        }
    }
    std::cout << ways[target] << '\n';
}
```

Chương trình in 4: sáu đồng 1, ba đồng 1 cùng một đồng 3, hai đồng 3, hoặc một đồng 4 cùng hai đồng 1. Đảo thứ tự vòng lặp thành amount ở ngoài rồi coin ở trong sẽ đếm các chuỗi thứ tự khác nhau như những cách riêng. Nếu mỗi mệnh giá chỉ được dùng một lần, phải duyệt amount giảm dần; bài toán đó có recurrence khác. Với target lớn, số cách có thể tràn unsigned long long, nên cần modulo hoặc phép cộng có kiểm tra.

## Đọc tiếp

So sánh với [greedy](/cpp/thuat-toan/greedy), [backtracking](/cpp/thuat-toan/de-quy-quay-lui) và [Big O](/cpp/thuat-toan/do-phuc-tap).
