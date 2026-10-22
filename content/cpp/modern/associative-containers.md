---
title: Associative containers
description: Lưu key có thứ tự bằng set, map, multiset và multimap.
slug: /cpp/stl/associative-containers
category: modern
categoryLabel: STL và C++ hiện đại
order: 22020
difficulty: intermediate
keywords: [set, map, multiset, multimap, ordered container, logarithmic lookup]
updated: 2026-10-22
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/stl/unordered-containers", "/cpp/stl/stl-algorithms", "/cpp/stl/container-adapters"]
---

Associative containers lưu phần tử theo key và duy trì thứ tự theo comparator. Dùng chúng khi cần duyệt có thứ tự, truy vấn một khoảng key, hoặc tìm phần tử nhỏ nhất/lớn nhất mà không phải sắp xếp lại sau mỗi lần cập nhật.

## Bốn loại chính

| Container | Quan hệ giữa key | Phần tử lưu |
|---|---|---|
| `std::set<Key>` | Mỗi key xuất hiện một lần | Key |
| `std::multiset<Key>` | Cho phép key tương đương lặp lại | Key |
| `std::map<Key, Value>` | Mỗi key xuất hiện một lần | Cặp key và value |
| `std::multimap<Key, Value>` | Cho phép nhiều phần tử cùng key | Cặp key và value |

`map` và `set` thường được triển khai bằng cây cân bằng. Tìm, chèn và xóa có độ phức tạp O(log n). Iterator duyệt theo thứ tự comparator; mặc định là thứ tự tăng theo `std::less<Key>`.

## Tra cứu và cập nhật map

```cpp
#include <iostream>
#include <map>
#include <string>

int main() {
    std::map<std::string, int> scores{
        {"An", 8}, {"Binh", 9}
    };

    if (const auto found = scores.find("An");
        found != scores.end()) {
        std::cout << found->second << '\n';
    }

    scores.try_emplace("Chi", 10);
    std::cout << scores.size() << '\n';
}
```

`find` trả `end()` nếu không có key. Trong C++17, `try_emplace` chèn cặp mới nếu key chưa tồn tại và không ghi đè value cũ khi key đã có.

`map[key]` có hành vi cập nhật: nếu key chưa tồn tại, nó chèn key cùng value mặc định rồi trả reference tới value. Đây là tiện ích khi chủ động muốn chèn, nhưng không phù hợp cho nhánh chỉ đọc. Dùng `find`, hoặc `contains` từ C++20, để tra cứu mà không tạo entry ngoài ý muốn.

## Comparator xác định key tương đương

Container có thứ tự không nhất thiết dùng `operator==` để quyết định tính duy nhất. Hai key được xem là tương đương khi comparator cho kết quả false theo cả hai hướng: `comp(a, b)` và `comp(b, a)` đều false.

Comparator phải tạo strict weak ordering. Nếu quy tắc so sánh mâu thuẫn với cách phần còn lại của chương trình hiểu key, một số phần tử có thể bị coi là cùng key hoặc thứ tự tìm kiếm không còn đúng.

Iterator tới phần tử trong `map`/`set` không cho phép sửa key tại chỗ, vì thay đổi key có thể phá thứ tự của container. Với `map`, value vẫn có thể sửa qua iterator.

## Truy vấn khoảng

`lower_bound(key)` trả iterator đầu tiên có key không đứng trước `key`; `upper_bound(key)` trả iterator đầu tiên mà `key` đứng trước key của phần tử. Hai hàm này cho phép tìm ranh giới trong O(log n).

Với `multiset` hoặc `multimap`, `equal_range(key)` trả cặp iterator bao trọn các phần tử tương đương với key. Ví dụ, điều này hữu ích khi một mã danh mục gắn với nhiều bản ghi.

```cpp
#include <iostream>
#include <map>

int main() {
    std::multimap<int, char> groups{
        {2, 'a'}, {1, 'x'}, {2, 'b'}, {3, 'z'}
    };

    const auto [first, last] = groups.equal_range(2);
    for (auto it = first; it != last; ++it) {
        std::cout << it->second << ' ';
    }
    std::cout << '\n';
}
```

Kết quả của ví dụ là `a b`. Với `multimap` và `multiset`, các thao tác chèn/xóa giữ thứ tự tương đối của những phần tử có key tương đương ([quy tắc associative containers](https://eel.is/c++draft/associative.reqmts.general)). Nếu nghiệp vụ cần tie-break rõ ràng, hãy đưa điều kiện đó vào key hoặc comparator thay vì để thứ tự chèn ngầm quyết định kết quả.

## Khi nào chọn ordered container?

Chọn `map` hoặc `set` khi cần một hay nhiều điều sau:

- Kết quả duyệt phải có thứ tự theo key.
- Cần truy vấn key trong một khoảng.
- Cần lấy phần tử nhỏ nhất/lớn nhất có sẵn.
- Muốn hiệu năng tìm/chèn/xóa O(log n) ổn định theo số phần tử.

Nếu chỉ cần kiểm tra membership hay tra cứu key và không cần thứ tự, so sánh với [unordered containers](/cpp/stl/unordered-containers). Hash table có tìm kiếm trung bình O(1), nhưng worst case O(n).

## Lỗi thường gặp

- Dùng `operator[]` trong nhánh chỉ đọc rồi vô tình chèn key.
- Nghĩ `set` xác định tính duy nhất theo `operator==` thay vì comparator.
- Thay comparator khiến thứ tự không còn strict weak ordering.
- Mong giữ thứ tự chèn; `map` và `set` sắp theo comparator.
- Duyệt lặp qua map bằng cách giữ iterator sau khi phần tử đó bị xóa.

## Đọc tiếp

So sánh với [unordered containers](/cpp/stl/unordered-containers), xem [STL algorithms](/cpp/stl/stl-algorithms) và dùng [container adapters](/cpp/stl/container-adapters) khi cần chính sách truy cập hạn chế.
