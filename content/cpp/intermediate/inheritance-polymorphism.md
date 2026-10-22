---
title: Inheritance và polymorphism
description: Thiết kế quan hệ is-a và gọi hành vi ảo an toàn qua interface base class.
slug: /cpp/trung-cap/inheritance-polymorphism
category: intermediate
categoryLabel: C++ trung cấp
order: 21050
difficulty: intermediate
keywords: [inheritance C++, polymorphism, virtual, override, virtual destructor]
updated: 2026-10-22
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/trung-cap/classes-constructors", "/cpp/trung-cap/templates-namespaces", "/cpp/stl/raii-smart-pointers"]
---

Kế thừa tạo quan hệ giữa class dẫn xuất (derived) và class cơ sở (base). Với **public inheritance**, derived phải có thể thay thế base ở những nơi caller dựa trên hợp đồng của base. Khi cần đa hình runtime, chương trình gọi hàm qua pointer hoặc reference base; implementation tương ứng với kiểu động của object được chọn lúc chạy.

## Interface ảo và virtual destructor

```cpp
#include <cmath>
#include <iostream>
#include <memory>
#include <stdexcept>
#include <vector>

class Shape {
public:
    virtual ~Shape() = default;
    virtual double area() const = 0;
};

class Square final : public Shape {
public:
    explicit Square(double side) : side_{side} {
        if (!std::isfinite(side_) || side_ <= 0.0 ||
            !std::isfinite(side_ * side_)) {
            throw std::invalid_argument("side must be finite and positive");
        }
    }

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

`= 0` khai báo pure virtual function và khiến `Shape` thành abstract class; caller không thể tạo trực tiếp object `Shape`. `override` yêu cầu compiler xác nhận chữ ký thật sự override một hàm virtual ở base. Nếu viết sai kiểu trả về, tham số hoặc cv-qualifier, compiler báo lỗi thay vì âm thầm tạo hàm khác tên.

Base polymorphic có destructor `virtual` nếu object derived có thể bị hủy qua pointer base. Nếu `delete` một object derived qua pointer base mà destructor base không virtual, hành vi là không xác định. Với interface chỉ cho phép mượn object và cấm `delete` qua base, có thể dùng destructor protected non-virtual; hãy chọn quyền truy cập theo hợp đồng ownership.

`std::unique_ptr<Shape>` biểu đạt một owner cho mỗi object trong vector. Khi phần tử bị hủy, destructor ảo chọn đúng chuỗi hủy của derived. Nếu chỉ mượn object, reference hoặc pointer base có thể phù hợp hơn một smart pointer sở hữu.

## Hợp đồng của lớp cơ sở

Mỗi public operation của base phải có ý nghĩa với mọi derived. Chẳng hạn, nếu `Shape::area()` hứa trả diện tích không âm, mọi subtype phải giữ được lời hứa đó. Không nên dùng public inheritance chỉ để tái sử dụng vài hàm; quan hệ “has-a” thường phù hợp với composition, còn quan hệ “is-a” phải đúng cả về hành vi.

Hàm override phải giữ ý nghĩa hợp đồng và không nên đòi hỏi điều kiện mạnh hơn caller vốn cần thỏa ở base. Derived có thể bổ sung bảo đảm, nhưng không nên phá kỳ vọng đã được công bố. Nếu một thao tác không có ý nghĩa với một subtype, đó có thể là dấu hiệu base class quá rộng.

## Cơ chế dispatch và hành vi liên quan

`virtual` cho phép dispatch động qua base reference/pointer; gọi hàm trên object trực tiếp vẫn biết kiểu tĩnh cụ thể. `final` trên class ngăn class khác kế thừa tiếp; `final` trên hàm ngăn override sâu hơn. Đây là ràng buộc thiết kế rõ ràng, không chỉ là gợi ý tối ưu hóa.

Đừng gọi hàm virtual trong constructor hoặc destructor với kỳ vọng implementation của derived đang xây dựng hay đã bị hủy sẽ chạy. Trong constructor base, phần derived chưa hoàn tất; trong destructor base, phần derived đã được hủy. Lời gọi chỉ dispatch tới lớp đang thực thi constructor/destructor đó.

## Slicing và chuyển đổi kiểu

Với một base class có thể tạo object, nếu copy object derived vào biến base theo giá trị thì chỉ phần base được sao chép; phần derived bị cắt bỏ (**object slicing**). Dùng reference/pointer base khi cần giữ đa hình. Kiểu sở hữu trong một collection dị thể thường là `std::unique_ptr<Base>`; kiểu mượn có thể là `Base&` hoặc `Base*` với lifetime được bảo đảm.

Tên hàm trong derived có thể che các overload cùng tên của base dù tham số khác nhau. `override` giúp phát hiện sai chữ ký virtual, nhưng không tự giải quyết việc che tên overload; nếu muốn đưa overload của base vào scope, có thể dùng `using Base::function_name` sau khi kiểm tra ý nghĩa thiết kế.

## Chọn đa hình runtime hay template

Kế thừa virtual hợp khi tập kiểu cụ thể có thể thay đổi trong runtime và chương trình cần xử lý chúng qua một interface chung. Template hợp khi các kiểu được xác định lúc biên dịch và có chung những thao tác cần thiết. Hai cách phục vụ nhu cầu khác nhau; xem [templates và namespace](/cpp/trung-cap/templates-namespaces).

## Lỗi thường gặp

- Quên `virtual` destructor rồi hủy derived qua base pointer.
- Viết sai chữ ký và vô tình overload thay vì override; dùng `override` để compiler kiểm tra.
- Dùng public inheritance cho quan hệ “has-a” hoặc chỉ để chia sẻ code.
- Copy object derived vào biến base theo giá trị rồi bất ngờ mất phần derived.
- Gọi virtual function trong constructor/destructor với kỳ vọng dispatch tới lớp dẫn xuất hơn.
- Lưu pointer/reference base lâu hơn lifetime của object mà nó mượn.

## Đọc tiếp

Xem [class và encapsulation](/cpp/trung-cap/classes-constructors), so sánh với [templates](/cpp/trung-cap/templates-namespaces), rồi tìm hiểu ownership bằng [smart pointers](/cpp/stl/raii-smart-pointers).
