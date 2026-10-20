---
title: Unit Testing
description: Kiểm tra hành vi nhỏ, trường hợp biên và lỗi theo hợp đồng bằng test cô lập.
slug: /cpp/ky-thuat/unit-testing
category: engineering
categoryLabel: Kỹ nghệ phần mềm C++
order: 24040
difficulty: intermediate
keywords: [unit test C++, assert, CTest, test case, regression test]
updated: 2026-10-20
collection: cpp
collectionLabel: C++
collectionDescription: Cách xây dựng, kiểm tra, debug và bảo vệ ứng dụng C++ có thể bảo trì.
related: ["/cpp/ky-thuat/cmake", "/cpp/ky-thuat/debugging", "/cpp/ky-thuat/exceptions"]
---

Unit test kiểm tra một hàm hoặc module nhỏ với input đã biết. Test tốt mô tả contract, chạy lặp lại và chỉ phụ thuộc những collaborator cần thiết.

## Test tối giản bằng `assert`

```cpp
#include <cassert>

int add(int left, int right) {
    return left + right;
}

int main() {
    assert(add(2, 3) == 5);
    assert(add(-2, 2) == 0);
}
```

`assert` phù hợp demo hoặc invariant trong debug. Nếu build với `NDEBUG`, assertion có thể bị loại bỏ; không dùng nó để validate input production hoặc kiểm tra cần chạy trong mọi build.

## Thiết kế test

- Kiểm tra success path, biên min/max, rỗng, trùng lặp và input sai theo contract.
- Test giá trị trả về và side effect cần thiết; tránh kiểm tra chi tiết nội bộ.
- Giữ test độc lập, deterministic và có thông báo thất bại hữu ích.
- Tách logic thuần khỏi I/O để test không cần filesystem/network thật.
- Thêm regression test sau khi sửa bug nếu test suite hỗ trợ.

Framework như GoogleTest/Catch2 giúp fixture, parameterized test và báo lỗi tốt hơn, nhưng cần dependency và chính sách build phù hợp. CMake có thể đăng ký executable với CTest.

## Lỗi thường gặp

- Chỉ test sample hoặc đường thành công.
- Mock quá sâu khiến test chỉ xác nhận implementation hiện tại.
- Dùng `assert` làm validation security.
- Test có phụ thuộc thứ tự, clock, network hoặc dữ liệu dùng chung.

## Tự luyện

Viết test cho hàm chia: kiểm tra số dương, chia hết và mẫu số 0 theo contract đã chọn. Tách riêng lỗi input để test được mà không cần bắt mọi exception chung chung.

## Đọc tiếp

Chạy test qua [CMake/CTest](/cpp/ky-thuat/cmake), sau đó dùng [debugger](/cpp/ky-thuat/debugging) để phân tích lỗi.
