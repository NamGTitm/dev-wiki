---
title: subprocess, path traversal và shell injection
description: Các boundary nguy hiểm khi chạy command hoặc mở path do user cung cấp.
slug: /security/subprocess-paths
category: security
categoryLabel: Python Security
order: 1250
difficulty: advanced
keywords: [shell injection, subprocess, shell=True, path traversal, pathlib, security]
updated: 2026-09-18
related: ["/standard-library/subprocess", "/standard-library/pathlib", "/security/secure-coding"]
---

Nếu ghép input vào shell command, attacker có thể chèn metacharacter. Truyền argv list cho `subprocess.run` và tránh `shell=True` là mặc định an toàn hơn, nhưng executable, environment và working directory vẫn cần kiểm soát.

Path traversal xảy ra khi input như `../../secret` thoát khỏi thư mục cho phép. Resolve path, kiểm tra quan hệ với allowed root và từ chối symlink/extension không phù hợp nếu threat model yêu cầu. Không chỉ kiểm tra string bắt đầu bằng prefix vì `/safe-other` có thể cùng prefix với `/safe`.

Defense cần theo context và quyền process tối thiểu; không coi validation client-side là security boundary.
