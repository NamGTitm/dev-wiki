---
title: Mảng và chuỗi
description: Hướng dẫn sử dụng mảng một chiều, mảng hai chiều, std::array, std::string, truy cập phần tử, xử lý chuỗi và kiểm tra giới hạn trong C++17.
slug: /cpp/bat-dau/mang-string
category: fundamentals
categoryLabel: C++ căn bản
order: 20080
difficulty: beginner
keywords: [array C++, std::array, mảng một chiều, mảng hai chiều, std::string, char array, index, array bounds, getline, string manipulation]
updated: 2026-10-21
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/bat-dau/ham-pham-vi", "/cpp/bat-dau/references-pointers", "/cpp/trung-cap/vector-struct-enum", "/cpp/thuat-toan/prefix-sum-difference-array"]
---

# Mảng và chuỗi trong C++

Trong các bài học trước, chúng ta đã sử dụng biến để lưu trữ dữ liệu như số tuổi, điểm số hoặc kết quả tính toán.

Tuy nhiên, nếu cần lưu điểm của 40 học sinh, việc khai báo 40 biến riêng biệt sẽ khiến chương trình dài dòng và khó quản lý.

Ví dụ:

```cpp
int score1{8};
int score2{9};
int score3{7};
```

Cách viết này không phù hợp khi số lượng dữ liệu tăng lên.

Để giải quyết vấn đề, C++ cung cấp các cấu trúc cho phép lưu và xử lý nhiều phần tử.

Hai nhóm kiến thức quan trọng là:

- **Mảng (Array):** Lưu một tập hợp phần tử cùng kiểu và truy cập thông qua chỉ số.
- **Chuỗi (String):** Biểu diễn và xử lý dữ liệu dạng văn bản.

Trong C++ hiện đại, chúng ta thường sử dụng `std::array`, `std::vector` và `std::string` thay vì trực tiếp quản lý các mảng kiểu C khi không cần thiết.

Bài học này giúp bạn nắm được:

1. Khái niệm và cách khai báo mảng.
2. Truy cập và duyệt mảng một chiều.
3. Sự khác biệt giữa mảng C và `std::array`.
4. Cách sử dụng mảng hai chiều.
5. Khai báo và thao tác với `std::string`.
6. Phân biệt chuỗi C và chuỗi C++.
7. Cách tránh truy cập ngoài phạm vi.
8. Ứng dụng mảng và chuỗi trong những bài toán thực tế.

**Tiêu chuẩn sử dụng:** C++17.

---

## 1. Mảng là gì?

Mảng (array) là cấu trúc lưu trữ một tập hợp các phần tử có cùng kiểu dữ liệu.

Mỗi phần tử có thể được truy cập thông qua một chỉ số (index).

Ví dụ, cần lưu điểm của 5 học sinh:

```text
Điểm:     7   9   8   6   10
Chỉ số:   0   1   2   3    4
```

Một đặc điểm quan trọng của mảng trong C++ là **chỉ số bắt đầu từ 0**, không phải 1.

Với mảng có 5 phần tử:

- Phần tử đầu tiên có chỉ số `0`.
- Phần tử thứ hai có chỉ số `1`.
- Phần tử cuối cùng có chỉ số `4`.

### 1.1. Tại sao cần sử dụng mảng?

Giả sử cần tính tổng điểm của 5 học sinh.

Không sử dụng mảng:

```cpp
int a{7};
int b{9};
int c{8};
int d{6};
int e{10};

int total = a + b + c + d + e;
```

Sử dụng mảng:

```cpp
#include <array>

std::array<int, 5> scores{7, 9, 8, 6, 10};
```

Khi dữ liệu được tổ chức thành một tập hợp, chúng ta có thể dùng vòng lặp để xử lý thay vì phải viết một phép toán riêng cho từng biến.

### 1.2. Đặc điểm của mảng

Mảng có một số đặc điểm cơ bản:

- Các phần tử có cùng kiểu dữ liệu.
- Mỗi phần tử có một vị trí xác định.
- Chỉ số thường bắt đầu từ `0`.
- Có thể truy cập trực tiếp phần tử thông qua chỉ số.
- Các phần tử của mảng C và `std::array` được lưu liên tiếp trong bộ nhớ.

Đối với mảng có kích thước cố định, số lượng phần tử được xác định khi khai báo kiểu mảng.

Nếu cần thay đổi số lượng phần tử trong lúc chạy chương trình, `std::vector` thường phù hợp hơn.

---

## 2. Khai báo mảng một chiều

Trong C++, có hai cách biểu diễn mảng kích thước cố định mà người mới thường gặp:

- Mảng truyền thống kiểu C.
- `std::array` của thư viện chuẩn C++.

### 2.1. Mảng truyền thống

Cú pháp:

```cpp
Type name[size];
```

Ví dụ:

```cpp
int scores[5]{7, 9, 8, 6, 10};
```

Trong đó:

- `int`: Kiểu dữ liệu của phần tử.
- `scores`: Tên mảng.
- `5`: Số phần tử.
- `{7, 9, 8, 6, 10}`: Danh sách giá trị khởi tạo.

Có thể truy cập phần tử:

```cpp
scores[0];
scores[1];
scores[4];
```

### 2.2. Khởi tạo mảng

Ví dụ:

```cpp
int numbers[4]{1, 2, 3, 4};
```

Hoặc:

```cpp
int numbers[4]{};
```

Với ví dụ thứ hai, cả bốn phần tử đều được khởi tạo thành `0`.

Có thể bỏ kích thước khi compiler suy ra được từ danh sách khởi tạo:

```cpp
int numbers[]{10, 20, 30};
```

Mảng trên có 3 phần tử.

### 2.3. Mảng có kích thước cố định

Đối với mảng C thông thường, kích thước phải là biểu thức hằng phù hợp theo chuẩn C++.

Ví dụ:

```cpp
constexpr int size{5};

int numbers[size]{};
```

Đây là cú pháp hợp lệ.

Ngược lại:

```cpp
int n{};
std::cin >> n;

int numbers[n];
```

không phải C++17 chuẩn vì `n` chỉ có giá trị tại runtime.

Một số compiler hỗ trợ mảng có kích thước biến đổi (Variable Length Array) dưới dạng extension, nhưng không nên dựa vào tính năng này trong mã C++17 portable.

Nếu kích thước được xác định lúc chạy, nên sử dụng `std::vector`.

---

## 3. std::array trong C++17

`std::array` là một container của thư viện chuẩn, biểu diễn mảng có kích thước cố định.

Header:

```cpp
#include <array>
```

Cú pháp:

```cpp
std::array<Type, Size> name;
```

Ví dụ:

```cpp
std::array<int, 5> scores{7, 9, 8, 6, 10};
```

### 3.1. Ví dụ hoàn chỉnh

```cpp
#include <array>
#include <iostream>

int main() {
    std::array<int, 5> scores{7, 9, 8, 6, 10};

    std::cout << scores[0] << '\n';
    std::cout << scores[2] << '\n';
    std::cout << scores[4] << '\n';

    return 0;
}
```

Kết quả:

```text
7
8
10
```

### 3.2. Tại sao nên sử dụng std::array?

So với mảng truyền thống, `std::array` có giao diện thuận tiện hơn.

Ví dụ:

```cpp
scores.size();
scores.at(0);
scores.front();
scores.back();
scores.begin();
scores.end();
```

| Thành phần | Công dụng |
|---|---|
| `size()` | Trả về số phần tử |
| `empty()` | Kiểm tra mảng có rỗng không |
| `at(index)` | Truy cập phần tử có kiểm tra phạm vi |
| `operator[]` | Truy cập trực tiếp theo chỉ số |
| `front()` | Truy cập phần tử đầu |
| `back()` | Truy cập phần tử cuối |
| `begin()` | Iterator đầu dãy |
| `end()` | Iterator sau phần tử cuối |

`std::array` tương thích tốt với các thuật toán của thư viện chuẩn như `std::sort`, `std::find` và `std::accumulate`.

### 3.3. Kích thước không thay đổi

Ví dụ:

```cpp
std::array<int, 3> values{1, 2, 3};
```

Mảng có đúng 3 phần tử.

Không thể gọi:

```cpp
values.push_back(4);
```

vì `std::array` không cung cấp `push_back()`.

Kích thước là một phần của kiểu dữ liệu:

```cpp
std::array<int, 3>
```

và:

```cpp
std::array<int, 5>
```

là hai kiểu khác nhau.

Nếu cần thêm hoặc xóa phần tử linh hoạt, nên sử dụng `std::vector`.

---

## 4. Chỉ số và truy cập phần tử

### 4.1. Chỉ số bắt đầu từ 0

Cho mảng:

```cpp
std::array<int, 4> numbers{10, 20, 30, 40};
```

Các phần tử:

| Chỉ số | Giá trị |
|---|---|
| `0` | 10 |
| `1` | 20 |
| `2` | 30 |
| `3` | 40 |

Với mảng có `n` phần tử và `n > 0`, chỉ số hợp lệ nằm trong đoạn:

\[
0 \le i < n
\]

Phần tử cuối có chỉ số:

\[
n - 1
\]

### 4.2. Thay đổi phần tử

```cpp
#include <array>
#include <iostream>

int main() {
    std::array<int, 3> values{10, 20, 30};

    values[1] = 100;

    for (int value : values) {
        std::cout << value << ' ';
    }

    std::cout << '\n';

    return 0;
}
```

Kết quả:

```text
10 100 30
```

Câu lệnh:

```cpp
values[1] = 100;
```

thay đổi phần tử thứ hai.

### 4.3. Truy cập ngoài phạm vi

Cho mảng:

```cpp
std::array<int, 3> values{10, 20, 30};
```

Biểu thức:

```cpp
values[3]
```

không hợp lệ để truy cập phần tử vì chỉ số lớn nhất là `2`.

`std::array::operator[]` không thực hiện kiểm tra phạm vi ở runtime theo hợp đồng giao diện.

Truy cập ngoài phạm vi gây hành vi không xác định.

Chương trình có thể:

- Bị crash.
- Đọc dữ liệu không mong muốn.
- Ghi đè bộ nhớ.
- Có vẻ hoạt động bình thường trong một lần chạy.

Không nên dựa vào bất kỳ hành vi nào trong các trường hợp trên.

### 4.4. Truy cập bằng at()

`std::array` cung cấp hàm `at()` để kiểm tra chỉ số.

```cpp
#include <array>
#include <iostream>
#include <stdexcept>

int main() {
    std::array<int, 3> values{10, 20, 30};

    try {
        std::cout << values.at(3) << '\n';
    } catch (const std::out_of_range&) {
        std::cerr << "Chi so vuot pham vi.\n";
    }

    return 0;
}
```

Kết quả:

```text
Chi so vuot pham vi.
```

Khác với `operator[]`, `at()` ném `std::out_of_range` nếu chỉ số không hợp lệ.

### 4.5. Mảng rỗng

C++ cho phép khai báo:

```cpp
std::array<int, 0> values{};
```

Mảng này không có phần tử.

Kết quả:

```cpp
values.empty()
```

là `true`.

Với mảng rỗng, không được truy cập:

```cpp
values[0];
values.front();
values.back();
```

Đặc biệt, biểu thức:

```cpp
values.size() - 1
```

không nên dùng để lấy chỉ số cuối nếu chưa kiểm tra mảng không rỗng.

Vì `size()` trả về kiểu không dấu, phép trừ `0 - 1` có thể tạo ra một giá trị rất lớn.

---

## 5. Duyệt mảng một chiều

Duyệt mảng là quá trình truy cập lần lượt các phần tử để đọc hoặc xử lý dữ liệu.

Có nhiều cách thực hiện.

### 5.1. Vòng lặp for

```cpp
#include <array>
#include <iostream>

int main() {
    std::array<int, 5> numbers{10, 20, 30, 40, 50};

    for (std::size_t i = 0; i < numbers.size(); ++i) {
        std::cout << numbers[i] << '\n';
    }

    return 0;
}
```

Kết quả:

```text
10
20
30
40
50
```

**Phân tích:**

- `i = 0`: Bắt đầu tại phần tử đầu tiên.
- `i < numbers.size()`: Bảo đảm chỉ số nằm trong phạm vi.
- `++i`: Chuyển sang phần tử kế tiếp.
- `numbers[i]`: Truy cập phần tử hiện tại.

Ở đây sử dụng `std::size_t` vì đây là kiểu được `size()` trả về.

### 5.2. Range-based for

C++11 giới thiệu range-based `for`, giúp duyệt phần tử trực tiếp.

```cpp
#include <array>
#include <iostream>

int main() {
    std::array<int, 5> numbers{10, 20, 30, 40, 50};

    for (int number : numbers) {
        std::cout << number << ' ';
    }

    std::cout << '\n';

    return 0;
}
```

Kết quả:

```text
10 20 30 40 50
```

Cách viết này ngắn gọn khi không cần sử dụng chỉ số.

### 5.3. Duyệt bằng reference

Xét đoạn mã:

```cpp
std::array<int, 3> values{1, 2, 3};

for (int value : values) {
    value *= 2;
}
```

Sau vòng lặp, mảng vẫn chứa:

```text
1 2 3
```

Vì biến `value` nhận một bản sao của từng phần tử.

Muốn sửa trực tiếp:

```cpp
for (int& value : values) {
    value *= 2;
}
```

Kết quả:

```text
2 4 6
```

Khi chỉ cần đọc, có thể sử dụng:

```cpp
for (const auto& value : values) {
    std::cout << value << '\n';
}
```

Với kiểu nhỏ như `int`, truyền theo giá trị trong vòng lặp thường rất đơn giản và phù hợp.

---

## 6. Các bài toán cơ bản với mảng

### 6.1. Tính tổng phần tử

Cho mảng:

```text
7 9 8 6 10
```

Yêu cầu tính:

\[
S = 7 + 9 + 8 + 6 + 10 = 40
\]

Chương trình:

```cpp
#include <array>
#include <iostream>

int main() {
    std::array<int, 5> scores{7, 9, 8, 6, 10};

    long long total{};

    for (int score : scores) {
        total += score;
    }

    std::cout << "Tong: " << total << '\n';

    return 0;
}
```

Kết quả:

```text
Tong: 40
```

Sử dụng `long long` cho biến tổng giúp hỗ trợ phạm vi kết quả lớn hơn so với `int` thông thường.

Tuy nhiên, cần kiểm tra giới hạn đầu vào nếu tổng vẫn có nguy cơ vượt phạm vi `long long`.

### 6.2. Tính trung bình cộng

Công thức:

\[
Average = \frac{Sum}{n}
\]

Ví dụ:

```cpp
#include <array>
#include <iostream>

int main() {
    std::array<int, 5> scores{7, 9, 8, 6, 10};

    long long total{};

    for (int score : scores) {
        total += score;
    }

    const double average =
        static_cast<double>(total) / scores.size();

    std::cout << average << '\n';

    return 0;
}
```

Kết quả:

```text
8
```

Trong ví dụ này, mảng chắc chắn có 5 phần tử.

Nếu xử lý một container có thể rỗng, cần kiểm tra `empty()` trước khi chia cho `size()`.

### 6.3. Tìm giá trị lớn nhất

```cpp
#include <array>
#include <iostream>

int main() {
    std::array<int, 5> values{7, 12, 4, 20, 9};

    int maximum = values[0];

    for (int value : values) {
        if (value > maximum) {
            maximum = value;
        }
    }

    std::cout << maximum << '\n';

    return 0;
}
```

Kết quả:

```text
20
```

**Nguyên lý:**

1. Giả sử phần tử đầu tiên là lớn nhất.
2. Duyệt qua từng phần tử.
3. Nếu gặp giá trị lớn hơn, cập nhật `maximum`.
4. Sau khi duyệt hết, biến `maximum` chứa giá trị lớn nhất.

Cách này chỉ hợp lệ khi mảng có ít nhất một phần tử.

### 6.4. Đếm số phần tử thỏa điều kiện

Ví dụ đếm số chẵn:

```cpp
#include <array>
#include <iostream>

int main() {
    std::array<int, 6> values{1, 2, 3, 4, 5, 6};

    int count{};

    for (int value : values) {
        if (value % 2 == 0) {
            ++count;
        }
    }

    std::cout << count << '\n';

    return 0;
}
```

Kết quả:

```text
3
```

Các số chẵn là `2`, `4` và `6`.

---

## 7. Mảng hai chiều

Mảng hai chiều được sử dụng để biểu diễn dữ liệu có dạng hàng và cột.

Ví dụ, một bảng số liệu:

```text
1  2  3
4  5  6
```

Bảng trên gồm:

- 2 hàng.
- 3 cột.
- Tổng cộng 6 phần tử.

### 7.1. Khai báo mảng hai chiều

Cú pháp mảng C:

```cpp
Type name[Rows][Columns];
```

Ví dụ:

```cpp
int grid[2][3]{
    {1, 2, 3},
    {4, 5, 6}
};
```

Mảng này gồm hai mảng con, mỗi mảng con có ba phần tử.

### 7.2. Truy cập phần tử

Cú pháp:

```cpp
grid[row][column]
```

Ví dụ:

```cpp
#include <iostream>

int main() {
    int grid[2][3]{
        {1, 2, 3},
        {4, 5, 6}
    };

    std::cout << grid[0][0] << '\n';
    std::cout << grid[1][2] << '\n';

    return 0;
}
```

Kết quả:

```text
1
6
```

Trong đó:

```cpp
grid[0][0]
```

là phần tử ở hàng đầu tiên, cột đầu tiên.

```cpp
grid[1][2]
```

là phần tử ở hàng thứ hai, cột thứ ba.

### 7.3. Bảng chỉ số

Với:

```text
1  2  3
4  5  6
```

Ta có:

| Vị trí | Chỉ số | Giá trị |
|---|---|---|
| Hàng 1, cột 1 | `[0][0]` | 1 |
| Hàng 1, cột 2 | `[0][1]` | 2 |
| Hàng 1, cột 3 | `[0][2]` | 3 |
| Hàng 2, cột 1 | `[1][0]` | 4 |
| Hàng 2, cột 2 | `[1][1]` | 5 |
| Hàng 2, cột 3 | `[1][2]` | 6 |

Với bảng có `rows` hàng và `columns` cột, chỉ số hợp lệ:

\[
0 \le row < rows
\]

\[
0 \le column < columns
\]

---

## 8. Duyệt mảng hai chiều

Để duyệt mảng hai chiều theo từng hàng và từng cột, thường sử dụng hai vòng lặp lồng nhau.

### 8.1. Vòng lặp lồng nhau

```cpp
#include <iostream>

int main() {
    int grid[2][3]{
        {1, 2, 3},
        {4, 5, 6}
    };

    for (int row = 0; row < 2; ++row) {
        for (int column = 0; column < 3; ++column) {
            std::cout << grid[row][column] << ' ';
        }

        std::cout << '\n';
    }

    return 0;
}
```

Kết quả:

```text
1 2 3
4 5 6
```

**Phân tích:**

- Vòng lặp ngoài chọn hàng.
- Vòng lặp trong duyệt các cột thuộc hàng đó.
- Sau khi hoàn thành một hàng, chương trình xuống dòng.

### 8.2. std::array hai chiều

Có thể sử dụng các `std::array` lồng nhau:

```cpp
#include <array>
#include <iostream>

int main() {
    std::array<std::array<int, 3>, 2> grid{{
        {1, 2, 3},
        {4, 5, 6}
    }};

    for (const auto& row : grid) {
        for (int value : row) {
            std::cout << value << ' ';
        }

        std::cout << '\n';
    }

    return 0;
}
```

Kết quả:

```text
1 2 3
4 5 6
```

Ở đây:

```cpp
std::array<int, 3>
```

biểu diễn một hàng có ba phần tử.

Còn:

```cpp
std::array<std::array<int, 3>, 2>
```

biểu diễn một mảng gồm hai hàng.

### 8.3. Tính tổng tất cả phần tử

```cpp
#include <array>
#include <iostream>

int main() {
    std::array<std::array<int, 3>, 2> grid{{
        {1, 2, 3},
        {4, 5, 6}
    }};

    long long total{};

    for (const auto& row : grid) {
        for (int value : row) {
            total += value;
        }
    }

    std::cout << total << '\n';

    return 0;
}
```

Kết quả:

```text
21
```

Vì:

\[
1 + 2 + 3 + 4 + 5 + 6 = 21
\]

### 8.4. Ma trận vuông và đường chéo chính

Ma trận vuông là bảng có số hàng bằng số cột.

Ví dụ:

```text
1  2  3
4  5  6
7  8  9
```

Các phần tử trên đường chéo chính có chỉ số:

```text
[0][0]
[1][1]
[2][2]
```

Tổng đường chéo chính:

\[
S = 1 + 5 + 9 = 15
\]

Chương trình:

```cpp
#include <array>
#include <iostream>

int main() {
    std::array<std::array<int, 3>, 3> grid{{
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    }};

    long long total{};

    for (std::size_t i = 0; i < grid.size(); ++i) {
        total += grid[i][i];
    }

    std::cout << total << '\n';

    return 0;
}
```

Kết quả:

```text
15
```

---

## 9. Mảng có kích thước linh hoạt

`std::array` phù hợp khi kích thước được xác định tại compile time.

Nhưng giả sử chương trình yêu cầu:

```text
Nhap so luong hoc sinh: 37
```

Số phần tử chỉ được biết sau khi chương trình chạy.

Trong trường hợp đó, `std::vector` thường là lựa chọn phù hợp.

### 9.1. Giới thiệu std::vector

Header:

```cpp
#include <vector>
```

Ví dụ:

```cpp
#include <iostream>
#include <vector>

int main() {
    int n{};

    if (!(std::cin >> n)) {
        return 1;
    }

    if (n < 0 || n > 100000) {
        return 1;
    }

    std::vector<int> values(
        static_cast<std::size_t>(n)
    );

    for (int& value : values) {
        if (!(std::cin >> value)) {
            return 1;
        }
    }

    for (int value : values) {
        std::cout << value << ' ';
    }

    std::cout << '\n';

    return 0;
}
```

Input:

```text
5
10 20 30 40 50
```

Output:

```text
10 20 30 40 50
```

### 9.2. So sánh array và vector

| Tiêu chí | Mảng C | std::array | std::vector |
|---|---|---|---|
| Kích thước cố định theo kiểu | Có | Có | Không |
| Kích thước xác định lúc chạy | Không trong C++17 chuẩn | Không | Có |
| Có `.size()` | Không | Có | Có |
| Có `.at()` | Không | Có | Có |
| Có `.push_back()` | Không | Không | Có |
| Tự quản lý vùng chứa | Theo cơ chế mảng | Theo cơ chế đối tượng | Có |
| Phù hợp | API cấp thấp, dữ liệu cố định | Tập hợp cố định | Tập hợp linh hoạt |

Bài này chỉ giới thiệu `std::vector` ở mức cần thiết.

Các thao tác thêm, xóa phần tử, capacity, iterator invalidation và quản lý bộ nhớ của vector được trình bày trong bài [Vector, struct và enum](/cpp/trung-cap/vector-struct-enum).

---

## 10. Chuỗi trong C++ là gì?

Chuỗi (string) được sử dụng để biểu diễn dữ liệu văn bản.

Ví dụ:

```text
Hello
Nguyen Van An
DevHubs Wiki
```

Trong C++ hiện đại, kiểu thường được sử dụng là:

```cpp
std::string
```

Thư viện:

```cpp
#include <string>
```

### 10.1. Khai báo chuỗi

```cpp
#include <string>

std::string name{"An"};
std::string project{"DevHubs Wiki"};
std::string empty{};
```

Trong đó:

- `name` chứa `"An"`.
- `project` chứa `"DevHubs Wiki"`.
- `empty` là chuỗi rỗng.

### 10.2. Ví dụ hoàn chỉnh

```cpp
#include <iostream>
#include <string>

int main() {
    std::string name{"Nguyen Van An"};

    std::cout << "Xin chao, " << name << "!\n";

    return 0;
}
```

Kết quả:

```text
Xin chao, Nguyen Van An!
```

### 10.3. Vì sao sử dụng std::string?

`std::string` cung cấp nhiều thao tác thuận tiện:

- Nối chuỗi.
- So sánh chuỗi.
- Truy cập phần tử.
- Tìm chuỗi con.
- Cắt chuỗi.
- Kiểm tra độ dài.
- Thêm hoặc xóa nội dung.

Ngoài ra, `std::string` quản lý vùng lưu trữ của chuỗi, giúp giảm nhu cầu thao tác thủ công với mảng ký tự.

Tuy nhiên, `std::string` không tự động hiểu toàn bộ khái niệm ký tự Unicode hoặc grapheme. Đây là điểm cần chú ý khi xử lý tiếng Việt và văn bản đa ngôn ngữ.

---

## 11. Các thao tác cơ bản với std::string

### 11.1. Nối chuỗi

Sử dụng toán tử `+`:

```cpp
#include <iostream>
#include <string>

int main() {
    const std::string first{"Dev"};
    const std::string second{"Hubs"};

    std::string result = first + second;

    std::cout << result << '\n';

    return 0;
}
```

Kết quả:

```text
DevHubs
```

Có thể sử dụng `+=` để bổ sung nội dung:

```cpp
result += " Wiki";
```

Kết quả:

```text
DevHubs Wiki
```

### 11.2. Độ dài chuỗi

Sử dụng:

```cpp
text.size()
```

hoặc:

```cpp
text.length()
```

Ví dụ:

```cpp
#include <iostream>
#include <string>

int main() {
    std::string text{"Hello"};

    std::cout << text.size() << '\n';
    std::cout << text.length() << '\n';

    return 0;
}
```

Kết quả:

```text
5
5
```

Đối với `std::string`, `size()` và `length()` trả về cùng một giá trị.

### 11.3. Truy cập ký tự theo chỉ số

```cpp
#include <iostream>
#include <string>

int main() {
    std::string text{"Hello"};

    std::cout << text[0] << '\n';
    std::cout << text[1] << '\n';
    std::cout << text[4] << '\n';

    return 0;
}
```

Kết quả:

```text
H
e
o
```

Chuỗi `"Hello"` gồm 5 phần tử `char`:

| Chỉ số | Phần tử |
|---|---|
| 0 | H |
| 1 | e |
| 2 | l |
| 3 | l |
| 4 | o |

### 11.4. Thay đổi ký tự

```cpp
std::string text{"Hello"};

text[0] = 'Y';
```

Kết quả:

```text
Yello
```

Với `std::string`, phép truy cập bằng chỉ số làm việc trên các phần tử `char`, không phải những ký tự Unicode hoàn chỉnh.

### 11.5. Truy cập bằng at()

Ví dụ:

```cpp
#include <iostream>
#include <stdexcept>
#include <string>

int main() {
    std::string text{"Hello"};

    try {
        std::cout << text.at(10) << '\n';
    } catch (const std::out_of_range&) {
        std::cerr << "Chi so khong hop le.\n";
    }

    return 0;
}
```

Kết quả:

```text
Chi so khong hop le.
```

`std::string::at()` kiểm tra phạm vi tương tự `std::array::at()`.

---

## 12. Đọc chuỗi từ bàn phím

C++ hỗ trợ nhiều cách nhập chuỗi.

Hai cách thường gặp:

```cpp
std::cin >> text;
```

và:

```cpp
std::getline(std::cin, text);
```

### 12.1. Nhập bằng cin

Ví dụ:

```cpp
#include <iostream>
#include <string>

int main() {
    std::string name;

    std::cin >> name;

    std::cout << name << '\n';

    return 0;
}
```

Nếu nhập:

```text
Nguyen Van An
```

Kết quả:

```text
Nguyen
```

Nguyên nhân là `operator>>` đối với `std::string` đọc một token và dừng khi gặp khoảng trắng phân tách.

### 12.2. Nhập cả dòng bằng getline

```cpp
#include <iostream>
#include <string>

int main() {
    std::string name;

    std::getline(std::cin, name);

    std::cout << name << '\n';

    return 0;
}
```

Input:

```text
Nguyen Van An
```

Output:

```text
Nguyen Van An
```

`std::getline()` đọc nội dung dòng cho đến ký tự phân cách xuống dòng, không đưa ký tự phân cách đó vào chuỗi.

### 12.3. Kết hợp cin và getline

Một lỗi phổ biến xảy ra khi sử dụng `std::getline()` ngay sau `std::cin >>`.

Ví dụ:

```cpp
int age{};
std::string name;

std::cin >> age;
std::getline(std::cin, name);
```

Sau khi đọc số tuổi, ký tự xuống dòng có thể vẫn còn trong luồng nhập.

`getline()` có thể đọc ngay phần còn lại của dòng, khiến `name` trở thành chuỗi rỗng.

Cách xử lý:

```cpp
#include <iostream>
#include <limits>
#include <string>

int main() {
    int age{};
    std::string name;

    std::cout << "Nhap tuoi: ";

    if (!(std::cin >> age)) {
        std::cerr << "Tuoi khong hop le.\n";
        return 1;
    }

    std::cin.ignore(
        std::numeric_limits<std::streamsize>::max(),
        '\n'
    );

    std::cout << "Nhap ho ten: ";

    if (!std::getline(std::cin, name)) {
        std::cerr << "Khong doc duoc ho ten.\n";
        return 1;
    }

    std::cout << name << ": " << age << '\n';

    return 0;
}
```

---

## 13. Tìm kiếm và cắt chuỗi

`std::string` cung cấp những hàm để xử lý nội dung văn bản.

### 13.1. Tìm chuỗi con với find()

Ví dụ:

```cpp
#include <iostream>
#include <string>

int main() {
    std::string text{"DevHubs Wiki"};

    const auto position = text.find("Wiki");

    if (position != std::string::npos) {
        std::cout << position << '\n';
    }

    return 0;
}
```

Kết quả:

```text
8
```

Chuỗi `"Wiki"` bắt đầu tại chỉ số `8`.

Nếu không tìm thấy, `find()` trả về:

```cpp
std::string::npos
```

`npos` là giá trị đặc biệt biểu thị không tìm thấy vị trí phù hợp.

Không nên mặc định giá trị trả về khi không tìm thấy luôn bằng `-1` theo kiểu số có dấu.

### 13.2. Cắt chuỗi với substr()

Cú pháp:

```cpp
text.substr(position, count)
```

Ví dụ:

```cpp
#include <iostream>
#include <string>

int main() {
    std::string text{"DevHubs Wiki"};

    std::string first = text.substr(0, 7);
    std::string second = text.substr(8, 4);

    std::cout << first << '\n';
    std::cout << second << '\n';

    return 0;
}
```

Kết quả:

```text
DevHubs
Wiki
```

Trong đó:

- `position`: Vị trí bắt đầu.
- `count`: Số phần tử `char` cần lấy.

Nếu vị trí bắt đầu lớn hơn `size()`, `substr()` ném `std::out_of_range`.

Nếu số lượng yêu cầu vượt quá phần còn lại của chuỗi, hàm chỉ lấy đến cuối chuỗi.

### 13.3. So sánh chuỗi

Có thể sử dụng:

```cpp
a == b
a != b
a < b
a > b
```

Ví dụ:

```cpp
#include <iostream>
#include <string>

int main() {
    std::string a{"Hello"};
    std::string b{"Hello"};

    std::cout << std::boolalpha;
    std::cout << (a == b) << '\n';

    return 0;
}
```

Kết quả:

```text
true
```

Phép so sánh mặc định của `std::string` phân biệt chữ hoa và chữ thường.

Ví dụ:

```cpp
std::string a{"hello"};
std::string b{"Hello"};
```

Hai chuỗi không bằng nhau.

Ngoài ra, thứ tự từ điển của `std::string` dựa trên các phần tử `char`, không tự động áp dụng quy tắc sắp xếp ngôn ngữ tự nhiên của tiếng Việt.

### 13.4. Những hàm thường gặp

| Hàm | Công dụng |
|---|---|
| `size()` | Lấy độ dài |
| `length()` | Lấy độ dài |
| `empty()` | Kiểm tra chuỗi rỗng |
| `clear()` | Xóa nội dung |
| `find()` | Tìm chuỗi con |
| `substr()` | Tạo chuỗi con |
| `append()` | Nối thêm chuỗi |
| `push_back()` | Thêm một `char` |
| `pop_back()` | Xóa phần tử cuối |
| `front()` | Truy cập phần tử đầu |
| `back()` | Truy cập phần tử cuối |
| `at()` | Truy cập có kiểm tra phạm vi |

Không gọi `front()`, `back()` hoặc `pop_back()` trên chuỗi rỗng.

---

## 14. Duyệt và xử lý ký tự trong chuỗi

Vì `std::string` chứa một dãy phần tử `char`, có thể sử dụng vòng lặp để duyệt.

### 14.1. Duyệt từng phần tử

```cpp
#include <iostream>
#include <string>

int main() {
    std::string text{"Hello"};

    for (char character : text) {
        std::cout << character << '\n';
    }

    return 0;
}
```

Kết quả:

```text
H
e
l
l
o
```

### 14.2. Đếm ký tự cụ thể

Ví dụ đếm chữ `a`:

```cpp
#include <iostream>
#include <string>

int main() {
    std::string text{"banana"};

    int count{};

    for (char character : text) {
        if (character == 'a') {
            ++count;
        }
    }

    std::cout << count << '\n';

    return 0;
}
```

Kết quả:

```text
3
```

### 14.3. Đảo ngược chuỗi

Thư viện `<algorithm>` cung cấp `std::reverse()`.

```cpp
#include <algorithm>
#include <iostream>
#include <string>

int main() {
    std::string text{"Hello"};

    std::reverse(text.begin(), text.end());

    std::cout << text << '\n';

    return 0;
}
```

Kết quả:

```text
olleH
```

**Lưu ý:** Cách này phù hợp với ví dụ ASCII.

Nếu chuỗi chứa UTF-8 với ký tự nhiều byte, đảo ngược từng byte có thể phá hỏng dữ liệu mã hóa.

Đối với văn bản Unicode, cần sử dụng thuật toán hiểu cấu trúc mã hóa và đơn vị ký tự phù hợp.

---

## 15. Chuỗi, byte và Unicode

Đây là một điểm quan trọng khi xử lý văn bản tiếng Việt.

### 15.1. std::string lưu gì?

`std::string` là một chuỗi các phần tử `char`.

Về mặt dữ liệu, nó có thể lưu văn bản được mã hóa theo UTF-8, nhưng bản thân `std::string` không tự phân tích Unicode.

Ví dụ:

```cpp
std::string text{"Hello"};
```

Với các ký tự ASCII thông thường, mỗi ký tự chiếm một byte trên các hệ thống phổ biến có byte 8 bit.

Nhưng các ký tự như:

```text
ă
â
đ
ê
ộ
```

có thể chiếm nhiều byte khi mã hóa bằng UTF-8.

### 15.2. size() không phải lúc nào cũng là số ký tự

Nếu dữ liệu được mã hóa theo UTF-8, một chuỗi tiếng Việt có thể chứa nhiều byte hơn số ký tự hiển thị.

Vì vậy:

```cpp
text.size()
```

trả về số phần tử `char`, không phải số chữ cái hoặc grapheme mà người dùng nhìn thấy.

Trong môi trường byte 8 bit sử dụng UTF-8, giá trị này tương ứng với số byte của chuỗi.

### 15.3. Một ký tự Unicode có thể gồm nhiều code point

Ngoài việc một code point UTF-8 có thể chiếm nhiều byte, một ký tự hiển thị cũng có thể được tạo thành từ nhiều code point.

Ví dụ, chữ có dấu có thể được biểu diễn dưới dạng:

- Một code point dựng sẵn.
- Một chữ cái cơ sở kết hợp với dấu.

Hai cách biểu diễn có thể trông giống nhau nhưng có dữ liệu byte khác nhau.

Do đó, những thao tác như:

- Đếm ký tự hiển thị.
- Cắt chuỗi theo ký tự.
- Chuyển chữ hoa/chữ thường tiếng Việt.
- So sánh Unicode có chuẩn hóa.
- Đảo ngược văn bản.

cần được thiết kế riêng khi xử lý Unicode.

**Nguyên tắc:** Không áp dụng trực tiếp thuật toán thao tác trên từng `char` cho văn bản UTF-8 nếu yêu cầu thực sự là xử lý từng ký tự Unicode.

---

## 16. Mảng char và chuỗi kiểu C

Trước khi `std::string` trở thành công cụ phổ biến, chuỗi trong C và nhiều API cấp thấp được biểu diễn bằng mảng `char`.

Ví dụ:

```cpp
char text[]{"Hello"};
```

Mảng này thực tế chứa:

```text
'H' 'e' 'l' 'l' 'o' '\0'
```

Ký tự:

```cpp
'\0'
```

được gọi là null terminator.

Nó đánh dấu điểm kết thúc của C-style string.

### 16.1. Kích thước và độ dài khác nhau

Xét:

```cpp
char text[]{"Hello"};
```

Mảng có 6 phần tử:

- 5 ký tự nội dung.
- 1 ký tự kết thúc null.

Ví dụ:

```cpp
#include <cstring>
#include <iostream>

int main() {
    char text[]{"Hello"};

    std::cout << sizeof(text) << '\n';
    std::cout << std::strlen(text) << '\n';

    return 0;
}
```

Trên các implementation C++ thông dụng, kết quả:

```text
6
5
```

Vì:

```cpp
sizeof(text)
```

trả về kích thước mảng tính bằng byte C++.

Còn:

```cpp
std::strlen(text)
```

đếm số phần tử trước ký tự null đầu tiên.

### 16.2. Nguy cơ thiếu null terminator

Ví dụ:

```cpp
char text[3]{'A', 'B', 'C'};
```

Đây là mảng gồm ba ký tự, nhưng không chứa ký tự kết thúc `'\0'`.

Nó không phải C-style string được kết thúc null hợp lệ.

Không được truyền trực tiếp mảng này vào những hàm kỳ vọng chuỗi kết thúc null như `std::strlen()`.

Nếu làm vậy, hàm có thể tiếp tục đọc ngoài mảng để tìm `'\0'`, dẫn đến hành vi không xác định.

### 16.3. Dữ liệu nhị phân có thể chứa byte 0

Cần phân biệt dữ liệu văn bản kiểu C với dữ liệu nhị phân.

Ví dụ:

```cpp
char data[4]{'A', '\0', 'B', 'C'};
```

Mảng có bốn phần tử.

Nhưng:

```cpp
std::strlen(data)
```

trả về `1`, vì hàm dừng ở null terminator đầu tiên.

Do đó, không nên dùng `strlen()` để xác định kích thước dữ liệu nhị phân.

### 16.4. Nên dùng char[] hay std::string?

| Tình huống | Lựa chọn |
|---|---|
| Xử lý văn bản thông thường | `std::string` |
| Chuỗi có độ dài thay đổi | `std::string` |
| Làm việc với API C cần buffer | `char[]` hoặc buffer phù hợp |
| Xử lý vùng byte có kích thước xác định | Container/buffer có kích thước rõ ràng |
| Lưu chuỗi bất biến dạng view | Cân nhắc `std::string_view` |

Trong các chương trình C++17 mới, nên ưu tiên `std::string` cho văn bản thông thường.

Mảng `char` vẫn cần thiết khi làm việc với một số API cấp thấp, giao thức hoặc những hệ thống có yêu cầu bộ nhớ cụ thể.

---

## 17. Truyền mảng và chuỗi vào hàm

Khi chương trình phát triển, cần chia logic thành các hàm.

Mảng và chuỗi có cách truyền tham số khác nhau.

### 17.1. Truyền std::array bằng const reference

Ví dụ:

```cpp
#include <array>
#include <iostream>

void printValues(const std::array<int, 3>& values) {
    for (int value : values) {
        std::cout << value << ' ';
    }

    std::cout << '\n';
}

int main() {
    std::array<int, 3> values{10, 20, 30};

    printValues(values);
}
```

Kết quả:

```text
10 20 30
```

Sử dụng:

```cpp
const std::array<int, 3>&
```

cho phép hàm đọc mảng mà không sao chép toàn bộ đối tượng `std::array`.

### 17.2. Truyền std::string bằng const reference

```cpp
#include <iostream>
#include <string>

void printName(const std::string& name) {
    std::cout << name << '\n';
}

int main() {
    std::string name{"Nguyen Van An"};

    printName(name);
}
```

Cách này tránh sao chép chuỗi khi hàm chỉ cần đọc.

### 17.3. Mảng C có thể chuyển thành pointer

Xét:

```cpp
void printValues(const int values[], std::size_t count);
```

Trong khai báo tham số hàm, `const int values[]` được điều chỉnh thành kiểu con trỏ `const int*`.

Vì vậy, hàm không tự biết số phần tử của mảng gốc.

Một cách triển khai:

```cpp
#include <cstddef>
#include <iostream>

void printValues(const int* values, std::size_t count) {
    if (values == nullptr && count != 0) {
        return;
    }

    for (std::size_t i = 0; i < count; ++i) {
        std::cout << values[i] << ' ';
    }

    std::cout << '\n';
}

int main() {
    int numbers[3]{10, 20, 30};

    printValues(numbers, 3);
}
```

Điều kiện an toàn của hàm không chỉ là con trỏ khác null.

Nếu `count > 0`, con trỏ còn phải trỏ đến một vùng chứa hợp lệ có ít nhất `count` phần tử có thể đọc.

### 17.4. Không dùng sizeof(pointer) để tính số phần tử

Ví dụ:

```cpp
void process(int numbers[]) {
    // numbers duoc dieu chinh thanh int*
}
```

Bên trong hàm, `numbers` không còn là một tham số mang kiểu mảng có kích thước đầy đủ.

Do đó:

```cpp
sizeof(numbers)
```

nếu được compiler chấp nhận trong ngữ cảnh này, sẽ đo kích thước con trỏ, không phải tổng kích thước mảng ban đầu.

Để xử lý chính xác, có thể truyền thêm kích thước hoặc sử dụng container phù hợp như `std::array` và `std::vector`.

---

## 18. Độ phức tạp khi xử lý mảng và chuỗi

Khi dữ liệu lớn, không chỉ cần viết đúng mà còn phải quan tâm đến số phép toán chương trình thực hiện.

Một số độ phức tạp thường gặp:

| Thao tác | Độ phức tạp điển hình |
|---|---|
| Truy cập phần tử theo chỉ số | `O(1)` |
| Duyệt toàn bộ mảng n phần tử | `O(n)` |
| Tính tổng n phần tử | `O(n)` |
| Tìm lớn nhất bằng duyệt tuần tự | `O(n)` |
| Tìm tuyến tính | `O(n)` |
| Duyệt ma trận r × c | `O(r × c)` |
| Sao chép chuỗi dài n phần tử | `O(n)` |
| So sánh hai chuỗi | `O(min(n, m))` trong trường hợp xấu theo độ dài cần so sánh |
| Tìm chuỗi con | Phụ thuộc thuật toán và implementation |

### 18.1. Ví dụ độ phức tạp O(n)

```cpp
long long total{};

for (int value : values) {
    total += value;
}
```

Nếu có `n` phần tử, vòng lặp thực hiện `n` lần.

Do đó, độ phức tạp thời gian là `O(n)`.

### 18.2. Ví dụ độ phức tạp O(r × c)

```cpp
for (const auto& row : grid) {
    for (int value : row) {
        process(value);
    }
}
```

Giả sử:

- `r` hàng.
- `c` cột mỗi hàng.
- `process()` chạy trong thời gian `O(1)`.

Tổng số lần gọi `process()` là:

\[
r \times c
\]

Độ phức tạp:

\[
O(r \times c)
\]

### 18.3. Tại sao cần quan tâm?

Với mảng 10 phần tử, nhiều cách làm đều chạy nhanh.

Nhưng khi dữ liệu tăng đến hàng triệu phần tử, thuật toán có độ phức tạp không phù hợp có thể trở thành vấn đề lớn.

Độ phức tạp là kiến thức nền tảng trước khi học sắp xếp, tìm kiếm, prefix sum và các thuật toán tối ưu khác.

---

## 19. Những lỗi thường gặp

### 19.1. Truy cập chỉ số vượt giới hạn

Sai:

```cpp
std::array<int, 3> values{1, 2, 3};

std::cout << values[3];
```

Mảng có 3 phần tử nhưng chỉ số hợp lệ là `0`, `1`, `2`.

Cách phòng tránh:

```cpp
if (index < values.size()) {
    std::cout << values[index];
}
```

Với chỉ số kiểu số nguyên có dấu, cần kiểm tra cả điều kiện không âm trước khi chuyển sang kiểu chỉ số không dấu.

### 19.2. Sai điều kiện vòng lặp

Sai:

```cpp
for (std::size_t i = 0; i <= values.size(); ++i) {
    std::cout << values[i];
}
```

Điều kiện `<=` khiến vòng lặp truy cập đến `values[values.size()]`.

Cách đúng:

```cpp
for (std::size_t i = 0; i < values.size(); ++i) {
    std::cout << values[i];
}
```

### 19.3. Đọc phần tử đầu của mảng rỗng

Sai khi mảng có thể rỗng:

```cpp
int maximum = values[0];
```

Cần kiểm tra:

```cpp
if (values.empty()) {
    // Xu ly truong hop rong
}
```

Không nên tự đặt giá trị lớn nhất bằng `0` nếu mảng có thể chứa toàn số âm.

### 19.4. Nhầm độ dài với chỉ số cuối

Với mảng có `n` phần tử:

```text
Size = n
Last index = n - 1
```

Công thức chỉ số cuối chỉ có ý nghĩa nếu `n > 0`.

### 19.5. Nhầm số byte với số ký tự Unicode

```cpp
text.size()
```

trả về số phần tử `char`.

Trong UTF-8, kết quả này không nhất thiết bằng số ký tự hiển thị.

### 19.6. Đảo ngược UTF-8 theo byte

```cpp
std::reverse(text.begin(), text.end());
```

có thể làm hỏng chuỗi UTF-8 chứa ký tự nhiều byte.

Nếu cần đảo ngược văn bản Unicode, phải xác định đơn vị đảo ngược phù hợp.

### 19.7. Quên null terminator trong C-string

Mảng `char` không có ký tự `'\0'` kết thúc không thể được sử dụng an toàn như C-style string với những API kỳ vọng chuỗi kết thúc null.

### 19.8. Giữ reference hoặc pointer sau khi dữ liệu thay đổi

Với `std::vector`, thao tác tăng kích thước có thể khiến vùng lưu trữ được cấp phát lại.

Khi xảy ra reallocation, những pointer, reference và iterator cũ đến phần tử sẽ mất hiệu lực.

Cần kiểm tra quy tắc invalidation khi sử dụng container động.

### 19.9. Dùng mảng quá lớn trong vùng lưu trữ tự động

Ví dụ:

```cpp
int values[10'000'000]{};
```

Một mảng cục bộ quá lớn có thể vượt giới hạn tài nguyên của môi trường thực thi, thường gặp là giới hạn stack.

Với dữ liệu lớn, nên cân nhắc `std::vector` và kiểm tra giới hạn bộ nhớ của hệ thống.

Không nên mặc định mọi mảng đều an toàn chỉ vì cú pháp khai báo hợp lệ.

---

## 20. Ví dụ thực hành tổng hợp

### Bài toán: Thống kê điểm học sinh

Viết chương trình:

1. Nhập số lượng học sinh `n`.
2. Nhập điểm nguyên của từng học sinh.
3. Kiểm tra điểm nằm trong đoạn `[0, 10]`.
4. Tính tổng điểm.
5. Tính điểm trung bình.
6. Xác định điểm cao nhất.
7. Đếm số học sinh có điểm từ 5 trở lên.

### 20.1. Phân tích

Giả sử:

\[
1 \le n \le 100000
\]

Mỗi điểm:

\[
0 \le score \le 10
\]

Tổng điểm lớn nhất:

\[
100000 \times 10 = 1000000
\]

Có thể sử dụng `long long` cho biến tổng để hỗ trợ mở rộng phạm vi tính toán.

Sử dụng `std::vector` vì số học sinh được nhập trong lúc chạy.

### 20.2. Chương trình C++17

```cpp
#include <iostream>
#include <vector>

int main() {
    int n{};

    if (!(std::cin >> n)) {
        std::cerr << "So luong khong hop le.\n";
        return 1;
    }

    if (n < 1 || n > 100000) {
        std::cerr << "So luong vuot pham vi.\n";
        return 1;
    }

    std::vector<int> scores;
    scores.reserve(static_cast<std::size_t>(n));

    for (int i = 0; i < n; ++i) {
        int score{};

        if (!(std::cin >> score)) {
            std::cerr << "Khong doc duoc diem.\n";
            return 1;
        }

        if (score < 0 || score > 10) {
            std::cerr << "Diem khong hop le.\n";
            return 1;
        }

        scores.push_back(score);
    }

    long long total{};
    int maximum = scores.front();
    int passed{};

    for (int score : scores) {
        total += score;

        if (score > maximum) {
            maximum = score;
        }

        if (score >= 5) {
            ++passed;
        }
    }

    const double average =
        static_cast<double>(total) / scores.size();

    std::cout << "Tong: " << total << '\n';
    std::cout << "Trung binh: " << average << '\n';
    std::cout << "Cao nhat: " << maximum << '\n';
    std::cout << "Dat: " << passed << '\n';

    return 0;
}
```

### 20.3. Input

```text
5
7 9 4 8 10
```

### 20.4. Output

```text
Tong: 38
Trung binh: 7.6
Cao nhat: 10
Dat: 4
```

### 20.5. Phân tích kết quả

Tổng điểm:

\[
7 + 9 + 4 + 8 + 10 = 38
\]

Điểm trung bình:

\[
Average = \frac{38}{5} = 7.6
\]

Điểm cao nhất:

\[
Max = 10
\]

Số học sinh đạt từ 5 điểm trở lên: `4`.

### 20.6. Phân tích độ phức tạp

Chương trình có hai vòng lặp chính:

- Nhập `n` phần tử: `O(n)`.
- Thống kê `n` phần tử: `O(n)`.

Tổng thời gian:

\[
O(n)
\]

Bộ nhớ dùng để lưu điểm:

\[
O(n)
\]

### 20.7. Các trường hợp cần kiểm thử

| Trường hợp | Kết quả mong đợi |
|---|---|
| `n = 1`, điểm 10 | Xử lý thành công |
| `n = 1`, điểm 0 | Xử lý thành công |
| `n = 0` | Từ chối |
| `n < 0` | Từ chối |
| `n > 100000` | Từ chối |
| Điểm âm | Từ chối |
| Điểm lớn hơn 10 | Từ chối |
| Nhập ký tự thay vì số | Từ chối |
| Thiếu dữ liệu | Từ chối |
| Tất cả điểm bằng 0 | Tổng và trung bình bằng 0 |

**Điểm đáng chú ý:** Vì chương trình bảo đảm `n >= 1`, lời gọi `scores.front()` hợp lệ sau khi toàn bộ dữ liệu được đọc thành công.

Nếu bài toán cho phép `n = 0`, cần thiết kế lại cách xử lý maximum và average thay vì truy cập phần tử đầu hoặc chia cho 0.

---

## 21. Bài tập tự luyện

### Bài 1. Tính tổng mảng

**Yêu cầu:** Nhập `n` số nguyên và tính tổng các phần tử.

Ví dụ:

```text
Input:
5
1 2 3 4 5

Output:
15
```

**Gợi ý:** Sử dụng vòng lặp và biến tích lũy `long long`.

### Bài 2. Tìm phần tử lớn nhất và nhỏ nhất

**Yêu cầu:** Nhập một mảng số nguyên, tìm giá trị lớn nhất và nhỏ nhất.

Ví dụ:

```text
Input:
5
7 2 9 1 4

Output:
Max: 9
Min: 1
```

**Gợi ý:** Khởi tạo maximum và minimum từ phần tử đầu tiên sau khi xác nhận mảng không rỗng.

### Bài 3. Đếm số chẵn và số lẻ

**Yêu cầu:** Nhập `n` số nguyên. Đếm số phần tử chẵn và số phần tử lẻ.

Ví dụ:

```text
Input:
6
1 2 3 4 5 6

Output:
Chan: 3
Le: 3
```

**Gợi ý:** Sử dụng toán tử `%`.

### Bài 4. Đảo ngược mảng

**Yêu cầu:** Nhập một mảng và in các phần tử theo thứ tự ngược lại.

Ví dụ:

```text
Input:
5
1 2 3 4 5

Output:
5 4 3 2 1
```

**Gợi ý:** Có thể duyệt ngược bằng chỉ số hoặc sử dụng `std::reverse()`.

Chú ý khi giảm chỉ số có kiểu không dấu.

### Bài 5. Tổng đường chéo chính

**Yêu cầu:** Nhập ma trận vuông kích thước `n × n`, tính tổng các phần tử trên đường chéo chính.

Ví dụ:

```text
Input:
3
1 2 3
4 5 6
7 8 9

Output:
15
```

**Gợi ý:** Chỉ lấy phần tử có chỉ số hàng bằng chỉ số cột.

### Bài 6. Tìm giá trị lớn nhất trong ma trận

**Yêu cầu:** Nhập ma trận có `r` hàng và `c` cột, tìm phần tử lớn nhất.

Ví dụ:

```text
Input:
2 3
1 9 3
4 5 6

Output:
9
```

**Yêu cầu bổ sung:** Xác định rõ hành vi khi `r = 0` hoặc `c = 0`, không truy cập phần tử đầu của ma trận rỗng.

### Bài 7. Đếm ký tự trong chuỗi

**Yêu cầu:** Nhập một dòng văn bản ASCII và một ký tự, đếm số lần ký tự đó xuất hiện.

Ví dụ:

```text
Input:
banana
a

Output:
3
```

**Gợi ý:** Sử dụng `std::getline()` và vòng lặp.

### Bài 8. Kiểm tra chuỗi đối xứng

Một chuỗi đối xứng (palindrome) là chuỗi đọc từ trái sang phải và từ phải sang trái giống nhau.

Ví dụ:

```text
madam
level
radar
```

**Yêu cầu:** Viết chương trình kiểm tra chuỗi ASCII đầu vào có đối xứng hay không.

Ví dụ:

```text
Input:
level

Output:
YES
```

**Gợi ý:** So sánh hai đầu chuỗi và di chuyển dần vào giữa.

Không cần tạo bản sao chuỗi nếu sử dụng hai chỉ số.

### Bài 9. Tìm phần tử xuất hiện nhiều nhất

**Yêu cầu:** Nhập một mảng số nguyên, tìm giá trị xuất hiện nhiều lần nhất.

Ví dụ:

```text
Input:
7
1 2 2 3 3 3 4

Output:
3
```

**Gợi ý:** Có thể bắt đầu bằng cách sắp xếp mảng rồi đếm các nhóm giá trị liên tiếp.

Nếu nhiều giá trị có cùng tần suất cao nhất, cần quy định rõ cách lựa chọn kết quả.

---

## 22. Tổng kết kiến thức

| Thành phần | Vai trò |
|---|---|
| `T array[N]` | Mảng C có kích thước cố định |
| `std::array<T, N>` | Container mảng cố định |
| `std::vector<T>` | Container mảng động |
| `array[index]` | Truy cập phần tử theo chỉ số |
| `array.at(index)` | Truy cập có kiểm tra phạm vi |
| `size()` | Lấy số phần tử |
| `empty()` | Kiểm tra container rỗng |
| `front()` | Truy cập phần tử đầu |
| `back()` | Truy cập phần tử cuối |
| Range-based `for` | Duyệt tập hợp |
| `std::string` | Chuỗi gồm các phần tử `char` |
| `std::getline()` | Đọc một dòng |
| `find()` | Tìm chuỗi con |
| `substr()` | Tạo chuỗi con |
| `std::string::npos` | Biểu thị không tìm thấy |
| `char[]` | Mảng ký tự |
| `'\0'` | Ký tự kết thúc C-string |
| `std::strlen()` | Đếm phần tử trước null terminator |

Sau bài học này, bạn cần nắm được:

1. **Mảng lưu nhiều phần tử cùng kiểu.** Mỗi phần tử được truy cập thông qua chỉ số.
2. **Chỉ số hợp lệ bắt đầu từ 0.** Với `n` phần tử, phạm vi thông thường là `[0, n - 1]`.
3. **std::array phù hợp với kích thước cố định.** Khi kích thước thay đổi trong runtime, có thể sử dụng `std::vector`.
4. **Mảng hai chiều biểu diễn dữ liệu dạng hàng và cột.** Mỗi chiều cần được kiểm tra giới hạn riêng.
5. **std::string cung cấp các thao tác chuỗi thuận tiện.** Không cần tự quản lý null terminator khi thực hiện các thao tác chuỗi thông thường.
6. **size() không nhất thiết bằng số ký tự Unicode hiển thị.** Với văn bản UTF-8, cần phân biệt byte, code point và grapheme.
7. **Không truy cập phần tử ngoài phạm vi.** Những lỗi này có thể gây undefined behavior.
8. **Không đọc phần tử đầu của container rỗng.** Cần kiểm tra điều kiện trước khi truy cập.
9. **Cần hiểu độ phức tạp khi xử lý dữ liệu lớn.** Duyệt một chiều thường có `O(n)`, còn ma trận hai chiều có `O(r × c)` nếu xử lý mỗi phần tử trong thời gian hằng số.

**Nguyên tắc quan trọng nhất:** Chọn cấu trúc dữ liệu theo yêu cầu thực tế, giữ phạm vi truy cập hợp lệ và không giả định chương trình an toàn chỉ vì nó biên dịch thành công.

---

## Đọc tiếp

- [Hàm và phạm vi biến](/cpp/bat-dau/ham-pham-vi): Tổ chức logic xử lý mảng và chuỗi thành các hàm.
- [References và pointers](/cpp/bat-dau/references-pointers): Hiểu cách truyền mảng, tham chiếu và truy cập dữ liệu gián tiếp.
- [Vector, struct và enum](/cpp/trung-cap/vector-struct-enum): Làm việc với container động và các kiểu dữ liệu do lập trình viên định nghĩa.
- [Prefix Sum và Difference Array](/cpp/thuat-toan/prefix-sum-difference-array): Tối ưu các bài toán tính tổng trên đoạn và cập nhật dữ liệu.
- [Sequence Containers](/cpp/stl/sequence-containers): Tìm hiểu sâu hơn về những container tuần tự trong thư viện chuẩn C++.
