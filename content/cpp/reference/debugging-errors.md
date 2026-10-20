---
title: Compiler errors và runtime errors
description: Đọc nhóm lỗi biên dịch, lỗi liên kết, crash và sai kết quả theo đúng lớp nguyên nhân.
slug: /cpp/tra-cuu/debugging-errors
category: reference
categoryLabel: Tra cứu và xử lý lỗi
order: 25040
difficulty: beginner
keywords: [compiler error, linker error, runtime error, segmentation fault, debugging checklist]
updated: 2026-10-20
collection: cpp
collectionLabel: C++
collectionDescription: Bảng tra cú pháp, container, thuật toán, lỗi thường gặp và best practices C++.
related: ["/cpp/ky-thuat/debugging", "/cpp/tra-cuu/memory-errors", "/cpp/tra-cuu/best-practices"]
---

Thông báo lỗi là bằng chứng từ một giai đoạn cụ thể của build hoặc runtime. Đọc dòng đầu tiên có ý nghĩa trong log và sửa nguyên nhân gốc, không sửa ngẫu nhiên dòng cuối.

## Lỗi compile

```text
expected ';'          thiếu dấu kết thúc, có thể ở dòng trước
not declared          sai scope, thiếu declaration hoặc include
no matching function  đối số không khớp overload/template
ambiguous call        nhiều overload cùng phù hợp
cannot convert        phép chuyển kiểu không hợp lệ/thu hẹp
```

## Lỗi linker

```text
undefined reference / unresolved external: thiếu định nghĩa hoặc không link object/library
multiple definition: định nghĩa external đặt nhiều translation unit
```

Kiểm tra source có được đưa vào target, signature khớp header và định nghĩa global không bị lặp.

## Runtime hoặc sai kết quả

- Segmentation fault/access violation: pointer sai, lifetime lỗi, stack overflow hoặc out-of-bounds.
- Treo: vòng lặp vô hạn, deadlock, chờ I/O hoặc workload quá lớn.
- Output sai: kiểm tra kiểu số, điều kiện biên, thứ tự index và invariant.
- Chỉ lỗi release: nghi UB, race, uninitialized state hoặc phụ thuộc timing.

## Cách tiếp cận

Tạo input nhỏ tái hiện, build đúng file/flags, đọc stack trace, đặt breakpoint, kiểm tra biến tại nơi sai đầu tiên. Tham khảo [debugging workflow](/cpp/ky-thuat/debugging).

## Tự luyện

Tạo lỗi thiếu header, khai báo hàm nhưng thiếu định nghĩa và truy cập vector ngoài biên. Phân biệt lỗi compile, link và runtime.

## Đọc tiếp

Xem [lỗi bộ nhớ](/cpp/tra-cuu/memory-errors) và [best practices](/cpp/tra-cuu/best-practices).
