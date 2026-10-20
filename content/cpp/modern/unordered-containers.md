---
title: Unordered containers
description: Dùng unordered_map và unordered_set cho tra cứu theo hash khi không cần thứ tự.
slug: /cpp/stl/unordered-containers
category: modern
categoryLabel: STL và C++ hiện đại
order: 22030
difficulty: intermediate
keywords: [unordered_map, unordered_set, hash table, hash, average complexity]
updated: 2026-10-20
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/stl/associative-containers", "/cpp/stl/stl-algorithms", "/cpp/thuat-toan/do-phuc-tap"]
---

`std::unordered_map` và `std::unordered_set` dùng hash table để tra cứu key mà không duy trì thứ tự. Chúng hữu ích cho membership test, đếm tần suất và cache khi không cần duyệt theo key đã sắp xếp.

## Ví dụ đếm tần suất

```cpp
#include <iostream>
#include <string>
#include <unordered_map>
#include <vector>

int main() {
    const std::vector<std::string> words{"cpp", "stl", "cpp"};
    std::unordered_map<std::string, int> frequency;
    for (const auto& word : words) ++frequency[word];
    std::cout << frequency.at("cpp") << '\n';
}
```

Tra cứu/thêm/xóa trung bình thường O(1), nhưng worst case có thể O(n). Hash quality, collisions, load factor và rehash ảnh hưởng hiệu năng. Thứ tự iterator không được đảm bảo và có thể đổi sau rehash.

## Custom key

Key tự định nghĩa cần hash nhất quán với equality: nếu hai key bằng nhau thì hash phải giống nhau. Sai điều kiện này làm container không tìm key theo mong đợi. Đừng dùng hash như chứng minh hai giá trị bằng nhau.

## Lỗi thường gặp

- Dựa vào thứ tự in của unordered container trong output yêu cầu cố định.
- Giữ iterator qua thao tác có thể rehash.
- Tin rằng hash table luôn O(1) hoặc không có rủi ro hash collision.
- Cài `operator==` và hash với tiêu chí khác nhau.

## Tự luyện

Kiểm tra xem danh sách số có phần tử trùng không bằng `unordered_set`. Phân tích trường hợp danh sách rỗng và độ phức tạp trung bình/worst case.

## Đọc tiếp

So sánh với [map và set có thứ tự](/cpp/stl/associative-containers) và học [độ phức tạp](/cpp/thuat-toan/do-phuc-tap).
