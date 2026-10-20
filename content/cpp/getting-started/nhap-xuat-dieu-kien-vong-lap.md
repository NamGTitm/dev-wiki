---
title: Nhập xuất, điều kiện và vòng lặp
description: Đọc dữ liệu bằng cin, in bằng cout, rẽ nhánh và lặp chương trình an toàn.
slug: /cpp/bat-dau/nhap-xuat-dieu-kien-vong-lap
category: fundamentals
categoryLabel: C++ căn bản
order: 20060
difficulty: beginner
keywords: [cin, cout, if, else, switch, for, while, do while]
updated: 2026-10-20
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/bat-dau/toan-tu", "/cpp/bat-dau/ham-pham-vi", "/cpp/thuat-toan/giai-quyet-bai-toan"]
---

Nhập xuất kết nối chương trình với người dùng hoặc hệ thống chấm bài. Điều kiện chọn nhánh; vòng lặp lặp lại một khối lệnh. Cần biết biến và biểu thức trước khi học.

## Nhập xuất chuẩn

```cpp
#include <iostream>

int main() {
    int age{};
    if (!(std::cin >> age)) {
        std::cerr << "Du lieu khong hop le\n";
        return 1;
    }
    std::cout << "Tuoi: " << age << '\n';
}
```

`std::cin >>` đọc token và có thể thất bại khi input sai. `std::cout` là output thông thường; `std::cerr` dành cho lỗi. Bài trên không đọc được khoảng trắng bên trong chuỗi; dùng `std::getline` cho cả dòng.

## Rẽ nhánh

```cpp
#include <iostream>

int main() {
    const int score{85};
if (score >= 90) {
    std::cout << "A\n";
} else if (score >= 80) {
    std::cout << "B\n";
} else {
    std::cout << "Can on tap\n";
}
}
```

`switch` phù hợp với một biểu thức nguyên hoặc enum có nhiều giá trị rời rạc. Mỗi `case` thường cần `break` để tránh chạy xuyên sang nhánh tiếp theo.

## Vòng lặp

```cpp
#include <iostream>

int main() {
    for (int i = 0; i < 3; ++i) std::cout << i << ' ';
    int remaining{3};
    while (remaining > 0) --remaining;
    do {
        std::cout << remaining;
    } while (remaining > 1);
    std::cout << '\n';
}
```

`for` tiện khi có bộ đếm; `while` khi số lần chưa biết; `do-while` khi thân phải chạy ít nhất một lần.

## Lỗi thường gặp

- Điều kiện vòng lặp không đổi và tạo vòng lặp vô hạn.
- Dùng `i <= n` khi phần tử cuối hợp lệ lại ở `n - 1`.
- Bỏ qua trạng thái lỗi của `cin` rồi dùng giá trị không đọc được.
- Quên `break` trong `switch`.

## Tự luyện

Đọc `n`, sau đó tính tổng từ 1 đến `n`. Trường hợp biên cần quyết định: `n <= 0`; nếu `n` lớn, chọn kiểu chứa tổng đủ rộng.

## Đọc tiếp

Đóng gói logic vào [hàm và phạm vi biến](/cpp/bat-dau/ham-pham-vi); dùng các kỹ thuật này trong [bài toán thuật toán](/cpp/thuat-toan/giai-quyet-bai-toan).
