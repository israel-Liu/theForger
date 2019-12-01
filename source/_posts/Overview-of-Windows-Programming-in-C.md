---
title: Overview of Windows Programming in C++
date: 2017-11-16 15:08:28
tags:
---
1. ATL
2. WTL
3. MFC

# [Windows and Messages](https://docs.microsoft.com/zh-cn/windows/win32/winmsg/windowing)

## [About Windows](https://docs.microsoft.com/en-us/windows/win32/winmsg/about-windows)

The WindowFromPoint function retrieves a handle to the window occupying a particular point on the screen. Similarly, the ChildWindowFromPoint and ChildWindowFromPointEx functions retrieve a handle to the child window occupying a particular point in the parent window's client area.     

An application uses the GetSystemMetrics function with the SM_CXMIN and SM_CYMIN flags.    

The AdjustWindowRect and AdjustWindowRectEx functions calculate the required size of a window based on the desired size of the client area.     

Before setting a window's size, the application should check the width and height of the screen by using GetSystemMetrics with the SM_CXSCREEN and SM_CYSCREEN flags.

A window that has no parent, or whose parent is the desktop window, is called a top-level window.    

An owned window always appears in front of its owner window, is hidden when its owner window is minimized, and is destroyed when its owner window is destroyed.     

An application can include a menu by providing a menu handle either when registering the window's class or when creating the window.    
  
Every window can have application-defined creation data associated with it. When the window is first created, the system passes a pointer to the data on to the window procedure of the window being created. The window procedure uses the data to initialize application-defined variables.   

The IsWindow function determines whether a window handle identifies a valid, existing window.    

Normally, the flag can be set to any of the constants beginning with the SW_ prefix. However, when ShowWindow is called to display the application's main window, the flag must be set to SW_SHOWDEFAULT.    

If a window class was registered with the Unicode version of RegisterClass, the window receives only Unicode messages. To determine whether a window uses the Unicode character set or not, call IsWindowUnicode.    

The system sends the WM_NCCREATE message after creating the window's nonclient area and the WM_CREATE message after creating the client area.    

When creating a child window, the system sends the WM_PARENTNOTIFY message to the parent window after sending the WM_NCCREATE and WM_CREATE messages.    

An application can use the EnumThreadWindows function to enumerate the windows created by a particular thread. This function passes the handle to each thread window, in turn, to an application-defined callback function, EnumThreadWndProc.   

## [Window Features](https://docs.microsoft.com/en-us/windows/win32/winmsg/window-features)

The WS_CAPTION style must be combined with the WS_POPUPWINDOW style to make the window menu visible.   

If you specify the WS_CHILD style in CreateWindowEx but do not specify a parent window, the system does not create the window.   

An application can request a title bar, a window menu, minimize and maximize buttons, a border, and scroll bars for a child window, but a child window cannot have a menu.  

The system does not automatically clip a child window from the parent window's client area.    

This means the parent window draws over the child window if it carries out any drawing in the same location as the child window.   

However, the system does clip the child window from the parent window's client area if the parent window has the WS_CLIPCHILDREN style. 
   
If the child window is clipped, the parent window cannot draw over it.   

When calling the SetParent function, system removes the child window from the client area of the old parent window and moves it to the client area of the new parent window.  

The parent window relinquishes a portion of its client area to a child window, and the child window receives all input from this area.   

The system passes a child window's input messages directly to the child window; the messages are not passed through the parent window. 
The only exception is if the child window has been disabled by the EnableWindow function.     

The system automatically composes and repaints layered windows and the windows of underlying applications.   

The layered window will not become visible until the SetLayeredWindowAttributes or UpdateLayeredWindow function has been called for this window.

In addition, layered windows can be partially translucent, that is, alpha-blended.   

Please note that after SetLayeredWindowAttributes has been called, subsequent UpdateLayeredWindow calls will fail until the layering style bit is cleared and set again.  

Hit testing of a layered window is based on the shape and transparency of the window. This means that the areas of the window that are color-keyed or whose alpha value is zero will let the mouse messages through. However, if the layered window has the WS_EX_TRANSPARENT extended window style, the shape of the layered window will be ignored and the mouse events will be passed to other windows underneath the layered window.    

A window may be an owned window, foreground window, or background window. A window also has a z-order relative to other windows.    

The thread that created the window with which the user is currently working is called the foreground thread, and the window is called the foreground window. 
All other threads are background threads, and the windows created by background threads are called background windows.   

Beginning with Windows 8, WS_EX_LAYERED can be used with child windows and top-level windows.    

Only an overlapped or pop-up window can be an owner window; a child window cannot be an owner window. An application creates an owned window by specifying the owner's window handle as the hwndParent parameter of CreateWindowEx when it creates a window with the WS_OVERLAPPED or WS_POPUP style. The hwndParent parameter must identify an overlapped or pop-up window. If hwndParent identifies a child window, the system assigns ownership to the top-level parent window of the child window. After creating an owned window, an application cannot transfer ownership of the window to another window.   

A topmost window overlaps all other non-topmost windows, regardless of whether it is the active or foreground window.  

When an application creates a window, the system puts it at the top of the z-order for windows of the same type. You can use the BringWindowToTop function to bring a window to the top of the z-order for windows of the same type. You can rearrange the z-order by using the SetWindowPos and DeferWindowPos functions.   

The system positions the active window at the top of the z-order for windows of the same type.    

When the activation changes from a top-level window of one application to the top-level window of another, the system sends a WM_ACTIVATEAPP message to both applications, notifying them of the change. When the activation changes to a different top-level window in the same application, the system sends both windows a WM_ACTIVATE message.   

In both cases, the system sends the WM_SHOWWINDOW message to the owned windows before hiding or showing them.   

If the application has created other top-level windows, the system bases the size of the new window on the size of the application's most recently created top-level window.   

An application can emulate the user action by sending a WM_SYSCOMMAND message to the window.    

### Window Show State

#[Window Classes](https://docs.microsoft.com/en-us/windows/win32/winmsg/window-classes)
Every window is a member of a window class. All window classes are process specific.
A process must register a window class before it can create a window of that class. 
The system registers the system classes for a process the first time one of its threads calls a User or a Windows Graphics Device Interface (GDI) function.
It is possible to override system classes without affecting other applications. 
That is, an application can register an application local class having the same name as a system class. 
RegisterClassEx, RegisterClassExW, 
the application requests that the system pass text parameters of messages to the windows of the created class using the Unicode character set. 
The system determines class ownership from the hInstance member of the WNDCLASSEX structure passed to the RegisterClassEx function when the class is registered. 
A process assigns a window procedure to a class by copying its address to the lpfnWndProc member of the WNDCLASSEX structure. 
To avoid retrieving a device context each time it needs to paint inside a window, an application can specify the CS_OWNDC style for the window class. 

# [Window Procedures](https://docs.microsoft.com/en-us/windows/win32/winmsg/window-procedures)
Because this means several sources could simultaneously call the same piece of code, you must be careful when modifying shared resources from a window procedure. 
Because it is possible to call a window procedure recursively, it is important to minimize the number of local variables that it uses. 
An application subclasses a window by replacing the address of the window's original window procedure with the address of a new window procedure, 
called the subclass procedure.
When an application subclasses a subclassed window, it must remove the subclasses in the reverse order they were performed. 
An application that globally subclasses a control class must remove the subclass when the application terminates; 
Superclassing is a technique that allows an application to create a new window class with the basic functionality of the existing class, 
plus enhancements provided by the application. 

# [Messages and Message Queues](https://docs.microsoft.com/en-us/windows/win32/winmsg/messages-and-message-queues)
Windows-based applications are event-driven. ghost window(系统创建替换一段时间不响应的top-level window)
posting messages to a first-in, first-out queue called a message queue, a system-defined memory object that temporarily stores messages.
The system maintains a single system message queue and one thread-specific message queue for each GUI thread. 
To avoid the overhead of creating a message queue for non–GUI threads, all threads are created initially without a message queue. 
The system creates a thread-specific message queue only when the thread makes its first call to one of the specific user functions; 
no GUI function calls result in the creation of a message queue.(消息从唯一的系统消息队列取出发送到创建目标窗口的线程队列，然后取出发送到窗口过程)
The system posts a message to a thread's message queue by filling an MSG structure and then copying it to the message queue. 
A thread can post a message to its own message queue or to the queue of another thread by using the PostMessage or PostThreadMessage function.
DispatchMessage function to direct the system to send the message to a window procedure for processing. 
If a thread uses a modeless dialog box, the message loop must include the IsDialogMessage function so that the dialog box can receive keyboard input.
使用sendmessage发送到其它进程的消息有没有进入到系统消息队列。如果没有那么和线程间的相同吗，转换线程直接调用。

# [Windows System Information](https://docs.microsoft.com/zh-cn/windows/win32/sysinfo/windows-system-information)

## [Handles and Objects](https://docs.microsoft.com/zh-cn/windows/win32/sysinfo/about-handles-and-objects)
Each object has its own access-control list (ACL) that specifies the actions a process can perform on the object. 
When there are no remaining open handles to the event object, the system destroys the event object. 
In contrast, an application can obtain a handle to an existing window object. (窗口对象不同于一般对象，销毁窗口对象句柄无效)
When the window object is no longer needed, the application must destroy the object, which invalidates the window handle.
The only exceptions are window, hook, window position, and dynamic data exchange (DDE) conversation objects; 
these objects are destroyed when the creating thread terminates.[ref](https://docs.microsoft.com/zh-cn/windows/win32/sysinfo/object-interface)
A duplicated or inherited handle is a unique value, but it refers to the same object as the original handle. 
All other objects are private to the process that created them; their object handles cannot be duplicated or inherited.
User interface objects support only one handle per object. Processes cannot inherit or duplicate handles to user objects. 
Processes in one session cannot reference a user handle in another session.
Handles to user objects are public to all processes. That is, any process can use the user object handle, provided that the process has security access to the object.

# [Window Stations and Desktops](https://docs.microsoft.com/en-us/windows/win32/winstation/window-stations-and-desktops)

