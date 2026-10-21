---
title: Hàm, tham số và phạm vi biến
description: Hướng dẫn khai báo, định nghĩa và gọi hàm, truyền tham số, trả kết quả, phân biệt scope và lifetime, cùng cách tổ chức chương trình C++17 thành các hàm dễ bảo trì.
slug: /cpp/bat-dau/ham-pham-vi
category: fundamentals
categoryLabel: C++ căn bản
order: 20070
difficulty: beginner
keywords: [function C++, hàm C++, parameter, argument, return, void, function declaration, function definition, pass by value, pass by reference, scope, local variable, lifetime, dangling reference]
updated: 2026-10-20
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/bat-dau/nhap-xuat-dieu-kien-vong-lap", "/cpp/bat-dau/references-pointers", "/cpp/trung-cap/overloading-default-arguments"]
---

# Hàm, tham số và phạm vi biến trong C++

Khi mới bắt đầu lập trình, chúng ta thường viết toàn bộ chương trình trong hàm `main()`.

Cách này phù hợp với những bài tập đơn giản. Tuy nhiên, khi chương trình có nhiều chức năng, việc đặt tất cả câu lệnh trong một hàm sẽ khiến mã nguồn khó đọc, khó kiểm thử và khó bảo trì.

Ví dụ, một chương trình quản lý điểm học sinh có thể cần thực hiện nhiều công việc:

- Nhập điểm.
- Kiểm tra điểm hợp lệ.
- Tính điểm trung bình.
- Xếp loại kết quả.
- Hiển thị thông tin.

Thay vì viết mọi thao tác trong `main()`, chúng ta có thể chia chương trình thành những **hàm (functions)** có trách nhiệm rõ ràng.

Hàm là một trong những thành phần quan trọng nhất của lập trình C++.

Bài học này giúp bạn hiểu:

1. Hàm là gì và tại sao cần sử dụng hàm.
2. Cách khai báo, định nghĩa và gọi hàm.
3. Sự khác nhau giữa tham số và đối số.
4. Cách trả kết quả bằng `return`.
5. Hàm `void` và hàm có giá trị trả về.
6. Truyền tham số bằng giá trị và tham chiếu.
7. Phạm vi biến (scope) và thời gian sống (lifetime).
8. Cách tổ chức chương trình thành nhiều hàm.
9. Những lỗi thường gặp và cách phòng tránh.

**Tiêu chuẩn sử dụng:** C++17.

---

## 1. Hàm là gì?

Hàm (function) là một đơn vị mã nguồn có tên, được định nghĩa để thực hiện một công việc cụ thể.

Một hàm có thể:

- Nhận dữ liệu đầu vào thông qua tham số.
- Xử lý dữ liệu.
- Trả về kết quả.
- Thực hiện những thao tác như in dữ liệu hoặc cập nhật đối tượng.

Ví dụ, chúng ta thường xuyên cần tính tổng hai số.

Nếu không sử dụng hàm:

```cpp
int a{5};
int b{3};

int result1 = a + b;

int c{10};
int d{20};

int result2 = c + d;
```

Khi phép tính phức tạp hơn, việc lặp lại logic ở nhiều nơi khiến chương trình khó bảo trì.

Thay vào đó, có thể định nghĩa một hàm:

```cpp
int add(int a, int b) {
    return a + b;
}
```

Sau đó sử dụng:

```cpp
int result1 = add(5, 3);
int result2 = add(10, 20);
```

Kết quả:

```text
result1 = 8
result2 = 30
```

### 1.1. Lợi ích của hàm

| Lợi ích | Giải thích |
|---|---|
| Tái sử dụng | Một hàm có thể được gọi nhiều lần |
| Giảm lặp mã | Không cần viết lại cùng một logic |
| Dễ đọc | Tên hàm cho biết thao tác cần thực hiện |
| Dễ kiểm thử | Có thể kiểm tra từng hàm độc lập |
| Dễ bảo trì | Sửa logic tại một vị trí |
| Chia nhỏ vấn đề | Biến bài toán lớn thành nhiều phần nhỏ |

Tuy nhiên, không nên tách mọi phép toán đơn giản thành một hàm riêng.

Mục tiêu là chia chương trình thành những phần **có ý nghĩa và trách nhiệm rõ ràng**, không phải tạo ra số lượng hàm nhiều nhất.

---

## 2. Cấu trúc của một hàm

Cú pháp tổng quát:

```cpp
ReturnType functionName(ParameterList) {
    // Function body
}
```

Trong đó:

| Thành phần | Ý nghĩa |
|---|---|
| `ReturnType` | Kiểu giá trị hàm trả về |
| `functionName` | Tên hàm |
| `ParameterList` | Danh sách tham số |
| `{}` | Phần thân hàm |
| `return` | Kết thúc lời gọi và có thể trả về giá trị |

Ví dụ:

```cpp
int add(int left, int right) {
    return left + right;
}
```

Phân tích:

```cpp
int
```

Là kiểu trả về.

```cpp
add
```

Là tên hàm.

```cpp
int left, int right
```

Là danh sách tham số.

```cpp
return left + right;
```

Trả về kết quả phép cộng.

### 2.1. Ví dụ hoàn chỉnh

```cpp
#include <iostream>

int add(int a, int b) {
    return a + b;
}

int main() {
    const int result{add(5, 3)};

    std::cout << result << '\n';

    return 0;
}
```

Kết quả:

```text
8
```

Quá trình thực thi:

1. Chương trình bắt đầu từ `main()`.
2. Gặp lời gọi `add(5, 3)`.
3. Hàm `add()` nhận hai giá trị.
4. Thực hiện phép cộng.
5. Trả về kết quả `8`.
6. `main()` lưu kết quả vào `result`.
7. Chương trình in `8`.

### 2.2. Minh họa lời gọi hàm

```text
main()
  |
  | add(5, 3)
  v
add()
  a = 5
  b = 3
  |
  | return a + b
  v
main()
  result = 8
```

Khi một hàm được gọi, chương trình chuyển quyền điều khiển sang hàm đó.

Khi lời gọi kết thúc bình thường, quyền điều khiển quay về vị trí gọi và việc thực thi tiếp tục.

---

## 3. Khai báo, định nghĩa và gọi hàm

Trong C++, cần phân biệt ba khái niệm:

- Function declaration.
- Function definition.
- Function call.

### 3.1. Function declaration

Khai báo hàm cho compiler biết một hàm tồn tại và cung cấp những thông tin cần thiết để kiểm tra lời gọi.

Ví dụ:

```cpp
int add(int a, int b);
```

Đây là một function declaration, thường được gọi là *function prototype* trong ngữ cảnh nhập môn.

Khai báo cho compiler biết:

- Tên hàm: `add`.
- Kiểu trả về: `int`.
- Hai tham số kiểu `int`.

Khai báo này chưa chứa phần thân hàm.

### 3.2. Function definition

Định nghĩa hàm cung cấp phần thân và cách hàm hoạt động.

```cpp
int add(int a, int b) {
    return a + b;
}
```

Định nghĩa hàm cũng là một dạng khai báo, nhưng có thêm phần triển khai.

### 3.3. Function call

Gọi hàm để thực hiện công việc:

```cpp
int result = add(5, 3);
```

Đây là một function call.

### 3.4. Tại sao cần khai báo hàm trước khi gọi?

Trong C++, một lời gọi hàm thông thường cần có khai báo phù hợp đã được compiler nhìn thấy tại vị trí gọi.

Ví dụ:

```cpp
#include <iostream>

int main() {
    std::cout << add(5, 3) << '\n';
}

int add(int a, int b) {
    return a + b;
}
```

Chương trình trên không hợp lệ nếu trước lời gọi chưa có khai báo nào của `add()`.

Compiler không tự động xem phần định nghĩa phía dưới là một khai báo đã có ở vị trí gọi.

### 3.5. Cách 1: Định nghĩa trước main()

```cpp
#include <iostream>

int add(int a, int b) {
    return a + b;
}

int main() {
    std::cout << add(5, 3) << '\n';
}
```

Đây là cách đơn giản, phù hợp với những chương trình nhỏ.

### 3.6. Cách 2: Sử dụng function prototype

```cpp
#include <iostream>

int add(int a, int b);

int main() {
    std::cout << add(5, 3) << '\n';
}

int add(int a, int b) {
    return a + b;
}
```

Chương trình hợp lệ vì `add()` đã được khai báo trước khi gọi.

Cách tổ chức này cũng là nền tảng để tách mã nguồn thành header và source file.

---

## 4. Tham số và đối số

Hai khái niệm thường bị nhầm lẫn là **parameter** và **argument**.

### 4.1. Parameter là gì?

Parameter (tham số) là tên hoặc khai báo được sử dụng trong danh sách tham số của hàm.

Ví dụ:

```cpp
int add(int a, int b) {
    return a + b;
}
```

Ở đây:

```cpp
a
b
```

là các tham số.

### 4.2. Argument là gì?

Argument (đối số) là biểu thức được cung cấp khi gọi hàm.

Ví dụ:

```cpp
add(10, 20);
```

Các giá trị `10` và `20` là đối số.

### 4.3. Phân biệt parameter và argument

| Khái niệm | Vị trí | Ví dụ |
|---|---|---|
| Parameter | Khai báo hàm | `int a`, `int b` |
| Argument | Lời gọi hàm | `10`, `20` |

Ví dụ:

```cpp
int multiply(int left, int right) {
    return left * right;
}
```

Gọi:

```cpp
int result = multiply(4, 5);
```

Ánh xạ:

```text
Argument 4  -> Parameter left
Argument 5  -> Parameter right
```

Kết quả:

```text
20
```

### 4.4. Hàm không có tham số

Không phải hàm nào cũng cần nhận dữ liệu.

Ví dụ:

```cpp
#include <iostream>

void printWelcome() {
    std::cout << "Welcome to DevHubs Wiki!\n";
}

int main() {
    printWelcome();
}
```

Kết quả:

```text
Welcome to DevHubs Wiki!
```

Dấu ngoặc `()` trong lời gọi vẫn cần thiết, ngay cả khi hàm không có tham số.

---

## 5. return và giá trị trả về

Một hàm có thể trả kết quả cho nơi gọi thông qua `return`.

### 5.1. Hàm trả về số nguyên

```cpp
int square(int value) {
    return value * value;
}
```

Sử dụng:

```cpp
int result = square(5);
```

Kết quả:

```text
25
```

Kiểu trả về `int` phải phù hợp với giá trị mà hàm trả về.

Ở đây, ví dụ giả định phép nhân nằm trong phạm vi biểu diễn của `int`.

### 5.2. Hàm trả về bool

Ví dụ kiểm tra số chẵn:

```cpp
bool isEven(int value) {
    return value % 2 == 0;
}
```

Sử dụng:

```cpp
#include <iostream>

bool isEven(int value) {
    return value % 2 == 0;
}

int main() {
    std::cout << std::boolalpha;

    std::cout << isEven(4) << '\n';
    std::cout << isEven(5) << '\n';
    std::cout << isEven(-4) << '\n';

    return 0;
}
```

Kết quả:

```text
true
false
true
```

**Tại sao `isEven(-4)` bằng `true`?**

Vì:

```cpp
-4 % 2 == 0
```

là điều kiện đúng.

Số nguyên âm vẫn có thể là số chẵn.

### 5.3. Hàm trả về double

Ví dụ tính trung bình cộng:

```cpp
double average(int a, int b) {
    return (static_cast<double>(a) + b) / 2;
}
```

Sử dụng:

```cpp
double result = average(7, 8);
```

Kết quả:

```text
7.5
```

Việc chuyển sang `double` trước khi cộng giúp tránh phép cộng trực tiếp trên kiểu `int` trong biểu thức này.

Tuy nhiên, với các giá trị nguyên rất lớn, việc chuyển sang `double` vẫn có thể gây mất độ chính xác biểu diễn.

### 5.4. return kết thúc lời gọi hàm

Ví dụ:

```cpp
#include <iostream>

int calculate() {
    return 10;

    std::cout << "Hello\n";
}

int main() {
    std::cout << calculate() << '\n';
}
```

Kết quả:

```text
10
```

Câu lệnh sau `return` trong cùng đường thực thi không được chạy.

Compiler có thể cảnh báo về unreachable code.

### 5.5. Hàm có nhiều nhánh return

Ví dụ:

```cpp
int absoluteValue(int value) {
    if (value >= 0) {
        return value;
    }

    return -value;
}
```

Hàm trả về:

- `value` nếu không âm.
- `-value` nếu âm.

Tuy nhiên, với giá trị nhỏ nhất của kiểu `int` có dấu, phép đổi dấu có thể gây tràn số nguyên.

Một triển khai tổng quát cần xử lý trường hợp biên đó hoặc định nghĩa rõ phạm vi đầu vào được hỗ trợ.

### 5.6. Mọi đường thực thi phải trả kết quả phù hợp

Không nên viết:

```cpp
int getScore(bool valid) {
    if (valid) {
        return 100;
    }
}
```

Nếu `valid` bằng `false`, chương trình có thể đi đến cuối một hàm trả về `int` mà không trả giá trị.

Trong C++17, điều này gây undefined behavior khi luồng thực thi đi tới cuối một hàm trả giá trị thông thường.

Cách sửa:

```cpp
int getScore(bool valid) {
    if (valid) {
        return 100;
    }

    return 0;
}
```

Hoặc thiết kế một cơ chế biểu diễn lỗi phù hợp nếu `0` không phải giá trị thay thế hợp lệ.

---

## 6. Hàm void

Kiểu trả về `void` biểu thị hàm không trả về một giá trị cho nơi gọi.

Ví dụ:

```cpp
#include <iostream>

void printMessage() {
    std::cout << "Hello C++!\n";
}

int main() {
    printMessage();
}
```

Kết quả:

```text
Hello C++!
```

### 6.1. Khi nào nên dùng void?

Hàm `void` phù hợp khi nhiệm vụ chính là thực hiện một thao tác.

Ví dụ:

- In thông tin.
- Ghi dữ liệu.
- Cập nhật một đối tượng.
- Thực hiện thao tác điều khiển.

Ví dụ:

```cpp
void printScore(int score) {
    std::cout << "Score: " << score << '\n';
}
```

### 6.2. return trong hàm void

Hàm `void` có thể sử dụng:

```cpp
return;
```

để kết thúc lời gọi sớm.

Ví dụ:

```cpp
#include <iostream>

void printPositive(int value) {
    if (value <= 0) {
        return;
    }

    std::cout << value << '\n';
}
```

Nếu `value <= 0`, hàm kết thúc mà không in dữ liệu.

### 6.3. Phân biệt in kết quả và trả kết quả

Hai hàm sau có mục đích khác nhau.

**Hàm in kết quả:**

```cpp
void printSquare(int value) {
    std::cout << value * value << '\n';
}
```

**Hàm trả kết quả:**

```cpp
int square(int value) {
    return value * value;
}
```

Hàm `printSquare()` trực tiếp thực hiện output.

Hàm `square()` trả về giá trị để nơi gọi tiếp tục xử lý.

Ví dụ:

```cpp
int result = square(5);

std::cout << result + 10 << '\n';
```

Kết quả:

```text
35
```

Không thể sử dụng kết quả của một lời gọi hàm `void` như thể đó là một giá trị `int`.

### 6.4. Khi nào nên tách tính toán và nhập xuất?

Trong nhiều trường hợp, nên tách logic tính toán khỏi việc in dữ liệu.

Ví dụ:

```cpp
int square(int value) {
    return value * value;
}

void printResult(int value) {
    std::cout << value << '\n';
}
```

Sử dụng:

```cpp
printResult(square(5));
```

Thiết kế này giúp hàm tính toán dễ tái sử dụng và kiểm thử hơn.

Tuy nhiên, không cần tạo thêm hàm chỉ để bọc một câu lệnh `std::cout` nếu việc đó không mang lại lợi ích thực tế cho chương trình.

---

## 7. Truyền tham số theo giá trị

C++ hỗ trợ nhiều hình thức truyền tham số.

Hình thức đơn giản nhất là **pass by value**.

### 7.1. Cách hoạt động

Ví dụ:

```cpp
#include <iostream>

void increase(int value) {
    value += 10;
}

int main() {
    int number{5};

    increase(number);

    std::cout << number << '\n';
}
```

Kết quả:

```text
5
```

Tại sao kết quả vẫn bằng `5`?

Vì hàm:

```cpp
void increase(int value)
```

nhận một tham số riêng được khởi tạo từ giá trị của `number`.

Thay đổi tham số `value` không làm thay đổi đối tượng `number` của người gọi.

### 7.2. Minh họa

```text
main()
  number = 5
      |
      | increase(number)
      v
increase()
  value = 5
  value += 10
  value = 15
      |
      v
main()
  number = 5
```

### 7.3. Khi nào nên truyền theo giá trị?

Pass by value thường phù hợp khi:

- Kiểu dữ liệu nhỏ.
- Hàm chỉ cần đọc giá trị.
- Hàm cần một bản sao độc lập.
- Hàm cần nhận quyền sở hữu một giá trị theo thiết kế API.

Ví dụ:

```cpp
bool isAdult(int age) {
    return age >= 18;
}
```

Đối với các kiểu như `int`, `bool` và `double`, truyền theo giá trị thường là lựa chọn đơn giản và hợp lý.

---

## 8. Truyền tham số bằng reference

Nếu muốn hàm thay đổi trực tiếp đối tượng được truyền vào, có thể sử dụng reference.

### 8.1. Cú pháp

```cpp
void functionName(Type& parameter);
```

Ví dụ:

```cpp
#include <iostream>

void increase(int& value) {
    value += 10;
}

int main() {
    int number{5};

    increase(number);

    std::cout << number << '\n';
}
```

Kết quả:

```text
15
```

### 8.2. Tại sao giá trị thay đổi?

Hàm:

```cpp
void increase(int& value)
```

nhận một reference đến đối tượng của người gọi.

Tham số `value` không phải là một đối tượng `int` độc lập.

Do đó:

```cpp
value += 10;
```

thay đổi trực tiếp `number`.

### 8.3. Bảng so sánh

| Đặc điểm | Pass by value | Pass by reference |
|---|---|---|
| Cú pháp | `T` | `T&` |
| Tạo tham số giá trị riêng | Có | Không |
| Có thể sửa đối tượng gốc qua tham số | Không | Có |
| Phù hợp với kiểu nhỏ | Thường tốt | Tùy mục đích |
| Phù hợp khi cần cập nhật dữ liệu gốc | Không | Có |

### 8.4. Ví dụ hoán đổi hai số

```cpp
#include <iostream>

void swapValues(int& a, int& b) {
    int temp{a};

    a = b;
    b = temp;
}

int main() {
    int x{10};
    int y{20};

    swapValues(x, y);

    std::cout << x << ' ' << y << '\n';
}
```

Kết quả:

```text
20 10
```

Trong mã C++ thực tế, thư viện chuẩn có sẵn `std::swap()` trong `<utility>`.

Ví dụ này được sử dụng để giải thích cơ chế truyền tham số bằng reference.

---

## 9. const reference

Đôi khi hàm cần truy cập một đối tượng lớn nhưng không cần thay đổi nội dung.

Trong trường hợp đó, `const T&` thường là lựa chọn phù hợp.

### 9.1. Ví dụ với std::string

```cpp
#include <iostream>
#include <string>

void printName(const std::string& name) {
    std::cout << name << '\n';
}

int main() {
    std::string name{"Nguyen Van An"};

    printName(name);

    return 0;
}
```

Kết quả:

```text
Nguyen Van An
```

### 9.2. Lợi ích của const T&

Khai báo:

```cpp
const std::string& name
```

có hai đặc điểm quan trọng:

1. Không yêu cầu sao chép đối tượng chuỗi chỉ để đọc nó.
2. Không cho phép hàm thay đổi chuỗi thông qua tham chiếu `name`.

Ví dụ không hợp lệ:

```cpp
void update(const std::string& name) {
    name += "!";
}
```

Vì `name` là tham chiếu đến đối tượng const, phép sửa đổi thông qua tham chiếu đó không được phép.

### 9.3. Khi nào nên sử dụng?

| Tình huống | Kiểu tham số thường phù hợp |
|---|---|
| Chỉ đọc một số nguyên | `int` |
| Chỉ đọc một bool | `bool` |
| Chỉ đọc chuỗi lớn | `const std::string&` |
| Chỉ đọc vector | `const std::vector<T>&` |
| Cần sửa đối tượng gốc | `T&` |
| Tham số có thể không có đối tượng | `T*` |

**Lưu ý:** `const T&` không có nghĩa đối tượng gốc nhất thiết là bất biến. Nếu đối tượng không phải `const`, nó vẫn có thể được sửa thông qua tên hoặc tham chiếu khác có quyền phù hợp.

Ngoài ra, reference không tự động quản lý lifetime của đối tượng được tham chiếu.

Phần này được giải thích sâu hơn trong bài [References và pointers](/cpp/bat-dau/references-pointers).

---

## 10. Trả về nhiều kết quả

Một hàm có kiểu trả về thông thường chỉ trả về một đối tượng hoặc giá trị.

Tuy nhiên, đối tượng đó có thể chứa nhiều thông tin.

### 10.1. Sử dụng struct

Giả sử cần tính tổng và hiệu của hai số.

```cpp
#include <iostream>

struct Result {
    int sum{};
    int difference{};
};

Result calculate(int a, int b) {
    return Result{a + b, a - b};
}

int main() {
    const Result result = calculate(10, 3);

    std::cout << result.sum << '\n';
    std::cout << result.difference << '\n';
}
```

Kết quả:

```text
13
7
```

Hàm `calculate()` trả về một đối tượng `Result` chứa hai trường.

Ví dụ này giả định các phép cộng và trừ nằm trong phạm vi biểu diễn của `int`.

### 10.2. Structured bindings trong C++17

Có thể sử dụng:

```cpp
const auto [sum, difference] = calculate(10, 3);
```

Sau đó:

```cpp
std::cout << sum << ' ' << difference << '\n';
```

Kết quả:

```text
13 7
```

Structured bindings là tính năng được giới thiệu trong C++17.

### 10.3. Tại sao nên trả về struct?

Sử dụng `struct` giúp:

- Gom các kết quả liên quan.
- Đặt tên rõ ràng cho từng giá trị.
- Giảm nhu cầu sử dụng nhiều output parameters.
- Làm giao diện hàm dễ hiểu hơn.

Trong những trường hợp đơn giản, `std::pair` cũng có thể phù hợp.

Tuy nhiên, nếu mỗi trường mang ý nghĩa nghiệp vụ riêng, một `struct` có tên và các thành viên có tên thường dễ bảo trì hơn.

---

## 11. Scope là gì?

**Scope (phạm vi)** xác định những vị trí trong mã nguồn mà một tên có thể được sử dụng để tham chiếu đến thực thể đã khai báo.

Ví dụ:

```cpp
#include <iostream>

int main() {
    int age{16};

    std::cout << age << '\n';
}
```

Biến `age` có phạm vi cục bộ trong thân hàm `main()`, bắt đầu từ vị trí khai báo theo các quy tắc của ngôn ngữ.

Không thể tùy ý sử dụng tên `age` ở những hàm khác mà không truyền dữ liệu hoặc thiết lập cơ chế truy cập phù hợp.

### 11.1. Block scope

Một khối lệnh được biểu diễn bằng cặp dấu ngoặc nhọn:

```cpp
{
    // Statements
}
```

Ví dụ:

```cpp
#include <iostream>

int main() {
    int a{10};

    if (a > 5) {
        int b{20};

        std::cout << a << '\n';
        std::cout << b << '\n';
    }

    std::cout << a << '\n';

    return 0;
}
```

Kết quả:

```text
10
20
10
```

Biến `a` được khai báo trong thân hàm.

Biến `b` được khai báo trong khối `if`.

Vì vậy, câu lệnh sau không hợp lệ nếu đặt bên ngoài khối `if`:

```cpp
std::cout << b;
```

Tên `b` không còn nằm trong phạm vi có thể sử dụng.

### 11.2. Scope trong vòng lặp

Ví dụ:

```cpp
for (int i = 0; i < 5; ++i) {
    std::cout << i << '\n';
}
```

Biến `i` được khai báo trong phần khởi tạo của vòng lặp `for`.

Phạm vi của tên `i` gắn với câu lệnh `for`, bao gồm điều kiện, phần cập nhật và thân vòng lặp.

Sau vòng lặp, không thể sử dụng `i` theo cách:

```cpp
std::cout << i;
```

nếu không có khai báo phù hợp khác.

### 11.3. Scope của tham số hàm

Ví dụ:

```cpp
int square(int value) {
    return value * value;
}
```

Tên tham số `value` được sử dụng trong định nghĩa hàm `square()`.

Một hàm khác không thể tự động truy cập tham số đó.

Ví dụ không hợp lệ:

```cpp
void printValue() {
    std::cout << value;
}
```

Nếu `value` chưa được khai báo trong phạm vi phù hợp, compiler sẽ báo lỗi.

---

## 12. Biến cục bộ và biến toàn cục

### 12.1. Biến cục bộ

Biến cục bộ thường được khai báo trong hàm hoặc một khối lệnh.

Ví dụ:

```cpp
void calculate() {
    int result{100};
}
```

Biến `result` chỉ được truy cập trong phạm vi phù hợp của khối khai báo.

Ưu điểm của biến cục bộ:

- Giới hạn nơi có thể sử dụng tên.
- Giảm phụ thuộc giữa các hàm.
- Dễ theo dõi trạng thái.
- Giúp chương trình dễ kiểm thử.

### 12.2. Biến toàn cục

Biến khai báo ở namespace scope có thể được sử dụng từ các vị trí phù hợp theo quy tắc phạm vi và linkage.

Ví dụ:

```cpp
#include <iostream>

int total{100};

void printTotal() {
    std::cout << total << '\n';
}

int main() {
    printTotal();
}
```

Kết quả:

```text
100
```

Biến `total` trong ví dụ có static storage duration.

### 12.3. Có nên dùng biến toàn cục?

Biến toàn cục không phải lúc nào cũng sai.

Tuy nhiên, một chương trình có nhiều biến toàn cục có thể gặp những vấn đề như:

- Nhiều hàm cùng thay đổi trạng thái.
- Khó xác định nguồn gốc của thay đổi.
- Tăng sự phụ thuộc giữa các thành phần.
- Khó kiểm thử độc lập.
- Phát sinh vấn đề đồng bộ trong chương trình đa luồng.

Đối với dữ liệu không cần chia sẻ toàn chương trình, nên ưu tiên biến cục bộ và truyền tham số.

Ví dụ:

```cpp
int calculateTotal(int price, int quantity) {
    return price * quantity;
}
```

thường rõ ràng hơn một hàm âm thầm đọc hai biến toàn cục.

### 12.4. Trường hợp hợp lý của hằng ở namespace scope

Ví dụ:

```cpp
namespace Config {
    inline constexpr int maxPlayers{100};
}
```

Đây là cách định nghĩa hằng trong C++17 bằng inline variable.

Hằng có tên và phạm vi rõ ràng thường dễ kiểm soát hơn trạng thái toàn cục có thể sửa đổi tùy ý.

---

## 13. Shadowing: Biến che khuất biến khác

**Shadowing** xảy ra khi một khai báo trong phạm vi bên trong che khuất tên cùng định danh ở phạm vi bên ngoài.

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
}
```

Kết quả:

```text
20
10
```

Trong khối bên trong:

```cpp
int value{20};
```

che khuất tên `value` ở phạm vi ngoài.

Khi rời khối, tên `value` bên ngoài lại được sử dụng.

### 13.1. Shadowing có phải lỗi biên dịch?

Không nhất thiết.

Ví dụ trên là C++ hợp lệ.

Tuy nhiên, shadowing có thể gây nhầm lẫn khi mã nguồn phức tạp hơn.

### 13.2. Ví dụ dễ gây lỗi logic

```cpp
int score{10};

if (score > 0) {
    int score{20};
}
```

Lập trình viên có thể tưởng rằng đang thay đổi biến `score` ban đầu.

Thực tế, câu lệnh trong khối `if` khai báo một biến mới.

### 13.3. Cách phòng tránh

Nên:

- Chọn tên biến rõ ràng.
- Hạn chế sử dụng lại tên trong những scope lồng nhau.
- Giữ scope nhỏ.
- Sử dụng các cảnh báo liên quan đến shadowing khi phù hợp với compiler.

Một số compiler hỗ trợ những cảnh báo như `-Wshadow`, nhưng cần cân nhắc chính sách cảnh báo của dự án.

---

## 14. Scope và lifetime khác nhau thế nào?

Scope và lifetime là hai khái niệm liên quan nhưng không giống nhau.

**Scope** nói về nơi một tên có thể được sử dụng.

**Lifetime** nói về khoảng thời gian một đối tượng tồn tại.

### 14.1. Ví dụ biến cục bộ thông thường

```cpp
void calculate() {
    int result{100};
}
```

Đối tượng `result` có automatic storage duration.

Trong ví dụ này, lifetime của đối tượng kết thúc khi rời khỏi khối chứa khai báo.

Tên `result` cũng chỉ có phạm vi bên trong khối đó.

### 14.2. Biến static cục bộ

Xét ví dụ:

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

Biến `count` có:

- Phạm vi tên cục bộ trong hàm.
- Static storage duration.
- Giá trị được giữ lại qua nhiều lần gọi hàm.

### 14.3. Bảng so sánh

| Khái niệm | Câu hỏi |
|---|---|
| Scope | Tôi có thể sử dụng tên này ở đâu? |
| Lifetime | Đối tượng tồn tại trong bao lâu? |
| Storage duration | Vùng lưu trữ của đối tượng được quản lý trong khoảng thời gian nào? |

Trong nhiều ví dụ nhập môn, lifetime và phạm vi của biến cục bộ thông thường dường như kết thúc cùng lúc.

Nhưng điều đó không đúng cho mọi loại đối tượng, chẳng hạn biến `static`, đối tượng cấp phát động hoặc một số đối tượng tạm thời.

---

## 15. Không trả reference hoặc pointer đến biến local đã hết lifetime

Đây là một lỗi nghiêm trọng trong C++.

### 15.1. Ví dụ sai với reference

```cpp
int& getValue() {
    int value{10};

    return value;
}
```

Biến `value` là đối tượng cục bộ có automatic storage duration.

Khi hàm kết thúc, lifetime của đối tượng cũng kết thúc.

Reference trả về không còn hợp lệ để truy cập đối tượng đó.

Việc sử dụng reference như vậy để đọc hoặc sửa đối tượng đã hết lifetime gây undefined behavior.

### 15.2. Ví dụ sai với pointer

```cpp
int* getValue() {
    int value{10};

    return &value;
}
```

Hàm trả về địa chỉ của biến cục bộ.

Khi hàm kết thúc, biến `value` bị hủy.

Pointer không còn hợp lệ để dereference.

### 15.3. Cách viết đúng

Đối với một giá trị đơn giản, trả về bằng giá trị:

```cpp
int getValue() {
    return 10;
}
```

Hoặc:

```cpp
int calculate() {
    int result{5 + 3};

    return result;
}
```

Trong C++ hiện đại, trả về đối tượng bằng giá trị thường là lựa chọn an toàn và hiệu quả nhờ copy elision, move semantics và các cơ chế tối ưu hóa của compiler.

Không nên trả về reference chỉ vì cho rằng như vậy luôn nhanh hơn.

### 15.4. Có được trả reference trong C++ không?

Có, nếu hợp đồng bảo đảm đối tượng được tham chiếu vẫn còn sống trong thời gian sử dụng.

Ví dụ:

```cpp
int& getFirst(int (&values)[3]) {
    return values[0];
}
```

Hàm trả về reference đến phần tử đầu tiên của mảng được truyền vào.

Tuy nhiên, người gọi phải bảo đảm mảng còn sống trong thời gian sử dụng reference trả về.

Vấn đề không nằm ở bản thân kiểu reference mà ở **lifetime của đối tượng đích**.

Đọc thêm tại [References và pointers](/cpp/bat-dau/references-pointers).

---

## 16. Một hàm gọi một hàm khác

Hàm có thể gọi những hàm khác.

Ví dụ:

```cpp
#include <iostream>

int square(int value) {
    return value * value;
}

int sumOfSquares(int a, int b) {
    return square(a) + square(b);
}

int main() {
    std::cout << sumOfSquares(3, 4) << '\n';
}
```

Kết quả:

```text
25
```

Vì:

\[
3^2 + 4^2 = 9 + 16 = 25
\]

Ví dụ này giả định các phép tính nằm trong phạm vi của `int`.

### 16.1. Luồng thực thi

```text
main()
  |
  | sumOfSquares(3, 4)
  v
sumOfSquares()
  |
  | square(3)
  v
square()
  return 9
  |
  v
sumOfSquares()
  |
  | square(4)
  v
square()
  return 16
  |
  v
sumOfSquares()
  return 25
  |
  v
main()
  print 25
```

Trong chương trình này, `sumOfSquares()` tái sử dụng `square()` để thực hiện một công việc lớn hơn.

### 16.2. Có nên tạo nhiều tầng gọi hàm?

Có thể, nếu các tầng đó giúp phân chia trách nhiệm rõ ràng.

Tuy nhiên, không nên tạo những hàm trung gian chỉ để gọi tiếp một hàm khác mà không bổ sung ý nghĩa hoặc abstraction hữu ích.

Một cấu trúc hàm tốt phải giúp code dễ hiểu hơn, không chỉ khiến code bị chia thành nhiều tệp hoặc nhiều lớp.

---

## 17. Hàm đệ quy: Giới thiệu

Một hàm có thể gọi lại chính nó. Cơ chế này được gọi là **recursion (đệ quy)**.

Ví dụ tính giai thừa:

\[
n! = n \times (n-1)!
\]

Với:

\[
0! = 1
\]

Chương trình:

```cpp
#include <iostream>

long long factorial(int n) {
    if (n <= 1) {
        return 1;
    }

    return n * factorial(n - 1);
}

int main() {
    std::cout << factorial(5) << '\n';
}
```

Kết quả:

```text
120
```

### 17.1. Điều kiện dừng

Hàm đệ quy cần có điều kiện dừng.

Trong ví dụ:

```cpp
if (n <= 1) {
    return 1;
}
```

giúp kết thúc quá trình gọi đệ quy.

### 17.2. Giới hạn của ví dụ

Hàm trên chỉ có ý nghĩa như một ví dụ học thuật cho đầu vào nguyên không âm và cần giới hạn để tránh tràn số.

Với kiểu `long long` tối thiểu 64 bit theo tiêu chuẩn, giai thừa từ `0!` đến `20!` nằm trong phạm vi biểu diễn.

Không nên gọi hàm với số âm hoặc giá trị quá lớn mà không kiểm tra.

Mỗi lần gọi đệ quy cũng sử dụng tài nguyên thực thi. Đệ quy quá sâu có thể vượt giới hạn stack của môi trường.

Nội dung chi tiết sẽ được trình bày trong bài [Đệ quy và call stack](/cpp/trung-cap/de-quy-call-stack).

---

## 18. Function overloading: Giới thiệu

C++ cho phép nhiều hàm cùng tên nếu có danh sách tham số phù hợp để phân biệt.

Cơ chế này gọi là **function overloading**.

Ví dụ:

```cpp
#include <iostream>

int add(int a, int b) {
    return a + b;
}

double add(double a, double b) {
    return a + b;
}

int main() {
    std::cout << add(2, 3) << '\n';
    std::cout << add(2.5, 3.5) << '\n';
}
```

Kết quả:

```text
5
6
```

Compiler lựa chọn overload phù hợp dựa trên đối số và các quy tắc overload resolution.

### 18.1. Không thể overload chỉ bằng kiểu trả về

Ví dụ không hợp lệ:

```cpp
int getValue() {
    return 10;
}

double getValue() {
    return 10.5;
}
```

Hai hàm có cùng tên và cùng danh sách tham số nhưng chỉ khác kiểu trả về.

Điều này không tạo thành overload hợp lệ.

### 18.2. Default arguments

C++ còn cho phép cung cấp giá trị mặc định cho tham số.

Ví dụ:

```cpp
int multiply(int a, int b = 2) {
    return a * b;
}
```

Có thể gọi:

```cpp
multiply(5);
multiply(5, 3);
```

Kết quả tương ứng:

```text
10
15
```

Default arguments và overloading có nhiều quy tắc liên quan đến khai báo, overload resolution và tính mơ hồ.

Phần nâng cao nằm trong bài [Function overloading và default arguments](/cpp/trung-cap/overloading-default-arguments).

---

## 19. Tổ chức chương trình thành nhiều hàm

Giả sử cần viết chương trình:

- Nhập hai số nguyên.
- Tính tổng.
- Tính hiệu.
- In kết quả.

Có thể viết tất cả trong `main()`.

Tuy nhiên, chúng ta sẽ chia logic thành những hàm phù hợp.

### 19.1. Chương trình

```cpp
#include <iostream>

int add(int a, int b) {
    return a + b;
}

int subtract(int a, int b) {
    return a - b;
}

void printResult(int sum, int difference) {
    std::cout << "Tong: " << sum << '\n';
    std::cout << "Hieu: " << difference << '\n';
}

int main() {
    int a{};
    int b{};

    if (!(std::cin >> a >> b)) {
        std::cerr << "Du lieu khong hop le.\n";
        return 1;
    }

    const int sum = add(a, b);
    const int difference = subtract(a, b);

    printResult(sum, difference);

    return 0;
}
```

Input:

```text
10 3
```

Output:

```text
Tong: 13
Hieu: 7
```

### 19.2. Vai trò từng hàm

| Hàm | Trách nhiệm |
|---|---|
| `add()` | Tính tổng |
| `subtract()` | Tính hiệu |
| `printResult()` | Xuất kết quả |
| `main()` | Điều phối luồng chương trình |

Đây là một ví dụ đơn giản về phân chia trách nhiệm.

Trong ví dụ này, hai phép tính được thực hiện bằng `int`. Chương trình giả định kết quả phép cộng và trừ không vượt phạm vi của kiểu.

Nếu xử lý dữ liệu lớn, cần bổ sung kiểm tra tràn hoặc thay đổi kiểu dữ liệu phù hợp.

### 19.3. main() nên làm gì?

Trong chương trình nhỏ, `main()` có thể chứa toàn bộ logic.

Nhưng với ứng dụng lớn, `main()` thường phù hợp với vai trò:

- Khởi tạo chương trình.
- Đọc cấu hình cần thiết.
- Tạo những đối tượng hoặc dịch vụ chính.
- Điều phối các thành phần.
- Xử lý mã kết thúc chương trình.

Không có yêu cầu bắt buộc `main()` phải ngắn hơn một số dòng cụ thể.

Điều quan trọng là khả năng đọc hiểu và cấu trúc trách nhiệm.

---

## 20. Tách hàm sang nhiều file

Khi dự án phát triển, những hàm liên quan có thể được tổ chức vào header và source file riêng.

Ví dụ:

```text
Project/
├── main.cpp
├── Calculator.cpp
└── Calculator.h
```

### 20.1. Calculator.h

```cpp
#ifndef CALCULATOR_H
#define CALCULATOR_H

int add(int a, int b);
int subtract(int a, int b);

#endif
```

Header chứa những khai báo cần thiết.

Include guard tránh việc nội dung header bị xử lý lặp lại trong cùng một translation unit.

### 20.2. Calculator.cpp

```cpp
#include "Calculator.h"

int add(int a, int b) {
    return a + b;
}

int subtract(int a, int b) {
    return a - b;
}
```

Source file chứa định nghĩa.

### 20.3. main.cpp

```cpp
#include <iostream>
#include "Calculator.h"

int main() {
    const int a{10};
    const int b{3};

    std::cout << add(a, b) << '\n';
    std::cout << subtract(a, b) << '\n';
}
```

### 20.4. Biên dịch

Với GCC:

```sh
g++ -std=c++17 -Wall -Wextra -Wpedantic main.cpp Calculator.cpp -o app
```

Trên hệ Unix-like, chạy:

```sh
./app
```

Trên Windows PowerShell, nếu sản phẩm là `app.exe`:

```powershell
.\app.exe
```

Kết quả:

```text
13
7
```

### 20.5. Điều gì xảy ra nếu quên Calculator.cpp?

Nếu chỉ biên dịch và liên kết `main.cpp`:

```sh
g++ -std=c++17 main.cpp -o app
```

linker thường không tìm được định nghĩa phù hợp của `add()` và `subtract()`.

Có thể xuất hiện lỗi như:

```text
undefined reference to `add(int, int)`
```

Đây là lỗi ở giai đoạn liên kết, không phải lỗi do cú pháp gọi hàm trong `main()`.

Phần tổ chức mã nguồn, translation unit và linker sẽ được giải thích sâu hơn trong bài [Header, source và modules](/cpp/ky-thuat/header-source-modules).

---

## 21. Ví dụ thực hành tổng hợp

### Bài toán: Thống kê điểm học sinh

Viết chương trình:

1. Nhập số lượng học sinh.
2. Nhập điểm của từng học sinh.
3. Kiểm tra điểm hợp lệ.
4. Tính tổng điểm.
5. Tính điểm trung bình.
6. Tìm điểm lớn nhất.
7. In báo cáo kết quả.

Yêu cầu tổ chức thành những hàm riêng thay vì đặt toàn bộ logic trong `main()`.

### 21.1. Phân tích

Giả sử:

\[
1 \le n \le 100000
\]

Mỗi điểm là số nguyên:

\[
0 \le score \le 10
\]

Có thể chia chương trình thành:

| Hàm | Trách nhiệm |
|---|---|
| `isValidScore()` | Kiểm tra điểm |
| `calculateTotal()` | Tính tổng |
| `findMaximum()` | Tìm điểm lớn nhất |
| `calculateAverage()` | Tính trung bình |
| `printReport()` | In kết quả |
| `main()` | Nhập liệu và điều phối |

### 21.2. Chương trình C++17

```cpp
#include <iostream>
#include <vector>

bool isValidScore(int score) {
    return score >= 0 && score <= 10;
}

long long calculateTotal(
    const std::vector<int>& scores
) {
    long long total{};

    for (int score : scores) {
        total += score;
    }

    return total;
}

int findMaximum(
    const std::vector<int>& scores
) {
    int maximum = scores.front();

    for (int score : scores) {
        if (score > maximum) {
            maximum = score;
        }
    }

    return maximum;
}

double calculateAverage(
    long long total,
    std::size_t count
) {
    return static_cast<double>(total) / count;
}

void printReport(
    long long total,
    double average,
    int maximum
) {
    std::cout << "Tong: " << total << '\n';
    std::cout << "Trung binh: " << average << '\n';
    std::cout << "Cao nhat: " << maximum << '\n';
}

int main() {
    int n{};

    if (!(std::cin >> n) || n < 1 || n > 100000) {
        std::cerr << "So luong khong hop le.\n";
        return 1;
    }

    std::vector<int> scores;
    scores.reserve(static_cast<std::size_t>(n));

    for (int i = 0; i < n; ++i) {
        int score{};

        if (!(std::cin >> score) ||
            !isValidScore(score)) {
            std::cerr << "Diem khong hop le.\n";
            return 1;
        }

        scores.push_back(score);
    }

    const long long total = calculateTotal(scores);
    const int maximum = findMaximum(scores);

    const double average = calculateAverage(
        total,
        scores.size()
    );

    printReport(total, average, maximum);

    return 0;
}
```

### 21.3. Input

```text
5
7 9 4 8 10
```

### 21.4. Output

```text
Tong: 38
Trung binh: 7.6
Cao nhat: 10
```

### 21.5. Giải thích

**Hàm kiểm tra điểm:**

```cpp
bool isValidScore(int score)
```

Nhận một số nguyên và trả về `true` hoặc `false`.

**Hàm tính tổng:**

```cpp
long long calculateTotal(
    const std::vector<int>& scores
)
```

Chỉ đọc dữ liệu và trả về tổng.

Sử dụng `const reference` giúp tránh sao chép toàn bộ vector.

**Hàm tìm giá trị lớn nhất:**

```cpp
int findMaximum(
    const std::vector<int>& scores
)
```

Sử dụng `scores.front()` để khởi tạo maximum.

Hàm này yêu cầu vector không rỗng. Trong chương trình trên, điều kiện đó được bảo đảm vì `n >= 1` và tất cả phần tử phải được đọc thành công trước khi gọi.

Nếu đây là API công khai có thể nhận vector rỗng, cần quy định hoặc triển khai thêm cách xử lý phù hợp.

**Hàm tính trung bình:**

```cpp
double calculateAverage(
    long long total,
    std::size_t count
)
```

Sử dụng phép chia số thực.

Hàm yêu cầu `count > 0`. Điều kiện đó được bảo đảm tại vị trí gọi trong ví dụ.

**Hàm in báo cáo:**

```cpp
void printReport(...)
```

Chỉ chịu trách nhiệm hiển thị kết quả.

### 21.6. Trường hợp kiểm thử

| Trường hợp | Kết quả mong đợi |
|---|---|
| Một học sinh, điểm 0 | Hợp lệ |
| Một học sinh, điểm 10 | Hợp lệ |
| Nhiều học sinh cùng điểm | Hợp lệ |
| `n = 0` | Từ chối |
| `n < 0` | Từ chối |
| `n > 100000` | Từ chối |
| Điểm âm | Từ chối |
| Điểm lớn hơn 10 | Từ chối |
| Input không phải số | Từ chối |
| Thiếu điểm | Từ chối |

### 21.7. Độ phức tạp

Nhập dữ liệu:

\[
O(n)
\]

Tính tổng:

\[
O(n)
\]

Tìm maximum:

\[
O(n)
\]

Tổng thời gian:

\[
O(n)
\]

Bộ nhớ lưu điểm:

\[
O(n)
\]

Việc chia chương trình thành nhiều hàm không tự động thay đổi bậc độ phức tạp của thuật toán.

### 21.8. Có thể cải thiện thiết kế không?

Có.

Ví dụ hiện tại duyệt vector hai lần để tính tổng và maximum.

Nếu chương trình cần xử lý tập dữ liệu lớn hoặc muốn giảm số lần duyệt, có thể kết hợp hai công việc trong một hàm trả về một `struct`.

Tuy nhiên, đối với bài nhập môn, việc tách hàm theo từng phép tính giúp người học thấy rõ trách nhiệm và cơ chế gọi hàm.

**Bài học:** Chia nhỏ chương trình phải phục vụ tính rõ ràng và khả năng tái sử dụng. Không nên tách hoặc gộp hàm một cách máy móc.

---

## 22. Những lỗi thường gặp

### 22.1. Quên return trong hàm có giá trị trả về

Sai:

```cpp
int add(int a, int b) {
    int result = a + b;
}
```

Nếu hàm đi tới cuối mà không trả về giá trị, chương trình có undefined behavior trong trường hợp thông thường.

Đúng:

```cpp
int add(int a, int b) {
    return a + b;
}
```

### 22.2. Nhầm in kết quả với return

Sai nếu mục tiêu là nhận giá trị:

```cpp
void add(int a, int b) {
    std::cout << a + b << '\n';
}
```

Câu lệnh trên in kết quả nhưng không trả về một giá trị cho người gọi.

Nếu cần sử dụng tiếp kết quả:

```cpp
int add(int a, int b) {
    return a + b;
}
```

### 22.3. Tưởng pass by value có thể sửa biến gốc

Ví dụ:

```cpp
void increase(int value) {
    ++value;
}
```

Lời gọi:

```cpp
int number{10};

increase(number);
```

không thay đổi `number`.

Nếu cần sửa trực tiếp:

```cpp
void increase(int& value) {
    ++value;
}
```

### 22.4. Gọi sai số lượng tham số

Ví dụ:

```cpp
int add(int a, int b) {
    return a + b;
}
```

Lời gọi:

```cpp
add(10);
```

không hợp lệ nếu không có overload hoặc default argument phù hợp.

### 22.5. Gọi hàm trước khi khai báo

Không nên gọi một hàm chưa có khai báo phù hợp tại vị trí gọi.

Có thể giải quyết bằng cách:

- Đặt định nghĩa lên trước.
- Viết function prototype.
- Include header chứa khai báo.

### 22.6. Nhầm phạm vi biến

Ví dụ:

```cpp
if (true) {
    int value{10};
}

std::cout << value;
```

Tên `value` không nằm trong phạm vi của câu lệnh `std::cout`.

### 22.7. Trả reference đến biến local

Sai:

```cpp
int& getValue() {
    int value{10};

    return value;
}
```

Reference trả về không còn hợp lệ để truy cập đối tượng sau khi `value` hết lifetime.

Nếu chỉ cần trả giá trị:

```cpp
int getValue() {
    return 10;
}
```

### 22.8. Chia cho 0 trong hàm

Ví dụ:

```cpp
double divide(double a, double b) {
    return a / b;
}
```

Nếu API yêu cầu từ chối mẫu số bằng 0, cần kiểm tra điều kiện đó.

Đặc biệt, với phép chia số nguyên, chia cho 0 gây undefined behavior.

Không nên để người gọi phải đoán những điều kiện đầu vào quan trọng.

### 22.9. Đặt quá nhiều trách nhiệm trong một hàm

Một hàm quá dài, xử lý nhiều công việc không liên quan thường khó kiểm thử và bảo trì.

Nên xem xét tách hàm khi một nhóm câu lệnh thực hiện một nhiệm vụ có ý nghĩa độc lập.

Tuy nhiên, không cần tạo hàm cho từng phép cộng hoặc từng câu lệnh nếu điều đó làm mã nguồn trở nên khó theo dõi hơn.

---

## 23. Bài tập tự luyện

### Bài 1. Tính bình phương

Viết hàm:

```cpp
int square(int value);
```

Hàm trả về bình phương của `value`.

Ví dụ:

```text
Input:
5

Output:
25
```

**Gợi ý:** Sử dụng toán tử nhân.

**Yêu cầu bổ sung:** Xác định phạm vi đầu vào để phép nhân không tràn `int`.

### Bài 2. Kiểm tra số chẵn

Viết hàm:

```cpp
bool isEven(int value);
```

Hàm trả về `true` nếu số chẵn, ngược lại trả về `false`.

Kiểm thử với:

```text
-4
-3
0
3
4
```

Dự đoán kết quả trước khi chạy chương trình.

### Bài 3. Tìm số lớn nhất

Viết hàm:

```cpp
int maximum(int a, int b);
```

Hàm trả về số lớn hơn trong hai số.

Ví dụ:

```text
Input:
10 20

Output:
20
```

**Yêu cầu:** Không thực hiện nhập xuất trực tiếp bên trong hàm `maximum()`.

### Bài 4. Hoán đổi hai số

Viết hàm:

```cpp
void swapValues(int& a, int& b);
```

Yêu cầu:

- Không trả về giá trị.
- Thay đổi trực tiếp hai biến được truyền vào.
- Sử dụng biến tạm.

Ví dụ:

```text
Before:
10 20

After:
20 10
```

### Bài 5. Kiểm tra điểm hợp lệ

Viết hàm:

```cpp
bool isValidScore(double score);
```

Điểm hợp lệ phải hữu hạn và nằm trong đoạn `[0, 10]`.

**Gợi ý:** Sử dụng `std::isfinite()` trong `<cmath>` để từ chối NaN và infinity.

Kiểm thử các trường hợp biên như `0`, `10`, `-1` và `11`.

### Bài 6. Tính tổng mảng

Viết hàm:

```cpp
long long calculateTotal(
    const std::vector<int>& values
);
```

Hàm tính tổng các phần tử mà không thay đổi vector đầu vào.

**Yêu cầu bổ sung:** Xác định giới hạn dữ liệu hoặc bổ sung kiểm tra để tránh tràn `long long`.

### Bài 7. Phân tích scope

Dự đoán kết quả chương trình:

```cpp
#include <iostream>

int main() {
    int x{10};

    {
        int x{20};

        std::cout << x << '\n';
    }

    std::cout << x << '\n';
}
```

Giải thích:

- Có bao nhiêu biến tên `x`?
- Vì sao hai lệnh in có kết quả khác nhau?
- Khai báo nào che khuất khai báo nào?

### Bài 8. Phân tích lifetime

Xem hàm:

```cpp
const int& getNumber() {
    int number{100};

    return number;
}
```

Trả lời:

1. Hàm có thể được khai báo với kiểu trả về như vậy không?
2. Vì sao reference trả về không hợp lệ để đọc?
3. Lifetime của `number` kết thúc khi nào?
4. Nên thay đổi kiểu trả về như thế nào?

### Bài 9. Tổ chức chương trình

Viết chương trình nhập chiều dài và chiều rộng hình chữ nhật.

Tạo ba hàm:

```cpp
bool isValidRectangle(double width, double height);

double calculateArea(double width, double height);

double calculatePerimeter(double width, double height);
```

Yêu cầu:

- Hai kích thước phải dương và hữu hạn.
- Kiểm tra input.
- Không thực hiện phép tính nếu dữ liệu không hợp lệ.
- Hàm tính toán không trực tiếp in kết quả.
- Kiểm tra kết quả số thực vẫn hữu hạn nếu có nguy cơ vượt phạm vi.

### Bài 10. Chia chương trình lớn thành hàm

Cho một chương trình quản lý điểm học sinh đang chứa toàn bộ logic trong `main()`.

Hãy tách thành các hàm:

```cpp
bool isValidScore(int score);

long long calculateTotal(
    const std::vector<int>& scores
);

int findMaximum(
    const std::vector<int>& scores
);

void printReport(
    long long total,
    double average,
    int maximum
);
```

Sau đó đánh giá:

- Hàm nào nên trả giá trị?
- Hàm nào nên dùng `void`?
- Hàm nào nên nhận `const reference`?
- Những hàm nào cần tiền điều kiện?
- Hàm nào có thể kiểm thử mà không cần nhập xuất?

---

## 24. Tổng kết kiến thức

| Khái niệm | Ý nghĩa |
|---|---|
| Function | Đơn vị mã nguồn thực hiện một nhiệm vụ |
| Function declaration | Khai báo giao diện hàm |
| Function definition | Cung cấp phần triển khai của hàm |
| Function call | Gọi hàm để thực thi |
| Parameter | Tham số trong khai báo/định nghĩa hàm |
| Argument | Đối số tại lời gọi |
| Return type | Kiểu kết quả trả về |
| `return` | Kết thúc lời gọi và có thể trả giá trị |
| `void` | Kiểu không có giá trị trả về |
| Pass by value | Truyền bằng giá trị |
| Pass by reference | Truyền bằng tham chiếu |
| `const T&` | Tham chiếu chỉ đọc thông qua tham số |
| Scope | Phạm vi tên có thể được sử dụng |
| Lifetime | Thời gian tồn tại của đối tượng |
| Local variable | Biến cục bộ |
| Global variable | Biến ở phạm vi toàn cục/namespace phù hợp |
| Shadowing | Khai báo bên trong che khuất tên bên ngoài |
| Static local variable | Biến cục bộ có static storage duration |
| Function overloading | Nhiều hàm cùng tên với danh sách tham số phân biệt phù hợp |
| Recursion | Hàm gọi lại chính nó |

Sau bài học này, bạn cần nắm vững:

1. **Sử dụng hàm để chia nhỏ chương trình thành các phần có trách nhiệm rõ ràng.**
2. **Phân biệt declaration, definition và function call.**
3. **Hiểu rõ sự khác nhau giữa parameter và argument.**
4. **Sử dụng `return` khi cần trả kết quả và `void` khi hàm không trả giá trị.**
5. **Phân biệt truyền tham số theo giá trị và tham chiếu.**
6. **Sử dụng `const T&` khi cần đọc đối tượng lớn mà không sao chép.**
7. **Không nhầm scope với lifetime.**
8. **Không trả pointer hoặc reference đến biến local đã hết lifetime.**
9. **Ưu tiên truyền dữ liệu qua tham số thay vì phụ thuộc không cần thiết vào biến toàn cục.**
10. **Thiết kế hàm dễ đọc, dễ kiểm thử và phù hợp với yêu cầu thực tế.**

**Nguyên tắc quan trọng nhất:** Một hàm tốt phải có mục đích rõ ràng, hợp đồng dễ hiểu và cách xử lý dữ liệu phù hợp.

Không phải hàm càng ngắn càng tốt, cũng không phải chương trình có càng nhiều hàm càng dễ bảo trì.

Mục tiêu là tạo ra cấu trúc mã nguồn giúp người đọc hiểu chương trình hoạt động như thế nào mà không phải theo dõi quá nhiều trạng thái hoặc phụ thuộc không cần thiết.

---

## Đọc tiếp

- [Nhập xuất, điều kiện và vòng lặp](/cpp/bat-dau/nhap-xuat-dieu-kien-vong-lap): Sử dụng điều kiện và vòng lặp trong thân hàm.
- [References và pointers](/cpp/bat-dau/references-pointers): Tìm hiểu sâu hơn về truyền tham chiếu, địa chỉ bộ nhớ, pointer và lifetime.
- [Function overloading và default arguments](/cpp/trung-cap/overloading-default-arguments): Phân biệt overload, tham số mặc định và quy tắc lựa chọn hàm.
- [Đệ quy và call stack](/cpp/trung-cap/de-quy-call-stack): Hiểu cơ chế hàm tự gọi và cách quản lý trạng thái trong quá trình thực thi.
- [Header, source và modules](/cpp/ky-thuat/header-source-modules): Tổ chức mã nguồn nhiều file và tìm hiểu quá trình compile/link.
