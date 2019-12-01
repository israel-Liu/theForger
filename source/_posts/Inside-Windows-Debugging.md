---
title: Inside Windows Debugging
date: 2019-04-15 10:08:21
tags:
---

## Foreword

## Introduction

## A Bit of Background


### chapter 1 Software Development in Windows

#### Windows Evolution

#### Windows Architectrue

#### Windows Developer Interface

#### Microsoft Developer Tools



## Part 2 Debugging for Fun and Profit


### chapter 2 Getting Started

#### Introducing the Debugging Tools


#### User-Mode Debugging
You can use the .symfix debugger command and then reload the symbols(.reload)for all the loaded modules from symbols server.
g, bp, k, kP, kn, .frame, dv("dump local variables"), dt("dump type"), dt pi, dd(每次给出DWORD内存值), du("dump as a Unicode string")
Get sys local var and arg from stack pointer(esp register on x86, rsp register on x64).
ebp(frame pointer register) 存放返回值？还是被调用函数入口点？Save previous frame pointer.
eip(instruction pointer register)存储下一条要执行的指令。
"/” 切换调试模式(assembly vs. source). lm(列出所有加载的符号),!sym(加载的符号是否有争议)
The PDB symbol files contain critical information to enable debugging, 
such as the mappings between function names and their corresponding memory addresses, the types declared in the image, and also source-line information.

#### Kernel-Mode Debugging
Setting Code Breakpoints in Kernel-Mode Memory。

#### Summary
http://msdl.microsoft.com/download/symbols
.sympath SRV*G:\Symbols*http://msdl.microsoft.com/download/symbols
symchk.exe 可以用来下载符号。


### chapter 3 How Windows Debuggers Work


#### User-Mode Debugging
uf debugger command to disassemble the current function.u debugger command to disassemble the code located at that address(可执行文件的代码段)
db (“dump memory as a sequence of bytes”).

#### Kernel-Mode Debugging

#### Managed-Code Debugging

#### Script Debugging

#### Remote Debugging

#### Summary

### Chapter 4 Postmortem Debugging

#### Just-in-Time Debugging

#### Dump Debugging
.lastevent 查找 SEH(结构化异常处理) exceptions。可以使用dump恢复测试。

#### Summary


## Chapter 5 Beyond the Basics


### Noninvasive Debugging


### Data Breakpoints


### Scripting the Debugger
执行脚本命令 $$>< ， 使用 “@!“ 可以给模板符号下断点。
https://blogs.msdn.microsoft.com/debuggingtoolbox/
https://docs.microsoft.com/en-us/windows-hardware/drivers/debugger/pseudo-register-syntax

### WOW64 Debugging


### Windows Debugging Hooks (GFLAGS)
https://docs.microsoft.com/en-us/windows-hardware/drivers/debugger/gflags-flag-table
这个就是设置一些钩子在系统函数，当执行到的时候断掉。

### Summary


## Chapter 6 Code Analysis Tools


### Static Code Analysis
https://docs.microsoft.com/en-us/cpp/c-runtime-library/sal-annotations?view=vs-2019
http://phrack.org/issues/56/8.html#article
OACR stands for Office Auto Code Review
https://docs.microsoft.com/en-us/previous-versions/dotnet/netframework-3.0/bb429476(v=vs.80)
https://github.com/Microsoft/GSL
https://www.nuget.org/packages/Microsoft.Gsl
https://www.nuget.org/packages/Microsoft.CppCoreCheck
https://docs.microsoft.com/en-us/visualstudio/code-quality/code-analysis-for-c-cpp-overview?view=vs-2019


### Runtime Code Analysis


### Summary


## Chapter 7 Expert Debugging Tricks


### Essential Tricks
you can enable using the BreakOnDllLoad Image File Execution Option(IFEO). 
进程启动调试与脚本结合起来。
https://wixtoolset.org/

### More Useful Tricks
sx, sxr, ~9f(9号线程冻结),~9u(unfreeze).freeze 是调试器概念。~n，~m (suspend/resume)是操作系统概念。内核对象保存挂起计数。

### Kernel-Mode Debugging Tricks
eb (“edit byte”), !process -1 0, .reload /user 内核模式调试切换到用户模式调试。
用户模式调试设置(gflags)都在内核代码执行后 hook，所有可以通过(overwrite)修改内核执行来实现类似的调试。

	1: kd> dt nt!_EPROCESS @eax ImageFileName
	+0x16c ImageFileName: [15] "notepad.exe"
	1: kd> .process /r /p @eax
	1: kd> eb @$peb+2 1

“jump to self”

### Summary
http://phrack.org/issues/56/8.html#article

## Chapter 8 Common Debugging Scenarios, Part 1


### Debugging Access Violations
托管代码调用本机代码
https://docs.microsoft.com/en-us/dotnet/standard/native-interop/pinvoke

### Debugging Heap Corruptions
Remember that access violations are raised by the operating system only on access to uncommitted or protected pages.
(!heap -p -a <address_of_corruption>),列出堆分配调用栈。?? sizeof(ntdll!_DPH_BLOCK_INFORMATION)，
dps (“dump memory as a sequence of function pointer values”)， .loadby sos clr，!clrstack(托管代码)。
https://docs.microsoft.com/en-us/dotnet/framework/debug-trace-profile/diagnosing-errors-with-managed-debugging-assistants

### Debugging Stack Corruptions
/GS(Stack Guard). ndps esp L40(用于恢复k命令无法列出的调用栈)

### Debugging Stack Overflows
kf debugger command, which displays the size of the memory consumed by each frame on the call stack,


### Debugging Handle Leaks
!htrace，
https://docs.microsoft.com/zh-cn/windows/desktop/Debug/retrieving-the-last-error-code

### Debugging User-Mode Memory Leaks
UMDH (“user-mode dump heap”) tool


### Debugging Kernel-Mode Memory Leaks
!poolused

### Summary
https://docs.microsoft.com/zh-cn/windows/desktop/Debug/system-error-codes

## Chapter 9 Common Debugging Scenarios, Part 2


## Appendix A WinDbg User-Mode Debugging Quick Start
lm(列出所有加载的模块)，lmv m 模块名(模块参数)，Code(software)Breakpoints(bp), Data(Hardware)Breakpoints(ba r4).
~*k(列出所有线程栈)， kP(显示函数参数)。dv(显示本地变量), dt(类型信息)， .frame (切换帧)， uf, u, ub, d, eb, q, qb


## Appendix B WinDbg Kernel-Mode Debugging Quick Start