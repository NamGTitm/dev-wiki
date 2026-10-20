---
title: Phân tích độ phức tạp Big O
description: Ước lượng thời gian và bộ nhớ theo kích thước input để chọn thuật toán phù hợp.
slug: /cpp/thuat-toan/do-phuc-tap
category: algorithms
categoryLabel: Thuật toán và Competitive Programming
order: 23000
difficulty: beginner
keywords: [Big O, time complexity, space complexity, input constraints, algorithm analysis]
updated: 2026-10-20
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/thuat-toan/giai-quyet-bai-toan", "/cpp/thuat-toan/tim-kiem-sap-xep", "/cpp/tra-cuu/stl-containers"]
---

Big O mô tả tốc độ tăng của tài nguyên khi input lớn dần, thường tập trung vào trường hợp xấu nhất. Dùng nó để so sánh hướng giải và đối chiếu giới hạn bài toán; đây không phải số giây chạy thực tế.

## Các mức thường gặp

```text
O(1)       thao tác cố định
O(log n)   mỗi bước giảm input theo tỉ lệ, ví dụ binary search
O(n)       duyệt một lần
O(n log n) sort so sánh thông thường
O(n^2)     hai vòng lặp phụ thuộc n
O(2^n)     duyệt mọi tập con
O(n!)      duyệt mọi hoán vị
```

```cpp
#include <iostream>
#include <vector>

long long sum(const std::vector<int>& values) {
    long long result{};
    for (int value : values) result += value;
    return result;
}

int main() {
    const std::vector<int> values{1, 2, 3};
    std::cout << sum(values) << '\n';
}
```

Thời gian O(n), bộ nhớ phụ O(1), không tính vùng chứa input. Nếu hàm tạo thêm vector n phần tử thì bộ nhớ phụ O(n).

## Quy tắc phân tích

- Bỏ hằng số và số hạng thấp hơn: `3n + 10` là O(n).
- Hai vòng lặp lồng nhau qua n phần tử thường O(n²); vòng lồng qua hai kích thước khác nhau là O(nm).
- Hai đoạn chạy nối tiếp cộng độ phức tạp; lấy mức tăng nhanh nhất.
- Đệ quy phải tính số lời gọi và chi phí mỗi lời gọi.
- Phân biệt worst-case, average-case và amortized khi cấu trúc cần.

## Ràng buộc input

Đọc `n`, giới hạn thời gian, bộ nhớ và miền giá trị trước khi chọn thuật toán. O(n²) với n = 100 có thể hợp lý; với n = 200000 thì thường không. Hằng số, cache và compiler vẫn ảnh hưởng thời gian thực.

## Lỗi thường gặp

- Chỉ phân tích số vòng lặp mà bỏ chi phí thao tác bên trong.
- Gọi truy cập `vector[i]` O(n); với vector nó là O(1), còn `list` không hỗ trợ truy cập chỉ số hiệu quả.
- Bỏ qua bộ nhớ đệ quy, container phụ hoặc bản sao input.
- Dùng Big O để khẳng định chương trình chắc chắn đủ nhanh.

## Tự luyện

Phân tích một vòng lặp đơn, hai vòng lặp lồng nhau và sort rồi duyệt. Ghi riêng thời gian lẫn bộ nhớ phụ, nêu biến nào là kích thước input.

## Đọc tiếp

Áp dụng khi [đọc đề và thiết kế thuật toán](/cpp/thuat-toan/giai-quyet-bai-toan), rồi xem [tìm kiếm và sắp xếp](/cpp/thuat-toan/tim-kiem-sap-xep).
