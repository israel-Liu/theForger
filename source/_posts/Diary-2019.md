---
layout: diary
title: Diary-2019
date: 2019-08-11 16:22:24
tags:
---

需要学会怎么写layout，然后让左侧显示时间，右侧显示文本。日记尽量简单，列出关键key。
如何识别还是要研究一下怎么定义格式，然后怎么读取并且显示。

[10/08/2019]
上午:睡懒觉，洗漱，游戏，吃饭。下午:一个C++的讲座视频，TypeScript基本语法学习。

[13/08/2019]
https://reactos.org/

[17/08/2019]
作为接口是否一定需要虚函数。

[18/08/2019]
类型安全，资源管理，异常处理，泛型编程。static type safety and resource safety
使用静态类型检查指针，而不是运行时使用if检查。除运行时赋值的。

https://cppcon.org/conference-program/

[21/08/2019]
http://www.gotw.ca/

[22/08/2019]
Template 参数化类型

[24/08/2019]
window是不是内核对象，应该不是，窗口句柄是在那里管理的。
Professional C++, 4th Edition
Networking All-in-One For Dummies, 7th Edition
Electron in Action
Windows Internals, Part 1, 7th Edition 
Windows 7 Inside Out, Deluxe Edition
Windows Internals, 5th Edition
https://itbook.store/books
https://docs.microsoft.com/en-us/windows-hardware/drivers/kernel/windows-kernel-mode-object-manager
https://blogs.technet.microsoft.com/markrussinovich/2010/02/24/pushing-the-limits-of-windows-user-and-gdi-objects-part-1/
https://en.wikipedia.org/wiki/Object_Manager_(Windows)
Desktop Heap 

[25/08/2019]
https://www.nobelprize.org/

[26/08/2019]
Note that by design of Windows NT, all processes' virtual addresses over 2 GB are mapped globally (that is, are mapped to the same physical addresses in all processes).
https://blogs.technet.microsoft.com/markrussinovich/2008/07/21/pushing-the-limits-of-windows-physical-memory/
https://www.itprotoday.com/compute-engines/inside-nts-object-manager
虚拟地址空间映射，2-4Gb核心空间等同物理空间，用户空间都是2G动态映射物理空间，那我共享的DLL是加载到那里。对象数据呢是几份。
Windows allocates a handle in the handle table of the application’s process and returns the handle value, 
which applications treat as opaque but that is actually the index of the returned handle in the handle table.
Here you can see that a window station the Microsoft Windows Search Service creates to run search filters in, 
window stations for each of the three built-in service accounts (System, Network Service and Local Service
[LUID](https://blogs.msdn.microsoft.com/ntdebugging/2007/01/04/desktop-heap-overview/)service-0x0-3e7$), and Session 0’s interactive window station:
For that reason, the window manager assigns USER object identifiers that are scoped to a window station. 
Unlike USER objects, GDI objects aren’t allocated from desktop heaps; 
instead, on Windows XP and Windows Server 2003 systems that don’t have Terminal Services installed, 
they allocate from general paged pool; on all other systems they allocate from per-session session pool. 
[Managing Virtual Memory](https://docs.microsoft.com/en-us/previous-versions/ms810627%28v%3dmsdn.10%29)
Windows NT provides an independent, 2 gigabyte (GB) user address space for each application (process) in the system.
Instead, each process has a private 32-bit address space from which all of the memory for the process is allocated—including code, 
resources, data, DLLs (dynamic-link libraries), and dynamic memory. 
(Reserved)The function merely makes an entry into the process's virtual address descriptor (VAD) tree.
[Managing Memory-Mapped Files](https://docs.microsoft.com/en-us/previous-versions/ms810613(v%3dmsdn.10))

[28/08/2019]
non-bit-field rvalue

[29/08/2019]
For TriviallyCopyable types, value representation is a part of the object representation.
虚表是编译期确定好的嘛？
https://en.cppreference.com/w/cpp/language/default_comparisons

[30/08/2019]
vscode导入我们整个工程

[01/09/2019]
https://www6.ietf.org/
http://www.rfc-editor.org/info/rfc793
http://dunkels.com/adam/

[02/09/2019]
[prototype page-table entry (PPTE)](https://docs.microsoft.com/en-us/previous-versions/ms810613(v%3dmsdn.10))
Either some interprocess communication (IPC) mechanism or the command line can be used to communicate handle values to child processes.
https://developer.microsoft.com/zh-cn/windows/downloads/windows-10-sdk
https://docs.microsoft.com/en-us/windows-hardware/drivers/download-the-wdk
C:\Users\Israel_Liu\Downloads\Windows Kits\10\WindowsSDK
https://developer.microsoft.com/zh-cn/windows/get-started-windows-10
As with all other regions of memory in a process, the smallest region of committed memory within a heap is one page (4096 bytes).
The default and dynamic heaps are basically the same thing, but the default heap has the special characteristic of being identifiable as the default. 
This is how the C run-time library and the system identify which heap to allocate from. 
https://docs.microsoft.com/en-us/previous-versions/ms810603%28v%3dmsdn.10%29
link32 -dump -headers d:\samples\walker\pwalk.exe
http://dependencywalker.com/
http://www.delorie.com/djgpp/doc/exe/
[PE Format](https://docs.microsoft.com/en-us/windows/win32/debug/pe-format)
WinHelp : HlpViewer .exe /catalogName VisualStudio12 /locale en-us /launchingApp Microsoft, VisualStudio ,12.0
http://hv2.helpmvp.com/doc/vs11helpviewer

[03/09/2019]
https://www.wintellect.com/can-the-vs-debugger-automatically-attach-to-any-child-spawned-by-a-process-being-debugged/
http://www.charlespetzold.com/
两个程序的窗口互相发送消息。内核模式调试窗口过程函数，同一时间运行的线程有限，所以能切换到内核的用户线程也有限。

[04/09/2019]
https://www.e2esoft.com/
http://www.ruankao.org.cn/

[05/09/2019]
https://www.redhat.com/en
dll 静态加载和运行时加载优缺点
https://www.cnblogs.com/chaoyazhisi/p/5421062.html // window 消息值

[08/09/2019]
使用latex排版生成pdf，然后嵌入到markdown网页 {% iframe url [width] [height] %}
[Algorithms](https://docs.google.com/document/d/1KFuRlVRKZaXMP_IgeW_D65cgTILEkpuemHdFDPgOhvI/edit)

[12/09/2019]
https://www-cs-faculty.stanford.edu/~knuth/taocp.html
[Windows Driver Kit documentation](https://docs.microsoft.com/en-us/windows-hardware/drivers/)
[Advanced Configuration and Power Interface (ACPI) ](https://docs.microsoft.com/en-us/windows-hardware/drivers/acpi/)
[Window Stations and Desktops](https://docs.microsoft.com/en-us/windows/win32/winstation/window-stations-and-desktops)
[MSBuild](https://docs.microsoft.com/zh-cn/visualstudio/msbuild/msbuild?view=vs-2019)
[Visual Studio IDE 文档](https://docs.microsoft.com/zh-cn/visualstudio/ide/?view=vs-2019)
[Debug Help Library](https://docs.microsoft.com/en-us/windows/win32/debug/debug-help-library)
[Windows System Information](https://docs.microsoft.com/zh-cn/windows/win32/sysinfo/windows-system-information)
https://kernel.googlesource.com/pub/scm/linux/kernel/git/stable/linux.git/+/refs/heads/master/include/linux
https://docs.microsoft.com/en-us/windows/apps/desktop/modernize/visual-layer-in-desktop-apps
[C++/WinRT](https://docs.microsoft.com/en-us/windows/uwp/cpp-and-winrt-apis/)
https://docs.microsoft.com/en-us/xamarin/mac/get-started/hello-mac
https://docs.microsoft.com/en-us/xamarin/mac/
查看WIN/RT 使用的WINAPI DLL。理解调用层级。

[15/09/2019]
cmd:where cppwinrt
C:\Program Files (x86)\Windows Kits\10\Include\10.0.18362.0\cppwinrt\winrt
C:\Windows\System32\WinMetadata
https://moderncpp.com/
https://dotnet.microsoft.com/apps/xamarin
https://docs.microsoft.com/en-us/windows/uwp/cpp-and-winrt-apis/cpp-value-categories
https://docs.microsoft.com/en-us/windows/uwp/get-started/universal-application-platform-guide
https://docs.microsoft.com/en-us/windows/apps/fluent-design-system
https://docs.microsoft.com/en-us/windows/uwp/design/style/acrylic
> cppwinrt -in Component.winmd -ref local -out Component

[16/09/2019]
https://docs.microsoft.com/en-us/uwp/api/windows.ui.xaml.media.acrylicbrush.-ctor#Windows_UI_Xaml_Media_AcrylicBrush__ctor
https://docs.microsoft.com/en-us/uwp/api/windows.ui.xaml.media
https://docs.microsoft.com/zh-cn/uwp/win32-and-com/win32-apis

Windows Runtime (WinRT) APIs. These APIs are for UWP app development on Windows 10. 通过WindowsApp.lib使用一些winapi。
For convenience, an umbrella library named WindowsApp.lib is provided in the Microsoft Windows Software Development Kit (SDK), 
which provides the exports for this set of Win32 APIs. 
C++/WinRT 通过Language projections使用智能指针方式，包装WinRT类型，希望可以使用现在C++来使用WinRT编写UWP程序。
多个DLL可以导出一个LIB？

[17/09/2019]
https://en.wikipedia.org/wiki/X86_memory_segmentation
https://en.wikipedia.org/wiki/Crt0
https://en.wikipedia.org/wiki/Object_file
https://linker.iecc.com/
https://en.wikipedia.org/wiki/Memory_segmentation#cite_note-:0-2
https://en.wikipedia.org/wiki/Virtual_address_space
https://manybutfinite.com/post/how-the-kernel-manages-your-memory/
Keep in mind that a segment may contain many areas. For example, each memory mapped file normally has its own area in the mmap segment, 
and dynamic libraries have extra areas similar to BSS and data. 
https://en.wikipedia.org/wiki/Memory_segmentation
In a x86-64 architecture it is considered legacy and most x86-64-based modern system software don't use memory segmentation. 
Instead they handle programs and their data by utilizing memory-paging which also serves as a way of memory protection.
这两种的区别是什么，难道说本来exe里面的段映射到虚拟内存中，然后再定位到vm的相应段，那么dll里面的相应段呢？
现在的话就是vm里面的相应段其实就是exe或者dll里面相应段的组合，并不存在vm老概念固定地址的段。

[18/09/2019]
https://docs.microsoft.com/en-us/windows/uwp/get-started/create-a-basic-windows-10-app-in-cpp
https://docs.microsoft.com/en-us/windows/uwp/winrt-components/

[10/09/2019]
[A Tour of the Win32 Portable Executable File Format](https://docs.microsoft.com/en-us/previous-versions/ms809762(v=msdn.10)?redirectedfrom=MSDN)
COFF (an acronym for Common Object File Format). OMF (Object Module Format)
Portable Executable and Common Object File Format.

The Windows loader doesn't need to work extremely hard to create a process from the disk file. 
The loader uses the memory-mapped file mechanism to map the appropriate pieces of the file into the virtual address space. 
Once the module has been loaded, Windows can effectively treat it like any other memory-mapped file.
Relative Virtual Address (RVA).
In executables produced for Windows NT, the default image base is 0x10000. For DLLs, the default is 0x400000. (ImageBase)
Instead, each section table entry stores an address where the file's raw data has been mapped into memory.
They're just really memory ranges in a process's virtual address space.
To calculate the real starting address of a given section in memory, add the base address of the image to the section's VirtualAddress stored in this field.

[21/09/2019]
Debug api 都是怎么用的

[23/09/2019]
unnamed 结构体变量enum类型默认值是啥？

[24/09/2019]
https://gcc.godbolt.org/

[26/09/2019]

[27/09/2019]
object link 和 dll link.不要理解混了。一个是语言一个是系统？

[28/09/2019]
// 公司的也有很多这种代码，老式的一堆函数。每次加一个参数的。
[Variadic Template Refactor](https://youtu.be/VXi0AOQ0PF0?list=PLs3KjaCtOwSZ2tbuV1hx8Xz-rFZTan2J1)

[29/09/2019]
https://www.ibm.com/support/knowledgecenter/SSGH3R_13.1.2/com.ibm.xlcpp131.aix.doc/proguide/cppfilt.html
https://www.ibm.com/support/knowledgecenter/SSGH3R_13.1.2/com.ibm.xlcpp131.aix.doc/proguide/portability.html
https://demangler.com/

[30/09/2019]
[The GNU Binary Utilities](http://web.mit.edu/gnu/doc/html/binutils_toc.html#SEC12)
[GNU Binutils](https://www.gnu.org/software/binutils/)
https://sourceforge.net/projects/gnuwin32/files/
http://gnutoolchains.com/

[06/10/2019]
https://en.cppreference.com/w/cpp/language/typeid
https://en.cppreference.com/w/cpp/types/type_info
https://en.cppreference.com/w/cpp/types/type_info/name
https://en.cppreference.com/w/cpp/numeric/random
https://en.cppreference.com/w/cpp/thread/async
http://gnutoolchains.com/download/
const VS constexpr
[整数数列线上大全](https://oeis.org/)

[30/10/2019]
https://docs.microsoft.com/en-us/visualstudio/msbuild/building-multiple-projects-in-parallel-with-msbuild?view=vs-2019
https://docs.microsoft.com/en-us/visualstudio/msbuild/using-multiple-processors-to-build-projects?view=vs-2019
https://docs.microsoft.com/en-us/visualstudio/msbuild/building-multiple-projects-in-parallel-with-msbuild?view=vs-2019
https://docs.microsoft.com/en-us/visualstudio/msbuild/msbuild-task?view=vs-2019
https://gcc.godbolt.org/

[24/11/2019]
https://zh.wikipedia.org/wiki/%E6%99%AF%E6%B7%B1

[25/11/2019]
高动态范围 (HDR) 图像