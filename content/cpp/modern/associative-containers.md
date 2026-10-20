---
title: Associative containers
description: Lưu key có thứ tự bằng set, map, multiset và multimap.
slug: /cpp/stl/associative-containers
category: modern
categoryLabel: STL và C++ hiện đại
order: 22020
difficulty: intermediate
keywords: [set, map, multiset, multimap, ordered container, logarithmic lookup]
updated: 2026-10-20
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/stl/unordered-containers", "/cpp/stl/stl-algorithms", "/cpp/stl/container-adapters"]
---

Associative containers lưu key theo thứ tự so sánh. Chúng phù hợp khi cần duyệt có thứ tự, tìm min/max hoặc truy vấn khoảng.

## Chọn container

- `std::set<Key>`: key duy nhất.
- `std::multiset<Key>`: cho phép key trùng.
- `std::map<Key, Value>`: ánh xạ key duy nhất sang value.
- `std::multimap<Key, Value>`: một key có thể xuất hiện nhiều lần.

Thao tác tìm, thêm, xóa thường O(log n) với cấu trúc cân bằng. Iterator duyệt theo thứ tự comparator, mặc định tăng dần.

```cpp
#include <iostream>
#include <map>
#include <set>
#include <string>

int main() {
    std::set<int> unique_values{4, 1, 4};
    std::map<std::string, int> scores{{"An", 8}, {"Binh", 9}};
    if (const auto found = scores.find("An"); found != scores.end()) {
        std::cout << found->second << '\n';
    }
    std::cout << unique_values.size() << '\n';
}
```

`map[key]` chèn key mặc định nếu chưa tồn tại. Dùng `find` hoặc `contains` từ C++20 khi chỉ muốn tra cứu; điều này tránh vô tình tạo entry.

## Range query

`lower_bound(key)` tìm iterator đầu tiên không nhỏ hơn key; `upper_bound(key)` tìm đầu tiên lớn hơn key. Trên `multiset`, hai hàm này xác định range của key lặp.

## Lỗi thường gặp

- Dùng `operator[]` trong nhánh chỉ đọc rồi âm thầm chèn key.
- Thay comparator khiến hai key bị xem là tương đương trong khi logic chương trình coi chúng khác nhau.
- Mong giữ thứ tự insert; map/set sắp xếp theo comparator.

## Tự luyện

Đếm số lần xuất hiện mỗi từ bằng `std::map<std::string, int>`. Sau đó in kết quả theo alphabet và so sánh với yêu cầu nếu không cần thứ tự.

## Đọc tiếp

Nếu không cần thứ tự, xem [unordered containers](/cpp/stl/unordered-containers). Để chọn hàng đợi ưu tiên, xem [adapters](/cpp/stl/container-adapters).
