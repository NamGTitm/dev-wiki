---
title: Function overloading và default arguments
description: Thiết kế overload dễ dự đoán và dùng tham số mặc định đúng trong API C++.
slug: /cpp/trung-cap/overloading-default-arguments
category: intermediate
categoryLabel: C++ trung cấp
order: 21010
difficulty: intermediate
keywords: [function overloading, default argument, overload resolution, function signature]
updated: 2026-10-22
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/bat-dau/ham-pham-vi", "/cpp/trung-cap/templates-namespaces", "/cpp/trung-cap/de-quy-call-stack"]
---

Function overloading cho phép nhiều hàm cùng tên thực hiện các thao tác liên quan trên các kiểu đối số khác nhau. Khi biên dịch, compiler chọn một overload dựa trên lời gọi và các phép chuyển đổi cần thiết. Default argument cho phép caller bỏ qua một số tham số cuối khi cách dùng mặc định đã rõ ràng.

## Overload theo danh sách tham số

```cpp
#include <cstddef>
#include <iostream>
#include <string>

std::size_t length_of(int value) { return std::to_string(value).size(); }
std::size_t length_of(const std::string& value) { return value.size(); }

int main() {
    const std::size_t digits{length_of(7)};
    const std::size_t letters{length_of(std::string{"C++"})};
    std::cout << digits << ' ' << letters << '\n';
}
```

Các overload phải khác nhau ở danh sách kiểu tham số sau những điều chỉnh của ngôn ngữ. Chỉ đổi kiểu trả về không tạo overload mới: lời gọi thông thường không dùng kiểu trả về mong muốn để chọn hàm. Cũng không thể overload hai tham số truyền theo giá trị chỉ khác `const` cấp cao nhất, như `f(int)` và `f(const int)`.

Compiler ưu tiên overload có chuyển đổi tốt nhất. Một phép khớp chính xác thường tốt hơn chuyển đổi chuẩn; khi hai ứng viên cần những chuyển đổi có cùng thứ hạng, lời gọi có thể mơ hồ:

```cpp
void print(long value);
void print(double value);

// print(0); // Mơ hồ: int có thể chuyển đổi sang cả long và double.
```

Hãy thiết kế overload theo cách caller có thể đoán được hàm nào được chọn. Khi các kiểu đầu vào không biểu đạt những thao tác khác nhau, một hàm có tham số rõ ràng hoặc một tên khác nhau thường dễ đọc hơn một tập overload khó phân giải.

## Giá trị tham số mặc định

```cpp
#include <iostream>
#include <string>

std::string greet(const std::string& name,
                  const std::string& prefix = "Xin chao") {
    return prefix + ", " + name;
}

int main() {
    std::cout << greet("An") << '\n';
    std::cout << greet("Binh", "Chao mung") << '\n';
}
```

Khi gọi `greet("An")`, compiler dùng giá trị mặc định cho tham số `prefix`. Tham số có default phải nằm sau các tham số bắt buộc. Giá trị mặc định thường đặt trong khai báo ở header mà caller nhìn thấy; không lặp lại default cho cùng tham số trong định nghĩa hoặc khai báo khác thuộc cùng scope. Các khai báo có thể bổ sung default cho tham số cuối chưa có default, nhưng cần giữ một nơi dễ tìm để tránh API khó đọc.

Default argument được xét theo khai báo hiện thấy tại vị trí gọi. Vì vậy, nếu caller chỉ thấy forward declaration không có default, caller đó không thể bỏ tham số dù định nghĩa hàm ở nơi khác có default.

## Overload kết hợp với default argument

Default argument không tạo thêm một overload; nó chỉ giúp một hàm có thể được gọi với ít đối số hơn. Hai cơ chế đặt cạnh nhau có thể khiến cùng một lời gọi khớp nhiều hàm:

```cpp
void write(int value);
void write(int value, int retries = 3);

// write(5); // Mơ hồ vì cả hai hàm đều có thể nhận một đối số.
```

Nếu các cách gọi mang ý nghĩa khác nhau, dùng overload với tên hoặc tham số rõ ràng. Tránh thêm default argument vào API vốn đã có overload nhận cùng số đối số.

Một chi tiết quan trọng của hàm ảo: phần default argument được chọn theo kiểu tĩnh của biểu thức gọi, còn implementation ảo được dispatch theo kiểu động của object. Sự kết hợp đó dễ gây bất ngờ, nên thường tránh default argument trên hàm virtual.

## Lỗi thường gặp

- Khai báo overload chỉ khác kiểu trả về.
- Nghĩ rằng compiler chọn overload theo kiểu biến nhận kết quả.
- Thêm quá nhiều phép chuyển đổi ngầm khiến lời gọi mơ hồ hoặc chọn overload ngoài dự kiến.
- Lặp default argument trong header và định nghĩa.
- Kết hợp overload với default sao cho cùng một lời gọi khớp nhiều hàm.
- Đặt default trong một declaration mà caller không nhìn thấy.

## Chọn giữa overload và default

Dùng overload khi mỗi dạng đầu vào cần một cách xử lý phù hợp riêng, chẳng hạn xử lý `std::string` khác với số nguyên. Dùng default argument khi tham số tùy chọn có một giá trị mặc định tự nhiên và không làm thay đổi ý nghĩa bất ngờ. Nếu tùy chọn có tên hoặc nhiều tổ hợp, một cấu trúc options hay các hàm có tên rõ có thể dễ bảo trì hơn.

## Đọc tiếp

Xem cách tổ chức [template và namespace](/cpp/trung-cap/templates-namespaces), rồi ôn [khai báo hàm và phạm vi tên](/cpp/bat-dau/ham-pham-vi).
