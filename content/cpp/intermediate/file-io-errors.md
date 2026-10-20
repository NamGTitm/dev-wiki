---
title: File I/O và xử lý lỗi
description: Đọc ghi file văn bản bằng streams, phát hiện lỗi mở file và xử lý dữ liệu đầu vào.
slug: /cpp/trung-cap/file-io-errors
category: intermediate
categoryLabel: C++ trung cấp
order: 21070
difficulty: intermediate
keywords: [fstream, ifstream, ofstream, file I/O, exception, error handling]
updated: 2026-10-20
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/bat-dau/nhap-xuat-dieu-kien-vong-lap", "/cpp/ky-thuat/exceptions", "/cpp/ky-thuat/security-cross-platform"]
---

File stream đọc hoặc ghi dữ liệu qua file. Luôn kiểm tra trạng thái mở và trạng thái đọc/ghi; đường dẫn có thể sai, file có thể thiếu quyền hoặc nội dung có thể không hợp lệ.

## Ghi rồi đọc file

```cpp
#include <fstream>
#include <iostream>
#include <string>

int main() {
    const std::string path{"result.txt"};
    {
        std::ofstream output{path};
        if (!output) return 1;
        output << "C++17\n";
        if (!output) return 1;
    }

    std::ifstream input{path};
    if (!input) return 1;
    std::string line;
    if (!std::getline(input, line)) return 1;
    std::cout << line << '\n';
}
```

`std::ofstream` mặc định tạo mới hoặc truncate file; đừng dùng khi cần giữ nội dung cũ. Truyền `std::ios::app` để nối thêm. `std::ifstream` đọc, `std::fstream` hỗ trợ cả hai.

## Báo lỗi phù hợp

Với ứng dụng, trả lỗi có ngữ cảnh hoặc ném exception theo hợp đồng API. Không chỉ trả `false` chung nếu caller cần biết file nào thất bại. Tránh in thông tin bí mật trong thông báo. Bài [exceptions](/cpp/ky-thuat/exceptions) phân tích cách chọn cơ chế báo lỗi.

## Lỗi thường gặp

- Ghi đè file do quên mode `app`.
- Cố đọc file nhưng không kiểm tra `is_open()`/trạng thái stream.
- Dùng `while (!input.eof())`; nên đọc theo kết quả của thao tác, ví dụ `while (input >> value)`.
- Tin rằng tên file đến từ user là an toàn; kiểm tra quyền, thư mục gốc và path traversal.

## Tự luyện

Đọc danh sách số nguyên từ file, tính tổng và báo rõ nếu token không phải số. Kiểm tra file rỗng, file không tồn tại và dữ liệu lỗi ở giữa.

## Đọc tiếp

Học [exceptions và error handling](/cpp/ky-thuat/exceptions) cùng [security khi xử lý file](/cpp/ky-thuat/security-cross-platform).
