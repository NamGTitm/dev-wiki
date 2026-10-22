---
title: Toán tử và biểu thức
description: Giải thích các toán tử số học, so sánh, logic, gán, tăng giảm và điều kiện trong C++17, cùng thứ tự ưu tiên và những lỗi dễ gặp.
slug: /cpp/bat-dau/toan-tu
category: fundamentals
categoryLabel: C++ căn bản
order: 20050
difficulty: beginner
badges: [Cốt lõi]
keywords: [toán tử C++, biểu thức C++, arithmetic, comparison, logical, assignment, precedence, modulo, increment, decrement]
updated: 2026-10-21
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/bat-dau/bien-kieu-du-lieu", "/cpp/bat-dau/nhap-xuat-dieu-kien-vong-lap", "/cpp/tra-cuu/cu-phap"]
---

# Toán tử và biểu thức trong C++

Toán tử cho phép chương trình tính toán, so sánh và thay đổi giá trị. Để dùng chúng chính xác, cần hiểu không chỉ ký hiệu mà cả kiểu dữ liệu của toán hạng, cách biểu thức được nhóm và những thao tác nào thực sự được thực hiện.

Bài viết tập trung vào các toán tử thường gặp trong C++17 trên kiểu dựng sẵn như `int`, `double` và `bool`. C++ cho phép nạp chồng nhiều toán tử cho kiểu lớp; ý nghĩa và kiểu kết quả khi đó có thể khác, còn cú pháp và thứ tự ưu tiên vẫn theo quy tắc ngôn ngữ. Các khối mã là đoạn minh họa, không phải chương trình hoàn chỉnh; những biến cần thiết được khai báo hoặc giải thích tại chỗ.

## 1. Toán tử và biểu thức

**Toán tử** là ký hiệu quy định một thao tác. **Toán hạng** là giá trị hoặc biểu thức mà toán tử tác động lên. **Biểu thức** kết hợp toán hạng và toán tử để tạo ra kết quả, và đôi khi còn làm thay đổi trạng thái chương trình.

```cpp
int price{12};
int quantity{3};
int total = price * quantity;
```

Trong `price * quantity`, `price` và `quantity` là toán hạng, `*` là toán tử nhân, còn toàn bộ `price * quantity` là một biểu thức có kết quả `36`. Câu lệnh khởi tạo `total` dùng kết quả đó làm giá trị ban đầu.

Một ký hiệu có thể đóng vai trò khác nhau tùy vị trí. Trong `-value`, dấu `-` là toán tử một ngôi; trong `a - b`, nó là toán tử hai ngôi. Toán tử điều kiện `?:` có ba toán hạng.

Các nhóm thường gặp gồm số học (`+`, `-`, `*`, `/`, `%`), so sánh (`<`, `==` và các toán tử cùng nhóm), logic (`&&`, `||`, `!`), gán (`=`, `+=` và các dạng tương tự), tăng giảm (`++`, `--`), điều kiện (`?:`) và bitwise (`&`, `|`, `^`, `~`). Toán tử bitwise thao tác trên bit của số nguyên; chúng không thay thế cho toán tử logic. Bài chỉ nhắc nhóm bitwise để phân biệt, còn tập trung giải thích những nhóm cần thiết cho các phép tính và điều kiện cơ bản.

## 2. Toán tử số học

Các toán tử số học cơ bản áp dụng quy tắc kiểu dữ liệu của toán hạng:

| Toán tử | Tác dụng | Ví dụ |
|---|---|---|
| `+` | Cộng | `7 + 2` cho `9` |
| `-` | Trừ | `7 - 2` cho `5` |
| `*` | Nhân | `7 * 2` cho `14` |
| `/` | Chia | Kết quả phụ thuộc kiểu toán hạng |
| `%` | Chia lấy dư | Chỉ dùng với toán hạng kiểu nguyên |

### Chia nguyên và chia số thực

Khi cả hai toán hạng của `/` là số nguyên, phép chia cho thương nguyên và bỏ phần lẻ theo hướng về 0. Vì vậy, `7 / 2` cho `3`, còn `-7 / 2` cho `-3`.

Nếu một toán hạng là số thực, phép chia được thực hiện theo kiểu số thực:

```cpp
int whole = 7 / 2;                  // 3
double fraction = 7.0 / 2;          // 3.5
int a{7};
int b{2};
double stillWhole = a / b;          // 3.0
double correctFraction = static_cast<double>(a) / b; // 3.5
```

Kiểu của biến nhận kết quả không thay đổi phép tính đã diễn ra. Trong `stillWhole`, phép chia nguyên tạo ra `3` trước; sau đó giá trị ấy mới được chuyển thành `3.0`.

### Chia lấy dư

Với toán hạng nguyên, `%` cho phần dư tương ứng với phép chia nguyên. Trong C++17, phép chia cắt về 0 nên phần dư khác 0 mang dấu của số bị chia:

```cpp
int positiveQuotient = 17 / 5;   // 3
int positiveRemainder = 17 % 5; // 2
int negativeQuotient = -17 / 5; // -3
int negativeRemainder = -17 % 5; // -2
```

Do đó, không được giả định phần dư luôn không âm. Kiểm tra `n % k == 0` xác định `n` có chia hết cho `k` hay không, với điều kiện `k` khác `0`. `%` không dùng trực tiếp với `float` hoặc `double`.

Phần dư cũng giúp lấy chữ số cuối hoặc kiểm tra chẵn lẻ. Khi `n` không âm, `n % 10` là chữ số cuối trong hệ thập phân, còn `n / 10` bỏ chữ số đó do phép chia nguyên:

```cpp
int n{1234}; // n không âm
bool isEven = (n % 2 == 0); // true
int lastDigit = n % 10;     // 4
int remaining = n / 10;     // 123
```

Không dùng quy tắc lấy chữ số này cho số âm nếu chưa chuẩn hóa dấu: trong C++17, phần dư của số âm có thể âm.

Với giá trị không âm, phần dư còn có thể chọn vị trí trong một chu kỳ, chẳng hạn xác định vị trí quay vòng trong một dãy có số phần tử cố định.

### Chia cho 0 và tràn số

Với các toán tử số nguyên tích hợp, chia hoặc chia lấy dư cho `0` gây hành vi không xác định (undefined behavior, UB). Hành vi cũng không được xác định nếu thương nguyên không thể biểu diễn bằng kiểu kết quả, chẳng hạn một số trường hợp lấy giá trị âm nhỏ nhất chia cho `-1`.

Tràn số nguyên có dấu cũng là hành vi không xác định trong C++17. Chương trình không được đảm bảo sẽ quay vòng, cho ra số âm hay báo lỗi. Ngược lại, phép toán unsigned được tính theo modulo của miền giá trị kiểu đó; giảm một giá trị unsigned bằng `0` cho giá trị unsigned lớn nhất của kiểu.

Phải chọn kiểu của phép tính trước khi phép toán xảy ra. Giả sử `int` có 32 bit và `a` bằng `2'000'000'000`, `long long result = a * 2;` vẫn không an toàn: `a * 2` được tính bằng `int` và có thể tràn trước khi gán. Có thể chuyển một toán hạng trước phép nhân:

```cpp
int a{2'000'000'000}; // giả sử int 32 bit
long long result = 1LL * a * 2; // 4000000000
```

Toán hạng `1LL` khiến phép nhân được thực hiện bằng `long long`. Kiểu rộng hơn vẫn có giới hạn riêng, nên cần kiểm tra miền giá trị của cả đầu vào lẫn kết quả trung gian.

Chọn kiểu theo miền giá trị và giới hạn kết quả trung gian. Phần [Biến, kiểu dữ liệu và quá trình biên dịch](/cpp/bat-dau/bien-kieu-du-lieu) giải thích thêm về giới hạn kiểu, chuyển đổi và tràn số.

## 3. Toán tử so sánh

Với các toán hạng kiểu dựng sẵn, toán tử so sánh tạo ra giá trị `bool`:

| Nhóm | Toán tử | Ý nghĩa |
|---|---|---|
| Quan hệ | `<`, `<=`, `>`, `>=` | So sánh thứ tự |
| Bằng nhau | `==`, `!=` | Kiểm tra bằng hoặc khác |

Ví dụ, `score >= 5` có kết quả `true` khi `score` ít nhất là `5`; nếu không, kết quả là `false`. Khi in trực tiếp bằng `std::cout`, giá trị `bool` mặc định thường hiện thành `1` hoặc `0`; `std::boolalpha` đổi cách hiển thị thành `true` hoặc `false`.

### Phân biệt `=` với `==`

`=` gán giá trị; `==` so sánh hai giá trị. Giả sử `score` là một biến `int` có thể thay đổi: trong `if (score = 10)`, chương trình gán `10` cho `score`, rồi điều kiện nhận giá trị khác `0` nên đúng. Nếu muốn kiểm tra bằng nhau, hãy viết `if (score == 10)`.

### Kiểm tra một khoảng

Các toán tử quan hệ cùng mức ưu tiên kết hợp từ trái sang phải. Vì thế, `0 <= x <= 10` được nhóm thành `(0 <= x) <= 10`, không phải hai phép so sánh cùng áp dụng lên `x`.

Với `x` kiểu số thông thường, `(0 <= x)` cho `false` hoặc `true`; khi so sánh tiếp với `10`, hai giá trị đó được chuyển thành `0` hoặc `1`, đều không lớn hơn `10`. Hãy viết rõ hai điều kiện:

```cpp
bool inRange = (x >= 0) && (x <= 10);
```

### So sánh số thực

Nhiều phân số thập phân, chẳng hạn `0.1`, không thể biểu diễn chính xác bằng dạng dấu phẩy động nhị phân. Trên các hệ thống phổ biến dùng IEEE 754, phép cộng sau thường không cho kết quả bằng chính xác `0.3`:

```cpp
#include <cmath>

double sum = 0.1 + 0.2;
bool exactlyEqual = (sum == 0.3); // thường là false
constexpr double tolerance{1e-9};
bool approximatelyEqual = std::abs(sum - 0.3) < tolerance; // thường là true
```

Ngưỡng `tolerance` trong ví dụ là sai số tuyệt đối minh họa, không phải hằng số phù hợp cho mọi bài toán. Khi các giá trị có độ lớn hoặc đơn vị khác nhau, cần chọn sai số dựa trên yêu cầu; có bài toán cần sai số tương đối hoặc kết hợp cả sai số tuyệt đối và tương đối. So sánh chính xác vẫn phù hợp với những giá trị được biểu diễn chính xác hoặc khi cần kiểm tra đúng bằng theo đặc tả.

## 4. Toán tử logic

Các toán tử logic thường kết hợp điều kiện:

| Toán tử | Ý nghĩa |
|---|---|
| `&&` | Đúng khi cả hai toán hạng đều đúng |
| `||` | Đúng khi ít nhất một toán hạng đúng |
| `!` | Đảo giá trị logic |

Bảng chân trị cho thấy kết quả khi kết hợp hai điều kiện; `!` chỉ đảo giá trị của toán hạng `a`:

| `a` | `b` | `a && b` | `a || b` | `!a` |
|---|---|---|---|---|
| `false` | `false` | `false` | `false` | `true` |
| `false` | `true` | `false` | `true` | `true` |
| `true` | `false` | `false` | `true` | `false` |
| `true` | `true` | `true` | `true` | `false` |

Với toán tử logic tích hợp, toán hạng được chuyển đổi theo ngữ cảnh sang `bool`: số `0` là sai, số khác `0` là đúng. Trong điều kiện nghiệp vụ, phép so sánh tường minh thường dễ đọc hơn, chẳng hạn `count > 0` thay vì chỉ viết `count`.

Một điều kiện có thể kết hợp nhiều quy tắc. Ví dụ, chỉ cho phép vào khi người dùng đủ tuổi, có vé hoặc là khách mời, và không bị cấm:

```cpp
int age{20};
bool hasTicket{false};
bool isGuest{true};
bool isBanned{false};

bool canEnter = (age >= 18) && (hasTicket || isGuest) && !isBanned;
```

`canEnter` là `true`: người dùng đủ tuổi, thuộc nhóm khách mời và không bị cấm. Dấu ngoặc cho thấy `hasTicket || isGuest` là một quy tắc con trước khi kết hợp với hai điều kiện còn lại.

Với năm dương, biểu thức sau dùng `%`, `&&` và `||` để mô tả năm nhuận theo lịch Gregory:

```cpp
int year{1900};
bool isLeapYear = (year % 400 == 0) ||
                  (year % 4 == 0 && year % 100 != 0);
```

Năm chia hết cho `400` là năm nhuận; nếu không, năm phải chia hết cho `4` nhưng không chia hết cho `100`. Vì `&&` có ưu tiên cao hơn `||`, biểu thức đã được nhóm đúng; dấu ngoặc vẫn giúp quy tắc dễ đọc. Kết quả là `1900` không nhuận, còn `2000` và `2024` là năm nhuận.

### Đánh giá ngắn mạch

Toán tử tích hợp `&&` đánh giá toán hạng trái trước; nếu nó sai, toán hạng phải không được đánh giá vì kết quả đã chắc chắn sai. Với `||`, nếu toán hạng trái đúng, toán hạng phải được bỏ qua vì kết quả đã chắc chắn đúng.

```cpp
int divisor{0};
bool valid = (divisor != 0) && (10 / divisor > 2);
```

Ở đây, khi `divisor` bằng `0`, vế trái sai nên phép chia ở vế phải không chạy. Thứ tự điều kiện vì vậy là một phần của tính đúng đắn, không chỉ là cách trình bày.

Quy tắc ngắn mạch này thuộc các toán tử logic tích hợp. Lớp tự định nghĩa có thể nạp chồng `operator&&` hoặc `operator||`; các toán tử đó không có cơ chế bỏ qua toán hạng phải như toán tử tích hợp. Cũng không nhầm `&&` với `&`, hoặc `||` với `|`: `&` và `|` là toán tử bitwise, không dùng để thay thế phép logic ngắn mạch.

## 5. Toán tử gán

Với biến kiểu dựng sẵn, toán tử `=` lưu giá trị bên phải vào đối tượng có thể thay đổi ở bên trái. Sau khi thực hiện `score = 20`, `score` chứa `20`. Không thể gán lại cho đối tượng `const`.

Biểu thức gán tích hợp còn cho kết quả là lvalue chỉ định đối tượng bên trái sau khi cập nhật. Vì thế trong `if (score = 10)`, phép gán cập nhật `score`, rồi giá trị của đối tượng đó được chuyển sang `bool`; đây là lý do điều kiện thường đúng khi `10` khác `0`, chứ không phải phép kiểm tra bằng nhau.

Các phép gán kết hợp rút gọn thao tác cập nhật:

| Toán tử | Dạng tương ứng thường gặp |
|---|---|
| `x += y` | `x = x + y` |
| `x -= y` | `x = x - y` |
| `x *= y` | `x = x * y` |
| `x /= y` | `x = x / y` |
| `x %= y` | `x = x % y` |

Ví dụ, bắt đầu từ `score == 10`:

```cpp
int score{10};
score += 5;  // 15
score *= 2;  // 30
score -= 10; // 20
```

Mỗi phép gán đọc trạng thái hiện tại rồi cập nhật đối tượng đó.

Phép gán kết hợp tích hợp chỉ đánh giá biểu thức bên trái một lần. Điều đó quan trọng nếu bên trái có tác dụng phụ, ví dụ `values[index++] += increment`: `index++` chỉ được thực hiện một lần. Các dạng gán vẫn chịu giới hạn của phép toán tương ứng; `+=` không ngăn tràn số và `/=` vẫn cần tránh chia cho `0`.

Trong C++17, toán hạng bên phải của phép gán được sắp thứ tự trước toán hạng bên trái; thao tác ghi xảy ra sau khi tính các toán hạng. Khi biểu thức hai bên có tác dụng phụ, thứ tự này có thể ảnh hưởng đến giá trị được dùng, nên chỉ dựa vào nó khi quy tắc đó thực sự cần thiết và rõ ràng.

## 6. Toán tử tăng và giảm

Với kiểu số nguyên dựng sẵn, `++` tăng một đơn vị, `--` giảm một đơn vị. Vị trí toán tử quyết định giá trị mà biểu thức trả về:

| Biểu thức | Tác động lên biến | Giá trị của biểu thức |
|---|---|---|
| `++i` | Tăng `i` trước | Giá trị mới |
| `i++` | Tăng `i` | Giá trị cũ |
| `--i` | Giảm `i` trước | Giá trị mới |
| `i--` | Giảm `i` | Giá trị cũ |

```cpp
int i{5};
int oldValue = i++; // oldValue là 5, i thành 6
int newValue = ++i; // i thành 7, newValue là 7
```

Nếu chỉ cần thay đổi biến mà không dùng giá trị biểu thức, cả `++i` và `i++` đều tăng biến một lần. Với kiểu số nguyên dựng sẵn trong phần cập nhật của vòng lặp, hãy chọn dạng dễ đọc; không cần khẳng định một dạng luôn nhanh hơn.

Không thay đổi cùng một biến nhiều lần trong biểu thức nếu các thay đổi không được sắp thứ tự rõ ràng. Chẳng hạn, `i++ + i++` có hành vi không xác định trong C++17 vì hai lần sửa cùng đối tượng không được sắp thứ tự với nhau. Tách thành các câu lệnh riêng giúp kết quả có thứ tự xác định.

```cpp
int i{1};
int first = i++;  // first là 1, i thành 2
int second = i++; // second là 2, i thành 3
int sum = first + second; // 3
```

Mỗi câu lệnh hoàn tất trước câu lệnh tiếp theo, nên ở đây `sum` chắc chắn là `3` và `i` là `3`.

Các phép tăng giảm cũng chịu giới hạn của kiểu: tăng số nguyên có dấu đã ở giá trị lớn nhất hoặc giảm dưới giá trị nhỏ nhất có thể gây hành vi không xác định; unsigned tuân theo quy tắc modulo đã nêu ở phần số học. Trong phần cập nhật của vòng lặp, `++i` và `i++` đều phù hợp nếu giá trị cũ không được dùng; chọn dạng dễ đọc thay vì dựa vào khẳng định rằng một dạng luôn nhanh hơn.

## 7. Toán tử điều kiện `?:`

Toán tử điều kiện chọn một trong hai biểu thức theo một điều kiện:

```text
condition ? valueIfTrue : valueIfFalse
```

Điều kiện được đánh giá trước; chỉ biểu thức được chọn mới được đánh giá:

```cpp
int a{10};
int b{20};
int larger = (a > b) ? a : b; // 20
```

Với nhánh dài hoặc lồng nhiều điều kiện, `if-else` thường cho luồng xử lý dễ đọc hơn.

Kiểu của biểu thức điều kiện được xác định từ hai nhánh theo quy tắc của `?:`. Ví dụ trên có hai nhánh kiểu `int`, nên `larger` cũng là `int`; khi hai nhánh khác kiểu, C++ có thể chuyển đổi chúng trước khi xác định kiểu kết quả.

## 8. Thứ tự ưu tiên, kết hợp và đánh giá

**Thứ tự ưu tiên** xác định toán tử nào gắn với toán hạng trước. **Tính kết hợp** xác định cách nhóm các toán tử cùng mức ưu tiên. Hai khái niệm này không đồng nghĩa với thứ tự mà mọi toán hạng được đánh giá.

Bảng dưới đây chỉ gồm các nhóm chính được dùng trong bài, từ ưu tiên cao xuống thấp:

| Toán tử | Tính kết hợp |
|---|---|
| `i++`, `i--` | Từ trái sang phải |
| `++i`, `--i`, `!x`, `+x`, `-x` | Từ phải sang trái |
| `*`, `/`, `%` | Từ trái sang phải |
| `+`, `-` | Từ trái sang phải |
| `<`, `<=`, `>`, `>=` | Từ trái sang phải |
| `==`, `!=` | Từ trái sang phải |
| `&&` | Từ trái sang phải |
| `||` | Từ trái sang phải |
| `?:` | Từ phải sang trái |
| `=`, `+=`, `-=`, `*=`, `/=`, `%=` | Từ phải sang trái |

Dấu ngoặc đơn dùng để nhóm biểu thức, không phải một toán tử trong bảng. `2 + 3 * 4` được nhóm thành `2 + (3 * 4)` và cho `14`; `(2 + 3) * 4` cho `20`. Các phép cùng mức ưu tiên như phép trừ kết hợp trái: `20 - 5 - 3` được nhóm thành `(20 - 5) - 3`. Phép gán kết hợp phải: `a = b = 5` được nhóm thành `a = (b = 5)`.

Không suy ra thứ tự đánh giá toán hạng từ bảng ưu tiên. Trong `first() + second()`, C++17 không bảo đảm lời gọi nào xảy ra trước. Dấu ngoặc có thể đổi cách nhóm nhưng không đặt thứ tự đánh giá cho hai toán hạng của `+`. Nếu thứ tự quan trọng, thực hiện lời gọi trong các câu lệnh riêng rồi dùng kết quả.

Với toán tử logic tích hợp, quy tắc ngắn mạch đã nêu rõ thứ tự và điều kiện bỏ qua toán hạng phải. Với nhiều toán tử khác, thứ tự đánh giá có thể không được quy định như người đọc suy đoán. Tránh biểu thức vừa đọc vừa sửa cùng biến; `i++ + i++` là hành vi không xác định, không phải cách tính một tổng có kết quả dự đoán được.

## 9. Chuyển đổi kiểu trong biểu thức

Khi toán hạng có kiểu số khác nhau, C++ áp dụng các phép chuyển đổi số học thông thường để xác định kiểu phép tính và kết quả. Chẳng hạn:

```cpp
int count{3};
double ratio{2.5};
auto result = count + ratio;
```

`count` được chuyển sang `double`, nên `result` có kiểu `double` và giá trị `5.5`.

Chuyển đổi có thể làm mất phần lẻ hoặc thay đổi giá trị. Hãy chuyển kiểu trước phép toán khi muốn thay đổi kiểu thực hiện phép tính:

```cpp
int total{15};
int count{2};
double average = static_cast<double>(total) / count; // 7.5
```

Nếu chuyển `total / count` sang `double` sau khi chia, phép chia nguyên đã cho kết quả `7`; phép chuyển sau đó chỉ tạo ra `7.0`.

Cẩn thận khi trộn số nguyên có dấu và không dấu. Trong biểu thức `-1 < 1u`, `-1` được chuyển sang kiểu unsigned tương ứng; giá trị sau chuyển đổi là số unsigned lớn nhất của kiểu, nên kết quả so sánh là `false`. Chỉ dùng hai miền kiểu khác nhau khi đã kiểm soát rõ phạm vi giá trị và quy tắc chuyển đổi; phần [Biến, kiểu dữ liệu và quá trình biên dịch](/cpp/bat-dau/bien-kieu-du-lieu) trình bày sâu hơn về chuyển đổi số học.

### Một ví dụ kết hợp

Các điều kiện sau kiểm tra độc lập phạm vi, tính chẵn và khả năng chia hết cho cả `3` lẫn `5`:

```cpp
int n{30};
bool inRange = (n >= 1) && (n <= 100);
bool isEven = (n % 2 == 0);
bool divisibleBy3And5 = (n % 3 == 0) && (n % 5 == 0);
```

Với `n == 30`, cả ba giá trị đều là `true`. Các phép tính chẵn và chia hết không tự bị giới hạn bởi `inRange`; nếu yêu cầu nghiệp vụ chỉ cho đánh giá điều kiện sau khi `n` hợp lệ, hãy đặt các phép kiểm tra sau ở vế phải của `&&`, chẳng hạn `bool validAndDivisible = inRange && (n % 3 == 0) && (n % 5 == 0);`. Khi `inRange` sai, ngắn mạch bỏ qua những phép kiểm tra phía sau.

| `n` | Trong `[1, 100]` | Chẵn | Chia hết cho `3` và `5` |
|---:|---|---|---|
| `0` | `false` | `true` | `true` |
| `1` | `true` | `false` | `false` |
| `15` | `true` | `false` | `true` |
| `30` | `true` | `true` | `true` |
| `100` | `true` | `true` | `false` |
| `105` | `false` | `false` | `true` |

## Đọc tiếp

- [Biến, kiểu dữ liệu và quá trình biên dịch](/cpp/bat-dau/bien-kieu-du-lieu): Tìm hiểu phạm vi kiểu, chuyển đổi và giới hạn giá trị.
- [Nhập xuất, câu lệnh điều kiện và vòng lặp](/cpp/bat-dau/nhap-xuat-dieu-kien-vong-lap): Xem cách dùng biểu thức làm điều kiện và điều khiển luồng chương trình.
- [Tra cứu cú pháp C++](/cpp/tra-cuu/cu-phap): Tra cứu nhanh cú pháp C++17 thường gặp.
