---
title: Cài đặt Python
description: Cài Python hiện đại, kiểm tra phiên bản và chuẩn bị môi trường làm việc sạch.
slug: /bat-dau/cai-dat-python
category: getting-started
categoryLabel: Bắt đầu
order: 20
difficulty: beginner
keywords: [cài python, python 3, python windows, python macos, python linux]
updated: 2026-09-18
related: ["/bat-dau/python-la-gi", "/bat-dau/hello-world", "/bat-dau/virtual-environment"]
---

Hãy ưu tiên phiên bản Python 3 đang được hỗ trợ. Sau khi cài, kiểm tra bằng lệnh `python --version` hoặc `python3 --version` tùy hệ điều hành.

## Kiểm tra trình thông dịch

```bash
python --version
python -c "import sys; print(sys.executable)"
```

Lệnh thứ hai cho biết chính xác executable nào đang được gọi. Đây là cách nhanh để phát hiện việc máy có nhiều bản Python.

## Chuẩn bị project

Mỗi project nên có môi trường ảo riêng. Từ thư mục project, chạy:

```bash
python -m venv .venv
```

Kích hoạt môi trường ảo trước khi cài thư viện. Trên Windows dùng `.venv\\Scripts\\activate`, còn macOS/Linux dùng `source .venv/bin/activate`.

## Lỗi thường gặp

Nếu lệnh `python` không tồn tại, thử `python3` hoặc kiểm tra PATH. Đừng sửa PATH một cách mù quáng khi máy có nhiều bản Python; hãy xác định executable bằng `sys.executable` trước.
