---
title: sqlite3 và transaction
description: Dùng SQLite từ Python với parameterized query, transaction, commit và rollback.
slug: /standard-library/sqlite3
category: standard-library
categoryLabel: Standard library
order: 1370
difficulty: intermediate
keywords: [sqlite3, database, SQL, transaction, commit, rollback, SQL injection]
updated: 2026-09-18
related: ["/file/context-manager", "/security/secure-coding", "/standard-library/overview"]
---

SQLite là database serverless phù hợp cho local app, tool và dữ liệu nhỏ-vừa. Luôn dùng parameterized query:

```python
import sqlite3

with sqlite3.connect("app.db") as connection:
    connection.execute("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT)")
    connection.execute("INSERT INTO users (name) VALUES (?)", ("An",))
```

Không f-string user input vào SQL; đó là SQL injection. Context manager commit khi block thành công và rollback khi exception. Với workload concurrent hoặc production nhiều writer, hiểu transaction isolation, locking và giới hạn SQLite trước khi coi nó là database server tổng quát.
