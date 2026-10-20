---
title: Cross-platform development và security
description: Viết C++ portable, xử lý input không tin cậy và giảm rủi ro từ memory, filesystem, process.
slug: /cpp/ky-thuat/security-cross-platform
category: engineering
categoryLabel: Kỹ nghệ phần mềm C++
order: 24090
difficulty: advanced
keywords: [cross-platform C++, portability, secure coding, input validation, filesystem, process]
updated: 2026-10-20
collection: cpp
collectionLabel: C++
collectionDescription: Cách xây dựng, kiểm tra, debug và bảo vệ ứng dụng C++ có thể bảo trì.
related: ["/cpp/trung-cap/file-io-errors", "/cpp/ky-thuat/ub-memory-safety", "/cpp/ky-thuat/cmake"]
---

Cross-platform code tách yêu cầu sản phẩm khỏi giả định của một OS/compiler. Security bắt đầu ở mọi boundary nhận dữ liệu từ file, network, environment hoặc user.

## Portability

- Dùng standard library khi đáp ứng yêu cầu; cô lập API OS-specific sau interface nhỏ.
- Dùng CMake targets thay vì hardcode compiler, include path hoặc thư mục cài đặt.
- Không giả định `int`, endian, path separator hoặc encoding có cùng biểu diễn trên mọi nền tảng.
- Dùng `std::filesystem::path` cho path, nhưng kiểm tra quyền và root sau khi resolve.
- Đặt C++ standard rõ ràng và build trên các toolchain thực sự hỗ trợ dự án.

## Security boundary

- Validate độ dài, range, encoding và format trước khi cấp phát hoặc dùng index.
- Dùng `std::string`/container có kích thước thay vì buffer C không giới hạn.
- Không nối input vào shell command hoặc SQL; dùng API tham số hóa.
- Kiểm soát path traversal, symlink và quyền file khi đọc/ghi dữ liệu user.
- Dùng cryptographic random từ thư viện/OS phù hợp; `rand()` không dành cho secrets.
- Giới hạn tài nguyên để input độc hại không gây allocation hoặc recursion vô hạn.

## Lỗi thường gặp

- Tắt warning hoặc sanitizer để build “xanh”.
- Tin dữ liệu file/database đã hợp lệ vì do ứng dụng tạo.
- Dùng đường dẫn tương đối phụ thuộc working directory ngoài ý muốn.
- Dùng shell với chuỗi chứa dữ liệu không tin cậy.

## Tự luyện

Thiết kế hàm nhận filename từ user. Xác định thư mục gốc cho phép, xử lý path tuyệt đối/`..`/symlink và quyền ghi trước khi mở file.

## Đọc tiếp

Ôn [file I/O](/cpp/trung-cap/file-io-errors), [memory safety](/cpp/ky-thuat/ub-memory-safety) và [CMake](/cpp/ky-thuat/cmake).
