---
title: Recursion và closure
description: Hiểu call stack, recursion limit và closure để chọn giải pháp phù hợp thay vì dùng thuật ngữ như phép màu.
slug: /ham/recursion-closures
category: functions
categoryLabel: Hàm
order: 450
difficulty: advanced
keywords: [recursion, closure, nested function, recursion limit, nonlocal]
updated: 2026-09-18
related: ["/ham/function", "/ham/scope", "/ham/decorator"]
---

Recursion là hàm gọi lại chính nó và phải có base case. Mỗi lần gọi tạo frame mới, vì vậy recursion sâu có thể chạm giới hạn và không tự được tối ưu thành loop.

```python
def walk(tree):
    yield tree["name"]
    for child in tree.get("children", []):
        yield from walk(child)
```

Closure là function giữ được binding từ enclosing scope sau khi function ngoài đã return:

```python
def make_counter():
    count = 0
    def increment():
        nonlocal count
        count += 1
        return count
    return increment
```

Late binding của closure khiến lambda trong loop thường đọc giá trị cuối cùng; bind giá trị qua default argument hoặc dùng factory để tạo scope riêng.
