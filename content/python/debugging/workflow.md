---
title: Quy trình debug có hệ thống
description: Từ tái hiện lỗi đến traceback, breakpoint, logging và regression test mà không đoán mò.
slug: /debugging/workflow
category: best-practices
categoryLabel: Best practices
order: 1470
difficulty: intermediate
keywords: [debugging, breakpoint, pdb, traceback, logging, regression test]
updated: 2026-09-18
related: ["/exception/traceback", "/standard-library/logging", "/testing/strategy"]
---

Bắt đầu bằng một reproduction nhỏ và xác định expected behavior. Ghi input, môi trường, phiên bản Python và bước gây lỗi; nếu chưa tái hiện được, đừng vội sửa code theo phỏng đoán.

Traceback đọc từ dòng cuối lên: exception type/message ở cuối, frame gần nơi lỗi nhất ở ngay phía trên. `breakpoint()` hoặc `python -m pdb script.py` cho phép inspect local state, step qua branch và xem call stack. Với lỗi production, structured logging nên có request id và context đủ để nối các sự kiện nhưng không ghi secret.

Sau khi tìm nguyên nhân, viết regression test tối thiểu trước hoặc cùng lúc với fix. Kiểm tra cả path thành công, input biên và failure mode. Một fix tốt giải thích được vì sao lỗi xảy ra; chỉ thêm `try/except: pass` làm mất tín hiệu và khiến lỗi quay lại khó hơn.
