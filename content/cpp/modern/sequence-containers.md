---
title: Sequence containers
description: Chọn vector, array, deque hoặc list theo nhu cầu lưu trữ và thao tác.
slug: /cpp/stl/sequence-containers
category: modern
categoryLabel: STL và C++ hiện đại
order: 22010
difficulty: intermediate
keywords: [vector, array, deque, list, sequence container, complexity]
updated: 2026-10-20
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/stl/stl-la-gi", "/cpp/stl/iterators-invalidation", "/cpp/trung-cap/vector-struct-enum"]
---

Sequence container giữ phần tử theo thứ tự. Hầu hết chương trình nên bắt đầu với `std::vector`; chọn container khác khi đặc tính thao tác thực sự cần.

## Các lựa chọn

- `std::vector<T>`: dãy liên tục, truy cập chỉ số O(1), thêm cuối amortized O(1). Tốt cho đa số danh sách.
- `std::array<T, N>`: dãy liên tục kích thước cố định tại compile time; có thể nằm bên trong object chứa nó.
- `std::deque<T>`: thêm/bớt ở hai đầu hiệu quả, truy cập chỉ số O(1), nhưng không lưu liên tục như vector.
- `std::list<T>`: danh sách liên kết hai chiều; chèn/xóa O(1) khi đã có iterator đúng vị trí, nhưng tìm vị trí O(n), truy cập chỉ số không có và locality kém.

```cpp
#include <array>
#include <deque>
#include <iostream>
#include <list>
#include <vector>

int main() {
    std::array<int, 3> fixed{1, 2, 3};
    std::vector<int> dynamic{fixed.begin(), fixed.end()};
    std::deque<int> ends{0, 1, 2};
    ends.push_front(-1);
    std::list<int> linked{1, 2, 3};
    linked.push_back(4);
    std::cout << dynamic.size() + ends.size() + linked.size() << '\n';
}
```

## Chọn container

Dùng `vector` nếu cần duyệt nhanh hoặc truy cập ngẫu nhiên. Dùng `deque` nếu thường xuyên thêm ở hai đầu. Chọn `list` khi cần giữ iterator tới phần tử ổn định qua chèn/xóa và có sẵn vị trí iterator; nếu không, chi phí cấp phát và cache miss thường làm nó kém hơn vector.

## Lỗi thường gặp

- Dùng `list` với hy vọng mọi thao tác đều O(1); tìm kiếm vẫn O(n).
- Coi `reserve()` là tăng số phần tử; nó chỉ tăng capacity.
- Giữ iterator/vector reference sau thao tác có thể reallocate; xem [invalidation](/cpp/stl/iterators-invalidation).

## Tự luyện

Chọn container cho bộ đệm cần đẩy/xóa hai đầu và cho bảng 12 tháng cố định. Nêu thao tác chi phối và lý do chọn.

## Đọc tiếp

Tra cứu [associative containers](/cpp/stl/associative-containers) và [container adapters](/cpp/stl/container-adapters).
