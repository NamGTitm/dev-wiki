---
title: Multithreading và concurrency cơ bản
description: Chia công việc qua thread, đồng bộ dữ liệu chia sẻ và phòng data race, deadlock.
slug: /cpp/ky-thuat/concurrency
category: engineering
categoryLabel: Kỹ nghệ phần mềm C++
order: 24070
difficulty: advanced
keywords: [std::thread, mutex, concurrency, data race, deadlock, atomic]
updated: 2026-10-20
collection: cpp
collectionLabel: C++
collectionDescription: Cách xây dựng, kiểm tra, debug và bảo vệ ứng dụng C++ có thể bảo trì.
related: ["/cpp/ky-thuat/ub-memory-safety", "/cpp/ky-thuat/profiling-performance", "/cpp/stl/cpp17-20-23"]
---

Concurrency cho phép nhiều task tiến triển chồng lấp; multithreading chạy task trên thread hệ điều hành. Dùng khi workload có thể chia độc lập hoặc cần tránh chặn luồng chính, sau khi đo thấy lợi ích.

## Đồng bộ dữ liệu chia sẻ

```cpp
#include <iostream>
#include <mutex>
#include <thread>
#include <vector>

int main() {
    std::mutex guard;
    int total{};
    std::vector<std::thread> workers;
    for (int i = 0; i < 4; ++i) {
        workers.emplace_back([&] {
            std::lock_guard<std::mutex> lock{guard};
            ++total;
        });
    }
    for (auto& worker : workers) worker.join();
    std::cout << total << '\n';
}
```

`lock_guard` khóa khi vào scope và mở khóa khi rời scope. Mọi truy cập đồng thời vào shared mutable data phải được đồng bộ đúng; data race là UB. C++20 có `std::jthread` hỗ trợ join tự động và stop token, nhưng không xóa nhu cầu thiết kế synchronization.

## Thiết kế an toàn

- Ưu tiên chia ownership/dữ liệu bất biến trước khi chia sẻ mutable state.
- Giữ critical section ngắn, nhất quán thứ tự khóa để giảm deadlock.
- Không detach thread nếu không có lifecycle/ownership rõ.
- Đừng capture reference đến local vào task có thể sống lâu hơn local.
- Atomic dành cho trạng thái đơn giản; nó không tự làm nhiều biến thành một transaction.

## Lỗi thường gặp

- Tăng biến chung không có mutex/atomic.
- Quên join thread trước khi `std::thread` destructor chạy, gây `std::terminate`.
- Hai thread lấy mutex theo thứ tự khác nhau và deadlock.
- Giả định thread luôn nhanh hơn; scheduling và synchronization có chi phí.

## Tự luyện

Chia một mảng lớn thành các đoạn độc lập, tính tổng từng phần rồi gộp. So sánh kết quả với bản tuần tự và đo thời gian; xác định cách xử lý số phần tử không chia hết.

## Đọc tiếp

Tìm hiểu [undefined behavior](/cpp/ky-thuat/ub-memory-safety), [profiling](/cpp/ky-thuat/profiling-performance) và [C++20 `jthread`](/cpp/stl/cpp17-20-23).
