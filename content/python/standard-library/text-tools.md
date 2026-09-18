---
title: inspect, copy, pprint, textwrap, string và operator
description: Các module nhỏ nhưng hữu ích cho introspection, sao chép, format text và viết pipeline dữ liệu rõ ràng.
slug: /standard-library/text-tools
category: standard-library
categoryLabel: Standard library
order: 1380
difficulty: intermediate
keywords: [inspect, copy, deepcopy, pprint, textwrap, string, operator, heapq, bisect]
updated: 2026-09-18
related: ["/co-ban/copying-aliasing", "/standard-library/collections-itertools", "/oop/data-model"]
---

`inspect.signature` và `getmembers` hữu ích cho framework, plugin và tooling; code ứng dụng thông thường nên ưu tiên API tường minh. `copy.copy` sao chép nông còn `copy.deepcopy` đi qua object graph, có thể đắt hoặc không phù hợp với object chứa resource.

`pprint` giúp đọc cấu trúc lồng nhau khi debug. `textwrap` xử lý wrap/dedent; `string.Template` là lựa chọn đơn giản cho template không cần full engine. `operator.itemgetter`/`attrgetter` làm key function ngắn gọn cho `sorted` và `groupby`.

`heapq` phù hợp priority queue tối thiểu; `bisect` tìm/chèn trong list đã sắp xếp nhưng không biến nó thành cấu trúc concurrent hay thay thế database index. Mọi helper nhỏ vẫn cần nêu invariant: list có được sort chưa, object có mutable không, và ai sở hữu dữ liệu.
