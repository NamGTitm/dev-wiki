---
title: Đọc đề và thiết kế thuật toán
description: Chuyển đề bài thành mô hình, invariant, thuật toán và kiểm thử trường hợp biên.
slug: /cpp/thuat-toan/giai-quyet-bai-toan
category: algorithms
categoryLabel: Thuật toán và Competitive Programming
order: 23010
difficulty: beginner
keywords: [đọc đề, thiết kế thuật toán, invariant, edge case, competitive programming]
updated: 2026-10-20
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/thuat-toan/do-phuc-tap", "/cpp/bat-dau/nhap-xuat-dieu-kien-vong-lap", "/cpp/thuat-toan/tim-kiem-sap-xep"]
---

Giải thuật hiệu quả bắt đầu từ việc hiểu đúng input, output và giới hạn. Bài này đưa ra quy trình ngắn để tránh cắm đầu code trước khi biết điều kiện nào phải đúng.

## Quy trình

- Viết lại yêu cầu bằng lời của bạn; xác định input, output và thứ tự dữ liệu.
- Ghi constraint: n lớn nhất, miền số, số test, giới hạn thời gian/bộ nhớ.
- Thử ví dụ nhỏ bằng tay; tìm trường hợp rỗng, một phần tử, trùng lặp, cực trị.
- Chọn cấu trúc dữ liệu và thuật toán; dự đoán độ phức tạp trước khi code.
- Nêu invariant hoặc lý do từng bước giữ tính đúng.
- Viết code đơn giản, kiểm tra input đọc thành công và giới hạn chỉ số.
- Chạy ví dụ, test biên và test ngẫu nhiên nhỏ bằng đối chiếu lời giải brute force nếu phù hợp.

## Ví dụ suy luận

Muốn kiểm tra hai phần tử có tổng bằng `target`: duyệt mọi cặp O(n²), hoặc lưu các giá trị đã thấy trong set để tìm phần bù trung bình O(n). Cách thứ hai đánh đổi thêm O(n) bộ nhớ; phải quyết định có cho phép dùng cùng một phần tử hai lần không.

## Kiểu số và input

Chọn kiểu dựa trên miền giá trị và phép tính trung gian, không chỉ giá trị cuối. Tổng nhiều `int` có thể vượt `int`; dùng `long long` khi phù hợp và kiểm tra giới hạn. `std::cin` có thể thất bại khi input sai; đừng tiếp tục xử lý biến chưa đọc.

## Lỗi thường gặp

- Hiểu nhầm “ít nhất”, “nhiều nhất”, inclusive range hoặc đơn vị.
- Code chỉ đúng sample, bỏ trường hợp biên.
- Chọn O(n²) dù constraint yêu cầu gần O(n log n).
- Dùng một kiểu dữ liệu nhỏ cho phép nhân/tổng trung gian.

## Tự luyện

Với bài tìm max trong dãy, liệt kê hành vi khi n = 0 và n = 1 trước khi code. Nếu đề đảm bảo n ≥ 1, nêu rõ giả định đó trong lời giải.

## Đọc tiếp

Ôn [Big O](/cpp/thuat-toan/do-phuc-tap) rồi chọn kỹ thuật như [prefix sum](/cpp/thuat-toan/prefix-sum-difference-array) hoặc [two pointers](/cpp/thuat-toan/two-pointers-sliding-window).
