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

Khi bắt đầu học C++, chúng ta thường đặt toàn bộ câu lệnh bên trong hàm `main()`. Cách này đủ dùng cho những chương trình đơn giản, nhưng sẽ trở nên khó quản lý khi số lượng thao tác tăng lên.

Giả sử một chương trình cần quản lý điểm học sinh. Chương trình phải kiểm tra điểm hợp lệ, tính trung bình, xếp loại kết quả và hiển thị thông tin. Nếu tất cả công việc đều nằm trong một khối mã lớn, việc sửa đổi một chức năng có thể ảnh hưởng đến những phần không liên quan.

**Hàm (function)** giúp chia chương trình thành những đơn vị xử lý có mục đích rõ ràng. Mỗi hàm có thể nhận dữ liệu, thực hiện công việc và trả kết quả cho nơi gọi.

Bên cạnh hàm, hai khái niệm quan trọng cần hiểu là **scope (phạm vi)** và **lifetime (thời gian sống)**. Chúng quyết định một tên có thể được sử dụng ở đâu và đối tượng mà tên đó biểu thị tồn tại trong bao lâu.

Bài viết trình bày các quy tắc cơ bản theo tiêu chuẩn **C++17**, tập trung vào cơ chế hoạt động và những khác biệt dễ gây nhầm lẫn.

---

## 1. Hàm là gì?

Hàm là một thành phần của chương trình dùng để thực hiện một thao tác hoặc nhóm thao tác có liên quan.

Một hàm có thể nhận dữ liệu thông qua tham số, xử lý dữ liệu đó rồi trả về kết quả. Ngoài ra, hàm còn có thể thực hiện các tác động như xuất thông tin, ghi tệp hoặc thay đổi trạng thái đối tượng.

Ví dụ, một chương trình cần cộng điểm thưởng cho nhiều học sinh. Thay vì viết lại phép tính ở nhiều vị trí, có thể định nghĩa hàm:

```cpp
int addBonus(int score, int bonus) {
    return score + bonus;
}
```

Sau khi định nghĩa, hàm có thể được gọi với những giá trị khác nhau:

```cpp
int first = addBonus(70, 5);   // 75
int second = addBonus(80, 10); // 90
```

Hai lời gọi sử dụng cùng một phần triển khai nhưng cung cấp các dữ liệu khác nhau.

Trong ví dụ, phép cộng được giả định không vượt phạm vi của `int`.

### 1.1. Tại sao nên sử dụng hàm?

Lợi ích đầu tiên là **tái sử dụng logic**. Nếu quy tắc cộng điểm thay đổi, người lập trình có thể điều chỉnh một hàm thay vì tìm tất cả những vị trí đang thực hiện phép tính đó.

Hàm còn giúp **phân chia trách nhiệm**. Một hàm kiểm tra dữ liệu không nhất thiết phải biết cách hiển thị kết quả. Tương tự, một hàm tính toán không cần biết dữ liệu được nhập từ bàn phím hay đọc từ tệp.

Khi các chức năng được tách biệt hợp lý, chúng thường dễ kiểm thử, dễ sửa lỗi và dễ tái sử dụng hơn.

Tuy nhiên, không phải câu lệnh nào cũng cần được đưa vào một hàm riêng. Việc chia nhỏ chỉ có ích khi giúp mã nguồn rõ ràng hơn hoặc tạo ra một đơn vị xử lý có ý nghĩa.

---

## 2. Cấu trúc của một hàm

Một định nghĩa hàm C++ thông thường có dạng:

```cpp
ReturnType functionName(ParameterList) {
    // Function body
}
```

Các thành phần chính:

| Thành phần | Ý nghĩa |
|---|---|
| `ReturnType` | Kiểu dữ liệu mà hàm trả về |
| `functionName` | Tên dùng để nhận diện hàm |
| `ParameterList` | Danh sách tham số của hàm |
| `{}` | Phần thân chứa các câu lệnh |
| `return` | Câu lệnh kết thúc lời gọi và có thể trả về giá trị |

Xét lại hàm:

```cpp
int addBonus(int score, int bonus) {
    return score + bonus;
}
```

Từ khóa `int` phía trước tên cho biết hàm trả về một giá trị kiểu số nguyên `int`.

`addBonus` là tên hàm.

Hai khai báo `int score` và `int bonus` là các tham số. Mỗi tham số có kiểu dữ liệu riêng.

Phần thân nằm trong dấu ngoặc nhọn, chứa phép cộng và câu lệnh `return`.

### 2.1. Hàm được thực thi khi nào?

Việc định nghĩa một hàm không có nghĩa phần thân của nó lập tức được thực hiện.

Trong trường hợp thông thường, phần thân được thực hiện khi có một lời gọi hàm tương ứng trong quá trình chạy chương trình.

Ví dụ:

```cpp
int result = addBonus(70, 5);
```

Tại lời gọi này, chương trình thực hiện quá trình tương ứng:

1. Đánh giá các đối số được cung cấp.
2. Khởi tạo những tham số của hàm theo quy tắc truyền tham số.
3. Bắt đầu thực hiện phần thân `addBonus()`.
4. Tính biểu thức `score + bonus`.
5. Thực hiện `return` và cung cấp kết quả cho lời gọi.
6. Tiếp tục quá trình thực thi tại vị trí gọi.

Kết quả của lời gọi là `75`, sau đó được dùng để khởi tạo biến `result`.

Điều quan trọng là **hàm có thể được gọi nhiều lần**, và mỗi lời gọi có quá trình thực thi riêng.

Các biến cục bộ thông thường của một lời gọi không tự động được chia sẻ với lời gọi khác.

---

## 3. Khai báo, định nghĩa và gọi hàm

Ba khái niệm sau có liên quan nhưng không giống nhau:

- *Function declaration*: Khai báo hàm.
- *Function definition*: Định nghĩa hàm.
- *Function call*: Gọi hàm.

### 3.1. Khai báo hàm (declaration)

Khai báo cung cấp thông tin cần thiết để compiler nhận biết một hàm.

Ví dụ:

```cpp
int add(int a, int b);
```

Khai báo này cho biết có một hàm tên `add`, nhận hai tham số `int` và trả về `int`.

Nó chưa mô tả hàm thực hiện phép tính như thế nào.

Đối với khai báo ở trên, tên tham số `a` và `b` có thể được bỏ đi nếu không cần thiết:

```cpp
int add(int, int);
```

Kiểu tham số là thông tin quan trọng để compiler kiểm tra lời gọi. Tên tham số thường được giữ lại nhằm giúp khai báo dễ hiểu hơn.

Một khai báo hàm dạng này thường được gọi là **function prototype**.

### 3.2. Định nghĩa hàm (definition)

Định nghĩa cung cấp phần triển khai của hàm:

```cpp
int add(int a, int b) {
    return a + b;
}
```

Định nghĩa cũng là một dạng khai báo, nhưng có thêm phần thân.

Một hàm thông thường phải có định nghĩa phù hợp nếu chương trình thực sự cần thực thi nó.

Đối với những hàm được định nghĩa trong nhiều translation unit, các quy tắc như One Definition Rule (ODR) trở nên quan trọng. Đây là phần kiến thức liên quan đến cách tổ chức chương trình nhiều tệp.

### 3.3. Gọi hàm (call)

Lời gọi yêu cầu chương trình thực hiện hàm:

```cpp
int total = add(10, 20);
```

Ở đây, `add(10, 20)` là biểu thức gọi hàm.

Giá trị trả về được dùng để khởi tạo `total`, khiến biến này có giá trị `30`.

### 3.4. Vì sao phải khai báo trước khi gọi?

Trong C++, một lời gọi hàm thông thường cần có khai báo phù hợp mà compiler đã nhìn thấy tại vị trí gọi.

Nếu định nghĩa hàm được đặt phía dưới mà chưa có khai báo trước đó, compiler có thể báo lỗi không tìm thấy tên hàm.

Có hai cách tổ chức phổ biến.

**Cách thứ nhất:** Đặt định nghĩa hàm trước vị trí gọi.

**Cách thứ hai:** Đặt function prototype trước vị trí gọi, còn định nghĩa có thể nằm phía sau hoặc trong một source file khác.

Ví dụ:

```cpp
int add(int a, int b);  // Declaration

int main() {
    return add(2, 3);
}

int add(int a, int b) { // Definition
    return a + b;
}
```

Đây là một ví dụ tối giản cho thấy khai báo giúp `main()` có thể gọi hàm được định nghĩa phía sau.

Lưu ý: `return add(2, 3)` trong `main()` trả về mã kết thúc chương trình. Nó không tự động in số `5` ra terminal.

---

## 4. Tham số (parameter) và đối số (argument)

Tham số và đối số thường xuất hiện cùng nhau nhưng thể hiện hai vai trò khác nhau.

**Tham số (parameter)** là thành phần được khai báo trong danh sách tham số của hàm, cho phép phần thân hàm tiếp nhận dữ liệu tương ứng.

**Đối số (argument)** là biểu thức được cung cấp tại vị trí gọi hàm.

Xét ví dụ:

```cpp
int multiply(int left, int right) {
    return left * right;
}

int result = multiply(4, 5);
```

Trong định nghĩa, `left` và `right` là hai tham số.

Trong lời gọi, `4` và `5` là hai đối số.

Diễn biến có thể hiểu như sau:

| Thành phần | Giá trị |
|---|---|
| Đối số thứ nhất | `4` |
| Tham số `left` | Nhận giá trị `4` |
| Đối số thứ hai | `5` |
| Tham số `right` | Nhận giá trị `5` |
| Biểu thức trả về | `4 * 5` |
| Kết quả | `20` |

Cần lưu ý rằng cơ chế khởi tạo tham số phụ thuộc vào kiểu tham số và tính chất đối số. Không phải mọi tham số đều tạo một bản sao độc lập.

Đây là điểm khác biệt giữa truyền theo giá trị và truyền theo tham chiếu, được giải thích ở phần sau.

### 4.1. Hàm có bắt buộc phải nhận tham số?

Không.

Một hàm có thể không có tham số:

```cpp
void printWelcome() {
    std::cout << "Welcome to DevHubs Wiki!\n";
}
```

Hàm được gọi bằng:

```cpp
printWelcome();
```

Dấu ngoặc tròn `()` vẫn cần thiết trong cú pháp lời gọi, ngay cả khi không truyền đối số.

### 4.2. Có bắt buộc phải truyền đúng số lượng đối số?

Đối với một lời gọi thông thường, compiler cần tìm được một hàm phù hợp với số lượng và kiểu đối số.

Nếu khai báo yêu cầu hai tham số nhưng chỉ cung cấp một đối số, lời gọi không hợp lệ trừ khi có cơ chế phù hợp như tham số mặc định hoặc một overload khác.

Ngoài số lượng, **kiểu đối số cũng quan trọng**.

Compiler có thể thực hiện một số phép chuyển đổi kiểu khi khởi tạo tham số. Tuy nhiên, không phải mọi phép chuyển đổi đều hợp lệ hoặc an toàn.

Vì vậy, cần thiết kế kiểu tham số phản ánh đúng dữ liệu mà hàm mong đợi.

---

## 5. Giá trị trả về và câu lệnh return

`return` là câu lệnh dùng để kết thúc một lời gọi hàm và, khi phù hợp, cung cấp giá trị kết quả.

Ví dụ:

```cpp
bool isEven(int number) {
    return number % 2 == 0;
}
```

Hàm trả về giá trị kiểu `bool`.

Nếu số chia hết cho 2, biểu thức trả về `true`. Ngược lại, kết quả là `false`.

Điều này vẫn đúng với số âm. Chẳng hạn, `isEven(-4)` trả về `true` vì phần dư của phép chia `-4` cho `2` bằng `0`.

### 5.1. Điều gì xảy ra khi gặp return?

Khi một câu lệnh `return` được thực hiện:

1. Biểu thức trả về được đánh giá nếu có.
2. Giá trị kết quả được tạo theo quy tắc của kiểu trả về.
3. Những đối tượng cục bộ cần hủy được xử lý theo quy tắc lifetime.
4. Lời gọi hàm kết thúc.
5. Chương trình tiếp tục quá trình thực thi tại nơi gọi, trừ những trường hợp đặc biệt liên quan đến ngoại lệ hoặc kết thúc chương trình.

Các câu lệnh nằm sau `return` trên cùng đường thực thi sẽ không được thực hiện.

### 5.2. Một hàm có thể có nhiều return không?

Có.

Một hàm có thể trả kết quả tại nhiều vị trí khác nhau, tùy điều kiện.

Ví dụ:

```cpp
bool isValidScore(int score) {
    if (score < 0) {
        return false;
    }

    if (score > 10) {
        return false;
    }

    return true;
}
```

Hàm kiểm tra lần lượt:

- Nếu điểm âm, lập tức trả `false`.
- Nếu điểm lớn hơn 10, lập tức trả `false`.
- Nếu không rơi vào hai trường hợp trên, trả `true`.

Việc sử dụng nhiều câu lệnh `return` ở đây giúp thể hiện rõ những điều kiện từ chối.

Không có quy tắc C++ bắt buộc mọi hàm chỉ được có một `return`.

### 5.3. Có nhất thiết phải trả về đúng kiểu?

Giá trị được trả về phải có khả năng khởi tạo kết quả thuộc kiểu trả về theo quy tắc ngôn ngữ.

Ví dụ, nếu hàm trả về `double`, một giá trị `int` có thể được chuyển đổi thành `double` trong trường hợp phù hợp.

Tuy nhiên, chuyển đổi kiểu có thể làm mất thông tin hoặc độ chính xác.

Vì vậy, không nên dựa vào chuyển đổi ngầm khi kiểu kết quả có ý nghĩa quan trọng đối với thuật toán.

### 5.4. Thiếu return gây ra điều gì?

Xét:

```cpp
int getScore(bool valid) {
    if (valid) {
        return 100;
    }
}
```

Nếu `valid` là `true`, hàm trả về `100`.

Nhưng nếu `valid` là `false`, quá trình thực thi đi đến cuối hàm mà không trả giá trị.

Trong C++17, đi tới cuối một hàm trả giá trị thông thường như vậy gây **undefined behavior**.

Compiler có thể đưa ra cảnh báo, nhưng không nên mặc định nó sẽ phát hiện và ngăn mọi trường hợp.

Riêng `main()` có quy tắc đặc biệt: khi quá trình thực thi đi đến cuối hàm `main`, chương trình được xử lý như trả về `0` trong trường hợp kết thúc bình thường.

Quy tắc đặc biệt này không áp dụng cho mọi hàm khác.

---

## 6. Hàm void và sự khác biệt giữa in kết quả với trả kết quả

Từ khóa `void` trong vị trí kiểu trả về cho biết hàm không trả về một giá trị thông thường cho nơi gọi.

Ví dụ:

```cpp
void printScore(int score) {
    std::cout << "Score: " << score << '\n';
}
```

Hàm thực hiện thao tác xuất dữ liệu.

Nơi gọi không nhận một giá trị `int` hay `double` từ `printScore()`.

### 6.1. Hàm void có được dùng return không?

Có.

Một hàm trả về `void` có thể sử dụng:

```cpp
return;
```

để kết thúc lời gọi sớm.

Ví dụ:

```cpp
void printPositive(int number) {
    if (number <= 0) {
        return;
    }

    std::cout << number << '\n';
}
```

Khi `number <= 0`, hàm kết thúc ngay và không thực hiện câu lệnh in phía sau.

Khi `number > 0`, chương trình bỏ qua nhánh `if` và tiếp tục in số.

Khác với hàm trả về `int`, câu lệnh `return;` trong hàm `void` không cung cấp một giá trị kết quả.

### 6.2. In ra màn hình không đồng nghĩa với return

Hai hàm sau có mục đích khác nhau:

```cpp
int square(int value) {
    return value * value;
}

void printSquare(int value) {
    std::cout << value * value << '\n';
}
```

`square()` cung cấp một giá trị để nơi gọi có thể sử dụng tiếp.

`printSquare()` trực tiếp ghi dữ liệu ra luồng xuất.

Ví dụ, kết quả `square(5)` có thể được đem cộng, so sánh hoặc lưu vào biến khác.

Ngược lại, `printSquare(5)` không tạo một giá trị số nguyên để sử dụng trong biểu thức như vậy.

Đây là khác biệt giữa **kết quả trả về** và **tác động của hàm lên môi trường bên ngoài**.

### 6.3. Khi nào nên sử dụng void?

`void` phù hợp khi mục đích của hàm là thực hiện một thao tác thay vì cung cấp một giá trị.

Ví dụ:

- Hiển thị thông tin.
- Ghi dữ liệu vào tệp.
- Thay đổi đối tượng thông qua tham chiếu.
- Thực hiện một thao tác điều khiển.

Tuy nhiên, việc một hàm có tác động không có nghĩa nó bắt buộc phải trả về `void`.

Nhiều API vừa thực hiện thao tác vừa trả về trạng thái thành công, mã lỗi hoặc thông tin kết quả.

**Nguyên tắc:** Kiểu trả về nên thể hiện đúng hợp đồng của hàm.

---

## 7. Truyền tham số theo giá trị (pass by value)

Khi một tham số được khai báo bằng kiểu giá trị thông thường như `int`, hàm có một đối tượng tham số riêng được khởi tạo từ đối số.

Đây là cơ chế **pass by value**.

Xét hàm:

```cpp
void addBonus(int score) {
    score += 5;
}
```

Giả sử trong hàm gọi có:

```cpp
int score{10};
addBonus(score);
```

Sau lời gọi, biến `score` của người gọi vẫn bằng `10`.

### 7.1. Tại sao giá trị không thay đổi?

Tham số `score` trong `addBonus()` là một đối tượng riêng.

Khi hàm được gọi, tham số nhận giá trị ban đầu từ đối số.

Sau đó, phép cộng được thực hiện trên tham số bên trong hàm, không phải biến gốc ở nơi gọi.

Diễn biến:

| Thời điểm | Biến trong hàm gọi | Tham số trong addBonus |
|---|---:|---:|
| Trước lời gọi | 10 | Chưa tồn tại cho lời gọi này |
| Bắt đầu hàm | 10 | 10 |
| Sau `score += 5` | 10 | 15 |
| Kết thúc hàm | 10 | Hết lifetime |

Như vậy, **thay đổi tham số được truyền theo giá trị không trực tiếp thay đổi đối tượng gốc**.

### 7.2. Khi nào truyền theo giá trị là phù hợp?

Đối với các kiểu nhỏ như `int`, `bool` hoặc `double`, truyền theo giá trị thường đơn giản và hiệu quả.

Nó cũng phù hợp khi hàm cần làm việc với một giá trị độc lập mà không ảnh hưởng đến dữ liệu của người gọi.

Với các đối tượng lớn hơn, việc tạo một bản sao có thể tốn tài nguyên. Trong những tình huống đó, có thể cân nhắc truyền bằng reference.

Tuy nhiên, không nên mặc định truyền giá trị luôn chậm. Chi phí phụ thuộc vào kiểu đối tượng và cách hàm sử dụng dữ liệu.

---

## 8. Truyền tham số bằng reference (pass by reference)

Reference cho phép tham số liên kết với một đối tượng đã tồn tại thay vì tạo một đối tượng giá trị riêng.

Trong trường hợp cơ bản, khai báo `T&` tạo một **lvalue reference**.

Ví dụ:

```cpp
void addBonus(int& score) {
    score += 5;
}
```

Nếu trong hàm gọi có:

```cpp
int score{10};
addBonus(score);
```

sau lời gọi, `score` bằng `15`.

### 8.1. Vì sao reference thay đổi được biến gốc?

Khác với ví dụ truyền giá trị, tham số `score` trong hàm không biểu diễn một đối tượng `int` độc lập.

Nó là tham chiếu đến chính đối tượng được người gọi cung cấp.

Do đó, khi thực hiện:

```cpp
score += 5;
```

chương trình sửa đối tượng gốc.

| Thời điểm | Giá trị đối tượng gốc |
|---|---:|
| Trước lời gọi | 10 |
| Bắt đầu lời gọi | 10 |
| Sau phép cộng qua reference | 15 |
| Sau khi hàm kết thúc | 15 |

Điều này rất hữu ích khi mục đích của hàm là cập nhật dữ liệu bên ngoài.

### 8.2. Reference không phải một con trỏ có thể đổi đích

Một reference thông thường phải được liên kết với đối tượng phù hợp khi khởi tạo.

Sau đó, reference không thể được liên kết lại với một đối tượng khác bằng phép gán thông thường.

Câu lệnh gán cho reference sẽ gán vào đối tượng mà reference đang tham chiếu.

Reference cũng không có trạng thái null hợp lệ như pointer.

Tuy nhiên, một reference vẫn có thể trở thành không an toàn để sử dụng nếu đối tượng được tham chiếu đã hết lifetime.

### 8.3. const reference

Nếu hàm chỉ cần đọc đối tượng mà không sửa, có thể sử dụng `const T&`.

Ví dụ:

```cpp
bool isNamed(const std::string& name) {
    return !name.empty();
}
```

Hàm nhận một reference đến chuỗi và kiểm tra chuỗi có rỗng hay không.

Khai báo `const std::string&` có hai lợi ích chính:

- Không yêu cầu tạo một bản sao chuỗi chỉ để đọc.
- Không cho phép sửa chuỗi thông qua tham chiếu `name`.

Cần phân biệt: `const` ở đây giới hạn những thao tác qua tham chiếu. Nó không nhất thiết biến đối tượng gốc thành bất biến trong mọi ngữ cảnh.

### 8.4. So sánh các cách truyền tham số

| Cách truyền | Ví dụ | Mục đích thường gặp |
|---|---|---|
| Theo giá trị | `int value` | Nhận giá trị độc lập |
| Theo reference | `int& value` | Sửa đối tượng gốc |
| Theo const reference | `const std::string& text` | Đọc đối tượng mà không sao chép |
| Theo pointer | `int* value` | Truy cập qua địa chỉ, có thể biểu diễn null |

Đối với những đối tượng nhỏ, truyền giá trị thường là lựa chọn mặc định hợp lý.

Với đối tượng có chi phí sao chép lớn, `const T&` có thể phù hợp khi chỉ cần đọc.

Khi hàm cần sửa trực tiếp đối tượng của người gọi, `T&` thể hiện rõ ý định.

Nếu đối tượng có thể vắng mặt, pointer thường phù hợp hơn reference thông thường.

Các quy tắc về pointer, `nullptr`, ownership và lifetime được giải thích trong bài [References và pointers](/cpp/bat-dau/references-pointers).

---

## 9. Phạm vi biến (scope)

**Scope** là phạm vi trong mã nguồn mà một tên được khai báo có thể được tìm thấy và sử dụng theo các quy tắc tra cứu tên của C++.

Scope không phải là phạm vi giá trị của biến và cũng không đồng nghĩa với thời gian sống của đối tượng.

### 9.1. Block scope

Một khối lệnh được đặt giữa `{` và `}`.

Biến được khai báo trong một khối thông thường chỉ có tên nằm trong phạm vi tương ứng của khối đó.

Ví dụ:

```cpp
int score{10};

{
    int bonus{5};
    score += bonus;
}

// score = 15
// bonus khong con trong scope
```

Trong khối bên trong, chương trình có thể sử dụng cả `score` và `bonus`.

Sau khi rời khối, tên `bonus` không còn được truy cập từ vị trí đó.

Tên `score` vẫn tồn tại trong phạm vi bên ngoài của nó.

Điều này cho phép người lập trình giới hạn các biến tạm vào đúng khu vực cần sử dụng.

### 9.2. Scope của tham số hàm

Tham số được khai báo trong danh sách tham số của hàm có phạm vi phù hợp với định nghĩa hàm đó.

Ví dụ:

```cpp
int square(int value) {
    return value * value;
}
```

Tên `value` được sử dụng trong phần thân `square()`.

Một hàm khác không thể tự động truy cập tham số `value` của lời gọi `square()`.

Mỗi lần gọi hàm còn có những đối tượng tham số và trạng thái thực thi riêng theo cơ chế tương ứng.

Vì vậy, nếu `square()` được gọi với hai giá trị khác nhau, các lời gọi không phải chia sẻ một biến tham số tự động duy nhất.

### 9.3. Scope của biến trong vòng lặp for

Xét:

```cpp
for (int i = 0; i < 3; ++i) {
    std::cout << i << ' ';
}
```

Biến `i` được khai báo trong phần khởi tạo của `for`.

Tên `i` có thể được sử dụng trong điều kiện, phần cập nhật và thân vòng lặp theo phạm vi tương ứng.

Nhưng sau khi câu lệnh `for` kết thúc, tên này không còn nằm trong phạm vi có thể truy cập từ câu lệnh tiếp theo.

Đây là lý do việc khai báo biến đếm ngay trong `for` thường giúp giới hạn phạm vi sử dụng của nó.

### 9.4. Vì sao nên giới hạn scope?

Giữ scope nhỏ giúp giảm số vị trí có thể sử dụng hoặc sửa một biến.

Chẳng hạn, một biến tạm chỉ phục vụ một phép tính không cần phải tồn tại ở phạm vi của cả hàm nếu có thể được khai báo trong khối xử lý thích hợp.

Điều này làm cho trạng thái chương trình dễ theo dõi hơn, đồng thời giảm nguy cơ sử dụng nhầm biến ở một phần xử lý không liên quan.

---

## 10. Shadowing: Khi biến bị che khuất

Shadowing xảy ra khi một khai báo bên trong che khuất một tên cùng định danh đã được khai báo ở phạm vi bên ngoài.

Ví dụ:

```cpp
int score{10};

{
    int score{20};
    std::cout << score << '\n';
}

std::cout << score << '\n';
```

Kết quả:

```text
20
10
```

Có hai đối tượng riêng biệt cùng được đặt tên `score`.

Trong khối bên trong, khai báo mới che khuất tên ở phạm vi ngoài.

Do đó, câu lệnh in đầu tiên truy cập đối tượng có giá trị `20`.

Khi ra khỏi khối, khai báo bên trong không còn nằm trong phạm vi tra cứu tên. Câu lệnh in thứ hai sử dụng biến ngoài, có giá trị `10`.

### 10.1. Shadowing có phải lỗi không?

Không nhất thiết.

C++ cho phép nhiều trường hợp shadowing hợp lệ.

Tuy nhiên, shadowing có thể gây lỗi logic nếu người lập trình nhầm giữa việc khai báo một biến mới và thay đổi biến đã tồn tại.

Ví dụ:

```cpp
int score{10};

if (score > 0) {
    int score{20};
}
```

Câu lệnh trong khối `if` tạo một biến mới chứ không cập nhật biến `score` bên ngoài.

Nếu mục đích thực sự là thay đổi biến gốc, cần sử dụng phép gán thay vì khai báo lại.

Trong dự án lớn, các cảnh báo liên quan đến shadowing có thể giúp phát hiện những trường hợp đáng ngờ.

---

## 11. Lifetime: Thời gian sống của đối tượng

**Lifetime** là khoảng thời gian một đối tượng tồn tại theo các quy tắc của C++.

Khái niệm này khác với scope.

Scope quyết định nơi một tên có thể được sử dụng.

Lifetime quyết định khi nào đối tượng bắt đầu và kết thúc sự tồn tại của nó.

### 11.1. Biến cục bộ thông thường

Xét:

```cpp
void calculate() {
    int result{100};
}
```

Biến `result` có *automatic storage duration*.

Trong ví dụ này, đối tượng được khởi tạo khi chương trình đi đến khai báo và kết thúc lifetime khi rời khỏi khối chứa nó.

Ở mỗi lần gọi `calculate()`, một đối tượng `result` riêng được tạo trong quá trình thực thi lời gọi tương ứng.

Giá trị của biến cục bộ thông thường không tự động được giữ lại để sử dụng ở lần gọi tiếp theo.

### 11.2. Biến static cục bộ

C++ cho phép khai báo biến `static` bên trong hàm.

Ví dụ:

```cpp
int countCalls() {
    static int count{0};
    return ++count;
}
```

Nếu gọi liên tiếp:

```cpp
countCalls(); // 1
countCalls(); // 2
countCalls(); // 3
```

ta nhận được ba giá trị khác nhau.

Tại sao?

Vì `count` là biến cục bộ có **static storage duration**.

Tên `count` vẫn chỉ được sử dụng trong phạm vi thích hợp của hàm, nhưng đối tượng không bị hủy khi mỗi lời gọi kết thúc.

Nó giữ trạng thái qua các lần gọi.

Với biến `static` cục bộ được khởi tạo động, C++ có quy tắc khởi tạo khi luồng điều khiển đi qua khai báo lần đầu và bỏ qua việc khởi tạo lại ở những lần tiếp theo, cùng các quy tắc cụ thể về lỗi khởi tạo và đồng thời.

Trong ví dụ, biến được khởi tạo bằng hằng `0`, sau đó tăng theo từng lời gọi.

### 11.3. So sánh scope, lifetime và storage duration

| Khái niệm | Câu hỏi được trả lời |
|---|---|
| Scope | Tên có thể được sử dụng ở đâu trong mã nguồn? |
| Lifetime | Đối tượng tồn tại trong khoảng thời gian nào? |
| Storage duration | Vùng lưu trữ của đối tượng được quản lý theo cơ chế nào và trong bao lâu? |

Với biến cục bộ thông thường, scope và lifetime có thể trông như gắn liền với nhau.

Nhưng với biến `static`, tên vẫn có scope cục bộ trong khi đối tượng tồn tại lâu hơn nhiều so với một lần gọi hàm.

Đó là một ví dụ cho thấy **không thể dùng scope để suy ra lifetime trong mọi trường hợp**.

---

## 12. Biến toàn cục và biến cục bộ

Biến cục bộ được khai báo trong một phạm vi giới hạn, chẳng hạn thân hàm hoặc khối lệnh.

Biến được khai báo ở namespace scope có thể được sử dụng từ những vị trí phù hợp theo quy tắc tra cứu tên và linkage.

Ví dụ:

```cpp
int total{100};

int getTotal() {
    return total;
}
```

Trong ví dụ này, `total` là biến ở namespace scope và có static storage duration.

Hàm `getTotal()` có thể truy cập biến đó mà không cần nhận một tham số tương ứng.

### 12.1. Tại sao không nên lạm dụng biến toàn cục?

Vấn đề lớn nhất không nằm ở cú pháp mà ở sự phụ thuộc trạng thái.

Nếu nhiều hàm cùng đọc và thay đổi một biến toàn cục, rất khó xác định thao tác nào đã khiến giá trị của nó thay đổi.

Hàm cũng trở nên khó kiểm thử độc lập hơn vì kết quả không chỉ phụ thuộc vào đối số mà còn có thể phụ thuộc vào trạng thái bên ngoài.

Trong chương trình đa luồng, việc truy cập trạng thái chia sẻ còn phải tuân theo những quy tắc đồng bộ để tránh data race.

Vì vậy, với dữ liệu không cần chia sẻ toàn chương trình, nên ưu tiên biến cục bộ và truyền dữ liệu qua tham số.

### 12.2. Khi nào biến ở namespace scope phù hợp?

Một số giá trị cấu hình hoặc hằng số dùng chung có thể được đặt trong namespace thích hợp.

C++17 hỗ trợ inline variables, cho phép tổ chức những định nghĩa phù hợp trong header.

Ví dụ:

```cpp
namespace Config {
    inline constexpr int maxPlayers{100};
}
```

Điều này khác với trạng thái toàn cục có thể bị thay đổi tùy ý.

Tuy nhiên, ngay cả với hằng số dùng chung, vẫn nên xác định phạm vi sử dụng và cách tổ chức dependency cho phù hợp.

---

## 13. Dangling reference và dangling pointer

Một vấn đề nghiêm trọng trong C++ là sử dụng pointer hoặc reference khi đối tượng mà chúng truy cập đã hết lifetime.

Trạng thái này thường được gọi là *dangling*.

### 13.1. Trả reference đến biến local

Xét:

```cpp
int& getValue() {
    int value{10};
    return value;
}
```

Hàm trả về một reference đến biến cục bộ `value`.

Tuy nhiên, `value` có automatic storage duration và hết lifetime khi hàm kết thúc.

Reference trả về không giúp đối tượng đó tiếp tục tồn tại.

Do đó, người gọi không thể sử dụng reference ấy để truy cập `value` một cách hợp lệ sau khi lifetime của đối tượng đã kết thúc.

Việc truy cập đối tượng hết lifetime theo cách như vậy gây undefined behavior.

### 13.2. Trả pointer đến biến local

Tương tự:

```cpp
int* getValue() {
    int value{10};
    return &value;
}
```

Pointer được trả về chứa địa chỉ của biến cục bộ, nhưng đối tượng không còn tồn tại sau khi lời gọi kết thúc.

Một pointer không null chưa chắc trỏ đến một đối tượng còn sống.

Vì vậy, chỉ kiểm tra `pointer != nullptr` không đủ để chứng minh thao tác dereference là an toàn.

### 13.3. Cách trả kết quả an toàn hơn

Nếu hàm chỉ cần cung cấp một giá trị độc lập, nên trả về bằng giá trị:

```cpp
int getValue() {
    int value{10};
    return value;
}
```

Trong trường hợp này, kết quả được trả về theo cơ chế của kiểu `int`, không phải reference đến biến local.

C++ hiện đại có nhiều cơ chế giúp tối ưu việc trả về đối tượng bằng giá trị, gồm copy elision và move semantics khi áp dụng.

Không nên mặc định trả về reference luôn nhanh hơn.

### 13.4. Có khi nào được trả reference?

Có.

Hàm có thể trả reference đến một đối tượng còn sống nếu hợp đồng sử dụng bảo đảm đối tượng đó tồn tại trong thời gian reference được dùng.

Ví dụ, một hàm có thể nhận một mảng bằng reference rồi trả reference đến phần tử đầu.

Trong trường hợp đó, trách nhiệm quản lý lifetime của mảng vẫn thuộc về nơi sở hữu mảng.

Điều cần tránh không phải là mọi kiểu trả về reference, mà là **trả reference đến đối tượng không còn hợp lệ để truy cập**.

Nội dung này được trình bày sâu hơn trong bài [References và pointers](/cpp/bat-dau/references-pointers).

---

## 14. Một hàm có thể gọi hàm khác

C++ cho phép một hàm gọi những hàm đã được khai báo phù hợp.

Nhờ đó, có thể xây dựng các thao tác lớn từ những thao tác nhỏ hơn.

Ví dụ:

```cpp
int square(int value) {
    return value * value;
}

int sumOfSquares(int a, int b) {
    return square(a) + square(b);
}
```

Nếu gọi `sumOfSquares(3, 4)`, hàm cần tính tổng bình phương của hai số.

Diễn biến:

| Bước | Thao tác | Kết quả |
|---|---|---|
| 1 | Gọi `sumOfSquares(3, 4)` | Bắt đầu xử lý |
| 2 | Gọi `square(3)` | 9 |
| 3 | Gọi `square(4)` | 16 |
| 4 | Cộng hai kết quả | 25 |
| 5 | Trả về | 25 |

Trong ví dụ này, thứ tự thực thi hai lời gọi `square()` không cần được giả định là từ trái sang phải. Điều quan trọng là cả hai kết quả được tính để thực hiện phép cộng.

### 14.1. Điều gì xảy ra với lời gọi đang chờ?

Khi `sumOfSquares()` gọi `square()`, lời gọi `sumOfSquares()` chưa kết thúc.

Nó cần nhận kết quả từ `square()` để hoàn thành phép cộng.

Trong các implementation thông dụng, trạng thái của những lời gọi hàm được quản lý thông qua cơ chế như call stack.

Mỗi lời gọi có thể có thông tin phục vụ việc tiếp tục thực thi, tham số và các đối tượng cục bộ.

Tuy nhiên, C++ không yêu cầu mọi compiler phải triển khai lời gọi hàm bằng một cấu trúc stack vật lý giống hệt nhau. Compiler có thể thực hiện những tối ưu hóa phù hợp.

### 14.2. Hàm đệ quy

Một hàm có thể gọi lại chính nó. Cơ chế này gọi là **recursion (đệ quy)**.

Đệ quy thường được dùng cho những bài toán có thể chia thành các bài toán con cùng dạng.

Để quá trình đệ quy kết thúc, thuật toán cần có điều kiện dừng phù hợp.

Nếu hàm liên tục gọi lại chính nó mà không tiến tới điều kiện dừng, chương trình có thể tiêu tốn tài nguyên thực thi cho đến khi gặp giới hạn môi trường.

Ngoài ra, đệ quy không tự động hiệu quả hơn vòng lặp. Chi phí và khả năng tối ưu phụ thuộc vào thuật toán cụ thể.

Chi tiết về cơ chế gọi đệ quy và call stack nằm trong bài [Đệ quy và call stack](/cpp/trung-cap/de-quy-call-stack).

---

## 15. Function overloading và default arguments

Đây là hai cơ chế giúp thiết kế giao diện hàm linh hoạt hơn.

### 15.1. Function overloading

C++ cho phép nhiều hàm cùng tên nếu có những danh sách tham số phù hợp để phân biệt.

Ví dụ:

```cpp
int add(int a, int b) {
    return a + b;
}

double add(double a, double b) {
    return a + b;
}
```

Khi gọi `add(2, 3)`, overload nhận hai `int` là lựa chọn phù hợp.

Khi gọi `add(2.5, 3.5)`, overload nhận hai `double` là lựa chọn phù hợp.

Compiler thực hiện quá trình *overload resolution* để lựa chọn hàm dựa trên tập hợp các overload và những quy tắc chuyển đổi, ràng buộc liên quan.

Không thể tạo hai overload chỉ bằng việc thay đổi kiểu trả về trong khi giữ nguyên danh sách tham số.

### 15.2. Default arguments

Default argument cho phép một tham số có giá trị mặc định khi lời gọi không cung cấp đối số tương ứng.

Ví dụ:

```cpp
int multiply(int a, int b = 2) {
    return a * b;
}
```

Khi gọi `multiply(5)`, đối số cho `b` được lấy từ giá trị mặc định `2`, nên kết quả là `10`.

Khi gọi `multiply(5, 3)`, giá trị cung cấp tường minh được sử dụng, nên kết quả là `15`.

Default arguments không tạo ra một hàm riêng biệt như function overloading.

Chúng ảnh hưởng đến cách lời gọi được xử lý dựa trên những khai báo khả dụng.

Hai cơ chế này có thể kết hợp với nhau nhưng cũng có thể tạo ra lời gọi mơ hồ nếu thiết kế không cẩn thận.

Các quy tắc chi tiết nằm trong bài [Function overloading và default arguments](/cpp/trung-cap/overloading-default-arguments).

---

## 16. Tổ chức chương trình thành nhiều hàm

Một trong những ứng dụng thực tế của hàm là tách các công việc có trách nhiệm khác nhau.

Giả sử chương trình cần xử lý điểm số.

Có thể chia thành ba nhóm logic:

**Kiểm tra dữ liệu:** Xác định điểm có thuộc phạm vi được phép hay không.

**Tính toán:** Xử lý những điểm hợp lệ để tạo kết quả.

**Hiển thị:** Chuyển kết quả thành nội dung phù hợp để người dùng xem.

Ví dụ:

```cpp
bool isValidScore(int score) {
    return score >= 0 && score <= 10;
}

double average(int a, int b) {
    return (static_cast<double>(a) + b) / 2;
}

void printAverage(double value) {
    std::cout << "Average: " << value << '\n';
}
```

Những hàm này có trách nhiệm khác nhau.

`isValidScore()` trả về kết quả kiểm tra.

`average()` thực hiện phép tính và trả về giá trị.

`printAverage()` xuất thông tin ra luồng chuẩn.

Điểm đáng chú ý là `average()` không trực tiếp in dữ liệu. Nó có thể được sử dụng trong những ngữ cảnh khác như tính toán tiếp, lưu kết quả hoặc truyền cho một API khác.

### 16.1. Hàm có nên tự kiểm tra dữ liệu không?

Điều này phụ thuộc vào hợp đồng của hàm.

Ví dụ trên chỉ minh họa việc phân chia trách nhiệm. `average()` tự nó không giới hạn tham số trong đoạn `[0, 10]`.

Nếu ứng dụng yêu cầu điểm phải hợp lệ, cần bảo đảm điều kiện đó được kiểm tra ở ranh giới thích hợp.

Có hai cách tiếp cận phổ biến:

**Kiểm tra tại nơi gọi:** Phù hợp nếu hàm được thiết kế với tiền điều kiện rõ ràng, và người gọi có trách nhiệm bảo đảm dữ liệu hợp lệ.

**Kiểm tra trong hàm:** Phù hợp khi hàm là ranh giới API cần tự bảo vệ trước đầu vào không hợp lệ hoặc khi muốn trả về lỗi cụ thể.

Không có quy tắc bắt buộc mọi hàm đều phải kiểm tra lại toàn bộ điều kiện đã được bảo đảm ở tầng khác.

Tuy nhiên, những giả định quan trọng phải được thể hiện rõ trong hợp đồng hoặc thiết kế.

### 16.2. Hàm càng ngắn càng tốt?

Không nhất thiết.

Một hàm ngắn nhưng có tên khó hiểu, phụ thuộc nhiều trạng thái toàn cục hoặc chỉ chuyển tiếp sang nhiều hàm khác có thể khó bảo trì hơn một hàm dài hơn nhưng có luồng xử lý rõ ràng.

Nên chia nhỏ khi một nhóm thao tác có trách nhiệm độc lập, cần tái sử dụng hoặc có thể được kiểm thử riêng một cách có ý nghĩa.

Ngược lại, không cần tạo một hàm chỉ để bọc một phép cộng nếu điều đó không giúp giải thích hoặc tổ chức logic.

**Mục tiêu là giảm độ phức tạp mà người đọc phải theo dõi**, không phải giảm số dòng của từng hàm bằng mọi cách.

---

## 17. Tách khai báo và định nghĩa sang nhiều tệp

Khi dự án phát triển, mã nguồn thường được chia thành nhiều tệp để quản lý dễ dàng hơn.

Một cách tổ chức phổ biến:

```text
Project/
├── main.cpp
├── Calculator.h
└── Calculator.cpp
```

Trong đó:

**`Calculator.h`** chứa những khai báo cần được sử dụng từ các tệp khác:

```cpp
#ifndef CALCULATOR_H
#define CALCULATOR_H

int add(int a, int b);

#endif
```

**`Calculator.cpp`** chứa định nghĩa tương ứng:

```cpp
#include "Calculator.h"

int add(int a, int b) {
    return a + b;
}
```

Còn `main.cpp` có thể include `Calculator.h` để sử dụng `add()`.

### 17.1. Vì sao cần header?

Header cho phép những translation unit khác nhìn thấy khai báo cần thiết mà không phải sao chép thủ công phần triển khai.

`#include` trong mô hình header truyền thống đưa nội dung header vào quá trình tiền xử lý.

Include guard như `CALCULATOR_H` giúp tránh việc cùng một header bị xử lý nhiều lần trong một translation unit do include lặp.

### 17.2. Vì sao vẫn cần source file?

Khai báo chỉ cho compiler biết giao diện của hàm.

Nếu chương trình thực sự gọi một hàm nhưng linker không tìm được định nghĩa phù hợp, quá trình liên kết thường thất bại.

Ví dụ, nếu chỉ liên kết `main.cpp` mà bỏ qua `Calculator.cpp`, chương trình có thể gặp lỗi kiểu:

```text
undefined reference to `add(int, int)`
```

Thông báo cụ thể phụ thuộc vào compiler và linker.

Đây là lỗi liên quan đến liên kết định nghĩa, không phải vì cú pháp khai báo của hàm nhất thiết bị sai.

Những quy tắc về header, source file, translation unit và linker được giải thích sâu hơn trong bài [Header, source và modules](/cpp/ky-thuat/header-source-modules).

---

## 18. Những lỗi thường gặp

### 18.1. Nhầm in kết quả với trả kết quả

Một hàm ghi dữ liệu bằng `std::cout` không đồng nghĩa với việc nó cung cấp giá trị cho nơi gọi.

Nếu kết quả còn phải được sử dụng trong phép tính khác, nên xem xét trả về giá trị thay vì gắn chặt logic với output.

### 18.2. Truyền giá trị nhưng mong sửa biến gốc

Tham số truyền theo giá trị có đối tượng riêng. Sửa tham số đó không trực tiếp sửa biến của người gọi.

Nếu cần sửa đối tượng gốc, lựa chọn cách truyền phù hợp và thể hiện rõ ý định trong giao diện hàm.

### 18.3. Thiếu return

Một hàm trả giá trị thông thường phải bảo đảm những đường thực thi có thể hoàn thành bình thường đều trả về kết quả phù hợp.

Không nên dựa vào giá trị ngẫu nhiên hoặc giả định compiler sẽ tự tạo kết quả.

### 18.4. Gọi hàm chưa được khai báo

Một lời gọi cần có khai báo phù hợp ở vị trí gọi.

Nếu hàm được định nghĩa phía sau hoặc trong tệp khác, cần sử dụng declaration hoặc header thích hợp.

### 18.5. Nhầm tên biến do shadowing

Khai báo một biến mới cùng tên trong scope bên trong không phải là phép gán vào biến bên ngoài.

Cần chú ý dấu ngoặc nhọn và những khai báo có tên trùng nhau.

### 18.6. Nhầm scope với lifetime

Một tên có thể hết phạm vi sử dụng trong khi đối tượng vẫn tồn tại, chẳng hạn đối với biến `static` cục bộ.

Ngược lại, có thể vẫn giữ một pointer hoặc reference sau khi đối tượng đích đã hết lifetime.

Không nên sử dụng phạm vi tên làm tiêu chí duy nhất để đánh giá sự an toàn khi truy cập đối tượng.

### 18.7. Trả reference hoặc pointer đến biến local

Một biến cục bộ có automatic storage duration thông thường sẽ hết lifetime khi rời khỏi khối.

Reference hoặc pointer đến đối tượng đó không tự động kéo dài lifetime.

Trong trường hợp chỉ cần cung cấp dữ liệu độc lập, trả về bằng giá trị thường là lựa chọn phù hợp hơn.

### 18.8. Lạm dụng biến toàn cục

Hàm phụ thuộc quá nhiều vào trạng thái bên ngoài thường khó kiểm thử và khó xác định nguyên nhân khi kết quả thay đổi.

Nên truyền dữ liệu cần thiết thông qua tham số nếu điều đó làm hợp đồng hàm rõ ràng hơn.

### 18.9. Tạo quá nhiều hàm không cần thiết

Không nên tách một thao tác thành nhiều lớp hàm chỉ vì muốn mỗi hàm có thật ít dòng.

Sự phân chia phải phục vụ mục tiêu giảm phụ thuộc, tăng khả năng hiểu và tạo ra những đơn vị xử lý có ý nghĩa.

---

## 19. Tổng kết

Hàm là một trong những công cụ nền tảng để tổ chức chương trình C++.

Thông qua **khai báo và định nghĩa**, compiler biết hàm có giao diện như thế nào và chương trình có thể thực hiện công việc gì khi hàm được gọi.

**Tham số và đối số** xác định cách dữ liệu được cung cấp cho một lời gọi. Tùy cách khai báo, hàm có thể nhận giá trị độc lập, tham chiếu đến đối tượng đã tồn tại hoặc một kiểu dữ liệu biểu diễn những hợp đồng phức tạp hơn.

**`return`** kết thúc lời gọi và có thể cung cấp kết quả. Với hàm `void`, mục đích thường là thực hiện thao tác thay vì trả về một giá trị thông thường.

**Scope** quyết định nơi một tên có thể được truy cập, trong khi **lifetime** quyết định đối tượng tồn tại trong bao lâu. Hai khái niệm này không đồng nhất.

Khi chương trình phát triển, việc chia logic thành các hàm có trách nhiệm rõ ràng giúp giảm sự phụ thuộc, hạn chế mã lặp và cải thiện khả năng bảo trì.

Điều quan trọng không phải tạo ra thật nhiều hàm, mà là **thiết kế mỗi hàm với mục đích, dữ liệu đầu vào, kết quả và những điều kiện sử dụng dễ hiểu**.

---

## Đọc tiếp

- [Nhập xuất, điều kiện và vòng lặp](/cpp/bat-dau/nhap-xuat-dieu-kien-vong-lap): Tìm hiểu cách kiểm soát luồng thực thi bên trong hàm.
- [References và pointers](/cpp/bat-dau/references-pointers): Hiểu sâu hơn về tham chiếu, địa chỉ bộ nhớ và lifetime.
- [Function overloading và default arguments](/cpp/trung-cap/overloading-default-arguments): Nghiên cứu những quy tắc khai báo và lựa chọn hàm nâng cao.
- [Đệ quy và call stack](/cpp/trung-cap/de-quy-call-stack): Tìm hiểu cơ chế gọi hàm lồng nhau và đệ quy.
- [Header, source và modules](/cpp/ky-thuat/header-source-modules): Tổ chức mã nguồn nhiều tệp và hiểu quá trình biên dịch, liên kết.
