---
title: Greedy Algorithms
description: Chọn bước tốt nhất hiện tại khi có chứng minh rằng lựa chọn cục bộ dẫn tới tối ưu toàn cục.
slug: /cpp/thuat-toan/greedy
category: algorithms
categoryLabel: Thuật toán và Competitive Programming
order: 23060
difficulty: intermediate
keywords: [greedy algorithm, interval scheduling, exchange argument, local optimum]
updated: 2026-10-22
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/thuat-toan/quy-hoach-dong", "/cpp/thuat-toan/tim-kiem-sap-xep", "/cpp/thuat-toan/giai-quyet-bai-toan"]
---

Greedy chọn một phương án cục bộ theo một quy tắc rồi giải phần còn lại. Nó thường dùng ít trạng thái và dễ cài đặt hơn quy hoạch động, nhưng một lựa chọn sớm có thể chặn các lựa chọn tốt về sau. Chỉ dùng greedy khi có lập luận chứng minh lựa chọn đó vẫn cho một nghiệm tối ưu.

## Ví dụ: chọn nhiều khoảng không giao nhau

Với mỗi interval `[start, end)`, sắp theo `end` tăng dần rồi lấy interval tương thích đầu tiên. Lý do: khoảng kết thúc sớm nhất để lại nhiều thời gian nhất cho phần còn lại.

```cpp
#include <algorithm>
#include <cstddef>
#include <iostream>
#include <limits>
#include <utility>
#include <vector>

int main() {
    std::vector<std::pair<int, int>> intervals{{1, 3}, {2, 5}, {4, 6}, {6, 8}};
    std::sort(intervals.begin(), intervals.end(), [](const auto& left, const auto& right) {
        return left.second < right.second;
    });

    std::size_t selected{};
    int last_end{std::numeric_limits<int>::lowest()};
    for (const auto& [start, end] : intervals) {
        if (start >= last_end) {
            ++selected;
            last_end = end;
        }
    }
    std::cout << selected << '\n';
}
```

Sắp xếp O(n log n), duyệt O(n), bộ nhớ phụ O(log n) tùy implementation của `sort`. Dùng half-open interval nên hai khoảng kề nhau được chọn cùng lúc.

Ví dụ sắp theo thời điểm kết thúc chọn được ba khoảng: [1, 3), [4, 6) và [6, 8). Điều kiện start >= last_end cho phép hai khoảng kề nhau cùng được chọn vì các khoảng dùng quy ước half-open.

## Vì sao quy tắc này đúng

Exchange argument: lấy nghiệm tối ưu bất kỳ. Nếu khoảng đầu tiên của nghiệm không phải khoảng kết thúc sớm nhất, thay nó bằng khoảng kết thúc sớm nhất. Khoảng thay thế kết thúc không muộn hơn khoảng cũ, vì vậy mọi khoảng còn lại trong nghiệm vẫn bắt đầu sau thời điểm kết thúc mới. Phép thay không giảm số khoảng đã chọn. Sau khi cố định lựa chọn đầu tiên này, áp dụng cùng lập luận cho phần thời gian còn lại; theo quy nạp, lựa chọn greedy đạt cùng số khoảng với nghiệm tối ưu.

Lập luận dựa vào mục tiêu chọn nhiều khoảng tương thích nhất và việc một khoảng kết thúc sớm để lại tập lựa chọn tương lai ít nhất bằng mọi lựa chọn khác. Nếu đổi mục tiêu thành chọn khoảng có giá trị lớn nhất hoặc cho phép khoảng chồng lấn với chi phí, quy tắc này không còn tự động đúng.

## Khi chọn cục bộ thất bại

Với mệnh giá {1, 3, 4} và số tiền 6, quy tắc luôn lấy đồng lớn nhất trước chọn 4, rồi 1 và 1, tổng cộng ba đồng. Phương án 3 + 3 chỉ cần hai đồng. Ví dụ này cho thấy tính hợp lý của một bước riêng lẻ không chứng minh được nghiệm toàn cục tối ưu; bài toán có thể cần quy hoạch động hoặc một chứng minh khác.

Ngay cả trong bài chọn khoảng, ưu tiên thời điểm bắt đầu sớm nhất cũng có thể sai: khoảng [0, 100) bắt đầu trước ba khoảng [1, 2), [2, 3), [3, 4), nhưng chọn khoảng dài chỉ cho một lịch; ba khoảng ngắn tương thích với nhau. Quy tắc kết thúc sớm giải quyết đúng mục tiêu số lượng khoảng trong mô hình đã nêu, không phải mọi biến thể lập lịch.

## Lỗi thường gặp

- Nhầm quy tắc theo start, end hoặc độ dài; mỗi bài cần chứng minh riêng.
- Bỏ qua tie-break hoặc quy ước interval đóng/mở.
- Dùng greedy cho coin change tổng quát mà không chứng minh; có bộ mệnh giá greedy không tối ưu.

## Đọc tiếp

So sánh với [quy hoạch động](/cpp/thuat-toan/quy-hoach-dong), nơi giữ nhiều trạng thái để so sánh lựa chọn.
