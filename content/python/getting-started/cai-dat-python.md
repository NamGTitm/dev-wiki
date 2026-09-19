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

Python cần được cài trên máy trước khi bạn có thể chạy chương trình, cài thư viện hoặc tạo môi trường phát triển riêng cho từng project.

Hiện nay, hãy sử dụng **Python 3** đang còn được hỗ trợ. Không nên cài Python 2 cho project mới vì phiên bản này đã ngừng hỗ trợ từ lâu.

Sau khi cài đặt, mục tiêu của chúng ta là đảm bảo ba thứ:

- Python thực sự chạy được.
- Terminal đang gọi đúng phiên bản Python.
- Mỗi project có môi trường làm việc riêng, tránh thư viện của project này ảnh hưởng project khác.

## Cài Python trên Windows

Cách đơn giản nhất là tải Python từ trang chính thức:

`https://www.python.org/downloads/`

Chạy file cài đặt vừa tải.

Ở màn hình đầu tiên, nên bật tùy chọn:

```text
Add python.exe to PATH
```

Sau đó chọn:

```text
Install Now
```

PATH cho phép Windows tìm thấy Python khi bạn nhập lệnh `python` trong Terminal, PowerShell hoặc Command Prompt.

Sau khi cài xong, mở một cửa sổ terminal mới và kiểm tra:

```bash
python --version
```

Ví dụ:

```text
Python 3.14.0
```

Windows cũng thường cài kèm **Python Launcher**, vì vậy bạn có thể kiểm tra bằng:

```bash
py --version
```

Hoặc xem các phiên bản Python mà launcher nhận diện:

```bash
py -0
```

Nếu máy có nhiều phiên bản Python, `py` thường tiện hơn việc phụ thuộc hoàn toàn vào PATH.

Ví dụ:

```bash
py -3.14
```

sẽ yêu cầu launcher chạy Python 3.14 nếu phiên bản đó đã được cài.

## Cài Python trên macOS

macOS có thể đã chứa một số thành phần liên quan đến Python do hệ thống hoặc công cụ phát triển sử dụng. Không nên dựa vào các bản Python hệ thống cho project của bạn.

Bạn có thể cài Python trực tiếp từ:

`https://www.python.org/downloads/`

Sau khi cài, kiểm tra:

```bash
python3 --version
```

Trên macOS, lệnh phổ biến thường là:

```bash
python3
```

thay vì:

```bash
python
```

Nếu sử dụng Homebrew, bạn cũng có thể cài Python bằng:

```bash
brew install python
```

Sau đó kiểm tra:

```bash
python3 --version
```

## Cài Python trên Linux

Phần lớn distro Linux đã có Python vì nhiều công cụ hệ thống phụ thuộc vào nó.

Kiểm tra trước:

```bash
python3 --version
```

Nếu Python chưa được cài, hãy sử dụng package manager của distro.

Ubuntu hoặc Debian:

```bash
sudo apt update
sudo apt install python3 python3-pip python3-venv
```

Fedora:

```bash
sudo dnf install python3 python3-pip
```

Arch Linux:

```bash
sudo pacman -S python python-pip
```

Sau đó kiểm tra lại:

```bash
python3 --version
```

Một lưu ý quan trọng: **không nên xóa hoặc thay thế Python hệ thống trên Linux chỉ để nâng phiên bản cho project**.

Một số thành phần của hệ điều hành có thể phụ thuộc vào phiên bản Python đó. Nếu cần một phiên bản khác cho project, hãy cài song song hoặc sử dụng công cụ quản lý phiên bản.

## Kiểm tra Python đang được sử dụng

Việc `python --version` chạy thành công chưa có nghĩa terminal đang sử dụng đúng Python mà bạn nghĩ.

Kiểm tra phiên bản:

```bash
python --version
```

Nếu hệ điều hành sử dụng tên `python3`:

```bash
python3 --version
```

Tiếp theo, kiểm tra chính xác executable đang chạy:

```bash
python -c "import sys; print(sys.executable)"
```

Hoặc:

```bash
python3 -c "import sys; print(sys.executable)"
```

Ví dụ trên Windows:

```text
C:\Users\Nam\AppData\Local\Programs\Python\Python314\python.exe
```

Ví dụ trên Linux:

```text
/usr/bin/python3
```

`sys.executable` rất hữu ích khi máy có nhiều bản Python.

Bạn có thể nghĩ `python` đang chạy Python mới cài, nhưng PATH lại trỏ tới một bản khác.

## Kiểm tra pip

`pip` là trình quản lý package phổ biến của Python.

Thay vì gọi trực tiếp:

```bash
pip --version
```

nên dùng:

```bash
python -m pip --version
```

hoặc:

```bash
python3 -m pip --version
```

Cách này đảm bảo `pip` thuộc đúng Python mà bạn đang sử dụng.

Ví dụ:

```bash
python -m pip install requests
```

an toàn hơn:

```bash
pip install requests
```

khi máy có nhiều phiên bản Python.

Bạn cũng có thể nâng cấp pip:

```bash
python -m pip install --upgrade pip
```

## Tạo thư mục project

Không nên viết tất cả chương trình Python vào Desktop hoặc một thư mục dùng chung.

Mỗi project nên có thư mục riêng.

Ví dụ:

```text
python-projects/
└── hello-python/
```

Di chuyển terminal vào project:

```bash
cd hello-python
```

Sau đó có thể tạo file:

```text
main.py
```

Project lúc này:

```text
hello-python/
└── main.py
```

## Tạo môi trường ảo

Một trong những thói quen quan trọng nhất khi làm việc với Python là sử dụng **virtual environment**.

Tạo môi trường ảo:

```bash
python -m venv .venv
```

Hoặc trên hệ thống sử dụng `python3`:

```bash
python3 -m venv .venv
```

Sau đó project sẽ có dạng:

```text
hello-python/
├── .venv/
└── main.py
```

`.venv` chứa một môi trường Python riêng dành cho project hiện tại.

Ví dụ:

Project A cần:

```text
requests 2.x
```

Project B cần một phiên bản khác.

Nếu cả hai dùng Python toàn hệ thống, các dependency rất dễ va vào nhau.

Virtual environment tách chúng ra:

```text
Project A
└── .venv
    └── dependencies của A

Project B
└── .venv
    └── dependencies của B
```

Mỗi project tự quản lý thư viện của mình.

## Kích hoạt môi trường ảo

### Windows Command Prompt

```bat
.venv\Scripts\activate
```

### Windows PowerShell

```powershell
.venv\Scripts\Activate.ps1
```

### macOS và Linux

```bash
source .venv/bin/activate
```

Sau khi kích hoạt, terminal thường hiển thị:

```text
(.venv)
```

Ví dụ:

```text
(.venv) C:\Projects\hello-python>
```

Điều đó cho biết terminal hiện đang sử dụng Python của môi trường ảo.

Kiểm tra:

```bash
python -c "import sys; print(sys.executable)"
```

Kết quả lúc này sẽ trỏ vào `.venv`.

Ví dụ:

```text
C:\Projects\hello-python\.venv\Scripts\python.exe
```

## Cài thư viện vào project

Sau khi môi trường ảo đã được kích hoạt:

```bash
python -m pip install requests
```

Package sẽ được cài vào `.venv`, thay vì môi trường Python toàn hệ thống.

Kiểm tra các package đang có:

```bash
python -m pip list
```

Ví dụ:

```text
Package     Version
----------- -------
pip         25.x
requests    2.x
```

## Thoát khỏi môi trường ảo

Khi làm việc xong:

```bash
deactivate
```

Terminal sẽ quay lại Python mặc định của hệ thống.

Bạn không cần xóa `.venv`.

Lần sau mở project chỉ cần kích hoạt lại môi trường đó.

## Không đưa `.venv` lên Git

Thư mục `.venv` có thể chứa rất nhiều file và phụ thuộc trực tiếp vào hệ điều hành đang sử dụng.

Không nên commit nó vào Git.

Thêm vào `.gitignore`:

```gitignore
.venv/
```

Thông thường repository chỉ lưu source code và danh sách dependency, không lưu toàn bộ virtual environment.

## Khi `python` không tồn tại

Nếu chạy:

```bash
python --version
```

và nhận lỗi kiểu:

```text
python: command not found
```

hãy thử:

```bash
python3 --version
```

Trên Windows, cũng thử:

```bash
py --version
```

Nếu một trong các lệnh trên hoạt động thì Python đã được cài, chỉ khác tên command.

Nếu tất cả đều không hoạt động, Python có thể chưa được cài hoặc chưa nằm trong PATH.

## Khi máy có nhiều Python

Đây là tình huống rất phổ biến.

Ví dụ máy có:

```text
Python 3.12
Python 3.13
Python 3.14
```

Trong trường hợp này, đừng đoán.

Kiểm tra:

```bash
python --version
```

và:

```bash
python -c "import sys; print(sys.executable)"
```

Trên Windows có thể dùng:

```bash
py -0
```

Bạn cần biết rõ ba thứ đang trỏ tới đâu:

```text
python
pip
virtual environment
```

Một lỗi khá khó chịu là:

```text
python -> Python A
pip    -> Python B
```

Khi đó bạn cài package thành công nhưng chương trình vẫn báo:

```text
ModuleNotFoundError
```

Vì package đã được cài vào một Python khác.

Đó cũng là lý do nên dùng:

```bash
python -m pip install ...
```

thay vì chỉ:

```bash
pip install ...
```

## Khi PowerShell không cho kích hoạt `.venv`

Trên Windows, PowerShell đôi khi báo lỗi liên quan đến execution policy khi chạy:

```powershell
.venv\Scripts\Activate.ps1
```

Không nên thay đổi policy toàn hệ thống một cách tùy tiện chỉ để xử lý lỗi này.

Bạn vẫn có thể sử dụng Command Prompt:

```bat
.venv\Scripts\activate
```

Hoặc chạy Python trong virtual environment trực tiếp:

```powershell
.venv\Scripts\python.exe main.py
```

Virtual environment không bắt buộc phải được "activate" mới hoạt động. Activation chủ yếu giúp terminal tự động sử dụng executable bên trong `.venv`.

## Kiểm tra môi trường hoàn chỉnh

Sau khi cài đặt xong, bạn có thể kiểm tra nhanh:

```bash
python --version
python -c "import sys; print(sys.executable)"
python -m pip --version
```

Sau đó tạo môi trường thử nghiệm:

```bash
python -m venv .venv
```

Kích hoạt nó và chạy lại:

```bash
python -c "import sys; print(sys.executable)"
```

Nếu đường dẫn nằm bên trong:

```text
.venv
```

thì môi trường project đã hoạt động đúng.

Một project Python cơ bản lúc này có thể trông như sau:

```text
hello-python/
├── .venv/
├── .gitignore
└── main.py
```

Và workflow thông thường sẽ là:

```text
Cài Python
    ↓
Tạo project
    ↓
Tạo .venv
    ↓
Kích hoạt .venv
    ↓
Cài dependency
    ↓
Viết và chạy code
```

Đây là nền móng nên hình thành ngay từ đầu. Python cho phép chạy một file rất nhanh, nhưng một môi trường sạch sẽ giúp project không biến thành "nồi lẩu dependency" khi bắt đầu lớn lên.