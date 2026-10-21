---
title: C++ Best Practices và FAQ
description: Tổng hợp những nguyên tắc lập trình C++ hiện đại, cách lựa chọn kiểu dữ liệu, container, ownership, xử lý lỗi, tối ưu hiệu năng và giải đáp các câu hỏi thường gặp.
slug: /cpp/tra-cuu/best-practices
category: reference
categoryLabel: Tra cứu và xử lý lỗi
order: 25060
difficulty: beginner
keywords: [C++ best practices, C++ FAQ, Modern C++, clean code, const, constexpr, auto, RAII, ownership, smart pointers, bits/stdc++.h, using namespace std, compiler warnings, performance]
updated: 2026-10-20
collection: cpp
collectionLabel: C++
collectionDescription: Bảng tra cú pháp, container, thuật toán, lỗi thường gặp và best practices C++.
related: ["/cpp/bat-dau/lo-trinh-hoc", "/cpp/stl/cpp17-20-23", "/cpp/ky-thuat/clean-code"]
---

# C++ Best Practices và FAQ

C++ cung cấp nhiều cách để giải quyết cùng một vấn đề. Hai chương trình có thể cho kết quả giống nhau nhưng khác biệt đáng kể về độ an toàn, khả năng bảo trì, hiệu năng và tính tương thích.

Ví dụ, một tập hợp số nguyên có thể được lưu bằng:

- Mảng C truyền thống.
- `std::array`.
- `std::vector`.
- Một cấu trúc dữ liệu được tự triển khai.

Không có lựa chọn nào luôn tốt nhất trong mọi trường hợp.

Điều quan trọng là hiểu yêu cầu của chương trình và lựa chọn công cụ phù hợp.

**Best practices** là những nguyên tắc và thói quen được khuyến nghị dựa trên kinh nghiệm phát triển phần mềm. Chúng giúp giảm các lỗi thường gặp, nhưng không thay thế việc phân tích yêu cầu kỹ thuật.

Bài viết này tổng hợp:

1. Checklist viết C++ hiện đại.
2. Quy tắc lựa chọn kiểu dữ liệu và container.
3. Cách quản lý ownership và lifetime.
4. Thiết kế hàm và API.
5. Xử lý lỗi và bảo vệ dữ liệu đầu vào.
6. Biên dịch, kiểm thử và debug.
7. Nguyên tắc tối ưu hiệu năng.
8. Những câu hỏi thường gặp về C++.

**Tiêu chuẩn mặc định:** C++17.

Những tính năng chỉ xuất hiện ở C++20 hoặc C++23 sẽ được ghi rõ khi đề cập.

---

## 1. Checklist C++ Best Practices

Bảng dưới đây là điểm bắt đầu để kiểm tra một chương trình C++.

| Lĩnh vực | Khuyến nghị |
|---|---|
| Chuẩn ngôn ngữ | Chọn và khai báo phiên bản C++ tường minh |
| Header | Include trực tiếp những header cần sử dụng |
| Biến | Khởi tạo trước khi đọc giá trị |
| Kiểu dữ liệu | Chọn kiểu theo phạm vi giá trị thực tế |
| `const` | Sử dụng khi không cần sửa dữ liệu |
| `constexpr` | Sử dụng cho giá trị hoặc phép tính hằng phù hợp |
| `auto` | Sử dụng khi kiểu rõ ràng hoặc tránh khai báo dài dòng |
| Container | Ưu tiên container chuẩn phù hợp với thao tác |
| Chuỗi | Sử dụng `std::string` cho văn bản thông thường |
| Hàm | Giữ trách nhiệm rõ ràng, hợp đồng dễ hiểu |
| Ownership | Ưu tiên value semantics và RAII |
| Pointer | Không dereference con trỏ không hợp lệ |
| Reference | Bảo đảm đối tượng được tham chiếu còn sống |
| Input | Kiểm tra dữ liệu từ nguồn không đáng tin cậy |
| Số học | Kiểm tra chia cho 0, tràn số và chuyển kiểu |
| Chỉ số | Không truy cập phần tử ngoài phạm vi |
| Compiler | Bật các cảnh báo phù hợp |
| Testing | Kiểm tra trường hợp bình thường và trường hợp biên |
| Debugging | Sử dụng debugger, sanitizer khi được hỗ trợ |
| Performance | Đo đạc trước khi tối ưu |

Đây là checklist mặc định, không phải danh sách những quy tắc tuyệt đối.

Ví dụ, `std::vector` là lựa chọn tốt cho dữ liệu có kích thước linh hoạt, nhưng một mảng cố định hoặc cấu trúc dữ liệu chuyên dụng có thể phù hợp hơn trong hệ thống nhúng.

---

## 2. Chọn chuẩn C++ rõ ràng

### 2.1. Không phụ thuộc vào mặc định của compiler

Một compiler có thể sử dụng chuẩn mặc định khác nhau tùy phiên bản và cấu hình.

Do đó, thay vì:

```sh
g++ main.cpp -o app
```

Nên khai báo rõ:

```sh
g++ -std=c++17 -Wall -Wextra -Wpedantic main.cpp -o app
```

Việc này giúp:

- Xác định rõ chuẩn ngôn ngữ dự án yêu cầu.
- Giảm khác biệt giữa môi trường phát triển.
- Phát hiện việc sử dụng tính năng không thuộc chuẩn đã chọn.
- Giúp CI và những lập trình viên khác tái tạo bản build.

### 2.2. C++17 không phải giới hạn tối đa

C++17 được sử dụng làm baseline trong bộ tài liệu này vì có khả năng tương thích rộng và cung cấp nhiều công cụ Modern C++.

Tuy nhiên, nếu dự án thực sự cần Concepts hoặc Ranges, C++20 có thể là lựa chọn hợp lý hơn.

Tương tự, C++23 bổ sung các công cụ như `std::expected` và `std::print`.

**Nguyên tắc:** Chọn chuẩn thấp nhất đáp ứng đầy đủ yêu cầu và chính sách hỗ trợ của dự án, không phải chuẩn thấp nhất bằng mọi giá.

### 2.3. Cấu hình CMake

Ví dụ:

```cmake
cmake_minimum_required(VERSION 3.20)

project(MyApp LANGUAGES CXX)

add_executable(app main.cpp)

set_target_properties(app PROPERTIES
    CXX_STANDARD 17
    CXX_STANDARD_REQUIRED YES
    CXX_EXTENSIONS NO
)
```

Trong đó:

- `CXX_STANDARD`: Phiên bản chuẩn mong muốn.
- `CXX_STANDARD_REQUIRED`: Yêu cầu chuẩn được hỗ trợ, tránh tự hạ chuẩn.
- `CXX_EXTENSIONS`: Kiểm soát việc sử dụng các compiler extensions.

**Lưu ý:** Khai báo chuẩn trong CMake không có nghĩa standard library đã triển khai đầy đủ mọi tính năng thuộc chuẩn đó.

---

## 3. Include header đúng cách

### 3.1. Include trực tiếp những gì cần dùng

Ví dụ:

```cpp
#include <iostream>
#include <string>
#include <vector>

int main() {
    std::vector<std::string> names{
        "An",
        "Binh",
        "Chi"
    };

    std::cout << names.size() << '\n';
}
```

Các header được sử dụng:

| Header | Thành phần |
|---|---|
| `<iostream>` | `std::cout` |
| `<string>` | `std::string` |
| `<vector>` | `std::vector` |

Không nên dựa vào việc một header khác tình cờ include hộ thành phần đang sử dụng.

Ví dụ, nếu dùng `std::sort`, hãy include `<algorithm>`.

### 3.2. Tránh include không cần thiết

Không nên thêm hàng chục header vào mọi source file nếu chương trình chỉ sử dụng một vài thành phần.

Việc include không cần thiết có thể:

- Tăng chi phí biên dịch.
- Tạo thêm dependency.
- Khiến cấu trúc module khó kiểm soát.
- Làm giảm tính rõ ràng của mã nguồn.

Đối với dự án lớn, thiết kế header và dependency hợp lý có thể ảnh hưởng đáng kể đến thời gian build.

### 3.3. Không sử dụng compiler-specific header như mặc định

Ví dụ:

```cpp
#include <bits/stdc++.h>
```

Đây không phải header thuộc tiêu chuẩn ISO C++.

Nó thường xuất hiện trong môi trường GCC sử dụng libstdc++, đặc biệt ở các bài lập trình thi đấu.

Không nên sử dụng làm mặc định trong tài liệu C++ portable hoặc phần mềm production.

---

## 4. Khởi tạo biến và sử dụng const

### 4.1. Khởi tạo biến trước khi sử dụng

Không nên:

```cpp
int count;

std::cout << count;
```

Với biến `int` cục bộ thông thường chưa được khởi tạo, việc đọc giá trị bất định có thể gây undefined behavior.

Nên viết:

```cpp
int count{};
```

Hoặc khởi tạo bằng giá trị thực tế:

```cpp
int count{10};
```

### 4.2. Ưu tiên khởi tạo bằng dấu ngoặc nhọn khi phù hợp

Ví dụ:

```cpp
int age{16};
double score{8.5};
bool active{true};
```

Một ưu điểm của list initialization là ngăn nhiều phép chuyển đổi thu hẹp không an toàn.

Ví dụ:

```cpp
int value{3.14};
```

Câu lệnh này không hợp lệ vì phép chuyển đổi từ `double` sang `int` làm mất phần thập phân.

Tuy nhiên, `{}` không phải lúc nào cũng tương đương `()` đối với class có constructor nhận `std::initializer_list`.

Ví dụ:

```cpp
#include <vector>

std::vector<int> a(3, 10);
std::vector<int> b{3, 10};
```

Kết quả:

```text
a = [10, 10, 10]
b = [3, 10]
```

Vì vậy, cần hiểu ngữ nghĩa khởi tạo thay vì áp dụng một phong cách máy móc.

### 4.3. Sử dụng const khi dữ liệu không cần thay đổi

Ví dụ:

```cpp
const int maxStudents{45};
```

Hoặc:

```cpp
const double average =
    static_cast<double>(total) / count;
```

`const` thể hiện rằng đối tượng không được sửa đổi thông qua giao diện const tương ứng.

Lợi ích:

- Giảm nguy cơ thay đổi dữ liệu ngoài ý muốn.
- Làm rõ mục đích của biến.
- Giúp người đọc hiểu những phần nào được phép thay đổi.
- Hỗ trợ thiết kế giao diện hàm rõ ràng hơn.

Tuy nhiên, `const` không tự động giải quyết lifetime, aliasing, data races hoặc mọi vấn đề an toàn bộ nhớ.

### 4.4. Phân biệt const và constexpr

```cpp
const int limit{100};

constexpr int secondsPerMinute{60};
```

`const` biểu thị khả năng sửa đổi.

`constexpr` yêu cầu đối tượng hoặc hàm đáp ứng những quy tắc liên quan đến constant expressions.

Không phải mọi biến `const` đều có giá trị được xác định trong quá trình biên dịch.

---

## 5. Sử dụng auto hợp lý

C++11 giới thiệu `auto`, cho phép compiler suy luận kiểu từ biểu thức khởi tạo.

Ví dụ:

```cpp
auto age = 16;
auto price = 19.99;
```

Các kiểu được suy luận tương ứng là `int` và `double`.

### 5.1. Khi nào auto hữu ích?

Khi kiểu dữ liệu dài:

```cpp
auto it = scores.find("An");
```

Khi sử dụng structured bindings của C++17:

```cpp
for (const auto& [name, score] : scores) {
    std::cout << name << ": " << score << '\n';
}
```

Khi kiểu đã rõ ràng từ biểu thức:

```cpp
auto player = std::make_unique<Player>();
```

Ví dụ cuối giả định kiểu `Player` đã được định nghĩa.

### 5.2. Khi nào nên khai báo tường minh?

Với những kiểu đơn giản và có ý nghĩa quan trọng:

```cpp
int age{16};
double average{8.5};
```

Việc ghi rõ kiểu có thể giúp người đọc hiểu hợp đồng dữ liệu ngay lập tức.

### 5.3. auto không làm kiểu dữ liệu trở nên động

```cpp
auto value = 10;
```

`value` vẫn có kiểu `int` tĩnh.

Không thể tùy ý gán một đối tượng chuỗi cho biến này.

**Khuyến nghị:** Dùng `auto` khi giúp code rõ hơn, không phải để thay thế mọi khai báo kiểu.

---

## 6. Lựa chọn kiểu dữ liệu an toàn

### 6.1. Chọn kiểu theo phạm vi giá trị

Giả sử cần lưu tổng số tiền:

\[
Total = Quantity \times Price
\]

Nếu số lượng và đơn giá đều có thể lớn, kết quả có thể vượt giới hạn của `int`.

Một lỗi thường gặp:

```cpp
int quantity{1'000'000};
int price{1'000'000};

long long total = quantity * price;
```

Trong môi trường `int` 32 bit, phép nhân gây tràn số nguyên có dấu trước khi kết quả được gán cho `long long`.

Cách xử lý:

```cpp
long long total =
    static_cast<long long>(quantity) * price;
```

Đồng thời phải kiểm tra rằng kết quả nằm trong phạm vi của `long long`.

### 6.2. Không mặc định unsigned luôn tốt hơn

```cpp
unsigned int count{0};

--count;
```

Kết quả không phải `-1`.

Số nguyên không dấu sử dụng số học modulo, nên giá trị sẽ quay về giới hạn lớn của kiểu.

Unsigned phù hợp khi cần biểu diễn những thao tác và miền giá trị cụ thể, nhưng không tự động ngăn mọi lỗi số học.

### 6.3. Sử dụng kiểu độ rộng cố định khi thật sự cần

Ví dụ:

```cpp
#include <cstdint>

std::int32_t value{100};
std::uint64_t counter{1000};
```

Các kiểu này hữu ích khi làm việc với dữ liệu nhị phân, giao thức hoặc cấu trúc có yêu cầu độ rộng chính xác.

Không nhất thiết phải thay toàn bộ biến `int` bằng `std::int32_t`.

### 6.4. Không dùng double cho tiền chính xác một cách tùy tiện

```cpp
double price{0.1};
```

Trong hệ biểu diễn số thực nhị phân thông dụng, nhiều số thập phân không được biểu diễn chính xác tuyệt đối.

Nếu hệ thống yêu cầu tính toán tiền chính xác, có thể sử dụng đơn vị nguyên nhỏ nhất hoặc một kiểu số thập phân phù hợp.

Lựa chọn còn phụ thuộc vào đơn vị tiền, quy tắc làm tròn và yêu cầu nghiệp vụ.

---

## 7. Chọn container phù hợp

C++ Standard Library cung cấp nhiều container.

Không nên sử dụng một loại container cho mọi bài toán.

### 7.1. Bảng lựa chọn nhanh

| Yêu cầu | Container thường phù hợp |
|---|---|
| Dãy kích thước cố định | `std::array` |
| Dãy kích thước linh hoạt | `std::vector` |
| Thêm/xóa đầu và cuối thường xuyên | `std::deque` |
| Ánh xạ khóa-giá trị có thứ tự | `std::map` |
| Ánh xạ khóa-giá trị bằng hash | `std::unordered_map` |
| Tập hợp phần tử duy nhất có thứ tự | `std::set` |
| Tập hợp duy nhất bằng hash | `std::unordered_set` |
| Hàng đợi FIFO | `std::queue` |
| Ngăn xếp LIFO | `std::stack` |
| Hàng đợi ưu tiên | `std::priority_queue` |

Đây là các lựa chọn phổ biến, không phải kết luận rằng mỗi container luôn tối ưu nhất cho thao tác được liệt kê.

### 7.2. Vì sao std::vector thường là lựa chọn mặc định?

```cpp
#include <vector>

std::vector<int> numbers{1, 2, 3};
```

`std::vector` có những ưu điểm:

- Quản lý bộ nhớ tự động.
- Lưu các phần tử liên tiếp.
- Truy cập theo chỉ số trong thời gian hằng số.
- Thêm phần tử ở cuối với chi phí khấu hao hằng số.
- Tương thích với nhiều thuật toán STL.

Với nhiều bài toán xử lý dãy dữ liệu, `std::vector` là điểm bắt đầu hợp lý.

### 7.3. Không dùng map chỉ vì cần tìm kiếm nhanh

`std::map` và `std::unordered_map` có những đặc điểm khác nhau.

| Container | Đặc điểm chính | Tìm kiếm |
|---|---|---|
| `std::map` | Duy trì thứ tự khóa | `O(log n)` |
| `std::unordered_map` | Dựa trên hash | Trung bình `O(1)`, trường hợp xấu có thể `O(n)` |

Nếu cần duyệt khóa theo thứ tự, `std::map` có thể phù hợp.

Nếu chủ yếu tìm kiếm theo khóa và không cần thứ tự, `std::unordered_map` đáng cân nhắc.

Tuy nhiên, hiệu năng thực tế còn phụ thuộc vào số lượng phần tử, chi phí hash, locality, allocator và đặc điểm dữ liệu.

**Nguyên tắc:** Chọn container theo thao tác chính, yêu cầu dữ liệu và kết quả benchmark, không chỉ dựa vào độ phức tạp lý thuyết.

---

## 8. Quản lý ownership và lifetime

Trong C++, ownership là trách nhiệm quản lý vòng đời tài nguyên.

Tài nguyên có thể là:

- Bộ nhớ động.
- File handle.
- Socket.
- Mutex.
- Kết nối hoặc handle hệ thống.
- Những đối tượng cần giải phóng theo quy trình cụ thể.

### 8.1. Ưu tiên value semantics

Nếu chỉ cần lưu một số nguyên:

```cpp
int value{42};
```

Không cần:

```cpp
int* value = new int{42};
```

Với tập hợp số nguyên:

```cpp
std::vector<int> values{1, 2, 3};
```

thường đơn giản hơn tự cấp phát một mảng động.

### 8.2. Sử dụng RAII

RAII (Resource Acquisition Is Initialization) gắn việc quản lý tài nguyên với vòng đời của một đối tượng.

Khi đối tượng quản lý tài nguyên được hủy, destructor thực hiện những thao tác giải phóng phù hợp.

Ví dụ, `std::vector` tự quản lý vùng nhớ của nó.

Một ví dụ khác:

```cpp
#include <fstream>

int main() {
    std::ofstream file{"output.txt"};

    if (!file) {
        return 1;
    }

    file << "Hello\n";

    if (!file) {
        return 1;
    }
}
```

Đối tượng `file` quản lý file handle theo cơ chế RAII.

Với ứng dụng cần xác nhận chắc chắn dữ liệu đã được ghi thành công, cần kiểm tra thêm kết quả flush hoặc close và các yêu cầu liên quan đến độ bền dữ liệu.

### 8.3. Ưu tiên unique_ptr khi cần ownership động độc quyền

Ví dụ:

```cpp
#include <memory>

auto value = std::make_unique<int>(42);
```

`std::unique_ptr` quản lý đối tượng động thông qua quyền sở hữu độc quyền.

Khi không còn cần thiết, đối tượng có thể được giải phóng tự động theo vòng đời của chủ sở hữu.

### 8.4. Không lạm dụng shared_ptr

`std::shared_ptr` hỗ trợ chia sẻ quyền sở hữu.

Tuy nhiên, nó có thêm chi phí quản lý và có thể tạo chu trình sở hữu khiến đối tượng không được giải phóng như mong muốn.

Không nên chuyển mọi pointer thành `shared_ptr` để tránh phải suy nghĩ về lifetime.

**Thứ tự cân nhắc thường hợp lý:**

1. Đối tượng thông thường.
2. Container chuẩn.
3. `std::unique_ptr` khi cần sở hữu động.
4. `std::shared_ptr` khi thật sự cần quyền sở hữu chia sẻ.

Raw pointer và reference vẫn hữu ích để truy cập đối tượng không sở hữu.

---

## 9. Truyền tham số đúng mục đích

Một API tốt phải thể hiện rõ hàm cần gì và có thể làm gì với dữ liệu.

### 9.1. Bảng lựa chọn

| Tình huống | Kiểu tham số thường phù hợp |
|---|---|
| Truyền số nguyên nhỏ | `int` |
| Truyền boolean | `bool` |
| Đọc một chuỗi hiện có | `const std::string&` |
| Đọc một vector lớn | `const std::vector<T>&` |
| Sửa đối tượng của người gọi | `T&` |
| Đối tượng có thể vắng mặt | `T*` |
| Chuyển ownership động độc quyền | `std::unique_ptr<T>` |

### 9.2. Ví dụ

Truyền giá trị:

```cpp
int square(int value) {
    return value * value;
}
```

Truyền tham chiếu để sửa:

```cpp
void addBonus(int& score) {
    score += 5;
}
```

Đọc đối tượng mà không tạo bản sao:

```cpp
#include <iostream>
#include <string>

void printName(const std::string& name) {
    std::cout << name << '\n';
}
```

Tham số tùy chọn:

```cpp
#include <iostream>

void printScore(const int* score) {
    if (score == nullptr) {
        std::cout << "No score\n";
        return;
    }

    std::cout << *score << '\n';
}
```

### 9.3. Không phải const T& luôn tốt hơn T

Với một kiểu nhỏ như `int`, truyền bằng giá trị thường đơn giản hơn.

Với những trường hợp hàm cần sở hữu một bản sao để lưu trữ lâu dài, truyền theo giá trị cũng có thể phù hợp.

Ví dụ:

```cpp
#include <string>
#include <utility>

class User {
public:
    explicit User(std::string name)
        : name_{std::move(name)} {}

private:
    std::string name_;
};
```

Constructor nhận `std::string` bằng giá trị, sau đó chuyển dữ liệu vào thành viên.

Cách này có trade-off về số lần sao chép hoặc di chuyển tùy đối số. Nó không phải phương án tối ưu tuyệt đối cho mọi API, nhưng có thể giúp thiết kế đơn giản hơn.

---

## 10. Xử lý dữ liệu đầu vào an toàn

Dữ liệu đầu vào không nên được mặc định là hợp lệ.

### 10.1. Kiểm tra lỗi nhập liệu

Không nên:

```cpp
int age{};

std::cin >> age;
```

rồi giả định thao tác đọc đã thành công.

Nên kiểm tra:

```cpp
int age{};

if (!(std::cin >> age)) {
    std::cerr << "Invalid input\n";
    return 1;
}
```

### 10.2. Kiểm tra phạm vi

Việc đọc thành công không có nghĩa dữ liệu đáp ứng yêu cầu của bài toán.

Ví dụ:

```cpp
if (age < 0 || age > 150) {
    std::cerr << "Invalid age\n";
    return 1;
}
```

Khoảng `[0, 150]` là một quy tắc minh họa. Ứng dụng thực tế phải xác định phạm vi theo yêu cầu nghiệp vụ.

### 10.3. Kiểm tra trước khi chia

```cpp
if (b == 0) {
    std::cerr << "Division by zero\n";
    return 1;
}

const int result = a / b;
```

Nếu `a` và `b` là số nguyên có dấu, cần xét thêm trường hợp giá trị nhỏ nhất của kiểu chia cho `-1`, vì kết quả toán học có thể không biểu diễn được.

### 10.4. Kiểm tra chỉ số

Nếu `index` là số nguyên có dấu:

```cpp
if (index >= 0 &&
    static_cast<std::size_t>(index) < values.size()) {
    std::cout << values[
        static_cast<std::size_t>(index)
    ] << '\n';
}
```

Cần bảo đảm chỉ số không âm trước khi chuyển sang kiểu không dấu.

Có thể sử dụng `.at()` khi muốn kiểm tra phạm vi và xử lý `std::out_of_range`.

### 10.5. Không coi dữ liệu đã parse một phần là hợp lệ hoàn toàn

Ví dụ, khi đọc một số nguyên từ chuỗi `"123abc"`, một số API chuyển đổi có thể đọc được phần đầu là `123` mà không tự động xem toàn bộ chuỗi là không hợp lệ.

Nếu ứng dụng yêu cầu toàn bộ input phải khớp định dạng, cần kiểm tra phần dữ liệu còn lại sau chuyển đổi.

**Nguyên tắc:** Phân biệt ba bước: đọc được dữ liệu, dữ liệu đúng định dạng và dữ liệu đáp ứng quy tắc nghiệp vụ.

---

## 11. Thiết kế hàm và API rõ ràng

### 11.1. Mỗi hàm nên có trách nhiệm dễ hiểu

Không nên tạo một hàm vừa:

- Nhập dữ liệu.
- Kiểm tra tài khoản.
- Tính toán.
- Ghi file.
- In kết quả.
- Thay đổi trạng thái toàn cục.

trừ khi đó thật sự là một hàm điều phối cấp cao được thiết kế có chủ đích.

Thay vào đó, có thể phân chia:

```cpp
bool validateScore(int score);
double calculateAverage(
    const std::vector<int>& scores
);
void printReport(double average);
```

Những khai báo trên giả định đã include `<vector>`.

Cách tổ chức này giúp:

- Kiểm thử từng phần.
- Tái sử dụng logic.
- Dễ xác định lỗi.
- Giảm phụ thuộc giữa các thành phần.

### 11.2. Không tạo abstraction không cần thiết

Không phải chương trình nào cũng cần:

- Abstract factory.
- Interface nhiều tầng.
- Dependency injection framework.
- Template metaprogramming.
- Class hierarchy phức tạp.

Đối với một phép tính đơn giản:

```cpp
int add(int a, int b) {
    return a + b;
}
```

một hàm thông thường có thể là lựa chọn rõ ràng nhất.

**Nguyên tắc:** Kiến trúc tốt giải quyết độ phức tạp có thật, không tạo thêm độ phức tạp để chuẩn bị cho mọi khả năng tưởng tượng.

### 11.3. Ghi rõ hợp đồng của API

Khi thiết kế hàm, cần trả lời:

- Đầu vào hợp lệ là gì?
- Hàm có được sửa dữ liệu đầu vào không?
- Ai quản lý lifetime của đối tượng?
- Hàm có thể thất bại như thế nào?
- Kết quả được trả về bằng giá trị, reference hay pointer?
- Có bảo đảm nào về exception safety?

Không phải mọi câu trả lời đều phải ghi thành bình luận dài, nhưng chúng cần được thể hiện rõ trong thiết kế và tài liệu cần thiết.

---

## 12. Xử lý lỗi đúng mức

C++ cung cấp nhiều cách biểu diễn lỗi.

### 12.1. Giá trị trả về

Ví dụ:

```cpp
bool isValidScore(int score) {
    return score >= 0 && score <= 10;
}
```

Phù hợp với những điều kiện đơn giản có hai trạng thái rõ ràng.

### 12.2. std::optional

C++17 hỗ trợ `std::optional`.

Ví dụ:

```cpp
#include <optional>

std::optional<int> findPositive(int value) {
    if (value <= 0) {
        return std::nullopt;
    }

    return value;
}
```

`std::optional` phù hợp khi kết quả có thể không tồn tại và không cần thông tin lỗi chi tiết.

### 12.3. Exceptions

Ví dụ:

```cpp
#include <stdexcept>

void validateScore(int score) {
    if (score < 0 || score > 10) {
        throw std::invalid_argument(
            "Score out of range"
        );
    }
}
```

Exception có thể phù hợp với các hợp đồng API và trường hợp lỗi nhất định.

Tuy nhiên, không phải mọi hệ thống đều cho phép sử dụng exception, đặc biệt trong những môi trường có ràng buộc runtime nghiêm ngặt.

### 12.4. Không có một cơ chế xử lý lỗi tối ưu cho mọi trường hợp

| Cơ chế | Phù hợp khi |
|---|---|
| `bool` | Chỉ cần biết thành công hoặc thất bại |
| `std::optional<T>` | Giá trị có thể không tồn tại |
| Error code hoặc status type | Cần biểu diễn lỗi rõ ràng |
| Exception | Hợp đồng API sử dụng cơ chế ngoại lệ |
| `std::expected<T, E>` | Muốn biểu diễn giá trị hoặc lỗi trong kiểu trả về, từ C++23 |

Không nên sử dụng exception cho mọi phép kiểm tra điều kiện thông thường.

Ngược lại, cũng không nên cấm exception trong mọi trường hợp mà không đánh giá yêu cầu hệ thống.

---

## 13. Bật compiler warnings

Một chương trình biên dịch thành công chưa chắc không có lỗi.

Compiler có thể phát hiện nhiều vấn đề thông qua warning.

### 13.1. GCC và Clang

```sh
g++ -std=c++17 -Wall -Wextra -Wpedantic main.cpp -o app
```

Các cờ:

| Flag | Chức năng |
|---|---|
| `-std=c++17` | Chọn chuẩn C++17 |
| `-Wall` | Bật nhiều cảnh báo |
| `-Wextra` | Bổ sung cảnh báo |
| `-Wpedantic` | Cảnh báo một số trường hợp sử dụng phần mở rộng ngoài chuẩn |

`-Wall` không có nghĩa bật toàn bộ cảnh báo mà compiler cung cấp.

`-Wpedantic` cũng không phải công cụ chứng minh một chương trình hoàn toàn portable.

### 13.2. MSVC

```bat
cl /std:c++17 /EHsc /W4 main.cpp
```

Có thể cân nhắc thêm `/permissive-` theo yêu cầu tương thích và cấu hình dự án.

### 13.3. Có nên bật warnings as errors?

GCC/Clang:

```sh
-Werror
```

MSVC:

```bat
/WX
```

Các tùy chọn này biến warning thành lỗi build.

Chúng hữu ích khi dự án đã có chính sách kiểm soát cảnh báo tốt, đặc biệt trong CI.

Tuy nhiên, với codebase cũ hoặc dependency bên thứ ba, nên có lộ trình xử lý cảnh báo thay vì bật toàn bộ một cách đột ngột.

---

## 14. Sử dụng formatter, linter và debugger

### 14.1. Formatter

`clang-format` có thể tự động chuẩn hóa:

- Thụt lề.
- Khoảng trắng.
- Dấu ngoặc.
- Cách xuống dòng.
- Một số quy tắc trình bày mã nguồn.

Formatter giúp giảm tranh luận về phong cách và giữ codebase nhất quán.

### 14.2. Static analysis

`clang-tidy` có thể kiểm tra nhiều vấn đề liên quan đến:

- Correctness.
- Modernization.
- Readability.
- Performance.
- Một số lỗi API và cấu trúc mã.

Static analysis là công cụ hỗ trợ, không thay thế code review hoặc testing.

### 14.3. Debugger

Một số debugger phổ biến:

- GDB.
- LLDB.
- Visual Studio Debugger.

Debugger giúp đặt breakpoint, theo dõi biến và phân tích call stack.

### 14.4. Sanitizers

Trên compiler và nền tảng hỗ trợ:

```sh
g++ -std=c++17 -g -O1 -fsanitize=address,undefined -fno-omit-frame-pointer main.cpp -o app
```

Hai nhóm kiểm tra quan trọng:

| Công cụ | Công dụng |
|---|---|
| AddressSanitizer | Phát hiện nhiều lỗi truy cập bộ nhớ |
| UndefinedBehaviorSanitizer | Phát hiện nhiều trường hợp undefined behavior |

Sanitizers không phát hiện được mọi lỗi và có thể tạo thêm chi phí runtime.

Chúng thường phù hợp với môi trường kiểm thử, không nên tự động đưa runtime của sanitizer vào bản production nếu chưa đánh giá yêu cầu triển khai và bảo mật.

---

## 15. Kiểm thử các trường hợp biên

Không nên chỉ kiểm tra một input mẫu.

Ví dụ, một hàm tính trung bình cần được thử với:

- Một phần tử.
- Nhiều phần tử.
- Dữ liệu rỗng.
- Giá trị âm nếu được phép.
- Giá trị lớn.
- Tổng có nguy cơ tràn số.
- Dữ liệu đầu vào không hợp lệ.

### 15.1. Phân loại bài kiểm thử

| Loại | Mục đích |
|---|---|
| Normal case | Trường hợp thông thường |
| Boundary case | Giá trị sát giới hạn |
| Invalid input | Dữ liệu không hợp lệ |
| Empty case | Không có phần tử |
| Regression test | Ngăn lỗi đã sửa xuất hiện lại |
| Stress test | Kiểm tra lượng dữ liệu lớn |
| Performance test | Đo hiệu năng |
| Integration test | Kiểm tra các thành phần phối hợp |

### 15.2. Test không chỉ để kiểm tra kết quả

Một bài test tốt còn có thể xác nhận:

- Không sửa dữ liệu đầu vào ngoài hợp đồng.
- Không đọc vượt phạm vi.
- Không làm mất dữ liệu khi thất bại.
- Tài nguyên được giải phóng phù hợp.
- Kết quả ổn định trong những trường hợp được hỗ trợ.

**Nguyên tắc:** Mỗi lần sửa một bug quan trọng, nên bổ sung regression test nếu có thể tái hiện lỗi bằng kiểm thử.

---

## 16. Tối ưu hiệu năng đúng cách

### 16.1. Ưu tiên thuật toán trước

Giả sử cần tìm một giá trị trong tập hợp dữ liệu.

Việc lựa chọn thuật toán và cấu trúc dữ liệu thường ảnh hưởng lớn hơn những thay đổi nhỏ về cú pháp.

Ví dụ:

| Thuật toán | Độ phức tạp |
|---|---|
| Duyệt tuyến tính | `O(n)` |
| Binary search trên dữ liệu đã sắp xếp | `O(log n)` |
| Tìm kiếm trong `std::map` | `O(log n)` |
| Tìm kiếm trong `std::unordered_map` | Trung bình `O(1)` |

Tuy nhiên, lựa chọn cuối cùng còn phụ thuộc vào chi phí xây dựng cấu trúc dữ liệu và đặc điểm workload.

### 16.2. Không tối ưu khi chưa đo

Không nên giả định rằng:

- Pointer luôn nhanh hơn reference.
- Mảng C luôn nhanh hơn vector.
- `++i` luôn nhanh hơn `i++`.
- Viết ít dòng hơn nghĩa là chạy nhanh hơn.
- C++23 tự động nhanh hơn C++17.

Những kết luận về hiệu năng cần được kiểm tra trong ngữ cảnh cụ thể.

### 16.3. Benchmark có kiểm soát

Khi đo hiệu năng, cần:

1. Sử dụng dữ liệu đại diện.
2. Build với cấu hình phù hợp.
3. Đảm bảo compiler không loại bỏ công việc cần đo.
4. Chạy nhiều lần.
5. Kiểm soát những yếu tố gây nhiễu.
6. Xem xét cả thời gian và bộ nhớ.
7. So sánh với mục tiêu hiệu năng thực tế.

### 16.4. Tránh tối ưu làm giảm tính đúng đắn

Ví dụ, không nên bỏ kiểm tra giới hạn chỉ vì muốn giảm vài thao tác nếu dữ liệu đầu vào có thể không đáng tin cậy.

Tương tự, không nên thay một container an toàn bằng cấp phát động thủ công mà không có bằng chứng về lợi ích cần thiết.

**Thứ tự ưu tiên hợp lý:**

Correctness → Maintainability → Measurement → Optimization.

Các yêu cầu real-time hoặc hệ thống chuyên dụng có thể khiến thứ tự cân nhắc được điều chỉnh, nhưng không nên đánh đổi tính đúng đắn một cách vô thức.

---

## 17. Ví dụ tổng hợp theo Best Practices

### Bài toán

Viết chương trình nhập điểm số của `n` học sinh và tính:

- Tổng điểm.
- Điểm trung bình.
- Điểm cao nhất.

Yêu cầu:

- `n` nằm trong `[1, 100000]`.
- Điểm nguyên nằm trong `[0, 10]`.
- Kiểm tra mọi lần đọc dữ liệu.
- Không truy cập container rỗng.
- Sử dụng kiểu dữ liệu phù hợp.
- Không cấp phát động thủ công.

### Chương trình C++17

```cpp
#include <iostream>
#include <vector>

struct Statistics {
    long long total{};
    double average{};
    int maximum{};
};

Statistics calculateStatistics(
    const std::vector<int>& scores
) {
    Statistics result{};

    result.maximum = scores.front();

    for (int score : scores) {
        result.total += score;

        if (score > result.maximum) {
            result.maximum = score;
        }
    }

    result.average =
        static_cast<double>(result.total) / scores.size();

    return result;
}

int main() {
    int n{};

    if (!(std::cin >> n) || n < 1 || n > 100000) {
        std::cerr << "Invalid count\n";
        return 1;
    }

    std::vector<int> scores;
    scores.reserve(static_cast<std::size_t>(n));

    for (int i = 0; i < n; ++i) {
        int score{};

        if (!(std::cin >> score) ||
            score < 0 ||
            score > 10) {
            std::cerr << "Invalid score\n";
            return 1;
        }

        scores.push_back(score);
    }

    const Statistics result =
        calculateStatistics(scores);

    std::cout << "Total: " << result.total << '\n';
    std::cout << "Average: " << result.average << '\n';
    std::cout << "Maximum: " << result.maximum << '\n';

    return 0;
}
```

Input:

```text
5
7 9 4 8 10
```

Output:

```text
Total: 38
Average: 7.6
Maximum: 10
```

### Phân tích thiết kế

| Quyết định | Lý do |
|---|---|
| `std::vector<int>` | Kích thước được xác định khi chạy |
| `reserve()` | Dự trữ capacity phù hợp với số lượng đã kiểm tra |
| `long long total` | Hỗ trợ phạm vi tổng lớn hơn |
| `const std::vector<int>&` | Đọc dữ liệu không cần sao chép |
| `Statistics` | Gom những kết quả liên quan |
| Kiểm tra `n >= 1` | Bảo đảm vector có phần tử nếu đọc thành công |
| `const Statistics result` | Kết quả không cần thay đổi sau khi tính |
| `std::cerr` | Tách thông báo lỗi khỏi output thông thường |

Trong ví dụ, `calculateStatistics()` yêu cầu vector không rỗng. Điều kiện này được bảo đảm bởi phần nhập liệu trong `main()`.

Nếu biến hàm thành API công khai có thể được gọi từ nhiều nơi, nên thể hiện hoặc kiểm tra tiền điều kiện đó trong hợp đồng của hàm.

Một lựa chọn khác là thiết kế hàm trả `std::optional<Statistics>` khi nhận container có thể rỗng.

### Độ phức tạp

Nhập dữ liệu:

\[
O(n)
\]

Tính thống kê:

\[
O(n)
\]

Tổng thời gian:

\[
O(n)
\]

Bộ nhớ dành cho vector:

\[
O(n)
\]

Nếu chương trình chỉ cần tính thống kê một lần và không cần lưu lại toàn bộ điểm, có thể xử lý trực tiếp từng giá trị ngay khi đọc, giảm bộ nhớ phụ xuống `O(1)`.

Đây là ví dụ cho thấy best practice không phải lúc nào cũng đồng nghĩa với việc sử dụng nhiều abstraction hoặc container hơn.

---

# FAQ: Những câu hỏi thường gặp

## 18. Có nên dùng `using namespace std;`?

**Không nên sử dụng mặc định trong header hoặc các dự án phần mềm lớn.**

Ví dụ:

```cpp
using namespace std;
```

làm cho những tên từ namespace `std` tham gia vào quá trình tra cứu tên không cần viết tiền tố `std::`.

Điều này có thể gây xung đột hoặc khiến nguồn gốc của API khó nhận biết.

Thay vì:

```cpp
using namespace std;

vector<int> values;
cout << "Hello\n";
```

Có thể viết:

```cpp
std::vector<int> values;
std::cout << "Hello\n";
```

### Có ngoại lệ không?

Có.

Trong một bài giải thuật ngắn hoặc chương trình nhỏ, `using namespace std;` có thể là lựa chọn phong cách chấp nhận được nếu môi trường đã được kiểm soát.

Tuy nhiên, không nên đưa using-directive này vào header công khai vì nó ảnh hưởng tới những translation unit include header đó.

**Khuyến nghị cho DevHubs Wiki:** Sử dụng `std::` tường minh trong các ví dụ.

---

## 19. Có nên dùng `#include <bits/stdc++.h>`?

Đây là một header không thuộc ISO C++, thường được cung cấp bởi môi trường libstdc++.

Ví dụ:

```cpp
#include <bits/stdc++.h>
```

được sử dụng phổ biến trong competitive programming.

### Ưu điểm

Giảm thời gian gõ tên header trong môi trường hỗ trợ.

### Nhược điểm

- Không portable theo tiêu chuẩn C++.
- Không được bảo đảm có trên MSVC.
- Có thể làm tăng chi phí compile.
- Làm dependency kém rõ ràng.

Đối với phần mềm portable:

```cpp
#include <algorithm>
#include <iostream>
#include <vector>
```

thường phù hợp hơn.

**Kết luận:** Có thể sử dụng trong một môi trường thi đấu được kiểm soát, nhưng không nên là mặc định của codebase production.

---

## 20. Có cần tự dùng `new` và `delete` không?

Trong đa số chương trình C++ hiện đại, **không cần sử dụng trực tiếp `new` và `delete` cho các trường hợp thông thường**.

Ví dụ:

```cpp
int value{42};
```

hoặc:

```cpp
std::vector<int> values{1, 2, 3};
```

Nếu cần ownership động độc quyền:

```cpp
auto value = std::make_unique<int>(42);
```

Những trường hợp sử dụng `new`/`delete` trực tiếp vẫn tồn tại, chẳng hạn khi triển khai allocator, container hoặc cơ chế quản lý tài nguyên cấp thấp.

Nhưng những thao tác đó nên được đóng gói trong abstraction có hợp đồng ownership rõ ràng.

---

## 21. Mọi biến đều nên dùng `const`?

Không.

Sử dụng `const` khi biến không cần thay đổi sau khởi tạo.

Ví dụ:

```cpp
const int maxScore{100};
```

Nhưng nếu biến phải cập nhật:

```cpp
int count{};

++count;
```

thì không thể khai báo `count` là `const`.

Ngoài ra, `const` không tự động bảo đảm thread safety hoặc bảo vệ mọi đối tượng có thể truy cập gián tiếp từ dữ liệu đó.

**Kết luận:** Dùng `const` để diễn đạt ý định bất biến, không dùng chỉ để tăng số lượng từ khóa trong code.

---

## 22. Có nên luôn dùng `auto`?

Không.

`auto` phù hợp khi kiểu dễ suy luận hoặc quá dài.

Ví dụ:

```cpp
auto it = values.begin();
```

Nhưng:

```cpp
int studentCount{40};
```

có thể dễ hiểu hơn trong những tình huống kiểu dữ liệu mang ý nghĩa quan trọng.

Nên cân nhắc khả năng đọc hiểu của người bảo trì mã nguồn.

---

## 23. `std::array` hay `std::vector` tốt hơn?

Phụ thuộc vào yêu cầu.

| Tiêu chí | std::array | std::vector |
|---|---|---|
| Kích thước | Cố định theo kiểu | Linh hoạt |
| Thay đổi số phần tử | Không | Có |
| Quản lý phần tử | Tích hợp trong đối tượng | Quản lý vùng lưu trữ động |
| Truy cập theo chỉ số | Có | Có |
| Phù hợp | Kích thước cố định | Kích thước biến đổi |

Ví dụ:

```cpp
std::array<int, 3> rgb{255, 128, 0};
```

phù hợp khi số phần tử cố định.

Trong khi:

```cpp
std::vector<int> scores;
```

phù hợp khi số lượng điểm không biết trước.

---

## 24. `std::vector::reserve()` và `resize()` khác nhau thế nào?

Đây là một điểm dễ nhầm.

```cpp
std::vector<int> values;

values.reserve(100);
```

Dự trữ capacity đủ cho ít nhất 100 phần tử nhưng không tạo ra 100 phần tử có thể truy cập.

Sau câu lệnh:

```text
size = 0
capacity >= 100
```

Trong khi:

```cpp
values.resize(100);
```

thay đổi kích thước logic của vector thành 100 phần tử.

Với `int` được khởi tạo mặc định theo cách này, các phần tử mới nhận giá trị `0`.

**Không được truy cập `values[0]` chỉ vì đã gọi `reserve(100)` khi `size()` vẫn bằng 0.**

---

## 25. Có nên luôn truyền `const T&` thay cho `T`?

Không.

Với kiểu nhỏ như:

```cpp
int
bool
double
```

truyền bằng giá trị thường rất phù hợp.

Với đối tượng lớn, truyền `const T&` có thể tránh việc sao chép không cần thiết.

Nhưng nếu hàm cần lưu lại một bản sao hoặc sở hữu đối số, truyền giá trị đôi khi là thiết kế hợp lý hơn.

**Nguyên tắc:** Lựa chọn theo ngữ nghĩa API và chi phí thật của kiểu dữ liệu.

---

## 26. Pointer có luôn nhanh hơn reference?

Không có bảo đảm như vậy.

Pointer và reference có ngữ nghĩa khác nhau, nhưng compiler có thể tối ưu nhiều trường hợp sử dụng chúng thành mã máy tương tự.

Không nên lựa chọn raw pointer chỉ vì cho rằng nó nhanh hơn.

Nên sử dụng:

- `T&` khi bắt buộc có đối tượng và cần tham chiếu.
- `const T&` khi muốn đọc mà không sao chép.
- `T*` khi cần biểu diễn null hoặc thay đổi đối tượng đích.

Các quyết định tối ưu hiệu năng phải dựa trên profiling.

---

## 27. Có nên dùng `std::endl` hay `'\n'`?

`std::endl` thực hiện hai thao tác:

1. Xuống dòng.
2. Flush luồng xuất.

Trong khi:

```cpp
std::cout << '\n';
```

chỉ ghi ký tự xuống dòng.

Nếu không cần flush ngay, sử dụng `'\n'` thường phù hợp hơn, đặc biệt trong chương trình xuất nhiều dữ liệu.

Tuy nhiên, `std::endl` không sai. Nó có ý nghĩa khi chủ động cần flush.

---

## 28. C++23 có tốt hơn C++17 không?

C++23 bổ sung nhiều khả năng mới, nhưng không tự động tốt hơn cho mọi dự án.

Ví dụ:

- Concepts và Ranges xuất hiện ở C++20.
- `std::expected` xuất hiện ở C++23.
- `std::print` xuất hiện ở C++23.

Nếu dự án cần những tính năng đó và toolchain hỗ trợ, việc nâng chuẩn có thể hợp lý.

Ngược lại, nếu sản phẩm cần tương thích với nhiều hệ thống cũ, C++17 vẫn có thể là một baseline phù hợp.

Việc chọn chuẩn phải dựa trên yêu cầu thực tế, không phải chỉ dựa vào số phiên bản.

---

## 29. Compiler không báo lỗi có nghĩa chương trình an toàn?

Không.

C++ có những trường hợp *undefined behavior*, trong đó tiêu chuẩn không quy định kết quả hoặc hành vi khi chương trình thực hiện thao tác không hợp lệ.

Ví dụ:

```cpp
int values[3]{1, 2, 3};

std::cout << values[5];
```

Đây là truy cập vượt phạm vi mảng.

Chương trình có thể vẫn biên dịch được.

Tương tự, compiler không nhất thiết phát hiện được:

- Dangling pointer.
- Use-after-free.
- Một số trường hợp integer overflow.
- Lỗi logic.
- Data race.
- Những sai sót về hợp đồng API.

Vì vậy, cần kết hợp compiler warnings, static analysis, testing và sanitizer.

---

## 30. Có nên tối ưu code ngay từ đầu?

Nên thiết kế thuật toán và cấu trúc dữ liệu hợp lý ngay từ đầu, nhưng không nên tối ưu vi mô quá sớm.

Ví dụ, chọn thuật toán `O(n log n)` thay cho `O(n²)` khi dữ liệu lớn có thể là quyết định quan trọng.

Nhưng thay đổi từng chi tiết cú pháp mà chưa đo hiệu năng thường không mang lại lợi ích rõ ràng.

**Cách tiếp cận phù hợp:**

- Viết chương trình đúng.
- Xác định yêu cầu hiệu năng.
- Đo trên workload đại diện.
- Tìm bottleneck.
- Tối ưu phần có ảnh hưởng lớn.
- Kiểm thử lại sau thay đổi.

---

## 31. Có cần học toàn bộ STL không?

Không cần ghi nhớ toàn bộ Standard Library.

Nên bắt đầu với những thành phần thường gặp:

| Nhóm | Thành phần |
|---|---|
| Container | `vector`, `array`, `map`, `set` |
| Chuỗi | `string` |
| Thuật toán | `sort`, `find`, `count` |
| Tính toán | `accumulate` |
| Tiện ích | `pair`, `optional` |
| Bộ nhớ | `unique_ptr` |
| Nhập xuất | `cin`, `cout`, `getline` |

Khi gặp bài toán mới, tìm hiểu đúng thành phần cần thiết.

**Mục tiêu:** Biết công cụ nào tồn tại và khi nào nên dùng, thay vì học thuộc mọi phương thức của từng container.

---

## 32. C++ Best Practices có phải quy tắc bắt buộc?

Không.

Best practices là những nguyên tắc được đề xuất để cải thiện chất lượng phần mềm.

Một nguyên tắc có thể có ngoại lệ hợp lý.

Ví dụ:

- `bits/stdc++.h` có thể được chấp nhận trong competitive programming.
- Raw pointers vẫn cần thiết trong một số API cấp thấp.
- `new` và `delete` có thể xuất hiện trong những thành phần quản lý bộ nhớ chuyên dụng.
- Compiler extensions có thể cần thiết khi làm việc với nền tảng đặc biệt.
- Exceptions có thể không được sử dụng trong một số hệ thống real-time.

Tuy nhiên, ngoại lệ nên xuất phát từ **yêu cầu kỹ thuật được xác định rõ**, không phải vì không hiểu những công cụ thay thế.

---

# Checklist trước khi review hoặc phát hành

## 33. Code correctness

- [ ] Đầu vào được kiểm tra theo hợp đồng.
- [ ] Biến được khởi tạo trước khi sử dụng.
- [ ] Không có phép chia không hợp lệ.
- [ ] Không có nguy cơ tràn số chưa được kiểm soát.
- [ ] Chỉ số được kiểm tra trước khi truy cập.
- [ ] Không sử dụng pointer hoặc reference sau lifetime.
- [ ] Không có hành vi không xác định đã biết.
- [ ] Những trường hợp biên được xử lý rõ ràng.

## 34. Design và maintainability

- [ ] Tên biến và hàm thể hiện ý nghĩa.
- [ ] Hàm có trách nhiệm rõ ràng.
- [ ] Không tạo abstraction không cần thiết.
- [ ] Ownership được xác định.
- [ ] Dependency không bị lặp hoặc chồng chéo tùy tiện.
- [ ] Header không làm ô nhiễm namespace của người sử dụng.
- [ ] Kiểu dữ liệu phản ánh miền giá trị.
- [ ] Những giả định quan trọng được tài liệu hóa.

## 35. Build và testing

- [ ] Chuẩn C++ được khai báo tường minh.
- [ ] Build thành công từ thư mục build sạch.
- [ ] Không còn warning quan trọng chưa giải quyết.
- [ ] Unit tests đạt yêu cầu.
- [ ] Regression tests đạt yêu cầu.
- [ ] Các trường hợp lỗi được kiểm tra.
- [ ] Sanitizer và static analysis được sử dụng khi phù hợp.
- [ ] Toolchain và dependency được kiểm tra tương thích.

## 36. Performance và deployment

- [ ] Độ phức tạp phù hợp với dữ liệu dự kiến.
- [ ] Không sao chép dữ liệu lớn không cần thiết.
- [ ] Không cấp phát động quá mức khi tránh được.
- [ ] Không giữ container hoặc tài nguyên lâu hơn cần thiết.
- [ ] Những phần hiệu năng quan trọng đã được benchmark.
- [ ] Build production sử dụng cấu hình tối ưu phù hợp.
- [ ] Môi trường triển khai được kiểm tra với toolchain mục tiêu.
- [ ] Có khả năng chẩn đoán lỗi khi phần mềm gặp sự cố.

---

## 37. Tổng kết

Những best practices quan trọng trong C++ có thể được chia thành năm nguyên tắc.

**1. Correctness trước tiên**

Mã nguồn phải có hành vi xác định trong phạm vi đầu vào được hỗ trợ. Kiểm soát lỗi bộ nhớ, chỉ số, chuyển kiểu và số học trước khi tối ưu.

**2. Ownership phải rõ ràng**

Sử dụng value semantics, container và RAII khi phù hợp. Không để trách nhiệm quản lý tài nguyên trở nên mơ hồ.

**3. Code phải dễ hiểu**

Tên biến rõ ràng, hàm có trách nhiệm cụ thể và các abstraction có lý do tồn tại. Không đánh đổi khả năng bảo trì chỉ để viết ngắn hơn.

**4. Toolchain phải được kiểm soát**

Khai báo chuẩn C++, bật warning, kiểm tra dependency và dùng test để xác nhận chương trình hoạt động trên nền tảng mục tiêu.

**5. Tối ưu dựa trên bằng chứng**

Sử dụng thuật toán phù hợp và đo đạc hiệu năng. Không mặc định những thủ thuật cấp thấp luôn nhanh hơn các công cụ của C++ hiện đại.

**Ghi nhớ:** Best practice tốt nhất không phải luôn sử dụng tính năng mới nhất, nhiều abstraction nhất hoặc ít dòng code nhất. Đó là lựa chọn giúp chương trình đúng đắn, rõ ràng, có thể kiểm thử và bảo trì trong điều kiện thực tế của dự án.

---

## Tài liệu tham khảo

Để tìm hiểu sâu hơn, nên tham khảo những nguồn sau:

- [C++ Core Guidelines](https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines): Các nguyên tắc về giao diện, tài nguyên, kiểu dữ liệu và lập trình C++ hiện đại.
- [cppreference](https://en.cppreference.com/w/): Tra cứu quy tắc ngôn ngữ và Standard Library.
- [GCC Warning Options](https://gcc.gnu.org/onlinedocs/gcc/Warning-Options.html): Cấu hình cảnh báo khi biên dịch.
- [Clang AddressSanitizer](https://clang.llvm.org/docs/AddressSanitizer.html): Kiểm tra các lỗi truy cập bộ nhớ.
- [Clang UndefinedBehaviorSanitizer](https://clang.llvm.org/docs/UndefinedBehaviorSanitizer.html): Phát hiện nhiều trường hợp undefined behavior.
- [CMake Documentation](https://cmake.org/cmake/help/latest/): Cấu hình và quản lý build.
- [Google C++ Style Guide](https://google.github.io/styleguide/cppguide.html): Một ví dụ về coding style và chính sách kỹ thuật của một tổ chức.

Cần phân biệt **quy tắc thuộc tiêu chuẩn C++** với **quy ước của một dự án hoặc tổ chức**. Các style guide có thể đưa ra lựa chọn khác nhau mà vẫn hợp lệ.

## Đọc tiếp

- [Lộ trình học C++](/cpp/bat-dau/lo-trinh-hoc): Xây dựng thứ tự học từ căn bản đến nâng cao.
- [C++17, C++20 và C++23](/cpp/stl/cpp17-20-23): So sánh tính năng và khả năng tương thích giữa các phiên bản.
- [Clean Code và thiết kế phần mềm C++](/cpp/ky-thuat/clean-code): Tìm hiểu sâu về cách tổ chức, bảo trì và phát triển codebase.
- [Debugging và xử lý lỗi](/cpp/tra-cuu/debugging-errors): Chẩn đoán compile errors, linker errors, runtime errors và undefined behavior.
