---
title: Windows via C/C++
date: 2018-12-14 10:49:34
tags:
---

### Chapter 3 : 内核对象
内核对象与创建它的进程相关联，进程句柄表里面保存地址。跨进程边界共享内核对象，还需要一种IPC把对象传递过去？还是传递的进程对象。

### 第二部分 工作机理

### Chapter 4 : [进程](https://docs.microsoft.com/en-us/windows/desktop/procthread/processes-and-threads)
我们的应用程序应该是系统 explorer 调用了 CreateProcess 函数创建了进程。ShellExecuteEx 是不是也通过 explorer 调用了 CreateProces ？
There are other techniques you can use in the place of multithreading. [Process Status API](https://docs.microsoft.com/en-ca/windows/desktop/psapi/process-status-helper)     
The most significant of these are as follows: asynchronous input and output (I/O), I/O completion ports, asynchronous procedure calls (APC), and the ability to wait for multiple events.
[Tool Help Library](https://docs.microsoft.com/en-ca/windows/desktop/ToolHelp/tool-help-library) 用来枚举所有进程。
CreateProcess 子进程指定App, 会从main函数开始执行？。
[共享内存](https://docs.microsoft.com/en-ca/windows/desktop/Memory/file-mapping)
[IPC](https://docs.microsoft.com/en-ca/windows/desktop/ipc/interprocess-communications)  [Pipes](https://docs.microsoft.com/en-ca/windows/desktop/ipc/pipes)
Do not terminate a process unless its threads are in known states. 
If a thread is waiting on a kernel object, it will not be terminated until the wait has completed. 
This can cause the application to stop responding. (停止响应)

### Chapter 5 : 作业
可以用来停止相关联的进程。对进程设置限制条件。没细看，需要再看。[Tool Help Library](https://docs.microsoft.com/en-ca/windows/desktop/ToolHelp/tool-help-library)

### Chapter 6 : [线程基础](https://docs.microsoft.com/en-us/windows/desktop/procthread/processes-and-threads)
主线程入口点函数为crt运行库调用的main函数（名字可以自定义），工作线程入口点函数在创建的时候设置，为线程起始地址。从这个函数开始执行，到这个函数结束线程结束运行。   
同一个进程中的线程可以访问其它线程的栈？虽然内存都是一块，堆栈什么的都是从同一个进程那分来的。什么技术访问别的线程的栈。tls干啥的来着。链接器的 /STACK 开关可以控制主线程默认栈大小。 

### Chapter 7 : 线程调度, 优先级和关联性
进程优先级类下分线程优先级(The priority class and priority level are combined to form the base priority of a thread.)    
Distinguish tasks of varying priority. For example, a high-priority thread manages time-critical tasks, and a low-priority thread performs other tasks.

### Chapter 8 : [用户模式下的线程同步](https://docs.microsoft.com/en-gb/windows/desktop/Sync/synchronization)
有键事件类型的内核对象名叫 \KernelObjects\CritSecOutOfMemoryEvent 它的一个实例能够同步不同的线程组，每组由一个指针大小的key来标识和阻挡。 
A single thread can initiate multiple time-consuming I/O requests that can run concurrently using asynchronous I/O. 单线程异步？借助系统线程。
管道可以和完成端口结合使用，管道用于IPC完成端口用于异步IO。这里需要使用线程同步？

### Chapter 9 : 用内核对象进行线程同步
WaitForMultipleObjects只等待一个对象有信号的时候，再次调用的时候要去掉已经触发的句柄，防止立刻返回无法正常工作。
回调函数是调用线程调用后加入被调用线程的APC队列，由被调用线程执行的？是否立即响应 
还是说回调函数不过是调用线程执行我模块的代码而已。我调用底层代码也是我的线程执行底层代码。
如果说各自执行代码，那什么时候出现交流的，难道是系统控制异步？

### Chapter 10 : 同步设备 I/O 与 异步设备 I/O 
OVERLAPPED对象要防止在设备驱动实际完成IO返回前被析构。在必须同步的地方调用等待函数。

### Chapter 11 : Windows 线程池
线程池就是一组帮助做事的线程，可以和很多功能结合工作，比如timer。

### Chapter 12 : 纤程
主要是为了移植UNIX上的程序，因为他们单线程也可以多任务。Windows上的程序尽量用多线程。

### 第三部分 内存管理

### Chapter 13 : Windows 内存体系结构
空指针赋值区域 0x00000000 - 0x0000FFFF 就是NULL指向的区域？当用户地址大于2G的时候系统最多使用64G内存，使用默认2G的是最多使用128G内存？？？   
内核模式分区为所有进程共有？那么物理内存如何映射，不同进程的线程同时访问，系统如何保证不出错。  ？？？ 
因为连接器对PE文件进行了压缩， 并且PE文件加载到内存的时候每段必须另起一页，起始地址必须是系统分页大小的整数倍，所以PE文件所需要的虚拟内存一般大于文件本身大小。   
数据对齐？WORD类型应该是2的倍数？DWORD是4的倍数？字节和页大小4K有啥关系？这里各种大小完全搞晕掉了？

### Chapter 14 : 探索虚拟内存
非统一内存访问(Non-Uniform Memory Access) 简称 NUMA 看不懂干啥的？

### Chapter 15 : 在应用程序中使用虚拟内存
使用异常处理来选设备，初始化时候选择一次设备，后面直接使用如果返回错误再去选择设备。

### Chapter 16 : 线程栈
看的不够仔细，其实也没啥东西，就是个分配大小和溢出。

### Chapter 17 : 内存映射文件


看完这本书后，学习编译原理，调试技术，网络知识，算法知识，最后是语言最新技术。期间注意实践，写写轮子刷刷题什么的。
PS : 英文要提高啊。