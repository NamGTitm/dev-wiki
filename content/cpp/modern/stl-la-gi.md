---
title: Standard Template Library là gì?
description: Hiểu vai trò của containers, iterators, algorithms và function objects trong STL.
slug: /cpp/stl/stl-la-gi
category: modern
categoryLabel: STL và C++ hiện đại
order: 22000
difficulty: intermediate
keywords: [STL, standard library, container, iterator, algorithm, function object]
updated: 2026-10-20
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/stl/sequence-containers", "/cpp/stl/stl-algorithms", "/cpp/stl/iterators-invalidation"]
---

STL là tên gọi phổ biến cho phần thư viện chuẩn xoay quanh containers, iterators, algorithms và function objects. Dùng nó để tận dụng code đã chuẩn hóa, được kiểm tra rộng rãi và thường hiệu quả hơn cấu trúc tự viết.

## Bốn mảnh ghép

- **Container** giữ dữ liệu: `std::vector`, `std::map`, `std::unordered_set`.
- **Iterator** chỉ vị trí trong dãy để nối container với thuật toán.
- **Algorithm** thao tác trên khoảng iterator: `std::sort`, `std::find`, `std::count`.
- **Callable** như lambda hoặc function object cung cấp quy tắc so sánh/lọc.

```cpp
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
    std::vector<int> values{4, 1, 3, 1};
    std::sort(values.begin(), values.end());
    const auto ones{std::count(values.begin(), values.end(), 1)};
    std::cout << ones << '\n';
}
```

Thuật toán nhận range `[first, last)`: gồm `first`, không gồm `last`. Quy ước này giúp range rỗng biểu diễn bằng hai iterator bằng nhau.

## Chọn theo thao tác

Hỏi trước: có cần truy cập theo chỉ số, cần giữ thứ tự, cần tra cứu theo key, hay cần lấy phần tử ưu tiên? Câu trả lời quyết định container phù hợp. Bắt đầu với [`vector`](/cpp/stl/sequence-containers) nếu chưa có lý do cụ thể chọn cấu trúc khác.

## Lỗi thường gặp

- Dùng container không phù hợp khiến thao tác thường gặp chậm.
- Truyền sai range hoặc dùng iterator đã mất hiệu lực.
- Giả định thứ tự của `unordered_map` ổn định.
- Tự viết thuật toán đã có trong `<algorithm>` nhưng bỏ sót trường hợp biên.

## Tự luyện

Tạo vector số, sắp xếp, tìm số lần xuất hiện của một giá trị và tìm vị trí đầu tiên có giá trị không nhỏ hơn `x` bằng `lower_bound`.

## Đọc tiếp

So sánh [sequence containers](/cpp/stl/sequence-containers), [associative containers](/cpp/stl/associative-containers) và [STL algorithms](/cpp/stl/stl-algorithms).
