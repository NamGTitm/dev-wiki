---
title: Iterators và iterator invalidation
description: Duyệt container bằng iterator và nhận biết khi thao tác làm iterator hoặc reference mất hiệu lực.
slug: /cpp/stl/iterators-invalidation
category: modern
categoryLabel: STL và C++ hiện đại
order: 22050
difficulty: intermediate
keywords: [iterator, iterator invalidation, vector reallocation, erase, rehash]
updated: 2026-10-20
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/stl/sequence-containers", "/cpp/stl/stl-algorithms", "/cpp/ky-thuat/ub-memory-safety"]
---

Iterator là đối tượng giống con trỏ dùng để đi qua phần tử container. Nhiều thuật toán STL nhận cặp iterator `[first, last)`. Mỗi container quy định thao tác nào làm iterator, pointer hoặc reference mất hiệu lực.

## Ví dụ duyệt và xóa an toàn

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> values{1, 2, 3, 4};
    for (auto it = values.begin(); it != values.end();) {
        if (*it % 2 == 0) it = values.erase(it);
        else ++it;
    }
    for (int value : values) std::cout << value << ' ';
}
```

`erase` trả iterator tới phần tử kế tiếp. Tăng iterator cũ sau khi xóa có thể là lỗi.

## Quy tắc cần nhớ

```text
vector: reallocation làm mất mọi iterator/pointer/reference; erase làm mất từ vị trí xóa trở đi.
deque: chèn/xóa có quy tắc phức tạp; kiểm tra đúng thao tác và vị trí.
list: iterator tới phần tử khác vẫn hợp lệ khi chèn; xóa chỉ làm mất iterator tới phần tử bị xóa.
map/set: iterator tới phần tử khác vẫn hợp lệ khi insert; erase làm mất iterator bị xóa.
unordered_map/set: rehash làm mất iterator; reference/pointer tới phần tử thường vẫn giữ, nhưng không dựa vào iterator cũ.
```

Đây là tóm tắt, không thay thế quy tắc của từng overload/thao tác. Khi sửa container trong vòng lặp, đọc giá trị trả về của `erase` và không dùng iterator cũ.

## Lỗi thường gặp

- Giữ `auto& item = v[0]`, rồi thêm phần tử khiến vector reallocate.
- Dùng range-based for và đồng thời xóa phần tử khỏi container.
- Dùng iterator tới element đã xóa.
- Cho rằng `reserve()` bảo vệ iterator cho mọi số lần thêm; chỉ tránh reallocation đến khi capacity bị vượt.

## Tự luyện

Xóa mọi số chẵn khỏi vector theo ví dụ. Sau đó giải thích iterator nào còn hợp lệ nếu chèn một phần tử vào giữa vector và vào giữa list.

## Đọc tiếp

Xem [sequence containers](/cpp/stl/sequence-containers) và [an toàn bộ nhớ](/cpp/ky-thuat/ub-memory-safety).
