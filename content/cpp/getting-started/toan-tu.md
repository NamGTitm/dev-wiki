---
title: Toán tử và biểu thức trong C++
description: Hướng dẫn chi tiết các toán tử số học, so sánh, logic, gán, tăng giảm và thứ tự ưu tiên trong C++17, kèm ví dụ và bài tập thực hành.
slug: /cpp/bat-dau/toan-tu
category: fundamentals
categoryLabel: C++ căn bản
order: 20050
difficulty: beginner
keywords: [toán tử C++, biểu thức C++, arithmetic, comparison, logical, assignment, precedence, modulo, increment, decrement]
updated: 2026-10-20
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/bat-dau/bien-kieu-du-lieu", "/cpp/bat-dau/nhap-xuat-dieu-kien-vong-lap", "/cpp/tra-cuu/cu-phap"]
---

# Toán tử và biểu thức trong C++

Trong lập trình, chúng ta thường xuyên thực hiện các phép tính, so sánh giá trị hoặc kiểm tra điều kiện.

Ví dụ, một chương trình có thể cần:

- Tính tổng điểm của học sinh.
- Kiểm tra một số có chia hết cho 2 hay không.
- Xác định người dùng có đủ tuổi sử dụng dịch vụ.
- Cập nhật số lượng sản phẩm trong kho.
- Kết hợp nhiều điều kiện để đưa ra quyết định.

Để thực hiện những công việc này, C++ cung cấp **toán tử (operators)** và **biểu thức (expressions)**.

Đây là kiến thức nền tảng trước khi học câu lệnh điều kiện, vòng lặp và xây dựng thuật toán.

## 1. Toán tử và biểu thức là gì?

### 1.1. Toán tử (Operator)

Toán tử là ký hiệu hoặc từ khóa được sử dụng để thực hiện một phép toán trên một hoặc nhiều giá trị.

Ví dụ:

```cpp
int a{10};
int b{5};

int sum = a + b;
```

Trong câu lệnh `a + b`:

- `a` và `b` là các toán hạng (operands).
- `+` là toán tử (operator).
- `a + b` là một biểu thức (expression).

Toán tử `+` thực hiện phép cộng hai giá trị.

### 1.2. Biểu thức (Expression)

Biểu thức là sự kết hợp của giá trị, biến, toán tử hoặc lời gọi hàm để thực hiện một phép tính hoặc thao tác.

Ví dụ:

```cpp
int a{10};
int b{5};

int result = a + b * 2;
```

Biểu thức:

```cpp
a + b * 2
```

được tính như sau:

\[
10 + 5 \times 2 = 20
\]

Phép nhân được thực hiện trước phép cộng theo quy tắc ưu tiên toán tử.

### 1.3. Phân loại toán tử

C++ cung cấp nhiều nhóm toán tử khác nhau.

| Nhóm | Ví dụ | Công dụng |
|---|---|---|
| Số học | `+`, `-`, `*`, `/`, `%` | Thực hiện phép tính |
| So sánh | `==`, `!=`, `<`, `>` | So sánh giá trị |
| Logic | `&&`, `\|\|`, `!` | Kết hợp điều kiện |
| Gán | `=`, `+=`, `-=`, `*=` | Gán và cập nhật giá trị |
| Tăng giảm | `++`, `--` | Tăng hoặc giảm một đơn vị |
| Điều kiện | `?:` | Lựa chọn biểu thức theo điều kiện |
| Bitwise | `&`, `\|`, `^`, `~` | Thao tác trên các bit |

Trong bài này, chúng ta tập trung vào những nhóm toán tử thường xuyên xuất hiện trong chương trình C++ cơ bản.

---

## 2. Toán tử số học (Arithmetic Operators)

Toán tử số học dùng để thực hiện các phép tính toán học.

### 2.1. Các toán tử cơ bản

| Toán tử | Ý nghĩa | Ví dụ | Kết quả |
|---|---|---|---|
| `+` | Cộng | `10 + 3` | `13` |
| `-` | Trừ | `10 - 3` | `7` |
| `*` | Nhân | `10 * 3` | `30` |
| `/` | Chia | `10 / 3` | `3` |
| `%` | Chia lấy dư | `10 % 3` | `1` |

Ví dụ chương trình:

```cpp
#include <iostream>

int main() {
    int a{17};
    int b{5};

    std::cout << "Tong: " << a + b << '\n';
    std::cout << "Hieu: " << a - b << '\n';
    std::cout << "Tich: " << a * b << '\n';
    std::cout << "Thuong: " << a / b << '\n';
    std::cout << "So du: " << a % b << '\n';

    return 0;
}
```

Kết quả:

```text
Tong: 22
Hieu: 12
Tich: 85
Thuong: 3
So du: 2
```

**Giải thích:**

- `17 + 5 = 22`
- `17 - 5 = 12`
- `17 × 5 = 85`
- `17 / 5 = 3` khi thực hiện phép chia nguyên.
- `17 % 5 = 2`, vì 17 chia 5 được 3 và dư 2.

### 2.2. Phép chia số nguyên và số thực

Đây là một trong những điểm dễ nhầm lẫn nhất khi mới học C++.

Xét chương trình:

```cpp
#include <iostream>

int main() {
    int a{7};
    int b{2};

    std::cout << a / b << '\n';
    std::cout << 7.0 / 2 << '\n';

    return 0;
}
```

Kết quả:

```text
3
3.5
```

**Tại sao `7 / 2` lại bằng `3`?**

Khi cả hai toán hạng đều là số nguyên, C++ thực hiện phép chia nguyên. Phần thập phân bị loại bỏ theo hướng về 0.

Muốn nhận kết quả dạng số thực, ít nhất một toán hạng cần có kiểu số thực.

Ví dụ:

```cpp
double result = 7.0 / 2;
```

Hoặc chuyển kiểu tường minh:

```cpp
int a{7};
int b{2};

double result = static_cast<double>(a) / b;
```

Kết quả:

```text
3.5
```

`static_cast<double>(a)` chuyển giá trị của `a` sang kiểu `double` trước khi thực hiện phép chia.

**Một lỗi thường gặp:**

```cpp
int a{7};
int b{2};

double result = a / b;
```

Mặc dù `result` có kiểu `double`, kết quả vẫn là `3.0`.

Nguyên nhân là phép chia nguyên đã được thực hiện trước khi gán kết quả cho biến `result`.

### 2.3. Toán tử chia lấy dư (%)

Toán tử `%` trả về phần dư của phép chia số nguyên.

Ví dụ:

```cpp
#include <iostream>

int main() {
    std::cout << 10 % 3 << '\n';
    std::cout << 20 % 5 << '\n';
    std::cout << 17 % 4 << '\n';

    return 0;
}
```

Kết quả:

```text
1
0
1
```

**Ứng dụng phổ biến nhất là kiểm tra tính chia hết.**

Một số nguyên `n` chia hết cho `k` khác `0` khi:

```cpp
n % k == 0
```

Ví dụ kiểm tra một số chẵn:

```cpp
int n{12};

bool isEven = (n % 2 == 0);
```

Vì `12 % 2 == 0`, biến `isEven` có giá trị `true`.

Một số ứng dụng khác của `%`:

- Xác định số chẵn, số lẻ.
- Kiểm tra tính chia hết.
- Tách chữ số cuối của số nguyên không âm.
- Tính thời gian theo chu kỳ.
- Xử lý các bài toán số học và thuật toán.

**Lưu ý về số âm:**

Trong C++17, phép chia số nguyên cắt phần thập phân theo hướng về 0. Phần dư có cùng dấu với số bị chia nếu phần dư khác 0.

Ví dụ:

```cpp
std::cout << -17 / 5 << '\n';
std::cout << -17 % 5 << '\n';
```

Kết quả:

```text
-3
-2
```

Không nên mặc định kết quả `%` luôn không âm.

Ngoài ra, toán tử `%` chỉ áp dụng cho kiểu số nguyên, không sử dụng trực tiếp với `double` hoặc `float`.

### 2.4. Phép chia cho 0

Trong số học, phép chia cho 0 không được xác định.

Với kiểu số nguyên trong C++, phép chia hoặc chia lấy dư cho 0 gây ra hành vi không xác định (*undefined behavior*).

Ví dụ không an toàn:

```cpp
int a{10};
int b{0};

int result = a / b;
```

Cách xử lý:

```cpp
#include <iostream>

int main() {
    int a{};
    int b{};

    if (!(std::cin >> a >> b)) {
        std::cerr << "Du lieu khong hop le.\n";
        return 1;
    }

    if (b == 0) {
        std::cerr << "Khong the chia cho 0.\n";
        return 1;
    }

    std::cout << a / b << '\n';

    return 0;
}
```

Ngoài trường hợp chia cho 0, phép chia nguyên có dấu cũng có thể gặp trường hợp tràn số, chẳng hạn giá trị nhỏ nhất của `int` chia cho `-1`.

**Nguyên tắc:** Luôn kiểm tra các điều kiện có thể khiến phép tính không hợp lệ trước khi thực hiện.

---

## 3. Toán tử so sánh (Comparison Operators)

Toán tử so sánh được sử dụng để kiểm tra mối quan hệ giữa hai giá trị.

Kết quả của phép so sánh có kiểu `bool`, nhận một trong hai giá trị:

- `true`: Điều kiện đúng.
- `false`: Điều kiện sai.

### 3.1. Bảng toán tử so sánh

| Toán tử | Ý nghĩa | Ví dụ | Kết quả |
|---|---|---|---|
| `==` | Bằng nhau | `5 == 5` | `true` |
| `!=` | Khác nhau | `5 != 3` | `true` |
| `>` | Lớn hơn | `5 > 3` | `true` |
| `<` | Nhỏ hơn | `5 < 3` | `false` |
| `>=` | Lớn hơn hoặc bằng | `5 >= 5` | `true` |
| `<=` | Nhỏ hơn hoặc bằng | `3 <= 5` | `true` |

Ví dụ:

```cpp
#include <iostream>

int main() {
    int a{10};
    int b{5};

    std::cout << (a > b) << '\n';
    std::cout << (a == b) << '\n';
    std::cout << (a != b) << '\n';

    return 0;
}
```

Kết quả:

```text
1
0
1
```

Mặc định, `std::cout` hiển thị giá trị `bool` dưới dạng:

- `1` tương ứng với `true`.
- `0` tương ứng với `false`.

Nếu muốn in chữ `true` và `false`, sử dụng `std::boolalpha`:

```cpp
std::cout << std::boolalpha;
std::cout << (10 > 5) << '\n';
```

Kết quả:

```text
true
```

### 3.2. Phân biệt = và ==

Đây là hai toán tử hoàn toàn khác nhau.

**Toán tử `=` dùng để gán giá trị:**

```cpp
int a{5};

a = 10;
```

Sau câu lệnh trên, `a` có giá trị `10`.

**Toán tử `==` dùng để so sánh:**

```cpp
int a{5};

bool result = (a == 10);
```

Biến `result` có giá trị `false`.

Một lỗi phổ biến:

```cpp
int a{5};

if (a = 10) {
    std::cout << "Dieu kien dung\n";
}
```

Ở đây, `a = 10` là phép gán. Biểu thức trả về giá trị vừa gán, sau đó được chuyển sang kiểu `bool`.

Vì `10` khác `0`, điều kiện được xem là đúng.

Cách viết đúng khi muốn so sánh:

```cpp
if (a == 10) {
    std::cout << "a bang 10\n";
}
```

### 3.3. So sánh trong một khoảng giá trị

Giả sử cần kiểm tra điểm số nằm trong khoảng từ 0 đến 10.

Trong toán học, ta có thể viết:

\[
0 \le x \le 10
\]

Nhưng trong C++, không nên viết:

```cpp
0 <= x <= 10
```

Biểu thức này không được hiểu là hai phép so sánh độc lập cùng áp dụng lên `x`.

Thay vào đó, C++ sẽ nhóm thành:

```cpp
(0 <= x) <= 10
```

Kết quả của `0 <= x` là `bool`, được chuyển thành `0` hoặc `1` khi so sánh với `10`.

Vì vậy, biểu thức trên luôn đúng với các giá trị `x` số học thông thường.

**Cách viết chính xác:**

```cpp
bool valid = (x >= 0) && (x <= 10);
```

Toán tử `&&` yêu cầu cả hai điều kiện đều đúng.

### 3.4. So sánh số thực

Kiểu `float` và `double` có giới hạn về độ chính xác.

Ví dụ:

```cpp
#include <iostream>

int main() {
    double a{0.1};
    double b{0.2};

    std::cout << std::boolalpha;
    std::cout << (a + b == 0.3) << '\n';

    return 0;
}
```

Trên các hệ thống thông dụng sử dụng số thực IEEE 754, kết quả thường là:

```text
false
```

Nguyên nhân là những giá trị như `0.1` không thể được biểu diễn chính xác tuyệt đối trong hệ nhị phân dấu phẩy động.

Với các phép tính gần đúng, có thể so sánh sai số:

```cpp
#include <cmath>
#include <iostream>

int main() {
    double a{0.1};
    double b{0.2};
    double expected{0.3};

    constexpr double epsilon{1e-9};

    bool equal = std::abs((a + b) - expected) < epsilon;

    std::cout << std::boolalpha << equal << '\n';
}
```

Kết quả trên các hệ thống thông dụng:

```text
true
```

`epsilon` là ngưỡng sai số cho phép.

Tuy nhiên, giá trị `1e-9` không phù hợp với mọi bài toán. Khi làm việc với những số có độ lớn rất khác nhau, cần cân nhắc sai số tuyệt đối, sai số tương đối hoặc kết hợp cả hai.

---

## 4. Toán tử logic (Logical Operators)

Toán tử logic cho phép kết hợp nhiều điều kiện trong một biểu thức.

C++ có ba toán tử logic cơ bản:

| Toán tử | Tên | Ý nghĩa |
|---|---|---|
| `&&` | AND | Cả hai điều kiện đều đúng |
| `\|\|` | OR | Ít nhất một điều kiện đúng |
| `!` | NOT | Đảo ngược giá trị logic |

### 4.1. Toán tử AND (&&)

Biểu thức:

```cpp
a && b
```

chỉ cho kết quả `true` khi cả `a` và `b` đều đúng.

Bảng chân trị:

| a | b | a && b |
|---|---|---|
| false | false | false |
| false | true | false |
| true | false | false |
| true | true | true |

Ví dụ kiểm tra điều kiện tham gia một hoạt động:

```cpp
#include <iostream>

int main() {
    int age{20};
    bool hasTicket{true};

    bool canEnter = (age >= 18) && hasTicket;

    std::cout << std::boolalpha << canEnter << '\n';

    return 0;
}
```

Kết quả:

```text
true
```

Người dùng chỉ được phép tham gia nếu đồng thời đủ tuổi và có vé.

### 4.2. Toán tử OR (||)

Biểu thức:

```cpp
a || b
```

cho kết quả `true` nếu có ít nhất một điều kiện đúng.

Bảng chân trị:

| a | b | a \|\| b |
|---|---|---|
| false | false | false |
| false | true | true |
| true | false | true |
| true | true | true |

Ví dụ:

```cpp
bool isAdmin{false};
bool isOwner{true};

bool hasAccess = isAdmin || isOwner;
```

Biến `hasAccess` có giá trị `true`, vì người dùng là chủ sở hữu.

### 4.3. Toán tử NOT (!)

Toán tử `!` đảo ngược giá trị logic.

| a | !a |
|---|---|
| true | false |
| false | true |

Ví dụ:

```cpp
bool isBanned{false};

bool canAccess = !isBanned;
```

Vì `isBanned` bằng `false`, giá trị `canAccess` sẽ là `true`.

### 4.4. Kết hợp nhiều điều kiện

Giả sử hệ thống có quy tắc:

- Người dùng phải từ 18 tuổi.
- Có vé hoặc thuộc nhóm khách mời.
- Không bị cấm truy cập.

Biểu thức:

```cpp
#include <iostream>

int main() {
    int age{20};

    bool hasTicket{false};
    bool isGuest{true};
    bool isBanned{false};

    bool canEnter =
        (age >= 18) &&
        (hasTicket || isGuest) &&
        !isBanned;

    std::cout << std::boolalpha << canEnter << '\n';
}
```

Kết quả:

```text
true
```

Sử dụng dấu ngoặc giúp biểu thức rõ ràng hơn và giảm nguy cơ hiểu nhầm thứ tự ưu tiên.

### 4.5. Short-circuit: Đánh giá ngắn mạch

Hai toán tử `&&` và `||` có cơ chế *short-circuit evaluation*.

Điều này có nghĩa là chương trình có thể bỏ qua vế phải khi kết quả đã được xác định từ vế trái.

**Với toán tử &&:**

Nếu vế trái là `false`, toàn bộ biểu thức chắc chắn là `false`.

Ví dụ:

```cpp
int divisor{0};

bool valid =
    (divisor != 0) &&
    (10 / divisor > 2);
```

Chương trình không thực hiện phép chia khi `divisor == 0`.

**Với toán tử ||:**

Nếu vế trái là `true`, toàn bộ biểu thức chắc chắn là `true`.

Ví dụ:

```cpp
bool isAdmin{true};
bool hasPermission{false};

bool allowed = isAdmin || hasPermission;
```

Chương trình không cần đánh giá vế phải khi `isAdmin` đã là `true`.

Short-circuit là một cơ chế quan trọng trong việc bảo vệ các phép toán hoặc thao tác có điều kiện.

**Lưu ý:** Không nhầm lẫn `&&` với `&`, hoặc `||` với `|`. Các toán tử bitwise có cách hoạt động khác và không cung cấp cơ chế short-circuit tương tự.

---

## 5. Toán tử gán (Assignment Operators)

Toán tử gán được sử dụng để thay đổi giá trị của biến.

### 5.1. Phép gán cơ bản

```cpp
int score{10};

score = 20;
```

Sau khi thực hiện:

```text
score = 20
```

Giá trị cũ của biến được thay bằng giá trị mới.

### 5.2. Các toán tử gán kết hợp

C++ cung cấp cú pháp rút gọn để cập nhật giá trị của biến.

| Toán tử | Ví dụ | Ý nghĩa tương ứng |
|---|---|---|
| `+=` | `a += 5` | `a = a + 5` |
| `-=` | `a -= 5` | `a = a - 5` |
| `*=` | `a *= 5` | `a = a * 5` |
| `/=` | `a /= 5` | `a = a / 5` |
| `%=` | `a %= 5` | `a = a % 5` |

Ví dụ:

```cpp
#include <iostream>

int main() {
    int score{10};

    score += 5;
    std::cout << score << '\n';

    score *= 2;
    std::cout << score << '\n';

    score -= 10;
    std::cout << score << '\n';

    return 0;
}
```

Kết quả:

```text
15
30
20
```

Về mặt kết quả trong các ví dụ đơn giản, `a += b` tương đương với `a = a + b`.

Tuy nhiên, phép gán kết hợp chỉ đánh giá toán hạng bên trái một lần, nên hai cách viết không hoàn toàn giống nhau trong mọi biểu thức phức tạp.

### 5.3. Ứng dụng thực tế

Giả sử chương trình quản lý số lượng sản phẩm:

```cpp
int stock{100};

stock += 20;
stock -= 15;
```

Kết quả cuối cùng:

```text
stock = 105
```

Tuy nhiên, trong phần mềm thực tế, không nên cho phép trừ số lượng tùy ý mà thiếu kiểm tra.

Ví dụ:

```cpp
int stock{10};
int requested{15};

if (requested >= 0 && requested <= stock) {
    stock -= requested;
}
```

Điều kiện này ngăn việc trừ số lượng âm hoặc vượt quá số lượng hiện có.

---

## 6. Toán tử tăng và giảm (Increment & Decrement)

C++ hỗ trợ hai toán tử:

- `++`: Tăng một đơn vị.
- `--`: Giảm một đơn vị.

Có hai cách sử dụng:

- Tiền tố (prefix).
- Hậu tố (postfix).

### 6.1. Toán tử tiền tố

Ví dụ:

```cpp
int a{5};

int b = ++a;
```

Toán tử `++a` tăng `a` trước, sau đó biểu thức cho giá trị mới.

Kết quả:

```text
a = 6
b = 6
```

### 6.2. Toán tử hậu tố

Ví dụ:

```cpp
int a{5};

int b = a++;
```

Toán tử `a++` tạo ra giá trị cũ của `a` làm kết quả biểu thức, đồng thời tăng `a` lên một đơn vị.

Kết quả:

```text
a = 6
b = 5
```

### 6.3. So sánh tiền tố và hậu tố

| Biểu thức | Thao tác | Giá trị biểu thức |
|---|---|---|
| `++a` | Tăng a | Giá trị mới |
| `a++` | Tăng a | Giá trị cũ |
| `--a` | Giảm a | Giá trị mới |
| `a--` | Giảm a | Giá trị cũ |

Ví dụ đầy đủ:

```cpp
#include <iostream>

int main() {
    int a{5};
    int b{5};

    std::cout << ++a << '\n';
    std::cout << b++ << '\n';

    std::cout << a << '\n';
    std::cout << b << '\n';

    return 0;
}
```

Kết quả:

```text
6
5
6
6
```

Trong vòng lặp `for` sử dụng biến kiểu số nguyên, hai cách sau thường mang lại cùng hành vi:

```cpp
for (int i = 0; i < 10; ++i) {
}
```

```cpp
for (int i = 0; i < 10; i++) {
}
```

Có thể ưu tiên `++i` khi không cần giá trị cũ, giúp thể hiện rõ ý định.

### 6.4. Tránh thay đổi một biến nhiều lần trong cùng biểu thức

Không nên viết:

```cpp
int i{1};

int result = i++ + i++;
```

Biểu thức trên có hành vi không xác định trong C++17 vì hai phép tăng trên cùng một biến không được sắp thứ tự phù hợp với nhau.

Cách viết rõ ràng hơn:

```cpp
int i{1};

int a = i++;
int b = i++;

int result = a + b;
```

Kết quả:

```text
a = 1
b = 2
result = 3
i = 3
```

**Nguyên tắc:** Nếu biểu thức có nhiều thao tác thay đổi trạng thái, hãy tách thành những câu lệnh đơn giản để dễ đọc, dễ kiểm tra và tránh lỗi thứ tự đánh giá.

---

## 7. Thứ tự ưu tiên toán tử (Operator Precedence)

C++ cho phép kết hợp nhiều toán tử trong cùng một biểu thức.

Tuy nhiên, chúng không có cùng mức độ ưu tiên.

### 7.1. Ví dụ cơ bản

Xét biểu thức:

```cpp
int result = 10 + 5 * 2;
```

Kết quả:

```text
20
```

Vì phép nhân có ưu tiên cao hơn phép cộng.

Nếu muốn thực hiện phép cộng trước:

```cpp
int result = (10 + 5) * 2;
```

Kết quả:

```text
30
```

Dấu ngoặc đơn `()` giúp xác định rõ cách nhóm các phép toán.

### 7.2. Bảng ưu tiên các toán tử thường gặp

Bảng sau được sắp xếp từ mức ưu tiên cao đến thấp, chỉ bao gồm những nhóm toán tử cơ bản trong bài.

| Mức | Toán tử | Chức năng |
|---|---|---|
| 1 | `()` | Nhóm biểu thức |
| 2 | `++`, `--` hậu tố | Tăng, giảm hậu tố |
| 3 | `++`, `--` tiền tố, `!`, `+`, `-` một ngôi | Toán tử một ngôi |
| 4 | `*`, `/`, `%` | Nhân, chia, lấy dư |
| 5 | `+`, `-` | Cộng, trừ |
| 6 | `<`, `<=`, `>`, `>=` | So sánh quan hệ |
| 7 | `==`, `!=` | So sánh bằng, khác |
| 8 | `&&` | Logic AND |
| 9 | `\|\|` | Logic OR |
| 10 | `?:` | Toán tử điều kiện |
| 11 | `=`, `+=`, `-=`, `*=`, `/=`, `%=` | Gán |

Đây là bảng rút gọn, không phải toàn bộ bảng ưu tiên của C++17. Những toán tử khác như dịch bit và bitwise cũng có vị trí riêng.

### 7.3. Ví dụ kết hợp toán tử

```cpp
#include <iostream>

int main() {
    int a{10};
    int b{5};
    int c{2};

    int result = a + b * c;

    bool valid = a > b && b > c;

    std::cout << result << '\n';
    std::cout << std::boolalpha << valid << '\n';

    return 0;
}
```

Kết quả:

```text
20
true
```

Biểu thức:

```cpp
a + b * c
```

được nhóm thành:

```cpp
a + (b * c)
```

Biểu thức:

```cpp
a > b && b > c
```

được nhóm thành:

```cpp
(a > b) && (b > c)
```

### 7.4. Ưu tiên không đồng nghĩa với thứ tự đánh giá

Đây là hai khái niệm khác nhau.

**Thứ tự ưu tiên (precedence)** quy định các toán tử được nhóm với toán hạng như thế nào.

**Thứ tự đánh giá (evaluation order)** quy định khi nào các toán hạng hoặc thao tác được thực hiện.

Ví dụ:

```cpp
int result = first() + second();
```

Dấu `+` không đảm bảo `first()` luôn được gọi trước `second()`.

Trong C++17, thứ tự đánh giá hai toán hạng của phép cộng không được chỉ định.

Nếu thứ tự thực hiện quan trọng, hãy viết:

```cpp
int a = first();
int b = second();

int result = a + b;
```

Nhờ đó, việc gọi `first()` hoàn tất trước câu lệnh gọi `second()`.

**Khuyến nghị:** Sử dụng dấu ngoặc để làm rõ cách nhóm biểu thức, nhưng đừng cho rằng dấu ngoặc luôn giải quyết được vấn đề thứ tự đánh giá.

---

## 8. Toán tử điều kiện ba ngôi (Conditional Operator)

C++ cung cấp toán tử `?:` để lựa chọn một trong hai biểu thức dựa trên điều kiện.

Cú pháp:

```cpp
condition ? valueIfTrue : valueIfFalse
```

Nếu điều kiện đúng, biểu thức thứ hai được đánh giá.

Nếu điều kiện sai, biểu thức thứ ba được đánh giá.

Ví dụ:

```cpp
#include <iostream>

int main() {
    int age{20};

    const char* result =
        (age >= 18) ? "Nguoi lon" : "Chua du tuoi";

    std::cout << result << '\n';

    return 0;
}
```

Kết quả:

```text
Nguoi lon
```

Một ví dụ khác:

```cpp
int a{10};
int b{20};

int maximum = (a > b) ? a : b;
```

Kết quả:

```text
maximum = 20
```

Toán tử ba ngôi phù hợp khi cần chọn một giá trị trong hai giá trị.

Tuy nhiên, với những đoạn xử lý dài hoặc có nhiều điều kiện lồng nhau, sử dụng `if-else` thường rõ ràng hơn.

Không nên cố gắng rút gọn mọi logic vào một biểu thức duy nhất.

---

## 9. Chuyển đổi kiểu dữ liệu trong biểu thức

Khi hai toán hạng có kiểu khác nhau, C++ có thể thực hiện chuyển đổi kiểu dữ liệu theo các quy tắc của ngôn ngữ.

Ví dụ:

```cpp
int a{5};
double b{2.5};

double result = a + b;
```

Kết quả:

```text
result = 7.5
```

Trong biểu thức này, `a` được chuyển sang kiểu `double` để thực hiện phép cộng.

### 9.1. Chuyển đổi kiểu tường minh

Đôi khi cần chủ động quyết định kiểu dữ liệu sử dụng trong phép tính.

Ví dụ tính trung bình cộng:

```cpp
#include <iostream>

int main() {
    int a{7};
    int b{8};

    double average =
        (static_cast<double>(a) + b) / 2;

    std::cout << average << '\n';

    return 0;
}
```

Kết quả:

```text
7.5
```

### 9.2. Tràn số nguyên (Integer Overflow)

Mỗi kiểu số nguyên có giới hạn giá trị có thể biểu diễn.

Giả sử một phép tính vượt quá giới hạn của kiểu `int` có dấu:

```cpp
int a{2'000'000'000};

int result = a * 2;
```

Trong môi trường phổ biến mà `int` có độ rộng 32 bit, phép nhân này vượt quá phạm vi biểu diễn.

Tràn số nguyên có dấu gây ra hành vi không xác định trong C++17.

Một cách xử lý là sử dụng kiểu đủ rộng và thực hiện phép tính trên kiểu đó:

```cpp
long long a{2'000'000'000LL};

long long result = a * 2;
```

Kết quả:

```text
4000000000
```

Tuy nhiên, `long long` cũng có giới hạn. Cần lựa chọn kiểu dữ liệu theo phạm vi thực tế của bài toán.

**Lưu ý quan trọng:**

```cpp
int a{2'000'000'000};

long long result = a * 2;
```

Dòng trên vẫn không an toàn trong môi trường `int` 32 bit, vì phép nhân được thực hiện bằng kiểu `int` trước khi kết quả được chuyển sang `long long`.

Cách đúng:

```cpp
long long result = 1LL * a * 2;
```

Toán hạng `1LL` giúp phép nhân được thực hiện bằng kiểu `long long`.

---

## 10. Ví dụ thực hành tổng hợp

### Bài toán: Kiểm tra số nguyên hợp lệ

**Yêu cầu:**

Viết chương trình nhập số nguyên `n` và kiểm tra:

1. `n` có nằm trong đoạn `[1, 100]` không?
2. `n` có phải số chẵn không?
3. `n` có chia hết cho 3 và 5 không?

### 10.1. Phân tích

Các điều kiện cần sử dụng:

Kiểm tra phạm vi:

```cpp
n >= 1 && n <= 100
```

Kiểm tra số chẵn:

```cpp
n % 2 == 0
```

Kiểm tra chia hết cho cả 3 và 5:

```cpp
n % 3 == 0 && n % 5 == 0
```

### 10.2. Chương trình C++17

```cpp
#include <iostream>

int main() {
    int n{};

    std::cout << "Nhap n: ";

    if (!(std::cin >> n)) {
        std::cerr << "Du lieu khong hop le.\n";
        return 1;
    }

    const bool inRange = (n >= 1) && (n <= 100);
    const bool isEven = (n % 2 == 0);
    const bool divisibleBy3And5 =
        (n % 3 == 0) && (n % 5 == 0);

    std::cout << std::boolalpha;

    std::cout << "Trong pham vi: "
              << inRange << '\n';

    std::cout << "La so chan: "
              << isEven << '\n';

    std::cout << "Chia het cho 3 va 5: "
              << divisibleBy3And5 << '\n';

    return 0;
}
```

Ví dụ đầu vào:

```text
30
```

Kết quả:

```text
Nhap n: 30
Trong pham vi: true
La so chan: true
Chia het cho 3 va 5: true
```

### 10.3. Phân tích trường hợp biên

| n | Trong [1,100] | Chẵn | Chia hết cho 3 và 5 |
|---|---|---|---|
| 0 | false | true | true |
| 1 | true | false | false |
| 15 | true | false | true |
| 30 | true | true | true |
| 100 | true | true | false |
| 105 | false | false | true |

**Điểm cần chú ý:**

Các biểu thức `isEven` và `divisibleBy3And5` vẫn được tính kể cả khi `n` nằm ngoài phạm vi `[1,100]`.

Đây là hành vi có chủ đích trong ví dụ: ba điều kiện được kiểm tra độc lập.

Nếu yêu cầu nghiệp vụ là chỉ xử lý số nằm trong đoạn hợp lệ, chương trình nên kiểm tra `inRange` trước khi thực hiện các thao tác tiếp theo.

Việc xác định chính xác yêu cầu quan trọng không kém việc viết đúng cú pháp.

---

## 11. Những lỗi thường gặp

### 11.1. Nhầm toán tử gán với so sánh

Sai:

```cpp
if (a = 5) {
}
```

Đúng khi muốn kiểm tra bằng nhau:

```cpp
if (a == 5) {
}
```

### 11.2. Chia nguyên nhưng mong kết quả số thực

```cpp
double result = 5 / 2;
```

Kết quả là `2.0`, không phải `2.5`.

Cách sửa:

```cpp
double result = 5.0 / 2;
```

### 11.3. Chia hoặc lấy dư cho 0

Sai:

```cpp
int result = a % 0;
```

Cần kiểm tra mẫu số khác 0 trước khi thực hiện phép chia hoặc chia lấy dư.

### 11.4. Nhầm toán tử logic với bitwise

- `&&`: Logic AND.
- `||`: Logic OR.
- `&`: Bitwise AND.
- `|`: Bitwise OR.

Chúng không thể được thay thế tùy ý cho nhau.

### 11.5. Viết điều kiện khoảng không đúng

Sai:

```cpp
if (1 <= n <= 100) {
}
```

Đúng:

```cpp
if (n >= 1 && n <= 100) {
}
```

### 11.6. Biểu thức có quá nhiều tác dụng phụ

Không nên viết những biểu thức phức tạp vừa đọc, vừa thay đổi giá trị của cùng một biến nhiều lần.

Hãy tách thành các câu lệnh có thứ tự rõ ràng để tránh hành vi không xác định và giúp việc debug dễ dàng hơn.

### 11.7. Chọn kiểu dữ liệu không đủ lớn

Các phép cộng và nhân trên số nguyên có thể vượt phạm vi biểu diễn.

Cần xác định giới hạn đầu vào và giới hạn kết quả trước khi lựa chọn kiểu dữ liệu.

---

## 12. Bài tập tự luyện

Các bài tập được sắp xếp từ cơ bản đến vận dụng.

### Bài 1. Tính toán hai số

**Yêu cầu:** Nhập hai số nguyên `a` và `b`, lần lượt tính:

- Tổng.
- Hiệu.
- Tích.
- Thương nguyên nếu `b` khác `0`.
- Phần dư nếu `b` khác `0`.

Ví dụ:

```text
Input:
10 3

Output:
Tong: 13
Hieu: 7
Tich: 30
Thuong: 3
Du: 1
```

**Gợi ý:** Sử dụng năm toán tử số học cơ bản và kiểm tra dữ liệu trước phép chia. Cân nhắc phạm vi giá trị để tránh tràn số.

### Bài 2. Kiểm tra chia hết

**Yêu cầu:** Nhập số nguyên `n`. Kiểm tra số đó có chia hết cho cả `3` và `5` hay không.

Ví dụ:

```text
Input:
30

Output:
true
```

**Gợi ý:** Kết hợp toán tử `%`, `==` và `&&`.

### Bài 3. Kiểm tra khoảng giá trị

**Yêu cầu:** Nhập ba số nguyên `low`, `high`, `n`. Kiểm tra `n` có nằm trong đoạn đóng `[low, high]` hay không.

Ví dụ:

```text
Input:
1 100 50

Output:
true
```

**Gợi ý:** Sử dụng hai phép so sánh và `&&`.

Xử lý trường hợp `low > high` bằng cách thông báo khoảng không hợp lệ.

### Bài 4. Tính điểm trung bình

**Yêu cầu:** Nhập ba điểm số, tính trung bình cộng và in kết quả dưới dạng số thực.

Ví dụ:

```text
Input:
7 8 9

Output:
8
```

**Gợi ý:** Sử dụng kiểu `double` để giữ phần thập phân. Kiểm tra điểm nằm trong phạm vi hợp lệ.

### Bài 5. Tách chữ số

**Yêu cầu:** Nhập số nguyên không âm `n`. Xác định chữ số cuối cùng và phần còn lại sau khi bỏ chữ số cuối.

Ví dụ:

```text
Input:
1234

Output:
Chu so cuoi: 4
Phan con lai: 123
```

**Gợi ý:**

- Chữ số cuối: `n % 10`.
- Phần còn lại: `n / 10`.

### Bài 6. Kiểm tra năm nhuận

**Yêu cầu:** Nhập năm dương `year`. Xác định năm đó có phải năm nhuận theo lịch Gregory hay không.

Quy tắc:

- Năm chia hết cho `400` là năm nhuận.
- Hoặc năm chia hết cho `4` nhưng không chia hết cho `100` là năm nhuận.
- Những năm còn lại không phải năm nhuận.

Ví dụ:

```text
Input:
2024

Output:
Nam nhuan
```

**Gợi ý:** Kết hợp `%`, `==`, `!=`, `&&` và `||`.

Thử nghiệm với các năm `1900`, `2000`, `2024` và `2025`.

---

## 13. Tổng kết kiến thức

| Nhóm | Toán tử | Chức năng |
|---|---|---|
| Số học | `+`, `-`, `*`, `/`, `%` | Thực hiện phép tính |
| So sánh | `==`, `!=`, `<`, `<=`, `>`, `>=` | So sánh giá trị |
| Logic | `&&`, `\|\|`, `!` | Xử lý điều kiện logic |
| Gán | `=`, `+=`, `-=`, `*=`, `/=`, `%=` | Cập nhật biến |
| Tăng giảm | `++`, `--` | Tăng hoặc giảm một đơn vị |
| Điều kiện | `?:` | Chọn một trong hai biểu thức |

Sau khi hoàn thành bài học, bạn cần nắm được:

1. Phân biệt toán tử, toán hạng và biểu thức.
2. Thực hiện đúng các phép toán số học, đặc biệt là phép chia nguyên.
3. Sử dụng toán tử so sánh để tạo biểu thức `bool`.
4. Kết hợp điều kiện với `&&`, `||` và `!`.
5. Hiểu sự khác biệt giữa tăng giảm tiền tố và hậu tố.
6. Sử dụng dấu ngoặc để thể hiện rõ cách nhóm biểu thức.
7. Phân biệt thứ tự ưu tiên với thứ tự đánh giá.
8. Nhận diện lỗi chia cho 0, tràn số và chuyển đổi kiểu dữ liệu.

**Điều quan trọng nhất:** Một biểu thức tốt không chỉ cho kết quả đúng mà còn phải dễ đọc, rõ ý nghĩa và có hành vi xác định với dữ liệu đầu vào được hỗ trợ.

## Đọc tiếp

- [Biến và kiểu dữ liệu](/cpp/bat-dau/bien-kieu-du-lieu): Hiểu các kiểu dữ liệu cơ bản và phạm vi biểu diễn.
- [Nhập xuất, điều kiện và vòng lặp](/cpp/bat-dau/nhap-xuat-dieu-kien-vong-lap): Ứng dụng toán tử vào chương trình có khả năng rẽ nhánh và lặp.
- [Tra cứu cú pháp C++](/cpp/tra-cuu/cu-phap): Tổng hợp cú pháp thường gặp khi lập trình C++17.
