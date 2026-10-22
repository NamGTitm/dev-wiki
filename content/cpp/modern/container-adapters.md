---
title: Container adapters
description: Dùng stack, queue và priority_queue qua API hạn chế theo chính sách truy cập.
slug: /cpp/stl/container-adapters
category: modern
categoryLabel: STL và C++ hiện đại
order: 22040
difficulty: intermediate
keywords: [stack, queue, priority_queue, container adapter, heap]
updated: 2026-10-22
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/stl/sequence-containers", "/cpp/stl/stl-algorithms", "/cpp/thuat-toan/do-thi"]
---

Container adapter cung cấp một giao diện nhỏ trên một container bên dưới. Adapter không cho truy cập tùy ý vào mọi phần tử; nó mã hóa chính sách lấy phần tử phù hợp với cách dùng như ngăn xếp, hàng đợi hoặc hàng đợi ưu tiên.

## Ba adapter phổ biến

| Adapter | Chính sách | Đọc phần tử | Thêm | Xóa |
|---|---|---|---|---|
| `std::stack<T>` | LIFO: vào sau, ra trước | `top()` | `push()` / `emplace()` | `pop()` |
| `std::queue<T>` | FIFO: vào trước, ra trước | `front()`, `back()` | `push()` / `emplace()` | `pop()` |
| `std::priority_queue<T>` | Lấy phần tử ưu tiên nhất trước | `top()` | `push()` / `emplace()` | `pop()` |

Mặc định, `stack` và `queue` dùng `deque` bên dưới; `priority_queue` dùng `vector`. Có thể chọn container nền tương thích khác khi thật sự cần, nhưng người dùng adapter vẫn chỉ truy cập qua API của adapter.

## Ví dụ

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

    std::priority_queue<int, std::vector<int>, std::greater<int>>
        smallest_first;
    smallest_first.push(8);
    smallest_first.push(3);
    smallest_first.push(5);

    std::cout << history.top() << ' '
              << jobs.front() << ' '
              << smallest_first.top() << '\n';
}
```

Kết quả là `2 10 3`: stack trả phần tử mới thêm cuối, queue trả phần tử chờ lâu nhất, còn priority queue với `std::greater<int>` đặt giá trị nhỏ nhất ở đầu.

## Độ phức tạp và cách lấy phần tử

Các thao tác đầu-cuối của `stack` và `queue` thường O(1). Với `priority_queue`, `top()` là O(1), còn `push()` và `pop()` là O(log n) do duy trì heap.

`pop()` chỉ xóa phần tử; nó **không trả về** giá trị vừa xóa. Đọc trước rồi mới xóa:

```cpp
while (!jobs.empty()) {
    const int job = jobs.front();
    jobs.pop();
    // Xử lý job tại đây.
}
```

Luôn kiểm tra `empty()` trước khi gọi `top()`, `front()`, `back()` hoặc `pop()`. Gọi các thao tác này trên adapter rỗng không có kết quả hợp lệ.

`priority_queue` không cung cấp iterator để duyệt toàn bộ phần tử theo thứ tự ưu tiên. Nếu cần xuất toàn bộ thứ tự, có thể pop lần lượt trên bản sao khi chấp nhận chi phí O(n log n), hoặc chọn một cấu trúc dữ liệu khác phù hợp hơn.

## Hiểu comparator của priority_queue

Mặc định, `std::priority_queue<T>` đưa phần tử lớn nhất lên `top()`. Khi truyền `std::greater<T>`, phần tử nhỏ nhất trở thành phần tử ở đầu.

Với kiểu tự định nghĩa, comparator phải mô tả một strict weak ordering nhất quán. Đừng viết comparator theo cảm giác “ưu tiên cao hơn trả true” mà không kiểm tra kết quả thực tế ở `top()`; tên kiểu hoặc biểu thức comparator có thể khiến quy tắc ưu tiên trông ngược với mong đợi.

Nếu nhiều phần tử có cùng mức ưu tiên, `priority_queue` không bảo đảm thứ tự ổn định giữa chúng. Nếu cần tie-break, đưa điều kiện phụ vào kiểu key/comparator, chẳng hạn ưu tiên theo điểm rồi theo thời điểm đến.

## Khi nào dùng adapter?

- Dùng `stack` cho undo history, DFS lặp hoặc xử lý theo thứ tự lồng nhau.
- Dùng `queue` cho BFS, hàng đợi công việc FIFO hoặc mô phỏng phục vụ theo lượt.
- Dùng `priority_queue` cho lịch sự kiện, tìm phần tử ưu tiên nhất hoặc thuật toán cần lấy cực trị lặp lại.

Nếu cần duyệt mọi phần tử, truy cập theo chỉ số hoặc xóa một phần tử tùy ý, adapter không phải lựa chọn phù hợp; dùng container hoặc cấu trúc dữ liệu khác.

## Lỗi thường gặp

- Gọi `top()`, `front()` hoặc `pop()` khi adapter rỗng.
- Mong `pop()` trả về phần tử vừa xóa.
- Nhầm `priority_queue` mặc định là min-heap; mặc định nó đưa giá trị lớn nhất lên đầu.
- Giả định các phần tử cùng ưu tiên được lấy theo thứ tự thêm vào.
- Dùng adapter khi thuật toán cần truy cập mọi phần tử.

## Đọc tiếp

Xem cách dùng queue trong [BFS và đồ thị](/cpp/thuat-toan/do-thi), tìm hiểu [sequence containers](/cpp/stl/sequence-containers) và đối chiếu với [STL algorithms](/cpp/stl/stl-algorithms).
