---
title: secrets, hashlib và hmac
description: Phân biệt random với secrets, hashing với encryption và dùng primitive chuẩn an toàn hơn.
slug: /standard-library/security-modules
category: standard-library
categoryLabel: Standard library
order: 1400
difficulty: intermediate
keywords: [secrets, hashlib, hmac, base64, random, password, hashing, encryption]
updated: 2026-09-18
related: ["/security/secure-coding", "/co-ban/binary-data", "/standard-library/overview"]
---

`random` dành cho mô phỏng và không nên dùng để tạo token bảo mật. `secrets` dùng nguồn entropy phù hợp hơn cho token reset hoặc secret ngẫu nhiên:

```python
import secrets

token = secrets.token_urlsafe(32)
```

Hashing là một chiều; encryption được thiết kế để giải mã bằng key. `hashlib` cung cấp hash, còn `hmac` kiểm tra integrity/authenticity khi hai bên chia sẻ secret. Password không nên hash bằng SHA-256 trực tiếp; dùng password hashing scheme chuyên dụng do thư viện phù hợp cung cấp và quản lý salt/cost đúng cách.

`base64` chỉ là encoding để biểu diễn byte bằng text, không phải encryption. Dùng nó cho payload cần vận chuyển qua text/URL, nhưng đừng dùng Base64 để “che” secret; ai có dữ liệu cũng decode được.
