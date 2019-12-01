---
title: A Tour of Cpp
date: 2019-06-25 16:38:26
tags: C++
---

# Preface ix

# 1 The Basics 1

## 1.1 Introduction ................................................................................. 1

## 1.2 Programs ..................................................................................... 1
C++ is a statically typed language.

## 1.3 Hello, World! .............................................................................. 2

## 1.4 Functions ..................................................................................... 3
The semantics of argument passing are identical to the semantics of copy initialization.
```Cpp
// The type of a function consists of the return type and the argument types.
// For class member functions, the name of the class is also part of the function type.

double get(const vector<double>& vec, int index); // type: double(const vector<double>&,int)
char& String::operator[](int index); // type: char& String::(int)
```

## 1.5 Types, Variables, and Arithmetic ................................................ 5
Every name and every expression has a type that determines the operations that may be performed on it.

## 1.6 Scope ........................................................................................... 8
For a namespace object the point of destruction is the end of the program.

## 1.7 Constants ..................................................................................... 8
constexpr: meaning roughly ‘‘to be evaluated at compile time.’’ This is used primarily to specify constants, 
to allow placement of data in read-only memory (where it is unlikely to be corrupted) and for performance.

## 1.8 Pointers, Arrays, and References ................................................ 9
The range-for-statement can be used for any sequence of elements (§10.1).

## 1.9 Tests ............................................................................................ 12

## 1.10 Advice ......................................................................................... 14
[4] Focus on programming techniques, not on language features.
[13] Keep common and local names short, and keep uncommon and nonlocal names longer.(和可见范围成正比)
[16] Prefer the {}-initializer syntax for declarations with a named type; §1.5.
[17] Prefer the = syntax for the initialization in declarations using auto; §1.5.

# 2 User-Defined Types 15

## 2.1 Introduction ................................................................................. 15

## 2.2 Structures .................................................................................... 16

## 2.3 Classes ........................................................................................ 17
There is no fundamental difference between a struct and a class;

## 2.4 Unions ......................................................................................... 19
A union is a struct in which all members are allocated at the same address 
so that the union occupies only as much space as its largest member.

## 2.5 Enumerations .............................................................................. 20
The enumerators from a ‘‘plain’’ enum are entered into the same scope 
as the name of their enum and implicitly converts to their integer value.

## 2.6 Advice ......................................................................................... 21
[6] Avoid ‘‘naked’’ unions; wrap them in a class together with a type field; §2.4.

# 3 Modularity 23

## 3.1 Introduction ................................................................................. 23
At the language level, C++ represents interfaces by declarations. 
A declaration specifies all that’s needed to use a function or a type.

## 3.2 Separate Compilation .................................................................. 24
The definitions of those types and functions are in separate source files and compiled separately.

## 3.3 Namespaces ................................................................................. 26
They simplify the composition of a program out of separately developed parts.

## 3.4 Error Handling ............................................................................ 27
It is a good idea to design and articulate a strategy for error handling early on in the development of a program.

### 3.4.1 Exceptions
To do that, the implementation will unwind the function call stack as needed to get back to the context of that caller.

### 3.4.2 Invariants
Such a statement of what is assumed to be true for a class is called a class invariant, or simply an invariant.

### 3.4.3 Static Assertions
That’s what much of the type system and the facilities for specifying the interfaces to user-defined types are for.
The static_asser t mechanism can be used for anything that can be expressed in terms of constant expressions (§1.7).

##3.5 Advice ......................................................................................... 31
[5] Avoid non-inline function definitions in headers; §3.2.
[8] Don’t put a using-directive in a header file; §3.3.
[12] Use purpose-designed user-defined types as exceptions (not built-in types); §3.4.1.
[15] Let a constructor establish an invariant, and throw if it cannot; §3.4.2.
[17] What can be checked at compile time is usually best checked at compile time (using static_asser t); §3.4.3.

# 4 Classes 33

## 4.1 Introduction ................................................................................. 33

## 4.2 Concrete Types ............................................................................ 34
The basic idea of concrete classes is that they behave ‘‘just like built-in types.’’

### 4.2.1 An Arithmetic Type
Many useful operations do not require direct access to the representation of complex, 
so they can be defined separately from the class definition.

### 4.2.2 A Container
The constructor/destructor combination is the basis of many elegant techniques.

### 4.2.3 Initializing Containers
However, it is worth remembering that the type system has no common sense.

## 4.3 Abstract Types ............................................................................ 39
Since we don’t know anything about the representation of an abstract type (not even its size), 
we must allocate objects on the free store (§4.2.2) and access them through references or pointers (§1.8, §11.2.1).

A class that provides the interface to a variety of other classes is often called a polymorphic type.

It knows only the interface defined by Container. Consequently, use(Container&) needn’t be recompiled 
if the implementation of List_container changes or a brand-new class derived from Container is used.

## 4.4 Virtual Functions ......................................................................... 42
The usual implementation technique is for the compiler to convert (非虚重载其实就是普通函数调用)
the name of a virtual function into an index into a table of pointers to functions.

That table is usually called the virtual function table or simply the vtbl. (如果没实现那指向的就是基类的虚函数)
Each class with virtual functions has its own vtbl identifying its virtual functions.

This virtual call mechanism can be made almost as efficient as the ‘‘normal function call’’ mechanism (within 25%). 
Its space overhead is one pointer in each object of a class with virtual functions plus one vtbl for each such class.

## 4.5 Class Hierarchies ........................................................................ 42
Then, the virtual function call mechanism ensures that the proper destructor is called.
That destructor then implicitly invokes the destructors of its bases and members.

### 4.5.1 Explicit Overriding

### 4.5.2 Benefits from Hierarchies
Interface inheritance, Implementation inheritance

### 4.5.3 Hierarchy Navigation
We then test whether the result is nullptr. 
This test can often conveniently be placed in the initialization of a variable in a condition.

### 4.5.4 Avoiding Resource Leaks

## 4.6 Copy and Move ........................................................................... 48
The default meaning of copy is memberwise copy: copy each member.
For some sophisticated concrete types, such as Vector, memberwise copy is not the right semantics for copy,
and for abstract types it almost never is.

### 4.6.1 Copying Containers
When a class is a resource handle – that is, 
when the class is responsible for an object accessed through a pointer – the default memberwise copy is typically a disaster.

### 4.6.2 Moving Containers
The word ‘‘rvalue’’ is intended to complement ‘‘lvalue,’’ 
which roughly means ‘‘something that can appear on the left-hand side of an assignment.’’
Thus, an rvalue reference is a reference to something that nobody else can assign to, so that we can safely ‘‘steal’’ its value.

### 4.6.3 Essential Operations
There are five situations in which an object is copied or moved:
• As the source of an assignment
• As an object initializer
• As a function argument
• As a function return value
• As an exception
In all cases, the copy or move constructor will be applied (unless it can be optimized away).

### 4.6.4 Resource Management
C++ also offers a garbage collection interface so that you can plug in a garbage collector.(Use RAII better)

### 4.6.5 Suppressing Operations

## 4.7 Advice ......................................................................................... 56
[6] Make a function a member only if it needs direct access to the representation of a class; §4.2.1.
[8] Use nonmember functions for symmetric operators; §4.2.1.
[16] An abstract class typically doesn’t need a constructor; §4.3.
[17] Use class hierarchies to represent concepts with inherent hierarchical structure; §4.5.
[18] A class with a virtual function should have a virtual destructor; §4.5.
[20] When designing a class hierarchy, distinguish between implementation inheritance and interface inheritance; §4.5.2.
[33] If a class has a pointer or reference member, it probably needs a destructor and non-default copy operations; §4.6.3.

# 5 Templates 59

## 5.1 Introduction ................................................................................. 59

## 5.2 Parameterized Types ................................................................... 59
Templates are a compile-time mechanism, so their use incurs no run-time overhead compared to hand-crafted code.
A template value argument must be a constant expression. 编译期确定。

## 5.3 Function Templates ..................................................................... 62

## 5.4 Concepts and Generic Programming .......................................... 62
Templates for compile-time computation and type manipulation。
Remember that types (classes) can contain both code and values.
Templates provide (compile-time) parametric polymorphism.(虚函数是运行时多态？应该是编译期，虚表是和类相关的)

## 5.5 Function Objects ......................................................................... 64

## 5.6 Variadic Templates ...................................................................... 66

## 5.7 Aliases ......................................................................................... 67

## 5.8 Template Compilation Model ..................................................... 68
This differs from the alternative view that objects have types, which determine the presence and meaning of operations. 
Values ‘‘live’’ in objects. 
This is the way objects (e.g., variables) work in C++, and only values that meet an object’s requirements can be put into it.
What is done at compile time using templates does not involve objects, only values.

## 5.9 Advice ......................................................................................... 68

# 6 Library Overview 71
6.1 Introduction ................................................................................. 71
6.2 Standard-Library Components .................................................... 72
6.3 Standard-Library Headers and Namespace ................................. 72
6.4 Advice ......................................................................................... 74
# 7 Strings and Regular Expressions 75
7.1 Introduction ................................................................................. 75
7.2 Strings ......................................................................................... 75
7.3 Regular Expressions .................................................................... 78
7.4 Advice ......................................................................................... 84
# 8 I/O Streams 85
8.1 Introduction ................................................................................. 85
8.2 Output ......................................................................................... 86
8.3 Input ............................................................................................ 87
8.4 I/O State ...................................................................................... 89
8.5 I/O of User-Defined Types .......................................................... 90
8.6 Formatting ................................................................................... 91
8.7 File Streams ................................................................................ 92
8.8 String Streams ............................................................................. 92
8.9 Advice ......................................................................................... 93
# 9 Containers 95
9.1 Introduction ................................................................................. 95
9.2 vector ........................................................................................... 96
9.3 list ................................................................................................ 100
9.4 map .............................................................................................. 101
9.5 unordered_map ............................................................................ 102
9.6 Container Overview .................................................................... 103
9.7 Advice ......................................................................................... 104
# 10 Algorithms 107
10.1 Introduction ................................................................................. 107
10.2 Use of Iterators ............................................................................ 108
10.3 Iterator Types .............................................................................. 111
10.4 Stream Iterators ........................................................................... 112
10.5 Predicates .................................................................................... 113
10.6 Algorithm Overview ................................................................... 114
10.7 Container Algorithms ................................................................. 115
10.8 Advice ......................................................................................... 115
# 11 Utilities 117
11.1 Introduction ................................................................................. 117
11.2 Resource Management ................................................................ 117
11.3 Specialized Containers ................................................................ 121
11.4 Time ............................................................................................ 125
11.5 Function Adaptors ....................................................................... 125
11.6 Type Functions ............................................................................ 128
11.7 Advice ......................................................................................... 131
# 12 Numerics 133
12.1 Introduction ................................................................................. 133
12.2 Mathematical Functions .............................................................. 134
12.3 Numerical Algorithms ................................................................ 135
12.4 Complex Numbers ...................................................................... 135
12.5 Random Numbers ....................................................................... 136
12.6 Vector Arithmetic ........................................................................ 138
12.7 Numeric Limits ........................................................................... 138
12.8 Advice ......................................................................................... 138
# 13 Concurrency 141
13.1 Introduction ................................................................................. 141
13.2 Tasks and threads ........................................................................ 142
13.3 Passing Arguments ...................................................................... 143
13.4 Returning Results ........................................................................ 144
13.5 Sharing Data ................................................................................ 144
13.6 Waiting for Events ...................................................................... 146
13.7 Communicating Tasks ................................................................. 147
13.8 Advice ......................................................................................... 151
# 14 History and Compatibility 153
14.1 History ........................................................................................ 153
14.2 C++11 Extensions ....................................................................... 158
14.3 C/C++ Compatibility .................................................................. 161
14.4 Bibliography ............................................................................... 166
14.5 Advice ......................................................................................... 168