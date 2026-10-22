---
title: Binary Search on Answer
description: Tối ưu giá trị bằng cách tìm ngưỡng đơn điệu và kiểm tra tính khả thi.
slug: /cpp/thuat-toan/binary-search-answer
category: algorithms
categoryLabel: Thuật toán và Competitive Programming
order: 23090
difficulty: intermediate
keywords: [binary search on answer, monotonic predicate, feasible, parametric search]
updated: 2026-10-22
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/thuat-toan/tim-kiem-sap-xep", "/cpp/thuat-toan/giai-quyet-bai-toan", "/cpp/thuat-toan/do-phuc-tap"]
---

Binary search on answer tìm giá trị nhỏ nhất hoặc lớn nhất thỏa một predicate khả thi đơn điệu. Thay vì tìm phần tử trong dãy, thuật toán tìm ranh giới giữa miền không khả thi và miền khả thi. Ví dụ, nếu một mức tải X cho phép chia công việc cho K người, mọi mức tải lớn hơn cũng cho phép; predicate có dạng false rồi true.

## Ví dụ: chia dãy liên tiếp thành tối đa K nhóm

Tối thiểu hóa tổng lớn nhất của nhóm, với mọi giá trị không âm. Predicate quét một lần để đếm nhóm cần thiết.

```cpp
#include <algorithm>
#include <cstddef>
#include <iostream>
#include <limits>
#include <vector>

bool feasible(const std::vector<int>& tasks, int workers, long long limit) {
    std::size_t groups{1};
    long long current{};
    for (int task : tasks) {
        if (task > limit) return false;
        if (static_cast<long long>(task) > limit - current) {
            ++groups;
            current = task;
            if (groups > static_cast<std::size_t>(workers)) return false;
        } else {
            current += task;
        }
    }
    return groups <= workers;
}

long long minimum_limit(const std::vector<int>& tasks, int workers) {
    if (workers <= 0) return -1;
    if (tasks.empty()) return 0;
    long long low{};
    long long high{};
    for (int task : tasks) {
        if (task < 0) return -1;
        if (high > std::numeric_limits<long long>::max() - task) return -1;
        low = std::max(low, static_cast<long long>(task));
        high += task;
    }
    while (low < high) {
        const long long middle{low + (high - low) / 2};
        if (feasible(tasks, workers, middle)) high = middle;
        else low = middle + 1;
    }
    return low;
}

int main() {
    const std::vector<int> tasks{4, 2, 7, 3};
    std::cout << minimum_limit(tasks, 2) << '\n';
}
```

Với tasks là 4, 2, 7, 3 và hai workers, đáp án là 10: có thể chia thành [4, 2] và [7, 3], còn giới hạn nhỏ hơn 10 không thể gom các phần tử liên tiếp thành tối đa hai nhóm. Hàm trả -1 nếu số workers không hợp lệ, task âm hoặc tổng vượt long long; input rỗng có đáp án quy ước là 0.

Với một limit cố định, feasible quét dãy theo thứ tự và mở nhóm mới ngay trước task làm tổng vượt limit. Vì task không âm, để một nhóm nhận thêm phần tử chỉ có thể làm tổng tăng; cách quét này tạo số nhóm tối thiểu cho limit đó. Tăng limit không thể làm số nhóm tăng, nên predicate đơn điệu. Mỗi lần kiểm tra O(n), binary search trên tổng S cần O(log(S + 1)) lần kiểm tra, tổng O(n log(S + 2)) thời gian và O(1) bộ nhớ phụ.

## Cách tìm biên

- Tối thiểu hóa giá trị có thể: predicate thường false rồi true; tìm first true.
- Tối đa hóa giá trị có thể: predicate thường true rồi false; tìm last true.
- Chọn `low`, `high` bao phủ mọi đáp án; xác định rõ inclusive/half-open interval và điều kiện dừng.

## Lỗi thường gặp

- Predicate không đơn điệu nên binary search mất tính đúng.
- Sai miền tìm hoặc không chứng minh đáp án nằm trong miền.
- Tràn `middle = (low + high) / 2`; dùng `low + (high-low)/2` khi miền không âm.
- Không kiểm tra workers hoặc input rỗng theo hợp đồng bài.

## Giữ bất biến khi tìm biên

Với bài tìm first true, duy trì một đoạn chứa ranh giới cần tìm và một đầu phải đã biết là khả thi. Mỗi lần kiểm tra giữa đoạn, nếu predicate đúng thì thu hẹp về bên trái để tìm giá trị nhỏ hơn; nếu sai thì loại phần trái. Với bài tìm last true, chiều cập nhật đảo lại. Chứng minh đơn điệu và xác định miền bao phủ trước khi chạy vòng lặp giúp tránh trả về một giá trị ngoài miền đáp án.

## Đọc tiếp

Ôn [binary search cơ bản](/cpp/thuat-toan/tim-kiem-sap-xep) và [đọc constraint](/cpp/thuat-toan/giai-quyet-bai-toan).
