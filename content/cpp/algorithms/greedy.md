---
title: Greedy Algorithms
description: Chọn bước tốt nhất hiện tại khi có chứng minh rằng lựa chọn cục bộ dẫn tới tối ưu toàn cục.
slug: /cpp/thuat-toan/greedy
category: algorithms
categoryLabel: Thuật toán và Competitive Programming
order: 23060
difficulty: intermediate
keywords: [greedy algorithm, interval scheduling, exchange argument, local optimum]
updated: 2026-10-20
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/thuat-toan/quy-hoach-dong", "/cpp/thuat-toan/tim-kiem-sap-xep", "/cpp/thuat-toan/giai-quyet-bai-toan"]
---

Greedy chọn một phương án cục bộ theo quy tắc, rồi tiếp tục với phần còn lại. Cách này nhanh và gọn khi có chứng minh phù hợp; trực giác “chọn tốt nhất trước” không đủ để bảo đảm tối ưu.

## Ví dụ: chọn nhiều khoảng không giao nhau

Với mỗi interval `[start, end)`, sắp theo `end` tăng dần rồi lấy interval tương thích đầu tiên. Lý do: khoảng kết thúc sớm nhất để lại nhiều thời gian nhất cho phần còn lại.

```cpp
#include <algorithm>
#include <iostream>
#include <limits>
#include <utility>
#include <vector>

int main() {
    std::vector<std::pair<int, int>> intervals{{1, 3}, {2, 5}, {4, 6}, {6, 8}};
    std::sort(intervals.begin(), intervals.end(), [](const auto& left, const auto& right) {
        return left.second < right.second;
    });

    int selected{};
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

## Chứng minh

Exchange argument: lấy nghiệm tối ưu bất kỳ. Nếu lựa chọn đầu tiên của nó không phải interval kết thúc sớm nhất, thay interval đầu đó bằng interval kết thúc sớm nhất; phần còn lại vẫn khả thi và nghiệm không giảm số khoảng. Lặp lập luận cho phần sau.

## Lỗi thường gặp

- Nhầm quy tắc theo start, end hoặc độ dài; mỗi bài cần chứng minh riêng.
- Bỏ qua tie-break hoặc quy ước interval đóng/mở.
- Dùng greedy cho coin change tổng quát mà không chứng minh; có bộ mệnh giá greedy không tối ưu.

## Tự luyện

Thử chiến lược sắp interval theo start trên ví dụ có một khoảng dài chồng lên hai khoảng ngắn. Vì sao chiến lược ấy thất bại?

## Đọc tiếp

So sánh với [quy hoạch động](/cpp/thuat-toan/quy-hoach-dong), nơi giữ nhiều trạng thái để so sánh lựa chọn.
