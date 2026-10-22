---
title: Tree và thuật toán cây cơ bản
description: Biểu diễn cây bằng adjacency list, phân biệt root, parent, depth và duyệt cây an toàn.
slug: /cpp/thuat-toan/cay
category: algorithms
categoryLabel: Thuật toán và Competitive Programming
order: 23110
difficulty: intermediate
keywords: [tree, rooted tree, parent, depth, traversal, subtree]
updated: 2026-10-22
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
    std::vector<int> depth(tree.size());
    std::vector<bool> visited(tree.size(), false);
    std::vector<int> order;
    std::vector<int> pending{root};
    visited[root] = true;

    while (!pending.empty()) {
        const int node{pending.back()};
        pending.pop_back();
        order.push_back(node);
        for (int child : tree[node]) {
            if (visited[child]) continue;
            visited[child] = true;
            parent[child] = node;
            depth[child] = depth[node] + 1;
            pending.push_back(child);
        }
    }
    std::vector<std::size_t> subtree_size(tree.size(), 1);
    for (auto it = order.rbegin(); it != order.rend(); ++it) {
        const int node{*it};
        if (parent[node] != -1) {
            subtree_size[parent[node]] += subtree_size[node];
        }
    }
    std::cout << order.size() << ' ' << depth[3] << ' '
              << subtree_size[root] << '\n';
}
```

Đoạn code giả định input là cây hợp lệ, root tồn tại và mọi chỉ số hàng xóm nằm trong phạm vi. Stack tường minh tạo thứ tự preorder DFS; visited ngăn thêm đỉnh lần thứ hai. Duyệt cây mất O(n) thời gian và O(n) bộ nhớ, đồng thời tránh dùng call stack sâu.

## Ý tưởng thuật toán

- **Subtree** của node gồm node và mọi hậu duệ.
- **Preorder** xử lý node trước con; **postorder** xử lý con trước node.
- Duyệt theo tầng dùng BFS; cần min-depth không trọng số thì BFS tự nhiên.
- Kích thước subtree thường gộp kết quả con trong postorder.

Output là 4 2 4: lượt duyệt thấy cả bốn đỉnh, đỉnh 3 cách root hai cạnh và subtree của root gồm cả bốn đỉnh. visited ngăn thêm một đỉnh lần thứ hai; nếu input hợp đồng là cây, điều này cũng bỏ qua cạnh quay lại parent. Mã vẫn giả định root và mọi chỉ số hàng xóm nằm trong phạm vi.

Sau khi tạo order theo kiểu preorder, duyệt ngược order đảm bảo con được xử lý trước parent. Bắt đầu subtree_size mỗi đỉnh bằng 1 rồi cộng kích thước các con sẽ tính được subtree size mà không cần đệ quy.

## Cây có gốc và thứ tự duyệt

Chọn root chỉ tạo ra quan hệ parent/child cho mục đích xử lý; các cạnh của cây ban đầu vẫn vô hướng. Depth đo số cạnh từ root, còn chiều cao thường đo đường đi dài nhất từ một đỉnh xuống lá nên là đại lượng khác. Preorder hữu ích khi cần cha trước con; postorder phù hợp khi cần kết quả các cây con trước khi gộp lên cha.

## Lỗi thường gặp

- Quên bỏ cạnh quay lại parent trong adjacency list vô hướng.
- Giả định root cố định khi đề cho phép chọn nhiều root.
- Dùng recursion trên cây dây dài không giới hạn.
- Không kiểm tra input có thật sự là cây liên thông.

## Cây và graph

Mọi cây là graph liên thông không chu trình, nhưng một graph bất kỳ có thể có chu trình hoặc nhiều thành phần. Trong graph tổng quát phải dùng visited; nếu cần xác minh input thật sự là cây, ngoài việc duyệt còn phải kiểm tra tính liên thông và số cạnh bằng n - 1 theo định nghĩa cây đơn.

## Đọc tiếp

Tìm hiểu [graph algorithms](/cpp/thuat-toan/do-thi) và [đệ quy](/cpp/thuat-toan/de-quy-quay-lui).
