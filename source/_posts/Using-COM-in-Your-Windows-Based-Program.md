---
title: Using COM in Your Windows-Based Program
date: 2018-09-13 10:09:54
tags:
---
### [Using COM in Your Windows-Based Program](https://docs.microsoft.com/en-ca/windows/desktop/LearnWin32/module-2--using-com-in-your-windows-program)

#### What Is a COM Interface?
In C++, the nearest equivalent to an interface is a pure virtual class—that is, a class that contains only pure virtual methods and no other members. 

#### Initializing the COM Library
Each thread that uses a COM interface must make a separate call to this function.
```CPP
HRESULT CoInitializeEx(LPVOID pvReserved, DWORD dwCoInit);
```
For every successful call to CoInitializeEx, you must call CoUninitialize before the thread exits. 
```CPP
CoUninitialize();
```

#### Error Codes in COM
This produces the following numeric ranges:   
Success codes: 0x0–0x7FFFFFFF.   
Error codes: 0x80000000–0xFFFFFFFF.
```CPP
HRESULT hr = CoInitializeEx(NULL, COINIT_APARTMENTTHREADED | COINIT_DISABLE_OLE1DDE);

if (SUCCEEDED(hr)) {
    // The function succeeded.
} else {
    // Handle the error.
}
```

#### Creating an Object in COM
In general, there are two ways to create a COM object:
The module that implements the object might provide a function specifically designed to create instances of that object.
```CPP
// Not an actual Windows function. 
HRESULT CreateShape(IDrawable** ppShape);
IDrawable *pShape;

HRESULT hr = CreateShape(&pShape);
if (SUCCEEDED(hr)) {
    // Use the Shape object.
} else {
    // An error occurred.
}
```   
Alternatively, COM provides a generic creation function named CoCreateInstance.
```CPP
// In COM, an object or an interface is identified by assigning it a 128-bit number, called a globally unique identifier (GUID).
extern const GUID CLSID_Shape;
extern const GUID IID_IDrawable;

// The CoCreateInstance function has five parameters. The first and fourth parameters are the class identifier and interface identifier. 
// In effect, these parameters tell the function, "Create the Shape object, and give me a pointer to the IDrawable interface."

IDrawable *pShape;
hr = CoCreateInstance(CLSID_Shape, NULL, CLSCTX_INPROC_SERVER, IID_Drawable, reinterpret_cast<void**>(&pShape));

if (SUCCEEDED(hr)) {
    // Use the Shape object.
} else {
    // An error occurred.
}
```
#### The Open Dialog Box
```CPP
#include <windows.h>
#include <shobjidl.h> 

int WINAPI wWinMain(HINSTANCE hInstance, HINSTANCE, PWSTR pCmdLine, int nCmdShow)
{
    HRESULT hr = CoInitializeEx(NULL, COINIT_APARTMENTTHREADED | COINIT_DISABLE_OLE1DDE);
    if (SUCCEEDED(hr)) {
        IFileOpenDialog* pFileOpen;

        // Create the FileOpenDialog object.
        hr = CoCreateInstance(CLSID_FileOpenDialog, NULL, CLSCTX_ALL, IID_IFileOpenDialog, reinterpret_cast<void**>(&pFileOpen));

        if (SUCCEEDED(hr)) {
            // Show the Open dialog box.
            hr = pFileOpen->Show(NULL);

            // Get the file name from the dialog box.
            if (SUCCEEDED(hr)) {
                IShellItem* pItem;
                hr = pFileOpen->GetResult(&pItem);
                if (SUCCEEDED(hr)) {
                    PWSTR pszFilePath;
                    hr = pItem->GetDisplayName(SIGDN_FILESYSPATH, &pszFilePath);

                    // Display the file name to the user.
                    if (SUCCEEDED(hr)) {
                        MessageBox(NULL, pszFilePath, L"File Path", MB_OK);
                        CoTaskMemFree(pszFilePath);
                    }
                    pItem->Release();
                }
            }
            pFileOpen->Release();
        }
        CoUninitialize();
    }
    return 0;
}
```

#### Managing the Lifetime of an Object
Release is called only after you test the HRESULT for success. 

#### Asking an Object for an Interface
You can think of QueryInterface as a language-independent version of the dynamic_cast keyword in C++.
```CPP
HRESULT QueryInterface(REFIID riid, void **ppvObject);

hr = pFileOpen->QueryInterface(IID_IFileDialogCustomize, reinterpret_cast<void**>(&pCustom));
if (SUCCEEDED(hr)) {
    // Use the interface. (Not shown.)
    pCustom->Release();
} else {
    // Handle the error.
}
```

#### Memory Allocation in COM
The CoTaskMemAlloc function allocates a block of memory.   
The CoTaskMemFree function frees a block of memory that was allocated with CoTaskMemAlloc.

#### COM Coding Practices
This topic describes ways to make your COM code more effective and robust.
```CPP
The __uuidof Operator
The IID_PPV_ARGS Macro
The SafeRelease Pattern
COM Smart Pointers
```
#### Error Handling in COM
With these rules in mind, here are four patterns for handling errors.
```CPP
Nested ifs
Cascading ifs
Jump on Fail
Throw on Fail
```