---
title: JSON và CSV trong thực tế
description: Đọc ghi dữ liệu có cấu trúc, giữ rõ encoding, schema và ranh giới giữa text format với object Python.
slug: /standard-library/json
category: standard-library
categoryLabel: Standard library
order: 1330
difficulty: beginner
keywords: [json, csv, json loads, json dumps, csv reader, serialization]
updated: 2026-09-18
related: ["/file/json-csv", "/standard-library/overview", "/security/secure-coding"]
---

`json` biến giữa JSON text và object Python. `json.loads` nhận string, `json.load` nhận file-like object; chiều ngược lại là `dumps` và `dump`.

```python
import json

payload = {"name": "Nam", "enabled": True, "tags": ["python", "docs"]}
text = json.dumps(payload, ensure_ascii=False, indent=2)
decoded = json.loads(text)
```

JSON chỉ có một tập kiểu giới hạn: object, array, string, number, boolean và null. `datetime`, `Decimal` hay custom class cần một quy ước serialize riêng, chẳng hạn chuyển sang ISO 8601 hoặc string định danh. Không dùng `pickle` để đọc dữ liệu không đáng tin cậy: pickle có thể thực thi code khi unpickle.

Với CSV, dùng `csv.DictReader`/`DictWriter` thay vì tự `split(",")`; CSV có quoting, delimiter và dòng chứa dấu phẩy. Ghi rõ newline khi mở file để tránh dòng trống trên một số nền tảng.

## Ranh giới tin cậy

Parse thành công không có nghĩa dữ liệu đúng schema. Sau `json.loads`, hãy kiểm tra field bắt buộc, kiểu dữ liệu, giới hạn kích thước và giá trị cho phép trước khi đưa vào business logic. Khi xuất JSON cho API, cố định format và test cả field vắng lẫn field thừa.
