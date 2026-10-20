---
title: Error handling và exceptions
description: Chọn giữa exception, error value và validation tường minh theo ranh giới API.
slug: /cpp/ky-thuat/exceptions
category: engineering
categoryLabel: Kỹ nghệ phần mềm C++
order: 24050
difficulty: advanced
keywords: [C++ exceptions, error handling, std::exception, throw, noexcept, expected]
updated: 2026-10-20
collection: cpp
collectionLabel: C++
collectionDescription: Cách xây dựng, kiểm tra, debug và bảo vệ ứng dụng C++ có thể bảo trì.
related: ["/cpp/trung-cap/file-io-errors", "/cpp/ky-thuat/ub-memory-safety", "/cpp/ky-thuat/unit-testing"]
---

Error handling là hợp đồng giữa nơi phát hiện lỗi và nơi có thể xử lý. Dùng exception cho lỗi khiến thao tác không thể hoàn thành bình thường; dùng error value/result khi caller thường xuyên cần xử lý kết quả thất bại theo luồng dữ liệu.

## Ném và bắt exception

```cpp
#include <iostream>
#include <stdexcept>

int divide(int numerator, int denominator) {
    if (denominator == 0) throw std::invalid_argument("denominator must not be zero");
    return numerator / denominator;
}

int main() {
    try {
        std::cout << divide(10, 2) << '\n';
    } catch (const std::exception& error) {
        std::cerr << error.what() << '\n';
        return 1;
    }
}
```

Bắt theo `const&` để tránh copy; bắt exception gần boundary có thể log/báo lỗi và chuyển trạng thái. RAII cleanup vẫn chạy khi stack unwinds. Đừng catch mọi thứ rồi tiếp tục trong trạng thái không hợp lệ.

## Chọn cơ chế

- **Exception**: constructor không thể tạo object hợp lệ, file/network operation thất bại, invariant bị vi phạm theo API.
- **Error value**: kết quả thất bại là tình huống thường xuyên và caller cần quyết định ngay.
- **C++23 `std::expected`**: biểu diễn value hoặc error trong type; hỗ trợ phụ thuộc standard library.

`noexcept` là cam kết không thoát exception; nếu exception thoát khỏi hàm `noexcept`, chương trình gọi `std::terminate`. Chỉ đánh dấu khi contract và thao tác bên trong đáp ứng.

## Lỗi thường gặp

- Bắt exception quá sớm rồi bỏ mất ngữ cảnh.
- Ném pointer hoặc kiểu không mô tả lỗi; ưu tiên exception type phù hợp.
- Dùng exception cho mọi nhánh bình thường trong hot path mà không có lý do.
- Báo lỗi nhưng để caller tiếp tục với object nửa hợp lệ.

## Tự luyện

Thiết kế API đọc file: xác định trường hợp không có file là error value hay exception theo ứng dụng. Ghi rõ caller cần nhận thông tin gì để khôi phục.

## Đọc tiếp

Xem [file I/O](/cpp/trung-cap/file-io-errors), [unit testing](/cpp/ky-thuat/unit-testing) và [RAII](/cpp/stl/raii-smart-pointers).
