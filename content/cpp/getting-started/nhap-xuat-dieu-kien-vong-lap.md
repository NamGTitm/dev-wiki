---
title: Nhập xuất, câu lệnh điều kiện và vòng lặp
description: Hướng dẫn sử dụng cin, cout, if-else, switch, for, while và do-while trong C++17, kèm ví dụ thực tế, xử lý lỗi và bài tập.
slug: /cpp/bat-dau/nhap-xuat-dieu-kien-vong-lap
category: fundamentals
categoryLabel: C++ căn bản
order: 20060
difficulty: beginner
badges: [Quan trọng]
keywords: [cin, cout, cerr, getline, if, else, switch, for, while, do while, break, continue]
updated: 2026-10-20
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/bat-dau/toan-tu", "/cpp/bat-dau/ham-pham-vi", "/cpp/thuat-toan/giai-quyet-bai-toan"]
---

# Nhập xuất, câu lệnh điều kiện và vòng lặp trong C++

Một chương trình không chỉ thực hiện các phép tính. Nó còn cần tiếp nhận dữ liệu, đưa ra quyết định và thực hiện những công việc lặp lại.

Trong C++, ba nhóm kiến thức này đóng vai trò nền tảng:

- **Nhập xuất (Input/Output):** Nhận dữ liệu đầu vào và hiển thị kết quả.
- **Câu lệnh điều kiện (Conditional Statements):** Quyết định chương trình sẽ thực hiện công việc nào.
- **Vòng lặp (Loops):** Thực hiện một công việc nhiều lần mà không cần viết lại cùng một đoạn mã.

Đây cũng là những kiến thức được sử dụng thường xuyên khi giải bài tập lập trình, xây dựng thuật toán và phát triển phần mềm.

## 1. Nhập và xuất dữ liệu

### 1.1. Thư viện iostream

Để nhập xuất dữ liệu thông qua thiết bị đầu cuối (terminal), C++ cung cấp thư viện `<iostream>`.

Ba đối tượng thường gặp:

| Đối tượng | Chức năng |
|---|---|
| `std::cin` | Đọc dữ liệu từ đầu vào chuẩn |
| `std::cout` | Ghi dữ liệu ra đầu ra chuẩn |
| `std::cerr` | Ghi thông báo lỗi ra luồng lỗi chuẩn |

Ví dụ đầu tiên:

```cpp
#include <iostream>

int main() {
    int age{};

    std::cout << "Nhap tuoi cua ban: ";
    std::cin >> age;

    std::cout << "Ban " << age << " tuoi.\n";

    return 0;
}
```

Kết quả khi nhập `16`:

```text
Nhap tuoi cua ban: 16
Ban 16 tuoi.
```

**Giải thích:**

- `#include <iostream>`: Khai báo sử dụng thư viện nhập xuất.
- `int age{}`: Tạo biến số nguyên `age`, khởi tạo giá trị bằng `0`.
- `std::cout <<`: Gửi dữ liệu ra màn hình.
- `std::cin >>`: Đọc dữ liệu vào biến.
- `'\n'`: Xuống dòng.
- `return 0`: Kết thúc chương trình và thông báo thực thi thành công.

Cần phân biệt hai toán tử:

- `<<`: Toán tử chèn dữ liệu vào luồng xuất.
- `>>`: Toán tử trích xuất dữ liệu từ luồng nhập.

### 1.2. Nhập nhiều giá trị

Có thể đọc nhiều biến trong một câu lệnh:

```cpp
#include <iostream>

int main() {
    int a{};
    int b{};

    std::cin >> a >> b;

    std::cout << "Tong: " << a + b << '\n';

    return 0;
}
```

Dữ liệu đầu vào:

```text
5 8
```

Kết quả:

```text
Tong: 13
```

Người dùng cũng có thể nhập:

```text
5
8
```

Kết quả vẫn giống nhau.

**Vì sao?**

Với các kiểu dữ liệu số, `std::cin >>` tự động bỏ qua khoảng trắng, tab và ký tự xuống dòng ở đầu dữ liệu cần đọc.

Điều này đặc biệt hữu ích trong các bài toán lập trình thi đấu, khi dữ liệu được cung cấp qua nhiều dòng.

### 1.3. Đọc một dòng văn bản với getline

`std::cin >>` chỉ đọc một từ đối với kiểu `std::string`, vì quá trình đọc dừng tại khoảng trắng.

Ví dụ, nếu nhập `Nguyen Van A`, câu lệnh:

```cpp
std::cin >> name;
```

chỉ lấy được `Nguyen`.

Để đọc toàn bộ dòng, sử dụng `std::getline()`:

```cpp
#include <iostream>
#include <string>

int main() {
    std::string name;

    std::cout << "Nhap ho ten: ";
    std::getline(std::cin, name);

    std::cout << "Xin chao, " << name << "!\n";

    return 0;
}
```

Kết quả:

```text
Nhap ho ten: Nguyen Van A
Xin chao, Nguyen Van A!
```

**Lưu ý quan trọng:** Nếu sử dụng `std::getline()` ngay sau `std::cin >>`, ký tự xuống dòng còn lại trong bộ đệm có thể khiến `getline()` đọc một dòng rỗng.

Có thể loại bỏ phần còn lại của dòng trước khi đọc:

```cpp
#include <iostream>
#include <limits>
#include <string>

int main() {
    int age{};
    std::string name;

    if (!(std::cin >> age)) {
        return 1;
    }

    std::cin.ignore(
        std::numeric_limits<std::streamsize>::max(),
        '\n'
    );

    std::getline(std::cin, name);

    std::cout << name << ": " << age << '\n';
}
```

### 1.4. Kiểm tra dữ liệu đầu vào

Không phải người dùng lúc nào cũng nhập đúng.

Giả sử chương trình yêu cầu một số nguyên nhưng nhận được chữ cái, quá trình đọc có thể thất bại.

Vì vậy, thay vì mặc định dữ liệu luôn hợp lệ, hãy kiểm tra kết quả:

```cpp
#include <iostream>

int main() {
    int age{};

    std::cout << "Nhap tuoi: ";

    if (!(std::cin >> age)) {
        std::cerr << "Loi: Tuoi phai la so nguyen.\n";
        return 1;
    }

    if (age < 0 || age > 150) {
        std::cerr << "Loi: Tuoi khong hop le.\n";
        return 1;
    }

    std::cout << "Tuoi hop le: " << age << '\n';

    return 0;
}
```

Ở đây có hai loại kiểm tra khác nhau:

1. **Kiểm tra cú pháp dữ liệu:** Đầu vào có đọc được thành số nguyên hay không?
2. **Kiểm tra tính hợp lệ:** Số nguyên đó có nằm trong phạm vi cho phép không?

Chẳng hạn:

| Dữ liệu nhập | Kết quả |
|---|---|
| `16` | Hợp lệ |
| `-5` | Không hợp lệ |
| `200` | Không hợp lệ |
| `abc` | Đọc thất bại |

Lưu ý rằng `std::cin >> age` có thể đọc thành công phần số của một chuỗi như `16abc` và để lại `abc` trong luồng nhập. Nếu cần xác thực toàn bộ dòng, phải xử lý thêm phần dữ liệu còn lại.

Đây là một nguyên tắc quan trọng: **Đọc được dữ liệu không đồng nghĩa với dữ liệu hợp lệ.**

---

## 2. Câu lệnh điều kiện

Trong thực tế, chương trình thường cần đưa ra quyết định.

Ví dụ:

- Nếu điểm lớn hơn hoặc bằng 5, học sinh đạt yêu cầu.
- Nếu mật khẩu không chính xác, từ chối đăng nhập.
- Nếu số chia bằng 0, không thực hiện phép chia.
- Nếu người dùng không có quyền, từ chối thao tác.

C++ cung cấp các câu lệnh điều kiện để xử lý những tình huống này.

### 2.1. Câu lệnh if

Cú pháp:

```cpp
if (condition) {
    // Thuc hien khi dieu kien dung
}
```

Phần thân chỉ được thực hiện khi biểu thức điều kiện có giá trị `true`.

Ví dụ:

```cpp
#include <iostream>

int main() {
    int age{};

    std::cin >> age;

    if (age >= 18) {
        std::cout << "Ban da du 18 tuoi.\n";
    }

    return 0;
}
```

Nếu nhập `20`, thông báo được hiển thị.

Nếu nhập `15`, chương trình bỏ qua khối `if`.

### 2.2. Câu lệnh if-else

Khi cần xử lý cả hai trường hợp đúng và sai, sử dụng `if-else`.

Cú pháp:

```cpp
if (condition) {
    // Khi dieu kien dung
} else {
    // Khi dieu kien sai
}
```

Ví dụ kiểm tra số chẵn, lẻ:

```cpp
#include <iostream>

int main() {
    int n{};

    if (!(std::cin >> n)) {
        return 1;
    }

    if (n % 2 == 0) {
        std::cout << "So chan\n";
    } else {
        std::cout << "So le\n";
    }

    return 0;
}
```

Toán tử `%` trả về phần dư của phép chia nguyên.

- Nếu `n % 2 == 0`, số đó là số chẵn.
- Ngược lại, số đó là số lẻ.

**Phân biệt `=` và `==`:**

| Toán tử | Ý nghĩa |
|---|---|
| `=` | Gán giá trị |
| `==` | So sánh bằng nhau |
| `!=` | So sánh khác nhau |
| `>` | Lớn hơn |
| `<` | Nhỏ hơn |
| `>=` | Lớn hơn hoặc bằng |
| `<=` | Nhỏ hơn hoặc bằng |

Một lỗi phổ biến là viết `if (a = 5)` thay vì `if (a == 5)`.

Biểu thức đầu tiên thực hiện phép gán, sau đó chuyển giá trị được gán thành `bool` để kiểm tra. Với giá trị `5`, điều kiện luôn đúng.

### 2.3. Câu lệnh else if if-else

Khi chương trình có nhiều trường hợp, sử dụng chuỗi `else if`.

Ví dụ xếp loại điểm:

```cpp
#include <iostream>

int main() {
    double score{};

    std::cout << "Nhap diem: ";

    if (!(std::cin >> score)) {
        std::cerr << "Diem khong hop le.\n";
        return 1;
    }

    if (score < 0 || score > 10) {
        std::cerr << "Diem phai nam trong [0, 10].\n";
        return 1;
    }

    if (score >= 8) {
        std::cout << "Gioi\n";
    } else if (score >= 6.5) {
        std::cout << "Kha\n";
    } else if (score >= 5) {
        std::cout << "Trung binh\n";
    } else {
        std::cout << "Chua dat\n";
    }

    return 0;
}
```

Ví dụ nhập:

```text
7.5
```

Kết quả:

```text
Kha
```

**Cách chương trình hoạt động:**

1. Kiểm tra `score >= 8`, kết quả sai.
2. Kiểm tra `score >= 6.5`, kết quả đúng.
3. Thực hiện nhánh in `Kha`.
4. Bỏ qua những nhánh còn lại.

Điều quan trọng là **thứ tự kiểm tra ảnh hưởng trực tiếp đến kết quả**.

Nếu kiểm tra `score >= 5` trước `score >= 8`, điểm `9` có thể bị xếp vào nhóm trung bình.

### 2.4. Câu lệnh switch

`switch` phù hợp khi cần so sánh một biểu thức với nhiều giá trị rời rạc.

Ví dụ xây dựng menu:

```cpp
#include <iostream>

int main() {
    int choice{};

    std::cout << "1. Bat dau\n";
    std::cout << "2. Cai dat\n";
    std::cout << "3. Thoat\n";

    if (!(std::cin >> choice)) {
        return 1;
    }

    switch (choice) {
        case 1:
            std::cout << "Bat dau chuong trinh\n";
            break;

        case 2:
            std::cout << "Mo cai dat\n";
            break;

        case 3:
            std::cout << "Tam biet!\n";
            break;

        default:
            std::cout << "Lua chon khong hop le\n";
            break;
    }

    return 0;
}
```

Các thành phần chính:

- `switch`: Nhận biểu thức cần kiểm tra.
- `case`: Định nghĩa một giá trị có thể xảy ra.
- `break`: Thoát khỏi câu lệnh `switch`.
- `default`: Xử lý khi không có `case` nào phù hợp.

Nếu thiếu `break`, chương trình có thể tiếp tục chạy vào nhánh tiếp theo. Hành vi này được gọi là *fallthrough*.

Trong C++17, có thể dùng `[[fallthrough]];` để thể hiện rõ trường hợp cố ý chạy xuyên nhánh.

**Khi nào chọn if-else, khi nào chọn switch?**

| Tình huống | Nên sử dụng |
|---|---|
| So sánh khoảng giá trị | `if-else` |
| Kết hợp nhiều điều kiện logic | `if-else` |
| Kiểm tra các giá trị nguyên cụ thể | `switch` |
| Xử lý các giá trị enum | `switch` |

`switch` không hỗ trợ trực tiếp so sánh khoảng như `score >= 8`, cũng không hỗ trợ `std::string` làm biểu thức lựa chọn trong C++17.

---

## 3. Vòng lặp trong C++

Giả sử cần in các số từ 1 đến 100.

Viết 100 câu lệnh `std::cout` là cách làm dài dòng, khó bảo trì và rất dễ sai.

Vòng lặp giải quyết vấn đề bằng cách thực hiện một khối lệnh nhiều lần.

C++ có ba dạng vòng lặp cơ bản:

- `for`
- `while`
- `do-while`

### 3.1. Vòng lặp for

`for` thường được sử dụng khi có biến đếm hoặc khi biết trước số lần cần lặp.

Cú pháp:

```cpp
for (a; b; c) {
    // Cong viec can lap
}
```

Trong đó:

- `a`: Khởi tạo biến đếm.
- `b`: Điều kiện tiếp tục vòng lặp.
- `c`: Cập nhật biến đếm sau mỗi lần lặp.

Ví dụ in các số từ 1 đến 5:

```cpp
#include <iostream>

int main() {
    for (int i = 1; i <= 5; ++i) {
        std::cout << i << ' ';
    }

    std::cout << '\n';

    return 0;
}
```

Kết quả:

```text
1 2 3 4 5
```

**Phân tích từng lần lặp:**

| Lần lặp | Giá trị i | Điều kiện i <= 5 | Hành động |
|---|---|---|---|
| 1 | 1 | Đúng | In 1 |
| 2 | 2 | Đúng | In 2 |
| 3 | 3 | Đúng | In 3 |
| 4 | 4 | Đúng | In 4 |
| 5 | 5 | Đúng | In 5 |
| 6 | 6 | Sai | Kết thúc |

Câu lệnh `++i` tăng biến `i` lên một đơn vị.

Trong ví dụ này, `i++` cũng cho kết quả tương đương.

**Ví dụ: In số chẵn từ 2 đến 10**

```cpp
for (int i = 2; i <= 10; i += 2) {
    std::cout << i << ' ';
}
```

Kết quả:

```text
2 4 6 8 10
```

Không bắt buộc mỗi vòng lặp chỉ tăng một đơn vị. Biến đếm có thể tăng hoặc giảm theo bước phù hợp.

### 3.2. Vòng lặp while

`while` phù hợp khi số lần lặp phụ thuộc vào một điều kiện và chưa xác định trước.

Cú pháp:

```cpp
while (condition) {
    // Cong viec can lap
}
```

Điều kiện được kiểm tra **trước mỗi lần thực hiện thân vòng lặp**.

Ví dụ đếm ngược:

```cpp
#include <iostream>

int main() {
    int count{5};

    while (count > 0) {
        std::cout << count << ' ';
        --count;
    }

    std::cout << "Bat dau!\n";

    return 0;
}
```

Kết quả:

```text
5 4 3 2 1 Bat dau!
```

Chương trình thực hiện:

1. Kiểm tra `count > 0`.
2. In giá trị hiện tại.
3. Giảm `count` đi một.
4. Quay lại kiểm tra điều kiện.
5. Thoát khi `count` bằng `0`.

Nếu điều kiện sai ngay từ đầu, thân vòng lặp sẽ không được thực hiện lần nào.

### 3.3. Vòng lặp do-while

Khác với `while`, vòng lặp `do-while` kiểm tra điều kiện **sau khi thực hiện thân vòng lặp**.

Vì vậy, thân vòng lặp luôn được thực hiện ít nhất một lần.

Cú pháp:

```cpp
do {
    // Cong viec can lap
} while (condition);
```

Ví dụ yêu cầu người dùng nhập `0` để thoát:

```cpp
#include <iostream>

int main() {
    int choice{};

    do {
        std::cout << "Nhap 0 de thoat: ";

        if (!(std::cin >> choice)) {
            std::cerr << "Du lieu khong hop le.\n";
            return 1;
        }
    } while (choice != 0);

    std::cout << "Da thoat chuong trinh.\n";

    return 0;
}
```

Ví dụ quá trình chạy:

```text
Nhap 0 de thoat: 5
Nhap 0 de thoat: 2
Nhap 0 de thoat: 0
Da thoat chuong trinh.
```

Ở đây vòng lặp tiếp tục cho đến khi người dùng nhập `0`.

**Lưu ý:** Khác với `while` và `for`, cú pháp `do-while` bắt buộc có dấu `;` sau điều kiện.

### 3.4. So sánh ba loại vòng lặp

| Tiêu chí | for | while | do-while |
|---|---|---|---|
| Kiểm tra điều kiện | Trước thân | Trước thân | Sau thân |
| Có thể chạy 0 lần | Có | Có | Không |
| Phù hợp với biến đếm | Rất tốt | Có thể | Có thể |
| Phù hợp với nhập liệu lặp lại | Có thể | Tốt | Rất tốt |
| Thường sử dụng | Duyệt, đếm | Lặp theo điều kiện | Menu, yêu cầu nhập lại |

Không có vòng lặp nào tốt nhất cho mọi trường hợp. Hãy chọn kiểu giúp người đọc hiểu rõ ý định của chương trình.

---

## 4. Điều khiển vòng lặp với break và continue

Ngoài điều kiện lặp, C++ cung cấp hai câu lệnh để thay đổi luồng thực thi.

### 4.1. break: Thoát khỏi vòng lặp

`break` lập tức kết thúc vòng lặp gần nhất bao quanh nó.

Ví dụ:

```cpp
for (int i = 1; i <= 10; ++i) {
    if (i == 5) {
        break;
    }

    std::cout << i << ' ';
}
```

Kết quả:

```text
1 2 3 4
```

Khi `i` bằng `5`, vòng lặp kết thúc, không tiếp tục đến `10`.

### 4.2. continue: Bỏ qua lần lặp hiện tại

`continue` bỏ qua phần còn lại của thân vòng lặp hiện tại và chuyển sang bước lặp tiếp theo.

Ví dụ chỉ in số lẻ:

```cpp
for (int i = 1; i <= 10; ++i) {
    if (i % 2 == 0) {
        continue;
    }

    std::cout << i << ' ';
}
```

Kết quả:

```text
1 3 5 7 9
```

Khác biệt cần nhớ:

- `break`: Kết thúc toàn bộ vòng lặp hiện tại.
- `continue`: Chỉ bỏ qua phần còn lại của lần lặp hiện tại.

Với vòng lặp lồng nhau, `break` chỉ thoát khỏi vòng lặp gần nhất, không tự động thoát khỏi tất cả các vòng.

---

## 5. Bài toán thực hành: Tính tổng từ 1 đến n

Hãy vận dụng kiến thức vừa học vào một bài toán hoàn chỉnh.

**Đề bài**

Nhập số nguyên dương `n`. Tính tổng:

\[
S = 1 + 2 + 3 + \cdots + n
\]

Ví dụ:

**Input**

```text
5
```

**Output**

```text
15
```

Vì:

\[
1 + 2 + 3 + 4 + 5 = 15
\]

### 5.1. Phân tích thuật toán

Các bước giải quyết:

1. Đọc số nguyên `n`.
2. Kiểm tra `n` có hợp lệ không.
3. Khởi tạo biến `sum = 0`.
4. Dùng vòng lặp chạy từ `1` đến `n`.
5. Cộng giá trị hiện tại vào `sum`.
6. In kết quả.

### 5.2. Chương trình C++17

```cpp
#include <iostream>

int main() {
    int n{};

    if (!(std::cin >> n)) {
        std::cerr << "Du lieu khong hop le.\n";
        return 1;
    }

    if (n <= 0 || n > 1'000'000) {
        std::cerr << "n phai nam trong [1, 1000000].\n";
        return 1;
    }

    long long sum{};

    for (int i = 1; i <= n; ++i) {
        sum += i;
    }

    std::cout << sum << '\n';

    return 0;
}
```

### 5.3. Phân tích chương trình

**Biến n**

Lưu số nguyên đầu vào. Chương trình giới hạn `n` trong đoạn `[1, 1000000]` để xác định rõ phạm vi được hỗ trợ.

**Biến sum**

Được khai báo dưới kiểu `long long`, có khả năng chứa các giá trị nguyên lớn hơn kiểu `int` thông thường.

**Vòng lặp for**

Thực hiện phép cộng lần lượt:

| i | sum trước phép cộng | sum sau phép cộng |
|---|---|---|
| 1 | 0 | 1 |
| 2 | 1 | 3 |
| 3 | 3 | 6 |
| 4 | 6 | 10 |
| 5 | 10 | 15 |

Khi `i` vượt quá `n`, vòng lặp kết thúc.

### 5.4. Phân tích độ phức tạp

Vòng lặp thực hiện `n` lần, mỗi lần chỉ có một phép cộng.

Vì vậy:

- **Độ phức tạp thời gian:** `O(n)`.
- **Độ phức tạp bộ nhớ phụ:** `O(1)`.

Chương trình không cần tạo mảng hoặc lưu toàn bộ các số từ `1` đến `n`.

**Mở rộng:** Bài toán còn có thể giải bằng công thức:

\[
S = \frac{n(n+1)}{2}
\]

Công thức này cho phép tính tổng với `O(1)` thời gian. Tuy nhiên, cần chú ý đến khả năng tràn số khi thực hiện phép nhân. Việc chọn kiểu dữ liệu và kiểm tra phạm vi đầu vào vẫn cần thiết.

---

## 6. Những lỗi thường gặp

### 6.1. Vòng lặp vô hạn

Ví dụ:

```cpp
int i = 1;

while (i <= 5) {
    std::cout << i << '\n';
}
```

Biến `i` không bao giờ thay đổi.

Vì thế, điều kiện `i <= 5` luôn đúng và chương trình liên tục in `1`.

Cách sửa:

```cpp
int i = 1;

while (i <= 5) {
    std::cout << i << '\n';
    ++i;
}
```

Lưu ý rằng vòng lặp vô hạn không phải lúc nào cũng là lỗi. Một số chương trình server hoặc vòng lặp xử lý sự kiện cố tình chạy liên tục, nhưng phải có cơ chế dừng phù hợp.

### 6.2. Sai điều kiện biên

Xét vòng lặp:

```cpp
for (int i = 0; i <= 5; ++i) {
    std::cout << i << ' ';
}
```

Vòng lặp này chạy **6 lần**, từ `0` đến `5`.

Nếu muốn chạy đúng 5 lần, cần viết:

```cpp
for (int i = 0; i < 5; ++i) {
    std::cout << i << ' ';
}
```

Lỗi này thường được gọi là *off-by-one error*.

Khi duyệt mảng có `n` phần tử với chỉ số bắt đầu từ `0`, chỉ số hợp lệ thông thường là `0` đến `n - 1`.

### 6.3. Quên dấu ngoặc nhọn

Ví dụ:

```cpp
if (score >= 5)
    std::cout << "Dat\n";
    std::cout << "Chuc mung!\n";
```

Chỉ câu lệnh đầu tiên thuộc `if`.

Câu lệnh in `Chuc mung!` luôn thực hiện, bất kể điều kiện đúng hay sai.

Nên sử dụng `{}` ngay cả khi chỉ có một câu lệnh:

```cpp
if (score >= 5) {
    std::cout << "Dat\n";
    std::cout << "Chuc mung!\n";
}
```

Cách viết này rõ ràng và an toàn hơn khi mở rộng chương trình.

### 6.4. Không kiểm tra cin

Nếu dữ liệu đầu vào không khớp với kiểu cần đọc, `std::cin` có thể chuyển sang trạng thái lỗi.

Khi đó, các lần đọc tiếp theo cũng có thể thất bại cho đến khi trạng thái lỗi được xử lý.

Với chương trình đơn giản, có thể thông báo và kết thúc.

Với chương trình yêu cầu người dùng nhập lại, cần xóa trạng thái lỗi bằng `std::cin.clear()` và loại bỏ dữ liệu không hợp lệ bằng `std::cin.ignore()` trước khi đọc tiếp.

### 6.5. Sử dụng sai switch

Hai lỗi phổ biến:

- Thiếu `break`, khiến chương trình chạy xuyên sang `case` tiếp theo.
- Dùng `switch` để kiểm tra điều kiện dạng khoảng giá trị vốn phù hợp hơn với `if-else`.

Đừng cố sử dụng `switch` cho mọi vấn đề chỉ vì mã trông ngắn hơn.

---

## 7. Bài tập tự luyện

Hãy tự giải trước khi tham khảo lời giải hoặc sử dụng công cụ hỗ trợ.

### Bài 1. Kiểm tra số chẵn, lẻ

**Yêu cầu:** Nhập số nguyên `n` và xác định số đó là chẵn hay lẻ.

Ví dụ:

```text
Input:
7

Output:
So le
```

**Gợi ý:** Sử dụng toán tử `%` và câu lệnh `if-else`.

### Bài 2. Tìm số lớn nhất

**Yêu cầu:** Nhập ba số nguyên `a`, `b`, `c`. In giá trị lớn nhất.

Ví dụ:

```text
Input:
5 12 8

Output:
12
```

**Gợi ý:** Sử dụng `if-else` và phép so sánh. Cần xử lý cả trường hợp các số bằng nhau.

### Bài 3. Tính tổng các số chẵn

**Yêu cầu:** Nhập số nguyên dương `n`, tính tổng các số chẵn từ `1` đến `n`.

Ví dụ:

```text
Input:
10

Output:
30
```

Vì:

\[
2 + 4 + 6 + 8 + 10 = 30
\]

**Gợi ý:** Kết hợp vòng lặp `for` với điều kiện `i % 2 == 0`.

### Bài 4. Bảng cửu chương

**Yêu cầu:** Nhập số nguyên `n` từ `1` đến `9`, in bảng nhân của số đó từ `1` đến `10`.

Ví dụ:

```text
Input:
3

Output:
3 x 1 = 3
3 x 2 = 6
3 x 3 = 9
...
3 x 10 = 30
```

**Gợi ý:** Sử dụng vòng lặp `for`.

### Bài 5. Đếm chữ số

**Yêu cầu:** Nhập số nguyên không âm `n`, xác định số chữ số thập phân của số đó.

Ví dụ:

```text
Input:
12345

Output:
5
```

**Gợi ý:** Mỗi lần chia nguyên cho `10`, ta loại bỏ một chữ số cuối.

Chú ý trường hợp đặc biệt `n = 0`, vì số `0` có một chữ số.

---

## 8. Tổng kết kiến thức

| Thành phần | Vai trò |
|---|---|
| `std::cin` | Nhận dữ liệu |
| `std::cout` | Xuất dữ liệu |
| `std::cerr` | Thông báo lỗi |
| `std::getline()` | Đọc một dòng |
| `if` | Thực hiện khi điều kiện đúng |
| `else if` | Kiểm tra điều kiện tiếp theo |
| `else` | Xử lý trường hợp còn lại |
| `switch` | Lựa chọn theo giá trị rời rạc |
| `for` | Lặp với biến đếm hoặc bước lặp rõ ràng |
| `while` | Lặp khi điều kiện còn đúng |
| `do-while` | Thực hiện ít nhất một lần rồi kiểm tra |
| `break` | Thoát khỏi vòng lặp hoặc switch |
| `continue` | Bỏ qua phần còn lại của lần lặp hiện tại |

Sau bài học này, bạn cần có khả năng tự viết một chương trình thực hiện ba công việc cơ bản: **nhận dữ liệu, xử lý bằng điều kiện hoặc vòng lặp, và xuất kết quả**.

Quan trọng hơn, hãy hình thành thói quen kiểm tra đầu vào, xác định rõ điều kiện dừng và thử nghiệm các trường hợp biên trước khi coi chương trình đã hoàn thành.

## Đọc tiếp

- [Toán tử trong C++](/cpp/bat-dau/toan-tu): Tìm hiểu biểu thức, toán tử logic và các phép so sánh.
- [Hàm và phạm vi biến](/cpp/bat-dau/ham-pham-vi): Tổ chức chương trình thành những phần nhỏ, dễ tái sử dụng.
- [Giải quyết bài toán bằng thuật toán](/cpp/thuat-toan/giai-quyet-bai-toan): Học cách phân tích yêu cầu, thiết kế thuật toán và đánh giá độ phức tạp.
