---
title: Secure coding với Python
description: Trust boundary, input không tin cậy, eval, pickle, secret và dependency risk trong ứng dụng Python.
slug: /security/secure-coding
category: security
categoryLabel: Python Security
order: 1240
difficulty: intermediate
keywords: [secure coding, eval, exec, pickle, untrusted input, secrets, dependency security]
updated: 2026-09-18
related: ["/standard-library/security-modules", "/security/subprocess-paths", "/file/json-csv"]
---

Mọi input từ user, network, file upload hoặc package bên ngoài đều là untrusted cho đến khi được validate. Không dùng `eval`/`exec` để biến text thành code; không dùng `pickle.loads` trên dữ liệu có thể bị sửa vì pickle có thể thực thi hành vi tùy ý trong quá trình deserialize.

Password không lưu plaintext; token tạo bằng `secrets`; secret không commit vào source, log hoặc client bundle. Parameterize SQL, giới hạn path, kiểm tra dependency và pin/lock theo workflow của project.

Security là property của boundary: xác thực, phân quyền, validation, encoding output và audit log cần nằm đúng nơi dữ liệu đi qua hệ thống. Không có một hàm “sanitize” chung cho mọi context HTML, SQL, shell và filesystem.
