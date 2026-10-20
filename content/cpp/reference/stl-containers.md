---
title: STL containers: bảng tra cứu
description: So sánh sequence, ordered, unordered containers và adapters theo thao tác chính.
slug: /cpp/tra-cuu/stl-containers
category: reference
categoryLabel: Tra cứu và xử lý lỗi
order: 25020
difficulty: intermediate
keywords: [STL containers, complexity table, vector, map, unordered_map, priority_queue]
updated: 2026-10-20
collection: cpp
collectionLabel: C++
collectionDescription: Bảng tra cú pháp, container, thuật toán, lỗi thường gặp và best practices C++.
related: ["/cpp/stl/stl-la-gi", "/cpp/stl/sequence-containers", "/cpp/stl/associative-containers", "/cpp/stl/unordered-containers"]
---

Bảng này là hướng dẫn nhanh; độ phức tạp chính xác phụ thuộc thao tác và loại iterator. Dùng container làm abstraction thay vì đoán từ tên.

## Dãy theo thứ tự

```text
vector:        index O(1), append amortized O(1), insert giữa O(n)
array:         index O(1), kích thước cố định tại compile time
deque:         index O(1), push hai đầu O(1), chèn giữa O(n)
list:          không có index O(1), chèn/xóa O(1) khi đã có iterator
```

## Key có thứ tự

```text
set:       key duy nhất, find/insert/erase O(log n)
multiset:  key trùng, find/insert/erase O(log n)
map:       key -> value, find/insert/erase O(log n)
multimap:  key trùng -> nhiều value, find/insert/erase O(log n)
```

## Hash và adapters

```text
unordered_set/map: average find/insert O(1), worst O(n), không giữ thứ tự
stack:             LIFO, top/push/pop O(1)
queue:             FIFO, front/push/pop O(1)
priority_queue:    top O(1), push/pop O(log n)
```

## Chọn nhanh

- Dãy đa dụng: `vector`.
- Key cần thứ tự hoặc range lookup: `map`/`set`.
- Key lookup trung bình nhanh, không cần thứ tự: `unordered_map`/`unordered_set`.
- FIFO/LIFO/ưu tiên: adapter tương ứng.
- Cần iterator ổn định qua thao tác? Đọc quy tắc [invalidation](/cpp/stl/iterators-invalidation).

## Lỗi thường gặp

Chọn `list` vì nghe insert nhanh mà quên phải tìm vị trí; hoặc dựa vào average O(1) của hash table như guarantee worst-case.

## Kiểm tra nhanh

Ghi lại thao tác thường gặp nhất của bài toán trước khi chọn container; nếu bottleneck quan trọng, benchmark workload thật.

## Đọc tiếp

Xem bài [sequence](/cpp/stl/sequence-containers), [associative](/cpp/stl/associative-containers), [unordered](/cpp/stl/unordered-containers) và [adapters](/cpp/stl/container-adapters).
