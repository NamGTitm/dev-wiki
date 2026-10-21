---
title: Nhập xuất, câu lệnh điều kiện và vòng lặp
description: Tìm hiểu cách nhập xuất dữ liệu, kiểm soát luồng thực thi bằng if-else và switch, sử dụng các vòng lặp for, while, do-while và phân biệt chi tiết break, continue trong C++17.
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

Một chương trình không chỉ thực hiện những phép tính được viết sẵn. Nó còn cần tiếp nhận dữ liệu, đưa ra quyết định và thực hiện các thao tác lặp lại tùy theo trạng thái của chương trình.

Trong C++, ba nhóm kiến thức quan trọng giúp thực hiện những công việc này là **nhập xuất dữ liệu, câu lệnh điều kiện và vòng lặp**.

Nhập xuất cho phép chương trình giao tiếp với môi trường bên ngoài. Câu lệnh điều kiện xác định phần mã nào được thực thi, còn vòng lặp điều khiển việc thực hiện lặp lại một nhóm câu lệnh.

Bên cạnh đó, C++ cung cấp các câu lệnh như `break`, `continue` và `return` để thay đổi luồng thực thi trong những tình huống cụ thể.

Điều quan trọng khi học các cấu trúc này không chỉ là ghi nhớ cú pháp, mà còn phải hiểu **thứ tự thực thi, điều kiện chuyển nhánh, thời điểm kiểm tra điều kiện và vị trí chương trình tiếp tục chạy**.

Bài viết sử dụng chuẩn **C++17**.

---

## 1. Nhập xuất dữ liệu trong C++

### 1.1. Nhập xuất là gì?

Nhập xuất dữ liệu, hay *Input/Output (I/O)*, là quá trình trao đổi thông tin giữa chương trình và môi trường bên ngoài.

**Input** là dữ liệu được đưa vào chương trình để xử lý. Dữ liệu có thể đến từ bàn phím, tệp, thiết bị hoặc chương trình khác.

**Output** là dữ liệu chương trình tạo ra và gửi đến nơi nhận, chẳng hạn terminal, tệp hoặc một hệ thống khác.

Đối với chương trình C++ chạy trong terminal, thư viện `<iostream>` cung cấp những đối tượng nhập xuất chuẩn thường dùng.

| Đối tượng | Vai trò |
|---|---|
| `std::cin` | Đọc dữ liệu từ luồng nhập chuẩn |
| `std::cout` | Ghi dữ liệu vào luồng xuất chuẩn |
| `std::cerr` | Ghi thông báo vào luồng lỗi chuẩn |

Theo cấu hình thông thường, đầu vào chuẩn nhận dữ liệu từ bàn phím, còn đầu ra chuẩn và luồng lỗi chuẩn được hiển thị trong terminal.

Tuy nhiên, đây không phải đặc điểm bắt buộc. Người dùng có thể chuyển hướng các luồng đến tệp hoặc kết nối chúng với chương trình khác.

Chẳng hạn, khi chạy chương trình trên hệ thống chấm bài, `std::cin` có thể nhận dữ liệu từ bộ kiểm thử thay vì từ bàn phím.

### 1.2. Xuất dữ liệu với std::cout

`std::cout` là một đối tượng luồng xuất (*output stream*).

Toán tử `<<` được dùng để đưa dữ liệu vào luồng đó.

Ví dụ:

```cpp
std::cout << "Diem: " << score << '\n';
```

Câu lệnh trên gửi lần lượt ba thành phần đến luồng xuất:

1. Chuỗi `"Diem: "`.
2. Giá trị của biến `score`.
3. Ký tự xuống dòng `'\n'`.

Trong trường hợp thông thường, các thành phần được biểu diễn thành văn bản theo quy tắc định dạng của luồng.

Có thể sử dụng nhiều toán tử `<<` trong cùng một biểu thức vì những phép chèn dữ liệu thường trả về tham chiếu đến luồng xuất, cho phép tiếp tục nối các thao tác.

#### Xuống dòng và flush

Hai cách viết thường gặp là:

- `'\n'`: Ghi ký tự xuống dòng.
- `std::endl`: Ghi ký tự xuống dòng và yêu cầu flush luồng xuất.

*Flush* là thao tác yêu cầu đẩy dữ liệu đã được đệm của luồng đến thành phần xử lý bên dưới.

Không nên sử dụng `std::endl` trong mọi trường hợp chỉ để xuống dòng, vì flush thường xuyên có thể làm tăng chi phí nhập xuất.

Với những chương trình in lượng dữ liệu lớn, `'\n'` thường là lựa chọn phù hợp hơn.

Ngược lại, khi thực sự cần flush tại một thời điểm cụ thể, có thể sử dụng `std::endl` hoặc `std::flush`.

### 1.3. Nhập dữ liệu với std::cin

`std::cin` là một đối tượng luồng nhập (*input stream*).

Toán tử `>>` thực hiện thao tác trích xuất dữ liệu từ luồng và chuyển đổi sang kiểu phù hợp với đối tượng nhận.

Ví dụ:

```cpp
int age{};
std::cin >> age;
```

Khi quá trình đọc thành công, giá trị được nhập sẽ được lưu vào biến `age`.

Điều đáng chú ý là `std::cin` không đơn thuần sao chép toàn bộ dữ liệu đầu vào vào biến. Với các kiểu số, nó thực hiện quá trình phân tích và chuyển đổi văn bản sang giá trị thuộc kiểu tương ứng.

Ví dụ, khi đầu vào là chuỗi ký tự `16`, phép trích xuất số nguyên có thể chuyển nó thành giá trị `int` bằng `16`.

Nếu dữ liệu không thể được chuyển đổi phù hợp, luồng sẽ chuyển sang trạng thái lỗi.

### 1.4. Nhập nhiều giá trị

C++ cho phép nối các phép trích xuất:

```cpp
std::cin >> a >> b;
```

Về mặt xử lý, dữ liệu được trích xuất lần lượt vào `a` rồi `b`.

Đối với các phép nhập số thông thường, khoảng trắng đứng trước giá trị cần đọc sẽ được bỏ qua. Những khoảng trắng này có thể là dấu cách, tab hoặc ký tự xuống dòng.

Vì vậy, các cách nhập sau đều có thể cung cấp hai số nguyên giống nhau:

| Cách nhập | Nội dung |
|---|---|
| Cùng một dòng | `5 8` |
| Hai dòng | `5` và `8` trên hai dòng riêng |
| Nhiều dấu cách | `5    8` |

Đối với phép đọc số nguyên thông thường, `std::cin` không yêu cầu mỗi số phải nằm trên một dòng riêng.

Tuy nhiên, nếu một phép đọc thất bại, không nên mặc định các phép đọc tiếp theo vẫn thành công.

### 1.5. Vì sao cin không đọc được họ tên có dấu cách?

Khi sử dụng toán tử `>>` với `std::string`, quá trình đọc thông thường dừng tại ký tự khoảng trắng phân tách.

Chẳng hạn, với đầu vào:

`Nguyen Van An`

phép đọc:

```cpp
std::cin >> name;
```

chỉ lấy được `Nguyen`.

Các ký tự còn lại tiếp tục nằm trong luồng nhập để những thao tác sau xử lý.

Đây là hành vi phù hợp khi chương trình cần đọc từng từ, từng token hoặc những giá trị được phân cách bằng khoảng trắng.

Nhưng nếu cần đọc một dòng văn bản có chứa khoảng trắng, nên sử dụng `std::getline()`.

### 1.6. Đọc cả dòng với std::getline

`std::getline()` đọc dữ liệu đến khi gặp ký tự phân cách, thông thường là ký tự xuống dòng.

Ví dụ:

```cpp
std::getline(std::cin, name);
```

Nếu người dùng nhập `Nguyen Van An`, biến `name` sẽ chứa toàn bộ nội dung đó.

Khác với phép trích xuất `>>`, `getline()` không tự bỏ qua khoảng trắng đầu dòng. Những dấu cách ở đầu và trong dòng vẫn là một phần của nội dung được đọc.

Ký tự xuống dòng kết thúc việc đọc sẽ được lấy khỏi luồng nhưng không được đưa vào chuỗi kết quả.

Khi không có ký tự nào trước dấu xuống dòng, `getline()` có thể trả về một chuỗi rỗng mà không nhất thiết coi đây là lỗi.

Cần phân biệt **dòng rỗng hợp lệ** với **thao tác đọc thất bại**.

### 1.7. Vì sao getline thường đọc ra chuỗi rỗng sau cin?

Đây là một lỗi rất phổ biến khi mới học C++.

Giả sử chương trình thực hiện hai thao tác liên tiếp:

1. Đọc tuổi bằng `std::cin >> age`.
2. Đọc họ tên bằng `std::getline(std::cin, name)`.

Nếu người dùng nhập tuổi rồi nhấn Enter, phép trích xuất số nguyên thường chỉ lấy phần biểu diễn số. Ký tự xuống dòng có thể vẫn còn trong luồng.

Khi `getline()` được gọi, nó gặp ngay ký tự xuống dòng đó và kết thúc việc đọc.

Kết quả là chuỗi `name` rỗng, dù chương trình chưa thực sự nhận được họ tên mà người dùng dự định nhập.

Để xử lý, sau khi phép đọc số thành công, có thể loại bỏ phần còn lại của dòng trước khi gọi `getline()`:

```cpp
std::cin.ignore(
    std::numeric_limits<std::streamsize>::max(), '\n'
);
```

Đoạn mã cần header `<limits>`.

Lệnh `ignore()` ở đây bỏ qua dữ liệu cho đến khi gặp ký tự xuống dòng hoặc đạt điều kiện kết thúc tương ứng.

Không nên mặc định chỉ cần gọi `ignore(1)` là luôn đủ, vì phần còn lại của dòng có thể chứa nhiều ký tự khác ngoài dấu xuống dòng.

### 1.8. Kiểm tra trạng thái nhập liệu

Không phải mọi dữ liệu đầu vào đều hợp lệ.

Giả sử chương trình yêu cầu người dùng nhập một số nguyên nhưng nhận được nội dung không thể chuyển thành số.

Khi đó, phép trích xuất có thể thất bại và luồng chuyển sang trạng thái lỗi.

Cách kiểm tra thường dùng:

```cpp
if (!(std::cin >> age)) {
    std::cerr << "Khong doc duoc tuoi.\n";
}
```

Biểu thức `std::cin >> age` trả về luồng nhập. Luồng có thể được sử dụng trong điều kiện để xác định thao tác đọc có đang ở trạng thái thành công hay không.

Nếu phép đọc thất bại, biểu thức phủ định `!` khiến nhánh xử lý lỗi được thực hiện.

#### Các trạng thái quan trọng của luồng

| Trạng thái | Ý nghĩa |
|---|---|
| `goodbit` | Không có cờ lỗi được bật |
| `failbit` | Một thao tác nhập xuất thất bại theo quy tắc tương ứng |
| `eofbit` | Đã gặp cuối luồng nhập |
| `badbit` | Có lỗi nghiêm trọng liên quan đến hoạt động của luồng |

Một luồng có thể đồng thời mang nhiều cờ trạng thái.

Chẳng hạn, khi không còn dữ liệu để đọc, việc gặp cuối luồng có thể đi kèm trạng thái thất bại của một phép trích xuất.

#### Phục hồi sau lỗi nhập liệu

Nếu chương trình cần yêu cầu người dùng nhập lại, chỉ lặp lại lệnh đọc là chưa đủ.

Khi `failbit` vẫn được bật, những lần đọc tiếp theo có thể tiếp tục thất bại.

Cơ chế xử lý thường gồm:

- Dùng `clear()` để xóa trạng thái lỗi khi thích hợp.
- Dùng `ignore()` để loại bỏ dữ liệu gây lỗi còn nằm trong luồng.
- Thực hiện lần đọc tiếp theo.

Tuy nhiên, không nên liên tục xóa trạng thái lỗi và thử lại nếu đầu vào đã thực sự kết thúc hoặc luồng gặp lỗi không thể phục hồi.

Đối với chương trình đọc input từ tệp hay online judge, việc gặp EOF thường là tín hiệu kết thúc dữ liệu, không phải lý do để liên tục yêu cầu nhập lại.

### 1.9. Đọc thành công chưa chắc dữ liệu hợp lệ

Giả sử chương trình đọc được số tuổi `200`.

Về cú pháp, đây có thể là một số nguyên hợp lệ. Nhưng theo quy tắc nghiệp vụ của ứng dụng, giá trị đó có thể không được chấp nhận.

Cần phân biệt:

**Kiểm tra khả năng đọc:** Dữ liệu có thể chuyển đổi sang kiểu cần thiết hay không?

**Kiểm tra định dạng:** Toàn bộ đầu vào có đáp ứng định dạng mong muốn không?

**Kiểm tra nghiệp vụ:** Giá trị đã đọc có thuộc phạm vi và đáp ứng điều kiện ứng dụng không?

Chẳng hạn, phép trích xuất số nguyên có thể chấp nhận phần số đầu tiên của `16abc`, sau đó để lại `abc` trong luồng. Nếu chương trình yêu cầu cả dòng chỉ được chứa một số nguyên, cần thực hiện kiểm tra bổ sung.

**Nguyên tắc:** Không nên đồng nhất việc đọc được dữ liệu với việc dữ liệu đó phù hợp để xử lý.

---

## 2. Câu lệnh điều kiện trong C++

### 2.1. Câu lệnh điều kiện là gì?

Thông thường, các câu lệnh trong một khối được thực thi lần lượt theo luồng điều khiển của chương trình.

Tuy nhiên, nhiều công việc chỉ được phép thực hiện nếu đáp ứng một điều kiện nhất định.

Ví dụ:

- Chỉ cho phép đăng nhập nếu thông tin xác thực hợp lệ.
- Chỉ thực hiện phép chia khi mẫu số hợp lệ.
- Chỉ chấp nhận điểm số thuộc phạm vi quy định.
- Thực hiện một hành động khác tùy lựa chọn của người dùng.

Câu lệnh điều kiện cho phép chương trình lựa chọn những nhánh thực thi khác nhau dựa trên kết quả đánh giá biểu thức.

Trong C++, hai cấu trúc lựa chọn cơ bản là `if` và `switch`.

### 2.2. Câu lệnh if

`if` quyết định có thực hiện một câu lệnh hoặc một khối lệnh hay không dựa trên biểu thức điều kiện.

Cú pháp:

```cpp
if (condition) {
    // Thuc hien khi dieu kien dung
}
```

Khi chương trình gặp `if`, biểu thức điều kiện được đánh giá.

Nếu kết quả chuyển đổi thành `true`, câu lệnh hoặc khối lệnh đi kèm sẽ được thực hiện.

Nếu kết quả là `false`, chương trình bỏ qua phần thân của `if` và tiếp tục tại câu lệnh phía sau cấu trúc đó.

#### Điều kiện được hiểu như thế nào?

Trong C++, điều kiện không nhất thiết phải có kiểu `bool` ngay từ đầu.

Một biểu thức có thể được chuyển đổi theo ngữ cảnh thành `bool` nếu kiểu dữ liệu và phép chuyển đổi cho phép.

Ví dụ, với số nguyên:

- `0` được hiểu là `false`.
- Giá trị khác `0` được hiểu là `true`.

Tuy nhiên, đối với những điều kiện nghiệp vụ, nên viết phép so sánh rõ ràng thay vì dựa vào chuyển đổi ngầm khi cách viết đó dễ gây hiểu lầm.

Ví dụ, `count > 0` diễn đạt mục đích rõ hơn nếu chương trình đang kiểm tra số lượng phần tử phải dương.

### 2.3. Câu lệnh if-else

`if-else` được sử dụng khi chương trình cần lựa chọn giữa hai hướng xử lý.

Cú pháp:

```cpp
if (condition) {
    // Nhanh dung
} else {
    // Nhanh sai
}
```

Quá trình thực thi gồm:

1. Đánh giá điều kiện của `if`.
2. Nếu đúng, thực hiện nhánh `if` và bỏ qua nhánh `else`.
3. Nếu sai, bỏ qua nhánh `if` và thực hiện nhánh `else`.
4. Tiếp tục thực thi câu lệnh sau toàn bộ cấu trúc.

Trong trường hợp thông thường, chỉ một trong hai nhánh được thực hiện.

Không nên hiểu `else` là một điều kiện mới được kiểm tra. Nó chính là nhánh được chọn khi điều kiện của `if` không thỏa mãn.

### 2.4. Chuỗi else if

Khi cần lựa chọn giữa nhiều trường hợp, có thể sử dụng `else if`.

Ví dụ, giả sử một chương trình xếp loại điểm với các mốc:

| Điều kiện | Xếp loại |
|---|---|
| Từ 8 trở lên | Giỏi |
| Từ 6,5 đến dưới 8 | Khá |
| Từ 5 đến dưới 6,5 | Trung bình |
| Dưới 5 | Chưa đạt |

Giả định điểm đầu vào đã được kiểm tra hợp lệ trong phạm vi `[0, 10]`.

Có thể biểu diễn bằng một chuỗi:

```cpp
if (score >= 8) { ... }
else if (score >= 6.5) { ... }
else if (score >= 5) { ... }
else { ... }
```

Đây là mô tả cấu trúc; dấu `...` chỉ phần xử lý tương ứng, không phải mã có thể biên dịch nguyên dạng.

#### Thứ tự kiểm tra có quan trọng không?

Có.

Trong một chuỗi `if-else if`, các điều kiện được xét lần lượt theo thứ tự xuất hiện.

Ngay khi một điều kiện đúng, chương trình thực hiện nhánh tương ứng và không tiếp tục xét các nhánh còn lại của cùng chuỗi.

Ví dụ, với `score = 9`:

1. `score >= 8` đúng.
2. Chương trình thực hiện nhánh Giỏi.
3. Các nhánh Khá, Trung bình và Chưa đạt không được xét tiếp.

Nếu đặt điều kiện `score >= 5` lên đầu, điểm `9` có thể bị xếp loại Trung bình do điều kiện này đã đúng trước.

Vì vậy, trong những bài toán phân loại theo ngưỡng, thứ tự các điều kiện phải thể hiện đúng mức độ ưu tiên.

#### else thuộc if nào?

Khi có nhiều `if` lồng nhau mà không dùng dấu ngoặc nhọn, `else` được liên kết với `if` gần nhất chưa có `else` phù hợp theo quy tắc cú pháp.

Điều này có thể khiến kết quả khác với ý định của người viết.

Vì vậy, nên sử dụng dấu ngoặc nhọn `{}` để thể hiện rõ ranh giới của từng nhánh, kể cả khi hiện tại nhánh chỉ chứa một câu lệnh.

### 2.5. Kết hợp nhiều điều kiện logic

Các toán tử logic thường được sử dụng trong câu lệnh điều kiện:

| Toán tử | Ý nghĩa |
|---|---|
| `&&` | Logic AND |
| `\|\|` | Logic OR |
| `!` | Logic NOT |

Toán tử `&&` yêu cầu cả hai điều kiện đều đúng.

Toán tử `||` yêu cầu ít nhất một điều kiện đúng.

Toán tử `!` đảo giá trị logic của biểu thức.

#### Short-circuit evaluation

Một đặc điểm rất quan trọng của `&&` và `||` trong C++ là khả năng đánh giá ngắn mạch.

Với `&&`, nếu toán hạng bên trái đã sai, chương trình không cần và sẽ không đánh giá toán hạng bên phải.

Với `||`, nếu toán hạng bên trái đã đúng, toán hạng bên phải sẽ không được đánh giá.

Ví dụ:

```cpp
if (b != 0 && a / b > 2) {
    // Xu ly khi dieu kien thoa man
}
```

Nếu `b` bằng `0`, điều kiện bên trái sai nên phép chia ở bên phải không được thực hiện.

Cơ chế này hữu ích khi một điều kiện phụ thuộc vào điều kiện bảo vệ trước đó.

Tuy nhiên, cần đặt các điều kiện đúng thứ tự. Nếu thực hiện phép chia trước khi kiểm tra mẫu số, short-circuit sẽ không bảo vệ được phép tính.

### 2.6. Những lỗi logic thường gặp với if

**Nhầm `=` với `==`:** `=` là phép gán, còn `==` là phép so sánh bằng nhau. Một phép gán có thể tạo ra giá trị được dùng trong điều kiện, khiến chương trình có hành vi khác mong đợi.

**Viết phép so sánh khoảng theo kiểu toán học:** Biểu thức `0 <= x <= 10` không kiểm tra đoạn `[0, 10]` theo cách nhiều người mới nghĩ. Các phép so sánh được đánh giá theo quy tắc của C++. Cần viết rõ `x >= 0 && x <= 10`.

**Bỏ qua đầu vào đặc biệt:** Khi sử dụng số thực, các giá trị như NaN có thể khiến phép so sánh cho kết quả bất ngờ. Nếu bài toán yêu cầu số hữu hạn, cần kiểm tra cả tính hữu hạn của dữ liệu.

**Quên dấu ngoặc nhọn:** Một `if` không có `{}` chỉ điều khiển một câu lệnh trực tiếp theo sau, không tự động bao gồm các câu lệnh cùng mức thụt lề.

---

## 3. Câu lệnh switch

### 3.1. switch dùng để làm gì?

`switch` là một cấu trúc lựa chọn theo giá trị.

Nó phù hợp khi chương trình cần xử lý những trường hợp rời rạc của cùng một biểu thức, chẳng hạn trạng thái hoặc lựa chọn menu.

Cấu trúc cơ bản:

```cpp
switch (choice) {
    case 1:
        start();
        break;
    case 2:
        openSettings();
        break;
    default:
        handleUnknownChoice();
}
```

Đoạn mã minh họa giả định các hàm `start()`, `openSettings()` và `handleUnknownChoice()` đã được khai báo.

### 3.2. switch hoạt động như thế nào?

Khi thực thi `switch`, chương trình:

1. Đánh giá biểu thức điều khiển.
2. Xác định `case` có giá trị phù hợp.
3. Chuyển quyền điều khiển tới nhãn `case` đó.
4. Tiếp tục thực thi những câu lệnh từ vị trí đã chọn, theo quy tắc luồng điều khiển thông thường.

Nếu không có `case` phù hợp, chương trình chuyển đến `default` nếu nhãn này tồn tại.

Nếu không có `case` phù hợp và không có `default`, phần thân `switch` sẽ không có nhánh nào được chọn để bắt đầu thực thi.

### 3.3. case và default

`case` là một nhãn gắn với giá trị hằng hợp lệ.

Các giá trị `case` trong cùng `switch` phải phân biệt sau những phép chuyển đổi liên quan theo quy tắc ngôn ngữ.

`default` là nhãn được chọn khi không có giá trị `case` phù hợp.

Khác với `else` trong cấu trúc `if-else`, `default` không nhất thiết phải là nhãn cuối cùng về mặt vị trí trong source code.

Tuy nhiên, thông thường nên đặt `default` cuối cấu trúc để dễ đọc và hạn chế nhầm lẫn về fallthrough.

### 3.4. break trong switch

Trong `switch`, `break` kết thúc câu lệnh `switch` gần nhất chứa nó.

Sau `break`, chương trình tiếp tục thực thi tại câu lệnh phía sau toàn bộ cấu trúc `switch`.

Điều này đặc biệt quan trọng vì nhãn `case` **không tự kết thúc một nhánh thực thi**.

Nếu chương trình bắt đầu từ `case 1` và không gặp `break` hoặc một cơ chế chuyển điều khiển khác, nó có thể tiếp tục thực hiện các câu lệnh nằm dưới `case 2`.

### 3.5. Fallthrough là gì?

*Fallthrough* là việc luồng điều khiển tiếp tục đi từ một nhánh `case` sang những câu lệnh ở nhánh tiếp theo.

Ví dụ, nếu chọn `case 1` nhưng không có `break`, chương trình có thể thực hiện cả những câu lệnh của `case 2`.

Đây không nhất thiết là lỗi của ngôn ngữ. Nó là một hành vi hợp lệ và đôi khi được sử dụng có chủ đích.

Tuy nhiên, nếu người viết quên `break`, kết quả có thể khác hoàn toàn với ý định.

C++17 cung cấp thuộc tính:

```cpp
[[fallthrough]];
```

để đánh dấu một trường hợp cố ý cho phép luồng điều khiển tiếp tục sang nhãn `case` hoặc `default` tiếp theo, theo quy tắc áp dụng của thuộc tính này.

Nó không tạo ra cơ chế nhảy mới mà giúp thể hiện ý định và hỗ trợ compiler chẩn đoán những tình huống fallthrough không chủ ý.

### 3.6. Giới hạn của switch

Trong C++17, biểu thức điều khiển của `switch` phải có kiểu phù hợp với cơ chế lựa chọn theo giá trị nguyên hoặc enum.

Không thể trực tiếp sử dụng `std::string` như biểu thức điều khiển `switch` theo cách kiểm tra chuỗi thông thường.

`switch` cũng không được thiết kế để kiểm tra những khoảng giá trị như:

- Điểm từ 8 trở lên.
- Tuổi từ 18 đến 60.
- Nhiệt độ nằm trong một khoảng.

Với những trường hợp này, `if-else` thường phù hợp hơn.

### 3.7. Khi nào chọn if-else, khi nào chọn switch?

| Trường hợp | Cấu trúc phù hợp |
|---|---|
| So sánh một khoảng giá trị | `if-else` |
| Kết hợp nhiều biểu thức logic | `if-else` |
| Kiểm tra một chuỗi văn bản | `if-else` hoặc cấu trúc xử lý khác |
| Phân nhánh theo các giá trị nguyên cố định | `switch` |
| Phân nhánh theo giá trị enum | `switch` |
| Có nhiều điều kiện phụ thuộc nhau | Thường là `if-else` |

Sự lựa chọn còn phụ thuộc vào độ rõ ràng, khả năng mở rộng và cách tổ chức chương trình.

Không nên lựa chọn `switch` chỉ vì cho rằng nó luôn nhanh hơn `if-else`. Hiệu năng thực tế phụ thuộc vào compiler, dữ liệu và cấu trúc nhánh.

---

## 4. Vòng lặp trong C++

### 4.1. Vòng lặp là gì?

Vòng lặp là một cấu trúc điều khiển cho phép thực hiện một câu lệnh hoặc khối lệnh nhiều lần.

Giả sử cần xử lý 1.000 phần tử trong một tập dữ liệu. Thay vì viết 1.000 câu lệnh riêng biệt, có thể dùng một vòng lặp để lần lượt xử lý từng phần tử.

Một vòng lặp thường liên quan đến ba yếu tố:

- **Điều kiện tiếp tục:** Xác định có được thực hiện thêm một lần lặp hay không.
- **Thân vòng lặp:** Những thao tác cần thực hiện.
- **Sự thay đổi trạng thái:** Giúp chương trình tiến tới trạng thái mới hoặc điều kiện kết thúc.

C++ có ba cấu trúc vòng lặp cơ bản:

- `for`.
- `while`.
- `do-while`.

Ngoài ra còn có range-based `for`, được giới thiệu trong C++11.

### 4.2. Vòng lặp for

`for` thường được sử dụng khi quá trình lặp có phần khởi tạo, điều kiện và thao tác cập nhật rõ ràng.

Cú pháp:

```cpp
for (initialization; condition; update) {
    // Than vong lap
}
```

#### Thứ tự thực thi chính xác

Khi gặp vòng lặp `for`, chương trình thực hiện theo trình tự:

1. Thực hiện phần khởi tạo một lần.
2. Đánh giá điều kiện tiếp tục.
3. Nếu điều kiện sai, kết thúc vòng lặp.
4. Nếu điều kiện đúng, thực hiện thân vòng lặp.
5. Khi thân kết thúc bình thường, thực hiện biểu thức cập nhật.
6. Quay lại bước kiểm tra điều kiện.

Ví dụ:

```cpp
for (int i = 1; i <= 3; ++i) {
    std::cout << i << ' ';
}
```

Thứ tự diễn ra như sau:

| Bước | Giá trị i | Hành động |
|---|---|---|
| Khởi tạo | 1 | Tạo biến đếm |
| Kiểm tra | 1 | Điều kiện đúng |
| Thân vòng lặp | 1 | In 1 |
| Cập nhật | 2 | Tăng i |
| Kiểm tra | 2 | Điều kiện đúng |
| Thân vòng lặp | 2 | In 2 |
| Cập nhật | 3 | Tăng i |
| Kiểm tra | 3 | Điều kiện đúng |
| Thân vòng lặp | 3 | In 3 |
| Cập nhật | 4 | Tăng i |
| Kiểm tra | 4 | Điều kiện sai, kết thúc |

Kết quả là `1 2 3`.

#### Phần khởi tạo có chạy lại mỗi lần lặp không?

Không.

Phần khởi tạo chỉ được thực hiện một lần khi bắt đầu câu lệnh `for`.

Biểu thức điều kiện và phần cập nhật mới được sử dụng lặp lại theo trình tự điều khiển.

#### Có bắt buộc phải tăng i không?

Không.

Phần cập nhật có thể giảm biến đếm, tăng theo bước lớn hơn hoặc thực hiện một thao tác phù hợp khác.

Ví dụ, muốn đếm ngược có thể sử dụng `--i`, còn muốn tăng từng hai đơn vị có thể sử dụng `i += 2`.

#### for có thể chạy 0 lần không?

Có.

Nếu điều kiện sai ngay lần kiểm tra đầu tiên, thân vòng lặp không được thực hiện lần nào.

#### Vòng lặp for có thể không có điều kiện không?

Có.

Cú pháp `for (;;)` là một dạng vòng lặp không có điều kiện kết thúc được viết tường minh. Khi không có biểu thức điều kiện, nó được xem như điều kiện luôn đúng.

Vòng lặp chỉ dừng khi có sự kiện chuyển quyền điều khiển phù hợp hoặc chương trình kết thúc theo cơ chế khác.

Một vòng lặp như vậy không tự động là lỗi. Nó có thể được sử dụng trong event loop hoặc những chương trình cần chờ sự kiện, nhưng cần thiết kế cơ chế dừng rõ ràng.

### 4.3. Vòng lặp while

`while` phù hợp khi chương trình tiếp tục thực hiện một công việc miễn là một điều kiện còn đúng.

Cú pháp:

```cpp
while (condition) {
    // Than vong lap
}
```

#### Thứ tự thực thi

1. Đánh giá điều kiện.
2. Nếu sai, bỏ qua thân và kết thúc vòng lặp.
3. Nếu đúng, thực hiện thân.
4. Khi thân kết thúc bình thường, quay lại đánh giá điều kiện.
5. Lặp lại quy trình.

Điểm quan trọng nhất là **điều kiện được kiểm tra trước mỗi lần thực hiện thân vòng lặp**.

Vì vậy, `while` có thể thực hiện thân 0 lần.

#### Khi nào sử dụng while?

`while` phù hợp khi việc lặp phụ thuộc chủ yếu vào trạng thái hoặc điều kiện chưa biết trước số lần xảy ra.

Ví dụ:

- Đọc dữ liệu cho đến khi không còn dữ liệu.
- Tiếp tục xử lý khi một hàng đợi còn phần tử.
- Thực hiện tác vụ khi một điều kiện nghiệp vụ còn đúng.
- Chờ hoặc xử lý sự kiện cho đến khi nhận tín hiệu dừng.

Một vòng lặp `while` không nhất thiết phải có biến đếm. Điều kiện của nó có thể phụ thuộc vào dữ liệu, trạng thái hoặc kết quả thao tác bên trong vòng lặp.

#### Vòng lặp while vô hạn

Vòng lặp có thể không kết thúc nếu điều kiện luôn đúng và không có cơ chế thoát.

Nguyên nhân thường gặp là:

- Biến điều khiển không được cập nhật.
- Giá trị cập nhật không thể khiến điều kiện sai.
- Một nhánh điều kiện liên tục bỏ qua thao tác cập nhật.
- Điều kiện phụ thuộc vào một sự kiện không bao giờ xảy ra.

Tuy nhiên, vòng lặp chạy liên tục có thể là chủ đích trong server, chương trình nhúng hoặc event processing.

Khi đó, cần quản lý tài nguyên, xử lý lỗi và xây dựng cơ chế kết thúc phù hợp.

### 4.4. Vòng lặp do-while

`do-while` có cú pháp:

```cpp
do {
    // Than vong lap
} while (condition);
```

Khác với `while`, `do-while` kiểm tra điều kiện **sau khi thực hiện thân vòng lặp**.

#### Trình tự thực thi

1. Bắt đầu thực hiện thân vòng lặp.
2. Khi thân kết thúc bình thường, đánh giá điều kiện.
3. Nếu điều kiện đúng, quay lại thực hiện thân.
4. Nếu điều kiện sai, kết thúc vòng lặp.

Như vậy, khi quyền điều khiển đi vào `do-while`, thân vòng lặp bắt đầu được thực hiện ít nhất một lần.

Tuy nhiên, điều này không có nghĩa mọi câu lệnh trong thân đều luôn hoàn thành. Những cấu trúc như `break`, `return` hoặc exception có thể làm luồng thực thi rời khỏi thân trước thời điểm thông thường.

#### Khi nào nên sử dụng do-while?

`do-while` phù hợp khi một thao tác cần được thực hiện trước, sau đó mới có đủ thông tin để quyết định có lặp lại hay không.

Ví dụ:

- Hiển thị menu ít nhất một lần.
- Yêu cầu người dùng nhập dữ liệu rồi xác định có cần nhập lại.
- Thực hiện một thao tác và kiểm tra trạng thái kết quả.
- Tiếp tục xử lý cho đến khi xuất hiện điều kiện dừng.

#### Vì sao do-while có dấu chấm phẩy?

Cú pháp `do-while` kết thúc bằng:

```cpp
while (condition);
```

Dấu `;` cuối cùng là một phần bắt buộc của cú pháp câu lệnh `do-while`.

Đây là điểm khác với cách viết thông thường của `for` và `while`.

### 4.5. So sánh for, while và do-while

| Đặc điểm | for | while | do-while |
|---|---|---|---|
| Kiểm tra điều kiện | Trước thân | Trước thân | Sau thân |
| Có thể không thực hiện thân | Có | Có | Không, nếu đã đi vào vòng lặp |
| Phần khởi tạo riêng trong cú pháp | Có | Không | Không |
| Phần cập nhật riêng trong cú pháp | Có | Không | Không |
| Phù hợp với biến đếm | Rất phù hợp | Có thể | Có thể |
| Phù hợp với lặp phụ thuộc trạng thái | Có thể | Phù hợp | Phù hợp |
| Thường gặp | Duyệt dãy, lặp có biến đếm | Đọc dữ liệu, xử lý trạng thái | Menu, thao tác cần chạy trước |

Không có cấu trúc vòng lặp nào tốt nhất cho mọi tình huống.

Nếu số lần lặp được thể hiện rõ bằng biến đếm, `for` thường dễ hiểu.

Nếu việc tiếp tục phụ thuộc chủ yếu vào trạng thái, `while` có thể tự nhiên hơn.

Nếu bắt buộc thực hiện thao tác trước lần kiểm tra đầu tiên, `do-while` thường thể hiện ý định chính xác hơn.

### 4.6. Range-based for

C++11 giới thiệu range-based `for`, tiếp tục được hỗ trợ trong C++17.

Cấu trúc này cho phép duyệt trực tiếp các phần tử của một range phù hợp mà không phải tự viết chỉ số.

Ví dụ:

```cpp
for (const auto& value : values) {
    std::cout << value << '\n';
}
```

Cách viết này hữu ích khi chương trình chỉ cần xử lý lần lượt các phần tử.

Tuy nhiên, cần chú ý cách khai báo biến nhận phần tử:

- `auto value`: Nhận giá trị của phần tử vào biến riêng.
- `auto& value`: Tham chiếu đến phần tử, có thể cho phép thay đổi trực tiếp.
- `const auto& value`: Tham chiếu để đọc mà không sửa qua tham chiếu đó.

Range-based `for` không tự động tránh được mọi lỗi lifetime. Khi làm việc với view, temporary hoặc container bị thay đổi trong lúc duyệt, vẫn phải tuân theo quy tắc tồn tại của đối tượng và tính hợp lệ của iterator.

---

## 5. Điều khiển luồng thực thi với break và continue

`break` và `continue` là hai **câu lệnh điều khiển**, không phải hàm.

Chúng thay đổi cách chương trình tiếp tục thực thi khi gặp trong vòng lặp hoặc cấu trúc thích hợp.

Đây là hai câu lệnh dễ bị hiểu sai nếu chỉ ghi nhớ định nghĩa ngắn.

Điều cần nắm là chương trình **rời khỏi cấu trúc nào, bỏ qua những câu lệnh nào và sẽ thực hiện bước nào tiếp theo**.

### 5.1. break hoạt động như thế nào?

`break` làm chương trình kết thúc câu lệnh lặp hoặc `switch` gần nhất đang bao quanh nó.

Khi gặp `break`, chương trình không tiếp tục thực hiện những câu lệnh còn lại trong cấu trúc đó.

Thay vào đó, nó chuyển quyền điều khiển đến vị trí phía sau toàn bộ vòng lặp hoặc `switch` vừa bị kết thúc.

#### break trong vòng lặp for

Giả sử vòng lặp đang duyệt các giá trị từ 1 đến 10.

Nếu chương trình gặp `break` tại giá trị 5, vòng lặp kết thúc ngay lúc đó.

Điều này có nghĩa:

- Những câu lệnh sau `break` trong thân vòng lặp không được thực hiện.
- Phần cập nhật của vòng lặp `for` không được chạy thêm cho lần lặp đó.
- Điều kiện tiếp tục của vòng lặp không được kiểm tra lại.
- Các lần lặp với giá trị tiếp theo không xảy ra.
- Chương trình tiếp tục ở câu lệnh sau vòng lặp.

Vì vậy, không nên hiểu `break` là bỏ qua một phần tử. Nó chấm dứt toàn bộ vòng lặp liên quan.

#### break trong while

Khi `break` được thực hiện trong `while`, chương trình rời khỏi vòng lặp ngay lập tức.

Nó không quay lại đánh giá điều kiện `while` thêm một lần.

Điều này cho phép dừng vòng lặp ngay cả khi biểu thức điều kiện vẫn đang đúng.

Ví dụ, một vòng lặp xử lý dữ liệu có thể dừng khi phát hiện lỗi không thể phục hồi, thay vì tiếp tục các lần xử lý còn lại.

#### break trong do-while

Trong `do-while`, `break` cũng làm chương trình rời khỏi vòng lặp ngay.

Điều kiện đặt sau `while` không được đánh giá khi rời vòng lặp bằng `break`.

#### break có kết thúc hàm không?

Không.

`break` kết thúc vòng lặp hoặc `switch` gần nhất tương ứng, không mặc định kết thúc hàm đang chứa nó.

Nếu còn các câu lệnh phía sau vòng lặp trong cùng hàm, chương trình tiếp tục thực hiện các câu lệnh đó.

Để kết thúc một lời gọi hàm thông thường, sử dụng `return` khi phù hợp.

### 5.2. continue hoạt động như thế nào?

`continue` không kết thúc toàn bộ vòng lặp.

Thay vào đó, nó bỏ qua phần còn lại của thân vòng lặp hiện tại và chuyển quyền điều khiển tới bước tiếp tục tương ứng của vòng lặp gần nhất bao quanh nó.

Cách chương trình tiếp tục phụ thuộc vào loại vòng lặp.

Đây là điểm cần phân biệt kỹ.

### 5.3. continue trong for

Với `for`, khi gặp `continue`:

1. Những câu lệnh còn lại trong thân vòng lặp hiện tại bị bỏ qua.
2. Chương trình chuyển đến phần cập nhật của `for`.
3. Sau khi cập nhật, điều kiện lặp được đánh giá lại.
4. Nếu điều kiện đúng, bắt đầu lần lặp tiếp theo.
5. Nếu điều kiện sai, vòng lặp kết thúc.

Ví dụ, một vòng lặp tăng biến `i` từ 1 đến 10 và sử dụng `continue` khi `i` là số chẵn.

Khi `i = 2`, những câu lệnh xử lý nằm sau `continue` bị bỏ qua.

Tuy nhiên, phần cập nhật `++i` của `for` vẫn diễn ra, làm `i` tăng thành 3.

Sau đó, điều kiện lặp được kiểm tra lại.

Vì vậy, vòng lặp có thể tiếp tục với `i = 3`.

**Điểm cần nhớ:** `continue` trong `for` không bỏ qua biểu thức cập nhật của vòng lặp.

Đây là khác biệt quan trọng so với cách nhiều người mới hình dung.

### 5.4. continue trong while

Với `while`, khi gặp `continue`, chương trình:

1. Bỏ qua những câu lệnh còn lại trong thân vòng lặp.
2. Quay lại đánh giá điều kiện `while`.
3. Nếu điều kiện đúng, thực hiện lần lặp tiếp theo.
4. Nếu điều kiện sai, kết thúc vòng lặp.

Khác với `for`, cú pháp `while` không có phần cập nhật riêng.

Nếu chương trình đặt thao tác cập nhật ở cuối thân vòng lặp, `continue` có thể khiến thao tác đó bị bỏ qua.

Xét ví dụ:

```cpp
int i{0};

while (i < 5) {
    if (i == 2) continue;
    ++i;
}
```

Quá trình thực thi:

- Ban đầu `i = 0`, chương trình tăng lên 1.
- `i = 1`, chương trình tăng lên 2.
- `i = 2`, điều kiện trong `if` đúng.
- `continue` được thực hiện.
- Câu lệnh `++i` bị bỏ qua.
- Chương trình quay lại kiểm tra `i < 5`.
- Vì `i` vẫn bằng 2, điều kiện tiếp tục đúng.
- Vòng lặp lại gặp `continue`.

Nếu không có tác động nào khác, vòng lặp mắc kẹt tại `i = 2`.

Đây là ví dụ điển hình cho lỗi vòng lặp vô hạn do đặt `continue` trước thao tác cập nhật quan trọng.

Để tránh lỗi, cần bảo đảm trạng thái liên quan đến điều kiện lặp được cập nhật trên mọi đường thực thi cần thiết, hoặc tổ chức lại vòng lặp bằng cấu trúc phù hợp hơn.

### 5.5. continue trong do-while

Với `do-while`, `continue` không quay thẳng về đầu thân vòng lặp.

Thay vào đó:

1. Bỏ qua phần còn lại của thân.
2. Chuyển đến bước đánh giá điều kiện `while` ở cuối.
3. Nếu điều kiện đúng, quay lại thân vòng lặp.
4. Nếu điều kiện sai, kết thúc.

Điều này khác với cách hoạt động trong `for`, nơi biểu thức cập nhật được thực hiện trước khi kiểm tra điều kiện.

Vì vậy, khi sử dụng `continue`, phải xét loại vòng lặp cụ thể thay vì áp dụng một quy tắc đơn giản rằng chương trình luôn quay ngay về đầu vòng lặp.

### 5.6. So sánh chi tiết break và continue

| Đặc điểm | break | continue |
|---|---|---|
| Kết thúc toàn bộ vòng lặp gần nhất | Có | Không |
| Bỏ qua phần còn lại của thân hiện tại | Có | Có |
| Chạy phần cập nhật của `for` | Không | Có |
| Kiểm tra lại điều kiện `while` | Không | Có |
| Kiểm tra điều kiện cuối của `do-while` | Không | Có |
| Sử dụng trong `switch` | Có | Chỉ khi nằm trong một vòng lặp bao quanh |
| Mặc định kết thúc hàm | Không | Không |

Một cách ghi nhớ chính xác hơn là:

- `break` chuyển quyền điều khiển **ra ngoài** vòng lặp hoặc `switch` gần nhất.
- `continue` chuyển quyền điều khiển tới **bước tiếp tục** của vòng lặp gần nhất.

### 5.7. Ví dụ phân tích cả break và continue

Xét đoạn mã:

```cpp
for (int i = 1; i <= 6; ++i) {
    if (i == 2) continue;
    if (i == 5) break;
    std::cout << i << ' ';
}
```

Quá trình thực thi:

| Giá trị i | Điều gì xảy ra? | Có in không? |
|---|---|---|
| 1 | Không gặp điều kiện đặc biệt | In 1 |
| 2 | Gặp `continue`, chuyển đến `++i` | Không |
| 3 | Thực hiện bình thường | In 3 |
| 4 | Thực hiện bình thường | In 4 |
| 5 | Gặp `break`, kết thúc vòng lặp | Không |
| 6 | Không được xử lý vì vòng lặp đã kết thúc | Không |

Kết quả:

`1 3 4`

Điểm khác biệt:

Ở `i = 2`, `continue` không chấm dứt vòng lặp, nên chương trình còn xử lý các giá trị 3 và 4.

Ở `i = 5`, `break` chấm dứt toàn bộ vòng lặp, nên giá trị 6 không còn được xét.

### 5.8. break trong vòng lặp lồng nhau

Giả sử chương trình có hai vòng lặp:

- Vòng ngoài duyệt từng hàng.
- Vòng trong duyệt từng cột.

Nếu `break` xuất hiện trong thân vòng lặp bên trong, nó chỉ kết thúc vòng lặp bên trong gần nhất.

Vòng ngoài không tự động kết thúc.

Sau khi vòng trong kết thúc, chương trình tiếp tục tại câu lệnh tiếp theo của vòng ngoài.

Điều này đặc biệt quan trọng khi xử lý ma trận hoặc tìm kiếm trong bảng hai chiều.

Nếu cần kết thúc cả hai vòng, có thể phải thiết kế thêm cơ chế như:

- Sử dụng một biến trạng thái.
- Đưa thao tác tìm kiếm vào hàm riêng và dùng `return`.
- Tổ chức lại vòng lặp để điều kiện dừng được kiểm soát từ bên ngoài.

Không nên giả định một lệnh `break` sẽ thoát khỏi toàn bộ những vòng lặp đang lồng nhau.

### 5.9. continue trong vòng lặp lồng nhau

Tương tự, `continue` áp dụng cho vòng lặp gần nhất đang bao quanh câu lệnh.

Nếu `continue` nằm trong vòng lặp cột, nó bỏ qua phần còn lại của lần duyệt cột hiện tại, sau đó chuyển đến bước tiếp tục của vòng cột.

Nó không tự động chuyển sang hàng tiếp theo.

Muốn bỏ qua toàn bộ phần còn lại của một hàng, cần điều khiển rõ vòng lặp cột và vòng lặp hàng theo thiết kế của thuật toán.

### 5.10. break và continue khi switch nằm trong vòng lặp

Đây là một trường hợp rất dễ nhầm.

Giả sử bên trong một vòng lặp có câu lệnh `switch`.

Nếu thực hiện `break` trong một nhánh `case`, chương trình chỉ thoát khỏi `switch` gần nhất.

Vòng lặp bao quanh vẫn tiếp tục theo luồng điều khiển bình thường.

Ngược lại, `continue` không dùng để chuyển từ `case` này sang `case` khác.

Nếu `switch` đang nằm trong một vòng lặp, một câu lệnh `continue` bên trong `switch` sẽ tác động đến vòng lặp gần nhất bao quanh, thay vì chỉ kết thúc nhánh `case`.

Nếu `switch` không nằm trong vòng lặp, `continue` không hợp lệ ở đó.

Đây là lý do cần phân biệt **cấu trúc lựa chọn** và **cấu trúc lặp** khi sử dụng các câu lệnh điều khiển.

### 5.11. Phân biệt break, continue và return

Cả ba câu lệnh đều có thể khiến những câu lệnh kế tiếp không được thực hiện, nhưng phạm vi tác động khác nhau.

| Câu lệnh | Tác động |
|---|---|
| `break` | Kết thúc vòng lặp hoặc `switch` gần nhất |
| `continue` | Chuyển đến bước tiếp tục của vòng lặp gần nhất |
| `return` | Kết thúc lời gọi hàm hiện tại theo quy tắc tương ứng |

Ví dụ, khi một hàm có vòng lặp:

- `break` có thể làm chương trình rời vòng lặp rồi chạy phần còn lại của hàm.
- `continue` giữ chương trình trong cơ chế lặp, nhưng bỏ qua một phần thân hiện tại.
- `return` làm hàm kết thúc, nên vòng lặp bên trong cũng không tiếp tục.

Trong thực tế, nên lựa chọn câu lệnh dựa trên phạm vi cần thay đổi luồng điều khiển, không chỉ dựa trên việc muốn bỏ qua vài dòng mã.

---

## 6. Những vấn đề thường gặp khi sử dụng điều kiện và vòng lặp

### 6.1. Vòng lặp vô hạn ngoài ý muốn

Một vòng lặp có thể không kết thúc nếu điều kiện tiếp tục luôn đúng.

Nguyên nhân có thể là biến điều khiển không thay đổi, phép cập nhật không đạt được giá trị dừng hoặc một nhánh `continue` liên tục bỏ qua thao tác cập nhật.

Khi phân tích vòng lặp, cần hiểu điều gì khiến trạng thái tiến triển và khi nào điều kiện có thể trở thành sai.

Không phải mọi vòng lặp vô hạn đều sai, nhưng vòng lặp vô hạn ngoài ý muốn thường gây treo chương trình hoặc tiêu tốn tài nguyên không cần thiết.

### 6.2. Off-by-one error

*Off-by-one error* là lỗi lệch một đơn vị, thường xảy ra trong điều kiện biên của vòng lặp.

Ví dụ, nếu muốn duyệt một tập hợp có `n` phần tử với chỉ số bắt đầu từ 0, phạm vi chỉ số thông thường là:

\[
0 \le i < n
\]

Sử dụng điều kiện `i <= n` sẽ khiến chương trình có thêm một lần lặp tại `i = n`.

Nếu dùng chỉ số đó để truy cập mảng có đúng `n` phần tử, thao tác có thể vượt giới hạn.

Ngược lại, sử dụng điều kiện kết thúc quá sớm có thể khiến phần tử cuối không được xử lý.

Điều quan trọng là xác định rõ **giới hạn được bao gồm và giới hạn không được bao gồm**.

### 6.3. Không kiểm tra đầu vào

Một vòng lặp đọc dữ liệu có thể thất bại khi:

- Đầu vào không đúng định dạng.
- Đã đến cuối dữ liệu.
- Giá trị nằm ngoài phạm vi kiểu.
- Luồng gặp lỗi.

Nếu không kiểm tra trạng thái nhập, chương trình có thể xử lý dữ liệu sai hoặc mắc kẹt trong cơ chế yêu cầu nhập lại.

Cần phân biệt lỗi có thể phục hồi với việc đầu vào đã kết thúc.

### 6.4. Nhầm điều kiện dừng với điều kiện tiếp tục

Trong `for`, `while` và `do-while`, điều kiện được viết trong cú pháp là **điều kiện tiếp tục**.

Vòng lặp thông thường tiếp tục khi điều kiện đúng và dừng khi điều kiện sai.

Ví dụ, `while (count > 0)` có nghĩa là tiếp tục lặp khi `count` còn lớn hơn 0.

Nó không có nghĩa là chỉ thoát khi điều kiện `count > 0` trở thành đúng.

Nhầm lẫn này dễ xảy ra khi tên biến là `finished`, `stopped` hoặc `isComplete`.

Nên đặt tên và viết biểu thức sao cho người đọc hiểu trực tiếp điều kiện tiếp tục của vòng lặp.

### 6.5. Hiểu sai thứ tự thực thi

Trong `for`, phần khởi tạo không chạy lại mỗi lần lặp.

Trong `while`, điều kiện được kiểm tra trước thân.

Trong `do-while`, thân được thực hiện trước khi điều kiện được đánh giá.

`continue` trong `for` vẫn đưa luồng thực thi đến biểu thức cập nhật, nhưng `continue` trong `while` có thể bỏ qua phần cập nhật đặt trong thân.

Hiểu sai những thứ tự này có thể dẫn đến các lỗi khó phát hiện, đặc biệt khi vòng lặp chứa nhiều nhánh điều kiện.

### 6.6. Thiếu dấu ngoặc nhọn

Trong C++, nhiều cấu trúc điều khiển có thể đi kèm một câu lệnh đơn mà không cần dấu ngoặc nhọn.

Tuy nhiên, thụt lề không quyết định phạm vi điều khiển của `if` hoặc vòng lặp.

Nếu không có `{}`, chỉ một câu lệnh trực tiếp theo sau thuộc phần thân điều khiển tương ứng.

Việc thêm câu lệnh mới mà không bổ sung dấu ngoặc nhọn có thể khiến chương trình thực hiện thao tác ngoài ý muốn.

Do đó, nên dùng dấu ngoặc nhọn để thể hiện rõ các khối điều khiển.

### 6.7. Dùng break hoặc continue quá nhiều

Hai câu lệnh này có vai trò hợp lệ và hữu ích.

Tuy nhiên, nếu một vòng lặp chứa nhiều `break`, `continue` và những nhánh điều kiện lồng nhau, luồng thực thi có thể trở nên khó theo dõi.

Trong những trường hợp đó, nên xem xét:

- Đơn giản hóa điều kiện.
- Tách phần xử lý thành hàm có trách nhiệm rõ ràng.
- Sử dụng early return khi phù hợp.
- Tổ chức lại vòng lặp để điều kiện tiếp tục dễ hiểu hơn.

Không cần tránh hoàn toàn `break` và `continue`. Mục tiêu là làm rõ khi nào vòng lặp tiếp tục và khi nào nó kết thúc.

---

## 7. Tổng hợp và định hướng sử dụng

Ba nhóm kiến thức trong bài phối hợp với nhau để tạo nên luồng xử lý cơ bản của phần lớn chương trình.

**Nhập xuất** giúp chương trình nhận và cung cấp thông tin. Khi làm việc với dữ liệu bên ngoài, cần kiểm tra trạng thái đọc và tính hợp lệ của dữ liệu.

**Câu lệnh điều kiện** giúp lựa chọn những nhánh xử lý. Điều quan trọng là hiểu thứ tự đánh giá, điều kiện nào được chọn và những nhánh nào bị bỏ qua.

**Vòng lặp** giúp thực hiện lại công việc. Cần hiểu thời điểm đánh giá điều kiện, cách cập nhật trạng thái và sự khác nhau giữa ba cấu trúc lặp cơ bản.

**break và continue** giúp thay đổi luồng điều khiển bên trong các cấu trúc thích hợp. Chúng không thay thế cho việc thiết kế điều kiện dừng hợp lý.

Bảng tra cứu ngắn:

| Thành phần | Vai trò chính |
|---|---|
| `std::cin` | Nhập dữ liệu từ luồng chuẩn |
| `std::cout` | Xuất dữ liệu |
| `std::cerr` | Xuất thông báo lỗi |
| `std::getline()` | Đọc một dòng văn bản |
| `if` | Chỉ thực hiện nhánh nếu điều kiện đúng |
| `else if` | Xét điều kiện tiếp theo khi nhánh trước không được chọn |
| `else` | Xử lý trường hợp còn lại |
| `switch` | Lựa chọn theo các giá trị rời rạc phù hợp |
| `for` | Lặp với các phần khởi tạo, điều kiện và cập nhật rõ ràng |
| `while` | Kiểm tra điều kiện trước thân vòng lặp |
| `do-while` | Kiểm tra điều kiện sau thân vòng lặp |
| `break` | Rời khỏi vòng lặp hoặc `switch` gần nhất |
| `continue` | Chuyển tới bước tiếp tục của vòng lặp gần nhất |
| `return` | Kết thúc lời gọi hàm |

**Điểm cốt lõi:** Hiểu cú pháp giúp bạn viết được chương trình, nhưng hiểu luồng thực thi mới giúp bạn giải thích vì sao chương trình cho ra một kết quả cụ thể và tìm được nguyên nhân khi kết quả không đúng.

---

## Đọc tiếp

- [Toán tử và biểu thức](/cpp/bat-dau/toan-tu): Tìm hiểu phép so sánh, toán tử logic và các quy tắc đánh giá biểu thức.
- [Hàm, tham số và phạm vi biến](/cpp/bat-dau/ham-pham-vi): Hiểu cách tổ chức mã nguồn thành hàm và sử dụng `return`.
- [Giải quyết bài toán bằng thuật toán](/cpp/thuat-toan/giai-quyet-bai-toan): Tìm hiểu cách xây dựng các bước xử lý và phân tích độ phức tạp.
