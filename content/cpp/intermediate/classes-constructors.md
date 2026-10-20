---
title: Class, constructors và encapsulation
description: Thiết kế class giữ invariant, khởi tạo object hợp lệ và đóng gói trạng thái.
slug: /cpp/trung-cap/classes-constructors
category: intermediate
categoryLabel: C++ trung cấp
order: 21040
difficulty: intermediate
keywords: [class C++, constructor, destructor, encapsulation, invariant, access control]
updated: 2026-10-20
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/trung-cap/vector-struct-enum", "/cpp/trung-cap/inheritance-polymorphism", "/cpp/stl/raii-smart-pointers"]
---

Class gom dữ liệu và thao tác có liên quan. Encapsulation giữ trạng thái bên trong một invariant để caller không thể vô tình tạo object sai.

## Constructor và access control

```cpp
#include <stdexcept>

class Counter {
public:
    explicit Counter(int initial = 0) : value_{initial} {
        if (initial < 0) throw std::invalid_argument("initial must be non-negative");
    }

    void increment() { ++value_; }
    int value() const { return value_; }

private:
    int value_{};
};

int main() {
    Counter counter{2};
    counter.increment();
    return counter.value() == 3 ? 0 : 1;
}
```

Constructor khởi tạo object; member initializer list đặt thành viên trực tiếp và chạy theo thứ tự khai báo thành viên. `private` bảo vệ trạng thái; `public` là API. Hàm `const` hứa không sửa trạng thái quan sát được. `explicit` ngăn implicit conversion ngoài ý muốn.

## Destructor và resource

Destructor chạy khi object kết thúc lifetime. Nếu class giữ file handle, lock hoặc resource khác, dùng RAII để giải phóng đúng một lần. Thành viên STL và smart pointer thường đã tự quản lý resource; đừng tự viết destructor nếu không sở hữu resource đặc biệt. Xem [Rule of Zero](/cpp/stl/raii-smart-pointers).

## Lỗi thường gặp

- Để mọi thành viên public rồi invariant bị phá từ bên ngoài.
- Không khởi tạo thành viên hoặc khởi tạo sai thứ tự tưởng tượng.
- Tự viết destructor nhưng quên định nghĩa/cấm copy đúng cách, dẫn đến double-free.
- Constructor để object ở trạng thái nửa hợp lệ sau lỗi.

## Tự luyện

Thiết kế class `Temperature` chỉ cho nhận giá trị trong miền hợp lệ của bài toán. Giữ dữ liệu private và cung cấp thao tác đổi đơn vị; xác định cách báo input sai.

## Đọc tiếp

Tìm hiểu [kế thừa và đa hình](/cpp/trung-cap/inheritance-polymorphism), rồi xem [RAII](/cpp/stl/raii-smart-pointers).
