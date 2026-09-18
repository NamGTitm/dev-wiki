---
title: urllib và socket: networking trong standard library
description: Hiểu tầng HTTP cơ bản, socket và các ranh giới bảo mật khi gọi mạng bằng thư viện chuẩn.
slug: /standard-library/networking
category: standard-library
categoryLabel: Standard library
order: 1370
difficulty: advanced
keywords: [urllib, socket, HTTP, URL, DNS, timeout, networking, TLS]
updated: 2026-09-18
related: ["/security/secure-coding", "/standard-library/subprocess", "/async/concurrency"]
---

`urllib.parse` dùng để parse và build URL; `urllib.request` có thể thực hiện HTTP request cơ bản. Luôn đặt timeout, kiểm tra status/content type, giới hạn kích thước body và xử lý redirect theo threat model. Khi ứng dụng cần retry, connection pooling, proxy hoặc async HTTP, thư viện chuyên dụng thường phù hợp hơn.

`socket` là abstraction thấp hơn: TCP là stream byte, không phải “mỗi lần recv là một message”. Có thể nhận thiếu hoặc gộp nhiều message, nên protocol phải định nghĩa framing, length prefix hoặc delimiter. Socket server cần timeout, đóng tài nguyên và giới hạn client.

Không tự tắt kiểm tra TLS để “sửa” lỗi certificate. URL đến từ user cần chống SSRF: allowlist scheme/host, chặn địa chỉ private sau DNS resolution và không cho truy cập metadata endpoint trong môi trường cloud. Log request nên loại bỏ token, cookie và dữ liệu nhạy cảm.
