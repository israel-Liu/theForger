---
title: Using Messages and Message Queues
date: 2017-02-16 17:05:31
tags:
---
#### [Creating a Message Loop](https://msdn.microsoft.com/EN-US/library/windows/desktop/ms644928".aspx)
The system does not automatically create a message queue for each thread. Instead, the system creates a message queue only for threads that perform   operations which require a message queue. If the thread creates one or more windows, a message loop must be provided; this message loop retrieves messages from the thread's message queue and dispatches them to the appropriate window procedures. For each thread that creates a window, the operating system creates a queue for window messages.

Because the system directs messages to individual windows in an application, a thread must create at least one window before starting its message loop.    Most applications contain a single thread that creates windows. A typical application registers the window class for its main window, creates and shows the   main window, and then starts its message loop — all in the WinMain function.  

You create a message loop by using the GetMessage and DispatchMessage functions. If your application must obtain character input from the user,          include the TranslateMessage function in the loop. TranslateMessage translates virtual-key messages into character messages. The following example shows the   message loop in the WinMain function of a simple Windows-based application.


## [Programming Windows (Charles Petzold).pdf]()
Although Windows programs can have multiple threads of execution, each thread's message queue handles messages
for only the windows whose window procedures are executed in that thread. In other words, the message loop and
the window procedure do not run concurrently. When a message loop retrieves a message from its message queue
and calls DispatchMessage to send the message off to the window procedure, DispatchMessage does not return
until the window procedure has returned control back to Windows.

However, the window procedure could call a function that sends the window procedure another message, in which
case the window procedure must finish processing the second message before the function call returns, at which time
the window procedure proceeds with the original message. For example, when a window procedure calls
UpdateWindow, Windows calls the window procedure with a WM_PAINT message. When the window procedure
finishes processing the WM_PAINT message, the UpdateWindow call will return controls back to the window
procedure.