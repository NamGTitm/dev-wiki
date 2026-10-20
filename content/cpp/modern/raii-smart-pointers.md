---
title: RAII và smart pointers
description: Gắn lifetime của tài nguyên với object, dùng unique_ptr, shared_ptr và weak_ptr đúng ownership.
slug: /cpp/stl/raii-smart-pointers
category: modern
categoryLabel: STL và C++ hiện đại
order: 22090
difficulty: advanced
keywords: [RAII, unique_ptr, shared_ptr, weak_ptr, Rule of Zero, ownership]
updated: 2026-10-20
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/stl/move-semantics", "/cpp/trung-cap/stack-heap-lifetime", "/cpp/ky-thuat/ub-memory-safety"]
---

RAII (Resource Acquisition Is Initialization) gắn việc sở hữu resource với lifetime của object: constructor nhận resource, destructor giải phóng. Dùng RAII cho bộ nhớ, file, lock và handle để cleanup cả khi có exception.

## Chọn smart pointer

```cpp
#include <iostream>
#include <memory>

struct Session {
    explicit Session(int id) : id{id} {}
    int id;
};

int main() {
    auto owned{std::make_unique<Session>(7)};
    std::weak_ptr<Session> observer;
    {
        auto shared{std::make_shared<Session>(8)};
        observer = shared;
        std::cout << shared->id << '\n';
    }
    std::cout << std::boolalpha << observer.expired() << '\n';
}
```

- `std::unique_ptr<T>`: một owner; chuyển ownership bằng move. Đây là lựa chọn mặc định cho dynamic ownership.
- `std::shared_ptr<T>`: nhiều owner dùng reference count; có chi phí và cần lý do chia sẻ ownership.
- `std::weak_ptr<T>`: quan sát object được shared-owned mà không tăng strong count; `lock()` tạo shared pointer tạm nếu object còn sống.

Object không có owner động thường nên là biến local hoặc thành viên trực tiếp. Container như `std::vector<T>` cũng tự quản lý bộ nhớ.

## Rule of Zero

Thiết kế class dùng thành viên RAII để compiler sinh copy/move/destructor đúng; tránh tự quản lý resource bằng raw `new`/`delete`. Raw pointer thường nên là non-owning observer, với lifetime được tài liệu hóa.

## Lỗi thường gặp

- Hai `unique_ptr` cùng sở hữu một raw pointer.
- Tạo `shared_ptr` mới từ `.get()` rồi giải phóng cùng object hai lần.
- Vòng ownership giữa các `shared_ptr` giữ nhau sống mãi; dùng `weak_ptr` để phá chu kỳ.
- Dùng `shared_ptr` chỉ để “an toàn hơn” dù ownership thực tế đơn nhất.

## Tự luyện

Thiết kế cây object: node cha sở hữu con bằng `unique_ptr`; node con cần biết cha thì lưu observer pointer/reference có lifetime rõ. Xác định ai hủy từng node.

## Đọc tiếp

Đọc [move semantics](/cpp/stl/move-semantics), [vòng đời object](/cpp/trung-cap/stack-heap-lifetime) và [an toàn bộ nhớ](/cpp/ky-thuat/ub-memory-safety).
