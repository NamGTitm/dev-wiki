---
title: RAII và smart pointers
description: Gắn lifetime của tài nguyên với object, dùng unique_ptr, shared_ptr và weak_ptr đúng ownership.
slug: /cpp/stl/raii-smart-pointers
category: modern
categoryLabel: STL và C++ hiện đại
order: 22090
difficulty: advanced
keywords: [RAII, unique_ptr, shared_ptr, weak_ptr, Rule of Zero, ownership]
updated: 2026-10-22
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/stl/move-semantics", "/cpp/trung-cap/stack-heap-lifetime", "/cpp/ky-thuat/ub-memory-safety"]
---

RAII (*Resource Acquisition Is Initialization*) gắn quyền sở hữu resource với lifetime của object. Object nhận hoặc mở resource khi được tạo, rồi giải phóng resource trong destructor. Vì destructor chạy khi object rời scope, cleanup vẫn diễn ra trên đường thoát bình thường và khi stack unwinding do exception.

RAII dùng cho bộ nhớ động, file, mutex lock, socket và nhiều tài nguyên khác. Đây là cơ chế quản lý vòng đời; smart pointer chỉ là một nhóm kiểu RAII chuyên cho ownership bộ nhớ động.

## Chọn kiểu ownership

| Kiểu | Mô hình | Dùng khi |
|---|---|---|
| Biến local hoặc member trực tiếp | Object sở hữu trực tiếp | Lifetime gắn với scope hoặc object chứa |
| `std::unique_ptr<T>` | Một owner | Cần ownership động đơn nhất và chuyển được |
| `std::shared_ptr<T>` | Nhiều owner chia sẻ | Nhiều phần độc lập thực sự cùng quyết định lifetime |
| `std::weak_ptr<T>` | Observer tới shared object | Cần quan sát mà không giữ object sống |

Bắt đầu bằng object trực tiếp hoặc `unique_ptr`. Chỉ dùng `shared_ptr` khi mô hình ownership thực sự chia sẻ; reference count thêm chi phí và không tự đồng bộ việc truy cập object được trỏ tới.

## Dùng unique_ptr và weak_ptr

```cpp
#include <iostream>
#include <memory>

struct Session {
    explicit Session(int id) : id{id} {}
    int id;
};

int main() {
    auto owned = std::make_unique<Session>(7);
    std::cout << owned->id << '\n';

    std::weak_ptr<Session> observer;
    {
        auto shared = std::make_shared<Session>(8);
        observer = shared;
        std::cout << shared->id << '\n';
    }

    std::cout << std::boolalpha << observer.expired() << '\n';
}
```

`std::make_unique` và `std::make_shared` tạo object đồng thời với smart pointer, giúp ownership rõ ngay tại điểm khởi tạo. `weak_ptr` không kéo dài lifetime; gọi `lock()` để lấy `shared_ptr` tạm nếu object vẫn còn sống.

`unique_ptr` có thể move để chuyển owner. Không copy nó, vì copy sẽ tạo nhiều owner trái với hợp đồng đơn nhất. `shared_ptr` có thể copy để chia sẻ ownership; object được hủy khi strong owner cuối cùng biến mất.

## RAII không chỉ dành cho bộ nhớ

Ví dụ, stream tự đóng file khi object rời scope:

```cpp
#include <fstream>
#include <string>

int readFirstLine(const std::string& path) {
    std::ifstream input{path};
    if (!input) {
        return 1;
    }

    std::string line;
    std::getline(input, line);
    return line.empty() ? 1 : 0;
}
```

Không cần gọi thao tác đóng file ở mọi nhánh return. Với mutex, `std::lock_guard` hoặc `std::scoped_lock` cũng giữ lock trong scope và tự nhả khi object guard bị hủy.

Một destructor quản lý resource nên giải phóng nó một lần và không để exception thoát ra. Vì vậy, hãy ưu tiên wrapper RAII có sẵn thay vì tự viết cleanup bằng các cặp `new/delete` hoặc `open/close` rải rác.

## Ownership và observer

Raw pointer thường phù hợp để biểu diễn observer không sở hữu, hoặc tham số có thể null nếu API quy định vậy. Reference thường phù hợp khi object bắt buộc tồn tại trong suốt lời gọi. Cần ghi rõ lifetime nếu observer được lưu lâu hơn lời gọi hàm.

`get()` trên smart pointer trả raw pointer không sở hữu; không tạo smart pointer thứ hai từ địa chỉ đó. Việc gọi `std::shared_ptr<T>{owner.get()}` có thể khiến hai control block cùng cố giải phóng một object.

## Chu kỳ shared ownership

Nếu object A giữ `shared_ptr` tới B và B giữ `shared_ptr` tới A, strong reference count của cả hai có thể không về 0 khi các owner bên ngoài biến mất. Dùng `weak_ptr` cho cạnh quan sát hoặc liên kết ngược để phá chu kỳ.

`weak_ptr::lock()` trả `shared_ptr` rỗng nếu object đã bị hủy; kiểm tra kết quả trước khi dereference. Không dựa vào kiểm tra `expired()` rồi dùng raw pointer sau đó, vì object có thể hết lifetime giữa hai thao tác.

## Rule of Zero

Thiết kế class bằng các member tự quản lý resource như `std::string`, `std::vector`, `std::unique_ptr` và stream. Khi đó compiler thường sinh copy/move/destructor phù hợp mà class không phải tự giải phóng resource. Đây là Rule of Zero.

Chỉ tự viết destructor, copy/move constructor hoặc assignment khi class trực tiếp quản lý tài nguyên cấp thấp hoặc cần semantics đặc biệt. Khi đã viết một special member function, hãy xem xét toàn bộ nhóm copy/move để tránh double free, mất ownership hoặc vô tình cấm thao tác cần thiết.

## Lỗi thường gặp

- Hai `unique_ptr` cùng sở hữu một raw pointer.
- Tạo `shared_ptr` mới từ `.get()` rồi giải phóng cùng object hai lần.
- Tạo vòng ownership bằng `shared_ptr` khiến object không bao giờ được hủy.
- Dùng `shared_ptr` cho mọi object dù chỉ có một owner.
- Cho rằng reference count làm các thao tác trên object thread-safe.
- Giữ raw observer sau khi owner đã hết lifetime.

## Đọc tiếp

Đọc [move semantics](/cpp/stl/move-semantics), [vòng đời object](/cpp/trung-cap/stack-heap-lifetime) và [an toàn bộ nhớ](/cpp/ky-thuat/ub-memory-safety).
