---
title: Two Pointers và Sliding Window
description: Dùng hai chỉ số để xử lý dãy có invariant, cửa sổ và truy vấn tuyến tính.
slug: /cpp/thuat-toan/two-pointers-sliding-window
category: algorithms
categoryLabel: Thuật toán và Competitive Programming
order: 23040
difficulty: intermediate
keywords: [two pointers, sliding window, subarray, invariant, positive numbers]
updated: 2026-10-22
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/thuat-toan/prefix-sum-difference-array", "/cpp/thuat-toan/tim-kiem-sap-xep", "/cpp/thuat-toan/do-phuc-tap"]
---

Two pointers duy trì hai chỉ số thay vì thử mọi cặp. Sliding window là trường hợp hai đầu tạo một đoạn liên tiếp; khi mở rộng một phía và thu hẹp phía kia có thể được chứng minh là không bỏ lỡ đáp án, tổng số lần di chuyển của hai con trỏ thường chỉ là O(n). Kỹ thuật không tự động đúng cho mọi dãy: phải xác định điều kiện nào khiến cửa sổ hợp lệ và vì sao mỗi lần dịch con trỏ là an toàn.

## Cửa sổ với số dương

Ví dụ tìm đoạn liên tiếp ngắn nhất có tổng ít nhất một target dương, khi mọi phần tử **dương**:

```cpp
#include <algorithm>
#include <cstddef>
#include <iostream>
#include <vector>

int main() {
    const std::vector<int> values{2, 3, 1, 2, 4, 3};
    const long long target{7};
    std::size_t best{values.size()};
    bool found{false};
    std::size_t left{};
    long long sum{};

    for (std::size_t right = 0; right < values.size(); ++right) {
        sum += values[right];
        while (sum >= target) {
            best = std::min(best, right - left + 1);
            found = true;
            sum -= values[left++];
        }
    }
    std::cout << (found ? best : 0) << '\n';
}
```

Với dữ liệu mẫu, đoạn ngắn nhất là [4, 3], nên chương trình in 2. Mỗi pointer chỉ tăng và mỗi phần tử được thêm rồi bỏ khỏi tổng nhiều nhất một lần, nên thời gian O(n), bộ nhớ phụ O(1). Biến found phân biệt “không có đoạn” với đáp án có độ dài bằng toàn bộ dãy; output 0 nghĩa là không tìm thấy đoạn.

Tính đúng dựa vào việc mọi phần tử đều dương: khi bỏ phần tử trái, tổng giảm. Với mỗi right, vòng while thử lần lượt các cửa sổ hợp lệ ngắn dần cho tới khi không còn đạt target; mọi cửa sổ dài hơn cùng điểm phải không thể tốt hơn cửa sổ hợp lệ ngắn nhất đã ghi nhận. Nếu có số âm, thêm phần tử có thể làm tổng giảm và bỏ phần tử trái có thể làm tổng tăng, nên cách dịch này không còn bảo toàn điều kiện.

Khi target không dương, xử lý riêng trước vòng lặp: một phần tử bất kỳ trong dãy dương đã đủ, nên đáp án là 1 nếu dãy không rỗng và không có đoạn nếu dãy rỗng. Không chạy vòng while hiện tại với target = 0 vì sau khi loại hết cửa sổ, tổng 0 vẫn thỏa điều kiện.

## Two pointers trên dãy đã sort

Để tìm cặp có tổng target, đặt left ở đầu và right ở cuối dãy đã sort. Nếu values[left] + values[right] nhỏ hơn target, mọi cặp dùng left hiện tại cũng quá nhỏ, nên tăng left. Nếu tổng lớn hơn target, mọi cặp dùng right hiện tại cũng quá lớn, nên giảm right. Khi tổng bằng target thì đã tìm thấy hai vị trí khác nhau; mỗi lượt loại ít nhất một đầu, nên quét mất O(n) thời gian sau khi sort.

Ví dụ trên dãy 1, 2, 4, 8 với target 6: tổng hai đầu là 9 nên giảm right; tổng 1 + 4 là 5 nên tăng left; tổng 2 + 4 bằng 6. Nếu giá trị có thể lớn, chuyển sang kiểu rộng trước khi cộng. Nếu cần chỉ số gốc, giữ chỉ số cùng phần tử trước khi sort vì sort trực tiếp sẽ đổi vị trí ban đầu.

## Chọn invariant cho cửa sổ

Trước khi dùng sliding window, xác định rõ cửa sổ đại diện cho đoạn nào và biến trạng thái nào phải khớp với các phần tử đang nằm trong đó. Khi tăng right, cập nhật trạng thái; khi left dịch, phải loại đóng góp của đúng phần tử vừa rời cửa sổ. Mỗi phần tử nên được thêm và xóa hữu hạn lần để tổng số thao tác thật sự là tuyến tính.

Với số dương hoặc không âm, tổng không giảm khi mở rộng sang phải và không tăng khi thu hẹp bên trái. Tính đơn điệu này cho phép điều chỉnh cửa sổ theo một hướng. Với số âm, prefix sum hoặc một cấu trúc dữ liệu phù hợp thường cần thiết vì cửa sổ ngắn hơn có thể có tổng lớn hơn.

## Dãy đã sort và dữ liệu trùng lặp

Nếu chỉ cần xác nhận tồn tại một cặp, dừng khi gặp tổng đúng. Nếu đếm cặp giá trị phân biệt, sau khi tìm được một cặp có hai giá trị khác nhau, bỏ cả nhóm phần tử bằng nhau ở hai đầu để không đếm lặp. Nếu đếm cặp chỉ số, các lần xuất hiện trùng nhau lại có ý nghĩa: khi hai đầu có giá trị khác nhau, nhân số lần xuất hiện của mỗi giá trị; khi hai giá trị bằng nhau, chọn hai vị trí trong nhóm đó. Hãy xác định bài yêu cầu đếm giá trị hay đếm vị trí trước khi bỏ trùng.

## Lỗi thường gặp

- Dùng sliding window tổng đơn điệu trên dãy có số âm.
- Không chứng minh vì sao bỏ phần tử trái không làm mất đáp án tối ưu.
- Vòng `while` không tiến pointer, gây lặp vô hạn.
- Dùng unsigned index rồi trừ khi `left > right`.

## Đếm đoạn có tổng bị chặn trên

Với các phần tử không âm và K không âm, có thể giữ cửa sổ sao cho tổng không vượt K. Sau khi thêm phần tử tại right và thu hẹp cửa sổ đến khi hợp lệ, mọi suffix kết thúc tại right cũng hợp lệ; có đúng right - left + 1 suffix như vậy. Cộng số này cho mỗi right sẽ đếm mọi đoạn đúng một lần. Nếu có phần tử âm, một suffix ngắn hơn có thể có tổng lớn hơn nên lập luận đếm này không còn đúng.

## Đọc tiếp

Xem [prefix sum](/cpp/thuat-toan/prefix-sum-difference-array) và [binary search](/cpp/thuat-toan/tim-kiem-sap-xep).
