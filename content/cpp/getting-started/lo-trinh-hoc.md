---
title: Lộ trình học C++
description: Chọn lộ trình C++ theo mục tiêu: nền tảng, thi lập trình hoặc phát triển phần mềm; hiểu cách chuyển giữa các hướng.
slug: /cpp/bat-dau/lo-trinh-hoc
category: fundamentals
categoryLabel: C++ căn bản
order: 20000
difficulty: beginner
badges: [Quan trọng]
keywords: [lộ trình C++, học C++, người mới, lập trình thi đấu, kỹ nghệ phần mềm]
updated: 2026-10-22
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/bat-dau/cpp-la-gi", "/cpp/bat-dau/chuong-trinh-dau-tien"]
---

Lộ trình nên theo mục tiêu hiện tại, không cần học mọi chủ đề cùng lúc. Cả ba hướng dưới đây dùng chung kiến thức cơ bản về kiểu dữ liệu, biểu thức, điều kiện, vòng lặp, hàm và container; sau phần nền tảng, mỗi hướng đi sâu vào kỹ năng khác nhau.

## Hướng nền tảng cho người mới

Phù hợp nếu bạn mới học lập trình, chuyển từ ngôn ngữ khác hoặc muốn củng cố tư duy trước khi giải bài toán lớn.

1. Đọc [C++ là gì và các phiên bản](/cpp/bat-dau/cpp-la-gi) để phân biệt ngôn ngữ, compiler, thư viện chuẩn và IDE.
2. [Cài môi trường C++](/cpp/bat-dau/cai-dat-moi-truong) và chạy [chương trình đầu tiên](/cpp/bat-dau/chuong-trinh-dau-tien) từ terminal.
3. Học [biến, kiểu dữ liệu và biểu thức](/cpp/bat-dau/bien-kieu-du-lieu), rồi chuyển sang [nhập xuất, điều kiện và vòng lặp](/cpp/bat-dau/nhap-xuat-dieu-kien-vong-lap).
4. Dùng [hàm](/cpp/bat-dau/ham-pham-vi), [mảng và chuỗi](/cpp/bat-dau/mang-string), sau đó làm quen với [`std::vector`](/cpp/trung-cap/vector-struct-enum).
5. Bắt đầu thuật toán qua [độ phức tạp](/cpp/thuat-toan/do-phuc-tap), [tìm kiếm và sắp xếp](/cpp/thuat-toan/tim-kiem-sap-xep).

Đi theo thứ tự này giúp bạn hiểu dữ liệu đi qua chương trình như thế nào trước khi chọn cấu trúc dữ liệu và thuật toán.

## Hướng lập trình thi đấu

Phù hợp với học sinh luyện HSG, người làm bài trên online judge và người cần phân tích giới hạn đầu vào để chọn thuật toán.

- Ôn nền tảng, nhất là hàm, vòng lặp, [mảng và chuỗi](/cpp/bat-dau/mang-string), cùng cách đọc dữ liệu vào/ghi kết quả.
- Nắm [STL](/cpp/stl/stl-la-gi), [containers](/cpp/stl/sequence-containers) và [algorithms](/cpp/stl/stl-algorithms) để dùng cấu trúc dữ liệu có sẵn.
- Học [độ phức tạp Big O](/cpp/thuat-toan/do-phuc-tap), [cách đọc đề và thiết kế thuật toán](/cpp/thuat-toan/giai-quyet-bai-toan), rồi tìm hiểu [tìm kiếm và sắp xếp](/cpp/thuat-toan/tim-kiem-sap-xep).
- Mở rộng sang [đệ quy và quay lui](/cpp/thuat-toan/de-quy-quay-lui), [đồ thị](/cpp/thuat-toan/do-thi), sau đó [quy hoạch động](/cpp/thuat-toan/quy-hoach-dong).
- Dùng [cheatsheet](/cpp/tra-cuu/cu-phap) để tra cú pháp; khi thiết kế lời giải, xem cả giới hạn dữ liệu, trường hợp biên, độ phức tạp thời gian và bộ nhớ.

Trong hướng này, C++17 giúp bài làm tương thích với nhiều hệ thống chấm. Chỉ dùng tính năng mới hơn khi môi trường đích hỗ trợ rõ ràng.

## Hướng kỹ nghệ phần mềm

Phù hợp khi mục tiêu là xây dựng ứng dụng, thư viện, công cụ hoặc dịch vụ C++ có nhiều file và cần được bảo trì lâu dài.

- Học [references và pointers](/cpp/bat-dau/references-pointers) cùng [vòng đời bộ nhớ](/cpp/trung-cap/stack-heap-lifetime) để hiểu lifetime và ownership.
- Tìm hiểu [class và đóng gói](/cpp/trung-cap/classes-constructors), sau đó [kế thừa và đa hình](/cpp/trung-cap/inheritance-polymorphism) khi mô hình dữ liệu cần các mối quan hệ đó.
- Xem [C++17, C++20 và C++23](/cpp/stl/cpp17-20-23), [RAII và smart pointers](/cpp/stl/raii-smart-pointers) để chọn công cụ thư viện và quản lý resource phù hợp.
- Chia mã nguồn bằng [header, translation unit và module](/cpp/ky-thuat/header-source-modules), rồi cấu hình build với [CMake](/cpp/ky-thuat/cmake).
- Tìm hiểu [unit testing](/cpp/ky-thuat/unit-testing), [debugging](/cpp/ky-thuat/debugging) và [an toàn bộ nhớ](/cpp/ky-thuat/ub-memory-safety) để kiểm soát lỗi khi dự án mở rộng.

Không phải dự án nào cũng cần đủ mọi kỹ thuật ngay từ đầu. Hãy học thêm khi quy mô, yêu cầu triển khai hoặc chi phí bảo trì của dự án đòi hỏi.

## Cách chọn và chuyển hướng

| Mục tiêu trước mắt | Hướng nên bắt đầu | Chủ đề đi sâu tiếp theo |
|---|---|---|
| Hiểu cú pháp và cách chương trình chạy | Nền tảng cho người mới | Hàm, container, thuật toán cơ bản |
| Giải bài có giới hạn thời gian/bộ nhớ | Lập trình thi đấu | Độ phức tạp, cấu trúc dữ liệu, thuật toán |
| Xây ứng dụng hoặc thư viện nhiều thành phần | Kỹ nghệ phần mềm | Lifetime, thiết kế kiểu, build, kiểm thử |

Đổi mục tiêu không làm kiến thức nền mất giá trị. Người học thuật toán vẫn cần hiểu kiểu dữ liệu và lifetime; người xây ứng dụng vẫn cần phân tích độ phức tạp. Có thể quay lại một chủ đề khác khi dự án hoặc bài toán đưa ra nhu cầu cụ thể.

## Cách học hiệu quả

Đọc một khái niệm cùng ví dụ, rồi lần theo dữ liệu từ đầu vào qua các biến và hàm đến kết quả. Khi tự thử mã, dự đoán điều gì sẽ xảy ra trước khi chạy để đối chiếu hiểu biết với kết quả thực tế. Nếu chương trình lỗi, đọc thông báo đầu tiên, thu nhỏ đoạn mã liên quan và kiểm tra giả định về kiểu dữ liệu, phạm vi, lifetime hoặc định dạng input.

## Đọc tiếp

Bắt đầu với [C++ là gì](/cpp/bat-dau/cpp-la-gi), hoặc mở collection C++ trong sidebar để duyệt các bài theo nhóm chủ đề.
