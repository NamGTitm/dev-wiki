---
title: Module và package
description: Tổ chức code Python thành module, package và import ổn định trong project.
slug: /module/module
category: modules
categoryLabel: Module & package
order: 500
difficulty: beginner
keywords: [module python, package, import, init py, relative import]
updated: 2026-09-18
related: ["/bat-dau/virtual-environment", "/oop/class-object", "/packaging/pyproject"]
---

Mỗi file `.py` là một module. Package gom các module liên quan thành một namespace có cấu trúc.

```python
from app.billing import calculate_total

total = calculate_total(120_000)
```

## Import rõ ràng

Ưu tiên import tên cụ thể để đọc code biết dependency đến từ đâu. Tránh `from module import *` vì nó làm namespace khó đoán.

`__name__ == "__main__"` cho phép một file vừa được import như module vừa chạy như script:

```python
if __name__ == "__main__":
    main()
```

Giữ package dependency một chiều để tránh circular import. Nếu hai module biết quá nhiều về nhau, hãy tách abstraction chung.

## __name__ và chạy module

Khi chạy `python file.py`, module đó có `__name__ == "__main__"`. Khi import `file` từ nơi khác, `__name__` là tên module và phần code top-level vẫn được thực thi một lần. Vì vậy entrypoint nên nằm sau guard:

```python
def main() -> int:
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
```

Guard ngăn import module vô tình chạy CLI. Nó không ngăn mọi import side effect; code top-level vẫn nên nhẹ và khai báo rõ ràng.
