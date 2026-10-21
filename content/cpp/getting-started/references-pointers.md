---
title: References và pointers cơ bản trong C++
description: Hướng dẫn tham chiếu, con trỏ, địa chỉ bộ nhớ, truyền tham số, const correctness và cách tránh dangling pointer, dangling reference trong C++17.
slug: /cpp/bat-dau/references-pointers
category: fundamentals
categoryLabel: C++ căn bản
order: 20090
difficulty: beginner
keywords: [reference C++, pointer C++, address, nullptr, dereference, const reference, pass by value, pass by reference, dangling pointer, dangling reference, lifetime]
updated: 2026-10-21
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/bat-dau/ham-pham-vi", "/cpp/bat-dau/mang-string", "/cpp/trung-cap/stack-heap-lifetime", "/cpp/stl/raii-smart-pointers"]
---

# References và pointers cơ bản trong C++

Khi lập trình C++, chúng ta thường truyền dữ liệu giữa các hàm, thay đổi giá trị của biến hoặc làm việc trực tiếp với các đối tượng đã tồn tại.

Một cách đơn giản là tạo bản sao dữ liệu. Tuy nhiên, không phải lúc nào sao chép cũng cần thiết hoặc phù hợp.

C++ cung cấp hai cơ chế quan trọng:

- **Reference (tham chiếu):** Cho phép sử dụng một tên khác để truy cập đối tượng đã tồn tại.
- **Pointer (con trỏ):** Là một giá trị có thể chứa địa chỉ của đối tượng hoặc hàm, hoặc biểu diễn trạng thái không trỏ đến đối tượng nào.

Hai cơ chế này được sử dụng rộng rãi trong hàm, cấu trúc dữ liệu, thư viện chuẩn và các hệ thống phần mềm.

Tuy nhiên, sử dụng sai reference hoặc pointer có thể gây ra những lỗi khó phát hiện như truy cập bộ nhớ không hợp lệ, dangling reference hoặc undefined behavior.

Bài học này giúp bạn hiểu:

1. Địa chỉ bộ nhớ và đối tượng trong C++.
2. Sự khác biệt giữa truyền giá trị và truyền tham chiếu.
3. Cách khai báo và sử dụng reference.
4. Cách khai báo và sử dụng pointer.
5. Vai trò của `const` và `nullptr`.
6. Phạm vi, thời gian sống và nguy cơ dangling.
7. Cách lựa chọn phương thức truyền tham số phù hợp.
8. Những lỗi thường gặp và cách phòng tránh.

**Tiêu chuẩn sử dụng:** C++17.

---

## 1. Đối tượng và địa chỉ bộ nhớ

### 1.1. Đối tượng trong C++

Khi khai báo:

```cpp
int score{10};
```

Chương trình tạo một đối tượng có kiểu `int`, được truy cập thông qua tên `score`.

Đối tượng này có:

- Kiểu dữ liệu là `int`.
- Giá trị hiện tại là `10`.
- Vị trí lưu trữ theo cách triển khai của chương trình.
- Thời gian sống được xác định bởi các quy tắc C++.

Trong những tình huống thông thường, một đối tượng có địa chỉ bộ nhớ mà chương trình có thể lấy bằng toán tử `&`.

### 1.2. Toán tử lấy địa chỉ (&)

Sử dụng toán tử `&` để lấy địa chỉ của biến:

```cpp
#include <iostream>

int main() {
    int score{10};

    std::cout << score << '\n';
    std::cout << &score << '\n';

    return 0;
}
```

Ví dụ kết quả:

```text
10
0x7ffd4a3b1c2c
```

Địa chỉ hiển thị chỉ mang tính minh họa.

Địa chỉ thực tế có thể khác giữa các lần chạy, hệ điều hành, compiler và môi trường thực thi.

**Phân biệt:**

```cpp
score
```

Biểu thức dùng để truy cập giá trị của đối tượng `score`.

```cpp
&score
```

Biểu thức lấy địa chỉ của đối tượng `score`.

Toán tử `&` trong ngữ cảnh này là *address-of operator*.

Không nhầm với dấu `&` dùng trong khai báo reference hoặc toán tử bitwise AND.

### 1.3. Minh họa mối quan hệ

Giả sử biến `score` được lưu tại một địa chỉ:

```text
Variable: score
Type:     int
Value:    10
Address:  0x1000
```

Một pointer có thể lưu địa chỉ đó:

```text
score
+----------+
|    10    |  Address: 0x1000
+----------+
     ^
     |
     |
pointer
+----------+
|  0x1000  |
+----------+
```

Sơ đồ chỉ minh họa quan hệ giữa pointer và đối tượng. Nó không mô tả bố cục bộ nhớ thực tế của mọi hệ thống.

Điều quan trọng là: **Địa chỉ không phải giá trị của đối tượng.**

---

## 2. Truyền tham số theo giá trị

Trước khi tìm hiểu reference và pointer, cần hiểu cơ chế truyền tham số thông thường.

### 2.1. Pass by value

Khi truyền tham số bằng giá trị (*pass by value*), tham số của hàm được khởi tạo từ đối số được truyền vào.

Với các kiểu dữ liệu cơ bản như `int`, có thể hiểu đơn giản rằng hàm nhận một bản sao của giá trị.

Ví dụ:

```cpp
#include <iostream>

void addBonus(int score) {
    score += 5;
}

int main() {
    int score{10};

    addBonus(score);

    std::cout << score << '\n';

    return 0;
}
```

Kết quả:

```text
10
```

**Tại sao giá trị không thay đổi?**

Hàm `addBonus()` nhận một biến tham số riêng:

```cpp
void addBonus(int score)
```

Khi gọi:

```cpp
addBonus(score);
```

Giá trị `10` được truyền vào tham số `score` của hàm.

Sau đó:

```cpp
score += 5;
```

chỉ thay đổi tham số bên trong hàm.

Biến `score` trong `main()` vẫn có giá trị `10`.

### 2.2. Minh họa truyền giá trị

```text
main()
  score = 10
      |
      | Truyen gia tri
      v
addBonus()
  score = 10
  score += 5
  score = 15

Ket thuc ham

main()
  score = 10
```

Hai biến không phải cùng một đối tượng.

### 2.3. Khi nào nên truyền giá trị?

Pass by value thường phù hợp với các kiểu nhỏ:

```cpp
int
bool
char
double
```

Ví dụ:

```cpp
int square(int number) {
    return number * number;
}
```

Đối với các đối tượng lớn như `std::string` hoặc `std::vector`, việc sao chép có thể tốn thêm tài nguyên.

Tuy nhiên, truyền giá trị không phải lúc nào cũng chậm. Một số kiểu được tối ưu tốt, và việc truyền giá trị có thể là lựa chọn phù hợp khi hàm cần sở hữu bản sao hoặc thay đổi dữ liệu độc lập.

---

## 3. Reference là gì?

Reference (tham chiếu) cho phép một tên được liên kết với một đối tượng đã tồn tại.

Trong phần cơ bản, chúng ta tập trung vào **lvalue reference**, được khai báo bằng `T&`.

### 3.1. Khai báo reference

Cú pháp:

```cpp
Type& name = object;
```

Ví dụ:

```cpp
int score{10};

int& ref = score;
```

Trong đó:

- `score` là biến gốc.
- `ref` là reference được liên kết với `score`.
- `int&` là kiểu tham chiếu đến `int`.

Reference không tạo ra một đối tượng `int` thứ hai.

Nó cho phép truy cập chính đối tượng `score`.

### 3.2. Thay đổi giá trị qua reference

```cpp
#include <iostream>

int main() {
    int score{10};

    int& ref = score;

    ref = 20;

    std::cout << score << '\n';
    std::cout << ref << '\n';

    return 0;
}
```

Kết quả:

```text
20
20
```

Khi thực hiện:

```cpp
ref = 20;
```

C++ gán giá trị `20` cho đối tượng mà `ref` đang tham chiếu.

Vì `ref` liên kết với `score`, giá trị của `score` cũng thay đổi.

### 3.3. Minh họa reference

```text
score ─────┐
           v
        +------+
        |  10  |
        +------+
           ^
ref ───────┘
```

Cả `score` và `ref` đều cho phép truy cập cùng một đối tượng.

Không nên hiểu sơ đồ này là reference bắt buộc được lưu bằng một con trỏ trong bộ nhớ. C++ không quy định reference phải có một cấu trúc lưu trữ cụ thể.

### 3.4. Reference phải được khởi tạo

Ví dụ không hợp lệ:

```cpp
int& ref;
```

Một lvalue reference thông thường phải được liên kết với đối tượng hoặc thực thể phù hợp ngay khi khởi tạo.

Cách đúng:

```cpp
int value{10};

int& ref = value;
```

### 3.5. Reference không thể được liên kết lại

Xét:

```cpp
int a{10};
int b{20};

int& ref = a;
```

Sau đó:

```cpp
ref = b;
```

Câu lệnh này **không chuyển reference sang tham chiếu biến `b`**.

Nó thực hiện phép gán giá trị của `b` cho `a`.

Kết quả:

```text
a = 20
b = 20
```

`ref` vẫn tham chiếu đến `a`.

Đây là một trong những khác biệt quan trọng giữa reference và pointer.

---

## 4. Truyền tham số bằng reference

### 4.1. Pass by reference

Truyền tham số bằng reference cho phép hàm thao tác trên đối tượng được truyền vào mà không cần tạo bản sao đối tượng đó.

Ví dụ:

```cpp
#include <iostream>

void addBonus(int& score) {
    score += 5;
}

int main() {
    int score{10};

    addBonus(score);

    std::cout << score << '\n';

    return 0;
}
```

Kết quả:

```text
15
```

Hàm:

```cpp
void addBonus(int& score)
```

nhận một reference đến đối tượng do người gọi cung cấp.

Vì vậy:

```cpp
score += 5;
```

thay đổi trực tiếp biến `score` trong `main()`.

### 4.2. So sánh pass by value và pass by reference

| Đặc điểm | Pass by value | Pass by reference |
|---|---|---|
| Tham số là đối tượng riêng | Có | Không, tham số là tham chiếu |
| Có thể thay đổi biến gốc qua tham số | Không | Có, với reference không const |
| Phải sao chép đối tượng | Theo ngữ nghĩa truyền giá trị, có thể được tối ưu | Không |
| Phù hợp với kiểu nhỏ | Rất tốt | Tùy mục đích |
| Phù hợp khi cần sửa đối tượng gốc | Không | Có |

Ví dụ hai hàm:

```cpp
void updateValue(int value) {
    value = 100;
}

void updateReference(int& value) {
    value = 100;
}
```

Trong trường hợp cần sửa trực tiếp biến của người gọi, `updateReference()` thể hiện mục đích rõ ràng hơn.

### 4.3. Ví dụ đổi chỗ hai số

Một ứng dụng phổ biến của reference là hoán đổi giá trị.

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

    return 0;
}
```

Kết quả:

```text
20 10
```

**Phân tích:**

Ban đầu:

```text
x = 10
y = 20
```

Sau:

```cpp
int temp{a};
```

Ta có:

```text
temp = 10
```

Tiếp theo:

```cpp
a = b;
```

Kết quả:

```text
x = 20
```

Cuối cùng:

```cpp
b = temp;
```

Kết quả:

```text
y = 10
```

Hai giá trị được hoán đổi thành công.

Trong chương trình thực tế, C++ đã cung cấp `std::swap()` trong thư viện `<utility>`:

```cpp
#include <utility>

std::swap(x, y);
```

Không cần tự viết hàm hoán đổi cho mọi trường hợp. Ví dụ trên nhằm minh họa cơ chế reference.

---

## 5. const reference

Không phải hàm nào nhận reference cũng cần sửa dữ liệu.

Đôi khi chúng ta chỉ muốn đọc một đối tượng lớn mà không tạo bản sao.

### 5.1. Khai báo const reference

Cú pháp:

```cpp
const Type& name = object;
```

Ví dụ:

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

### 5.2. Tại sao sử dụng const T&?

Xét hàm:

```cpp
void printName(std::string name);
```

Tham số `name` được truyền bằng giá trị.

Với đối số là một chuỗi hiện có, việc truyền theo giá trị thường tạo một đối tượng `std::string` riêng, có thể cần sao chép dữ liệu.

Trong khi đó:

```cpp
void printName(const std::string& name);
```

không yêu cầu sao chép đối tượng chuỗi chỉ để đọc nội dung.

Điều này đặc biệt hữu ích đối với những đối tượng có chi phí sao chép đáng kể:

```cpp
std::string
std::vector<int>
std::map<int, int>
```

### 5.3. const ngăn sửa dữ liệu thông qua reference

Ví dụ:

```cpp
void update(const int& value) {
    value = 100;
}
```

Hàm trên không hợp lệ.

Nguyên nhân là `value` là tham chiếu đến `const int`.

Không thể sửa đối tượng thông qua tham chiếu này.

Tuy nhiên, `const T&` không nhất thiết khiến bản thân đối tượng gốc trở thành bất biến.

Nếu đối tượng gốc không phải `const`, nó vẫn có thể được sửa thông qua một tên hoặc tham chiếu không const khác.

### 5.4. const reference và temporary object

Một `const T&` cũng có thể liên kết với đối tượng tạm thời phù hợp.

Ví dụ:

```cpp
#include <iostream>
#include <string>

void printName(const std::string& name) {
    std::cout << name << '\n';
}

int main() {
    printName(std::string{"An"});
}
```

Trong ví dụ này, đối tượng chuỗi tạm thời vẫn tồn tại trong thời gian lời gọi hàm sử dụng nó.

C++ có các quy tắc kéo dài thời gian sống của temporary trong một số trường hợp liên kết reference.

Tuy nhiên, điều đó **không có nghĩa có thể tùy ý lưu hoặc trả về reference đến temporary**.

Cần xét đúng ngữ cảnh lifetime trước khi giữ reference lâu dài.

### 5.5. Khi nào dùng T& và const T&?

| Kiểu tham số | Mục đích |
|---|---|
| `T&` | Hàm cần thay đổi đối tượng |
| `const T&` | Hàm chỉ cần đọc đối tượng mà không sao chép |
| `T` | Hàm cần giá trị độc lập hoặc bản sao |

Đối với kiểu nhỏ như `int`, truyền bằng giá trị thường đơn giản hơn `const int&` nếu hàm chỉ cần đọc.

---

## 6. Pointer là gì?

Pointer (con trỏ) là một đối tượng có kiểu con trỏ, có thể chứa địa chỉ của một đối tượng hoặc biểu diễn các trạng thái đặc biệt như null.

Khác với reference, pointer có thể được gán lại để trỏ đến đối tượng khác.

### 6.1. Khai báo pointer

Cú pháp:

```cpp
Type* pointerName;
```

Ví dụ:

```cpp
int score{10};

int* pointer = &score;
```

Trong đó:

- `int*` là kiểu con trỏ đến `int`.
- `pointer` là tên biến con trỏ.
- `&score` lấy địa chỉ của biến `score`.

Biến `pointer` chứa địa chỉ của `score`.

### 6.2. Truy cập đối tượng qua pointer

Để truy cập đối tượng mà pointer đang trỏ đến, sử dụng toán tử `*`.

Toán tử này được gọi là *dereference operator*.

Ví dụ:

```cpp
#include <iostream>

int main() {
    int score{10};

    int* pointer = &score;

    std::cout << *pointer << '\n';

    return 0;
}
```

Kết quả:

```text
10
```

Ở đây:

```cpp
pointer
```

là biến con trỏ chứa địa chỉ.

Còn:

```cpp
*pointer
```

là biểu thức truy cập đối tượng được con trỏ trỏ đến.

### 6.3. Thay đổi giá trị qua pointer

```cpp
#include <iostream>

int main() {
    int score{10};

    int* pointer = &score;

    *pointer = 20;

    std::cout << score << '\n';

    return 0;
}
```

Kết quả:

```text
20
```

Câu lệnh:

```cpp
*pointer = 20;
```

thay đổi đối tượng `score`, không phải địa chỉ được lưu trong biến `pointer`.

### 6.4. Phân biệt & và *

Hai toán tử này có ý nghĩa phụ thuộc ngữ cảnh.

```cpp
int score{10};

int* pointer = &score;
```

Trong đó:

```cpp
&score
```

Lấy địa chỉ của biến.

```cpp
*pointer
```

Truy cập đối tượng mà con trỏ trỏ đến.

Ví dụ:

```text
score       -> 10
&score      -> Dia chi cua score
pointer     -> Dia chi cua score
*pointer    -> 10
```

Lưu ý `*` cũng là toán tử nhân trong biểu thức số học, còn `&` có thể là toán tử bitwise AND. Compiler phân biệt chúng theo ngữ cảnh cú pháp.

---

## 7. Pointer có thể thay đổi đối tượng đích

Đây là điểm khác biệt lớn so với reference.

Ví dụ:

```cpp
#include <iostream>

int main() {
    int a{10};
    int b{20};

    int* pointer = &a;

    std::cout << *pointer << '\n';

    pointer = &b;

    std::cout << *pointer << '\n';

    return 0;
}
```

Kết quả:

```text
10
20
```

Ban đầu:

```cpp
int* pointer = &a;
```

Con trỏ trỏ đến `a`.

Sau đó:

```cpp
pointer = &b;
```

Con trỏ được cập nhật để trỏ đến `b`.

**So sánh với reference:**

```cpp
int a{10};
int b{20};

int& ref = a;

ref = b;
```

Trong ví dụ reference, `ref` không đổi đối tượng đích. Thay vào đó, giá trị của `b` được gán cho `a`.

---

## 8. nullptr và con trỏ null

Không phải lúc nào pointer cũng trỏ đến một đối tượng hợp lệ.

C++11 giới thiệu `nullptr`, và tính năng này tiếp tục được sử dụng trong C++17.

### 8.1. Khởi tạo pointer bằng nullptr

```cpp
int* pointer{nullptr};
```

Lúc này, pointer không trỏ đến đối tượng `int` nào.

`nullptr` là một null pointer literal có kiểu `std::nullptr_t`.

Nó phù hợp hơn việc sử dụng số nguyên `0` hoặc macro `NULL` trong mã C++ hiện đại.

### 8.2. Kiểm tra trước khi dereference

Ví dụ:

```cpp
#include <iostream>

int main() {
    int score{10};

    int* pointer{nullptr};

    if (pointer != nullptr) {
        std::cout << *pointer << '\n';
    } else {
        std::cout << "Pointer is null\n";
    }

    pointer = &score;

    if (pointer != nullptr) {
        std::cout << *pointer << '\n';
    }

    return 0;
}
```

Kết quả:

```text
Pointer is null
10
```

### 8.3. Không dereference nullptr

Ví dụ không an toàn:

```cpp
int* pointer{nullptr};

std::cout << *pointer;
```

Dereference null pointer gây ra hành vi không xác định.

Chương trình có thể bị crash, nhưng tiêu chuẩn C++ không đảm bảo rằng mọi trường hợp đều sinh ra một lỗi rõ ràng.

### 8.4. Kiểm tra null chưa đủ để đảm bảo an toàn

Xét:

```cpp
if (pointer != nullptr) {
    use(*pointer);
}
```

Điều kiện chỉ kiểm tra rằng pointer không ở trạng thái null.

Nó **không chứng minh** rằng pointer đang trỏ đến một đối tượng còn sống và hợp lệ.

Một pointer có thể không null nhưng đã trở thành dangling pointer.

Đây là lý do kiểm tra lifetime quan trọng không kém kiểm tra `nullptr`.

---

## 9. Truyền tham số bằng pointer

Một hàm cũng có thể nhận địa chỉ đối tượng thông qua pointer.

### 9.1. Ví dụ thay đổi giá trị

```cpp
#include <iostream>

void addBonus(int* score) {
    if (score == nullptr) {
        return;
    }

    *score += 5;
}

int main() {
    int score{10};

    addBonus(&score);

    std::cout << score << '\n';

    return 0;
}
```

Kết quả:

```text
15
```

Phân tích:

```cpp
addBonus(&score);
```

Truyền địa chỉ của `score`.

```cpp
void addBonus(int* score)
```

Nhận một con trỏ đến `int`.

```cpp
*score += 5;
```

Thay đổi đối tượng được con trỏ trỏ đến.

### 9.2. Pointer có thể biểu diễn tham số tùy chọn

Ví dụ:

```cpp
#include <iostream>

void printScore(const int* score) {
    if (score == nullptr) {
        std::cout << "No score\n";
        return;
    }

    std::cout << *score << '\n';
}

int main() {
    int score{95};

    printScore(&score);
    printScore(nullptr);

    return 0;
}
```

Kết quả:

```text
95
No score
```

Hàm hỗ trợ hai trường hợp:

- Có đối tượng `score`.
- Không có đối tượng nào được cung cấp.

Vì vậy, pointer phù hợp khi trạng thái không có đối tượng là một phần hợp lệ của API.

### 9.3. Pointer được truyền bằng giá trị

Một điểm quan trọng: khi viết:

```cpp
void update(int* pointer)
```

thì bản thân biến con trỏ được truyền bằng giá trị.

Hàm nhận một bản sao của giá trị con trỏ.

Ví dụ:

```cpp
void resetPointer(int* pointer) {
    pointer = nullptr;
}
```

Khi gọi:

```cpp
int value{10};
int* pointer = &value;

resetPointer(pointer);
```

Biến `pointer` trong hàm gọi vẫn trỏ đến `value`.

Bởi vì `resetPointer()` chỉ thay đổi bản sao của con trỏ.

Ngược lại, nếu hàm thực hiện:

```cpp
*pointer = 20;
```

thì đối tượng được trỏ đến có thể thay đổi.

Cần phân biệt **thay đổi con trỏ** với **thay đổi đối tượng mà con trỏ trỏ đến**.

---

## 10. const và pointer

Khi sử dụng pointer, vị trí của `const` rất quan trọng.

### 10.1. Pointer đến đối tượng const

Ví dụ:

```cpp
int a{10};
int b{20};

const int* pointer = &a;
```

Có thể chuyển pointer sang đối tượng khác:

```cpp
pointer = &b;
```

Nhưng không thể sửa đối tượng thông qua pointer này:

```cpp
*pointer = 30;
```

Dòng trên không hợp lệ.

Cách khai báo tương đương:

```cpp
int const* pointer = &a;
```

### 10.2. Const pointer

Ví dụ:

```cpp
int a{10};
int b{20};

int* const pointer = &a;
```

Con trỏ được cố định sau khi khởi tạo.

Không thể gán lại:

```cpp
pointer = &b;
```

Nhưng có thể sửa đối tượng:

```cpp
*pointer = 30;
```

Kết quả:

```text
a = 30
```

### 10.3. Const pointer đến const object

```cpp
int a{10};

const int* const pointer = &a;
```

Trong trường hợp này:

- Không thể gán lại pointer.
- Không thể sửa `a` thông qua pointer.

### 10.4. Bảng so sánh

| Khai báo | Đổi đối tượng đích | Sửa dữ liệu qua pointer |
|---|---|---|
| `int* p` | Có | Có |
| `const int* p` | Có | Không |
| `int* const p` | Không | Có |
| `const int* const p` | Không | Không |

Các dòng chứa `const` pointer phải được khởi tạo phù hợp ngay khi khai báo.

Ví dụ:

```cpp
int value{10};

int* const pointer = &value;
```

Khi đọc khai báo con trỏ, cần xác định `const` áp dụng cho bản thân con trỏ hay đối tượng được trỏ đến.

---

## 11. So sánh reference và pointer

Reference và pointer đều cho phép truy cập một đối tượng gián tiếp, nhưng có ngữ nghĩa khác nhau.

| Đặc điểm | Reference | Pointer |
|---|---|---|
| Cú pháp khai báo cơ bản | `T&` | `T*` |
| Phải khởi tạo khi khai báo | Có với reference thông thường | Không bắt buộc, nhưng nên khởi tạo |
| Có thể biểu diễn null hợp lệ | Không | Có |
| Có thể đổi đối tượng đích | Không | Có |
| Cần dereference tường minh | Không | Có |
| Có thể dùng để sửa đối tượng | Có | Có |
| Tự quản lý lifetime | Không | Không |
| Mặc định thể hiện ownership | Không | Không |
| Phù hợp tham số bắt buộc | Tốt | Có thể |
| Phù hợp tham số tùy chọn | Không trực tiếp | Tốt |

### 11.1. Ví dụ tổng hợp

```cpp
#include <iostream>

int main() {
    int value{10};

    int& ref = value;
    int* ptr = &value;

    ref += 5;
    *ptr += 5;

    std::cout << value << '\n';

    return 0;
}
```

Kết quả:

```text
20
```

Cả reference và pointer đều thao tác trên cùng một đối tượng `value`.

### 11.2. Nên sử dụng loại nào?

Nếu một hàm luôn yêu cầu đối tượng hợp lệ:

```cpp
void update(Player& player);
```

Reference thường thể hiện ý định rõ ràng.

Nếu đối tượng có thể không tồn tại:

```cpp
void update(Player* player);
```

Pointer có thể biểu diễn trạng thái `nullptr`.

Nếu hàm chỉ đọc:

```cpp
void inspect(const Player& player);
```

Có thể dùng `const reference` để tránh sao chép đối tượng lớn.

Các ví dụ trên giả định kiểu `Player` đã được định nghĩa.

**Lưu ý:** Không nên sử dụng pointer chỉ vì nghĩ rằng nó luôn nhanh hơn reference. Hiệu năng còn phụ thuộc vào kiểu dữ liệu, cách sử dụng và tối ưu hóa của compiler.

---

## 12. Lifetime của đối tượng

Để sử dụng reference hoặc pointer an toàn, cần hiểu đối tượng mà chúng truy cập tồn tại trong bao lâu.

### 12.1. Lifetime là gì?

Lifetime là khoảng thời gian đối tượng tồn tại theo các quy tắc của C++.

Ví dụ:

```cpp
void calculate() {
    int result{100};
}
```

Biến `result` có automatic storage duration.

Trong trường hợp này, đối tượng được tạo khi thực thi đến khai báo và kết thúc lifetime khi rời khỏi khối tương ứng.

Không thể tiếp tục sử dụng một reference hoặc pointer để truy cập đối tượng sau khi lifetime của nó kết thúc.

### 12.2. Reference không kéo dài lifetime trong mọi trường hợp

Ví dụ:

```cpp
int& getValue() {
    int value{10};

    return value;
}
```

Hàm trên trả về reference đến biến cục bộ `value`.

Khi hàm kết thúc, đối tượng `value` cũng hết lifetime.

Reference trả về trở thành dangling reference.

Nếu người gọi sử dụng reference để truy cập đối tượng đã hết lifetime, chương trình có hành vi không xác định.

### 12.3. Pointer cũng không quản lý lifetime

Ví dụ:

```cpp
int* getValue() {
    int value{10};

    return &value;
}
```

Hàm trả về địa chỉ của biến cục bộ.

Nhưng khi hàm kết thúc, đối tượng `value` không còn tồn tại.

Con trỏ trả về không còn trỏ đến một đối tượng `int` còn sống hợp lệ.

**Điều quan trọng:** Pointer không tự giữ cho đối tượng tồn tại.

Reference cũng không tự đảm bảo rằng đối tượng được tham chiếu luôn còn sống.

### 12.4. Cách xử lý an toàn

Nếu muốn trả về một giá trị độc lập:

```cpp
int getValue() {
    int value{10};

    return value;
}
```

Đối với `int`, trả về bằng giá trị thường đơn giản và an toàn.

C++ hiện đại cũng có những cơ chế tối ưu hóa việc trả về đối tượng bằng giá trị, bao gồm copy elision và move semantics.

Không nên mặc định rằng trả về bằng reference luôn nhanh hơn hoặc tốt hơn.

---

## 13. Dangling pointer và dangling reference

Dangling xảy ra khi một reference hoặc pointer không còn liên kết với đối tượng hợp lệ để sử dụng như dự định.

Đây là nguồn gốc của nhiều lỗi bộ nhớ nghiêm trọng.

### 13.1. Dangling pointer

Ví dụ không an toàn:

```cpp
int* pointer{nullptr};

{
    int value{10};
    pointer = &value;
}

// value da het lifetime
// Khong duoc dereference pointer.
```

Sau khi rời khỏi khối:

```cpp
{
    int value{10};
}
```

Đối tượng `value` đã kết thúc lifetime.

Pointer trước đó không còn an toàn để dereference.

### 13.2. Dangling reference

Ví dụ:

```cpp
const int& getValue() {
    int value{10};

    return value;
}
```

Reference trả về không còn hợp lệ để truy cập giá trị của biến cục bộ đã bị hủy.

Không nên trả về reference đến những đối tượng mà thời gian sống không đủ dài.

### 13.3. nullptr và dangling khác nhau

| Trạng thái | Ý nghĩa |
|---|---|
| Null pointer | Không trỏ đến đối tượng nào |
| Valid pointer | Trỏ đến đối tượng hoặc thực thể hợp lệ trong ngữ cảnh sử dụng |
| Dangling pointer | Đã mất hiệu lực đối với đối tượng trước đó |
| Valid reference | Liên kết với thực thể hợp lệ |
| Dangling reference | Thực thể được tham chiếu không còn hợp lệ để truy cập |

Một dangling pointer không nhất thiết có giá trị `nullptr`.

Vì vậy:

```cpp
if (pointer != nullptr)
```

không đủ để bảo đảm dereference an toàn.

### 13.4. Ba nguyên tắc bảo vệ lifetime

**Thứ nhất:** Không trả về reference hoặc pointer đến biến cục bộ sắp hết lifetime.

**Thứ hai:** Không lưu pointer/reference lâu hơn thời gian sống của đối tượng mà nó truy cập.

**Thứ ba:** Khi container hoặc đối tượng sở hữu dữ liệu thay đổi, cần kiểm tra xem các địa chỉ, reference và iterator cũ còn hợp lệ hay không.

---

## 14. Pointer, reference và std::vector

Một vấn đề thực tế thường gặp là lưu địa chỉ của phần tử trong `std::vector`.

### 14.1. Truy cập phần tử bằng reference

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> values{10, 20, 30};

    int& first = values[0];

    first = 100;

    std::cout << values[0] << '\n';

    return 0;
}
```

Kết quả:

```text
100
```

Reference `first` liên kết với phần tử đầu tiên của vector.

### 14.2. Truy cập phần tử bằng pointer

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> values{10, 20, 30};

    int* pointer = &values[0];

    *pointer = 100;

    std::cout << values[0] << '\n';

    return 0;
}
```

Kết quả:

```text
100
```

Trong hai ví dụ trên, vector không thay đổi cấu trúc theo cách làm mất hiệu lực reference hoặc pointer đang sử dụng.

### 14.3. Nguy cơ reallocation

`std::vector` lưu các phần tử liên tiếp trong bộ nhớ.

Khi cần tăng capacity, vector có thể cấp phát một vùng lưu trữ mới và di chuyển hoặc sao chép các phần tử sang đó.

Ví dụ:

```cpp
std::vector<int> values{10, 20, 30};

int* pointer = &values[0];

values.push_back(40);
```

Nếu `push_back()` khiến vector reallocate, pointer trước đó sẽ mất hiệu lực.

Không được tiếp tục dereference pointer ấy.

**Quan trọng:** Không phải mọi lần gọi `push_back()` đều reallocate. Điều này phụ thuộc vào capacity hiện tại.

### 14.4. Lựa chọn an toàn hơn

Nếu chỉ cần phần tử theo vị trí, có thể lưu chỉ số thay vì giữ địa chỉ lâu dài.

Ví dụ:

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> values{10, 20, 30};

    const std::size_t index{0};

    values.push_back(40);

    if (index < values.size()) {
        std::cout << values[index] << '\n';
    }

    return 0;
}
```

Kết quả:

```text
10
```

Cách này không phụ thuộc vào địa chỉ bộ nhớ cũ.

Tuy nhiên, chỉ số cũng không phải một định danh ổn định nếu chương trình thêm hoặc xóa phần tử ở những vị trí làm thay đổi thứ tự.

Ví dụ, xóa phần tử đầu tiên sẽ khiến các phần tử phía sau dịch chuyển vị trí.

**Nguyên tắc:** Chọn cách tham chiếu dữ liệu dựa trên những thay đổi mà container có thể thực hiện.

---

## 15. Pointer và mảng

Mảng trong C++ có quan hệ chặt chẽ với pointer, nhưng mảng và pointer không phải cùng một kiểu.

### 15.1. Mảng cơ bản

```cpp
int numbers[3]{10, 20, 30};
```

Truy cập bằng chỉ số:

```cpp
numbers[0];
numbers[1];
numbers[2];
```

### 15.2. Pointer đến phần tử

```cpp
int numbers[3]{10, 20, 30};

int* pointer = numbers;
```

Trong biểu thức trên, tên mảng được chuyển đổi thành pointer đến phần tử đầu tiên.

Có thể truy cập:

```cpp
*pointer
```

Kết quả là `10`.

Hoặc:

```cpp
*(pointer + 1)
```

Kết quả là `20`.

### 15.3. Pointer arithmetic

Đối với con trỏ trỏ đến phần tử của mảng, cộng một đơn vị sẽ di chuyển đến phần tử tiếp theo, không phải đơn giản tăng địa chỉ lên một byte.

Ví dụ:

```cpp
int numbers[3]{10, 20, 30};

int* pointer = numbers;

++pointer;
```

Lúc này, pointer trỏ đến `numbers[1]`.

Cần chú ý giới hạn mảng. Việc tạo và sử dụng pointer ngoài phạm vi cho phép có thể gây hành vi không xác định.

### 15.4. Ưu tiên container hiện đại

Trong mã C++17, khi phù hợp, nên ưu tiên:

```cpp
std::array<int, 3> numbers{10, 20, 30};
```

hoặc:

```cpp
std::vector<int> numbers{10, 20, 30};
```

Các container này cung cấp giao diện rõ ràng hơn để quản lý kích thước và thao tác với dữ liệu.

Pointer vẫn cần thiết để hiểu hoạt động của mảng, các API cấp thấp và một số cấu trúc dữ liệu.

---

## 16. Reference trong vòng lặp

Range-based `for` là một nơi reference được sử dụng rất phổ biến.

### 16.1. Duyệt bằng giá trị

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> values{1, 2, 3};

    for (int value : values) {
        value *= 2;
    }

    for (int value : values) {
        std::cout << value << ' ';
    }
}
```

Kết quả:

```text
1 2 3
```

Ở vòng lặp đầu tiên, `value` là biến riêng nhận giá trị phần tử.

Thay đổi `value` không làm thay đổi phần tử trong vector.

### 16.2. Duyệt bằng reference

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> values{1, 2, 3};

    for (int& value : values) {
        value *= 2;
    }

    for (int value : values) {
        std::cout << value << ' ';
    }
}
```

Kết quả:

```text
2 4 6
```

Ở đây:

```cpp
int& value
```

là reference đến từng phần tử.

Vì vậy, phép gán tác động trực tiếp lên vector.

### 16.3. Duyệt chỉ đọc

Nếu không cần sửa phần tử:

```cpp
for (const auto& value : values) {
    std::cout << value << '\n';
}
```

Cách này thường được sử dụng khi phần tử là các đối tượng lớn hoặc phức tạp.

### 16.4. Bảng lựa chọn

| Cú pháp | Hành vi |
|---|---|
| `auto item` | Nhận giá trị riêng của từng phần tử |
| `auto& item` | Tham chiếu để có thể sửa phần tử |
| `const auto& item` | Tham chiếu chỉ đọc |
| `auto&& item` | Forwarding reference trong ngữ cảnh suy luận phù hợp |

`auto&&` liên quan đến những quy tắc suy luận kiểu và value category nâng cao. Người mới nên nắm chắc ba cách đầu tiên trước.

---

## 17. Reference, pointer và quyền sở hữu

Một khái niệm quan trọng trong thiết kế C++ hiện đại là **ownership**, tức trách nhiệm quản lý vòng đời tài nguyên.

### 17.1. Reference không thể hiện quyền sở hữu

Ví dụ:

```cpp
void printScore(const int& score) {
    std::cout << score << '\n';
}
```

Hàm chỉ sử dụng đối tượng được truyền vào.

Thông thường, người gọi vẫn chịu trách nhiệm bảo đảm đối tượng còn sống trong thời gian hàm sử dụng nó.

### 17.2. Raw pointer không mặc định sở hữu dữ liệu

Ví dụ:

```cpp
void update(int* value) {
    if (value != nullptr) {
        ++(*value);
    }
}
```

Hàm nhận một pointer để truy cập dữ liệu.

Không nên tự động hiểu rằng hàm có quyền giải phóng vùng nhớ mà pointer trỏ đến.

Nếu API chuyển giao ownership bằng raw pointer, hợp đồng sử dụng phải mô tả rõ. Trong C++ hiện đại, nên ưu tiên những kiểu biểu diễn ownership tường minh.

### 17.3. Smart pointer

C++ cung cấp smart pointer trong `<memory>`:

| Kiểu | Vai trò |
|---|---|
| `std::unique_ptr<T>` | Quản lý đối tượng với quyền sở hữu độc quyền |
| `std::shared_ptr<T>` | Chia sẻ quyền sở hữu |
| `std::weak_ptr<T>` | Quan sát đối tượng được quản lý bằng shared_ptr mà không tăng quyền sở hữu |

Ví dụ:

```cpp
#include <memory>

int main() {
    auto value = std::make_unique<int>(42);
}
```

Đối tượng được quản lý sẽ được hủy tự động khi `unique_ptr` sở hữu cuối cùng của nó kết thúc lifetime, theo cơ chế quản lý tương ứng.

Trong ví dụ này, `unique_ptr` là chủ sở hữu duy nhất.

### 17.4. Không lạm dụng cấp phát động

Không nên viết:

```cpp
int* value = new int{42};
```

chỉ để lưu một số nguyên thông thường.

Thay vào đó:

```cpp
int value{42};
```

đơn giản hơn và không yêu cầu quản lý cấp phát động.

**Nguyên tắc:** Reference và raw pointer thường phù hợp để truy cập dữ liệu không sở hữu. Khi cần quản lý quyền sở hữu động, nên cân nhắc RAII và smart pointer.

Nội dung chuyên sâu nằm trong bài [RAII và smart pointers](/cpp/stl/raii-smart-pointers).

---

## 18. Cách chọn phương thức truyền tham số

Không nên mặc định truyền mọi tham số bằng reference hoặc pointer.

Lựa chọn phụ thuộc vào kiểu dữ liệu, mục đích sử dụng và hợp đồng của hàm.

| Tình huống | Lựa chọn thường phù hợp |
|---|---|
| Truyền số nguyên nhỏ | `int` |
| Truyền bool | `bool` |
| Đọc string không cần sao chép | `const std::string&` |
| Đọc vector không cần sao chép | `const std::vector<T>&` |
| Sửa đối tượng của người gọi | `T&` |
| Đối tượng có thể vắng mặt | `T*` |
| Thay đổi đối tượng qua pointer tùy chọn | `T*` |
| Chuyển quyền sở hữu độc quyền | `std::unique_ptr<T>` |
| Chia sẻ quyền sở hữu khi thật sự cần | `std::shared_ptr<T>` |

Ví dụ:

```cpp
void setScore(int score);
```

Phù hợp nếu chỉ cần sử dụng một giá trị số nguyên.

```cpp
void updateScore(int& score);
```

Phù hợp nếu cần thay đổi điểm số của người gọi.

```cpp
void printName(const std::string& name);
```

Phù hợp khi cần đọc chuỗi hiện có mà không cần sao chép.

```cpp
void printScore(const int* score);
```

Phù hợp nếu cho phép không có đối tượng điểm số.

### 18.1. Ba trường hợp cần phân tích

Khi thiết kế một hàm nhận pointer hoặc reference, nên xác định rõ:

**Trường hợp thành công**

Đối tượng tồn tại, dữ liệu hợp lệ và hàm thực hiện đúng chức năng.

**Trường hợp lỗi**

Đối với pointer, đầu vào có thể là `nullptr`, hoặc dữ liệu được trỏ đến không đáp ứng điều kiện nghiệp vụ.

Đối với reference, cần xác định rằng người gọi phải cung cấp một đối tượng hợp lệ còn sống.

**Trường hợp sử dụng sai**

Người gọi có thể giữ reference quá lâu, truyền dangling pointer, hoặc sửa dữ liệu mà API chỉ cho phép đọc.

Một giao diện tốt nên hạn chế tối đa các trạng thái sử dụng sai có thể biểu diễn.

Ví dụ, nếu hàm luôn cần một đối tượng hợp lệ, sử dụng `T&` thường rõ nghĩa hơn `T*` vì không phải thiết kế thêm trường hợp `nullptr`.

---

## 19. Những lỗi thường gặp

### 19.1. Dereference nullptr

Sai:

```cpp
int* pointer{nullptr};

*pointer = 10;
```

Cách xử lý:

```cpp
if (pointer != nullptr) {
    *pointer = 10;
}
```

Nhớ rằng điều kiện này chỉ bảo vệ trường hợp null, không bảo đảm pointer không dangling.

### 19.2. Trả pointer đến biến local

Sai:

```cpp
int* getNumber() {
    int number{10};

    return &number;
}
```

Nên trả về giá trị khi phù hợp:

```cpp
int getNumber() {
    return 10;
}
```

### 19.3. Trả reference đến biến local

Sai:

```cpp
int& getNumber() {
    int number{10};

    return number;
}
```

Reference trả về không hợp lệ để truy cập đối tượng sau khi hàm kết thúc.

### 19.4. Nhầm pointer với dữ liệu được trỏ đến

```cpp
int value{10};

int* pointer = &value;
```

Hai câu lệnh sau khác nhau:

```cpp
pointer = nullptr;
```

Thay đổi giá trị của biến pointer.

```cpp
*pointer = 20;
```

Thay đổi đối tượng được pointer trỏ đến, với điều kiện pointer hợp lệ.

Không thể thực hiện dòng thứ hai sau khi đã đặt pointer thành `nullptr` mà chưa gán lại một địa chỉ hợp lệ.

### 19.5. Nhầm reference assignment với rebinding

```cpp
int a{10};
int b{20};

int& ref = a;

ref = b;
```

Câu lệnh cuối không làm `ref` chuyển sang `b`.

Nó gán giá trị `20` cho `a`.

### 19.6. Giữ pointer sau vector reallocation

Nếu vector cấp phát lại vùng lưu trữ, pointer hoặc reference đến các phần tử cũ sẽ mất hiệu lực.

Cần kiểm tra quy tắc iterator/reference invalidation trước khi giữ địa chỉ của phần tử lâu dài.

### 19.7. Thiếu const correctness

Nếu hàm chỉ đọc dữ liệu:

```cpp
void print(const std::string& text);
```

thường phù hợp hơn:

```cpp
void print(std::string& text);
```

vì kiểu `const std::string&` thể hiện rõ rằng hàm không sửa chuỗi thông qua tham số.

Ngoài ra, nó cho phép truyền các đối tượng `const` phù hợp.

### 19.8. Lạm dụng new và delete

Không cần cấp phát động cho mọi đối tượng.

Raw pointer không đồng nghĩa với việc phải sử dụng `new`.

Trong phần lớn trường hợp đơn giản, biến cục bộ, container chuẩn và các cơ chế RAII là lựa chọn dễ quản lý hơn.

---

## 20. Ví dụ thực hành tổng hợp

### Bài toán: Cập nhật điểm học sinh

Viết chương trình thực hiện các công việc:

1. Lưu điểm số ban đầu.
2. In điểm số.
3. Cộng điểm thưởng bằng reference.
4. Điều chỉnh điểm bằng pointer.
5. Kiểm tra pointer trước khi sử dụng.
6. Không cho phép điểm vượt quá phạm vi `[0, 100]`.

### 20.1. Chương trình C++17

```cpp
#include <iostream>

void printScore(const int& score) {
    std::cout << "Score: " << score << '\n';
}

bool addBonus(int& score, int bonus) {
    if (score < 0 || score > 100) {
        return false;
    }

    if (bonus < 0 || bonus > 100 - score) {
        return false;
    }

    score += bonus;
    return true;
}

bool setScore(int* score, int value) {
    if (score == nullptr) {
        return false;
    }

    if (value < 0 || value > 100) {
        return false;
    }

    *score = value;
    return true;
}

int main() {
    int score{70};

    printScore(score);

    if (addBonus(score, 10)) {
        printScore(score);
    }

    if (setScore(&score, 95)) {
        printScore(score);
    }

    if (!setScore(nullptr, 50)) {
        std::cout << "Invalid target\n";
    }

    return 0;
}
```

### 20.2. Kết quả

```text
Score: 70
Score: 80
Score: 95
Invalid target
```

### 20.3. Phân tích

Hàm:

```cpp
void printScore(const int& score)
```

chỉ đọc điểm số.

Hàm:

```cpp
bool addBonus(int& score, int bonus)
```

thay đổi trực tiếp điểm số thông qua reference.

Hàm:

```cpp
bool setScore(int* score, int value)
```

nhận pointer và cho phép trường hợp không có đối tượng đích.

Trước khi dereference, hàm kiểm tra:

```cpp
if (score == nullptr)
```

Đồng thời kiểm tra giá trị mới thuộc đoạn `[0, 100]`.

### 20.4. Các trường hợp kiểm thử

| Điểm ban đầu | Thao tác | Kết quả |
|---|---|---|
| 70 | Cộng 10 | 80 |
| 90 | Cộng 10 | 100 |
| 95 | Cộng 10 | Từ chối |
| 70 | Cộng -5 | Từ chối |
| 70 | Gán 100 | 100 |
| 70 | Gán 150 | Từ chối |
| Không có pointer đích | Gán 50 | Từ chối |

Trong ví dụ này, `setScore()` không thể kiểm tra một pointer dangling chỉ bằng cách so sánh với `nullptr`.

Hợp đồng của hàm vẫn yêu cầu rằng mọi pointer không null được truyền vào phải trỏ đến một đối tượng `int` còn sống và có thể sửa đổi.

### 20.5. Đánh giá thiết kế

Ví dụ cho thấy cả ba cách truyền dữ liệu:

- `int`: Truyền giá trị nhỏ.
- `int&`: Thay đổi đối tượng bắt buộc tồn tại.
- `int*`: Thay đổi đối tượng có thể vắng mặt.

Đối với ứng dụng thực tế, có thể cân nhắc đóng gói điểm số và quy tắc cập nhật trong một class thay vì cho phép nhiều hàm thao tác trực tiếp.

Tuy nhiên, trong bài học này, các hàm độc lập giúp làm rõ sự khác biệt giữa các phương thức truyền tham số.

---

## 21. Bài tập tự luyện

### Bài 1. Đổi chỗ hai số bằng reference

**Yêu cầu:** Viết hàm:

```cpp
void swapValues(int& a, int& b);
```

Hàm phải hoán đổi giá trị hai biến được truyền vào.

Ví dụ:

```text
Before:
a = 10
b = 20

After:
a = 20
b = 10
```

**Gợi ý:** Sử dụng một biến tạm để lưu giá trị của `a`.

### Bài 2. Tăng giá trị bằng pointer

**Yêu cầu:** Viết hàm:

```cpp
bool increment(int* value);
```

Quy tắc:

- Nếu pointer bằng `nullptr`, trả về `false`.
- Nếu pointer hợp lệ và giá trị chưa đạt giới hạn `int`, tăng giá trị lên một.
- Nếu giá trị đã đạt `std::numeric_limits<int>::max()`, trả về `false`.
- Khi tăng thành công, trả về `true`.

**Gợi ý:** Include `<limits>` và kiểm tra trước khi cộng.

### Bài 3. Đọc độ dài chuỗi bằng const reference

**Yêu cầu:** Viết hàm:

```cpp
std::size_t getLength(const std::string& text);
```

Hàm trả về số đơn vị `char` trong chuỗi.

Ví dụ:

```text
Input:
Hello

Output:
5
```

**Gợi ý:** Sử dụng `std::string::size()`.

Chú ý rằng giá trị này không phải số ký tự Unicode hiển thị trong mọi trường hợp.

### Bài 4. Tìm phần tử lớn nhất

**Yêu cầu:** Viết hàm:

```cpp
bool findMax(
    const std::vector<int>& values,
    int& result
);
```

Quy tắc:

- Nếu vector rỗng, trả về `false`.
- Nếu vector có dữ liệu, gán giá trị lớn nhất vào `result`.
- Trả về `true` khi tìm thành công.

**Gợi ý:** Sử dụng vòng lặp hoặc `std::max_element()`.

### Bài 5. Phân biệt pointer và reference

Cho chương trình:

```cpp
int a{10};
int b{20};

int& ref = a;
int* ptr = &a;

ref = b;
ptr = &b;

*ptr = 30;
```

**Yêu cầu:** Xác định giá trị cuối cùng của:

```text
a
b
ref
*ptr
```

Giải thích tại sao phép gán cho `ref` và phép gán cho `ptr` có hành vi khác nhau.

### Bài 6. Phân tích dangling pointer

Xem đoạn mã:

```cpp
int* pointer{nullptr};

{
    int value{100};
    pointer = &value;
}
```

**Yêu cầu:**

1. Giải thích tại sao pointer không còn hợp lệ để dereference.
2. Kiểm tra `pointer != nullptr` có giải quyết vấn đề không?
3. Đề xuất cách thiết kế lại để dữ liệu còn sống trong thời gian sử dụng.

### Bài 7. Reference với vector

**Yêu cầu:** Nhập `n` số nguyên vào `std::vector<int>`, sau đó tăng mỗi phần tử lên một đơn vị bằng reference.

Điều kiện:

- `n` nằm trong `[0, 100000]`.
- Kiểm tra dữ liệu nhập.
- Không tăng phần tử nếu phép cộng gây tràn `int`.
- Không tạo một vector thứ hai chỉ để lưu kết quả.

**Gợi ý:** Sử dụng:

```cpp
for (int& value : values) {
    // Update value
}
```

---

## 22. Tổng kết kiến thức

| Khái niệm | Ý nghĩa |
|---|---|
| Reference | Tên tham chiếu đến thực thể đã tồn tại |
| Pointer | Đối tượng con trỏ có thể chứa địa chỉ |
| `T&` | Lvalue reference đến T |
| `const T&` | Lvalue reference đến const T |
| `T*` | Pointer đến T |
| `const T*` | Pointer đến const T |
| `T* const` | Const pointer đến T |
| `&value` | Lấy địa chỉ |
| `*pointer` | Dereference pointer |
| `nullptr` | Null pointer literal |
| Pass by value | Truyền dữ liệu thông qua tham số theo giá trị |
| Pass by reference | Truyền bằng tham chiếu |
| Lifetime | Thời gian tồn tại của đối tượng |
| Dangling pointer | Pointer không còn hợp lệ đối với đối tượng trước đó |
| Dangling reference | Reference không còn hợp lệ để truy cập thực thể được tham chiếu |
| Ownership | Trách nhiệm quản lý vòng đời tài nguyên |
| RAII | Quản lý tài nguyên theo vòng đời đối tượng |

Sau bài học này, bạn cần nắm vững những nguyên tắc:

1. **Reference không tạo bản sao đối tượng được tham chiếu.** Nó cung cấp cách truy cập đối tượng đã tồn tại.
2. **Pointer có thể đổi đối tượng đích hoặc mang giá trị null.** Reference thông thường không có hai khả năng này.
3. **const thể hiện giới hạn thao tác.** Khi chỉ cần đọc dữ liệu, sử dụng const reference hoặc pointer đến const khi phù hợp.
4. **Không được dereference pointer không hợp lệ.** Kiểm tra null là cần thiết trong nhiều API, nhưng không đủ để chứng minh lifetime.
5. **Reference và raw pointer không tự quản lý ownership.** Cần bảo đảm đối tượng đích còn sống trong thời gian sử dụng.
6. **Không lạm dụng cấp phát động.** Ưu tiên kiểu dữ liệu, container và công cụ quản lý tài nguyên phù hợp với yêu cầu thực tế.

Quan trọng nhất, **reference và pointer không chỉ là hai cách viết khác nhau để truy cập bộ nhớ**. Chúng còn thể hiện những hợp đồng khác nhau về tính bắt buộc của đối tượng, khả năng thay đổi đích, quyền sửa dữ liệu và trách nhiệm quản lý vòng đời.

Hiểu rõ các hợp đồng này là nền tảng để xây dựng phần mềm C++ an toàn, dễ đọc và dễ bảo trì.

## Đọc tiếp

- [Hàm và phạm vi biến](/cpp/bat-dau/ham-pham-vi): Tìm hiểu tham số, giá trị trả về, scope và cách tổ chức hàm.
- [Mảng và string](/cpp/bat-dau/mang-string): Hiểu cách quản lý tập hợp dữ liệu và các thao tác truy cập phần tử.
- [Stack, heap và lifetime](/cpp/trung-cap/stack-heap-lifetime): Nghiên cứu sâu hơn về storage duration, object lifetime và quản lý bộ nhớ.
- [RAII và smart pointers](/cpp/stl/raii-smart-pointers): Sử dụng `std::unique_ptr`, `std::shared_ptr` và các kỹ thuật quản lý tài nguyên trong C++ hiện đại.
