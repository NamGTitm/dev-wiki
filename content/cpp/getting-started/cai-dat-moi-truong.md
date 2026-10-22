---
title: Cài môi trường C++
description: Cài compiler, thư viện chuẩn và công cụ build cho C++ trên Windows, Linux hoặc macOS; kiểm tra toolchain bằng một chương trình nhỏ.
slug: /cpp/bat-dau/cai-dat-moi-truong
category: fundamentals
categoryLabel: C++ căn bản
order: 20020
difficulty: beginner
keywords: [cài C++, Windows, Linux, macOS, GCC, Clang, MSVC, C++17]
updated: 2026-10-22
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/bat-dau/cpp-la-gi", "/cpp/bat-dau/chuong-trinh-dau-tien", "/cpp/ky-thuat/cmake"]
---

Để biên dịch chương trình C++, máy cần một **toolchain** gồm compiler, thư viện chuẩn C++ và linker. Trên một số nền tảng còn cần SDK hoặc công cụ build hệ thống. IDE và code editor giúp viết mã thuận tiện hơn nhưng không thay thế các thành phần này.

## Chọn compiler, thư viện và editor

| Thành phần | Vai trò | Ví dụ |
|---|---|---|
| Compiler | Kiểm tra và dịch mã nguồn C++ | GCC, Clang, MSVC |
| Standard library | Cung cấp `std::string`, `std::vector`, luồng nhập xuất và thuật toán | libstdc++, libc++, Microsoft STL |
| Linker và SDK | Kết hợp object files, thư viện và giao diện hệ điều hành | GNU linker, Windows SDK, Apple SDK |
| Editor hoặc IDE | Soạn mã, điều hướng dự án và gọi công cụ build | Visual Studio, VS Code, CLion |

Một compiler có thể dùng nhiều thư viện chuẩn tùy nền tảng; khả năng biên dịch một tính năng còn phụ thuộc cả compiler lẫn thư viện. Vì vậy, tên IDE hoặc việc một nút Run hoạt động chưa cho biết đầy đủ toolchain đang được dùng.

## Windows

Cách cài đặt phổ biến là dùng Visual Studio hoặc Visual Studio Build Tools của Microsoft. Trong Visual Studio Installer, chọn workload **Desktop development with C++** để cài MSVC, Windows SDK và công cụ build cần thiết. Có thể dùng Visual Studio để viết mã hoặc chỉ dùng Build Tools với editor khác.

Mở **Developer PowerShell for Visual Studio** hoặc **Developer Command Prompt** trước khi chạy `cl`. Các terminal này thiết lập đường dẫn tới compiler và SDK. Kiểm tra:

```powershell
cl
```

Compiler in thông tin phiên bản rồi báo thiếu tên file nguồn; thông báo đó cho biết `cl` đã được tìm thấy. Nếu PowerShell báo không nhận diện lệnh, hãy mở terminal Developer hoặc kiểm tra lại cài đặt workload.

Biên dịch một file trong Developer PowerShell:

```powershell
cl /nologo /std:c++17 /EHsc /W4 main.cpp /Fe:hello.exe
.\hello.exe
```

GCC hoặc Clang cũng có thể dùng trên Windows qua các môi trường phân phối tương ứng. Không trộn lẫn lệnh, thư viện chuẩn và biến môi trường của nhiều toolchain khi chưa biết dự án đang dùng bộ nào.

## Linux

Cài compiler bằng package manager của bản phân phối. Tên gói khác nhau giữa các distro; ví dụ:

```sh
# Debian hoặc Ubuntu
sudo apt update
sudo apt install g++
```

```sh
# Fedora
sudo dnf install gcc-c++
```

Kiểm tra compiler và thư viện đi kèm:

```sh
g++ --version
```

Nếu dùng Clang, kiểm tra bằng `clang++ --version`. Trên máy dùng container, máy trường học hoặc CI, compiler có thể đã được cài sẵn nhưng tên lệnh hoặc quyền cài đặt sẽ do môi trường đó quản lý.

## macOS

Apple cung cấp Clang và SDK thông qua Xcode Command Line Tools. Có thể yêu cầu cài bộ công cụ bằng:

```sh
xcode-select --install
```

Sau khi cài xong, xem đường dẫn bộ công cụ và phiên bản compiler:

```sh
xcode-select -p
clang++ --version
```

Xcode đầy đủ cần thiết nếu dự án dùng IDE, SDK hoặc workflow dành riêng cho nền tảng Apple; để biên dịch các ví dụ C++ cơ bản, Command Line Tools thường là đủ.

## Build và chạy thử

Lưu chương trình vào `main.cpp`. Với GCC hoặc Clang trên Linux/macOS, dùng:

```sh
g++ -std=c++17 -Wall -Wextra -Wpedantic main.cpp -o hello
./hello
```

Thay `g++` bằng `clang++` nếu muốn dùng Clang. Trên Windows PowerShell với GCC hoặc Clang, lệnh chạy thường là:

```powershell
g++ -std=c++17 -Wall -Wextra -Wpedantic main.cpp -o hello.exe
.\hello.exe
```

`-std=c++17` chọn chuẩn C++17 cho GCC/Clang; MSVC dùng `/std:c++17`. Các cờ `-Wall -Wextra -Wpedantic` bật thêm cảnh báo hữu ích, nhưng cảnh báo không thay thế việc hiểu và sửa nguyên nhân.

Lệnh build thành công tạo executable; lệnh chạy executable mới thực sự thực thi chương trình. Nếu compiler báo lỗi, chương trình chưa được cập nhật thành công. Khi build lỗi, đừng nhầm một executable cũ còn sót lại với phiên bản vừa sửa.

## Đọc thông tin toolchain

Các lệnh sau giúp xác định terminal đang thấy compiler nào:

```sh
g++ --version
clang++ --version
```

Trong PowerShell, có thể xem đường dẫn của lệnh:

```powershell
Get-Command g++ -ErrorAction SilentlyContinue
Get-Command clang++ -ErrorAction SilentlyContinue
Get-Command cl -ErrorAction SilentlyContinue
```

Ghi nhận cả compiler và thư viện chuẩn khi dự án yêu cầu một tính năng mới. Chế độ `-std=c++20` hoặc `/std:c++20` chỉ chọn quy tắc ngôn ngữ; nó không bảo đảm mọi tính năng của chuẩn đó đã có trong compiler và thư viện đang cài.

## Lỗi môi trường thường gặp

- **`command not found`, `is not recognized`**: compiler chưa cài, terminal chưa nạp môi trường hoặc `PATH` chưa trỏ tới bộ công cụ.
- **IDE build được nhưng terminal không tìm thấy compiler**: IDE có thể khởi chạy một môi trường Developer hoặc compiler khác. So sánh đường dẫn compiler và cấu hình build.
- **`cl` không chạy trong PowerShell thường**: mở Developer PowerShell/Command Prompt tương ứng với bản Visual Studio đã cài.
- **Không nhận `-std=c++17`**: đây là cú pháp cờ GCC/Clang; MSVC dùng `/std:c++17`.
- **Compiler nhận cờ chuẩn nhưng không tìm thấy header hoặc symbol**: tính năng có thể chưa được hỗ trợ trong phiên bản compiler/thư viện, hoặc lệnh chưa liên kết đúng thư viện.
- **Không tìm thấy `main.cpp`**: terminal đang ở thư mục khác. Chuyển tới thư mục chứa file hoặc truyền đúng đường dẫn tới source.
- **Linker báo thiếu `main` hoặc `WinMain`**: kiểm tra chương trình có định nghĩa đúng `int main()` và cấu hình executable không bị đặt nhầm sang ứng dụng Windows GUI.

Với chương trình nhiều file, dependency hoặc test, nên mô tả build trong CMake thay vì phải ghi nhớ một lệnh dài cho từng máy.

## Tài liệu cài đặt chính thức

- [Cài đặt C++ trong Visual Studio](https://learn.microsoft.com/cpp/build/vscpp-step-0-installation)
- [Cài đặt Microsoft C++ Build Tools độc lập](https://learn.microsoft.com/cpp/overview/acquire-msvc)
- [Cài Xcode Command Line Tools từ Terminal](https://developer.apple.com/documentation/xcode/installing-the-command-line-tools/)
- Hãy dùng tài liệu package manager của distro để cài GCC hoặc Clang trên Linux.

## Đọc tiếp

Viết [chương trình C++ đầu tiên](/cpp/bat-dau/chuong-trinh-dau-tien), rồi tìm hiểu [biến, kiểu dữ liệu và quá trình biên dịch](/cpp/bat-dau/bien-kieu-du-lieu). Khi dự án có nhiều source hoặc thư viện, xem [CMake và build systems](/cpp/ky-thuat/cmake).
