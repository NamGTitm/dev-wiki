---
title: Performance profiling
description: Đo bottleneck bằng workload đại diện và tối ưu thời gian, bộ nhớ có bằng chứng.
slug: /cpp/ky-thuat/profiling-performance
category: engineering
categoryLabel: Kỹ nghệ phần mềm C++
order: 24080
difficulty: advanced
keywords: [profiling C++, performance, benchmark, CPU profiler, memory profiler, optimization]
updated: 2026-10-20
collection: cpp
collectionLabel: C++
collectionDescription: Cách xây dựng, kiểm tra, debug và bảo vệ ứng dụng C++ có thể bảo trì.
related: ["/cpp/thuat-toan/do-phuc-tap", "/cpp/thuat-toan/bit-manipulation", "/cpp/ky-thuat/concurrency"]
---

Profiling đo nơi chương trình dùng CPU, bộ nhớ hoặc I/O. Dùng nó để chọn optimization có tác động; benchmark nhỏ không đại diện workload thật nếu input, compiler flags hoặc môi trường khác.

## Quy trình

- Đặt mục tiêu: latency, throughput, peak memory hoặc thời gian build.
- Chuẩn bị input và build tái lập; ghi compiler, chuẩn, optimization flags và máy.
- Đo baseline nhiều lần, kiểm soát nhiễu và chọn percentile phù hợp.
- Dùng profiler để tìm hotspot; tối ưu một điểm rồi đo lại.
- Giữ test correctness và kiểm tra tài nguyên khác có bị đánh đổi không.

## Dụng cụ

- Linux: `perf`, `callgrind`, heap profilers tùy môi trường.
- macOS: Instruments.
- Windows: Visual Studio Performance Profiler.
- Compiler có sanitizer/coverage/profiling flags; dùng cấu hình tương ứng toolchain.

## Microbenchmark

Khi đo hàm nhỏ, tránh compiler loại bỏ phép tính hoặc benchmark chính phần setup. Dùng dữ liệu đại diện, chạy đủ lâu, tránh so sánh các build có optimization khác nhau. Benchmark micro hữu ích để điều tra, chưa đủ để khẳng định toàn ứng dụng nhanh hơn.

## Lỗi thường gặp

- Tối ưu theo cảm giác hoặc một lần chạy.
- Đo debug build rồi áp kết quả vào release.
- Bỏ tính đúng hoặc memory use để tăng tốc không đáng kể.
- Benchmark code compiler có thể constant-fold hoặc loại bỏ.

## Tự luyện

So sánh tìm kiếm tuyến tính với binary search qua nhiều truy vấn trên cùng dữ liệu. Tính cả chi phí sort một lần; chọn theo số truy vấn thực tế.

## Đọc tiếp

Bắt đầu từ [Big O](/cpp/thuat-toan/do-phuc-tap), sau đó xem [tối ưu bộ nhớ](/cpp/thuat-toan/bit-manipulation) và [concurrency](/cpp/ky-thuat/concurrency).
