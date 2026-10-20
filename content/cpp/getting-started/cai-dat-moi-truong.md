---
title: Cài môi trường C++
description: Cài compiler C++ trên Windows, Linux và macOS, rồi kiểm tra công cụ đang dùng.
slug: /cpp/bat-dau/cai-dat-moi-truong
category: fundamentals
categoryLabel: C++ căn bản
order: 20020
difficulty: beginner
keywords: [cài C++, Windows, Linux, macOS, GCC, Clang, MSVC]
updated: 2026-10-20
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/bat-dau/cpp-la-gi", "/cpp/bat-dau/chuong-trinh-dau-tien", "/cpp/ky-thuat/cmake"]
---

Compiler dịch source C++ thành chương trình có thể chạy. Cài compiler và build tools phù hợp hệ điều hành; IDE là lựa chọn thêm, không thay thế compiler.

## Windows

Cách phổ biến là cài Visual Studio hoặc Build Tools, chọn workload **Desktop development with C++** để có MSVC, Windows SDK và công cụ build. Mở Developer PowerShell/Command Prompt để `cl.exe` cùng biến môi trường được thiết lập.

```powershell
cl /std:c++17 /EHsc /W4 main.cpp
```

Có thể dùng GCC hoặc LLVM/Clang qua một môi trường cài đặt phù hợp, nhưng hãy kiểm tra rõ compiler đang chạy và thư viện standard library đi kèm.

## Linux

Cài gói compiler C++ từ package manager của bản phân phối, thường là GCC (`g++`) hoặc Clang (`clang++`). Ví dụ trên Debian/Ubuntu:

```sh
sudo apt update
sudo apt install build-essential
```

Kiểm tra:

```sh
g++ --version
```

Tên gói có thể khác trên Fedora, Arch hoặc distro khác; dùng tài liệu chính thức của distro.

## macOS

Cài Command Line Tools của Apple:

```sh
xcode-select --install
clang++ --version
```

`clang++` thường dùng libc++ trên macOS. Cài Xcode đầy đủ nếu workflow cần IDE, SDK hoặc công cụ Apple bổ sung.

## Kiểm tra và build thử

Tạo `main.cpp`, sau đó chọn đúng lệnh theo compiler:

```sh
g++ -std=c++17 -Wall -Wextra -Wpedantic main.cpp -o app
./app
```

Trên Windows PowerShell, chạy file tạo ra bằng `./app.exe`; nếu dùng MSVC, lệnh build mặc định thường tạo `main.exe`.

## Lỗi thường gặp

- **`command not found` hoặc `cl is not recognized`**: compiler chưa cài hoặc terminal chưa nạp `PATH`/Developer Environment.
- **IDE build được nhưng terminal không được**: IDE có thể dùng compiler khác; kiểm tra đường dẫn và phiên bản compiler.
- **Compiler không nhận `-std=c++17`**: đó có thể là cờ của GCC/Clang; MSVC dùng `/std:c++17`.

## Tự luyện

Tạo file in một dòng, build từ terminal không phụ thuộc nút Run của IDE, rồi ghi lại phiên bản compiler và lệnh đã dùng.

## Đọc tiếp

Viết [chương trình đầu tiên](/cpp/bat-dau/chuong-trinh-dau-tien) và tìm hiểu [quá trình biên dịch](/cpp/bat-dau/bien-kieu-du-lieu).
