---
title: Sequence containers
description: Chọn vector, array, deque, list hoặc forward_list theo nhu cầu lưu trữ và thao tác.
slug: /cpp/stl/sequence-containers
category: modern
categoryLabel: STL và C++ hiện đại
order: 22010
difficulty: intermediate
keywords: [vector, array, deque, list, forward_list, sequence container, complexity]
updated: 2026-10-22
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/stl/stl-la-gi", "/cpp/stl/iterators-invalidation", "/cpp/trung-cap/vector-struct-enum"]
---

Sequence container lưu phần tử theo một thứ tự tuyến tính. Mỗi loại đánh đổi cách lưu trữ, truy cập và chèn/xóa. Với đa số danh sách có kích thước thay đổi, `std::vector` là điểm bắt đầu hợp lý; chọn loại khác khi yêu cầu thao tác cụ thể biện minh cho lựa chọn đó.

## So sánh nhanh

| Container | Truy cập theo chỉ số | Thêm/xóa ở hai đầu | Chèn/xóa giữa | Đặc điểm chính |
|---|---:|---:|---:|---|
| `std::array<T, N>` | O(1) | Không đổi kích thước | Không đổi kích thước | Kích thước cố định tại compile time, phần tử liên tục |
| `std::vector<T>` | O(1) | Cuối amortized O(1) | O(n) do dịch phần tử | Lưu liên tục, locality tốt |
| `std::deque<T>` | O(1) | Đầu/cuối O(1) | O(n) | Thêm hai đầu thuận tiện, không liên tục như vector |
| `std::list<T>` | Không có | O(1) khi ở đầu/cuối | O(1) khi đã có iterator | Liên kết hai chiều, mỗi node có chi phí cấp phát |
| `std::forward_list<T>` | Không có | O(1) ở đầu | O(1) sau vị trí đã biết | Liên kết một chiều, API nhỏ hơn `list` |

Các độ phức tạp mô tả thao tác của container; tìm vị trí cần chèn trong `list` vẫn tốn O(n). O(1) không đồng nghĩa thao tác luôn nhanh hơn trên dữ liệu thật: cấp phát node và cache locality có ảnh hưởng đáng kể.

`std::basic_string` cũng quản lý một dãy ký tự và có API chuyên cho văn bản. Không nên xem `std::vector<char>` là thay thế trực tiếp cho `std::string`.

## Dùng vector có chủ đích

`std::vector<T>` lưu phần tử liên tục trong bộ nhớ, nên phù hợp khi cần duyệt, truy cập chỉ số, truyền vùng dữ liệu cho API hoặc thêm phần tử cuối. `push_back` có độ phức tạp amortized O(1): thỉnh thoảng cần cấp vùng nhớ lớn hơn và chuyển phần tử hiện có.

Hai thuộc tính thường bị nhầm:

- `size()` là số phần tử hiện có.
- `capacity()` là số phần tử có thể chứa trước khi cần cấp phát lại.

`reserve(n)` tăng capacity tối thiểu mà không thay đổi số phần tử. `resize(n)` thay đổi size; nếu tăng, nó tạo thêm phần tử. `reserve` có thể giảm số lần cấp phát khi biết gần đúng kích thước, nhưng không biến chèn giữa thành O(1).

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> values;
    values.reserve(4);
    values.push_back(10);
    values.push_back(20);

    std::cout << values.size() << ' '
              << values.capacity() << '\n';
}
```

`capacity()` tối thiểu là 4 trong ví dụ này, còn `size()` là 2. Giá trị capacity chính xác sau các lần thêm tiếp theo do implementation quyết định.

## Các lựa chọn khác

- **`std::array<T, N>`**: dùng khi kích thước cố định đã biết lúc biên dịch. Nó vẫn có `begin()`, `end()` và `size()`, nên dùng được với nhiều algorithm chuẩn.
- **`std::deque<T>`**: cân nhắc khi thao tác thường xuyên ở cả đầu và cuối. Nó hỗ trợ truy cập chỉ số nhưng không đảm bảo toàn bộ phần tử nằm trong một vùng liên tục.
- **`std::list<T>`**: hữu ích khi thường xuyên chèn/xóa tại vị trí đã có iterator và cần iterator tới phần tử khác tiếp tục hợp lệ. Dùng nó chỉ vì nghĩ “chèn O(1)” thường sai nếu chương trình phải tìm vị trí trước.
- **`std::forward_list<T>`**: phù hợp cho danh sách một chiều nhẹ khi chỉ cần duyệt tới trước và thêm/xóa quanh vị trí đã biết. Nó không có `size()` trong C++17.
- **`std::string`**: dùng cho văn bản; xem thêm các bài về chuỗi để hiểu encoding và các thao tác chuyên biệt.

Ví dụ dưới đây cho thấy cùng một vòng range-based for có thể duyệt các container khác nhau:

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

    std::cout << dynamic.size() + ends.size()
              + linked.size() << '\n';
}
```

## Chọn theo yêu cầu

- Chọn `vector` khi cần duyệt tuần tự, truy cập chỉ số hoặc làm việc với phần lớn algorithm.
- Chọn `deque` khi thêm/xóa hai đầu là thao tác quan trọng.
- Chọn `array` cho số phần tử cố định.
- Chọn `list` hoặc `forward_list` khi có nhu cầu cụ thể về ổn định iterator và thao tác tại vị trí đã biết.
- Nếu cần hàng đợi, ngăn xếp hoặc hàng đợi ưu tiên với API hạn chế, cân nhắc [container adapters](/cpp/stl/container-adapters).

Trước khi chọn, ghi rõ thao tác thường gặp, số lượng phần tử, yêu cầu ổn định iterator và cách dữ liệu được duyệt. Nếu chưa có dữ liệu hiệu năng cho thấy lựa chọn khác tốt hơn, `vector` thường có lợi thế nhờ locality và giao diện đơn giản.

## Lỗi thường gặp

- Dùng `list` với hy vọng tìm kiếm hoặc truy cập vị trí bất kỳ là O(1).
- Coi `reserve()` là thêm phần tử hoặc thay cho `resize()`.
- Giữ iterator, pointer hay reference sau thao tác có thể làm chúng mất hiệu lực.
- Cho rằng `deque` có vùng nhớ liên tục như `vector`.
- Giả định một độ phức tạp tốt hơn luôn đồng nghĩa chạy nhanh hơn.

Quy tắc phụ thuộc container và thao tác cụ thể; xem [iterator invalidation](/cpp/stl/iterators-invalidation) trước khi lưu iterator qua các lần sửa dữ liệu.

## Đọc tiếp

Tra cứu [associative containers](/cpp/stl/associative-containers), [container adapters](/cpp/stl/container-adapters) và cách dùng `vector` trong [bài về vector](/cpp/trung-cap/vector-struct-enum).
