---
title: Đệ quy và call stack
description: Thiết kế lời gọi đệ quy có điểm dừng, tiến triển rõ ràng và giới hạn tài nguyên.
slug: /cpp/trung-cap/de-quy-call-stack
category: intermediate
categoryLabel: C++ trung cấp
order: 21020
difficulty: intermediate
keywords: [đệ quy C++, recursion, call stack, base case, stack overflow]
updated: 2026-10-22
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/bat-dau/ham-pham-vi", "/cpp/thuat-toan/de-quy-quay-lui", "/cpp/thuat-toan/quy-hoach-dong"]
---

Đệ quy là cách giải bài toán bằng cách chia nó thành một hoặc nhiều bài toán nhỏ cùng dạng. Một hàm đệ quy gọi lại chính nó, trực tiếp hoặc qua hàm khác. Cách này tự nhiên với cây, đồ thị theo cấu trúc đệ quy, chia để trị và quay lui; một phép tính tuyến tính đơn giản thường dễ viết bằng vòng lặp hơn.

## Điều kiện dừng và tiến triển

Một thiết kế đệ quy cần có:

- **Base case** trả lời trực tiếp cho trường hợp nhỏ nhất và không gọi đệ quy tiếp.
- **Recursive case** biến đổi input sao cho tiến gần một base case.
- **Phép ghép kết quả** kết hợp lời giải bài toán con thành lời giải ban đầu.

Ví dụ giai thừa với số nguyên không âm có base case `0! = 1` và `1! = 1`. Mỗi bước giảm `n`, vì vậy chắc chắn tiến tới trường hợp dừng:

```cpp
#include <iostream>
#include <stdexcept>

long long factorial(unsigned int n) {
    if (n > 20) {
        throw std::out_of_range("n is too large for long long factorial");
    }
    if (n <= 1) {
        return 1;
    }
    return static_cast<long long>(n) * factorial(n - 1);
}

int main() {
    int input{};
    if (!(std::cin >> input) || input < 0 || input > 20) {
        return 1;
    }

    std::cout << factorial(static_cast<unsigned int>(input)) << '\n';
}
```

Giới hạn `20` bảo đảm kết quả giai thừa không vượt phạm vi `long long`. Hàm vẫn kiểm tra giới hạn của chính nó để hợp đồng không chỉ phụ thuộc vào cách gọi hiện tại. Với bài toán khác, cần kiểm tra riêng giới hạn kiểu số, độ sâu và dữ liệu đầu vào.

## Call stack và truy vết lời gọi

Mỗi lời gọi hàm có một activation record riêng, lưu tham số, biến cục bộ và vị trí cần quay lại. Với `factorial(4)`, chương trình đi xuống `factorial(4)`, `factorial(3)`, `factorial(2)`, `factorial(1)`, rồi trả kết quả ngược lên. Vì mỗi lời gọi chờ lời gọi bên trong hoàn tất, các frame trước đó vẫn còn trên call stack.

Với hàm giai thừa, thời gian là O(n) và bộ nhớ call stack là O(n). Đệ quy trên cây có thể có độ sâu O(h), trong đó `h` là chiều cao cây; số lời gọi tổng cộng còn tùy vào việc mỗi node được thăm bao nhiêu lần. Hãy phân tích cả số lời gọi lẫn độ sâu lớn nhất, không chỉ nhìn số dòng code.

## Khi nào dùng đệ quy

Đệ quy giúp mô tả trực tiếp bài toán nếu cấu trúc dữ liệu hoặc phép chia nhỏ có cấu trúc tự đồng dạng. Chẳng hạn, duyệt cây có thể xử lý node hiện tại rồi gọi lại trên các cây con. Quay lui thử một lựa chọn, đệ quy giải phần còn lại rồi hoàn tác lựa chọn để thử nhánh khác; xem [đệ quy và quay lui](/cpp/thuat-toan/de-quy-quay-lui).

Nếu nhiều nhánh tính lặp lại cùng một bài toán con, thời gian có thể tăng theo cấp số nhân. Fibonacci đệ quy thuần là ví dụ điển hình; memoization hoặc [quy hoạch động](/cpp/thuat-toan/quy-hoach-dong) lưu kết quả đã tính để tránh lặp.

## Đệ quy và vòng lặp

Vòng lặp thường dùng bộ nhớ O(1) cho trạng thái lặp đơn giản và không phụ thuộc độ sâu call stack. Đệ quy có thể dễ đọc hơn khi bài toán vốn có nhiều nhánh hoặc cấu trúc phân cấp. C++ không yêu cầu compiler tối ưu tail recursion, nên không được giả định một hàm đệ quy đuôi sẽ dùng bộ nhớ hằng định. Với input lớn hoặc độ sâu không kiểm soát, hãy dùng vòng lặp hay stack tường minh.

## Lỗi thường gặp

- Thiếu base case hoặc không xử lý một nhóm input khiến hàm tiếp tục gọi vô hạn.
- Recursive case không tiến gần base case, ví dụ gọi lại với cùng `n`.
- Chỉ kiểm tra input trong `main` nhưng hàm đệ quy còn được gọi từ nơi khác không bảo đảm precondition.
- Không phân tích overflow số học, độ sâu call stack hoặc số lượng lời gọi.
- Tính lặp lại cùng bài toán con mà không dùng memoization/DP.
- Dựa vào giả định compiler luôn tối ưu tail call.

## Đọc tiếp

Ứng dụng đệ quy trong [backtracking](/cpp/thuat-toan/de-quy-quay-lui) và [quy hoạch động](/cpp/thuat-toan/quy-hoach-dong), rồi ôn [khai báo hàm và phạm vi tên](/cpp/bat-dau/ham-pham-vi).
