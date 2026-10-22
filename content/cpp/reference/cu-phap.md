---
title: C++17 Syntax Cheatsheet
description: Bảng tra cứu nhanh cú pháp C++17, từ biến, toán tử, điều kiện, vòng lặp, hàm, class đến STL, quản lý bộ nhớ và lệnh biên dịch.
slug: /cpp/tra-cuu/cu-phap
category: reference
categoryLabel: Tra cứu và xử lý lỗi
order: 25000
difficulty: beginner
keywords: [C++ syntax, C++17, cheatsheet, declaration, control flow, functions, classes, STL, compiler, g++, clang++, MSVC]
updated: 2026-10-22
collection: cpp
collectionLabel: C++
collectionDescription: Bảng tra cú pháp, container, thuật toán, lỗi thường gặp và best practices C++.
related: ["/cpp/bat-dau/chuong-trinh-dau-tien", "/cpp/tra-cuu/kieu-du-lieu", "/cpp/tra-cuu/stl-containers"]
---

# C++17 Syntax Cheatsheet

Trang này tổng hợp các cú pháp C++17 thường dùng trong học tập, giải thuật và phát triển phần mềm.

Mục tiêu là giúp bạn **tra nhanh cú pháp khi đang lập trình**, không cần tìm lại toàn bộ bài hướng dẫn.

Nội dung bao gồm:

- Cấu trúc chương trình và khai báo dữ liệu.
- Toán tử, điều kiện và vòng lặp.
- Hàm, tham chiếu, con trỏ và lambda.
- `struct`, `class`, `enum` và namespace.
- Các container và thuật toán STL.
- Nhập xuất, xử lý chuỗi và ngoại lệ.
- Lệnh biên dịch và các lỗi thường gặp.

**Phiên bản áp dụng:** C++17 (`-std=c++17`).

Các đoạn mã ngắn trong bài là ví dụ cú pháp, thường cần đặt trong hàm và bổ sung header tương ứng. Những đoạn được ghi là chương trình hoàn chỉnh có thể biên dịch độc lập.

---

## 1. Cấu trúc chương trình C++

Một chương trình C++ cơ bản:

```cpp
#include <iostream>

int main() {
    std::cout << "Hello, World!\n";
    return 0;
}
```

| Thành phần | Chức năng |
|---|---|
| `#include` | Khai báo sử dụng header |
| `int main()` | Điểm bắt đầu thực thi chương trình |
| `{}` | Định nghĩa một khối lệnh |
| `;` | Kết thúc đa số câu lệnh |
| `std::cout` | Xuất dữ liệu |
| `return 0` | Kết thúc chương trình thành công |

Trong C++17, có thể bỏ qua `return 0;` ở cuối hàm `main`. Chương trình vẫn mặc định trả về `0` nếu luồng thực thi đi đến cuối hàm.

### Header thường dùng

| Header | Công dụng |
|---|---|
| `<iostream>` | Nhập xuất chuẩn |
| `<cstddef>` | `std::size_t` và các kiểu/tiện ích liên quan |
| `<string>` | Chuỗi `std::string` |
| `<vector>` | Mảng động |
| `<array>` | Mảng cố định |
| `<algorithm>` | Sắp xếp, tìm kiếm, đếm |
| `<functional>` | `std::greater`, `std::less` và các tiện ích hàm |
| `<numeric>` | Các thuật toán tính toán |
| `<cmath>` | Hàm toán học |
| `<limits>` | Giới hạn kiểu dữ liệu |
| `<map>` | Map có thứ tự |
| `<unordered_map>` | Hash map |
| `<set>` | Tập hợp có thứ tự |
| `<memory>` | Smart pointer |
| `<optional>` | Giá trị có thể không tồn tại |
| `<stdexcept>` | Các loại ngoại lệ |
| `<new>` | `std::bad_alloc` và các tiện ích cấp phát |
| `<utility>` | `std::pair`, `std::move` |
| `<fstream>` | Đọc ghi tệp |

**Quy tắc:** Include trực tiếp header định nghĩa thành phần bạn sử dụng, thay vì phụ thuộc vào header khác vô tình include hộ.

---

## 2. Khai báo biến và kiểu dữ liệu

### 2.1. Khai báo biến

```cpp
int age{16};
double height{1.75};
char grade{'A'};
bool active{true};
std::string name{"Nam"};
```

### 2.2. Các kiểu dữ liệu thông dụng

| Kiểu | Mục đích | Ví dụ |
|---|---|---|
| `int` | Số nguyên | `100` |
| `long long` | Số nguyên phạm vi rộng | `10000000000LL` |
| `float` | Số thực | `3.14f` |
| `double` | Số thực độ chính xác cao hơn | `3.14159` |
| `char` | Ký tự | `'A'` |
| `bool` | Giá trị logic | `true` |
| `std::string` | Chuỗi ký tự | `"Hello"` |
| `std::size_t` | Kích thước và chỉ số | `0` |

Kích thước và phạm vi thực tế của một số kiểu phụ thuộc vào nền tảng và cách triển khai compiler.

### 2.3. const và constexpr

```cpp
const int limit{100};

constexpr double pi{3.141592653589793};
```

- `const`: Không cho phép thay đổi giá trị thông qua biến sau khi khởi tạo.
- `constexpr`: Có thể sử dụng giá trị trong các ngữ cảnh yêu cầu biểu thức hằng tại thời điểm biên dịch, khi đáp ứng các quy tắc của ngôn ngữ.

### 2.4. Tự suy luận kiểu với auto

```cpp
auto count = 10;
auto price = 19.99;
auto valid = true;
```

Compiler suy luận kiểu từ biểu thức khởi tạo.

`auto` không có nghĩa biến mang kiểu dữ liệu động. Sau khi kiểu được suy luận, biến vẫn có kiểu xác định.

### 2.5. Chuyển đổi kiểu dữ liệu

```cpp
double value{7.8};

int number = static_cast<int>(value);
```

Kết quả `number` là `7`, vì phần thập phân bị loại bỏ khi chuyển từ số thực hữu hạn sang kiểu nguyên, với điều kiện giá trị nằm trong phạm vi biểu diễn.

Nên sử dụng `static_cast` khi cần chuyển kiểu tường minh thông thường.

---

## 3. Toán tử và biểu thức

### 3.1. Toán tử số học

| Toán tử | Ý nghĩa |
|---|---|
| `+` | Cộng |
| `-` | Trừ |
| `*` | Nhân |
| `/` | Chia |
| `%` | Chia lấy dư |

```cpp
int a{17};
int b{5};

int sum = a + b;
int difference = a - b;
int product = a * b;
int quotient = a / b;
int remainder = a % b;
```

Kết quả tương ứng:

```text
22
12
85
3
2
```

Khi cả hai toán hạng là số nguyên, phép chia `/` thực hiện chia nguyên.

Muốn tính thương dạng số thực:

```cpp
double result = static_cast<double>(a) / b;
```

### 3.2. Toán tử so sánh

```cpp
a == b
a != b
a > b
a < b
a >= b
a <= b
```

Các biểu thức trên trả về giá trị `bool`.

### 3.3. Toán tử logic

```cpp
a && b
a || b
!a
```

| Toán tử | Ý nghĩa |
|---|---|
| `&&` | AND |
| `\|\|` | OR |
| `!` | NOT |

Ví dụ kiểm tra phạm vi:

```cpp
bool valid = (age >= 18) && (age <= 60);
```

`&&` và `||` thực hiện đánh giá ngắn mạch (*short-circuit*).

### 3.4. Toán tử gán

```cpp
value = 10;
value += 5;
value -= 2;
value *= 3;
value /= 2;
value %= 4;
```

### 3.5. Tăng và giảm

```cpp
++i;
i++;
--i;
i--;
```

| Biểu thức | Ý nghĩa |
|---|---|
| `++i` | Tăng trước, lấy giá trị mới |
| `i++` | Lấy giá trị cũ, sau đó tăng |
| `--i` | Giảm trước, lấy giá trị mới |
| `i--` | Lấy giá trị cũ, sau đó giảm |

### 3.6. Toán tử ba ngôi

```cpp
int maximum = (a > b) ? a : b;
```

Cú pháp:

```text
condition ? valueIfTrue : valueIfFalse
```

### 3.7. Ưu tiên toán tử

Một số nhóm ưu tiên thường gặp, từ cao đến thấp:

1. Phép nhân, chia và chia lấy dư.
2. Phép cộng và trừ.
3. So sánh quan hệ: `<`, `<=`, `>`, `>=`.
4. So sánh bằng và khác: `==`, `!=`.
5. Logic AND: `&&`.
6. Logic OR: `||`.
7. Gán: `=`, `+=`, `-=` và các dạng khác.

Đây là danh sách rút gọn, không phải bảng ưu tiên đầy đủ. Toán tử một ngôi, bitwise, điều kiện và các toán tử khác có mức ưu tiên riêng.

**Nên dùng dấu ngoặc để thể hiện ý định:**

```cpp
bool allowed = (age >= 18) && (isAdmin || hasTicket);
```

Thứ tự ưu tiên quyết định cách nhóm biểu thức, không đảm bảo thứ tự thực hiện mọi toán hạng.

---

## 4. Câu lệnh điều kiện

### 4.1. if

```cpp
if (score >= 5) {
    std::cout << "Dat\n";
}
```

### 4.2. if-else

```cpp
if (score >= 5) {
    std::cout << "Dat\n";
} else {
    std::cout << "Chua dat\n";
}
```

### 4.3. if-else if-else

```cpp
if (score >= 8) {
    std::cout << "Gioi\n";
} else if (score >= 6.5) {
    std::cout << "Kha\n";
} else if (score >= 5) {
    std::cout << "Trung binh\n";
} else {
    std::cout << "Chua dat\n";
}
```

Giả định `score` đã được kiểm tra và nằm trong phạm vi điểm hợp lệ.

### 4.4. switch-case

```cpp
switch (choice) {
    case 1:
        std::cout << "Start\n";
        break;

    case 2:
        std::cout << "Settings\n";
        break;

    case 3:
        std::cout << "Exit\n";
        break;

    default:
        std::cout << "Invalid choice\n";
        break;
}
```

`switch` hỗ trợ các biểu thức kiểu nguyên, enum và những kiểu có thể chuyển đổi phù hợp thành kiểu nguyên hoặc enum theo quy tắc C++.

Mỗi nhánh `case` thường sử dụng `break` để tránh tiếp tục chạy sang nhánh kế tiếp.

### 4.5. if với initializer (C++17)

```cpp
if (int result = calculate(); result > 0) {
    std::cout << result << '\n';
}
```

Biến được khai báo trong initializer có phạm vi giới hạn trong cấu trúc `if`, bao gồm các nhánh liên quan.

Đây là cú pháp C++17, đặc biệt hữu ích khi làm việc với iterator, kết quả tìm kiếm và các đối tượng tạm.

---

## 5. Vòng lặp

### 5.1. for

```cpp
for (int i = 0; i < 5; ++i) {
    std::cout << i << '\n';
}
```

Kết quả:

```text
0
1
2
3
4
```

Cú pháp:

```text
for (initialization; condition; update)
```

### 5.2. while

```cpp
int count{5};

while (count > 0) {
    std::cout << count << '\n';
    --count;
}
```

Kiểm tra điều kiện trước mỗi lần lặp.

### 5.3. do-while

```cpp
int number{};

do {
    std::cin >> number;
} while (std::cin && number != 0);
```

Thân vòng lặp chạy ít nhất một lần. Ví dụ trên cũng dừng nếu quá trình đọc thất bại.

### 5.4. Range-based for

```cpp
std::vector<int> numbers{10, 20, 30};

for (int number : numbers) {
    std::cout << number << '\n';
}
```

Để tránh sao chép những phần tử lớn:

```cpp
for (const auto& item : items) {
    process(item);
}
```

Để thay đổi phần tử trực tiếp:

```cpp
for (auto& item : items) {
    update(item);
}
```

### 5.5. break và continue

```cpp
for (int i = 1; i <= 10; ++i) {
    if (i == 8) {
        break;
    }

    if (i % 2 == 0) {
        continue;
    }

    std::cout << i << ' ';
}
```

Kết quả:

```text
1 3 5 7
```

- `break`: Kết thúc vòng lặp hoặc `switch` gần nhất. Nếu `switch` nằm trong vòng lặp, `break` chỉ thoát khỏi `switch`.
- `continue`: Bỏ phần còn lại của lần lặp hiện tại và chuyển tới bước tiếp tục của vòng lặp gần nhất. Trong vòng `for` thông thường, biểu thức cập nhật vẫn chạy rồi điều kiện được kiểm tra lại; `while` quay lại kiểm tra điều kiện; `do-while` đi tới bước kiểm tra điều kiện sau thân vòng lặp.

Trong các vòng lặp lồng nhau, `break` và `continue` tác động tới vòng lặp gần nhất. `continue` bên trong `switch` lồng trong vòng lặp vẫn tác động tới vòng lặp đó. Nếu lệnh cập nhật đặt sau `continue` trong thân `while` hoặc `do-while`, lệnh ấy bị bỏ qua và điều kiện có thể tiếp tục đúng, gây lặp vô hạn. `return` thoát khỏi hàm hiện tại.

---

## 6. Hàm (Functions)

### 6.1. Khai báo và định nghĩa hàm

```cpp
int add(int a, int b) {
    return a + b;
}
```

Sử dụng:

```cpp
int result = add(5, 3);
```

Kết quả `result` bằng `8`.

### 6.2. Hàm không trả về giá trị

```cpp
void printMessage() {
    std::cout << "Hello\n";
}
```

### 6.3. Function declaration

Có thể khai báo hàm trước và định nghĩa sau:

```cpp
int add(int a, int b);

int main() {
    return add(2, 3);
}

int add(int a, int b) {
    return a + b;
}
```

### 6.4. Tham số mặc định

```cpp
int multiply(int a, int b = 2) {
    return a * b;
}
```

Sử dụng:

```cpp
multiply(5);
multiply(5, 3);
```

Kết quả tương ứng là `10` và `15`.

### 6.5. Truyền tham số

**Truyền bằng giá trị (pass by value):**

```cpp
void update(int value) {
    value = 100;
}
```

Thay đổi `value` không làm thay đổi biến gốc của người gọi.

**Truyền bằng tham chiếu (pass by reference):**

```cpp
void update(int& value) {
    value = 100;
}
```

Có thể thay đổi trực tiếp đối tượng được truyền vào.

**Truyền bằng tham chiếu const:**

```cpp
void print(const std::string& text) {
    std::cout << text << '\n';
}
```

Không sao chép chuỗi và không cho phép hàm thay đổi đối tượng thông qua tham chiếu này.

### 6.6. Function overloading

```cpp
int add(int a, int b) {
    return a + b;
}

double add(double a, double b) {
    return a + b;
}
```

C++ cho phép nhiều hàm cùng tên nếu danh sách tham số phù hợp để phân biệt.

Không thể overload hàm chỉ bằng cách thay đổi kiểu trả về.

---

## 7. Tham chiếu và con trỏ

### 7.1. Reference

```cpp
int value{10};

int& ref = value;

ref = 20;
```

Sau khi thực hiện, `value` bằng `20`.

Một tham chiếu thông thường phải được khởi tạo khi khai báo.

### 7.2. Pointer

```cpp
int value{10};

int* ptr = &value;
```

| Ký hiệu | Ý nghĩa |
|---|---|
| `&value` | Lấy địa chỉ của biến |
| `int* ptr` | Khai báo con trỏ đến int |
| `*ptr` | Truy cập đối tượng được trỏ đến |
| `nullptr` | Giá trị con trỏ null |

Ví dụ:

```cpp
int value{10};
int* ptr = &value;

*ptr = 20;
```

Sau đó `value` bằng `20`.

### 7.3. Nullable pointer

```cpp
int* ptr{nullptr};

if (ptr != nullptr) {
    std::cout << *ptr << '\n';
}
```

Không được giải tham chiếu một con trỏ null.

### 7.4. Smart pointer

C++17 hỗ trợ quản lý tài nguyên thông qua RAII và smart pointer.

```cpp
#include <memory>

auto value = std::make_unique<int>(42);
```

Các loại thường dùng:

| Loại | Ý nghĩa |
|---|---|
| `std::unique_ptr<T>` | Quyền sở hữu độc quyền |
| `std::shared_ptr<T>` | Quyền sở hữu chia sẻ |
| `std::weak_ptr<T>` | Quan sát đối tượng do shared_ptr quản lý mà không tăng quyền sở hữu |

Ưu tiên `std::unique_ptr` khi thực sự cần sở hữu động. Với những đối tượng không cần cấp phát động hoặc quản lý vòng đời riêng, sử dụng biến thông thường sẽ đơn giản hơn.

---

## 8. struct, class và enum

### 8.1. struct

```cpp
struct Player {
    std::string name;
    int score{0};
};
```

Tạo đối tượng:

```cpp
Player player{"Nam", 100};

std::cout << player.name << '\n';
std::cout << player.score << '\n';
```

Mặc định, các thành viên của `struct` có quyền truy cập `public`.

### 8.2. class

```cpp
class Counter {
public:
    void increment() {
        ++count;
    }

    int get() const {
        return count;
    }

private:
    int count{0};
};
```

Sử dụng:

```cpp
Counter counter;

counter.increment();

std::cout << counter.get() << '\n';
```

Các thành viên của `class` mặc định có quyền truy cập `private`.

| Access specifier | Ý nghĩa |
|---|---|
| `public` | Có thể truy cập theo giao diện công khai |
| `private` | Chỉ truy cập từ các thành viên và friend được phép |
| `protected` | Truy cập từ thành viên, friend được phép và một số ngữ cảnh lớp dẫn xuất |

Hàm thành viên đánh dấu `const`:

```cpp
int get() const;
```

không được phép thay đổi trạng thái không `mutable` của đối tượng thông qua `this` trong cách sử dụng thông thường.

### 8.3. Constructor

```cpp
class User {
public:
    explicit User(int id) : id{id} {}

    int getId() const {
        return id;
    }

private:
    int id{};
};
```

Sử dụng:

```cpp
User user{123};
```

`explicit` hạn chế các phép chuyển đổi ngầm không mong muốn thông qua constructor.

### 8.4. enum class

```cpp
enum class Status {
    Idle,
    Running,
    Stopped
};
```

Sử dụng:

```cpp
Status status{Status::Running};

if (status == Status::Running) {
    std::cout << "Running\n";
}
```

Ưu tiên `enum class` khi muốn tránh xung đột tên và các chuyển đổi ngầm không cần thiết.

### 8.5. Namespace

```cpp
namespace App {
    constexpr int version{1};

    void start() {
        std::cout << "Starting\n";
    }
}
```

Truy cập:

```cpp
App::start();

std::cout << App::version << '\n';
```

Namespace giúp tổ chức mã và tránh xung đột tên giữa những thành phần khác nhau.

---

## 9. Lambda expression

Lambda cho phép tạo một đối tượng hàm trực tiếp tại vị trí sử dụng.

Cú pháp tổng quát:

```text
[capture](parameters) -> return_type { body }
```

Ví dụ:

```cpp
auto square = [](int x) {
    return x * x;
};

int result = square(5);
```

Kết quả `25`.

### 9.1. Capture

```cpp
int multiplier{3};

auto calculate = [multiplier](int x) {
    return x * multiplier;
};
```

Các capture phổ biến:

| Capture | Ý nghĩa |
|---|---|
| `[]` | Không capture biến bên ngoài |
| `[x]` | Capture x bằng giá trị |
| `[&x]` | Capture x bằng tham chiếu |
| `[=]` | Mặc định capture các biến được dùng bằng giá trị |
| `[&]` | Mặc định capture các biến được dùng bằng tham chiếu |

Cẩn thận khi lambda capture bằng tham chiếu nhưng tồn tại lâu hơn đối tượng được tham chiếu.

### 9.2. Lambda với std::sort

```cpp
std::vector<int> numbers{5, 2, 9, 1};

std::sort(
    numbers.begin(),
    numbers.end(),
    [](int a, int b) {
        return a > b;
    }
);
```

Kết quả:

```text
9 5 2 1
```

---

## 10. Container trong STL

Standard Template Library cung cấp những cấu trúc dữ liệu và thuật toán thường dùng.

### 10.1. std::array

Header: `<array>`

```cpp
std::array<int, 3> numbers{10, 20, 30};
```

Truy cập:

```cpp
numbers[0];
numbers.at(1);
numbers.size();
```

`std::array` có kích thước cố định.

### 10.2. std::vector

Header: `<vector>`

```cpp
std::vector<int> numbers{1, 2, 3};
```

Thao tác:

```cpp
numbers.push_back(4);
numbers.pop_back();

numbers.size();
numbers.empty();

numbers.front();
numbers.back();

numbers.clear();
```

Truy cập phần tử:

```cpp
numbers[0];
numbers.at(0);
```

Khác biệt:

- `operator[]`: Không kiểm tra chỉ số ở thời điểm chạy.
- `.at()`: Kiểm tra phạm vi và ném `std::out_of_range` khi chỉ số không hợp lệ.

Không gọi `.front()`, `.back()` hoặc `.pop_back()` khi vector rỗng.

### 10.3. std::map

Header: `<map>`

```cpp
std::map<std::string, int> scores;

scores["Alice"] = 10;
scores["Bob"] = 20;
```

Tìm kiếm:

```cpp
auto it = scores.find("Alice");

if (it != scores.end()) {
    std::cout << it->second << '\n';
}
```

Trong C++17, `std::map` chưa hỗ trợ hàm thành viên `.contains()`.

### 10.4. std::unordered_map

Header: `<unordered_map>`

```cpp
std::unordered_map<std::string, int> scores;
```

Thường cung cấp hiệu năng tìm kiếm trung bình gần `O(1)` nhờ hash table.

Khác với `std::map`, container này không duy trì thứ tự sắp xếp theo khóa.

### 10.5. std::set

Header: `<set>`

```cpp
std::set<int> values{3, 1, 2, 2};
```

Các phần tử trùng lặp bị loại bỏ.

Khi duyệt theo thứ tự mặc định:

```text
1 2 3
```

### 10.6. std::pair

Header: `<utility>`

```cpp
std::pair<int, std::string> item{1, "Book"};
```

Truy cập:

```cpp
item.first;
item.second;
```

### 10.7. std::optional (C++17)

Header: `<optional>`

```cpp
std::optional<int> result{42};

if (result.has_value()) {
    std::cout << *result << '\n';
}
```

Giá trị rỗng:

```cpp
std::optional<int> result = std::nullopt;
```

`std::optional` phù hợp khi một phép tính có thể không trả về giá trị hợp lệ mà không cần sử dụng một giá trị đặc biệt để biểu thị trạng thái không tồn tại.

---

## 11. Thuật toán STL

Header thường dùng: `<algorithm>` và `<numeric>`.

Giả sử:

```cpp
std::vector<int> values{5, 1, 4, 2, 3};
```

### 11.1. Sắp xếp

Tăng dần:

```cpp
std::sort(values.begin(), values.end());
```

Giảm dần:

```cpp
std::sort(
    values.begin(),
    values.end(),
    std::greater<int>{}
);
```

Sử dụng comparator `std::greater<int>` cần include `<functional>`.

### 11.2. Tìm kiếm

```cpp
auto it = std::find(
    values.begin(),
    values.end(),
    4
);

if (it != values.end()) {
    std::cout << "Found\n";
}
```

### 11.3. Đếm

```cpp
auto count = std::count(
    values.begin(),
    values.end(),
    2
);
```

### 11.4. Tính tổng

```cpp
long long sum = std::accumulate(
    values.begin(),
    values.end(),
    0LL
);
```

Giá trị khởi tạo `0LL` giúp phép cộng sử dụng kiểu `long long` trong ví dụ này.

### 11.5. Giá trị nhỏ nhất và lớn nhất

```cpp
auto minIt = std::min_element(
    values.begin(),
    values.end()
);

auto maxIt = std::max_element(
    values.begin(),
    values.end()
);
```

Hai hàm trả về iterator. Cần kiểm tra iterator khác `.end()` trước khi giải tham chiếu.

### 11.6. Kiểm tra điều kiện

```cpp
bool allPositive = std::all_of(
    values.begin(),
    values.end(),
    [](int x) {
        return x > 0;
    }
);
```

Các thuật toán liên quan:

| Hàm | Công dụng |
|---|---|
| `std::all_of` | Tất cả phần tử thỏa điều kiện |
| `std::any_of` | Ít nhất một phần tử thỏa điều kiện |
| `std::none_of` | Không phần tử nào thỏa điều kiện |
| `std::count_if` | Đếm phần tử thỏa điều kiện |
| `std::find_if` | Tìm phần tử đầu tiên thỏa điều kiện |
| `std::reverse` | Đảo ngược thứ tự |
| `std::sort` | Sắp xếp |
| `std::unique` | Gom các phần tử bằng nhau liên tiếp |

Lưu ý `std::unique` không tự làm giảm kích thước container. Với `std::vector`, thường cần kết hợp `.erase()` để loại bỏ phần tử ở cuối sau khi gom trùng.

---

## 12. Nhập xuất dữ liệu

### 12.1. cin và cout

```cpp
int a{};
int b{};

std::cin >> a >> b;

std::cout << a + b << '\n';
```

Kiểm tra lỗi:

```cpp
if (!(std::cin >> a >> b)) {
    std::cerr << "Invalid input\n";
    return 1;
}
```

### 12.2. getline

```cpp
std::string name;

std::getline(std::cin, name);
```

Đọc toàn bộ dòng, bao gồm khoảng trắng.

### 12.3. Kết hợp cin và getline

Sau khi sử dụng `>>`, có thể cần loại bỏ phần còn lại của dòng:

```cpp
#include <limits>

std::cin.ignore(
    std::numeric_limits<std::streamsize>::max(),
    '\n'
);
```

Sau đó mới gọi `std::getline()`.

### 12.4. Định dạng số thực

Header: `<iomanip>`

```cpp
double pi{3.141592653589793};

std::cout << std::fixed
          << std::setprecision(2)
          << pi << '\n';
```

Kết quả:

```text
3.14
```

### 12.5. Nhập xuất nhanh

```cpp
std::ios::sync_with_stdio(false);
std::cin.tie(nullptr);
```

Gọi các lệnh này trước khi thực hiện bất kỳ thao tác nhập xuất nào. Cách thiết lập này thường được dùng trong chương trình xử lý lượng input lớn.

Nếu tắt đồng bộ giữa C++ streams và C stdio, cần tránh trộn nhập xuất C và C++ một cách tùy tiện.

Ngoài ra, `'\n'` chỉ xuống dòng, còn `std::endl` vừa xuống dòng vừa flush luồng xuất.

---

## 13. Xử lý chuỗi

Header: `<string>`.

### 13.1. Khai báo

```cpp
std::string text{"Hello"};
```

### 13.2. Các thao tác thường dùng

```cpp
text.size();
text.empty();

text += " World";

text.substr(0, 5);

text.find("World");

text.clear();
```

### 13.3. Tìm chuỗi con

```cpp
std::string text{"Hello World"};

if (text.find("World") != std::string::npos) {
    std::cout << "Found\n";
}
```

### 13.4. Chuyển đổi chuỗi và số

```cpp
int value = std::stoi("123");

std::string text = std::to_string(123);
```

`std::stoi` có thể ném ngoại lệ khi không chuyển đổi được hoặc giá trị nằm ngoài phạm vi biểu diễn.

Mặc định, `std::stoi` cũng có thể chấp nhận một phần đầu chuỗi hợp lệ. Nếu cần xác thực toàn bộ chuỗi, hãy kiểm tra vị trí kết thúc chuyển đổi.

---

## 14. Exception handling

C++ cung cấp cơ chế ngoại lệ để thông báo và xử lý một số tình huống lỗi.

### 14.1. try-catch

```cpp
#include <iostream>
#include <stdexcept>

int main() {
    try {
        throw std::runtime_error("Operation failed");
    } catch (const std::exception& error) {
        std::cerr << error.what() << '\n';
        return 1;
    }
}
```

### 14.2. Các exception thường gặp

| Exception | Ý nghĩa |
|---|---|
| `std::runtime_error` | Lỗi khi thực thi |
| `std::invalid_argument` | Đối số không hợp lệ |
| `std::out_of_range` | Giá trị hoặc chỉ số ngoài phạm vi |
| `std::length_error` | Yêu cầu kích thước không hợp lệ |
| `std::bad_alloc` | Cấp phát bộ nhớ thất bại |

Không phải mọi lỗi trong C++ đều sinh ra exception.

Ví dụ, giải tham chiếu con trỏ không hợp lệ hoặc truy cập mảng vượt phạm vi bằng `operator[]` có thể gây hành vi không xác định thay vì ném ngoại lệ.

---

## 15. Lệnh biên dịch C++17

### 15.1. GCC (g++)

Biên dịch:

```sh
g++ -std=c++17 -Wall -Wextra -Wpedantic main.cpp -o app
```

Chạy trên Linux/macOS:

```sh
./app
```

Trên Windows PowerShell, với tệp đầu ra `app.exe`:

```powershell
.\app.exe
```

### 15.2. Clang

```sh
clang++ -std=c++17 -Wall -Wextra -Wpedantic main.cpp -o app
```

### 15.3. MSVC (Visual C++)

Trong Developer Command Prompt của Visual Studio:

```bat
cl /std:c++17 /EHsc /W4 main.cpp /Fe:app.exe
```

Chạy:

```bat
app.exe
```

### 15.4. Các compiler flags thông dụng

| Flag | GCC/Clang | Chức năng |
|---|---|---|
| C++17 | `-std=c++17` | Chọn phiên bản chuẩn |
| Warning | `-Wall` | Bật nhiều cảnh báo |
| Extra warning | `-Wextra` | Bổ sung cảnh báo |
| Pedantic | `-Wpedantic` | Cảnh báo một số phần mở rộng ngoài chuẩn |
| Debug symbol | `-g` | Thêm thông tin debug |
| Optimization | `-O2` | Bật tối ưu hóa |
| AddressSanitizer | `-fsanitize=address` | Phát hiện nhiều lỗi bộ nhớ |
| UBSan | `-fsanitize=undefined` | Phát hiện nhiều hành vi không xác định |

Tùy compiler và nền tảng, mức độ hỗ trợ sanitizer có thể khác nhau.

### 15.5. Build để debug

GCC/Clang:

```sh
g++ -std=c++17 -Wall -Wextra -Wpedantic -g -O0 main.cpp -o app
```

Với sanitizer trên môi trường hỗ trợ:

```sh
g++ -std=c++17 -g -O1 -fsanitize=address,undefined -fno-omit-frame-pointer main.cpp -o app
```

Không nên mặc định rằng một chương trình chạy thành công nghĩa là không có lỗi bộ nhớ hoặc hành vi không xác định.

---

## 16. Lỗi thường gặp và cách xử lý

| Lỗi | Nguyên nhân phổ biến | Hướng xử lý |
|---|---|---|
| `expected ';'` | Thiếu dấu chấm phẩy | Kiểm tra statement và khai báo |
| `not declared in this scope` | Tên chưa được khai báo hoặc sai phạm vi | Kiểm tra tên, namespace và scope |
| `no matching function` | Không có overload phù hợp | Kiểm tra tham số và kiểu dữ liệu |
| `undefined reference` | Thiếu định nghĩa khi liên kết | Kiểm tra file nguồn và linker |
| `unresolved external symbol` | Linker không tìm thấy symbol | Kiểm tra thư viện và định nghĩa |
| `out_of_range` | Truy cập ngoài phạm vi được kiểm tra | Kiểm tra chỉ số và kích thước |
| `bad_alloc` | Cấp phát thất bại | Kiểm tra nhu cầu bộ nhớ |
| `segmentation fault` | Truy cập bộ nhớ không hợp lệ trong một số môi trường | Kiểm tra pointer, lifetime, phạm vi |
| `multiple definition` | Có nhiều định nghĩa không hợp lệ | Kiểm tra source, header và ODR |

### 16.1. Các lỗi logic cần chú ý

**Nhầm gán với so sánh:** Khi muốn so sánh, dùng `==`. Biểu thức `a = b` gán `b` cho `a` rồi cho giá trị vừa gán làm kết quả biểu thức; trong điều kiện, giá trị khác `0` được xem là đúng.

Sai khi muốn so sánh:

```cpp
if (a = b) {
}
```

Đúng:

```cpp
if (a == b) {
}
```

**Chia nguyên ngoài ý muốn:**

```cpp
double average = static_cast<double>(sum) / count;
```

Chỉ thực hiện phép chia khi `count != 0`.

**Duyệt vector vượt phạm vi:**

```cpp
for (std::size_t i = 0; i < values.size(); ++i) {
    std::cout << values[i] << '\n';
}
```

**Sử dụng iterator sau khi container thay đổi:**

Một số thao tác như thêm hoặc xóa phần tử có thể làm mất hiệu lực iterator, reference hoặc pointer đang trỏ vào container.

Cần kiểm tra quy tắc iterator invalidation riêng của từng container.

**Sử dụng đối tượng sau lifetime:**

Không trả về tham chiếu hoặc con trỏ đến biến cục bộ đã hết vòng đời.

Ví dụ sai:

```cpp
const int& getValue() {
    int value{10};
    return value;
}
```

Cách đúng trong trường hợp này:

```cpp
int getValue() {
    return 10;
}
```

---

## 17. Ví dụ hoàn chỉnh

Chương trình sau kết hợp các kiến thức thường gặp:

- Đọc dữ liệu.
- Kiểm tra đầu vào.
- Sử dụng `std::vector`.
- Dùng vòng lặp.
- Sắp xếp dữ liệu.
- Tính tổng bằng thuật toán STL.

**Bài toán:** Nhập `n` số nguyên, sắp xếp tăng dần và tính tổng.

```cpp
#include <algorithm>
#include <cstddef>
#include <iostream>
#include <numeric>
#include <vector>

int main() {
    int n{};

    if (!(std::cin >> n)) {
        std::cerr << "Invalid input\n";
        return 1;
    }

    if (n < 0 || n > 100000) {
        std::cerr << "Invalid size\n";
        return 1;
    }

    std::vector<int> values;
    values.reserve(static_cast<std::size_t>(n));

    for (int i = 0; i < n; ++i) {
        int value{};

        if (!(std::cin >> value)) {
            std::cerr << "Invalid input\n";
            return 1;
        }

        values.push_back(value);
    }

    std::sort(values.begin(), values.end());

    const long long sum = std::accumulate(
        values.begin(),
        values.end(),
        0LL
    );

    for (int value : values) {
        std::cout << value << ' ';
    }

    std::cout << '\n';
    std::cout << "Sum: " << sum << '\n';

    return 0;
}
```

Input:

```text
5
8 2 5 1 4
```

Output:

```text
1 2 4 5 8
Sum: 20
```

**Độ phức tạp:**

- Đọc dữ liệu: `O(n)`.
- Sắp xếp: `O(n log n)`.
- Tính tổng: `O(n)`.
- Tổng thời gian: `O(n log n)`.
- Bộ nhớ chứa dữ liệu: `O(n)`.

Ví dụ giới hạn số phần tử ở `100000`. Giá trị của từng phần tử được đọc dưới kiểu `int`, và kết quả cộng dồn dưới kiểu `long long`.

---

## 18. Quick Reference: Tổng hợp cú pháp

| Công việc | Cú pháp |
|---|---|
| Khai báo biến | `int x{0};` |
| Hằng số | `const int x{10};` |
| Hằng compile-time | `constexpr int x{10};` |
| Suy luận kiểu | `auto x = 10;` |
| Điều kiện | `if (condition) {}` |
| Điều kiện nhiều nhánh | `if (...) {} else if (...) {} else {}` |
| Switch | `switch (value) { case 1: break; default: break; }` |
| Vòng lặp for | `for (int i = 0; i < n; ++i) {}` |
| Vòng lặp while | `while (condition) {}` |
| Vòng lặp do-while | `do {} while (condition);` |
| Range-for | `for (const auto& x : items) {}` |
| Hàm | `int add(int a, int b) { return a + b; }` |
| Reference | `int& ref = value;` |
| Pointer | `int* ptr = &value;` |
| Null pointer | `int* ptr{nullptr};` |
| Lambda | `[](int x) { return x * 2; }` |
| Khai báo struct | `struct Item { int id{}; };` |
| Khai báo class | `class Item { public: int id{}; };` |
| Enum | `enum class State { Idle, Running };` |
| Vector | `std::vector<int> values;` |
| Map | `std::map<int, int> values;` |
| Set | `std::set<int> values;` |
| Optional | `std::optional<int> result;` |
| Thêm vào vector | `values.push_back(10);` |
| Truy cập có kiểm tra | `values.at(0);` |
| Sắp xếp | `std::sort(v.begin(), v.end());` |
| Tìm kiếm | `std::find(v.begin(), v.end(), x);` |
| Tính tổng | `std::accumulate(v.begin(), v.end(), 0LL);` |
| In dữ liệu | `std::cout << x << '\n';` |
| Nhập dữ liệu | `std::cin >> x;` |
| Đọc dòng | `std::getline(std::cin, text);` |
| Chuyển kiểu | `static_cast<double>(x)` |
| Kích thước vector | `v.size()` |
| Kiểm tra rỗng | `v.empty()` |

Các dòng trong bảng là mẫu cú pháp. Những tên như `condition`, `items`, `v` và `value` đại diện cho biến hoặc biểu thức cần được khai báo phù hợp.

---

## 19. Trước khi biên dịch

Compiler kiểm tra cú pháp và quy tắc kiểu nhưng không chứng minh chương trình xử lý đúng dữ liệu đầu vào, điều kiện dừng, giới hạn số học hay vòng đời đối tượng. Hãy thử các trường hợp biên và biên dịch với cảnh báo phù hợp; biên dịch thành công vẫn chưa chứng minh chương trình đúng logic hoặc an toàn khi chạy.

## Đọc tiếp

- [Chương trình C++ đầu tiên](/cpp/bat-dau/chuong-trinh-dau-tien): Tìm hiểu cấu trúc chương trình, compiler và cách thực thi.
- [Kiểu dữ liệu trong C++](/cpp/tra-cuu/kieu-du-lieu): Tra cứu kiểu dữ liệu, kích thước, giới hạn và chuyển đổi kiểu.
- [STL Containers](/cpp/tra-cuu/stl-containers): So sánh các container, iterator và cách lựa chọn cấu trúc dữ liệu.
- [Debugging và xử lý lỗi](/cpp/tra-cuu/debugging-errors): Chẩn đoán lỗi biên dịch, liên kết, runtime và undefined behavior.

---

**Ghi nhớ:** Cheatsheet giúp tra cứu cú pháp, nhưng không thay thế việc hiểu quy tắc ngôn ngữ, vòng đời đối tượng, quản lý bộ nhớ và độ phức tạp thuật toán.

Khi phát triển phần mềm thực tế, ưu tiên mã rõ ràng, hành vi xác định và khả năng bảo trì thay vì chỉ viết cú pháp ngắn nhất.
