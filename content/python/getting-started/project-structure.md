---

title: Cấu trúc project Python cơ bản
description: Chọn cấu trúc vừa đủ cho script, package và ứng dụng lớn mà không over-engineer.
slug: /bat-dau/project-structure
category: getting-started
categoryLabel: Bắt đầu
order: 70
difficulty: beginner
keywords: [project structure, package layout, src layout, tests, pyproject]
updated: 2026-09-18
related: ["/module/module", "/module/packages", "/packaging/pyproject"]
-----------------------------------------------------------------------

Cấu trúc project nên đủ rõ để trả lời nhanh 4 câu:

```text
code nằm đâu?
chạy từ đâu?
test nằm đâu?
dependency khai báo ở đâu?
```

## Script nhỏ

Với script đơn giản:

```text
project/
├── main.py
└── README.md
```

Chạy:

```bash
python main.py
```

Không cần tạo thêm nhiều folder nếu project chưa cần.

## Project có nhiều module

Khi code bắt đầu tách thành nhiều phần:

```text
project/
├── main.py
├── config.py
├── service.py
└── utils.py
```

Nên tách module theo trách nhiệm, tránh dồn toàn bộ logic vào một file.

Ví dụ:

```text
config.py   -> cấu hình
service.py  -> logic chính
utils.py    -> helper nhỏ dùng chung
main.py     -> entry point
```

## Package hoàn chỉnh

Khi project cần test, dependency rõ ràng hoặc chuẩn bị phát hành:

```text
invoice_tool/
├── pyproject.toml
├── README.md
├── src/
│   └── invoice_tool/
│       ├── __init__.py
│       └── cli.py
└── tests/
    └── test_cli.py
```

Ý nghĩa:

```text
src/        -> source code
tests/      -> test
pyproject.toml -> metadata, build và dependency
README.md   -> cách dùng project
```

## Vì sao dùng `src/`

`src` layout giúp tránh trường hợp Python import nhầm source trực tiếp từ thư mục project thay vì package đã được cài.

Ví dụ:

```text
src/
└── invoice_tool/
```

Khi đó package thật là:

```text
invoice_tool
```

không phải:

```text
src.invoice_tool
```

## `__init__.py`

File:

```text
__init__.py
```

thường đánh dấu thư mục là một Python package và có thể chứa API cấp package.

Ví dụ:

```text
invoice_tool/
├── __init__.py
├── cli.py
└── service.py
```

Bạn có thể import:

```python
from invoice_tool import service
```

Không nên nhét toàn bộ logic vào `__init__.py`.

## Entry point

Project nên có một nơi rõ ràng để bắt đầu chạy.

Ví dụ:

```text
main.py
```

hoặc:

```text
invoice_tool/cli.py
```

Với package:

```bash
python -m invoice_tool.cli
```

Người đọc project không nên phải đoán file nào là file khởi động.

## Tests

Test nên tách khỏi source:

```text
project/
├── src/
└── tests/
```

Ví dụ:

```text
tests/
├── test_cli.py
└── test_service.py
```

Tên test nên phản ánh module tương ứng để khi lỗi CI có thể khoanh vùng nhanh.

## Khi project lớn hơn

Đừng tiếp tục nhét tất cả vào:

```text
service.py
```

đến khi file dài vài nghìn dòng.

Có thể tách theo domain:

```text
src/app/
├── users/
├── billing/
├── reports/
└── cli/
```

Ưu tiên nhóm code theo chức năng thực tế thay vì tạo hàng loạt folder chung chung như:

```text
managers/
helpers/
handlers/
processors/
```

nếu chúng không mang ý nghĩa rõ ràng.

## Tránh over-engineer

Một bài tập 100 dòng không cần:

```text
controllers/
services/
repositories/
interfaces/
factories/
adapters/
```

Cấu trúc nên lớn dần cùng project.

Quy tắc đơn giản:

```text
1 file đủ rõ       -> giữ 1 file
nhiều trách nhiệm  -> tách module
có package/test    -> dùng structure rõ ràng
project lớn        -> tách theo domain
```

Mục tiêu không phải có nhiều folder. Mục tiêu là mở project lên và hiểu được luồng code trong vài giây.