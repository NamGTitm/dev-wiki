---
title: Inheritance và polymorphism
description: Dùng kế thừa khi có quan hệ is-a và gọi hành vi ảo an toàn qua base class.
slug: /cpp/trung-cap/inheritance-polymorphism
category: intermediate
categoryLabel: C++ trung cấp
order: 21050
difficulty: intermediate
keywords: [inheritance C++, polymorphism, virtual, override, virtual destructor]
updated: 2026-10-20
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/trung-cap/classes-constructors", "/cpp/trung-cap/templates-namespaces", "/cpp/stl/raii-smart-pointers"]
---

Kế thừa tạo quan hệ giữa lớp dẫn xuất và lớp cơ sở. Đa hình runtime cho phép gọi implementation phù hợp với kiểu thực tế qua interface chung. Dùng khi subtype thật sự thỏa hợp đồng base; composition thường linh hoạt hơn cho “has-a”.

## Hàm ảo

```cpp
#include <iostream>
#include <memory>
#include <vector>

class Shape {
public:
    virtual ~Shape() = default;
    virtual double area() const = 0;
};

class Square final : public Shape {
public:
    explicit Square(double side) : side_{side} {}
    double area() const override { return side_ * side_; }
private:
    double side_;
};

int main() {
    std::vector<std::unique_ptr<Shape>> shapes;
    shapes.push_back(std::make_unique<Square>(3.0));
    std::cout << shapes.front()->area() << '\n';
}
```

`virtual` cho phép dispatch động; `= 0` tạo hàm thuần ảo và class abstract; `override` yêu cầu compiler xác nhận override đúng. Base polymorphic cần virtual destructor để hủy object derived qua pointer base.

## Nguyên tắc thiết kế

Base class định nghĩa hợp đồng dùng được bởi mọi subtype. Không gọi virtual function trong constructor/destructor để mong dispatch như object derived đã hoàn chỉnh. Tránh lạm dụng kế thừa chỉ để tái sử dụng vài dòng code.

## Lỗi thường gặp

- Quên `virtual` destructor rồi `delete` derived qua base pointer.
- Dùng `override` sai chữ ký, hoặc overload vô ý thay vì override.
- Slicing: copy object derived vào biến base theo giá trị làm mất phần derived.
- Base destructor non-public nhưng thiết kế lại cho phép hủy qua base.

## Tự luyện

Tạo interface `Notifier` với hàm `send`, rồi hai implementation email và console. Viết caller chỉ phụ thuộc interface; cân nhắc lỗi gửi và ownership.

## Đọc tiếp

So sánh đa hình runtime với [templates](/cpp/trung-cap/templates-namespaces) và quản lý ownership bằng [smart pointers](/cpp/stl/raii-smart-pointers).
