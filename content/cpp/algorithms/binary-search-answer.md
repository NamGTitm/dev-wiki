---
title: Binary Search on Answer
description: Tối ưu giá trị bằng cách tìm ngưỡng đơn điệu và kiểm tra tính khả thi.
slug: /cpp/thuat-toan/binary-search-answer
category: algorithms
categoryLabel: Thuật toán và Competitive Programming
order: 23090
difficulty: intermediate
keywords: [binary search on answer, monotonic predicate, feasible, parametric search]
updated: 2026-10-20
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/thuat-toan/tim-kiem-sap-xep", "/cpp/thuat-toan/giai-quyet-bai-toan", "/cpp/thuat-toan/do-phuc-tap"]
---

Binary search on answer tối ưu một giá trị khi có predicate khả thi đơn điệu. Ví dụ: nếu giới hạn tải X cho phép chia công việc cho K người, thì giới hạn lớn hơn cũng cho phép.

## Ví dụ: chia dãy liên tiếp thành tối đa K nhóm

Tối thiểu hóa tổng lớn nhất của nhóm, với mọi giá trị không âm. Predicate quét một lần để đếm nhóm cần thiết.

```cpp
#include <algorithm>
#include <iostream>
#include <vector>

bool feasible(const std::vector<int>& tasks, int workers, long long limit) {
    int groups{1};
    long long current{};
    for (int task : tasks) {
        if (task > limit) return false;
        if (current + task > limit) {
            ++groups;
            current = task;
        } else {
            current += task;
        }
    }
    return groups <= workers;
}

long long minimum_limit(const std::vector<int>& tasks, int workers) {
    if (tasks.empty()) return 0;
    long long low{};
    long long high{};
    for (int task : tasks) {
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

Độ phức tạp O(n log S), với S là tổng công việc; bộ nhớ phụ O(1). Code giả định `workers > 0`, task không âm và tổng vừa `long long`; production cần xác thực các giả định này.

## Cách tìm biên

- Tối thiểu hóa giá trị có thể: predicate thường false rồi true; tìm first true.
- Tối đa hóa giá trị có thể: predicate thường true rồi false; tìm last true.
- Chọn `low`, `high` bao phủ mọi đáp án; xác định rõ inclusive/half-open interval và điều kiện dừng.

## Lỗi thường gặp

- Predicate không đơn điệu nên binary search mất tính đúng.
- Sai miền tìm hoặc không chứng minh đáp án nằm trong miền.
- Tràn `middle = (low + high) / 2`; dùng `low + (high-low)/2` khi miền không âm.
- Không kiểm tra workers hoặc input rỗng theo hợp đồng bài.

## Tự luyện

Tìm tốc độ tối thiểu để hoàn thành các chồng vật trong deadline. Viết predicate, xác định lower/upper bound và chứng minh tính đơn điệu trước khi code.

## Đọc tiếp

Ôn [binary search cơ bản](/cpp/thuat-toan/tim-kiem-sap-xep) và [đọc constraint](/cpp/thuat-toan/giai-quyet-bai-toan).
