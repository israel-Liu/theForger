---
title: Synchronization
date: 2018-11-14 11:03:15
tags:
---

### [Synchronization](https://docs.microsoft.com/en-gb/windows/desktop/Sync/synchronization)
协调多个执行线程，同步访问资源。
To synchronize access to a resource, use one of the synchronization objects in one of the wait functions.    
The state of a synchronization object is either signaled or nonsignaled.    
The wait functions allow a thread to block its own execution until a specified nonsignaled object is set to the signaled state.    

#### Wait Functions
Wait functions allow a thread to block its own execution. until the conditions of the wait criteria have been met or the specified time-out interval elapses.
1.Alertable Wait Functions
2.Registered Wait Functions
3.Waiting on an Address

#### Synchronization Objects
A synchronization object is an object whose handle can be specified in one of the wait functions to coordinate the execution of multiple threads.    
More than one process can have a handle to the same synchronization object, making interprocess synchronization possible.   
In some circumstances, you can also use a file, named pipe, or communications device as a synchronization object;    
however, their use for this purpose is discouraged. Instead, use asynchronous I/O and wait on the event object set in the OVERLAPPED structure.    
It is safer to use the event object because of the confusion that can occur when multiple simultaneous overlapped operations are performed on the same file, named pipe, or communications device.    
In this situation, there is no way to know which operation caused the object's state to be signaled.   
1.[Event Objects](https://docs.microsoft.com/en-gb/windows/desktop/Sync/event-objects)
2.[Mutex Objects](https://docs.microsoft.com/en-gb/windows/desktop/Sync/mutex-objects)
3.[Semaphore Objects](https://docs.microsoft.com/en-gb/windows/desktop/Sync/semaphore-objects)
4.[Waitable Timer Objects](https://docs.microsoft.com/en-gb/windows/desktop/Sync/waitable-timer-objects)
5.[Synchronization Object Security and Access Rights](https://docs.microsoft.com/en-gb/windows/desktop/Sync/synchronization-object-security-and-access-rights)

#### Interprocess Synchronization
Multiple processes can have handles to the same event, mutex, semaphore, or timer object, so these objects can be used to accomplish interprocess synchronization. 
1.[Object Names](https://docs.microsoft.com/en-gb/windows/desktop/Sync/object-names)
2.[Object Namespaces](https://docs.microsoft.com/en-gb/windows/desktop/Sync/object-namespaces)
3.[Object Inheritance](https://docs.microsoft.com/en-gb/windows/desktop/Sync/object-inheritance)
4.[Object Duplication](https://docs.microsoft.com/en-gb/windows/desktop/Sync/object-duplication)

#### [About Synchronization](https://docs.microsoft.com/en-gb/windows/desktop/Sync/about-synchronization)
以下章节需要作为扩展至少再次学习,学习就是一个记忆到理解的过程，理解不来就先记住，记不住就过段时间再来理解。   
1.Synchronization and Multiprocessor Issues
2.Synchronization and Overlapped Input and Output
3.Asynchronous Procedure Calls
4.Critical Section Objects
5.Condition Variables
6.Slim Reader/Writer (SRW) Locks
7.One-Time Initialization
8.Interlocked Variable Access
9.Interlocked Singly Linked Lists
10.Timer Queues
11.Synchronization Barriers

#### [Using Synchronization](https://docs.microsoft.com/en-gb/windows/desktop/Sync/using-synchronization)

#### [Synchronization Reference](https://docs.microsoft.com/en-gb/windows/desktop/Sync/synchronization-reference)