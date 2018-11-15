---
title: Get Started with Win32 and C++
date: 2018-09-12 19:32:42
tags:
---
#### [Get Started with Win32 and C++](https://docs.microsoft.com/en-ca/windows/desktop/LearnWin32/learn-to-program-for-windows)
### Windows Coding Conventions
The vast majority of Windows APIs consist of either functions or Component Object Model (COM) interfaces.   
Very few Windows APIs are provided as C++ classes. (A notable exception is GDI+, one of the 2-D graphics APIs.)

#### Boolean Type
Despite this definition of TRUE, however, most functions that return a BOOL type can return any non-zero value to indicate Boolean truth.
```CPP
// Right way.
BOOL result = SomeFunctionThatReturnsBoolean();
if (result) {
    ...
}
```
#### Pointer Precision Types
The following data types are always the size of a pointer—that is, 32 bits wide in 32-bit applications, and 64 bits wide in 64-bit applications. The size is determined at compile time. When a 32-bit application runs on 64-bit Windows, these data types are still 4 bytes wide. (A 64-bit application cannot run on 32-bit Windows, so the reverse situation does not occur.)
```CPP
DWORD_PTR
INT_PTR
LONG_PTR
ULONG_PTR
UINT_PTR
```
These types are used in situations where an integer might be cast to a pointer. They are also used to define variables for pointer arithmetic and to define loop counters that iterate over the full range of bytes in memory buffers. More generally, they appear in places where an existing 32-bit value was expanded to 64 bits on 64-bit Windows.
### Working with Strings
Windows represents Unicode characters using UTF-16 encoding, in which each character is encoded as a 16-bit value.
```CPP  
// Some headers use the preprocessor symbol UNICODE, others use _UNICODE with an underscore prefix.
#ifdef UNICODE
#define SetWindowText  SetWindowTextW
#else
#define SetWindowText  SetWindowTextA
#endif
// CRT
#ifdef _UNICODE
#define _tcslen     wcslen
#else
#define _tcslen     strlen
#endif
```

### WinMain: The Application Entry Point

```CPP
int WINAPI wWinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance, PWSTR pCmdLine, int nCmdShow);
```

hInstance is something called a "handle to an instance" or "handle to a module." The operating system uses this value to identify the executable (EXE) when it is loaded in memory.值为在内存中的基地址首选0x0040 0000可以修改。

### Creating a Window
Every window must be associated with a window class, even if your program only ever creates one instance of that class.   
For each thread that creates a window, the operating system creates a queue for window messages.
```CPP
MSG msg;
BOOL bRet;
while (0 != (bRet = ::GetMessage(&msg, nullptr, 0, 0))) {
    if (-1 == bRet) {
        return -1;
    }

    ::TranslateMessage(&msg);
    ::DispatchMessage(&msg);
}
```
#### Avoiding Bottlenecks in Your Window Procedure
While your window procedure executes, it blocks any other messages for windows created on the same thread. Therefore, avoid lengthy processing inside your window procedure. For example, suppose your program opens a TCP connection and waits indefinitely for the server to respond. If you do that inside the window procedure, your UI will not respond until the request completes. During that time, the window cannot process mouse or keyboard input, repaint itself, or even close.
Instead, you should move the work to another thread, using one of the multitasking facilities that are built into Windows:
```
Create a new thread.
Use a thread pool.
Use asynchronous I/O calls.
Use asynchronous procedure calls.
```
### Painting the Window
If you always paint the entire client area, the code will be simpler. If you have complicated painting logic, however, it can be more efficient to skip the areas outside of the update region.

### Closing the Window
The WM_CLOSE message gives you an opportunity to prompt the user before closing the window.   
When a window is about to be destroyed, it receives a WM_DESTROY message. This message is sent after the window is removed from the screen, but before the destruction occurs (in particular, before any child windows are destroyed).

### Managing Application State
比较高级的用法，暂时跳过，一般用于写图形库。
[Managing Application State](https://docs.microsoft.com/en-ca/windows/desktop/LearnWin32/managing-application-state-)
