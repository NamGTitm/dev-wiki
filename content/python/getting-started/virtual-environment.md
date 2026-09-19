---
title: Virtual environment với venv
description: Tách dependency theo từng project để cài đặt an toàn và tái lập được.
slug: /bat-dau/virtual-environment
category: getting-started
categoryLabel: Bắt đầu
order: 40
difficulty: beginner
keywords: [venv, virtualenv, môi trường ảo, dependency]
updated: 2026-09-18
related: ["/bat-dau/cai-dat-python", "/packaging/pip"]
---

Virtual environment tạo một môi trường Python riêng cho từng project, giúp dependency của project này không đè lên project khác.

## Tạo môi trường

Trong thư mục project:

```bash
python -m venv .venv
```

Cấu trúc thường sẽ có:

```text
project/
├── .venv/
└── main.py
```

## Kích hoạt

Windows PowerShell:

```powershell
.venv\Scripts\Activate.ps1
```

Windows Command Prompt:

```bat
.venv\Scripts\activate
```

macOS/Linux:

```bash
source .venv/bin/activate
```

Sau khi kích hoạt, terminal thường hiện:

```text
(.venv)
```

## Kiểm tra đúng interpreter

Đừng chỉ nhìn chữ `(.venv)`. Kiểm tra thật:

```bash
python -c "import sys; print(sys.executable)"
```

Đường dẫn phải nằm trong `.venv`.

Kiểm tra pip:

```bash
python -m pip --version
```

Hai lệnh này là cách nhanh nhất để phát hiện đang dùng nhầm environment.

## Cài dependency

```bash
python -m pip install requests
```

Nên dùng:

```bash
python -m pip
```

thay vì:

```bash
pip
```

để chắc chắn pip thuộc đúng interpreter đang chạy.

## Thoát môi trường

```bash
deactivate
```

## Không commit `.venv`

Thêm vào `.gitignore`:

```gitignore
.venv/
```

Virtual environment phụ thuộc máy và hệ điều hành, nên không dùng nó làm cách chia sẻ dependency.

Hãy lưu dependency bằng:

```text
requirements.txt
```

hoặc:

```text
pyproject.toml
```

Người khác sẽ tạo lại môi trường từ các file này.

## Debug nhanh

Nếu package đã cài nhưng vẫn báo:

```text
ModuleNotFoundError
```

kiểm tra:

```bash
python -c "import sys; print(sys.executable)"
python -m pip --version
```

Nếu hai đường dẫn không thuộc cùng `.venv`, bạn đang cài package vào nhầm Python.

Workflow cần nhớ:

```text
tạo .venv
   ↓
kích hoạt
   ↓
kiểm tra interpreter
   ↓
cài dependency
   ↓
chạy project
```

Mỗi project nên có virtual environment riêng. Đây là cách đơn giản nhất để dependency không biến thành bãi chiến trường.