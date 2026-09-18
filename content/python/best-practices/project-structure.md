---
title: Project structure theo quy mô
description: Chọn layout cho script, library, CLI và ứng dụng lớn dựa trên boundary thật.
slug: /best-practices/project-structure
category: best-practices
categoryLabel: Best practices
order: 1410
difficulty: intermediate
keywords: [project structure, architecture, script, library, CLI, application]
updated: 2026-09-18
related: ["/bat-dau/project-structure", "/module/packages", "/packaging/src-layout"]
---

Script một file nên giữ một file cho đến khi việc tách giúp đọc/test tốt hơn. Library nên có public API ổn định, tests và packaging metadata. CLI nên tách parse arguments, orchestration và domain logic để có thể gọi logic từ test hoặc API khác.

Ứng dụng lớn thường tổ chức theo domain/use case, không phải một folder `utils` chứa mọi thứ. Dependency direction nên dễ nhìn; module cấp thấp không import ngược entrypoint. Khi structure phản ánh boundary thật, refactor ít đau hơn việc áp một template enterprise từ ngày đầu.
