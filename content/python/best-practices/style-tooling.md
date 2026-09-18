---
title: PEP, formatter, linter và type checker
description: PEP 8, PEP 257 và vai trò khác nhau của formatter, linter, type checker trong workflow.
slug: /best-practices/style-tooling
category: best-practices
categoryLabel: Best practices
order: 1430
difficulty: beginner
keywords: [PEP 8, PEP 257, Ruff, Black, mypy, Pyright, formatter, linter]
updated: 2026-09-18
related: ["/typing", "/testing/strategy", "/packaging/pyproject"]
---

PEP là Python Enhancement Proposal; PEP 8 là style guide, PEP 257 nói về docstring. Đây là convention, không phải compiler requirement. Formatter tự động định dạng; linter tìm pattern đáng ngờ; type checker phân tích annotation. Chúng giải quyết các vấn đề khác nhau.

Ruff, Black, mypy và Pyright là third-party tools, không đi kèm Python. Cấu hình trong `pyproject.toml`, chạy trong CI và thống nhất version tool. Đừng dùng lint để thay code review; rule nên giảm noise và bắt lỗi thật.
