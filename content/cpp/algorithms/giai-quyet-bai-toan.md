---
title: Đọc đề và thiết kế thuật toán
description: Chuyển đề bài thành mô hình, invariant, thuật toán và kiểm thử trường hợp biên.
slug: /cpp/thuat-toan/giai-quyet-bai-toan
category: algorithms
categoryLabel: Thuật toán và Competitive Programming
order: 23010
difficulty: beginner
keywords: [đọc đề, thiết kế thuật toán, invariant, edge case, competitive programming]
updated: 2026-10-22
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/thuat-toan/do-phuc-tap", "/cpp/bat-dau/nhap-xuat-dieu-kien-vong-lap", "/cpp/thuat-toan/tim-kiem-sap-xep"]
---

Thiết kế thuật toán bắt đầu bằng việc xác định chính xác dữ liệu nào được đưa vào, kết quả nào phải trả về và giới hạn của từng giá trị. Cùng một yêu cầu bằng lời có thể dẫn tới nhiều mô hình khác nhau; đọc kỹ các từ như “liên tiếp”, “phân biệt”, “ít nhất” hay “không vượt quá” giúp chọn đúng mô hình trước khi viết code.

## Từ mô tả sang mô hình

Tách đề thành input, output và quan hệ giữa chúng. Chẳng hạn, “tìm hai phần tử có tổng bằng target” chưa nói rõ một phần tử có được dùng hai lần hay không, hoặc có cần trả chỉ số hay chỉ cần xác nhận tồn tại. Những khác biệt đó làm thay đổi cả thuật toán lẫn điều kiện kiểm tra.

Constraint xác định những thuật toán còn khả thi. Với n phần tử, duyệt mọi cặp thường cần O(n²) thời gian; dùng bảng băm có thể giảm xuống trung bình O(n) nhưng cần thêm O(n) bộ nhớ. Nếu input lớn, nếu bộ nhớ bị giới hạn, hoặc nếu dữ liệu đã có thứ tự, lựa chọn có thể khác. Kiểu dữ liệu cũng phải đủ rộng cho phép tính trung gian, không chỉ kết quả cuối.

## Chọn thuật toán và kiểm tra tính đúng

Một thuật toán cần lý do cho thấy mỗi bước không bỏ sót đáp án. Invariant là điều kiện luôn đúng tại một điểm xác định trong vòng lặp. Ví dụ, khi quét dãy để tìm cặp tổng bằng target, trước mỗi bước seen chứa đúng các phần tử đã duyệt; tra phần bù trước khi thêm giá trị hiện tại ngăn một phần tử bị dùng hai lần.

## Ví dụ suy luận

Với {2, 7, 11, 15} và target = 9, có thể lưu các giá trị đã gặp. Khi đọc 7, chương trình tìm 2 trong tập giá trị trước đó và xác nhận đã có cặp. Tra cứu trước khi chèn giá trị hiện tại giữ nguyên điều kiện “hai vị trí khác nhau”.

```cpp
#include <iostream>
#include <unordered_set>
#include <vector>

bool has_pair_sum(const std::vector<int>& values, int target) {
    std::unordered_set<long long> seen;
    for (int value : values) {
        const long long needed{static_cast<long long>(target) - value};
        if (seen.find(needed) != seen.end()) return true;
        seen.insert(value);
    }
    return false;
}

int main() {
    const std::vector<int> values{2, 7, 11, 15};
    std::cout << std::boolalpha << has_pair_sum(values, 9) << '\n';
}
```

Kết quả là true. Mỗi phần tử được chèn tối đa một lần; thao tác tìm kiếm trong unordered_set có độ phức tạp trung bình O(1), nên toàn bộ thuật toán trung bình O(n) và dùng O(n) bộ nhớ. Trường hợp xấu của bảng băm có thể chậm hơn; nếu cần thứ tự xác định, có thể sort một bản sao rồi dùng hai con trỏ với tổng thời gian O(n log n).

## Kiểu số và input

Chọn kiểu dựa trên miền giá trị và phép tính trung gian, không chỉ giá trị cuối. Tổng nhiều `int` có thể vượt `int`; dùng `long long` khi phù hợp và kiểm tra giới hạn. `std::cin` có thể thất bại khi input sai; đừng tiếp tục xử lý biến chưa đọc.

## Lỗi thường gặp

- Hiểu nhầm “ít nhất”, “nhiều nhất”, inclusive range hoặc đơn vị.
- Code chỉ đúng sample, bỏ trường hợp biên.
- Chọn O(n²) dù constraint yêu cầu gần O(n log n).
- Dùng một kiểu dữ liệu nhỏ cho phép nhân/tổng trung gian.

## Biên, giả định và lỗi cài đặt

Input rỗng, một phần tử, giá trị trùng nhau, số âm và giá trị sát giới hạn kiểu thường làm lộ giả định chưa nói rõ. Với bài max, dãy rỗng không có giá trị lớn nhất trừ khi đề quy định một quy ước riêng; không nên đọc values[0] trước khi biết dãy có phần tử.

Phân biệt chỉ số inclusive [left, right] với đoạn half-open [left, end): hai quy ước khác nhau một đơn vị ở điểm cuối. Khi đọc dữ liệu, kiểm tra trạng thái stream trước khi dùng biến; khi tính tổng hoặc tích, kiểm tra miền của phép tính trung gian để tránh tràn. Các giả định không thể kiểm tra từ input nên được ghi rõ trong lời giải.

Với miền nhỏ, có thể so sánh kết quả thuật toán tối ưu với một lời giải brute force đơn giản trên nhiều input sinh ngẫu nhiên. Đây là cách phát hiện phản ví dụ và lỗi biên, không thay cho chứng minh tính đúng; input được sinh vẫn cần bao phủ các cấu hình quan trọng.

## Đọc tiếp

Ôn [Big O](/cpp/thuat-toan/do-phuc-tap) rồi chọn kỹ thuật như [prefix sum](/cpp/thuat-toan/prefix-sum-difference-array) hoặc [two pointers](/cpp/thuat-toan/two-pointers-sliding-window).
