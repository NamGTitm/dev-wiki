---
title: Class, constructors và encapsulation
description: Thiết kế class giữ invariant, khởi tạo object hợp lệ và quản lý tài nguyên theo RAII.
slug: /cpp/trung-cap/classes-constructors
category: intermediate
categoryLabel: C++ trung cấp
order: 21040
difficulty: intermediate
keywords: [class C++, constructor, destructor, encapsulation, invariant, access control]
updated: 2026-10-22
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/trung-cap/vector-struct-enum", "/cpp/trung-cap/inheritance-polymorphism", "/cpp/stl/raii-smart-pointers"]
---

Class kết hợp dữ liệu và các thao tác trên dữ liệu đó thành một kiểu mới. Encapsulation giới hạn cách caller thay đổi trạng thái, nhờ vậy class có thể giữ **invariant**: điều kiện phải đúng trong suốt thời gian object còn hợp lệ. Thiết kế class tốt tập trung vào hợp đồng công khai và để chi tiết lưu trữ ở bên trong.

## Constructor và access control

```cpp
#include <limits>
#include <stdexcept>

class Counter {
public:
    explicit Counter(int initial = 0) : value_{checked_initial(initial)} {}

    void increment() {
        if (value_ == std::numeric_limits<int>::max()) {
            throw std::overflow_error("counter is full");
        }
        ++value_;
    }

    int value() const noexcept { return value_; }

private:
    static int checked_initial(int initial) {
        if (initial < 0) {
            throw std::invalid_argument("initial must be non-negative");
        }
        return initial;
    }

    int value_;
};

int main() {
    Counter counter{2};
    counter.increment();
    return counter.value() == 3 ? 0 : 1;
}
```

`public` là phần caller được phép dùng; `private` giữ chi tiết triển khai và ngăn sửa trực tiếp `value_`. Hàm `value() const` cho phép đọc trạng thái qua cả object `const`, đồng thời cam kết không sửa thành viên thông thường. `noexcept` thể hiện hàm này không ném exception.

Constructor thiết lập trạng thái ban đầu. `explicit` ngăn một số implicit conversion không chủ ý, chẳng hạn biến số nguyên thành `Counter` trong lúc truyền đối số. Giá trị mặc định của `initial` cho phép tạo `Counter{}` hoặc `Counter{2}`; nên cung cấp default argument chỉ khi trạng thái mặc định thực sự có ý nghĩa.

Initializer list dựng trực tiếp các thành viên. Thứ tự khởi tạo luôn theo **thứ tự thành viên được khai báo trong class**, không theo thứ tự viết trong initializer list. Vì vậy nên viết initializer list cùng thứ tự với khai báo để tránh lỗi phụ thuộc và cảnh báo compiler. Thành viên `const` và reference phải được khởi tạo tại đây; chúng không thể được gán giá trị lần đầu trong thân constructor.

Một constructor có thể gọi constructor khác của cùng class bằng delegating constructor, giúp gom logic kiểm tra ở một nơi. Constructor cũng có thể thất bại bằng exception; nếu điều đó xảy ra, các thành viên đã được khởi tạo sẽ tự hủy theo thứ tự ngược, còn object chưa được tạo hoàn chỉnh nên caller không thể dùng nó.

## Khởi tạo, copy và move

Nếu class chỉ gồm các kiểu giá trị và thành viên STL tự quản lý tài nguyên, compiler-generated constructor, destructor, copy và move thường đã đúng. Đây là **Rule of Zero**: để thành viên RAII đảm nhận công việc quản lý tài nguyên.

Copy mặc định thường sao chép từng thành viên; điều này phù hợp với `std::string`, `std::vector` và các kiểu giá trị. Nếu class tự sở hữu một tài nguyên thông qua raw pointer hoặc handle, copy memberwise có thể khiến hai object cùng giải phóng một tài nguyên. Trước khi tự viết destructor, cần quyết định rõ class có cho copy không, copy nghĩa là gì, và có cần move không. C++ gọi nhóm destructor, copy constructor, copy assignment, move constructor và move assignment là Rule of Five khi phải tự quản lý các thao tác đó.

```cpp
#include <string>
#include <utility>

class User {
public:
    explicit User(std::string name) : name_{std::move(name)} {}

    const std::string& name() const noexcept { return name_; }

private:
    std::string name_;
};
```

`std::move` chỉ chuyển biểu thức sang dạng có thể được move; nó không tự giải phóng hay chuyển tài nguyên. Cần include `<utility>` cho `std::move`. Trong ví dụ này, có thể truyền tham số theo giá trị rồi move vào thành viên; cách đó xử lý được cả đối số tạm lẫn lvalue mà vẫn giữ logic đơn giản. Với kiểu thành viên tự quản lý tài nguyên như `std::string`, không cần tự viết destructor.

## Destructor và tài nguyên

Destructor chạy khi lifetime của object kết thúc: ví dụ object cục bộ rời scope hoặc owner smart pointer bị hủy. RAII gắn vòng đời tài nguyên với vòng đời object để file, lock và bộ nhớ được giải phóng đúng lúc. `std::vector`, `std::string`, `std::unique_ptr` và các kiểu thư viện khác thường đã làm việc này.

Chỉ tự viết destructor khi class thật sự trực tiếp sở hữu một resource mà thành viên hiện có không quản lý. Nếu destructor được khai báo thủ công, các thao tác copy/move sinh tự động có thể không còn phù hợp với ownership. Việc thêm destructor trống cũng có thể làm mất một số thao tác move ngầm định; hãy ưu tiên thành viên RAII và xem [Rule of Zero cùng smart pointer](/cpp/stl/raii-smart-pointers).

## Lỗi thường gặp

- Để trạng thái public khiến caller có thể phá invariant.
- Khởi tạo thành viên sai thứ tự khai báo hoặc dùng thành viên chưa được khởi tạo.
- Cho constructor ném exception sau khi tự cấp tài nguyên bằng raw pointer nhưng không có owner RAII bảo vệ.
- Tự viết destructor cho resource nhưng quên ngăn copy hoặc định nghĩa quy tắc copy, dẫn đến giải phóng trùng.
- Dùng `std::move` rồi tiếp tục giả định object nguồn giữ nguyên giá trị cũ; object nguồn vẫn hợp lệ nhưng trạng thái cụ thể phụ thuộc kiểu.
- Dùng `const` cho accessor một cách máy móc trong khi hàm thật sự cần thay đổi trạng thái logic như cache hoặc bộ đếm mutable.

## Thiết kế API của class

Giữ giao diện nhỏ và đặt tên theo hành động hoặc câu hỏi mà caller cần. Hàm sửa đổi nên giữ invariant sau mỗi lần gọi; hàm đọc nên có thể gọi qua object `const`. Báo lỗi bằng exception, kiểu kết quả hoặc quy ước rõ ràng tùy hợp đồng của module; không để object âm thầm chuyển sang trạng thái mà mọi hàm khác không xử lý được.

Nếu kiểu chỉ gom dữ liệu công khai và không cần kiểm soát invariant, `struct` có thể phù hợp hơn. Nếu cần kiểm soát ownership, tính hợp lệ hoặc bất biến qua nhiều trường, `class` thường làm ý định rõ hơn. Xem phần [struct và enum](/cpp/trung-cap/vector-struct-enum), sau đó tìm hiểu [kế thừa và đa hình](/cpp/trung-cap/inheritance-polymorphism).

## Đọc tiếp

Xem [RAII và smart pointers](/cpp/stl/raii-smart-pointers) để quản lý tài nguyên, rồi học [kế thừa và đa hình](/cpp/trung-cap/inheritance-polymorphism) khi cần interface chung.
