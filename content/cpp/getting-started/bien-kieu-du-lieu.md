---
title: Biến, kiểu dữ liệu và quá trình biên dịch
description: Hướng dẫn khai báo và khởi tạo biến, lựa chọn kiểu dữ liệu, const, constexpr, auto, phạm vi biến, quản lý bộ nhớ và quá trình biên dịch C++17.
slug: /cpp/bat-dau/bien-kieu-du-lieu
category: fundamentals
categoryLabel: C++ căn bản
order: 20040
difficulty: beginner
keywords: [biến C++, kiểu dữ liệu C++, variable, data types, initialization, const, constexpr, auto, integer overflow, scope, compiler, translation unit, linker]
updated: 2026-10-21
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/bat-dau/chuong-trinh-dau-tien", "/cpp/bat-dau/toan-tu", "/cpp/ky-thuat/header-source-modules", "/cpp/tra-cuu/kieu-du-lieu"]
---

# Biến, kiểu dữ liệu và quá trình biên dịch trong C++

Khi viết chương trình, chúng ta cần lưu trữ và xử lý thông tin như số tuổi, điểm số, tên người dùng hoặc kết quả tính toán.

C++ cung cấp **biến (variables)** để quản lý dữ liệu và **kiểu dữ liệu (data types)** để xác định cách dữ liệu được biểu diễn, lưu trữ và xử lý.

Tuy nhiên, viết mã nguồn mới chỉ là bước đầu. Trước khi chương trình có thể chạy, mã C++ thường phải trải qua quá trình tiền xử lý, biên dịch và liên kết.

Bài học này giúp bạn hiểu:

- Biến là gì và cách khai báo biến trong C++.
- Sự khác biệt giữa khai báo, khởi tạo và gán giá trị.
- Các kiểu dữ liệu cơ bản và cách lựa chọn.
- Cách sử dụng `const`, `constexpr` và `auto`.
- Phạm vi và thời gian sống của biến.
- Chuyển đổi kiểu dữ liệu và những rủi ro thường gặp.
- Cách compiler biến mã nguồn thành chương trình thực thi.

**Tiêu chuẩn sử dụng:** C++17.

## 1. Biến là gì?

### 1.1. Khái niệm biến

Biến (variable) là tên được khai báo để tham chiếu đến một thực thể dữ liệu trong chương trình. Trong những ví dụ cơ bản, biến đặt tên cho một đối tượng (object) có kiểu dữ liệu xác định.

Ví dụ:

```cpp
int age{16};
```

Câu lệnh trên tạo một biến tên `age` với:

- **Tên biến:** `age`.
- **Kiểu dữ liệu:** `int`.
- **Giá trị ban đầu:** `16`.

Biến có thể được sử dụng trong các biểu thức:

```cpp
int age{16};

int nextYearAge = age + 1;
```

Sau khi thực hiện:

```text
age = 16
nextYearAge = 17
```

### 1.2. Ví dụ sử dụng biến

```cpp
#include <iostream>

int main() {
    int age{16};
    double height{1.75};

    std::cout << "Tuoi: " << age << '\n';
    std::cout << "Chieu cao: " << height << " m\n";

    return 0;
}
```

Kết quả:

```text
Tuoi: 16
Chieu cao: 1.75 m
```

Trong chương trình:

- `age` lưu số tuổi dưới dạng số nguyên.
- `height` lưu chiều cao dưới dạng số thực.
- `std::cout` hiển thị giá trị của các biến.

**Lợi ích của biến:** Chương trình có thể sử dụng lại dữ liệu, thực hiện tính toán và cập nhật trạng thái mà không cần viết trực tiếp các giá trị ở mọi vị trí.

---

## 2. Khai báo, khởi tạo và gán giá trị

Ba khái niệm này thường bị nhầm lẫn khi bắt đầu học C++.

### 2.1. Khai báo biến (Declaration)

Ví dụ:

```cpp
int number;
```

Câu lệnh trên khai báo biến `number` có kiểu `int`.

Trong trường hợp này, câu lệnh cũng định nghĩa một đối tượng, nhưng không cung cấp giá trị khởi tạo tường minh.

Đối với biến `int` cục bộ thông thường có thời gian lưu trữ tự động, giá trị ban đầu có thể là giá trị không xác định.

**Không được đọc giá trị của biến như vậy trước khi khởi tạo hoặc gán giá trị hợp lệ.** Trong các trường hợp thông thường của C++17, việc sử dụng giá trị bất định của một `int` gây ra hành vi không xác định.

### 2.2. Khởi tạo biến (Initialization)

Khởi tạo là cung cấp giá trị ban đầu khi tạo biến.

C++ hỗ trợ nhiều cú pháp:

```cpp
int a = 10;
int b(10);
int c{10};
int d = {10};
```

Cả bốn biến đều được khởi tạo với giá trị `10`.

Tuy nhiên, các hình thức khởi tạo không hoàn toàn tương đương trong mọi trường hợp, đặc biệt khi làm việc với class, constructor và danh sách khởi tạo.

### 2.3. Khởi tạo bằng dấu ngoặc nhọn

Cú pháp thường được khuyến nghị cho các biến cơ bản:

```cpp
int age{16};
double score{8.5};
bool active{true};
```

Một lợi ích của cú pháp `{}` là giúp ngăn nhiều phép chuyển đổi thu hẹp dữ liệu (*narrowing conversion*).

Ví dụ:

```cpp
int number{3.14};
```

Dòng trên không hợp lệ vì phép khởi tạo sẽ làm mất phần thập phân khi chuyển từ `double` sang `int`.

Trong khi đó:

```cpp
int number = 3.14;
```

Câu lệnh có thể được biên dịch, nhưng giá trị thu được là `3` và compiler có thể phát cảnh báo.

**Khuyến nghị:** Ưu tiên khởi tạo biến ngay khi khai báo và sử dụng `{}` khi phù hợp. Tuy nhiên, không nên coi mọi cách khởi tạo bằng `{}` đều giống nhau, nhất là với các container có constructor nhận `std::initializer_list`.

### 2.4. Value initialization

Có thể sử dụng cặp ngoặc nhọn rỗng:

```cpp
int count{};
double total{};
bool valid{};
```

Đối với các kiểu dữ liệu cơ bản ở trên, kết quả là:

| Biến | Giá trị |
|---|---|
| `count` | `0` |
| `total` | `0.0` |
| `valid` | `false` |

Ví dụ:

```cpp
#include <iostream>

int main() {
    int count{};

    std::cout << count << '\n';

    return 0;
}
```

Kết quả:

```text
0
```

Đây là cách khởi tạo rõ ràng, đặc biệt hữu ích đối với biến đếm và biến tích lũy.

### 2.5. Gán giá trị (Assignment)

Sau khi biến được tạo, có thể thay đổi giá trị bằng toán tử `=`.

```cpp
int score{50};

score = 80;
```

Lúc này:

```text
score = 80
```

Phân biệt:

```cpp
int score{50};
```

Là khai báo kết hợp khởi tạo.

```cpp
score = 80;
```

Là phép gán cho biến đã tồn tại.

Không phải mọi biến đều có thể được gán lại, ví dụ biến `const`.

---

## 3. Quy tắc đặt tên biến

Tên biến trong C++ phải tuân theo quy tắc định danh (identifier).

### 3.1. Quy tắc cơ bản

- Phân biệt chữ hoa và chữ thường.
- Không được bắt đầu bằng chữ số.
- Không chứa khoảng trắng.
- Không được trùng với từ khóa của C++.
- Có thể sử dụng chữ cái, chữ số và dấu gạch dưới theo các quy tắc định danh của ngôn ngữ.

Ví dụ hợp lệ:

```cpp
int age{16};
int studentCount{40};
double averageScore{8.5};
bool isActive{true};
```

Ví dụ không hợp lệ:

```cpp
int 2students;
int student count;
int class;
```

Trong đó:

- `2students` bắt đầu bằng chữ số.
- `student count` chứa khoảng trắng.
- `class` là từ khóa của C++.

### 3.2. Đặt tên có ý nghĩa

Không nên viết:

```cpp
int a{40};
int b{8};
int c{a * b};
```

Nếu không có ngữ cảnh, rất khó xác định các biến đại diện cho điều gì.

Nên viết:

```cpp
int quantity{40};
int price{8};

int total = quantity * price;
```

Tên biến nên diễn đạt vai trò của dữ liệu, không chỉ mô tả kiểu dữ liệu.

### 3.3. Một số naming convention

Các phong cách phổ biến:

| Phong cách | Ví dụ |
|---|---|
| camelCase | `studentCount` |
| snake_case | `student_count` |
| PascalCase | `StudentCount` |

Không có một phong cách đặt tên duy nhất bắt buộc cho mọi chương trình C++.

Điều quan trọng là **nhất quán trong cùng dự án**, tránh những tên mơ hồ và không tự tạo định danh thuộc phạm vi dành riêng cho implementation, chẳng hạn tên bắt đầu bằng hai dấu gạch dưới.

---

## 4. Các kiểu dữ liệu cơ bản

Kiểu dữ liệu quyết định những giá trị mà một đối tượng có thể biểu diễn và các thao tác có thể thực hiện trên đối tượng đó.

### 4.1. Kiểu số nguyên

Các kiểu số nguyên có dấu thường gặp:

```cpp
short smallNumber{100};
int age{16};
long population{1'000'000L};
long long distance{10'000'000'000LL};
```

Bảng tổng quan:

| Kiểu | Độ rộng tối thiểu theo chuẩn | Công dụng |
|---|---|---|
| `short` | 16 bit | Số nguyên |
| `int` | 16 bit | Số nguyên thông dụng |
| `long` | 32 bit | Số nguyên |
| `long long` | 64 bit | Số nguyên phạm vi lớn |

C++ quy định độ rộng tối thiểu và một số quan hệ giữa các kiểu, nhưng không yêu cầu `int` luôn rộng 32 bit.

Trên các hệ thống desktop hiện đại, `int` thường là 32 bit.

**Ví dụ:**

```cpp
#include <iostream>

int main() {
    int age{16};
    long long population{10000000000LL};

    std::cout << age << '\n';
    std::cout << population << '\n';

    return 0;
}
```

Kết quả:

```text
16
10000000000
```

### 4.2. Số nguyên không dấu (Unsigned)

Ngoài số nguyên có dấu, C++ hỗ trợ số nguyên không dấu:

```cpp
unsigned int count{100};
unsigned long long size{1000000ULL};
```

Các kiểu unsigned biểu diễn số nguyên không âm.

Ví dụ trên một hệ thống có `unsigned int` 32 bit:

```cpp
unsigned int value{0};

--value;
```

Kết quả của `value` là:

```text
4294967295
```

Đây là kết quả phép toán modulo theo số lượng giá trị biểu diễn của kiểu unsigned, không phải hành vi không xác định.

**Cần lưu ý:** Unsigned không tự động an toàn hơn signed.

Nếu trừ hai số không dấu mà kết quả toán học là số âm, chương trình có thể nhận một giá trị dương rất lớn do phép toán modulo.

### 4.3. Kiểu số thực

C++ cung cấp:

```cpp
float a{3.14f};
double b{3.1415926535};
long double c{3.1415926535L};
```

| Kiểu | Đặc điểm |
|---|---|
| `float` | Thường có độ chính xác thấp hơn `double` |
| `double` | Phổ biến trong tính toán số thực |
| `long double` | Độ chính xác hoặc phạm vi phụ thuộc implementation |

Trong nhiều môi trường thông dụng, `float` có khoảng 6 đến 9 chữ số thập phân có nghĩa, còn `double` có khoảng 15 đến 17 chữ số.

Đây là đặc điểm thường gặp của những định dạng IEEE 754 tương ứng, không phải cam kết chung về mọi implementation.

### 4.4. Sai số số thực

Xét biểu thức:

```cpp
double result = 0.1 + 0.2;
```

Về mặt toán học:

\[
0.1 + 0.2 = 0.3
\]

Nhưng trong cách biểu diễn dấu phẩy động nhị phân thông dụng, giá trị lưu trữ có thể không chính xác tuyệt đối.

Ví dụ:

```cpp
#include <iomanip>
#include <iostream>

int main() {
    double result = 0.1 + 0.2;

    std::cout << std::setprecision(17)
              << result << '\n';

    return 0;
}
```

Trên những hệ thống sử dụng `double` IEEE 754 binary64, kết quả thường là:

```text
0.30000000000000004
```

Điều này không có nghĩa C++ tính sai phép cộng. Vấn đề nằm ở giới hạn biểu diễn của kiểu số thực.

**Ứng dụng thực tế:** Với các phép tính tài chính yêu cầu giá trị thập phân chính xác, có thể lưu tiền bằng đơn vị nguyên nhỏ nhất, chẳng hạn đồng hoặc xu, hoặc sử dụng kiểu số thập phân thích hợp.

### 4.5. Kiểu bool

Kiểu `bool` biểu diễn hai giá trị:

```cpp
bool isOnline{true};
bool isBanned{false};
```

Ví dụ:

```cpp
#include <iostream>

int main() {
    bool valid{true};

    std::cout << valid << '\n';
    std::cout << std::boolalpha << valid << '\n';

    return 0;
}
```

Kết quả:

```text
1
true
```

Mặc định, `std::cout` in `bool` thành `1` hoặc `0`.

Sử dụng `std::boolalpha` để hiển thị `true` và `false`.

### 4.6. Kiểu char

`char` được sử dụng để lưu một đơn vị ký tự hẹp.

```cpp
char grade{'A'};
char symbol{'#'};
```

Lưu ý sự khác biệt:

```cpp
char letter{'A'};
```

và:

```cpp
std::string text{"A"};
```

- `'A'` là character literal thông thường.
- `"A"` là string literal có chứa ký tự `A` và ký tự kết thúc null.

Một `char` không thể đại diện cho mọi ký tự Unicode.

Ví dụ, trong UTF-8, nhiều ký tự tiếng Việt được mã hóa bằng nhiều byte. Vì vậy, không nên mặc định rằng một byte hoặc một `char` tương ứng với một ký tự mà người dùng nhìn thấy.

### 4.7. Kiểu std::string

Để làm việc với chuỗi ký tự, thường sử dụng `std::string`.

Header:

```cpp
#include <string>
```

Ví dụ:

```cpp
#include <iostream>
#include <string>

int main() {
    std::string name{"Nguyen Van An"};

    std::cout << name << '\n';
    std::cout << name.size() << '\n';

    return 0;
}
```

Kết quả:

```text
Nguyen Van An
13
```

`std::string::size()` trả về số đơn vị `char` trong chuỗi, không nhất thiết là số ký tự Unicode hiển thị.

Với chuỗi UTF-8, một ký tự có dấu có thể chiếm nhiều byte.

---

## 5. Kích thước và giới hạn kiểu dữ liệu

### 5.1. Toán tử sizeof

C++ cung cấp toán tử `sizeof` để xác định kích thước lưu trữ của kiểu hoặc đối tượng, tính theo byte của C++.

Ví dụ:

```cpp
#include <iostream>

int main() {
    std::cout << sizeof(char) << '\n';
    std::cout << sizeof(int) << '\n';
    std::cout << sizeof(double) << '\n';

    return 0;
}
```

Trên nhiều hệ thống desktop hiện đại, kết quả thường là:

```text
1
4
8
```

Cần phân biệt:

- `sizeof(char)` luôn bằng `1`.
- Một byte trong C++ chứa ít nhất 8 bit.
- `sizeof(int)` và `sizeof(double)` phụ thuộc vào implementation.

### 5.2. numeric_limits

Thư viện `<limits>` cung cấp thông tin về giới hạn kiểu dữ liệu.

```cpp
#include <iostream>
#include <limits>

int main() {
    std::cout
        << std::numeric_limits<int>::min()
        << '\n';

    std::cout
        << std::numeric_limits<int>::max()
        << '\n';

    return 0;
}
```

Trên hệ thống sử dụng `int` 32 bit với phạm vi thông dụng:

```text
-2147483648
2147483647
```

Một số thành phần hữu ích:

| Thành phần | Ý nghĩa |
|---|---|
| `min()` | Giá trị nhỏ nhất của kiểu nguyên; với kiểu số thực là giá trị dương chuẩn hóa nhỏ nhất |
| `max()` | Giá trị hữu hạn lớn nhất |
| `lowest()` | Giá trị hữu hạn thấp nhất |
| `digits` | Số bit giá trị của kiểu nguyên hoặc số chữ số cơ số hai có nghĩa của kiểu số thực |
| `digits10` | Số chữ số thập phân có thể biểu diễn mà không bị thay đổi khi chuyển đổi qua lại theo quy tắc tương ứng |

Đặc biệt với số thực, `min()` không phải giá trị âm nhỏ nhất. Khi cần giới hạn thấp nhất, sử dụng `lowest()`.

### 5.3. Kiểu số nguyên có độ rộng cố định

Header `<cstdint>` cung cấp những kiểu như:

```cpp
#include <cstdint>

std::int32_t score{100};
std::uint64_t count{1000000};
```

Các kiểu này có độ rộng đúng như tên gọi khi implementation hỗ trợ.

Ví dụ:

| Kiểu | Ý nghĩa |
|---|---|
| `std::int8_t` | Số nguyên có dấu 8 bit |
| `std::uint8_t` | Số nguyên không dấu 8 bit |
| `std::int32_t` | Số nguyên có dấu 32 bit |
| `std::uint32_t` | Số nguyên không dấu 32 bit |
| `std::int64_t` | Số nguyên có dấu 64 bit |
| `std::uint64_t` | Số nguyên không dấu 64 bit |

Các kiểu có độ rộng chính xác này là tùy chọn theo tiêu chuẩn nếu implementation không có kiểu nguyên phù hợp.

**Khi nào nên sử dụng?**

Các kiểu có độ rộng cố định hữu ích khi làm việc với dữ liệu nhị phân, giao thức, định dạng tệp hoặc các trường hợp thực sự yêu cầu độ rộng cụ thể.

Không nhất thiết phải thay toàn bộ `int` bằng `std::int32_t`.

---

## 6. const, constexpr và auto

### 6.1. const: Giá trị không thể thay đổi thông qua biến

Ví dụ:

```cpp
const int maxStudents{45};
```

Sau khi khởi tạo, không thể gán lại cho biến:

```cpp
maxStudents = 50;
```

Câu lệnh trên không hợp lệ.

`const` đặc biệt hữu ích khi biểu diễn dữ liệu không cần thay đổi trong phạm vi sử dụng.

### 6.2. constexpr: Biểu thức hằng tại thời điểm biên dịch

Ví dụ:

```cpp
constexpr int secondsPerMinute{60};
constexpr int minutesPerHour{60};

constexpr int secondsPerHour{
    secondsPerMinute * minutesPerHour
};
```

Giá trị `secondsPerHour` bằng `3600`.

Một biến `constexpr` phải được khởi tạo bằng biểu thức hằng hợp lệ.

Ví dụ không hợp lệ:

```cpp
int age{};
std::cin >> age;

constexpr int currentAge{age};
```

Vì `age` được đọc trong lúc chương trình chạy, không phải một giá trị hằng có thể dùng để khởi tạo `constexpr`.

### 6.3. So sánh const và constexpr

| Đặc điểm | const | constexpr |
|---|---|---|
| Không cho phép gán lại biến | Có | Có |
| Bắt buộc khởi tạo bằng biểu thức hằng | Không | Có |
| Có thể nhận giá trị tại runtime | Có | Không đối với khởi tạo constexpr |
| Thích hợp cho hằng compile-time | Có thể, tùy ngữ cảnh | Rõ ràng hơn |

Ví dụ:

```cpp
int input{};
std::cin >> input;

const int value{input};
```

Hợp lệ nếu dữ liệu đầu vào được đọc thành công.

Ngược lại:

```cpp
constexpr int value{input};
```

Không hợp lệ khi `input` không phải biểu thức hằng.

### 6.4. auto: Tự suy luận kiểu dữ liệu

Ví dụ:

```cpp
auto age = 16;
auto height = 1.75;
auto active = true;
```

Compiler suy luận:

| Biến | Kiểu |
|---|---|
| `age` | `int` |
| `height` | `double` |
| `active` | `bool` |

`auto` không có nghĩa biến có thể tự do đổi kiểu trong khi chạy.

Ví dụ:

```cpp
auto value = 10;

value = 20;
```

Hợp lệ.

Nhưng:

```cpp
value = "Hello";
```

Không hợp lệ vì `value` đã được suy luận thành `int`.

### 6.5. Khi nào nên sử dụng auto?

Nên dùng khi kiểu dữ liệu đã rõ ràng hoặc khi cách viết kiểu tường minh gây dài dòng.

Ví dụ:

```cpp
auto it = values.begin();
```

Đặc biệt hữu ích khi làm việc với iterator, lambda và các kiểu template dài.

Với những biến cơ bản, việc khai báo tường minh vẫn có thể dễ hiểu hơn:

```cpp
int age{16};
double score{8.5};
```

**Nguyên tắc:** Dùng `auto` để giảm sự lặp lại và tăng tính rõ ràng, không phải để che giấu kiểu dữ liệu quan trọng.

---

## 7. Chuyển đổi kiểu dữ liệu (Type Conversion)

Chuyển đổi kiểu dữ liệu là quá trình biến đổi một giá trị sang kiểu khác.

### 7.1. Chuyển đổi ngầm định

C++ có thể tự chuyển đổi kiểu khi thực hiện biểu thức.

Ví dụ:

```cpp
int a{5};
double b{2.5};

double result = a + b;
```

Kết quả:

```text
7.5
```

Trong phép cộng trên, giá trị `a` được chuyển sang kiểu `double` theo các quy tắc chuyển đổi số học.

### 7.2. Chuyển đổi tường minh

Có thể sử dụng `static_cast`:

```cpp
double value{9.8};

int number = static_cast<int>(value);
```

Kết quả:

```text
number = 9
```

Phần thập phân bị loại bỏ theo hướng về 0 khi chuyển một giá trị số thực hữu hạn, nằm trong phạm vi cho phép, sang kiểu nguyên.

### 7.3. Tránh chia nguyên ngoài ý muốn

Ví dụ:

```cpp
int a{7};
int b{2};

double result = a / b;
```

Kết quả là `3.0`, không phải `3.5`.

Vì phép chia nguyên được thực hiện trước khi chuyển kết quả sang `double`.

Cách sửa:

```cpp
double result = static_cast<double>(a) / b;
```

Kết quả:

```text
3.5
```

### 7.4. Chuyển đổi có thể làm mất dữ liệu

Ví dụ:

```cpp
double price{99.99};

int rounded = static_cast<int>(price);
```

Giá trị nhận được là `99`, không phải `100`.

`static_cast<int>` không tự làm tròn đến số nguyên gần nhất.

Ngoài ra, nếu giá trị nguồn vượt phạm vi biểu diễn của kiểu đích, phép chuyển từ số thực sang kiểu nguyên có thể gây hành vi không xác định.

**Khuyến nghị:** Trước khi chuyển kiểu, cần xác định phạm vi giá trị và mức độ mất mát dữ liệu có thể chấp nhận.

---

## 8. Tràn số nguyên (Integer Overflow)

Tràn số xảy ra khi kết quả một phép toán vượt phạm vi biểu diễn của kiểu dữ liệu.

### 8.1. Ví dụ tràn số

Giả sử `int` có phạm vi lớn nhất là `2147483647`.

```cpp
int value{2'000'000'000};

int result = value * 2;
```

Kết quả toán học là:

```text
4000000000
```

Giá trị này vượt phạm vi biểu diễn của `int` 32 bit có dấu.

Trong C++17, tràn số nguyên có dấu gây ra *undefined behavior*.

Điều này có nghĩa tiêu chuẩn C++ không quy định kết quả hay hành vi của chương trình trong trường hợp đó.

Không nên mặc định rằng chương trình sẽ tự động chuyển thành số âm hoặc luôn báo lỗi.

### 8.2. Sử dụng kiểu đủ rộng

Ví dụ:

```cpp
long long value{2'000'000'000LL};

long long result = value * 2;
```

Kết quả:

```text
4000000000
```

### 8.3. Chú ý kiểu dữ liệu của phép tính

Đây là lỗi khá khó nhận ra:

```cpp
int a{2'000'000'000};

long long result = a * 2;
```

Mặc dù `result` có kiểu `long long`, phép nhân vẫn được thực hiện bằng `int` trước khi gán.

Trong môi trường `int` 32 bit, phép nhân trên gây tràn số có dấu.

Cách xử lý:

```cpp
long long result = 1LL * a * 2;
```

Hoặc:

```cpp
long long result =
    static_cast<long long>(a) * 2;
```

### 8.4. Kiểm tra trước phép tính

Sử dụng kiểu lớn hơn không giải quyết mọi trường hợp.

Ví dụ với hai số nguyên dương `a` và `b`, để kiểm tra phép nhân có vượt giới hạn của kiểu không, có thể kiểm tra trước:

```cpp
#include <iostream>
#include <limits>

int main() {
    long long a{1'000'000'000};
    long long b{10'000'000'000LL};

    const long long limit =
        std::numeric_limits<long long>::max();

    if (a > limit / b) {
        std::cerr << "Integer overflow\n";
        return 1;
    }

    const long long result = a * b;

    std::cout << result << '\n';

    return 0;
}
```

Trong ví dụ này, `a` và `b` đều dương. Công thức kiểm tra không thể áp dụng nguyên xi cho mọi tổ hợp số âm, số 0 và giá trị nhỏ nhất của kiểu nguyên.

**Nguyên tắc:** Kiểm tra tràn trước khi thực hiện phép tính có nguy cơ vượt phạm vi, không phải sau khi phép tính đã xảy ra.

---

## 9. Phạm vi và thời gian sống của biến

Một biến không nhất thiết tồn tại hoặc có thể truy cập từ mọi vị trí trong chương trình.

Cần phân biệt hai khái niệm:

- **Scope:** Phạm vi mà tên có thể được sử dụng.
- **Lifetime:** Khoảng thời gian đối tượng tồn tại.

### 9.1. Biến cục bộ (Local Variable)

Biến được khai báo bên trong một khối lệnh thường có phạm vi giới hạn trong khối đó.

Ví dụ:

```cpp
#include <iostream>

int main() {
    int a{10};

    if (a > 5) {
        int b{20};

        std::cout << b << '\n';
    }

    std::cout << a << '\n';

    return 0;
}
```

Biến `a` có thể được sử dụng trong phần còn lại của thân hàm `main`, sau vị trí khai báo.

Biến `b` chỉ nằm trong phạm vi khối `if`.

Vì vậy, viết:

```cpp
std::cout << b;
```

ở ngoài khối `if` sẽ gây lỗi biên dịch vì tên `b` không còn nằm trong phạm vi nhìn thấy.

### 9.2. Biến toàn cục (Global Variable)

Biến khai báo ở namespace scope có thể được truy cập từ nhiều vị trí, tùy thuộc khai báo và linkage.

Ví dụ:

```cpp
#include <iostream>

int total{100};

int main() {
    std::cout << total << '\n';

    return 0;
}
```

Biến `total` ở đây có static storage duration.

Tuy nhiên, sử dụng nhiều biến toàn cục có thể khiến các thành phần phụ thuộc lẫn nhau và khó kiểm soát trạng thái.

Đối với dữ liệu không cần chia sẻ toàn chương trình, nên ưu tiên phạm vi nhỏ hơn.

### 9.3. Biến static cục bộ

```cpp
#include <iostream>

void countCalls() {
    static int count{0};

    ++count;

    std::cout << count << '\n';
}

int main() {
    countCalls();
    countCalls();
    countCalls();
}
```

Kết quả:

```text
1
2
3
```

Khác với biến cục bộ thông thường, biến `static` cục bộ duy trì đối tượng xuyên suốt các lần gọi hàm.

Tên của nó vẫn chỉ có phạm vi trong khối khai báo, nhưng đối tượng có static storage duration.

### 9.4. Shadowing

Shadowing xảy ra khi một tên được khai báo ở phạm vi bên trong che khuất tên cùng định danh ở phạm vi bên ngoài.

Ví dụ:

```cpp
#include <iostream>

int main() {
    int value{10};

    {
        int value{20};

        std::cout << value << '\n';
    }

    std::cout << value << '\n';

    return 0;
}
```

Kết quả:

```text
20
10
```

Dù hợp lệ, shadowing có thể gây nhầm lẫn trong chương trình lớn.

Nên tránh sử dụng lại tên biến khi không có lý do rõ ràng.

---

## 10. Bộ nhớ và vòng đời đối tượng

Khi một đối tượng được tạo, C++ xác định thời gian lưu trữ (storage duration) và quản lý vòng đời của nó theo quy tắc tương ứng.

Trong phần căn bản, cần nắm hai trường hợp thường gặp.

### 10.1. Automatic storage duration

Các biến cục bộ thông thường thường có automatic storage duration.

Ví dụ:

```cpp
void calculate() {
    int result{100};
}
```

Đối tượng `result` được tạo trong quá trình thực hiện lời gọi hàm và kết thúc vòng đời khi rời khỏi khối tương ứng.

Các đối tượng có automatic storage duration thường được triển khai bằng stack, nhưng tiêu chuẩn C++ không bắt buộc mọi đối tượng như vậy phải nằm trên một cấu trúc bộ nhớ cụ thể gọi là stack.

### 10.2. Dynamic storage duration

C++ cũng cho phép cấp phát bộ nhớ động.

Ví dụ:

```cpp
int* value = new int{42};

delete value;
```

Đối tượng được tạo bằng `new` cần được giải phóng đúng cách.

Nếu quên `delete`, chương trình có thể bị rò rỉ bộ nhớ.

Trong C++ hiện đại, nên tránh quản lý quyền sở hữu bộ nhớ động thủ công khi có lựa chọn phù hợp hơn.

Ví dụ sử dụng `std::unique_ptr`:

```cpp
#include <memory>

int main() {
    auto value = std::make_unique<int>(42);

    return 0;
}
```

Bộ nhớ được quản lý tự động theo vòng đời của smart pointer.

Tuy nhiên, không phải biến nào cũng cần cấp phát động.

Đối với một giá trị nguyên thông thường:

```cpp
int value{42};
```

là lựa chọn đơn giản hơn.

**Nguyên tắc:** Chọn cơ chế lưu trữ và quản lý tài nguyên phù hợp với vòng đời thực tế của đối tượng, tránh cấp phát động khi không cần thiết.

---

## 11. Từ mã nguồn đến chương trình thực thi

C++ là ngôn ngữ thường được biên dịch thành mã máy trước khi chạy.

Ví dụ, một dự án có file:

```text
main.cpp
```

Nội dung:

```cpp
#include <iostream>

int main() {
    std::cout << "Hello C++\n";

    return 0;
}
```

Để chạy chương trình, mã nguồn phải được xử lý bởi compiler toolchain.

### 11.1. Tổng quan quá trình build

Quá trình build C++ thông thường:

```text
Source Code (.cpp)
        |
        v
Preprocessing
        |
        v
Compilation
        |
        v
Assembly / Object Code
        |
        v
Object File (.o / .obj)
        |
        v
Linking
        |
        v
Executable
```

Tùy compiler, một số bước có thể được kết hợp hoặc triển khai nội bộ khác nhau. Sơ đồ trên mô tả quy trình build phổ biến.

### 11.2. Preprocessing

Preprocessor xử lý các chỉ thị tiền xử lý như:

```cpp
#include <iostream>
#define VERSION 1
```

Ví dụ:

```cpp
#include "Config.h"
```

Nội dung header được đưa vào quá trình tiền xử lý theo quy tắc của `#include`.

Bước này không chỉ đơn giản là sao chép văn bản trong mọi trường hợp, bởi preprocessor còn xử lý macro, điều kiện tiền xử lý và các chỉ thị khác.

### 11.3. Compilation

Sau tiền xử lý, compiler phân tích mã nguồn theo các quy tắc của ngôn ngữ.

Các công việc điển hình bao gồm:

- Phân tích cú pháp.
- Kiểm tra kiểu dữ liệu.
- Kiểm tra những ràng buộc của ngôn ngữ.
- Tạo biểu diễn trung gian.
- Thực hiện tối ưu hóa nếu được cấu hình.
- Sinh mã đích thông qua các bước thích hợp.

Ví dụ:

```cpp
int value = "Hello";
```

Dòng trên không hợp lệ vì không có phép chuyển đổi phù hợp từ string literal sang `int` trong ngữ cảnh này.

Compiler có thể phát hiện và thông báo lỗi.

### 11.4. Object file

Sau quá trình biên dịch thành công, toolchain có thể tạo object file.

Một số phần mở rộng thường gặp:

| Nền tảng/toolchain | Object file |
|---|---|
| GCC/Clang trên nhiều hệ Unix | `.o` |
| MSVC trên Windows | `.obj` |

Object file thường chứa mã máy cùng thông tin cần thiết cho quá trình liên kết.

Object file không nhất thiết là một chương trình có thể thực thi độc lập.

### 11.5. Linking

Linker kết hợp các object file và thư viện cần thiết để tạo sản phẩm cuối cùng.

Ví dụ, chương trình có thể gồm:

```text
main.cpp
Math.cpp
```

`main.cpp` gọi hàm `add()` được định nghĩa trong `Math.cpp`.

Compiler có thể biên dịch hai file thành các object file riêng biệt.

Linker sau đó liên kết chúng để lời gọi `add()` có thể được giải quyết đến định nghĩa phù hợp.

Nếu thiếu định nghĩa hàm hoặc một thành phần liên kết cần thiết, linker có thể báo lỗi như:

```text
undefined reference to `add(int, int)`
```

Hoặc trên MSVC:

```text
unresolved external symbol
```

---

## 12. Header, source file và translation unit

Khi dự án phát triển, không nên đặt toàn bộ chương trình trong một file duy nhất.

C++ thường tổ chức mã nguồn thành các header và source file.

### 12.1. Header file

Header thường chứa các khai báo được chia sẻ giữa nhiều translation unit.

Ví dụ:

**Math.h**

```cpp
#ifndef MATH_H
#define MATH_H

int add(int a, int b);

#endif
```

Đây là include guard, giúp tránh xử lý lặp lại nội dung header trong cùng một translation unit.

Tên macro của include guard cần được chọn đủ riêng biệt trong dự án để tránh trùng tên.

### 12.2. Source file

**Math.cpp**

```cpp
#include "Math.h"

int add(int a, int b) {
    return a + b;
}
```

File này chứa định nghĩa hàm `add()`.

### 12.3. File main.cpp

```cpp
#include <iostream>
#include "Math.h"

int main() {
    const int result = add(5, 3);

    std::cout << result << '\n';

    return 0;
}
```

### 12.4. Cấu trúc dự án

```text
Project/
├── main.cpp
├── Math.cpp
└── Math.h
```

Biên dịch bằng GCC:

```sh
g++ -std=c++17 -Wall -Wextra -Wpedantic main.cpp Math.cpp -o app
```

Khi chạy, chương trình in:

```text
8
```

### 12.5. Translation unit là gì?

Một translation unit là đơn vị mã nguồn được tạo sau khi một source file trải qua quá trình tiền xử lý, bao gồm nội dung header được đưa vào bằng `#include` cùng những biến đổi tiền xử lý liên quan.

Ví dụ:

```text
main.cpp + included headers
             |
             v
     Translation Unit 1

Math.cpp + included headers
             |
             v
     Translation Unit 2
```

Thông thường, các translation unit được biên dịch riêng và sau đó liên kết.

### 12.6. One Definition Rule (ODR)

C++ có quy tắc về số lượng và tính nhất quán của các định nghĩa, gọi là *One Definition Rule*.

Ví dụ không nên đặt một định nghĩa biến toàn cục thông thường vào header rồi include ở nhiều source file:

```cpp
int globalValue{100};
```

Nếu nhiều translation unit cùng định nghĩa một biến có external linkage như vậy, chương trình có thể vi phạm ODR và gặp lỗi multiple definition khi liên kết.

Một cách tổ chức phù hợp là đặt khai báo trong header:

```cpp
extern int globalValue;
```

Và định nghĩa tại một source file:

```cpp
int globalValue{100};
```

C++17 cũng có inline variables cho những trường hợp cần định nghĩa biến phù hợp trong header.

Chi tiết về ODR, header organization và modules được trình bày trong bài [Header, source và translation units](/cpp/ky-thuat/header-source-modules).

---

## 13. Lệnh biên dịch C++17

### 13.1. GCC (g++)

Biên dịch chương trình:

```sh
g++ -std=c++17 -Wall -Wextra -Wpedantic main.cpp -o app
```

Các tham số:

| Tham số | Công dụng |
|---|---|
| `-std=c++17` | Chọn chuẩn C++17 |
| `-Wall` | Bật nhiều cảnh báo |
| `-Wextra` | Bật cảnh báo bổ sung |
| `-Wpedantic` | Cảnh báo về một số phần mở rộng ngoài chuẩn |
| `-o app` | Đặt tên đầu ra |

Trên Linux/macOS, chạy:

```sh
./app
```

Trên Windows PowerShell, với tệp `app.exe`:

```powershell
.\app.exe
```

### 13.2. Clang

```sh
clang++ -std=c++17 -Wall -Wextra -Wpedantic main.cpp -o app
```

### 13.3. MSVC

Với Developer Command Prompt của Visual Studio:

```bat
cl /std:c++17 /EHsc /W4 main.cpp /Fe:app.exe
```

Các tham số quan trọng:

- `/std:c++17`: Chọn chuẩn C++17.
- `/EHsc`: Cấu hình xử lý ngoại lệ C++.
- `/W4`: Bật mức cảnh báo cao.
- `/Fe:app.exe`: Đặt tên tệp thực thi.

### 13.4. Build để debug

GCC/Clang:

```sh
g++ -std=c++17 -Wall -Wextra -Wpedantic -g -O0 main.cpp -o app
```

Trong đó:

- `-g`: Thêm thông tin phục vụ debug.
- `-O0`: Tắt phần lớn tối ưu hóa để thuận tiện cho việc kiểm tra chương trình.

Trên môi trường hỗ trợ sanitizer:

```sh
g++ -std=c++17 -g -O1 -fsanitize=address,undefined -fno-omit-frame-pointer main.cpp -o app
```

Sanitizer có thể phát hiện nhiều lỗi truy cập bộ nhớ hoặc hành vi không xác định trong quá trình chạy thử, nhưng không đảm bảo tìm được mọi lỗi.

---

## 14. Phân biệt lỗi biên dịch, liên kết và runtime

Không phải mọi lỗi C++ đều xảy ra ở cùng một giai đoạn.

### 14.1. Compile-time error

Lỗi xảy ra khi mã nguồn vi phạm quy tắc ngôn ngữ mà compiler kiểm tra được.

Ví dụ:

```cpp
int age = "Hello";
```

Compiler không thể tạo chương trình hợp lệ từ câu lệnh này.

Những nguyên nhân thường gặp:

- Sai cú pháp.
- Thiếu dấu `;`.
- Sử dụng tên chưa khai báo.
- Chuyển kiểu không hợp lệ.
- Gọi hàm không có overload phù hợp.

### 14.2. Link-time error

Lỗi xuất hiện khi các object file hoặc thư viện không được liên kết thành công.

Ví dụ:

```cpp
int add(int a, int b);

int main() {
    return add(2, 3);
}
```

Nếu không có định nghĩa của `add()` trong các thành phần được liên kết, quá trình linking thường thất bại.

### 14.3. Runtime error

Lỗi phát sinh khi chương trình đang chạy.

Ví dụ:

```cpp
#include <iostream>
#include <stdexcept>

int main() {
    throw std::runtime_error("Operation failed");
}
```

Nếu ngoại lệ không được xử lý, chương trình thường kết thúc bất thường.

Những tình huống khác có thể xuất hiện trong runtime:

- Đầu vào không hợp lệ.
- Không mở được tệp.
- Không cấp phát được bộ nhớ.
- Truy cập bộ nhớ sai.
- Lỗi logic trong quá trình xử lý.

Lưu ý rằng không phải mọi lỗi runtime đều tạo exception. Một số thao tác sai có thể dẫn đến undefined behavior.

### 14.4. Bảng phân biệt

| Loại lỗi | Thời điểm | Ví dụ |
|---|---|---|
| Compile-time | Biên dịch | Sai kiểu, sai cú pháp |
| Link-time | Liên kết | Thiếu định nghĩa hàm |
| Runtime | Chạy chương trình | Ngoại lệ, lỗi truy cập bộ nhớ |
| Logic | Chương trình xử lý sai yêu cầu | Công thức sai, điều kiện sai |

Một lỗi logic có thể tồn tại dù chương trình biên dịch và chạy bình thường.

---

## 15. Ví dụ thực hành tổng hợp

### Bài toán: Tính tổng tiền mua hàng

**Yêu cầu:**

Viết chương trình nhập:

- Số lượng sản phẩm.
- Đơn giá của mỗi sản phẩm, tính bằng đồng Việt Nam.

Tính tổng tiền:

\[
Total = Quantity \times Price
\]

Chương trình cần kiểm tra dữ liệu hợp lệ và tránh tràn số nguyên.

### 15.1. Phân tích kiểu dữ liệu

Giả sử bài toán quy định:

- Số lượng nằm trong `[1, 1000000]`.
- Đơn giá nằm trong `[0, 1000000000]`.

Tổng tiền tối đa:

\[
10^6 \times 10^9 = 10^{15}
\]

Giá trị này vượt giới hạn của `int` 32 bit, nhưng nằm trong phạm vi tối thiểu được bảo đảm của `long long`.

Vì vậy:

- Có thể dùng `int` cho `quantity` và `price` trên môi trường `int` 32 bit thông dụng.
- Nên dùng `long long` cho kết quả và đảm bảo phép nhân được thực hiện bằng `long long`.

Để tránh phụ thuộc vào giả định độ rộng 32 bit khi đọc các giới hạn nêu trên, chương trình dưới đây sử dụng `long long` cho cả hai đầu vào.

### 15.2. Chương trình C++17

```cpp
#include <iostream>

int main() {
    long long quantity{};
    long long price{};

    std::cout << "Nhap so luong: ";

    if (!(std::cin >> quantity)) {
        std::cerr << "So luong khong hop le.\n";
        return 1;
    }

    std::cout << "Nhap don gia: ";

    if (!(std::cin >> price)) {
        std::cerr << "Don gia khong hop le.\n";
        return 1;
    }

    constexpr long long maxQuantity{1'000'000};
    constexpr long long maxPrice{1'000'000'000};

    if (quantity < 1 || quantity > maxQuantity) {
        std::cerr << "So luong vuot pham vi.\n";
        return 1;
    }

    if (price < 0 || price > maxPrice) {
        std::cerr << "Don gia vuot pham vi.\n";
        return 1;
    }

    const long long total = quantity * price;

    std::cout << "Tong tien: " << total << " VND\n";

    return 0;
}
```

### 15.3. Kết quả

Input:

```text
Nhap so luong: 5
Nhap don gia: 150000
```

Output:

```text
Tong tien: 750000 VND
```

### 15.4. Phân tích

Chương trình áp dụng nhiều kiến thức:

| Thành phần | Kiến thức |
|---|---|
| `long long` | Lựa chọn kiểu nguyên đủ rộng |
| `std::cin` | Đọc dữ liệu |
| `if` | Kiểm tra điều kiện |
| `constexpr` | Khai báo giới hạn cố định |
| `const` | Giữ kết quả không thay đổi |
| `quantity * price` | Biểu thức số học |
| `std::cerr` | Thông báo lỗi |

Phép nhân an toàn trong phạm vi đã quy định vì:

\[
Total_{\max} = 10^{15}
\]

Giá trị này nhỏ hơn giới hạn tối đa tối thiểu được C++ bảo đảm cho `long long`.

### 15.5. Trường hợp kiểm thử

| Quantity | Price | Kết quả |
|---|---|---|
| 1 | 10000 | 10000 |
| 5 | 150000 | 750000 |
| 1000000 | 1000000000 | 1000000000000000 |
| 0 | 10000 | Từ chối |
| -1 | 10000 | Từ chối |
| 5 | -100 | Từ chối |
| 1000001 | 10000 | Từ chối |
| `abc` | 10000 | Lỗi nhập liệu |

Chú ý rằng kiểm tra phạm vi đầu vào còn giúp chứng minh phép nhân sẽ không vượt giới hạn của kiểu dữ liệu.

Đây là cách thiết kế an toàn hơn việc chỉ chọn một kiểu dữ liệu lớn rồi mặc định mọi phép tính đều hợp lệ.

---

## 16. Những lỗi thường gặp

### 16.1. Sử dụng biến chưa khởi tạo

Không nên:

```cpp
int count;

std::cout << count;
```

Nên viết:

```cpp
int count{};
```

Hoặc khởi tạo bằng giá trị thực tế trước khi sử dụng.

### 16.2. Chọn kiểu dữ liệu không phù hợp

Ví dụ:

```cpp
int population{10'000'000'000};
```

Trên những implementation thông dụng, giá trị này không thể biểu diễn bằng `int`.

Với cú pháp khởi tạo bằng `{}`, compiler phải chẩn đoán phép chuyển đổi thu hẹp không hợp lệ.

Cách xử lý:

```cpp
long long population{10'000'000'000LL};
```

### 16.3. Nhầm phép chia nguyên

```cpp
double result = 7 / 2;
```

Kết quả là `3.0`.

Muốn có phần thập phân:

```cpp
double result = 7.0 / 2;
```

### 16.4. Lạm dụng unsigned

Ví dụ:

```cpp
unsigned int count{0};

count -= 1;
```

Kết quả không phải `-1`.

Unsigned sử dụng số học modulo, vì vậy giá trị sẽ quay về giới hạn lớn của kiểu.

Cần lựa chọn kiểu phù hợp với ý nghĩa dữ liệu thay vì mặc định unsigned luôn tốt hơn.

### 16.5. Sử dụng biến ngoài phạm vi

```cpp
if (true) {
    int value{10};
}

std::cout << value;
```

Tên `value` không nằm trong phạm vi sau khi khối `if` kết thúc.

### 16.6. Không hiểu lifetime

Không trả về tham chiếu hoặc con trỏ đến biến cục bộ đã hết vòng đời.

Ví dụ sai:

```cpp
const int& getValue() {
    int value{10};

    return value;
}
```

Nên trả về giá trị:

```cpp
int getValue() {
    return 10;
}
```

### 16.7. Nhầm lỗi linker với lỗi compiler

Nếu compiler báo không tìm thấy định nghĩa của hàm trong giai đoạn linking, việc thay đổi kiểu dữ liệu hoặc sửa cú pháp trong file gọi hàm không nhất thiết giải quyết được vấn đề.

Cần kiểm tra:

- Source file chứa định nghĩa đã được đưa vào lệnh build chưa.
- Khai báo và định nghĩa có khớp nhau không.
- Namespace có chính xác không.
- Có thiếu thư viện khi linking không.
- Có vi phạm ODR không.

---

## 17. Bài tập tự luyện

### Bài 1. Thông tin học sinh

**Yêu cầu:** Khai báo các biến lưu:

- Họ và tên.
- Tuổi.
- Điểm trung bình.
- Trạng thái đang học.

In toàn bộ thông tin ra màn hình.

**Gợi ý:** Sử dụng `std::string`, `int`, `double` và `bool`.

### Bài 2. Tính diện tích hình chữ nhật

**Yêu cầu:** Nhập chiều dài và chiều rộng, tính diện tích.

Công thức:

\[
S = a \times b
\]

Ví dụ:

```text
Input:
5 3

Output:
15
```

**Gợi ý:** Sử dụng `double` nếu kích thước có thể chứa phần thập phân. Kiểm tra hai kích thước phải dương và hữu hạn.

### Bài 3. Tính tuổi sau n năm

**Yêu cầu:** Nhập tuổi hiện tại và số năm cần cộng thêm.

Ví dụ:

```text
Input:
16 5

Output:
21
```

**Gợi ý:** Kiểm tra giá trị âm và cân nhắc tràn số khi tính tổng.

### Bài 4. Tính tổng tiền

**Yêu cầu:** Nhập số lượng và đơn giá của một sản phẩm. Tính tổng tiền.

Ví dụ:

```text
Input:
10 250000

Output:
2500000
```

**Gợi ý:** Chọn kiểu dữ liệu dựa trên giá trị lớn nhất có thể xảy ra.

### Bài 5. Kiểm tra giới hạn kiểu dữ liệu

**Yêu cầu:** Viết chương trình in:

- Kích thước `int`.
- Kích thước `long long`.
- Giá trị lớn nhất của `int`.
- Giá trị lớn nhất của `long long`.

**Gợi ý:** Sử dụng `sizeof` và `std::numeric_limits`.

### Bài 6. Tổ chức chương trình nhiều file

**Yêu cầu:** Tạo dự án gồm:

```text
Project/
├── main.cpp
├── Calculator.cpp
└── Calculator.h
```

Trong đó:

- `Calculator.h` khai báo hàm `add`.
- `Calculator.cpp` định nghĩa hàm `add`.
- `main.cpp` đọc hai số và gọi hàm.

Biên dịch đồng thời hai file `.cpp` bằng GCC hoặc MSVC.

**Mục tiêu:** Phân biệt declaration, definition, translation unit và linking.

---

## 18. Tổng kết kiến thức

| Khái niệm | Ý nghĩa |
|---|---|
| Variable | Tên biến trong chương trình |
| Data type | Kiểu dữ liệu và các thao tác hợp lệ |
| Declaration | Khai báo một tên và kiểu |
| Definition | Định nghĩa thực thể theo quy tắc của ngôn ngữ |
| Initialization | Cung cấp giá trị ban đầu |
| Assignment | Gán giá trị sau khi đối tượng tồn tại |
| `const` | Không cho phép thay đổi qua đối tượng const |
| `constexpr` | Khai báo thực thể dùng trong ngữ cảnh biểu thức hằng phù hợp |
| `auto` | Suy luận kiểu dữ liệu |
| `sizeof` | Xác định kích thước lưu trữ |
| `static_cast` | Chuyển đổi kiểu tường minh |
| Scope | Phạm vi có thể sử dụng tên |
| Lifetime | Khoảng thời gian tồn tại của đối tượng |
| Header | Tệp thường chứa khai báo dùng chung |
| Translation unit | Đơn vị mã nguồn sau tiền xử lý |
| Compiler | Xử lý và biên dịch mã nguồn |
| Linker | Liên kết object file và thư viện |
| Executable | Sản phẩm có thể thực thi |

Sau bài học này, bạn cần nắm được bốn nguyên tắc:

1. **Khởi tạo trước khi sử dụng:** Không đọc giá trị bất định của biến.
2. **Chọn kiểu theo miền giá trị:** Cần xét cả giá trị đầu vào và kết quả trung gian của phép tính.
3. **Giữ phạm vi dữ liệu hợp lý:** Hạn chế trạng thái chia sẻ không cần thiết, tránh phụ thuộc vào đối tượng đã hết vòng đời.
4. **Hiểu quy trình build:** Biết phân biệt lỗi compile, link và runtime để chẩn đoán đúng nguyên nhân.

Một chương trình C++ tốt không chỉ cần biên dịch thành công. Dữ liệu phải có ý nghĩa rõ ràng, kiểu dữ liệu phù hợp và hành vi được xác định trong những trường hợp mà chương trình cam kết hỗ trợ.

## Đọc tiếp

- [Chương trình C++ đầu tiên](/cpp/bat-dau/chuong-trinh-dau-tien): Tìm hiểu cấu trúc chương trình và cách sử dụng compiler.
- [Toán tử và biểu thức](/cpp/bat-dau/toan-tu): Thực hiện các phép toán, so sánh và xử lý biểu thức.
- [Header, source và modules](/cpp/ky-thuat/header-source-modules): Tìm hiểu sâu hơn về tổ chức mã nguồn, translation unit, ODR và build.
- [Kiểu dữ liệu và giới hạn](/cpp/tra-cuu/kieu-du-lieu): Tra cứu phạm vi, kích thước và các tính chất của kiểu dữ liệu trong C++17.
