---
title: Windows Internals
date: 2017-11-16 15:15:42
tags:
---

# Introduction

# Chapter 1 Concepts and Tools 1

## Windows Operating System Versions. 1

## Foundation Concepts and Terms. 2

### Windows API. 2
Is the user-mode system programming interface to the Windows operating system family.

```
	■■ Base Services
	■■ Component Services
	■■ User Interface Services
	■■ Graphics and Multimedia Services
	■■ Messaging and Collaboration
	■■ Networking
	■■ Web Services
	
```

### Services, Functions, and Routines. 4
Note that nonexecutable .NET assemblies are compiled as DLLs but without any exported subroutines. 
Instead, the CLR parses compiled metadata to access the corresponding types and members.

### Processes, Threads, and Jobs. 5
A program is a static sequence of instructions, 
whereas a process is a container for a set of resources used when executing the instance of the program.

```
	// 进程包括: (communication ports) 肯定是IPC用的。
	■■ A private virtual address space, which is a set of virtual memory addresses that the process can use
	■■ An executable program, which defines initial code and data and is mapped into the process’ virtual address space
	■■ A list of open handles to various system resources—such as semaphores, communication ports, and files—that are accessible to all threads in the process
	■■ A security context called an access token that identifies the user, security groups, privileges, 
	   User Account Control (UAC) virtualization state, session, and limited user account state associated with the process
	■■ A unique identifier called a process ID (internally part of an identifier called a client ID)
	■■ At least one thread of execution (although an “empty” process is possible, it is not useful)

```
The volatile registers, stacks, and private storage area are called the thread’s context.(Wow64GetThreadContext)
用户线程的 dedicated kernel-mode thread ？ 是一一对应的？用于用户态和内核态线程切换。

### Virtual Memory . 15
系统内存管理可以把暂时不运行的虚拟内存map到磁盘上。用户无需关心物理内存和磁盘之间的内存转换。
From 0x00000000 through 0x7FFFFFFF(用户), the upper half, addresses 0x80000000 through 0xFFFFFFFF(系统)
Address Windowing Extension (AWE), which allows a 32-bit application to allocate up to 64 GB
of physical memory and then map views, or windows, into its 2-GB virtual address space.

### Kernel Mode vs. User Mode. 17
对 access to all system memory and all CPU instructions 权限不同。
x64, x86 共提供4个级别, Win内核模式工作在CPU级别 level 0 (or ring 0), 用户模式工作在 level 3 (or ring 3).
用户进程单享VM，the kernel-mode operating system and device driver code share a single virtual address space.
A transition from user mode to kernel mode (and back) does not affect thread scheduling per se—a mode transition is not a context switch.
都是同一个线程在运行？只是模式不同？

### Terminal Services and Multiple Sessions. 20
切换用户后 the current session processes remains active in the system。

### Objects and Handles. 21
系统提供对象管理器组件:

```
	■■ Providing human-readable names for system resources
	■■ Sharing resources and data among processes
	■■ Protecting resources from unauthorized access
	■■ Reference tracking, which allows the system to know when an object is no longer in use so that it can be automatically deallocated
```
handles (references to an instance of an object).

### Security . 22
非常重要，但是目前很少关心，都是系统默认行为。

### Registry . 23
系统数据库，包括启动系统配置，和应用程序配置。

### Unicode. 24
Windows most internal text strings are stored and processed as 16-bit-wide Unicode characters.(所以使用宽字符API避免转换)

## Digging into Windows Internals. 24

### Performance Monitor. 25

### Kernel Debugging. 26
Symbol files contain the names of functions and variables and the layout and format of data structures.

### Windows Software Development Kit. 31
现在vs已经不是使用单独的副本了，放到同一个位置。

### Windows Driver Kit . 31

### Sysinternals Tools. 32

## Conclusion. 32

# Chapter 2 System Architecture 33

## Requirements and Design Goals . 33
Extensibility, Portability, Reliability and robustness, Compatibility, Performance

## Operating System Model. 34
system support processes, service processes, user applications, 
and environment subsystems each have their own private process address space.

## Architecture Overview. 35

### Portability. 37
分层设计，Ntoskrnl.exe architecture-specific 线程调度，HAL 用于剥离硬件。

### Symmetric Multiprocessing. 38


### Scalability. 40

### Differences Between Client and Server Versions. 41
The number of processors supported (in terms of sockets, not cores or threads)。
The number of concurrent network connections supported。

### Checked Build. 45

## Key System Components. 46

### Environment Subsystems and Subsystem DLLs . 48
[Depends.exe](http://www.dependencywalker.com/)
POSIX “a portable operating system interface based on UNIX”

### Ntdll.dll. 53
Ntdll also contains many support functions start with (Ldr, Csr, Rtl, DbgUi, Etw ...)

### Executive. 54
The Windows executive is the upper layer of Ntoskrnl.exe(就是对应内核的Ntoskrnl.exe)

### Kernel. 57
!pcr and !prcb kernel debugger commands。

### Hardware Abstraction Layer. 60
lm vm hal, 

### Device Drivers. 63
There are several types of device drivers:
```
	■■ Hardware device drivers manipulate hardware (using the HAL) to write output to or retrieve input
	   from a physical device or network. There are many types of hardware device drivers,
	   such as bus drivers, human interface drivers, mass storage drivers, and so on.
	■■ File system drivers are Windows drivers that accept file-oriented I/O requests and translate
	   them into I/O requests bound for a particular device.
	■■ File system filter drivers, such as those that perform disk mirroring and encryption,
	   intercept I/Os, and perform some added-value processing before passing the I/O to the next layer.
	■■ Network redirectors and servers are file system drivers that transmit file system I/O requests to
	   a machine on the network and receive such requests, respectively.
	■■ Protocol drivers implement a networking protocol such as TCP/IP, NetBEUI, and IPX/SPX.
	■■ Kernel streaming filter drivers are chained together to perform signal processing on data
	   streams, such as recording or displaying audio and video.
```
	A bus driver is concerned with reporting the devices on its bus to the PnP manager,
	A function driver manipulates the device.
	Lower-level filter drivers modify the behavior of device hardware.
	Upper-level filter drivers usually provide added-value features for a device.
	<Prefix><Operation><Object>

### System Processes. 68
create system threads during system initialization to perform operations that require thread context.
The default SAS on Windows is the combination Ctrl+Alt+Delete.

## Conclusion. 78

# Chapter 3 System Mechanisms 79

## Trap Dispatching. 79
Windows then creates a trap frame on the kernel stack of the interrupted thread into which it stores the execution state of the thread.
The kernel handles software interrupts either as part of hardware interrupt handling or 
synchronously when a thread invokes kernel functions related to the software interrupt.

### </>Interrupt Dispatching . 81
Trap dispatching, including interrupts, deferred procedure calls (DPCs), asynchronous procedure calls (APCs), exception dispatching, and system service dispatching
Hardware Interrupt Processing 使用 interrupt dispatch table (IDT) 分发(03: fffff80001a7f280 nt!KiBreakpointTrap), interrupt request (IRQ).interrupt service routine (ISR)
x86 Interrupt Controllers 依赖 Programmable Interrupt Controller (PIC), Advanced Programmable Interrupt Controller (APIC);slave
IA64 Interrupt Controllers 工作在 Streamlined Advanced Programmable Interrupt Controller (SAPIC),
Software Interrupt Request Levels (IRQLs) the HAL maps hardware-interrupt numbers to the IRQLs.
As a kernel-mode thread runs, it raises or lowers the processor’s IRQL either directly by calling KeRaiseIrql and KeLowerIrql or, 
more commonly, indirectly via calls to functions that acquire kernel synchronization objects.
processor control region (PCR), processor region control block (PRCB), interprocessor interrupt (IPI)
translation look-aside buffer (TLB) cache。[bus driver]interrupt requests (IRQs) defined by interrupt controllers
The kernel uses software interrupts (described later in this chapter) to initiate thread scheduling and to asynchronously break into a thread’s execution.
[看到111]Then it calls a Plug and Play interrupt arbiter, which maps interrupts to IRQLs.
Because accessing a PIC is a relatively slow operation, HALs that require accessing the I/O bus to change IRQLs,
such as for PIC and 32-bit Advanced Configuration and Power Interface (ACPI) systems,
implement a performance optimization, called lazy IRQL, that avoids PIC accesses.
当硬件中断发生的时候中断到可编程控制的某一行，然后控制再中断处理器在某一行，因为都是指令控制的。
然后处理器查询控制器获取中断请求，查询控制器把irq映射为数字，使用数字查找IDT，找到对应的控制函数。函数谁来调用？处理器还是可编程中断控制器？
In addition, each processor has an IRQL setting that changes as operating system code executes.
(处理器当前中断级别决定了是否接收新的中断，接收更改级别的，保存当前低优先级中断的信息，那如果后来的是低优先级的呢，不管了吗，存那里held back until the IRQL drops)
APC level can be considered a thread-local rather than processor-wide IRQL.(Software interrupts)
it is important to note that Windows is not a real-time operating ??? 哈哈

Dispatch or Deferred Procedure Call (DPC) Interrupts。当前调用执行较深，等待当前任务完成。调高irql让当前线程不立刻执行dpc，执行完当前任务降低irql取出dpc执行。
DPC routines that are waiting to execute are stored in kernel-managed queues, one per processor, called DPC queues.
只要开始处理队列中的 DPC 那么知道全部处理结束，才降低 IRQL，Let regular thread execution continue。
Because the DPC interrupt has a lower priority than do device interrupts, any pending device interrupts 
that surface before the clock interrupt completes are handled before the DPC interrupt occurs.

Asynchronous procedure calls (APCs) the APC queue is thread-specific—each thread has its own APC queue.
When asked to queue an APC, the kernel inserts it into the queue belonging to the thread that will execute the APC routine.
There are two kinds of APCs: kernel mode and user mode. 
Kernel-mode APCs don’t require permission from a target thread to run in that thread’s context, while user-mode APCs do.
user-mode APCs 当线程空闲或者挂起的时候开始执行？可以直接执行也可以取 APC 队列？
If the thread is in a wait state when an APC is delivered, after the APC routine completes, the wait is reissued or re-executed.

### Timer Processing. 112
PIT (Programmable Interrupt Timer)， RTC (Real Time Clock).

### Exception Dispatching. 123
Examples of architecture-independent exceptions that the kernel defines include memory-access violations, 
integer divide-by-zero, integer overflow, floating-point exceptions, and debugger breakpoints.
A stack frame can have one or more exception handlers associated with it, 
each of which protects a particular block of code in the source program.
(异常发生的时候沿着栈帧往上找，知道有关联的异常处理程序，否则调用默认的异常处理程序)
For 64-bit applications, structured exception handling does not use frame-based handlers. 
Instead, a table of handlers for each function is built into the image during compilation.
Another mechanism of exception handling is called vectored exception handling. (向量化异常处理)
This method can be used only by user-mode applications.

异常最后到系统启动函数，启动函数不处理的异常调用 WerFault.exe checks the contents of the HKLM\SOFTWARE\Microsoft\Windows NT
\CurrentVersion\AeDebug registry key and makes sure that the process isn’t on the exclusion list.

### System Service Dispatching. 132
The system service number is passed in the EAX processor register, and the EDX register points to the list of caller arguments.

## Object Manager . 140
Windows has three kinds of objects: executive objects, kernel objects, and GDI/User objects.

### Executive Objects. 143
Windows subsystem supplies named pipes and mailslots, resources that are based on executive file objects.

### Object Structure. 145
In addition to an object header, each object has an object body whose format and contents are unique to its object type;
Referring to an object by its handle is faster than using its name because the object manager can skip the name lookup and find the object directly.

## Synchronization. 176
The kernel provides mutual-exclusion primitives that it and the rest of the executive use to synchronize their access to global data structures.

### High-IRQL Synchronization. 178
Therefore, any other part of the kernel that uses the dispatcher database raises the IRQL to DPC/dispatch level, 
masking DPC/dispatch-level interrupts before using the dispatcher database.

### Low-IRQL Synchronization. 183
When the resource is acquired exclusively by more than one thread, the resource uses the mutex because it permits only one owner. 
When the resource is acquired in shared mode by more than one thread, the resource uses a semaphore because it allows multiple owner counts.

## System Worker Threads. 205
If there aren’t any more, the system worker thread blocks until a work item is placed on the queue.

## Windows Global Flags. 207

## Advanced Local Procedure Call. 209

### Connection Model. 210

### Message Model . 211
Standard double-buffering mechanism copying it from the source process, switches to the target process, and copies the data from the kernel’s buffer.

### Asynchronous Operation. 213

### Views, Regions, and Sections. 214

### Attributes. 215

### Blobs, Handles, and Resources . 215

### Security . 216

### Performance. 217

### Debugging and Tracing . 218

## Kernel Event Tracing. 220
tracerpt DataCollector01.etl –o dumpfile.csv –of CSV

## Wow64. 224
Wow64 Process Address Space Layout . 224
System Calls. 225
Exception Dispatching. 225
User APC Dispatching. 225
Console Support. 225
User Callbacks. 226
File System Redirection. 226
Registry Redirection . 227
I/O Control Requests. 227
16-Bit Installer Applications. 228
Printing. 228
Restrictions. 228
User-Mode Debugging. 229
Kernel Support. 229
Native Support. 230
Windows Subsystem Support . 232
Image Loader. 232
Early Process Initialization . 234
DLL Name Resolution and Redirection . 235
Loaded Module Database . 238
Import Parsing. 242
Post-Import Process Initialization. 243
SwitchBack. 244
API Sets . 245
Hypervisor (Hyper-V). 248
Partitions. 249
Parent Partition. 249
Child Partitions. 251
Hardware Emulation and Support . 254
Kernel Transaction Manager. 268
Hotpatch Support. 270
Kernel Patch Protection. 272
Code Integrity. 274
Conclusion. 276

# Chapter 4 Management Mechanisms 277
The Registry. 277
Viewing and Changing the Registry. 277
Registry Usage. 278
Registry Data Types. 279
Registry Logical Structure. 280
Transactional Registry (TxR). 287
Monitoring Registry Activity. 289
Process Monitor Internals. 289
Registry Internals. 293
Services. 305
Service Applications. 305
The Service Control Manager . 321
Service Startup. 323
Startup Errors. 327
Accepting the Boot and Last Known Good. 328
Service Failures. 330
Service Shutdown. 331
Shared Service Processes. 332
Service Tags. 335
Unified Background Process Manager. 336
Initialization. 337
UBPM API . 338
Provider Registration. 338
Consumer Registration. 339
Task Host. 341
Service Control Programs. 341
Windows Management Instrumentation. 342
Providers. 344
The Common Information Model and the Managed
Object Format Language. 345
Class Association . 349
WMI Implementation. 351
WMI Security. 353
Windows Diagnostic Infrastructure . 354
WDI Instrumentation. 354
Diagnostic Policy Service. 354
Diagnostic Functionality. 356
Conclusion. 357

# Chapter 5 Processes, Threads, and Jobs 359

## Process Internals. 359

### Data Structures. 359
EPROCESS 关联的数据除了PEB在 process address space 大部分存在于 system address space.

### Protected Processes. 368

Flow of CreateProcess. 369
Stage 1: Converting and Validating Parameters and Flags. 371
Stage 2: Opening the Image to Be Executed . 373
Stage 3: Creating the Windows Executive Process
Object (PspAllocateProcess). 376
Stage 4: Creating the Initial Thread and Its Stack and
Context. 381
Stage 5: Performing Windows Subsystem–Specific
Post-Initialization. 383
Stage 6: Starting Execution of the Initial Thread. 385
Stage 7: Performing Process Initialization in the Context
of the New Process . 386
Thread Internals . 391
Data Structures. 391
Birth of a Thread . 398
Examining Thread Activity. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .398
Limitations on Protected Process Threads. 401
Worker Factories (Thread Pools) . 403
Thread Scheduling. 408
Overview of Windows Scheduling . 408
Priority Levels. 410
Thread States . 416
Dispatcher Database. 421
Quantum. 422
Priority Boosts. 430
Context Switching. 448
Scheduling Scenarios. 449
Idle Threads. 453
Thread Selection. 456
Multiprocessor Systems. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .458
Thread Selection on Multiprocessor Systems. 467
Processor Selection. 468
Processor Share-Based Scheduling. 470
Distributed Fair Share Scheduling. 471
CPU Rate Limits . 478
Dynamic Processor Addition and Replacement . 479
Job Objects . 480
Job Limits. 481
Job Sets. 482
Conclusion. 485

# Chapter 6 Security 487
Security Ratings. 487
Trusted Computer System Evaluation Criteria. . . . . . . . . . . . . . . . . .487
The Common Criteria. 489
Security System Components. 490
Protecting Objects. 494
Access Checks. 495
Security Identifiers. 497
Virtual Service Accounts. 518
Security Descriptors and Access Control. 522
The AuthZ API. 536
Account Rights and Privileges . 538
Account Rights. 540
Privileges. 540
Super Privileges . 546
Access Tokens of Processes and Threads. 547
Security Auditing. 548
Object Access Auditing. 549
Global Audit Policy . 552
Advanced Audit Policy Settings. 554
Logon. 555
Winlogon Initialization. 556
User Logon Steps. 558
Assured Authentication. 562
Biometric Framework for User Authentication. 563
User Account Control and Virtualization. 566
File System and Registry Virtualization. 566
Elevation . 573
Application Identification (AppID). 581
AppLocker . 583
Software Restriction Policies. 589
Conclusion. 590

# Chapter 7 Networking 591
Windows Networking Architecture. 591
The OSI Reference Model. 592
Windows Networking Components. 594
Networking APIs. 597
Windows Sockets. 597
Winsock Kernel. 603
Remote Procedure Call. 605
Web Access APIs. 610
Named Pipes and Mailslots. 612
NetBIOS. 618
Other Networking APIs. 620
Multiple Redirector Support. 627
Multiple Provider Router . 627
Multiple UNC Provider. 630
Surrogate Providers. 632
Redirector. 633
Mini-Redirectors. 634
Server Message Block and Sub-Redirectors. 635
Distributed File System Namespace . 637
Distributed File System Replication. 638
Offline Files . 639
Caching Modes. 641
Ghosts . 643
Data Security. 643
Cache Structure . 643
BranchCache. 645
Caching Modes. 647
BranchCache Optimized Application Retrieval:
SMB Sequence. 651
BranchCache Optimized Application Retrieval:
HTTP Sequence. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .653
Name Resolution. 655
Domain Name System. 655
Peer Name Resolution Protocol. . . . . . . . . . . . . . . . . . . . . . . . . . . . . .656
Location and Topology. 658
Network Location Awareness . 658
Network Connectivity Status Indicator . 659
Link-Layer Topology Discovery. 662
Protocol Drivers. 663
Windows Filtering Platform. 666
NDIS Drivers. 672
Variations on the NDIS Miniport. 677
Connection-Oriented NDIS. 677
Remote NDIS. 680
QoS. 682
Binding. 684
Layered Network Services. 685
Remote Access. 685
Active Directory. 686
Network Load Balancing. 688
Network Access Protection . 689
Direct Access. 695
Conclusion. 696
Index. 697

# Chapter 8 I/O System 1
I/O System Components. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1
The I/O Manager. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 3
Typical I/O Processing. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 4
Device Drivers. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 5
Types of Device Drivers. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 5
Structure of a Driver . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 12
Driver Objects and Device Objects. . . . . . . . . . . . . . . . . . . . . . . . . . . . 14
Opening Devices . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 19
I/O Processing. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 25
Types of I/O. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 25
I/O Request to a Single-Layered Driver. . . . . . . . . . . . . . . . . . . . . . . . 33
I/O Requests to Layered Drivers. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 40
I/O Cancellation. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 48
I/O Completion Ports . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 53
I/O Prioritization. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 58
Container Notifications. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 65
Driver Verifier. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 65
Kernel-Mode Driver Framework (KMDF). . . . . . . . . . . . . . . . . . . . . . . . . . . . 68
Structure and Operation of a KMDF Driver. . . . . . . . . . . . . . . . . . . . . 68
KMDF Data Model. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 70
KMDF I/O Model. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 74
User-Mode Driver Framework (UMDF). . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 78
The Plug and Play (PnP) Manager. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 81
Level of Plug and Play Support. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 82
Driver Support for Plug and Play . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 82
Driver Loading, Initialization, and Installation . . . . . . . . . . . . . . . . . . 84
Driver Installation. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 94
The Power Manager. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 98
Power Manager Operation. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 100
Driver Power Operation. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 101
Driver and Application Control of Device Power. . . . . . . . . . . . . . . 105
Power Availability Requests. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 105
Processor Power Management (PPM). . . . . . . . . . . . . . . . . . . . . . . . 108
Conclusion. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 123

# Chapter 9 Storage Management 125
Storage Terminology. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 125
Disk Devices. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 126
Rotating Magnetic Disks. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 126
Solid State Disks. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 128
Disk Drivers . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 131
Winload. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 132
Disk Class, Port, and Miniport Drivers. . . . . . . . . . . . . . . . . . . . . . . . 132
Disk Device Objects. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 136
Partition Manager. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 138
Volume Management. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 138
Basic Disks. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 139
Dynamic Disks. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 141
Multipartition Volume Management. . . . . . . . . . . . . . . . . . . . . . . . . 147
The Volume Namespace. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 153
Volume I/O Operations. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 159
Virtual Disk Service. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 160
Virtual Hard Disk Support. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 162
Attaching VHDs. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 163
Nested File Systems. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 163
BitLocker Drive Encryption. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 163
Encryption Keys. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 165
Trusted Platform Module (TPM). . . . . . . . . . . . . . . . . . . . . . . . . . . . . 168
BitLocker Boot Process. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 170
BitLocker Key Recovery. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 172
Full-Volume Encryption Driver. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 173
BitLocker Management. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 174
BitLocker To Go . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 175
Volume Shadow Copy Service . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 177
Shadow Copies. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 177
VSS Architecture. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 177
VSS Operation. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 178
Uses in Windows . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 181
Conclusion. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 186

# Chapter 10 Memory Management 187

## Introduction to the Memory Manager. . . . . . . . . . . . . . . . . . . . . . . . . . . . . 187

### Memory Manager Components. . . . . . . . . . . . . . . . . . . . . . . . . . . . . 188
KeSwapProcessOrStack, priority 23

### Internal Synchronization. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 189

### Examining Memory Usage. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 190
1: kd> !vm

## Services Provided by the Memory Manager. . . . . . . . . . . . . . . . . . . . . . . . 193
For example, if a process creates a child process, by default it has the right to manipulate the child process’s virtual memory.(debuggers)

### Large and Small Pages . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 193
The virtual address space is divided into units called pages. 
That is because the hardware memory management unit translates virtual to physical addresses at the granularity of a page.
translation look-aside buffer (TLB)

### Reserving and Committing Pages. . . . . . . . . . . . . . . . . . . . . . . . . . . . 195
page file 转储到磁盘的时候，是物理内存映射，还是虚拟内存映射。重新加载的时候是先加载为虚拟内存还是物理内存。存储了地址和内容吗。
Pages are written to disk through a mechanism called modified page writing. 
This occurs as pages are moved from a process’s working set to a systemwide list called the modified page list; 
from there, they are written to disk (or remote storage).
(1 MB is the default; you can override this size with the CreateThread and CreateRemoteThread function calls or change 
it on an imagewide basis by using the /STACK linker flag.)

### Commit Limit . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 199

### Locking Memory . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 199

### Allocation Granularity. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 199
Finally, when a region of address space is reserved, 
Windows ensures that the size and base of the region is a multiple of the system page size, whatever that might be.

### Shared Memory and Mapped Files. . . . . . . . . . . . . . . . . . . . . . . . . . . 200
The underlying primitives in the memory manager used to implement shared memory are called section objects, 
which are exposed as file mapping objects in the Windows API.
section object 部分映射到内存。
To access a very large section object, a process can map only the portion of the section object that it requires (called a view of the section) by calling the MapViewOfFile, 
MapViewOf-FileEx, or MapViewOfFileExNuma function and then specifying the range to map.

### Protecting Memory. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 203
Even shared memory is not really an exception to this because each process accesses the shared regions using addresses that are part of its own virtual address space.
Windows access control lists (ACLs), data execution prevention, or DEP
However, on 32-bit Windows, execution protection is applied only to thread stacks and user-mode pages, not to paged pool and session pool.

### No Execute Page Protection . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 204
Two other methods for software DEP that the system implements are stack cookies and pointer encoding.

### Copy-on-Write. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 209
One application of copy-on-write is to implement breakpoint support in debuggers.

### Address Windowing Extensions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 210
Address Windowing Extensions (AWE).

## Kernel-Mode Heaps (System Memory Pools) . . . . . . . . . . . . . . . . . . . . . . . 212
Therefore, any code and data that might execute or be accessed at or above DPC/dispatch level must be in nonpageable memory.
Nonpaged pool Consists of ranges of system virtual addresses that are guaranteed to reside in physical memory at all times 
and thus can be accessed at any time without incurring a page fault;
Paged pool A region of virtual memory in system space that can be paged into and out of the system.

### Pool Sizes. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 213

### Monitoring Pool Usage. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 215

### Look-Aside Lists. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 219

## Heap Manager. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 220
The allocation granularity in the heap manager is relatively small: 8 bytes on 32-bit systems, and 16 bytes on 64-bit systems.

### Types of Heaps. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 221
The default heap is created at process startup and is never deleted during the process’s lifetime. 
It defaults to 1 MB in size, but it can be made bigger by specifying a starting size in the image file by using the /HEAP linker flag.
The Win32 GUI subsystem driver (Win32k.sys) uses such a heap for sharing GDI and User objects with user mode.(共享内存块)

### Heap Manager Structure . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 222
Low Fragmentation Heap (LFH).

### Heap Synchronization. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 223

### The Low Fragmentation Heap. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 223
When a process allocates memory from the heap, the LFH chooses the bucket that maps to the smallest block large enough to hold the required size.

### Heap Security Features. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 224
Because the randomization algorithm uses the heap granularity, the !heap –i command
should be used only in the proper context of the heap containing the block

### Heap Debugging Features. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 225

### Pageheap. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 226
When enabled, the heap manager places allocations at the end of pages and reserves the immediately following page.

### Fault Tolerant Heap. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 227
fault tolerant heap, or FTH, is implemented in two primary components: the detection component, 
or FTH server, and the mitigation component, or FTH client.

## Virtual Address Space Layouts. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 228
Three main types of data are mapped into the virtual address space in Windows: 
per-process private code and data, sessionwide code and data, and systemwide code and data.
Even shared memory is not an exception to this rule, because shared memory regions are mapped into each participating process, 
and so are accessed by each process using per-process addresses.(每个进程只能访问自己的VM)
In addition, each session has its own copy of the Windows subsystem process (Csrss.exe) and logon process (Winlogon.exe).
The session manager process (Smss.exe) is responsible for creating new sessions, 
which includes loading a sessionprivate copy of Win32k.sys, creating the session-private object manager namespace, 
and creating the session-specific instances of the Csrss and Winlogon processes.
When a process is created, this range of addresses is mapped to the pages associated with the session that the process belongs to.

### x86 Address Space Layouts . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 229

### x86 System Address Space Layout . . . . . . . . . . . . . . . . . . . . . . . . . . . 232

### x86 Session Space . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 233
For systems with multiple sessions, the code and data unique to each session are mapped into system
address space but shared by the processes in that session.(系统空间的一部分)

### System Page Table Entries . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 235

### 64-Bit Address Space Layouts. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 237
Unlike on x86 systems, where the default address space is divided in two parts (half for a process and half for the system),

### x64 Virtual Addressing Limitations. . . . . . . . . . . . . . . . . . . . . . . . . . . 240
That is, only the low-order 48 bits of a 64-bit virtual address are implemented.
Windows at present allows only the use of a little more than 16 TB. This is split into two 8-TB regions

### Dynamic System Virtual Address Space Management. . . . . . . . . . 242

### System Virtual Address Space Quotas. . . . . . . . . . . . . . . . . . . . . . . . 245

User Address Space Layout . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 246
Address Translation. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 251
x86 Virtual Address Translation. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 252
Translation Look-Aside Buffer. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 259
Physical Address Extension (PAE). . . . . . . . . . . . . . . . . . . . . . . . . . . . 260
x64 Virtual Address Translation. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 265
IA64 Virtual Address Translation. . . . . . . . . . . . . . . . . . . . . . . . . . . . . 266
Page Fault Handling. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 267
Invalid PTEs. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 268
Prototype PTEs. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 269
In-Paging I/O. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 271
Collided Page Faults . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 272
Clustered Page Faults . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 272
Page Files. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 273
Commit Charge and the System Commit Limit . . . . . . . . . . . . . . . . 275
Commit Charge and Page File Size. . . . . . . . . . . . . . . . . . . . . . . . . . . 278
Stacks . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 279
User Stacks . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 280
Kernel Stacks. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 281
DPC Stack . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 282
Virtual Address Descriptors. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 282
Process VADs. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 283
Rotate VADs . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 284
NUMA. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 285
Section Objects. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 286
Driver Verifier. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 292
Page Frame Number Database. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 297
Page List Dynamics . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 300
Page Priority. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 310
Modified Page Writer. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 314
PFN Data Structures. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 315
Physical Memory Limits. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 320
Windows Client Memory Limits. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 321
Working Sets. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 324
Demand Paging. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 324
Logical Prefetcher . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 324
Placement Policy . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 328
Working Set Management. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 329
Balance Set Manager and Swapper . . . . . . . . . . . . . . . . . . . . . . . . . . 333
System Working Sets. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 334
Memory Notification Events . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 335
Proactive Memory Management (Superfetch) . . . . . . . . . . . . . . . . . . . . . . 338
Components. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 338
Tracing and Logging. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 341
Scenarios. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 342
Page Priority and Rebalancing. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 342
Robust Performance. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 344
ReadyBoost. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 346
ReadyDrive . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 348
Unified Caching. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 348
Process Reflection . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 351
Conclusion. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 354

# Chapter 11 Cache Manager 355
Key Features of the Cache Manager. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 355
Single, Centralized System Cache. . . . . . . . . . . . . . . . . . . . . . . . . . . . 356
The Memory Manager . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 356
Cache Coherency. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 356
Virtual Block Caching . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 358
Stream-Based Caching. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 358
Recoverable File System Support . . . . . . . . . . . . . . . . . . . . . . . . . . . . 359
Cache Virtual Memory Management. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 360
Cache Size. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .361
Cache Virtual Size. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 361
Cache Working Set Size . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 361
Cache Physical Size . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 363
Cache Data Structures. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 364
Systemwide Cache Data Structures. . . . . . . . . . . . . . . . . . . . . . . . . . . 365
Per-File Cache Data Structures . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 368
File System Interfaces. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 373
Copying to and from the Cache. . . . . . . . . . . . . . . . . . . . . . . . . . . . . 374
Caching with the Mapping and Pinning Interfaces. . . . . . . . . . . . . 374
Caching with the Direct Memory Access Interfaces . . . . . . . . . . . . 375
Fast I/O. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 375
Read-Ahead and Write-Behind. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 377
Intelligent Read-Ahead. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 378
Write-Back Caching and Lazy Writing. . . . . . . . . . . . . . . . . . . . . . . . 379
Write Throttling. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 388
System Threads. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 390
Conclusion. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 390

# Chapter 12 File Systems 391
Windows File System Formats . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 392
CDFS. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 392
UDF. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 393
FAT12, FAT16, and FAT32 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 393
exFAT . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 396
NTFS. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 397
File System Driver Architecture . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 398
Local FSDs. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 398
Remote FSDs. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 400
File System Operation. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 407
File System Filter Drivers. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 413
Troubleshooting File System Problems. . . . . . . . . . . . . . . . . . . . . . . . . . . . . 415
Process Monitor Basic vs. Advanced Modes. . . . . . . . . . . . . . . . . . . 415
Process Monitor Troubleshooting Techniques. . . . . . . . . . . . . . . . . 416
Common Log File System. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 416
NTFS Design Goals and Features. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 424
High-End File System Requirements. . . . . . . . . . . . . . . . . . . . . . . . . . 424
Advanced Features of NTFS. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 426
NTFS File System Driver. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 439
NTFS On-Disk Structure. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 442
Volumes. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 442
Clusters. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 442
Master File Table . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 443
File Record Numbers. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 447
File Records. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 447
File Names. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 449
Resident and Nonresident Attributes. . . . . . . . . . . . . . . . . . . . . . . . . 453
Data Compression and Sparse Files. . . . . . . . . . . . . . . . . . . . . . . . . . 456
The Change Journal File. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 461
Indexing. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 464
Object IDs. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 466
Quota Tracking. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 466
Consolidated Security. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 467
Reparse Points . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 469
Transaction Support . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 469
NTFS Recovery Support. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 477
Design . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 478
Metadata Logging. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 479
Recovery . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 483
NTFS Bad-Cluster Recovery. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 487
Self-Healing. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 490
Encrypting File System Security. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 491
Encrypting a File for the First Time. . . . . . . . . . . . . . . . . . . . . . . . . . . 494
The Decryption Process . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 496
Backing Up Encrypted Files. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 497
Copying Encrypted Files. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 497
Conclusion. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 498

# Chapter 13 Startup and Shutdown 499
Boot Process . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 499
BIOS Preboot. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .499
The BIOS Boot Sector and Bootmgr. . . . . . . . . . . . . . . . . . . . . . . . . . 502
The UEFI Boot Process. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 512
Booting from iSCSI. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 514
Initializing the Kernel and Executive Subsystems. . . . . . . . . . . . . . . 514
Smss, Csrss, and Wininit. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 522
ReadyBoot. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 527
Images That Start Automatically. . . . . . . . . . . . . . . . . . . . . . . . . . . . . 528
Troubleshooting Boot and Startup Problems . . . . . . . . . . . . . . . . . . . . . . . 529
Last Known Good. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 530
Safe Mode. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 530
Windows Recovery Environment (WinRE). . . . . . . . . . . . . . . . . . . . . 534
Solving Common Boot Problems. . . . . . . . . . . . . . . . . . . . . . . . . . . . 537
Shutdown. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 542
Conclusion. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 545

# Chapter 14 Crash Dump Analysis 547
Why Does Windows Crash?. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 547
The Blue Screen. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 548
Causes of Windows Crashes. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 549
Troubleshooting Crashes. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 551
Crash Dump Files. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .553
Crash Dump Generation. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 559
Windows Error Reporting. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 561
Online Crash Analysis. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 563
Basic Crash Dump Analysis. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 564
Notmyfault. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 564
Basic Crash Dump Analysis. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 565
Verbose Analysis. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 567
Using Crash Troubleshooting Tools. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 569
Buffer Overruns, Memory Corruption, and Special Pool . . . . . . . . 569
Code Overwrite and System Code Write Protection. . . . . . . . . . . . 573
Advanced Crash Dump Analysis. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 574
Stack Trashes. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 575
Hung or Unresponsive Systems. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 577
When There Is No Crash Dump. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 581
Analysis of Common Stop Codes. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 585
0xD1 - DRIVER_IRQL_NOT_LESS_OR_EQUAL. . . . . . . . . . . . . . . . . . 585
0x8E - KERNEL_MODE_EXCEPTION_NOT_HANDLED. . . . . . . . . . . 586
0x7F - UNEXPECTED_KERNEL_MODE_TRAP. . . . . . . . . . . . . . . . . . . 588
0xC5 - DRIVER_CORRUPTED_EXPOOL. . . . . . . . . . . . . . . . . . . . . . . . 590
Hardware Malfunctions. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 593
Conclusion. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 594
