---
title: Phân tích độ phức tạp Big O
description: Ước lượng thời gian và bộ nhớ theo kích thước input để chọn thuật toán phù hợp.
slug: /cpp/thuat-toan/do-phuc-tap
category: algorithms
categoryLabel: Thuật toán và Competitive Programming
order: 23000
difficulty: beginner
keywords: [Big O, time complexity, space complexity, input constraints, algorithm analysis]
updated: 2026-10-22
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/thuat-toan/giai-quyet-bai-toan", "/cpp/thuat-toan/tim-kiem-sap-xep", "/cpp/tra-cuu/stl-containers"]
---

Big O mô tả một cận trên cho tốc độ tăng của tài nguyên khi kích thước input tăng. Trong phân tích thuật toán, ta thường xét cận trên của trường hợp xấu nhất để biết chương trình có thể tốn nhiều tài nguyên đến mức nào; Big O không phải số phép toán chính xác và cũng không đổi trực tiếp thành số giây chạy.

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

Theo định nghĩa tiệm cận, f(n) = O(g(n)) nếu tồn tại hằng số dương C và ngưỡng n₀ sao cho f(n) không vượt C × g(n) với mọi n ≥ n₀. Hằng số và các input nhỏ không quyết định bậc tăng trưởng. Big O chỉ là cận trên: O(n²) cũng là cận trên hợp lệ của một thuật toán O(n); ký hiệu Θ thường dùng khi muốn nói cận trên và cận dưới cùng bậc.

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

Với input gồm 1, 2, 3, hàm cộng lần lượt từng giá trị và trả về 6. Mỗi phần tử được đọc một lần nên số bước tăng tuyến tính theo số phần tử. Container values là input nên không tính vùng chứa đó vào bộ nhớ phụ.

## Quy tắc phân tích

- Bỏ hằng số và số hạng thấp hơn: `3n + 10` là O(n).
- Hai vòng lặp lồng nhau qua n phần tử thường O(n²); vòng lồng qua hai kích thước khác nhau là O(nm).
- Hai đoạn chạy nối tiếp cộng độ phức tạp; lấy mức tăng nhanh nhất.
- Đệ quy phải tính số lời gọi và chi phí mỗi lời gọi.
- Phân biệt worst-case, average-case và amortized khi cấu trúc cần.

## Cách cộng độ phức tạp

Các đoạn lệnh chạy nối tiếp có chi phí cộng lại. Nếu một đoạn là O(n) và đoạn sau là O(n²), tổng là O(n + n²), thường viết gọn thành O(n²) vì số hạng bậc thấp không chi phối khi n lớn.

Với vòng lặp lồng nhau, hãy đếm số lần thân trong thật sự chạy. Hai vòng lặp độc lập cùng chạy n lượt tạo n × n lượt, tức O(n²). Nếu vòng trong chạy từ i + 1 đến n - 1, số lượt là n(n - 1)/2; bậc tăng trưởng vẫn là O(n²), dù hằng số nhỏ hơn.

Một vòng lặp giảm một nửa miền mỗi lần thường có O(log n) lượt: sau k bước còn khoảng n / 2ᵏ phần tử. Vì vậy sort so sánh thường có độ phức tạp O(n log n).

## Thời gian và bộ nhớ phụ

Thời gian đếm số thao tác theo input. Bộ nhớ phụ chỉ tính phần lưu trữ phát sinh thêm, không tính dữ liệu đầu vào nếu thuật toán sửa trực tiếp trên đó. Prefix sum tạo một mảng mới kích thước n + 1 nên cần O(n) bộ nhớ phụ; hai biến chạy sliding window thường chỉ cần O(1).

Đệ quy cũng dùng bộ nhớ: mỗi lời gọi đang chờ chiếm một frame trên call stack. Hàm đệ quy sâu n mức thường cần O(n) stack, kể cả khi không tạo container nào.

## Cận tăng trưởng không phải thời gian chạy

O(n) không đảm bảo chương trình nhanh hơn O(n log n) trên mọi input nhỏ. Hằng số, cách truy cập bộ nhớ, compiler và workload đều ảnh hưởng thời gian thực. Big O giúp loại bỏ hướng tăng quá nhanh khi input lớn; benchmark hoặc profiler mới đo thời gian trên một môi trường cụ thể.

## Ràng buộc input

Đọc n, giới hạn thời gian, bộ nhớ và miền giá trị trước khi chọn thuật toán. O(n²) với n = 100 có thể hợp lý; với n = 200000 thì thường không. Đây là đánh giá sơ bộ, không phải ngưỡng cứng: giới hạn thời gian, hằng số của thuật toán, dữ liệu và môi trường đều quan trọng.

Ngoài số vòng lặp, phải tính chi phí của thao tác bên trong. Gọi hàm tìm kiếm tuyến tính trong mỗi lượt của vòng ngoài có thể tạo O(n²), dù mỗi vòng ngoài chỉ có một dòng code. Một lời gọi sort trong vòng lặp cũng làm thay đổi đáng kể tổng độ phức tạp.

## Lỗi thường gặp

- Chỉ phân tích số vòng lặp mà bỏ chi phí thao tác bên trong.
- Cho rằng truy cập `vector[i]` là O(n); với vector, thao tác này là O(1), còn list không hỗ trợ truy cập chỉ số hiệu quả.
- Bỏ qua bộ nhớ đệ quy, container phụ hoặc bản sao input.
- Dùng Big O để khẳng định chương trình chắc chắn đủ nhanh.

## Khi nhiều kích thước cùng thay đổi

Nếu thuật toán duyệt mọi ô trong bảng có r hàng và c cột, thời gian là O(r × c). Nếu nó lưu thêm một giá trị cho mỗi hàng, bộ nhớ phụ là O(r), không phải O(r × c). Giữ riêng các biến kích thước giúp phân tích không che mất hình dạng input.

## Đọc tiếp

Áp dụng khi [đọc đề và thiết kế thuật toán](/cpp/thuat-toan/giai-quyet-bai-toan), rồi xem [tìm kiếm và sắp xếp](/cpp/thuat-toan/tim-kiem-sap-xep).
