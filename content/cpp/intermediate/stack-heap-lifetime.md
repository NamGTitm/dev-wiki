---
title: Stack, heap và object lifetime
description: Phân biệt storage duration, lifetime, ownership và các lỗi dangling trong C++.
slug: /cpp/trung-cap/stack-heap-lifetime
category: intermediate
categoryLabel: C++ trung cấp
order: 21030
difficulty: intermediate
keywords: [stack, heap, lifetime, ownership, dangling pointer, RAII]
updated: 2026-10-22
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/bat-dau/references-pointers", "/cpp/stl/raii-smart-pointers", "/cpp/ky-thuat/ub-memory-safety"]
---

Object có **lifetime** từ khi việc khởi tạo hoàn tất đến khi nó bị hủy. Mọi truy cập phải xảy ra trong lifetime đó. Dùng pointer hoặc reference sau khi object đã bị hủy tạo ra dangling access và thường dẫn đến hành vi không xác định.

“Stack” và “heap” là tên gọi quen thuộc để mô tả cách chương trình thường lưu dữ liệu, nhưng không phải mọi object đều được ngôn ngữ C++ quy định nằm ở một vùng vật lý có tên như vậy. Khi cần suy luận vòng đời, dùng các khái niệm chuẩn hơn là **storage duration** và lifetime.

## Các storage duration thường gặp

- **Automatic**: thường là biến cục bộ không có `static`; việc hủy gắn với việc rời khỏi scope.
- **Static**: biến ở namespace scope, biến `static` cục bộ và một số object khác tồn tại trong suốt thời gian chương trình. Biến `static` cục bộ được khởi tạo khi lần đầu đi qua khai báo.
- **Thread**: biến `thread_local` có một object riêng cho mỗi thread và tồn tại trong lifetime của thread đó.
- **Dynamic**: object được tạo trong vùng lưu trữ động, thường qua `std::make_unique`, `std::make_shared` hoặc cơ chế cấp phát tương ứng. Object còn sống cho đến khi owner kết thúc quyền sở hữu và hủy nó.

Một biến cục bộ thường được lưu trên stack và `new` thường dùng heap, nhưng compiler có thể tối ưu cách hiện thực khi vẫn bảo toàn hành vi quan sát được. Vùng lưu trữ động cũng không đồng nghĩa với “an toàn hơn”; điều quan trọng là object còn sống hay không và ai chịu trách nhiệm hủy nó.

## Trả object theo giá trị

```cpp
#include <iostream>
#include <string>
#include <vector>

std::string make_message() {
    return "hello";
}

std::vector<int> make_values() {
    return {2, 4, 6};
}

int main() {
    const std::string message{make_message()};
    const std::vector<int> values{make_values()};
    std::cout << message << ' ' << values.size() << '\n';
}
```

Trả về giá trị tạo ra object kết quả với lifetime độc lập trong caller. Compiler có thể áp dụng copy elision hoặc move; tính đúng đắn của chương trình không phụ thuộc vào việc địa chỉ biến local được giữ lại. Không trả pointer hoặc reference tới biến local vì biến đó bị hủy khi hàm kết thúc.

## Ownership và mượn dữ liệu

Pointer và reference thường chỉ quan sát hoặc mượn object, không tự biểu đạt quyền sở hữu. Trước khi lưu chúng lâu dài, xác định owner nào bảo đảm object vẫn sống. Nếu một object cần lifetime riêng, dùng kiểu RAII:

```cpp
#include <iostream>
#include <memory>

int main() {
    auto count{std::make_unique<int>(3)};
    *count += 1;
    std::cout << *count << '\n';
}
```

Khi `count` rời scope, `std::unique_ptr` hủy object được sở hữu. `unique_ptr` biểu đạt một owner duy nhất; dùng `std::shared_ptr` khi thật sự có nhiều owner cùng chia sẻ lifetime. Một vòng sở hữu chỉ gồm `shared_ptr` có thể giữ các object sống mãi; `weak_ptr` thường được dùng cho liên kết không sở hữu để tránh chu kỳ. `std::weak_ptr` quan sát object do `shared_ptr` quản lý mà không kéo dài lifetime. Các con trỏ thô hoặc reference có thể dùng làm tham số mượn khi API đã nói rõ chúng không được giữ lại quá lifetime của owner.

RAII cũng áp dụng cho file, lock, socket và các resource khác; không chỉ bộ nhớ. Xem [RAII và smart pointers](/cpp/stl/raii-smart-pointers).

## Container và invalidation

Container thường sở hữu các phần tử của nó. Nếu giữ pointer, reference hoặc iterator tới một phần tử của `std::vector`, thao tác làm vector cấp lại bộ nhớ sẽ làm mọi handle đó mất hiệu lực. Chèn hoặc xóa giữa vector cũng có thể làm handle tới phần tử phía sau vị trí thay đổi mất hiệu lực. Hãy dựa vào quy tắc invalidation của thao tác container; riêng việc gọi `std::move` trên một object đang sống không tự kết thúc lifetime hay làm reference tới object đó mất hiệu lực. Xem [quy tắc iterator invalidation](/cpp/stl/iterators-invalidation).

## Lỗi thường gặp

- Trả địa chỉ hoặc reference tới biến cục bộ.
- Xóa object trong khi một phần khác của chương trình vẫn đang dùng pointer hoặc reference tới nó.
- Giữ handle tới phần tử container qua thao tác có thể invalidated handle đó.
- Dùng `new` mà không có owner RAII, dẫn đến leak hoặc giải phóng trùng.
- Nghĩ rằng `std::move` giải phóng resource. `std::move` chỉ cho phép overload move phù hợp được chọn; resource được chuyển thế nào phụ thuộc vào kiểu.
- Dùng `shared_ptr` cho mọi object dù chỉ có một owner, làm ownership và lifetime khó lần theo.

## Cách suy luận lifetime

Với mỗi pointer hoặc reference, lần theo ba câu hỏi: object được tạo ở đâu, owner nào giữ nó sống, và thao tác nào có thể hủy hoặc di chuyển object đó? Khi câu trả lời không rõ, đơn giản hóa API bằng cách truyền theo giá trị hoặc dùng một kiểu sở hữu RAII phù hợp. Xem thêm [pointer và reference](/cpp/bat-dau/references-pointers) cùng [memory safety](/cpp/ky-thuat/ub-memory-safety).

## Đọc tiếp

Học cách [class và destructor](/cpp/trung-cap/classes-constructors) gắn lifetime với resource, rồi xem [RAII và smart pointers](/cpp/stl/raii-smart-pointers).
