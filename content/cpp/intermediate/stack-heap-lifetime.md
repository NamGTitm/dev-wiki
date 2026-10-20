---
title: Stack, heap và object lifetime
description: Phân biệt vùng lưu trữ tự động và động, hiểu lifetime, ownership và dangling reference.
slug: /cpp/trung-cap/stack-heap-lifetime
category: intermediate
categoryLabel: C++ trung cấp
order: 21030
difficulty: intermediate
keywords: [stack, heap, lifetime, ownership, dangling pointer, RAII]
updated: 2026-10-20
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/bat-dau/references-pointers", "/cpp/stl/raii-smart-pointers", "/cpp/ky-thuat/ub-memory-safety"]
---

Object có lifetime từ khi bắt đầu được tạo đến khi bị hủy. Hiểu lifetime quan trọng hơn việc ghi nhớ một sơ đồ stack/heap: truy cập object sau khi lifetime kết thúc là lỗi nghiêm trọng.

## Lưu trữ tự động và động

Local variable thông thường có automatic storage duration và tự hủy khi rời scope. Dynamic allocation như `new` tạo object cần ownership rõ ràng; trong code hiện đại, để smart pointer quản lý:

```cpp
#include <memory>
#include <string>

std::string make_message() {
    return "hello"; // Trả về theo giá trị an toàn.
}

int main() {
    auto text{make_message()};
    auto count{std::make_unique<int>(3)};
}
```

Compiler có thể tối ưu phép trả về object; không cần trả pointer tới biến local để “tránh copy”. `std::vector` và `std::string` tự quản lý bộ nhớ nội bộ.

## Heap không đồng nghĩa an toàn

Dynamic object vẫn cần biết ai sở hữu, ai được mượn và lúc nào bị hủy. Đừng `delete` pointer không sở hữu; đừng dùng pointer sau khi object bị hủy hoặc container reallocate. Xem [RAII và smart pointers](/cpp/stl/raii-smart-pointers).

## Lỗi thường gặp

- Trả địa chỉ của local variable.
- Lưu reference tới phần tử rồi thêm vào vector, khiến vector reallocate.
- Dùng `new` nhưng quên `delete`, tạo leak; `delete` hai lần gây lỗi nghiêm trọng.
- Dùng `std::move` như thao tác giải phóng bộ nhớ. Nó chỉ cho phép chuyển trạng thái khi type hỗ trợ.

## Tự luyện

Viết hàm tạo `std::vector<int>` và trả vector theo giá trị. Vì sao cách này an toàn và thường hiệu quả hơn trả pointer trỏ tới mảng local?

## Đọc tiếp

Học [class và destructor](/cpp/trung-cap/classes-constructors) và cách [RAII quản lý resource](/cpp/stl/raii-smart-pointers).
