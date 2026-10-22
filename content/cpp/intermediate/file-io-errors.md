---
title: File I/O và xử lý lỗi
description: Đọc ghi file văn bản bằng streams và phân biệt lỗi mở, lỗi dữ liệu với kết thúc file.
slug: /cpp/trung-cap/file-io-errors
category: intermediate
categoryLabel: C++ trung cấp
order: 21070
difficulty: intermediate
keywords: [fstream, ifstream, ofstream, file I/O, exception, error handling]
updated: 2026-10-22
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/bat-dau/nhap-xuat-dieu-kien-vong-lap", "/cpp/ky-thuat/exceptions", "/cpp/ky-thuat/security-cross-platform"]
---

File stream đọc hoặc ghi file thông qua các thao tác tương tự stream nhập xuất khác. `std::ifstream` thường dùng để đọc, `std::ofstream` để ghi, còn `std::fstream` có thể làm cả hai. Kiểm tra kết quả mở file, từng thao tác quan trọng và dữ liệu đọc được; tên file đúng cú pháp vẫn có thể không tồn tại hoặc không có quyền truy cập.

## Ghi file rồi đọc dữ liệu

```cpp
#include <fstream>
#include <iostream>
#include <limits>

int main() {
    const char* path = "numbers.txt";

    {
        std::ofstream output{path, std::ios::out | std::ios::trunc};
        if (!output) {
            std::cerr << "Cannot open output file\n";
            return 1;
        }

        output << "10\n20\n30\n";
        if (!output) {
            std::cerr << "Write failed\n";
            return 1;
        }

        output.close();
        if (!output) {
            std::cerr << "Closing output file failed\n";
            return 1;
        }
    }

    std::ifstream input{path};
    if (!input) {
        std::cerr << "Cannot open input file\n";
        return 1;
    }

    long long sum{};
    long long value{};
    while (input >> value) {
        if ((value > 0 && sum > std::numeric_limits<long long>::max() - value) ||
            (value < 0 && sum < std::numeric_limits<long long>::min() - value)) {
            std::cerr << "Sum is out of range\n";
            return 1;
        }
        sum += value;
    }

    if (input.bad()) {
        std::cerr << "Read failed\n";
        return 1;
    }
    if (!input.eof()) {
        std::cerr << "Input contains an invalid or out-of-range integer token\n";
        return 1;
    }

    std::cout << sum << '\n';
}
```

`std::ofstream` mặc định mở theo chế độ ghi và truncate file cũ. Đoạn trên nêu rõ `std::ios::trunc` để thể hiện việc thay nội dung. Dùng `std::ios::app` nếu muốn ghi nối ở cuối; không chọn mode theo thói quen mà hãy quyết định rõ có cần giữ dữ liệu cũ không.

Sau khi ghi, kiểm tra stream để phát hiện lỗi ghi. `close()` có thể phát hiện lỗi chỉ lộ ra lúc flush/đóng, nên ví dụ cũng kiểm tra trạng thái sau khi đóng. Scope riêng đóng file trước khi mở đọc; destructor của stream vẫn tự đóng khi scope kết thúc.

## Đọc theo thao tác, không theo `eof()`

Vòng `while (input >> value)` chỉ vào thân vòng khi phép trích xuất thực sự đọc được một số. Nếu file có token lỗi như `12 abc 34`, vòng dừng ở `abc`; kiểm tra `!input.eof()` giúp phân biệt lỗi định dạng với kết thúc file bình thường. `bad()` cho biết lỗi I/O nghiêm trọng, chẳng hạn thiết bị đọc thất bại. File rỗng ở ví dụ trên được xem là danh sách không có số và có tổng bằng 0; nếu nghiệp vụ yêu cầu ít nhất một số thì cần kiểm tra thêm số phần tử đã đọc.

Với văn bản theo dòng, dùng `std::getline(input, line)` và xử lý kết quả của từng lần gọi. Một dòng cuối không có ký tự newline vẫn có thể đọc thành công; không nên suy luận dữ liệu hợp lệ chỉ từ việc file có dấu xuống dòng cuối hay không.

## Chế độ mở và dữ liệu văn bản

Các mode thường dùng gồm `std::ios::in` để đọc, `std::ios::out` để ghi, `std::ios::app` để nối cuối file, `std::ios::trunc` để xóa nội dung cũ khi mở ghi và `std::ios::binary` để tránh xử lý chuyển đổi text mode của nền tảng. Có thể kết hợp các cờ bằng toán tử `|`.

Text stream xử lý ký tự theo quy tắc thư viện và nền tảng; `std::string` không tự xác định encoding cho nội dung. Nếu cần trao đổi file giữa hệ thống, hãy quy định encoding, dấu phân cách, cách biểu diễn số và xử lý newline. Với dữ liệu nhị phân, không nên ghi trực tiếp object tùy ý vì padding, endian, layout và phiên bản kiểu có thể khác nhau; hãy định nghĩa định dạng nhị phân rõ ràng.

## Báo lỗi và đường dẫn

Ứng dụng có thể trả mã lỗi, trả một kiểu kết quả giàu thông tin hoặc ném exception theo hợp đồng API. Thông báo nên đủ ngữ cảnh để người gọi xác định thao tác nào thất bại, nhưng không nên tiết lộ nội dung nhạy cảm. Với thư viện, tránh in lỗi trực tiếp ra `std::cerr`; hãy trả thông tin lỗi để caller quyết định cách hiển thị.

Nếu đường dẫn đến từ input không đáng tin cậy, giới hạn truy cập trong thư mục được phép sau khi phân giải đường dẫn và liên kết tượng trưng phù hợp với nền tảng. So sánh chuỗi prefix đơn giản không đủ để ngăn path traversal. Kiểm tra quyền ở ứng dụng cũng không thay thế quyền của hệ điều hành. Xem thêm [security khi xử lý file](/cpp/ky-thuat/security-cross-platform).

## Lỗi thường gặp

- Mở bằng `ofstream` nhưng quên rằng mode mặc định sẽ truncate file cũ.
- Chỉ kiểm tra mở file mà không kiểm tra thao tác đọc, ghi hoặc flush/close.
- Dùng `while (!input.eof())`, khiến thân vòng chạy với dữ liệu chưa đọc hợp lệ.
- Bỏ qua lỗi định dạng ở giữa file và tiếp tục dùng dữ liệu thiếu.
- Tin rằng tên file từ người dùng an toàn hoặc chỉ dùng string prefix để giới hạn thư mục.
- Ghi raw bytes của struct rồi giả định file tương thích giữa compiler, kiến trúc và phiên bản chương trình.

## Đọc tiếp

Ôn [nhập xuất và điều kiện vòng lặp](/cpp/bat-dau/nhap-xuat-dieu-kien-vong-lap), tìm hiểu [exceptions và error handling](/cpp/ky-thuat/exceptions), cùng [security khi xử lý file](/cpp/ky-thuat/security-cross-platform).
