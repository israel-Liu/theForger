---
title: Advanced C and C++ Compiling
date: 2017-11-16 15:54:11
tags:
---
1. Creating the source code

## 2. Compiling [Precompiled](https://docs.microsoft.com/en-us/cpp/preprocessor/phases-of-translation)
[Compiler](https://en.wikipedia.org/wiki/Compiler)
[Modern Compiler Design](https://books.google.com/books?id=zkpFTBtK7a4C&printsec=frontcover&dq=compiler+design+pdf&hl=en&sa=X&ved=2ahUKEwiU2trIzvLjAhVPs54KHaI6CC0Q6AEwAXoECAUQAg#v=onepage&q=compiler%20design%20pdf&f=false)
编译器分三个阶段处理:front end -> middle end -> back end

Front end: Preprocessing, lexical analysis, syntax analysis, semantic analysis. 
Middle end: Analysis, Optimization
Back end: Code generation

3. Linking
4. Loading
5. Executing


## Chapter 1 Multitasking OS Basics
动态链接库加载到进程模型的时候，数据区和命令区都是统一存放的吗。如何分离数据和指令的。
The program binaries carry the details of the blueprint of the running process memory map.
https://manybutfinite.com/post/anatomy-of-a-program-in-memory/


### The Roles of Binaries, Compiler, Linker, and Loader
编译器负责生成二进制文件，连接器把他们连接生成可执行文件。加载器打开二进制文件读取信息映射到进程。populates the process memory map structure.


## Chapter 2 Simple Program Lifetime Stages
对象文件基本确定了最后二进制文件需要的东西。所以理论上一个对象文件可以是一个可执行文件。多个好管理但需要拼装。



## Chapter 3 Program Execution Stages
真正跑起来的时候才加载到进程map，前面load只是填充信息结构体。调用main之前做了一些系统函数调用。做准备工作。



## Chapter 4 The Impact of Reusing Concept
静态连接可以是ob文件直接被连接器连接到目标文件，也可以是先打包ob文件然后连接到目标文件。最后都是各段拼到各段。
LoadLibrary是在运行时加载到进程空间(process memory map)。#pragma comment ( lib,"xxx.lib" )和工程中设置是一样的。
静态链接库中在client bin 文件中不适用的函数并不连接进去的。当然单位是ob文件。也就是说使用一个ob文件的一个函数，就包含整个ob文件。

An interesting twist happens when the static library’s functionality needs to be presented to the binary clients through the intermediary dynamic library


## Chapter 5 Working with Static Libraries
静态库被连接的时候，只连接那些真正被使用的ob文件。


## Chapter 6 Designing Dynamic Libraries: Basics
静态方式动态库加载应该就是使用宏命令 #pragma comment(lib, "<import library name, full path, or relative path>");
和工程中设置，动态方式加载动态库，就是使用LoadLibrary函数了。


## Chapter 7 Locating the Libraries
系统会预加载一些库，程序运行的时候就不需要再加载了。这种方式可以动态替换程序要加载的库版本。



## Chapter 8 Designing Dynamic Libraries: Advanced Topics
就是讲动态链接库符号地址定位问题，生成的汇编需要使用绝对地址。所以需要链接器和加载器配合重现定位动态链接库里面的符合地址。



## Chapter 9 Handling Duplicate Symbols When Linking In Dynamic Libraries
静态链接库不允许重复符合出现，可执行文件，静态连接，动态连接顺序使用符号。(VS上如果dll先于lib那么会报错，反过来dll被忽略)
两个动态连接库，谁先连接就使用谁的符号。当一个动态连接库导出符号和另外一个动态链接库 static 函数重复时候，二进制使用导出的符号，
但是在包含 static 函数的动态链接库内部还是使用自己的 static 函数，因为是很早就编译好的。都是本地 static 不会发生链接冲突。
The ultimate solution to the problem would be to host the singleton class in a dynamic library. ？？？解决单例


## Chapter 10 Dynamic Libraries Versioning
使用软连接避免频繁升级动态链接库，soname 就有主版本号。各种技术解决在有更改的时候如何不影响在使用的。包括接口删除添加更改符号等等。


## Chapter 11 Dynamic Libraries: Miscellaneous Topics
