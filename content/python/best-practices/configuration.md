---
title: Configuration và secrets
description: Tách config khỏi code, validate environment và không để secret lọt vào repository hoặc log.
slug: /best-practices/configuration
category: best-practices
categoryLabel: Best practices
order: 1420
difficulty: intermediate
keywords: [configuration, environment variables, secrets, settings, dev prod]
updated: 2026-09-18
related: ["/standard-library/logging", "/security/secure-coding", "/file/json-csv"]
---

Configuration gồm giá trị thay đổi theo environment; code gồm behavior. Parse và validate config ở startup để lỗi xuất hiện sớm, thay vì để string thiếu field chạy sâu rồi fail khó đọc.

Environment variable phù hợp cho secret và deployment-specific value, nhưng không tự an toàn: process, log hoặc crash report có thể làm lộ chúng. File config cần được phân quyền và không commit credential. Tách `dev`, `test`, `prod` bằng explicit settings, không dùng `if hostname == ...` rải khắp code.

Một object settings bất biến sau validation thường giúp dependency rõ hơn và test dễ hơn.
