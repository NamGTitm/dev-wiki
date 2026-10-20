---
title: Container adapters
description: Dùng stack, queue và priority_queue qua API hạn chế theo chính sách truy cập.
slug: /cpp/stl/container-adapters
category: modern
categoryLabel: STL và C++ hiện đại
order: 22040
difficulty: intermediate
keywords: [stack, queue, priority_queue, container adapter, heap]
updated: 2026-10-20
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/stl/sequence-containers", "/cpp/stl/stl-algorithms", "/cpp/thuat-toan/do-thi"]
---

Container adapter cung cấp một API nhỏ trên container bên dưới. Chọn nó khi quy tắc truy cập quan trọng hơn việc thao tác tùy ý lên mọi phần tử.

## Ba adapter

- `std::stack<T>`: LIFO; `top`, `push`, `pop`.
- `std::queue<T>`: FIFO; `front`, `back`, `push`, `pop`.
- `std::priority_queue<T>`: lấy phần tử ưu tiên nhất bằng `top`; mặc định là max-heap.

```cpp
#include <functional>
#include <iostream>
#include <queue>
#include <stack>
#include <vector>

int main() {
    std::stack<int> history;
    history.push(1);
    history.push(2);

    std::queue<int> jobs;
    jobs.push(10);
    jobs.push(20);

    std::priority_queue<int, std::vector<int>, std::greater<int>> smallest_first;
    smallest_first.push(8);
    smallest_first.push(3);
    std::cout << history.top() << ' ' << jobs.front() << ' ' << smallest_first.top() << '\n';
}
```

`pop()` chỉ xóa phần tử, không trả về nó; đọc `top()`/`front()` trước khi pop và kiểm tra `empty()` trước khi truy cập. Priority queue với comparator `std::greater` đưa giá trị nhỏ nhất lên đầu.

## Độ phức tạp

Stack/queue thao tác hai đầu thường O(1). Priority queue `top()` O(1), `push()`/`pop()` O(log n). Không thể duyệt priority queue theo thứ tự ưu tiên bằng iterator; nếu cần toàn bộ thứ tự, pop lần lượt hoặc sort một bản sao.

## Lỗi thường gặp

- Gọi `top`, `front` hoặc `pop` trên adapter rỗng.
- Mong `pop()` trả phần tử đã xóa.
- Nhầm comparator min-heap/max-heap.

## Tự luyện

Mô phỏng hàng đợi phục vụ theo thứ tự đến bằng `queue`, rồi đổi sang `priority_queue` để phục vụ điểm ưu tiên cao nhất. Chọn tie-break rõ ràng.

## Đọc tiếp

Xem cách sử dụng adapter trong [BFS và đồ thị](/cpp/thuat-toan/do-thi) và [STL algorithms](/cpp/stl/stl-algorithms).
