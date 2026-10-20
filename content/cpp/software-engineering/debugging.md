---
title: Debugging với GDB, LLDB và Visual Studio
description: Tái hiện lỗi, dừng tại breakpoint, đọc stack trace và kiểm tra biến theo từng bước.
slug: /cpp/ky-thuat/debugging
category: engineering
categoryLabel: Kỹ nghệ phần mềm C++
order: 24030
difficulty: intermediate
keywords: [GDB, LLDB, Visual Studio debugger, breakpoint, stack trace, debug symbols]
updated: 2026-10-20
collection: cpp
collectionLabel: C++
collectionDescription: Cách xây dựng, kiểm tra, debug và bảo vệ ứng dụng C++ có thể bảo trì.
related: ["/cpp/ky-thuat/unit-testing", "/cpp/ky-thuat/ub-memory-safety", "/cpp/tra-cuu/debugging-errors"]
---

Debugger cho phép dừng chương trình và quan sát trạng thái tại runtime. Dùng khi log không đủ để biết nhánh nào chạy, biến thay đổi ra sao hoặc crash bắt nguồn ở đâu.

## Quy trình debug

- Tạo input nhỏ nhất tái hiện lỗi; ghi lại expected và actual behavior.
- Build chế độ debug có symbols và giữ optimization thấp khi cần quan sát source.
- Đặt breakpoint gần nơi invariant bắt đầu sai, step qua từng thao tác.
- Xem call stack, local variables và expression; xác định nơi giá trị sai lần đầu.
- Sửa nguyên nhân, thêm regression case nếu project có test, chạy lại.

## GDB và LLDB

```sh
g++ -std=c++17 -g -O0 -Wall -Wextra main.cpp -o app
gdb ./app
```

Trong GDB: `break main`, `run`, `next`, `step`, `print value`, `backtrace`, `continue`. LLDB có lệnh tương tự: `breakpoint set`, `run`, `next`, `step`, `frame variable`, `bt`.

## Visual Studio

Build Debug, đặt breakpoint trong editor, chọn Start Debugging, rồi dùng Locals/Autos, Watch, Call Stack và Step Over/Into. Nếu breakpoint không bind, kiểm tra binary có symbols và file source có khớp build.

## Lỗi thường gặp

- Debug nhầm executable cũ hoặc input khác.
- Chỉ nhìn dòng crash mà không đọc stack trace và call path.
- Chạy với optimization rồi suy luận sai từ local variable đã bị tối ưu.
- Gỡ triệu chứng bằng điều kiện đặc biệt thay vì tìm invariant bị phá.

## Tự luyện

Đặt lỗi có chủ đích: đổi index thành `size()`, tái hiện crash trong debug build, xác định dòng đầu tiên vi phạm invariant rồi sửa.

## Đọc tiếp

Kết hợp debugger với [unit tests](/cpp/ky-thuat/unit-testing), [undefined behavior](/cpp/ky-thuat/ub-memory-safety) và [debugging checklist](/cpp/tra-cuu/debugging-errors).
