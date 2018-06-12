---
title: Building_Chromium_for_Windows
date: 2018-06-12 14:25:38
tags:
---
[官方文档](https://chromium.googlesource.com/chromium/src/+/master/docs/windows_build_instructions.md#Setting-up-Windows)
请仔细阅读官方文档，如果遇见错误在回来看，以下只写出我编译的时候失败过的地方。

### System requirements
At least 100GB of free disk space on an NTFS-formatted hard drive. FAT32 will not work, as some of the Git packfiles are larger than 4GB.

### Visual Studio
You must install the “Desktop development with C++” component and the “MFC and ATL support” sub-component.  
You must have the version 10.0.17134 Windows 10 SDK installed.这里如果不安装后面编译会找不到某些库。

### depot_tools
下载解压，不可拷贝因为需要隐藏的(.git)文件夹，添加路径到环境变量，满足(at least in front of any directory that might already have a copy of Python or Git)  
因为我们使用depot_tools里面的工具进行下载代码和编译所以( tells depot_tools to use your locally installed version of Visual Studio need add a DEPOT_TOOLS_WIN_TOOLCHAIN system variable in the same way, and set it to 0.)

### Get the code
```CPP
// 因为我是有几个git账号，工作和自己的，所以我没有设置全局的，而是先下载代码，在自己仓库单独配置(在有.git文件夹下去掉--global执行下面命令)
$ git config --global user.name "My Name"
$ git config --global user.email "my-name@chromium.org"
$ git config --global core.autocrlf false
$ git config --global core.filemode false
$ git config --global branch.autosetuprebase always

// 找一个你想下载代码的地方执行创建文件夹用于下载代码
$ mkdir chromium && cd chromium

// 这里是使用的 depot_tools 里面的脚本(也可以下载其它代码，不详细描述)
$ fetch chromium // 下载代码成功很重要，不然你会遇见很多坑，我是弄了很多次，有些网络问题遇见了可以具体配置host(通过网站之家找到延时低的ip)

// 下载完成后会看到一个src文件夹和.gclient文件(我还生成了一个.gclient_entries)因为这个要很久，如果你看到控制台没有动，你可以敲下回车
$ cd src // The remaining instructions assume you have switched to the src directory

// To create a build directory
$ gn gen out/Default

// Using the Visual Studio IDE
$ gn gen --ide=vs out\Default

// Build Chromium 这个要很久
$ ninja -C out\Default chrome

```
[从哪里入手学习](https://www.chromium.org/developers/learning-your-way-around-the-code)