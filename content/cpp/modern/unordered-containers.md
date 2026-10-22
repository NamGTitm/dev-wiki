---
title: Unordered containers
description: Dùng unordered_map và unordered_set cho tra cứu theo hash khi không cần thứ tự.
slug: /cpp/stl/unordered-containers
category: modern
categoryLabel: STL và C++ hiện đại
order: 22030
difficulty: intermediate
keywords: [unordered_map, unordered_set, hash table, hash, average complexity]
updated: 2026-10-22
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/stl/associative-containers", "/cpp/stl/stl-algorithms", "/cpp/thuat-toan/do-phuc-tap"]
---

`std::unordered_map` và `std::unordered_set` dùng bảng băm để lưu key mà không duy trì thứ tự theo key. Chúng phù hợp cho tra cứu, kiểm tra membership, đếm tần suất hoặc cache khi thứ tự duyệt không phải yêu cầu.

## Ví dụ đếm tần suất

```cpp
#include <iostream>
#include <string>
#include <unordered_map>
#include <vector>

int main() {
    const std::vector<std::string> words{
        "cpp", "stl", "cpp", "map"
    };

    std::unordered_map<std::string, int> frequency;
    frequency.reserve(words.size());

    for (const auto& word : words) {
        ++frequency[word];
    }

    std::cout << frequency.at("cpp") << '\n';
}
```

Kết quả là `2`. `operator[]` chèn key cùng value mặc định nếu key chưa tồn tại, phù hợp để tăng bộ đếm. `at()` chỉ tra cứu và báo lỗi nếu key không tồn tại.

## Hash, equality và va chạm

Mỗi key được đưa qua hash function để xác định bucket. Nhiều key khác nhau có thể rơi vào cùng bucket; container dùng phép so sánh bằng để phân biệt chúng.

Với kiểu key tùy chỉnh, hash và equality phải nhất quán: **nếu hai key được xem là bằng nhau thì hash của chúng phải bằng nhau**. Chiều ngược lại không bắt buộc; hash bằng nhau không chứng minh key bằng nhau.

Hash cũng cần ổn định trong thời gian key nằm trong container. Không để dữ liệu mà hash/equality phụ thuộc thay đổi khi key đang lưu, vì container có thể không tìm lại được key theo bucket đã chọn.

## Độ phức tạp và hiệu năng

Tra cứu, chèn và xóa thường có độ phức tạp trung bình O(1), nhưng worst case có thể O(n), chẳng hạn khi nhiều key va chạm. Kết quả thật còn tùy hash function, số bucket, load factor, phân bố key, cấp phát và cách chương trình duyệt dữ liệu.

`reserve(n)` yêu cầu container chuẩn bị đủ bucket cho số phần tử dự kiến theo load factor hiện tại, có thể giảm số lần rehash khi thêm nhiều phần tử. Đây không phải bảo đảm thứ tự iterator ổn định. Khi vượt sức chứa phù hợp, container có thể rehash và đổi bố trí bucket.

## Quy tắc iterator và thứ tự

Thứ tự duyệt `unordered_map`/`unordered_set` không được đảm bảo như một thứ tự nghiệp vụ. Nó có thể khác giữa các lần chạy, bản standard library hoặc sau rehash. Nếu output phải xác định, hãy sắp xếp dữ liệu cần in hoặc dùng container có thứ tự.

Rehash làm mất hiệu lực iterator trong container. Pointer và reference tới phần tử không bị rehash làm mất hiệu lực, nhưng phần tử bị xóa thì mọi pointer/reference/iterator trỏ tới chính phần tử đó đều không còn dùng được. Xem thêm [iterator invalidation](/cpp/stl/iterators-invalidation).

## Khi nào chọn unordered container?

Chọn khi chương trình cần tra cứu theo key mà không cần duyệt theo thứ tự và hash/equality của key được xác định đúng. Cân nhắc `map`/`set` nếu cần range query, thứ tự theo comparator, hoặc muốn độ phức tạp logarithmic thay vì phụ thuộc vào phân bố hash.

Với dữ liệu đầu vào do người dùng kiểm soát, va chạm có chủ đích có thể làm hiệu năng xấu đi đáng kể. Khi rủi ro này quan trọng, hãy đánh giá cách tạo hash và giới hạn tài nguyên theo mô hình đe dọa của ứng dụng.

## Lỗi thường gặp

- Dựa vào thứ tự in của unordered container trong output cố định.
- Giữ iterator qua thao tác có thể rehash.
- Tin rằng hash table luôn O(1) hoặc không thể có va chạm.
- Viết hash và equality với tiêu chí không nhất quán.
- Để dữ liệu hash/equality phụ thuộc thay đổi trong khi key vẫn đang nằm trong container.

## Đọc tiếp

So sánh với [map và set có thứ tự](/cpp/stl/associative-containers), xem [độ phức tạp](/cpp/thuat-toan/do-phuc-tap) và dùng [STL algorithms](/cpp/stl/stl-algorithms) trên các range phù hợp.
