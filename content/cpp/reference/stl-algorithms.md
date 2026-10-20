---
title: STL algorithms: bảng tra cứu
description: Tra nhóm thuật toán phổ biến, yêu cầu range và độ phức tạp thường gặp.
slug: /cpp/tra-cuu/stl-algorithms
category: reference
categoryLabel: Tra cứu và xử lý lỗi
order: 25030
difficulty: intermediate
keywords: [STL algorithm reference, sort, find, count, lower_bound, complexity]
updated: 2026-10-20
collection: cpp
collectionLabel: C++
collectionDescription: Bảng tra cú pháp, container, thuật toán, lỗi thường gặp và best practices C++.
related: ["/cpp/stl/stl-algorithms", "/cpp/stl/lambda-auto-range", "/cpp/thuat-toan/tim-kiem-sap-xep"]
---

Các thuật toán dưới đây nhận range `[first, last)`, thường trong `<algorithm>`. Kiểm tra precondition trước khi gọi.

## Tìm và đếm

```text
find / find_if:           O(n), iterator hoặc end
count / count_if:         O(n), số phần tử phù hợp
min_element / max_element O(n), iterator hoặc end
```

## Sắp xếp và binary search

```text
sort:          O(n log n) so sánh, không stable
stable_sort:   O(n log n) khi đủ bộ nhớ phụ; fallback O(n log² n), giữ thứ tự tương đương
lower_bound:   O(log n) comparison với random-access range đã sort
upper_bound:   O(log n) comparison với random-access range đã sort
binary_search: kiểm tra tồn tại trong range đã sort
```

Với iterator không random-access, `lower_bound` vẫn O(log n) comparison nhưng có thể O(n) bước tăng iterator.

## Mutate và dựng kết quả

`transform` áp dụng callable, `remove_if` sắp xếp phần tử còn lại về đầu range nhưng **không** giảm size container, `erase`/erase-remove idiom mới xóa phần dư. `unique` loại trùng liền kề nên thường sort trước nếu cần loại mọi duplicate.

## Lỗi thường gặp

- Dùng binary-search algorithm trên range chưa sort.
- Dereference kết quả bằng `end()`.
- Quên erase phần cuối sau `remove_if` trên C++17 sequence container.
- Comparator không strict weak ordering.

## Kiểm tra nhanh

Đọc precondition, loại iterator và invalidation của algorithm trước khi gọi trên container cụ thể.

## Đọc tiếp

Học [algorithms chi tiết](/cpp/stl/stl-algorithms), [iterator](/cpp/stl/iterators-invalidation) và [searching/sorting](/cpp/thuat-toan/tim-kiem-sap-xep).
