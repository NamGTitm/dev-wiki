---
title: Graph: BFS, DFS và đường đi ngắn nhất
description: Biểu diễn đồ thị bằng adjacency list, duyệt thành phần và dùng Dijkstra đúng điều kiện.
slug: /cpp/thuat-toan/do-thi
category: algorithms
categoryLabel: Thuật toán và Competitive Programming
order: 23100
difficulty: intermediate
keywords: [graph, BFS, DFS, Dijkstra, adjacency list, shortest path]
updated: 2026-10-22
collection: cpp
collectionLabel: C++
collectionDescription: Tài liệu C++17 thực hành, từ cú pháp nền tảng đến thuật toán và phần mềm hiện đại.
related: ["/cpp/stl/container-adapters", "/cpp/thuat-toan/cay", "/cpp/thuat-toan/quy-hoach-dong"]
---

Đồ thị biểu diễn các đỉnh và cạnh; mỗi cạnh có thể có hướng hoặc vô hướng, có thể mang trọng số hoặc không. Chọn cách biểu diễn theo số cạnh và thao tác chính: adjacency list giữ hàng xóm của từng đỉnh, còn ma trận kề cho phép kiểm tra một cạnh trực tiếp nhưng dùng bộ nhớ theo bình phương số đỉnh.

## BFS và DFS

BFS dùng queue để duyệt theo lớp; trên đồ thị không trọng số, khoảng cách cạnh nhỏ nhất từ nguồn là đúng vì mọi cạnh có cùng chi phí. DFS đi sâu theo nhánh, dùng cho thành phần liên thông, phát hiện cấu trúc và tìm đường. Cả hai cần đánh dấu đỉnh đã thăm để chu trình không khiến thuật toán lặp mãi.

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

BFS/DFS mất O(V + E) thời gian trên adjacency list; danh sách kề dùng O(V + E) bộ nhớ và mảng trạng thái dùng O(V) thêm. Với đồ thị không liên thông, một lần duyệt từ nguồn chỉ tới được thành phần của nguồn; muốn thăm toàn graph, lặp qua mọi đỉnh chưa thăm và khởi động lượt mới.

Trong ví dụ, BFS bắt đầu tại 0, đưa 1 và 2 vào queue ở lớp 1, rồi thăm 3 từ 1 ở lớp 2. Vì vậy distance[3] là 2. Giá trị -1 giữ vai trò chưa thăm/không tới được, còn khi cạnh có trọng số khác nhau cần chọn thuật toán khác.

DFS có thể viết đệ quy hoặc dùng stack tường minh. Phiên bản đệ quy gọn, nhưng độ sâu có thể đạt V và làm tràn call stack trên graph rất sâu; stack tường minh đưa phần trạng thái đó vào bộ nhớ heap do container quản lý.

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

    for (const auto& edges : graph) {
        for (const auto& edge : edges) {
            if (edge.second < 0) {
                std::cerr << "Dijkstra khong ho tro trong so am.\n";
                return 1;
            }
        }
    }

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
            if (cost > std::numeric_limits<long long>::max() - weight) continue;
            const long long candidate{cost + weight};
            if (candidate >= distance[next]) continue;
            distance[next] = candidate;
            pending.push({candidate, next});
        }
    }
    std::cout << distance[3] << '\n';
}
```

Ví dụ là graph có hướng với trọng số không âm; đường 0 → 2 → 1 → 3 có tổng 1 + 2 + 1 = 4, nên output là 4. Đoạn code kiểm tra mọi cạnh trước khi chạy Dijkstra và dừng với lỗi nếu có cạnh âm, kể cả cạnh không tới được từ nguồn. Kiểm tra tràn trước phép cộng để không làm hỏng khoảng cách ứng viên.

Hàng đợi ưu tiên có thể chứa nhiều bản ghi cho cùng một đỉnh. Khi một đường ngắn hơn được tìm thấy, bản ghi cũ chưa bị xóa; phép so sánh cost với distance[node] loại bỏ bản ghi lỗi thời khi lấy ra. Với adjacency list trên graph đơn giản, thời gian thường là O((V + E) log V); mảng distance dùng O(V) ngoài bộ nhớ graph.

Biến infinity là sentinel, nên khoảng cách cần tìm phải nhỏ hơn giá trị này. Nếu constraint cho phép đường đi lớn hơn, cần chọn kiểu hoặc biểu diễn trạng thái khác và kiểm tra phép cộng theo miền dữ liệu.

## Lỗi thường gặp

- Không đánh dấu visited/distance khiến lặp vô hạn trên chu trình.
- Chạy BFS cho cạnh có trọng số khác nhau.
- Chạy Dijkstra với trọng số âm.
- Không xác thực đỉnh đầu/cuối khi input không đáng tin cậy.

## Chọn phép duyệt theo bài toán

BFS phù hợp khi cần số cạnh ít nhất trong graph không trọng số hoặc theo từng lớp từ nguồn. DFS phù hợp khi cần duyệt cấu trúc, thành phần liên thông hoặc thứ tự vào/ra. Dijkstra áp dụng cho đường đi ngắn nhất có trọng số không âm; cạnh âm cần thuật toán khác như Bellman–Ford. Các lựa chọn này khác nhau ở giả định về chi phí cạnh, dù có thể cùng dùng adjacency list.

## Đọc tiếp

Học [cây và duyệt cây](/cpp/thuat-toan/cay), cùng [queue/priority_queue](/cpp/stl/container-adapters).
