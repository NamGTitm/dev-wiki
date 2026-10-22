---
title: Chương trình C++ đầu tiên
description: Viết, biên dịch và chạy chương trình C++17 tối giản; hiểu vai trò của main, iostream và các bước build.
slug: /cpp/bat-dau/chuong-trinh-dau-tien
category: fundamentals
categoryLabel: C++ căn bản
order: 20030
difficulty: beginner
keywords: [Hello World C++, main, include, biên dịch, chạy C++, C++17]
updated: 2026-10-22
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/bat-dau/cai-dat-moi-truong", "/cpp/bat-dau/bien-kieu-du-lieu", "/cpp/bat-dau/ham-pham-vi"]
---

Chương trình đầu tiên kiểm tra ba việc riêng biệt: source có viết đúng cú pháp không, toolchain có build được executable không, và executable có chạy đúng trong terminal không. Khi hiểu từng bước, bạn sẽ dễ phân biệt lỗi mã nguồn với lỗi cài đặt.

## Mã nguồn

Tạo file văn bản tên `main.cpp` và lưu nội dung sau:

```cpp
#include <iostream>

int main() {
    std::cout << "Xin chao, C++!\n";
    return 0;
}
```

Kết quả mong đợi khi chạy là:

```text
Xin chao, C++!
```

## Đọc chương trình

- `#include <iostream>` yêu cầu tiền xử lý đưa khai báo của thư viện luồng nhập xuất vào translation unit này. Thiếu include cần thiết thường khiến compiler báo không biết tên `std::cout`.
- `int main()` định nghĩa hàm `main`, điểm vào của chương trình hosted C++. Kiểu trả về `int` cho phép báo trạng thái kết thúc; không dùng `void main()` trong chương trình C++ chuẩn.
- `std::cout` là luồng xuất chuẩn. Toán tử `<<` đưa dữ liệu vào luồng theo thứ tự từ trái sang phải.
- Chuỗi giữa dấu ngoặc kép là string literal. Dãy `\n` bên trong tạo ký tự xuống dòng khi chương trình chạy.
- `std::` cho biết tên thuộc namespace chuẩn, nên không cần viết `using namespace std;`.
- `return 0;` kết thúc `main` với mã thành công. Nếu luồng điều khiển chạm dấu `}` cuối `main`, C++ cũng xem như trả về `0`; viết rõ dòng này vẫn hữu ích khi mới học.

Dấu ngoặc nhọn `{}` gom các câu lệnh thuộc thân hàm. Dấu chấm phẩy kết thúc câu lệnh `std::cout` và câu lệnh `return`; quên dấu này thường làm thông báo lỗi xuất hiện ở dòng tiếp theo.

## Biên dịch và chạy

Với GCC hoặc Clang trên Linux/macOS, mở terminal tại thư mục chứa `main.cpp`:

```sh
g++ -std=c++17 -Wall -Wextra -Wpedantic main.cpp -o hello
./hello
```

Thay `g++` bằng `clang++` để dùng Clang. Trên Windows PowerShell với GCC/Clang, executable thường có phần mở rộng `.exe`:

```powershell
g++ -std=c++17 -Wall -Wextra -Wpedantic main.cpp -o hello.exe
.\hello.exe
```

Với MSVC, mở Developer PowerShell for Visual Studio:

```powershell
cl /nologo /std:c++17 /EHsc /W4 main.cpp /Fe:hello.exe
.\hello.exe
```

Compiler đọc source và kiểm tra/biên dịch nó; linker kết hợp object code cùng thư viện cần thiết để tạo executable. Một lệnh `g++` hoặc `cl` cho file đơn thường điều phối cả hai bước. Chỉ dòng lệnh chạy `hello` mới thực sự thực thi chương trình.

## Hiểu kết quả build

- Nếu lệnh biên dịch kết thúc thành công, terminal trả về prompt và tạo `hello` hoặc `hello.exe`.
- Nếu compiler báo lỗi cú pháp hay thiếu khai báo, chưa có executable mới được tạo thành công. Đọc thông báo đầu tiên trước; nhiều lỗi phía sau có thể chỉ là hệ quả của lỗi đó.
- Nếu bước biên dịch thành công nhưng linker báo thiếu symbol, chương trình có thể thiếu định nghĩa hàm, thiếu source file hoặc thiếu thư viện liên kết.
- Nếu executable chạy nhưng không in nội dung như mong đợi, hãy kiểm tra bạn đã chạy đúng file vừa build và đúng thư mục chưa.

## Lỗi thường gặp

- **Thiếu `;` hoặc ngoặc:** kiểm tra cả dòng ngay trước vị trí compiler báo lỗi.
- **`iostream` hoặc `std::cout` không được nhận diện:** giữ `#include <iostream>` ở đầu file và xác nhận file đang được biên dịch như C++.
- **`g++`/`clang++` không được nhận diện:** kiểm tra đã cài toolchain và terminal có thấy compiler trong `PATH` chưa; hướng dẫn nằm ở [cài môi trường C++](/cpp/bat-dau/cai-dat-moi-truong).
- **Không tìm thấy `main.cpp`:** chuyển terminal tới thư mục chứa file hoặc truyền đường dẫn chính xác.
- **Chạy nhầm executable cũ:** nếu build vừa thất bại, executable cũ vẫn có thể còn trên đĩa; chỉ chạy sau khi xác nhận lệnh build thành công.
- **Dùng `void main()`:** viết `int main()` theo quy tắc của chương trình hosted C++.

## Đọc tiếp

Sau khi chương trình tối giản hoạt động, tìm hiểu [biến, kiểu dữ liệu và quá trình biên dịch](/cpp/bat-dau/bien-kieu-du-lieu), rồi đọc về [hàm và phạm vi biến](/cpp/bat-dau/ham-pham-vi) để tách xử lý thành các phần có tên rõ ràng.
