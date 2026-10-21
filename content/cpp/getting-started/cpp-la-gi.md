---
title: C++ là gì? 
description: Tìm hiểu ngôn ngữ C++, nguồn gốc, ứng dụng thực tế, compiler, thư viện chuẩn, quá trình biên dịch và sự khác biệt giữa C++11, C++14, C++17, C++20, C++23 và C++26.
slug: /cpp/bat-dau/cpp-la-gi
category: fundamentals
categoryLabel: C++ căn bản
order: 20010
difficulty: beginner
keywords: [C++, C++17, C++20, C++23, C++26, compiler, standard library, GCC, Clang, MSVC, lập trình C++, Modern C++]
updated: 2026-10-21
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/bat-dau/cai-dat-moi-truong", "/cpp/bat-dau/lo-trinh-hoc", "/cpp/stl/cpp17-20-23"]
---

# C++ là gì? 

C++ là một trong những ngôn ngữ lập trình có ảnh hưởng lớn trong lĩnh vực phát triển phần mềm, đặc biệt ở những hệ thống yêu cầu hiệu năng cao, khả năng kiểm soát tài nguyên và tương tác trực tiếp với phần cứng.

Ngôn ngữ này được sử dụng trong nhiều lĩnh vực như phát triển trò chơi, phần mềm desktop, robot, hệ thống nhúng, trình duyệt web, công cụ đồ họa và các thư viện tính toán hiệu năng cao.

Tuy nhiên, C++ không chỉ dành cho lập trình hệ thống. Đây còn là một ngôn ngữ phù hợp để học tư duy lập trình, cấu trúc dữ liệu, thuật toán và những nguyên lý quan trọng của kỹ thuật phần mềm.

Bài học này sẽ giúp bạn hiểu:

- C++ là gì và nguồn gốc của ngôn ngữ.
- C++ được sử dụng để xây dựng những phần mềm nào.
- Điểm khác biệt giữa C++ với một số ngôn ngữ phổ biến.
- Compiler, linker và thư viện chuẩn hoạt động như thế nào.
- Các phiên bản C++ từ C++98 đến C++26.
- Vì sao bộ tài liệu này sử dụng C++17 làm nền tảng.
- Cách xác định và lựa chọn phiên bản C++ cho dự án.

Không yêu cầu kiến thức lập trình trước đó.

---

## 1. C++ là gì?

**C++ là ngôn ngữ lập trình đa mục đích (general-purpose programming language)**, hỗ trợ nhiều phong cách lập trình và cho phép lập trình viên kiểm soát khá chi tiết cách phần mềm sử dụng tài nguyên hệ thống.

C++ có thể được sử dụng để viết:

- Chương trình chạy trên máy tính cá nhân.
- Ứng dụng có giao diện đồ họa.
- Game engine và công cụ phát triển trò chơi.
- Phần mềm điều khiển thiết bị và robot.
- Thư viện toán học, xử lý hình ảnh và âm thanh.
- Thành phần hệ điều hành và phần mềm hệ thống.
- Các chương trình giải thuật và tính toán khoa học.

Một chương trình C++ đơn giản:

```cpp
#include <iostream>

int main() {
    std::cout << "Hello, C++!\n";
    return 0;
}
```

Kết quả:

```text
Hello, C++!
```

Đoạn chương trình trên yêu cầu máy tính hiển thị dòng chữ `Hello, C++!`.

Mặc dù chỉ có vài dòng mã, nó đã thể hiện những thành phần quan trọng của một chương trình C++:

| Thành phần | Ý nghĩa |
|---|---|
| `#include <iostream>` | Sử dụng thư viện nhập xuất |
| `int main()` | Hàm bắt đầu thực thi chương trình |
| `{}` | Xác định khối lệnh |
| `std::cout` | Xuất dữ liệu |
| `<<` | Đưa dữ liệu vào luồng xuất |
| `'\n'` | Ký tự xuống dòng |
| `return 0` | Kết thúc thành công |

Bạn sẽ được học chi tiết từng thành phần trong những bài tiếp theo.

### 1.1. C++ có phải ngôn ngữ lập trình cấp cao?

Có. C++ được xem là ngôn ngữ lập trình cấp cao vì cung cấp các khái niệm như hàm, lớp, đối tượng, template và thư viện để lập trình viên mô tả thuật toán mà không phải viết trực tiếp từng lệnh máy.

Đồng thời, C++ cho phép thao tác với địa chỉ bộ nhớ, quản lý vòng đời đối tượng và làm việc với các giao diện cấp thấp.

Vì vậy, C++ có thể hỗ trợ cả những công việc trừu tượng ở cấp ứng dụng lẫn các tác vụ gần với phần cứng.

**Điểm quan trọng:** C++ cho phép kiểm soát tài nguyên, nhưng điều đó không đồng nghĩa mọi chương trình C++ đều phải quản lý bộ nhớ thủ công.

C++ hiện đại khuyến khích sử dụng container, RAII và các công cụ quản lý tài nguyên nhằm giảm lỗi và đơn giản hóa mã nguồn.

### 1.2. C++ hỗ trợ những phong cách lập trình nào?

C++ là ngôn ngữ đa mô hình (*multi-paradigm*).

Một số phong cách phổ biến:

| Phong cách | Mục đích |
|---|---|
| Procedural programming | Tổ chức chương trình bằng hàm và các bước xử lý |
| Object-oriented programming | Tổ chức chương trình bằng lớp và đối tượng |
| Generic programming | Viết mã tổng quát với template |
| Functional-style programming | Sử dụng hàm, lambda và biến đổi dữ liệu |
| Compile-time programming | Thực hiện những phép tính và kiểm tra trong quá trình biên dịch |

Người mới nên bắt đầu bằng biến, hàm, điều kiện, vòng lặp và thuật toán.

Không cần học ngay toàn bộ các kỹ thuật hướng đối tượng hoặc template nâng cao.

---

## 2. Nguồn gốc của C++

C++ được phát triển bởi **Bjarne Stroustrup** tại Bell Labs.

Quá trình phát triển bắt đầu từ năm 1979 với dự án có tên *C with Classes*.

Mục tiêu ban đầu là kết hợp khả năng lập trình hệ thống của C với những cơ chế tổ chức chương trình ở mức trừu tượng cao hơn, đặc biệt là lớp và đối tượng.

Tên gọi C++ xuất hiện vào năm 1983, và ngôn ngữ được giới thiệu rộng rãi trong những năm tiếp theo.

### 2.1. Tại sao lại có tên C++?

Trong C và C++, toán tử `++` được sử dụng để tăng một giá trị lên một đơn vị.

Ví dụ:

```cpp
int number{10};

++number;
```

Sau câu lệnh trên, `number` bằng `11`.

Tên gọi C++ gợi ý một bước phát triển tiếp theo từ ngôn ngữ C.

Tuy nhiên, C++ không đơn thuần là C được bổ sung thêm vài tính năng. Qua nhiều thập kỷ, C++ đã phát triển thành một ngôn ngữ riêng với hệ thống kiểu, thư viện và những quy tắc lập trình đặc trưng.

### 2.2. C và C++ có giống nhau không?

C++ chịu ảnh hưởng mạnh từ C và duy trì khả năng tương thích với nhiều cấu trúc của C.

Ví dụ, cả hai ngôn ngữ đều có:

```cpp
int age = 16;
```

Và:

```cpp
if (age >= 18) {
    // Xu ly dieu kien
}
```

Tuy nhiên, C và C++ là **hai ngôn ngữ riêng biệt**, có các bộ tiêu chuẩn và quy tắc khác nhau.

Một số đoạn mã hợp lệ trong C có thể không hợp lệ trong C++, và ngược lại.

C++ cung cấp thêm nhiều công cụ như:

- Classes và object-oriented programming.
- Function overloading.
- Templates.
- References.
- Constructors và destructors.
- `std::string`, `std::vector` và nhiều container.
- Smart pointers và RAII.
- Lambda expressions.
- Compile-time programming.

Không nên mặc định mọi đoạn mã C đều có thể biên dịch nguyên vẹn dưới dạng C++.

---

## 3. C++ được sử dụng ở đâu?

C++ thường được lựa chọn cho những hệ thống cần hiệu năng, khả năng kiểm soát tài nguyên hoặc tích hợp với phần mềm và phần cứng hiện có.

### 3.1. Phát triển trò chơi

<text weight="medium">Game Engine và đồ họa thời gian thực</text>

<AsyncImageGroup query={["Unreal Engine editor game development interface screenshot","3D game engine C++ graphics rendering editor viewport"]} aspectRatio="5:3" layout="carousel"/>

C++ được sử dụng rộng rãi trong việc phát triển game engine, hệ thống vật lý, đồ họa và những thành phần cần hiệu năng cao.

Một ví dụ nổi bật là <Entity category="software" value="Unreal Engine" disambig="Công cụ phát triển game của Epic Games"/>.

C++ thường được sử dụng để triển khai những hệ thống cốt lõi, trong khi các công cụ scripting hoặc visual scripting giúp phát triển gameplay nhanh hơn.

### 3.2. Ứng dụng desktop

<text weight="medium">Phần mềm chạy trên Windows, Linux và macOS</text>

<AsyncImageGroup query={["Qt Creator IDE C++ desktop application interface screenshot","Blender 3D modeling desktop software screenshot interface"]} aspectRatio="5:3" layout="carousel"/>

C++ có thể được sử dụng để xây dựng:

- Phần mềm chỉnh sửa hình ảnh.
- Công cụ thiết kế và mô phỏng 3D.
- Phần mềm kỹ thuật.
- Trình chỉnh sửa mã nguồn.
- Ứng dụng xử lý âm thanh và video.

Những công nghệ thường gặp gồm Qt, Win32 API và các thư viện giao diện đa nền tảng.

### 3.3. Hệ thống nhúng và robot

<AsyncImageGroup query={["robot arm engineering electronics controller development laboratory","embedded systems microcontroller development board robotics engineering"]} aspectRatio="5:3" layout="carousel"/>

C++ được sử dụng trong nhiều hệ thống điều khiển thiết bị và robot.

Ví dụ:

- Xử lý dữ liệu từ cảm biến.
- Điều khiển động cơ.
- Lập trình bộ điều khiển.
- Xây dựng thuật toán định vị và điều hướng.
- Xử lý tín hiệu và dữ liệu thời gian thực.

Trong lĩnh vực này, C++ có thể được sử dụng cùng những framework như ROS 2 hoặc các thư viện dành cho vi điều khiển.

Tuy nhiên, việc một thiết bị hỗ trợ C++ đến mức nào còn phụ thuộc vào phần cứng, toolchain và môi trường runtime.

### 3.4. Phần mềm hệ thống và hạ tầng

C++ cũng xuất hiện trong nhiều thành phần của:

- Trình duyệt web.
- Cơ sở dữ liệu.
- Công cụ biên dịch.
- Thư viện mạng.
- Hệ thống lưu trữ.
- Phần mềm xử lý dữ liệu hiệu năng cao.

Một số dự án sử dụng C++ cho toàn bộ hệ thống, trong khi những dự án khác kết hợp C++ với Rust, C, Python hoặc ngôn ngữ khác.

**Không phải mọi dự án đều nên sử dụng C++.**

Đối với web frontend, automation script nhỏ hoặc ứng dụng cần phát triển rất nhanh, các ngôn ngữ khác có thể mang lại hiệu quả tốt hơn.

Lựa chọn ngôn ngữ nên dựa trên yêu cầu kỹ thuật thay vì chỉ dựa vào danh tiếng về hiệu năng.

---

## 4. So sánh C++ với một số ngôn ngữ lập trình

| Tiêu chí | C++ | Python | Java | Rust |
|---|---|---|---|---|
| Kiểu dữ liệu | Tĩnh | Động | Tĩnh | Tĩnh |
| Thực thi phổ biến | Mã máy native | Interpreter/VM | JVM | Mã máy native |
| Quản lý bộ nhớ | RAII, tự động và thủ công | Runtime/GC | Garbage collector | Ownership và borrowing |
| Kiểm soát tài nguyên | Rất cao | Thường gián tiếp | Có giới hạn hơn | Rất cao |
| Độ phức tạp khi bắt đầu | Khá cao | Thấp | Trung bình | Khá cao |
| Ứng dụng nổi bật | Hệ thống, game, kỹ thuật | Automation, AI, scripting | Backend, enterprise | Hệ thống, hạ tầng |

Bảng trên mô tả những đặc điểm thường gặp, không phải giới hạn tuyệt đối của từng ngôn ngữ.

Ví dụ, Python có thể sử dụng các thư viện native rất nhanh, Java có thể tận dụng JIT compilation, còn C++ không phải lúc nào cũng cho hiệu năng tốt nhất nếu chương trình được thiết kế hoặc triển khai kém.

### 4.1. Khi nào nên học C++?

C++ phù hợp khi bạn muốn:

1. Hiểu sâu hơn về kiểu dữ liệu và bộ nhớ.
2. Học cấu trúc dữ liệu và thuật toán.
3. Phát triển phần mềm hiệu năng cao.
4. Lập trình robot, đồ họa hoặc hệ thống nhúng.
5. Xây dựng ứng dụng desktop hoặc thư viện native.
6. Nghiên cứu kiến trúc phần mềm và tối ưu hóa tài nguyên.

Nếu mục tiêu chỉ là tự động hóa một công việc đơn giản, Python có thể phù hợp hơn.

Nếu phát triển giao diện web, JavaScript hoặc TypeScript thường là lựa chọn tự nhiên hơn.

**Một kỹ sư giỏi không cần sử dụng C++ cho mọi dự án, mà cần hiểu khi nào C++ mang lại lợi thế thực tế.**

---

## 5. C++ có phải ngôn ngữ biên dịch không?

C++ thường được gọi là ngôn ngữ lập trình biên dịch (*compiled language*).

Trong các toolchain phổ biến, mã nguồn C++ được biên dịch thành mã máy để chạy trên nền tảng mục tiêu.

Tuy nhiên, tiêu chuẩn C++ không bắt buộc mọi implementation phải tạo ra một tệp thực thi native theo cùng một quy trình.

Các trình thông dịch, môi trường tương tác hoặc cơ chế JIT cũng có thể hỗ trợ thực thi mã C++ trong những ngữ cảnh nhất định.

Trong bộ tài liệu này, chúng ta tập trung vào quy trình biên dịch thông thường bằng GCC, Clang hoặc MSVC.

### 5.1. Mã nguồn (Source code)

Mã nguồn là phần chương trình do lập trình viên viết.

Tệp C++ thường có phần mở rộng:

```text
main.cpp
```

Ví dụ:

```cpp
#include <iostream>

int main() {
    int a{5};
    int b{3};

    std::cout << a + b << '\n';

    return 0;
}
```

Máy tính không trực tiếp thực thi nội dung tệp `.cpp` như một chương trình native thông thường.

Mã nguồn cần được xử lý bởi toolchain phù hợp.

### 5.2. Compiler là gì?

Compiler là công cụ phân tích mã nguồn và chuyển đổi chương trình sang dạng biểu diễn đích.

Trong quá trình này, compiler thực hiện nhiều công việc như:

- Phân tích cú pháp.
- Kiểm tra kiểu dữ liệu.
- Phát hiện những lỗi ngôn ngữ có thể chẩn đoán.
- Tối ưu hóa khi được cấu hình.
- Sinh mã cho nền tảng đích.

Ví dụ:

```cpp
int age = "Hello";
```

Đây là một phép khởi tạo không hợp lệ trong C++.

Compiler sẽ chẩn đoán lỗi thay vì tạo ra chương trình hợp lệ từ câu lệnh này.

### 5.3. Các compiler C++ phổ biến

| Compiler | Dự án | Môi trường thường gặp |
|---|---|---|
| GCC / G++ | GNU Compiler Collection | Linux, Windows, nhiều nền tảng khác |
| Clang / Clang++ | LLVM | Linux, macOS, Windows |
| MSVC | Microsoft Visual C++ | Windows, Visual Studio |

Cần lưu ý rằng GCC là bộ sưu tập compiler cho nhiều ngôn ngữ, còn `g++` là driver thường dùng để biên dịch và liên kết chương trình C++.

Tương tự, `clang++` là driver C++ của Clang.

### 5.4. Compiler không phải IDE

IDE (Integrated Development Environment) là môi trường phát triển tích hợp.

Một số IDE và code editor thường gặp:

- Visual Studio.
- Visual Studio Code.
- CLion.
- Qt Creator.

IDE hoặc editor có thể hỗ trợ viết mã, gợi ý cú pháp, chạy debugger và điều khiển hệ thống build.

Nhưng chúng không đồng nghĩa với compiler.

Ví dụ, Visual Studio Code chỉ là trình chỉnh sửa mã nguồn nếu chưa được cấu hình với một toolchain phù hợp.

Để biên dịch C++, bạn vẫn cần một compiler như GCC, Clang hoặc MSVC.

---

## 6. Quá trình biên dịch C++ hoạt động như thế nào?

Một quy trình build C++ thông thường có thể được mô tả như sau:

```text
C++ Source Code (.cpp)
          |
          v
    Preprocessing
          |
          v
      Compilation
          |
          v
       Assembly
          |
          v
    Object File
          |
          v
       Linking
          |
          v
  Executable / Library
```

Đây là mô hình khái quát. Một số toolchain kết hợp hoặc triển khai các bước nội bộ theo cách khác.

### 6.1. Preprocessing

Preprocessor xử lý những chỉ thị bắt đầu bằng `#`.

Ví dụ:

```cpp
#include <iostream>
#define MAX_COUNT 100
```

Các chỉ thị thường gặp gồm:

| Chỉ thị | Công dụng |
|---|---|
| `#include` | Đưa nội dung header vào quá trình tiền xử lý |
| `#define` | Định nghĩa macro |
| `#ifdef` | Kiểm tra macro đã được định nghĩa |
| `#ifndef` | Kiểm tra macro chưa được định nghĩa |
| `#if` | Tiền xử lý có điều kiện |
| `#endif` | Kết thúc khối điều kiện |

### 6.2. Compilation

Compiler phân tích chương trình theo quy tắc của C++ và tạo mã đích thông qua các bước triển khai phù hợp.

Kết quả có thể được chuyển thành object file để sử dụng ở giai đoạn tiếp theo.

### 6.3. Linking

Một chương trình có thể gồm nhiều tệp mã nguồn:

```text
Project/
├── main.cpp
├── Math.cpp
└── Math.h
```

Các source file có thể được biên dịch thành những object file riêng.

Linker giải quyết các tham chiếu giữa chúng và liên kết các thư viện cần thiết.

Ví dụ:

```text
main.cpp -> main.o
Math.cpp -> Math.o

main.o + Math.o + Libraries
              |
              v
          Executable
```

Nếu chương trình gọi một hàm đã được khai báo nhưng không có định nghĩa phù hợp trong các thành phần liên kết, linker có thể báo lỗi.

### 6.4. Có phải mọi chương trình C++ đều tạo ra file .exe?

Không.

Trên Windows, chương trình thực thi thường sử dụng phần mở rộng `.exe`.

Trên Linux, tệp thực thi thường sử dụng định dạng ELF.

Trên macOS, định dạng Mach-O thường được sử dụng.

Ngoài chương trình thực thi, C++ còn được sử dụng để tạo:

- Static libraries.
- Shared libraries.
- Dynamic-link libraries.
- Object files.
- Các thành phần khác dành cho nền tảng chuyên dụng.

Sản phẩm build phụ thuộc vào cấu hình dự án và nền tảng đích.

---

## 7. Thư viện chuẩn C++ là gì?

Ngoài cú pháp của ngôn ngữ, C++ còn có **C++ Standard Library**, cung cấp các thành phần phổ biến để phát triển phần mềm.

Ví dụ:

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
```

Mỗi header cho phép sử dụng những công cụ tương ứng.

| Thành phần | Công dụng |
|---|---|
| `std::cout` | Xuất dữ liệu |
| `std::cin` | Nhập dữ liệu |
| `std::string` | Xử lý chuỗi |
| `std::vector` | Mảng động |
| `std::array` | Mảng kích thước cố định |
| `std::map` | Ánh xạ khóa và giá trị có thứ tự |
| `std::sort` | Sắp xếp |
| `std::find` | Tìm kiếm |
| `std::unique_ptr` | Quản lý quyền sở hữu động |
| `std::filesystem` | Thao tác với đường dẫn và hệ thống tệp |

### 7.1. Ví dụ sử dụng thư viện chuẩn

```cpp
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
    std::vector<int> numbers{5, 2, 8, 1, 4};

    std::sort(numbers.begin(), numbers.end());

    for (int number : numbers) {
        std::cout << number << ' ';
    }

    std::cout << '\n';

    return 0;
}
```

Kết quả:

```text
1 2 4 5 8
```

Trong chương trình này:

- `std::vector` quản lý tập hợp các số nguyên.
- `std::sort` sắp xếp dữ liệu.
- Vòng lặp range-based `for` duyệt từng phần tử.

Không cần tự xây dựng thuật toán sắp xếp chỉ để hoàn thành thao tác thông thường này.

### 7.2. Standard Library có giống STL không?

Không hoàn toàn.

STL (Standard Template Library) thường được dùng để chỉ nhóm các thành phần như:

- Containers.
- Iterators.
- Algorithms.
- Function objects.

Thư viện chuẩn C++ có phạm vi rộng hơn STL, bao gồm cả nhập xuất, xử lý chuỗi, quản lý bộ nhớ, đa luồng, thời gian và nhiều công cụ khác.

Vì vậy, `std::vector` và `std::sort` thường được gọi là thành phần STL, còn `std::cout` thuộc thư viện chuẩn nhưng không phải thành phần STL theo nghĩa truyền thống.

### 7.3. Các implementation của Standard Library

Một số implementation phổ biến:

| Thư viện | Thường được sử dụng với |
|---|---|
| libstdc++ | GCC |
| libc++ | Clang |
| MSVC STL | Microsoft Visual C++ |

Compiler và standard library là những thành phần liên quan nhưng có thể phát triển độc lập.

Clang có thể được cấu hình sử dụng những thư viện chuẩn khác nhau tùy nền tảng và toolchain.

Do đó, một compiler hỗ trợ cú pháp C++23 chưa chắc thư viện chuẩn tương ứng đã triển khai đầy đủ mọi API C++23.

---

## 8. C++ Standard là gì?

C++ Standard là bộ đặc tả quy định các yêu cầu đối với một implementation C++.

Nội dung bao gồm:

- Cú pháp ngôn ngữ.
- Kiểu dữ liệu và biểu thức.
- Quy tắc về đối tượng và thời gian sống.
- Các cơ chế lập trình.
- Hành vi được tiêu chuẩn quy định.
- Giao diện và yêu cầu của thư viện chuẩn.

Các phiên bản C++ được phát triển và tiêu chuẩn hóa thông qua tổ chức ISO/IEC, với sự tham gia của nhóm công tác WG21.

### 8.1. Vì sao C++ có nhiều phiên bản?

Công nghệ phần mềm liên tục thay đổi.

Qua thời gian, C++ cần cải tiến để:

- Bổ sung khả năng mới.
- Cải thiện tính an toàn và độ rõ ràng.
- Giảm mã lặp.
- Hỗ trợ các mô hình lập trình hiện đại.
- Nâng cao khả năng tối ưu hóa.
- Chuẩn hóa những công cụ hữu ích.

Tuy nhiên, mỗi phiên bản mới cũng phải cân nhắc khả năng tương thích với lượng mã C++ đang được sử dụng trong thực tế.

Vì vậy, ngôn ngữ được phát triển theo những chu kỳ cập nhật tiêu chuẩn.

### 8.2. Phiên bản C++ không phải phiên bản compiler

Ví dụ:

```text
C++17
```

là tên phiên bản của tiêu chuẩn ngôn ngữ.

Trong khi đó:

```text
GCC 15
Clang 20
MSVC 19.x
```

là các phiên bản hoặc dòng phiên bản công cụ triển khai.

Một compiler có thể hỗ trợ nhiều chuẩn C++ khác nhau.

Đừng nhầm `GCC 17` với `C++17`. Chúng thuộc hai hệ thống đánh số hoàn toàn khác nhau.

---

## 9. Lịch sử các phiên bản C++

C++ đã trải qua nhiều lần thay đổi quan trọng.

| Phiên bản | Năm gắn với chuẩn | Điểm nổi bật |
|---|---|---|
| C++98 | 1998 | Chuẩn ISO đầu tiên |
| C++03 | 2003 | Sửa lỗi và hoàn thiện C++98 |
| C++11 | 2011 | Nền tảng Modern C++ |
| C++14 | 2014 | Cải tiến C++11 |
| C++17 | 2017 | Structured bindings, optional, filesystem |
| C++20 | 2020 | Concepts, ranges, modules, coroutines |
| C++23 | 2023 | expected, print, mdspan và cải tiến thư viện |
| C++26 | 2026 | Thế hệ tiếp theo, hoàn tất kỹ thuật tại WG21 |

**Lưu ý:** Tên phiên bản như C++23 phản ánh chu kỳ hoàn thiện tiêu chuẩn, không nhất thiết trùng năm công bố tài liệu ISO. Chẳng hạn, C++23 được công bố chính thức dưới mã ISO/IEC 14882:2024.

### 9.1. C++98 và C++03

C++98 là phiên bản được chuẩn hóa quốc tế đầu tiên.

Nó thiết lập nền tảng cho nhiều thành phần quan trọng:

- Classes.
- Templates.
- Exceptions.
- Namespaces.
- Standard Library.
- Containers và algorithms.

C++03 chủ yếu sửa đổi và làm rõ những vấn đề của C++98.

Các phiên bản này có vai trò lịch sử lớn nhưng không phải lựa chọn mặc định lý tưởng cho người bắt đầu dự án mới ngày nay.

### 9.2. C++11: Bước ngoặt của Modern C++

C++11 là một trong những bản nâng cấp quan trọng nhất của C++.

Một số tính năng nổi bật:

- `auto`.
- Lambda expressions.
- Range-based `for`.
- Move semantics.
- Rvalue references.
- `nullptr`.
- `constexpr`.
- `enum class`.
- Smart pointers trong thư viện chuẩn.
- Thư viện hỗ trợ concurrency.

Ví dụ:

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> numbers{1, 2, 3};

    for (auto number : numbers) {
        std::cout << number << '\n';
    }
}
```

Đây là cú pháp C++11 và tiếp tục hoạt động trong các chuẩn mới hơn.

### 9.3. C++14: Hoàn thiện C++11

C++14 tập trung cải tiến những tính năng đã được giới thiệu trong C++11.

Một số bổ sung:

- Generic lambdas.
- Cải tiến `constexpr`.
- Return type deduction cho hàm thông thường.
- `std::make_unique`.
- Binary literals.
- Digit separators.

Ví dụ:

```cpp
auto add = [](auto a, auto b) {
    return a + b;
};
```

Cú pháp generic lambda trong ví dụ được hỗ trợ từ C++14.

### 9.4. C++17: Cân bằng giữa hiện đại và ổn định

C++17 mang đến nhiều cải tiến giúp mã nguồn rõ ràng và thuận tiện hơn.

Một số tính năng nổi bật:

- Structured bindings.
- `if constexpr`.
- Inline variables.
- `std::optional`.
- `std::variant`.
- `std::string_view`.
- `std::filesystem`.
- `std::any`.
- Class template argument deduction.

Ví dụ structured bindings:

```cpp
#include <iostream>
#include <utility>

int main() {
    std::pair<int, int> point{10, 20};

    auto [x, y] = point;

    std::cout << x << ' ' << y << '\n';
}
```

Kết quả:

```text
10 20
```

Thay vì phải truy cập `point.first` và `point.second`, structured bindings cho phép đặt tên trực tiếp cho các thành phần.

Đây là một trong những lý do C++17 phù hợp làm nền tảng cho bộ tài liệu.

### 9.5. C++20: Một bản nâng cấp lớn

C++20 bổ sung nhiều cơ chế quan trọng:

- Concepts.
- Ranges.
- Coroutines.
- Modules.
- Three-way comparison `<=>`.
- `std::span`.
- `std::format`.
- `consteval` và `constinit`.

Ví dụ sử dụng concepts:

```cpp
#include <concepts>

template <std::integral T>
T add(T a, T b) {
    return a + b;
}
```

Concepts giúp diễn đạt các ràng buộc kiểu cho template rõ ràng hơn.

C++20 là bước phát triển lớn, không chỉ bổ sung một vài cú pháp nhỏ.

### 9.6. C++23: Cải thiện trải nghiệm phát triển

C++23 tiếp tục hoàn thiện ngôn ngữ và thư viện chuẩn.

Một số tính năng đáng chú ý:

- `std::expected`.
- `std::print` và `std::println`.
- `std::mdspan`.
- Cải tiến Ranges.
- `if consteval`.
- Deducing this (explicit object parameter).
- Nhiều cải tiến `constexpr`.

Ví dụ:

```cpp
#include <print>

int main() {
    std::println("Hello, {}!", "C++23");
}
```

Đây là ví dụ C++23.

Nó yêu cầu compiler và standard library có hỗ trợ `<print>`.

Nếu compiler chấp nhận chế độ C++23 nhưng header `<print>` chưa có trong thư viện tương ứng, chương trình vẫn không thể biên dịch thành công.

### 9.7. C++26: Thế hệ tiếp theo

C++26 tiếp tục mở rộng C++ với nhiều tính năng về ngôn ngữ và thư viện.

Những hướng cải tiến nổi bật gồm:

- Static reflection.
- Contracts.
- Cải tiến compile-time programming.
- `std::inplace_vector`.
- Một số công cụ mới phục vụ concurrency và dữ liệu.
- Những cải tiến về an toàn và tính biểu đạt của ngôn ngữ.

WG21 đã hoàn tất công việc kỹ thuật trên C++26 vào tháng 3/2026. Quy trình phê duyệt, biên tập và công bố tài liệu ISO là những bước cần phân biệt với việc chốt nội dung kỹ thuật.

Ngoài ra, mức hỗ trợ C++26 của compiler và thư viện chuẩn vẫn phụ thuộc vào từng phiên bản công cụ.

**Không nên mặc định rằng bật chế độ C++26 đồng nghĩa tất cả tính năng C++26 đều đã được triển khai đầy đủ.**

---

## 10. Vì sao bộ tài liệu sử dụng C++17 làm chuẩn?

Bộ tài liệu trang web này sử dụng **C++17 làm baseline** cho các bài nhập môn.

Điều này không có nghĩa C++17 là phiên bản tốt nhất trong mọi trường hợp hoặc các phiên bản mới hơn không đáng sử dụng.

Quyết định này dựa trên ba yếu tố chính.

### 10.1. Khả năng tương thích rộng

C++17 đã được GCC, Clang và MSVC hỗ trợ trong thời gian dài.

Những tính năng phổ biến của C++17 thường có thể sử dụng trên các toolchain hiện đại mà không cần cấu hình thử nghiệm.

Điều này giúp người mới tránh được nhiều vấn đề do khác biệt giữa phiên bản compiler và standard library.

### 10.2. Có đủ công cụ của Modern C++

C++17 đã bao gồm phần lớn nền tảng quan trọng được giới thiệu từ C++11 và C++14.

Người học có thể sử dụng:

```cpp
auto
nullptr
constexpr
std::vector
std::unique_ptr
```

Cùng các tính năng mới hơn như:

```cpp
std::optional
std::variant
std::string_view
```

Nhờ đó, tài liệu có thể hướng dẫn theo phong cách C++ hiện đại mà không cần sử dụng ngay những cơ chế nâng cao của C++20.

### 10.3. Tách kiến thức nền tảng và tính năng mới

Ví dụ một vòng lặp:

```cpp
for (int i = 0; i < 10; ++i) {
    // Process
}
```

hoạt động trên C++11, C++14, C++17, C++20 và C++23.

Không có lý do phải viết lại bài học vòng lặp cho mỗi phiên bản.

Thay vào đó, các bài C++20 hoặc C++23 tập trung giải thích phần khác biệt so với nền tảng đã học.

**Quy ước của bộ tài liệu:**

- Bài cơ bản sử dụng C++17.
- Tính năng xuất hiện ở C++20 trở lên phải được ghi rõ phiên bản.
- Những cơ chế nâng cao được giải thích trong bài chuyên đề.
- Ví dụ không phụ thuộc compiler extension nếu không có ghi chú.
- Một chương trình yêu cầu chuẩn mới phải khai báo rõ yêu cầu đó.

---

## 11. Làm sao chọn phiên bản C++ cho dự án?

Không có quy tắc bắt buộc mọi dự án mới phải dùng cùng một phiên bản C++.

Việc lựa chọn phụ thuộc vào nhu cầu thực tế.

### 11.1. Những tiêu chí cần xem xét

| Tiêu chí | Câu hỏi cần trả lời |
|---|---|
| Toolchain | Compiler hiện tại hỗ trợ những tính năng nào? |
| Standard Library | Các API cần dùng đã được triển khai chưa? |
| Platform | Dự án phải chạy trên những hệ điều hành nào? |
| Dependency | Thư viện bên thứ ba yêu cầu chuẩn gì? |
| Team | Các thành viên có thể build bằng cùng bộ công cụ không? |
| Maintenance | Dự án cần được bảo trì trong bao lâu? |
| Deployment | Môi trường build và sản phẩm có ràng buộc gì? |

### 11.2. Lựa chọn theo tình huống

**Học C++ cơ bản**

C++17 là một lựa chọn phù hợp vì có cú pháp hiện đại và khả năng tương thích rộng.

**Luyện thuật toán và lập trình thi đấu**

Sử dụng phiên bản mà hệ thống chấm bài hỗ trợ.

Không nên giả định tất cả online judge đều hỗ trợ cùng một chuẩn.

**Phát triển ứng dụng desktop**

C++17, C++20 hoặc C++23 đều có thể phù hợp, tùy compiler, framework và các tính năng cần sử dụng.

**Phát triển hệ thống hoặc thư viện**

Cần đánh giá kỹ tính tương thích ABI, dependency, compiler, thư viện chuẩn và nền tảng triển khai.

**Dự án sử dụng các tính năng C++ mới**

Có thể chọn chuẩn mới hơn, nhưng nên xác minh từng tính năng thay vì chỉ dựa trên số phiên bản.

### 11.3. Phiên bản mới không tự làm chương trình nhanh hơn

Một chương trình C++23 không mặc định chạy nhanh hơn chương trình C++17.

Hiệu năng còn phụ thuộc vào:

- Thuật toán.
- Cấu trúc dữ liệu.
- Chất lượng triển khai.
- Mức tối ưu hóa.
- Compiler và target architecture.
- Truy cập bộ nhớ.
- Thiết kế hệ thống.

Các phiên bản mới có thể cung cấp những công cụ giúp viết chương trình hiệu quả hơn, nhưng không thay thế việc phân tích thuật toán và đo hiệu năng.

---

## 12. Cách chọn chuẩn C++ khi biên dịch

Hầu hết compiler C++ hiện đại cho phép chỉ định chuẩn ngôn ngữ thông qua tùy chọn dòng lệnh.

### 12.1. GCC

Biên dịch bằng C++17:

```sh
g++ -std=c++17 main.cpp -o app
```

Bổ sung cảnh báo:

```sh
g++ -std=c++17 -Wall -Wextra -Wpedantic main.cpp -o app
```

Với compiler hỗ trợ, có thể lựa chọn:

```sh
g++ -std=c++20 main.cpp -o app
```

Hoặc:

```sh
g++ -std=c++23 main.cpp -o app
```

Cờ `-std=` lựa chọn chế độ ngôn ngữ, không phải cam kết rằng mọi tính năng thuộc phiên bản đó đều đã được triển khai.

### 12.2. Clang

```sh
clang++ -std=c++17 -Wall -Wextra -Wpedantic main.cpp -o app
```

### 12.3. MSVC

Với Developer Command Prompt của Visual Studio:

```bat
cl /std:c++17 /EHsc /W4 main.cpp /Fe:app.exe
```

Các tham số:

| Tham số | Công dụng |
|---|---|
| `/std:c++17` | Chọn chế độ C++17 |
| `/EHsc` | Cấu hình xử lý ngoại lệ C++ |
| `/W4` | Bật nhiều cảnh báo |
| `/Fe:app.exe` | Đặt tên tệp đầu ra |

**Khuyến nghị:** Luôn cấu hình chuẩn C++ một cách tường minh.

Không nên dựa vào mặc định của compiler, bởi phiên bản mặc định có thể thay đổi sau khi cập nhật toolchain.

---

## 13. Cách kiểm tra phiên bản compiler và chuẩn ngôn ngữ

### 13.1. Kiểm tra GCC

Mở terminal:

```sh
g++ --version
```

Lệnh hiển thị thông tin về phiên bản GCC/G++ đã cài.

### 13.2. Kiểm tra Clang

```sh
clang++ --version
```

### 13.3. Kiểm tra MSVC

Trong Developer Command Prompt:

```bat
cl
```

Lệnh hiển thị thông tin compiler và hướng dẫn sử dụng.

### 13.4. Macro __cplusplus

C++ cung cấp macro `__cplusplus` để nhận biết phiên bản chuẩn ngôn ngữ mà compiler đang sử dụng.

Ví dụ:

```cpp
#include <iostream>

int main() {
    std::cout << __cplusplus << '\n';
}
```

Khi biên dịch ở chế độ C++17, giá trị chuẩn là:

```text
201703
```

Một số giá trị quan trọng:

| Chuẩn | Giá trị macro |
|---|---|
| C++11 | `201103L` |
| C++14 | `201402L` |
| C++17 | `201703L` |
| C++20 | `202002L` |
| C++23 | `202302L` |

Với MSVC, có thể cần bật `/Zc:__cplusplus` để macro phản ánh chính xác chế độ chuẩn đã chọn.

### 13.5. Kiểm tra yêu cầu phiên bản khi biên dịch

Ví dụ:

```cpp
#if __cplusplus < 201703L
#error This program requires C++17 or newer
#endif

#include <iostream>

int main() {
    std::cout << "C++17 supported\n";
}
```

Nếu compiler được cấu hình với phiên bản C++ cũ hơn C++17, preprocessor sẽ phát sinh lỗi.

Lưu ý rằng `__cplusplus` chỉ giúp kiểm tra chế độ ngôn ngữ, không chứng minh toàn bộ standard library tương ứng được hỗ trợ.

Khi cần kiểm tra một tính năng cụ thể, có thể sử dụng feature-test macro hoặc thực hiện kiểm tra khả năng biên dịch trong hệ thống build.

---

## 14. Những hiểu lầm phổ biến về C++

### 14.1. C++ là C có thêm class

Không chính xác.

C++ được phát triển từ C, nhưng đã hình thành hệ thống ngôn ngữ và thư viện riêng.

Modern C++ có nhiều phương pháp lập trình khác biệt đáng kể so với C truyền thống.

### 14.2. Muốn học C++ phải học C trước

Không bắt buộc.

Có thể học trực tiếp C++ hiện đại từ các khái niệm nền tảng như biến, hàm, kiểu dữ liệu và container.

Tuy nhiên, kiến thức về C vẫn hữu ích khi làm việc với API cấp thấp, hệ thống nhúng và phần mềm kế thừa.

### 14.3. C++ luôn nhanh hơn Python hoặc Java

Không thể kết luận như vậy trong mọi trường hợp.

C++ có khả năng tạo phần mềm native hiệu năng cao, nhưng kết quả thực tế phụ thuộc vào thuật toán, thư viện, workload và cách triển khai.

Một chương trình C++ sử dụng thuật toán kém có thể chậm hơn chương trình Python sử dụng thư viện native được tối ưu tốt.

### 14.4. C++ bắt buộc phải dùng new và delete

Không đúng.

C++ hiện đại hỗ trợ quản lý tài nguyên thông qua RAII, standard containers và smart pointers.

Ví dụ:

```cpp
#include <vector>

int main() {
    std::vector<int> values{1, 2, 3};
}
```

Không cần tự cấp phát và giải phóng bộ nhớ cho dữ liệu của vector bằng `new` hoặc `delete`.

### 14.5. Sử dụng C++23 thì mọi tính năng đều hoạt động

Không chắc chắn.

Cần phân biệt:

- Tiêu chuẩn có đặc tả tính năng.
- Compiler triển khai tính năng ngôn ngữ.
- Standard Library triển khai API tương ứng.
- Nền tảng và toolchain hỗ trợ cách build hoặc liên kết cần thiết.

Một tính năng có thể được hỗ trợ ở compiler này nhưng chưa hoàn chỉnh ở compiler khác.

### 14.6. C++17 đã cũ nên không đáng học

Không đúng.

C++17 vẫn chứa những nền tảng quan trọng của Modern C++ và có thể được sử dụng trong nhiều loại phần mềm.

Việc sử dụng C++17 làm baseline không ngăn bạn học và sử dụng C++20, C++23 hoặc những tiêu chuẩn mới hơn.

Điều cần tránh là nhầm **phiên bản được chọn cho dự án** với **giới hạn kiến thức của lập trình viên**.

---

## 15. Bài tập tự luyện

### Bài 1. Giải thích C++ là gì

Trình bày ngắn gọn:

1. C++ thuộc nhóm ngôn ngữ lập trình nào?
2. C++ được phát triển từ ngôn ngữ nào?
3. C++ có thể được sử dụng trong những lĩnh vực nào?
4. Vì sao không nên sử dụng C++ cho mọi dự án?

### Bài 2. Phân biệt công cụ phát triển

Cho các tên:

```text
C++17
GCC
Clang
Visual Studio
Visual Studio Code
MSVC
std::vector
```

Hãy phân loại chúng thành:

- Chuẩn ngôn ngữ.
- Compiler/toolchain.
- IDE hoặc code editor.
- Thành phần thư viện chuẩn.

### Bài 3. Tìm hiểu compiler đang sử dụng

Kiểm tra môi trường lập trình của bạn và ghi lại:

- Tên compiler.
- Phiên bản compiler.
- Hệ điều hành.
- Chuẩn C++ được cấu hình.
- Tên standard library nếu xác định được.

**Gợi ý:** Sử dụng `g++ --version`, `clang++ --version` hoặc `cl` tùy môi trường.

### Bài 4. Kiểm tra macro __cplusplus

Viết chương trình:

```cpp
#include <iostream>

int main() {
    std::cout << __cplusplus << '\n';
}
```

Biên dịch với những chuẩn mà compiler hỗ trợ.

So sánh giá trị nhận được và giải thích ý nghĩa của macro.

### Bài 5. Chọn phiên bản C++ phù hợp

Xét ba dự án:

**Dự án A:** Chương trình giải thuật chạy trên online judge chỉ hỗ trợ C++17.

**Dự án B:** Ứng dụng desktop cần sử dụng Concepts và Ranges của C++20.

**Dự án C:** Thư viện được phân phối cho những hệ thống sử dụng nhiều phiên bản compiler khác nhau.

Hãy chọn baseline phù hợp cho từng dự án và giải thích lý do.

Không chỉ xem phiên bản mới nhất. Cần đánh giá cả tính tương thích, dependency và yêu cầu triển khai.

---

## 16. Tổng kết kiến thức

| Khái niệm | Ý nghĩa |
|---|---|
| C++ | Ngôn ngữ lập trình đa mục đích |
| Source code | Mã nguồn do lập trình viên viết |
| Compiler | Công cụ biên dịch mã nguồn |
| Linker | Công cụ liên kết object file và thư viện |
| Standard Library | Bộ thư viện chuẩn của C++ |
| STL | Nhóm thành phần container, iterator và algorithm |
| ISO C++ Standard | Đặc tả tiêu chuẩn ngôn ngữ và thư viện |
| GCC | Bộ công cụ biên dịch GNU |
| Clang | Compiler frontend thuộc dự án LLVM |
| MSVC | Compiler C++ của Microsoft |
| IDE | Môi trường phát triển tích hợp |
| C++11 | Nền tảng quan trọng của Modern C++ |
| C++17 | Baseline của bộ tài liệu |
| C++20 | Bổ sung Concepts, Ranges, Modules và Coroutines |
| C++23 | Tiếp tục cải tiến ngôn ngữ và thư viện |
| C++26 | Thế hệ tiêu chuẩn tiếp theo sau C++23 |

Sau bài học này, bạn cần hiểu được:

1. C++ là ngôn ngữ lập trình, không phải một compiler hoặc IDE.
2. C++ có thể được sử dụng cho cả phần mềm ứng dụng và phần mềm hệ thống.
3. Compiler và Standard Library là những thành phần khác nhau của toolchain.
4. Phiên bản C++ xác định những quy tắc và tính năng được đặc tả.
5. Phiên bản compiler không đồng nghĩa với phiên bản ngôn ngữ.
6. Một chương trình có thể yêu cầu chuẩn mới hơn dù phần lớn mã nguồn vẫn sử dụng cú pháp cũ.
7. C++17 được chọn làm baseline học tập, không phải giới hạn cho mọi dự án.
8. Việc lựa chọn công nghệ phải dựa trên yêu cầu kỹ thuật và khả năng tương thích thực tế.

**Ghi nhớ:** Học C++ không chỉ là ghi nhớ cú pháp. Mục tiêu lâu dài là hiểu cách chương trình xử lý dữ liệu, sử dụng tài nguyên và biến những yêu cầu của bài toán thành phần mềm hoạt động chính xác.

---

## Tài liệu tham khảo

Đối với những thông tin cần kiểm tra theo phiên bản, nên sử dụng các nguồn kỹ thuật được cập nhật thường xuyên:

- [Standard C++ Foundation](https://isocpp.org/): Thông tin về ngôn ngữ và tiêu chuẩn C++.
- [WG21](https://www.open-std.org/jtc1/sc22/wg21/): Nhóm tiêu chuẩn hóa C++.
- [cppreference](https://en.cppreference.com/): Tra cứu ngôn ngữ và thư viện chuẩn.
- [GCC C++ Standards Support](https://gcc.gnu.org/projects/cxx-status.html): Mức hỗ trợ các phiên bản C++ trong GCC.
- [Clang C++ Status](https://clang.llvm.org/cxx_status.html): Mức hỗ trợ tính năng trong Clang.

Các bảng tương thích nên được kiểm tra lại khi cập nhật compiler hoặc nâng chuẩn cho dự án.

## Đọc tiếp

- [Cài đặt môi trường C++](/cpp/bat-dau/cai-dat-moi-truong): Thiết lập compiler, editor và công cụ build trên Windows, Linux hoặc macOS.
- [Lộ trình học C++](/cpp/bat-dau/lo-trinh-hoc): Xây dựng kế hoạch học từ cú pháp cơ bản đến thuật toán và phát triển phần mềm.
- [C++17, C++20 và C++23](/cpp/stl/cpp17-20-23): Tìm hiểu những tính năng mới, khác biệt và vấn đề tương thích giữa các phiên bản.
