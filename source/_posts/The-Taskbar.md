---
title: The Taskbar
date: 2017-06-07 17:46:54
tags:
---
#### [The Taskbar](https://msdn.microsoft.com/en-us/library/windows/desktop/cc144179.aspx)

#### Managing Taskbar Buttons

The Shell creates a button on the taskbar whenever an application creates a window that isn't owned. To ensure that the window button is placed on the taskbar, create an unowned window with the WS_EX_APPWINDOW extended style. To prevent the window button from being placed on the taskbar, create the unowned window with the WS_EX_TOOLWINDOW extended style. As an alternative, you can create a hidden window and make this hidden window the owner of your visible window.

The Shell will remove a window's button from the taskbar only if the window's style supports visible taskbar buttons. If you want to dynamically change a window's style to one that does not support visible taskbar buttons, you must hide the window first (by calling ShowWindow with SW_HIDE), change the window style, and then show the window.

The window button typically contains the application icon and title. However, if the application does not contain a system menu, the window button is created without the icon.

If you want your application to get the user's attention when the window is not active, use the FlashWindow function to let the user know that a message is waiting. This function flashes the window button. Once the user clicks the window button to activate the window, your application can display the message.
