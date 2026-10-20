---
title: Tree và thuật toán cây cơ bản
description: Biểu diễn cây bằng adjacency list, phân biệt root, parent, depth và duyệt cây an toàn.
slug: /cpp/thuat-toan/cay
category: algorithms
categoryLabel: Thuật toán và Competitive Programming
order: 23110
difficulty: intermediate
keywords: [tree, rooted tree, parent, depth, traversal, subtree]
updated: 2026-10-20
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/thuat-toan/do-thi", "/cpp/thuat-toan/de-quy-quay-lui", "/cpp/stl/sequence-containers"]
---

Tree là đồ thị liên thông không chu trình. Khi chọn một root, mỗi đỉnh khác có đúng một parent; `depth` là số cạnh từ root. Cây n đỉnh có n−1 cạnh.

## Tạo thứ tự DFS lặp

```cpp
#include <cstddef>
#include <iostream>
#include <vector>

int main() {
    const std::vector<std::vector<int>> tree{{1, 2}, {0, 3}, {0}, {1}};
    const int root{0};
    std::vector<int> parent(tree.size(), -1);
    std::vector<int> order{root};

    for (std::size_t i = 0; i < order.size(); ++i) {
        const int node{order[i]};
        for (int child : tree[node]) {
            if (child == parent[node]) continue;
            parent[child] = node;
            order.push_back(child);
        }
    }
    std::cout << order.size() << '\n';
}
```

Đoạn code giả định input là một cây hợp lệ và root nằm trong range; trên graph tổng quát cần visited để tránh chu trình. Duyệt toàn cây O(n) thời gian, O(n) bộ nhớ. Cách iterative tránh stack overflow khi cây sâu.

## Ý tưởng thuật toán

- **Subtree** của node gồm node và mọi hậu duệ.
- **Preorder** xử lý node trước con; **postorder** xử lý con trước node.
- Duyệt theo tầng dùng BFS; cần min-depth không trọng số thì BFS tự nhiên.
- Kích thước subtree thường gộp kết quả con trong postorder.

## Lỗi thường gặp

- Quên bỏ cạnh quay lại parent trong adjacency list vô hướng.
- Giả định root cố định khi đề cho phép chọn nhiều root.
- Dùng recursion trên cây dây dài không giới hạn.
- Không kiểm tra input có thật sự là cây liên thông.

## Tự luyện

Tính depth và subtree size cho mọi node. Thử cây một đỉnh, cây dạng đường thẳng và cây hình sao.

## Đọc tiếp

Tìm hiểu [graph algorithms](/cpp/thuat-toan/do-thi) và [đệ quy](/cpp/thuat-toan/de-quy-quay-lui).
