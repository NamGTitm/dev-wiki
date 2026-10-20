---
title: Graph: BFS, DFS và đường đi ngắn nhất
description: Biểu diễn đồ thị bằng adjacency list, duyệt thành phần và dùng Dijkstra đúng điều kiện.
slug: /cpp/thuat-toan/do-thi
category: algorithms
categoryLabel: Thuật toán và Competitive Programming
order: 23100
difficulty: intermediate
keywords: [graph, BFS, DFS, Dijkstra, adjacency list, shortest path]
updated: 2026-10-20
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/stl/container-adapters", "/cpp/thuat-toan/cay", "/cpp/thuat-toan/quy-hoach-dong"]
---

Đồ thị biểu diễn các đỉnh và cạnh. Dùng adjacency list cho đồ thị thưa; ma trận kề phù hợp khi cần kiểm tra cạnh thường xuyên trên đồ thị nhỏ hoặc dày.

## BFS và DFS

BFS dùng queue để duyệt theo lớp; trên đồ thị không trọng số, khoảng cách cạnh nhỏ nhất từ nguồn là đúng. DFS đi sâu theo nhánh, dùng cho thành phần liên thông, phát hiện cấu trúc và tìm đường.

```cpp
#include <iostream>
#include <queue>
#include <vector>

int main() {
    const std::vector<std::vector<int>> graph{{1, 2}, {0, 3}, {0}, {1}};
    std::vector<int> distance(graph.size(), -1);
    std::queue<int> pending;
    const int start{0};
    distance[start] = 0;
    pending.push(start);

    while (!pending.empty()) {
        const int node{pending.front()};
        pending.pop();
        for (int next : graph[node]) {
            if (distance[next] != -1) continue;
            distance[next] = distance[node] + 1;
            pending.push(next);
        }
    }
    std::cout << distance[3] << '\n';
}
```

BFS/DFS O(V + E) thời gian và O(V + E) cho graph adjacency list cộng O(V) trạng thái duyệt. Đồ thị có thể không liên thông; lặp từ mọi đỉnh nếu cần thăm tất cả.

## Dijkstra

Dijkstra tìm đường đi ngắn nhất khi trọng số cạnh **không âm**. Với adjacency list và binary heap, thời gian thường O((V + E) log V), bộ nhớ O(V + E). Nếu có cạnh âm, thuật toán không áp dụng; chọn Bellman–Ford hoặc thuật toán phù hợp khác.

```cpp
#include <functional>
#include <iostream>
#include <limits>
#include <queue>
#include <utility>
#include <vector>

int main() {
    using Edge = std::pair<int, int>;
    std::vector<std::vector<Edge>> graph(4);
    graph[0] = {{1, 4}, {2, 1}};
    graph[2] = {{1, 2}, {3, 5}};
    graph[1] = {{3, 1}};

    const long long infinity{std::numeric_limits<long long>::max() / 4};
    std::vector<long long> distance(graph.size(), infinity);
    using State = std::pair<long long, int>;
    std::priority_queue<State, std::vector<State>, std::greater<State>> pending;
    distance[0] = 0;
    pending.push({0, 0});

    while (!pending.empty()) {
        const auto [cost, node] = pending.top();
        pending.pop();
        if (cost != distance[node]) continue;
        for (const auto& [next, weight] : graph[node]) {
            const long long candidate{cost + weight};
            if (candidate >= distance[next]) continue;
            distance[next] = candidate;
            pending.push({candidate, next});
        }
    }
    std::cout << distance[3] << '\n';
}
```

Ví dụ có hướng, trọng số không âm nhỏ; kết quả từ đỉnh 0 đến 3 là 4. Với dữ liệu thực, xác thực đỉnh/trọng số và tránh overflow khi cộng khoảng cách.

## Lỗi thường gặp

- Không đánh dấu visited/distance khiến lặp vô hạn trên chu trình.
- Chạy BFS cho cạnh có trọng số khác nhau.
- Chạy Dijkstra với trọng số âm.
- Không xác thực đỉnh đầu/cuối khi input không đáng tin cậy.

## Tự luyện

Đếm số thành phần liên thông bằng BFS/DFS ngoài cùng. Thử graph rỗng, đỉnh cô lập, self-loop và cạnh lặp theo giả định của đề.

## Đọc tiếp

Học [cây và duyệt cây](/cpp/thuat-toan/cay), cùng [queue/priority_queue](/cpp/stl/container-adapters).
