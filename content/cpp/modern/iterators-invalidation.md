---
title: Iterators và iterator invalidation
description: Duyệt container bằng iterator và nhận biết khi thao tác làm iterator hoặc reference mất hiệu lực.
slug: /cpp/stl/iterators-invalidation
category: modern
categoryLabel: STL và C++ hiện đại
order: 22050
difficulty: intermediate
keywords: [iterator, iterator invalidation, vector reallocation, erase, rehash]
updated: 2026-10-22
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/stl/sequence-containers", "/cpp/stl/stl-algorithms", "/cpp/ky-thuat/ub-memory-safety"]
---

Iterator là đối tượng cho phép duyệt hoặc truy cập phần tử theo giao diện của container. Nhiều algorithm chuẩn nhận cặp iterator biểu diễn khoảng `[first, last)`. Sau khi sửa container, iterator, pointer hoặc reference đã lưu có thể mất hiệu lực; dùng chúng tiếp tục có thể dẫn đến hành vi không xác định.

## Xóa an toàn khi đang duyệt vector

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> values{1, 2, 3, 4};
    for (auto it = values.begin(); it != values.end();) {
        if (*it % 2 == 0) {
            it = values.erase(it);
        } else {
            ++it;
        }
    }

    for (int value : values) {
        std::cout << value << ' ';
    }
    std::cout << '\n';
}
```

`erase` trả iterator tới phần tử theo sau phần tử đã xóa, hoặc `end()` nếu không còn phần tử nào. Iterator cũ đã bị xóa; không tăng hoặc dereference nó. Trong C++20 có thể dùng `std::erase_if` cho nhiều container tuần tự nếu cách lọc phù hợp.

## Quy tắc tổng quát theo container

| Container | Thao tác | Ảnh hưởng thường cần nhớ |
|---|---|---|
| `vector` | Reallocation | Mọi iterator, pointer và reference tới phần tử đều mất hiệu lực |
| `vector` | Chèn không reallocate | Iterator/reference tại hoặc sau vị trí chèn bị ảnh hưởng; `end()` cũng đổi |
| `vector` | `erase` | Iterator/reference tại hoặc sau vị trí xóa bị mất hiệu lực |
| `deque` | Chèn/xóa | Quy tắc phụ thuộc vị trí và thao tác; kiểm tra đúng thao tác cụ thể |
| `list`, `forward_list` | Chèn | Iterator tới phần tử hiện có vẫn hợp lệ |
| `list`, `forward_list` | Xóa | Chỉ iterator/reference tới phần tử bị xóa mất hiệu lực |
| `map`, `set` | Chèn | Iterator tới phần tử hiện có vẫn hợp lệ |
| `map`, `set` | Xóa | Chỉ iterator/reference tới phần tử bị xóa mất hiệu lực |
| `unordered_map`, `unordered_set` | Rehash | Mọi iterator mất hiệu lực; pointer/reference tới phần tử còn lại vẫn hợp lệ |
| `unordered_map`, `unordered_set` | Xóa | Iterator/reference/pointer tới phần tử bị xóa mất hiệu lực |

Đây là quy tắc tổng quát để định hướng, không thay cho hợp đồng của overload cụ thể. `deque` đặc biệt dễ nhầm: chèn ở đầu/cuối và chèn giữa có quy tắc khác nhau, iterator và reference cũng có thể chịu ảnh hưởng khác nhau.

## Iterator, pointer và reference không giống nhau

- **Iterator** là giao diện duyệt của container; có thể bị vô hiệu hóa dù phần tử vẫn còn tồn tại.
- **Reference** và **pointer** truy cập trực tiếp một phần tử; một số container giữ chúng hợp lệ qua thao tác làm iterator mất hiệu lực.
- **`end()`** là mốc kết thúc, không phải iterator trỏ tới phần tử cuối. Thêm phần tử có thể làm iterator kết thúc cũ không còn dùng được.

Đừng suy luận rằng một loại handle còn hợp lệ chỉ vì loại khác vẫn hợp lệ. Tra hợp đồng container nếu lưu bất kỳ iterator, pointer hoặc reference qua thao tác sửa đổi.

## Những trường hợp dễ lỗi

- Giữ `auto& item = values[0]` rồi thêm phần tử khiến `vector` reallocate.
- Dùng range-based for và đồng thời xóa phần tử khỏi chính container đang duyệt.
- Xóa phần tử rồi tiếp tục tăng iterator cũ.
- Cho rằng `reserve()` bảo vệ iterator trước mọi lần chèn. Nó chỉ giúp tránh reallocation cho tới khi capacity hiện có bị vượt; chèn giữa vẫn có thể làm mất hiệu lực từ vị trí chèn trở đi.
- Giữ iterator của unordered container qua thao tác có thể rehash.

Khi cần thêm phần tử trong lúc duyệt, thiết kế vòng lặp theo quy tắc invalidation của container. Với thao tác xóa, ưu tiên iterator mà `erase` trả về hoặc API lọc phù hợp thay vì tăng iterator đã bị hủy.

## Đọc tiếp

Xem chi tiết lựa chọn container trong [sequence containers](/cpp/stl/sequence-containers), cách dùng [STL algorithms](/cpp/stl/stl-algorithms) và các lỗi về [an toàn bộ nhớ](/cpp/ky-thuat/ub-memory-safety).
