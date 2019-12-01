---
title: CppCoreGuidelines
date: 2018-09-21 11:19:27
tags:
---

## [静态分析](https://docs.microsoft.com/en-us/visualstudio/code-quality/code-analysis-for-c-cpp-overview?view=vs-2019)

## [C++ Core Guidelines](http://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines)

## [FxCop](https://docs.microsoft.com/en-us/previous-versions/dotnet/netframework-3.0/bb429476(v=vs.80))

## visual studio 2019 支持
C:\Program Files (x86)\Microsoft Visual Studio\2019\Preview\Team Tools\Static Analysis Tools
C:\Program Files (x86)\Microsoft Visual Studio\2019\Preview\VC\Tools\MSVC\14.22.27812
C:\Program Files (x86)\Microsoft Visual Studio\2019\Preview\VC\Auxiliary\VS\include\CppCoreCheck
msbuild /p:EnableCppCoreCheck=true /p:RunCodeAnalysis=true /p:CodeAnalysisRuleSet=CppCoreCheckRules.ruleset ...
https://github.com/MicrosoftDocs/visualstudio-docs/tree/master/docs/code-quality

## Abstract


## In: Introduction

### In.target: Target readership
文档适用于 C++ / C 程序员

### In.aims: Aims
目标是写出和底层语言效率相当的代码。[A rationale for semantically enhanced library languages](http://www.stroustrup.com/SELLrationale.pdf)
The result is a subset of a superset of a language called a Semantically Enhanced Library Language.
Build your ideal small foundation library and use that。

### In.not: Non-aims
Do the most good for most programmers。

### In.force: Enforcement
lifetime: No leaks (failing to delete or multiple delete) and no access to invalid objects (dereferencing nullptr, using a dangling reference).

### In.struct: The structure of this document

### In.sec: Major sections

## P: Philosophy

### P.1: Express ideas directly in code   
```Cpp
class Date {
    // ...
public:
    Month month() const;  // do
    int month();          // don't
    // ...
};

void f(vector<string>& v)
{
    string val;
    cin >> val;
    // ...
    auto p = find(begin(v), end(v), val);  // better
    // ...
}
```
Use const consistently (check if member functions modify their object; check if functions modify arguments passed by pointer or reference)
Any programmer should know the basics of the foundation libraries of the project being worked on, and use them appropriately。


### P.2: Write in ISO Standard C++


### P.3: Express intent
```Cpp
simple for loops vs. range-for loops
f(T*, int) interfaces vs. f(span<T>) interfaces
loop variables in too large a scope
naked new and delete
functions with many parameters of built-in types
```

### P.4: Ideally, a program should be statically type safe
```Cpp
unions – use variant (in C++17)
casts – minimize their use; templates can help
array decay – use span (from the GSL)
range errors – use span
narrowing conversions – minimize their use and use narrow or narrow_cast (from the GSL) where they are necessary
```

### P.5: Prefer compile-time checking to run-time checking
```Cpp
Look for pointer arguments.
Look for run-time checks for range violations.

// Int is an alias used for integers
static_assert(sizeof(Int) >= 4);    // do: compile-time check

void read(span<int> r); // read into the range of integers r

int a[100];
read(a);        // better: let the compiler figure out the number of elements
```

### P.6: What cannot be checked at compile time should be checkable at run time

```Cpp
// We need to pass the pointer and the number of elements as an integral object:

extern void f4(vector<int>&);   // separately compiled, possibly dynamically loaded
extern void f4(span<int>);      // separately compiled, possibly dynamically loaded
                                // NB: this assumes the calling code is ABI-compatible, using a
                                // compatible C++ compiler and the same stdlib implementation

void g3(int n)
{
    vector<int> v(n);
    f4(v);                     // pass a reference, retain ownership
    f4(span<int>{v});          // pass a view, retain ownership
}
``` 

### P.7: Catch run-time errors early

```
	Look at pointers and arrays: Do range-checking early and not repeatedly
	Look at conversions: Eliminate or mark narrowing conversions
	Look for unchecked values coming from input
	Look for structured data (objects of classes with invariants) being converted into strings
```

### P.8: Don’t leak any resources
Look at pointers: Classify them into non-owners (the default) and owners. 

### P.9: Don’t waste time or space
“Another benefit of striving for efficiency is that the process forces you to understand the problem in more depth.” - Alex Stepanov

### P.10: Prefer immutable data to mutable data

### P.11: Encapsulate messy constructs, rather than spreading through the code

### P.12: Use supporting tools as appropriate
使用静态分析工具。visual studio 2019 已经支持。

### P.13: Use support libraries as appropriate
先了解好你可以使用的最好的库。然后正确使用他们。


## I: Interfaces

### I.1: Make interfaces explicit

### I.2: Avoid non-const global variables

### I.3: Avoid singletons
Reason Singletons are basically complicated global objects in disguise.    
```Cpp
Note that the initialization of a local static does not imply a race condition. However, if the destruction of X involves an operation that needs to be synchronized we must use a less simple solution. For example:

X& myX()
{
    static auto p = new X {3};
    return *p;  // potential leak
}
Now someone must delete that object in some suitably thread-safe way. That’s error-prone, so we don’t use that technique unless

myX is in multi-threaded code,
that X object needs to be destroyed (e.g., because it releases a resource), and
X’s destructor’s code needs to be synchronized.
If you, as many do, define a singleton as a class for which only one object is created, functions like myX are not singletons, and this useful technique is not an exception to the no-singleton rule.
```

### I.4: Make interfaces precisely and strongly typed
Often, a template parameter can eliminate the void* turning it into a T* or T&. 
For the case of a set of boolean values consider using a flags enum; a pattern that expresses a set of boolean values.

```Cpp
enable_lamp_options(lamp_option::on | lamp_option::animate_state_transitions);
```

### I.5: State preconditions (if any)
目前C++已经提供了一种在函数后面写要求条件的方式。
[Constraints and concepts](https://en.cppreference.com/w/cpp/language/constraints)

### I.6: Prefer Expects() for expressing preconditions
对参数的确定检查。

### I.7: State postconditions
对返回值的确定检查。
Only postconditions related to the users can be stated in the interface. 
Postconditions related only to internal state belongs in the definition/implementation.

### I.8: Prefer Ensures() for expressing postconditions

### I.9: If an interface is a template, document its parameters using concepts
```
template<typename Iter, typename Val>
// requires InputIterator<Iter> && EqualityComparable<ValueType<Iter>>, Val>
Iter find(Iter first, Iter last, Val v)
{
    // ...
}
```

### I.10: Use exceptions to signal a failure to perform a required task
异常并不会影响性能。We don't consider "performance" a valid reason not to use exceptions.

### I.11: Never transfer ownership by a raw pointer (T*) or reference (T&)
(Simple) Warn if the return value of new or a function call with an owner return value is assigned to a raw pointer or non-owner reference.   
so use smart pointers only if reference semantics are needed.

### I.12: Declare a pointer that must not be null as not_null    
(Complex) If a function with pointer return value ensures it is not nullptr on all return paths, then warn the return type should be declared [not_null](https://github.com/Microsoft/GSL/blob/831584d94778e360d1616edc8b1562516795a853/include/gsl/pointers)

### I.13: Do not pass an array as a single pointer
最好把大小和数组放到一起传递。

### I.22: Avoid complex initialization of global objects
Flag initializers of globals that call non-constexpr functions
Flag initializers of globals that access extern objects

### I.23: Keep the number of function arguments low
Use a range or a view.

### I.24: Avoid adjacent unrelated parameters of the same type
还是没搞清楚什么时候用 pure interface，什么时候不用虚函数做接口。

```
virtual functions are designed to let derived classes customize behavior
```

### I.26: If you want a cross-compiler ABI, use a C-style subset

### I.27: For stable library ABI, consider the Pimpl idiom
```Cpp
Reason Because private data members participate in class layout and private member functions participate in overload resolution, 
changes to those implementation details require recompilation of all users of a class that uses them. 
A non-polymorphic interface class holding a pointer to implementation (Pimpl) can isolate the users of a class from changes in its implementation at the cost of an indirection.
```
### I.30: Encapsulate rule violations

## F: Functions

### F.1: “Package” meaningful operations as carefully named functions    
Note If you write a non-trivial lambda that potentially can be used in more than one place, give it a name by assigning it to a (usually non-local) variable.
```CPP
auto lessT = [](T x, T y) { return x.rank() < y.rank() && x.value() < y.value(); };

sort(a, b, lessT);
find_if(a, b, lessT);
```

### F.2: A function should perform a single logical operation
If there was a need, we could further templatize read() and print() on the data type, the I/O mechanism, the response to errors, etc. Example:
```CPP
auto read = [](auto& input, auto& value)    // better
{
    input >> value;
    // check for errors
};

auto print(auto& output, const auto& value)
{
    output << value << "\n";
}
```

### F.4: If a function may have to be evaluated at compile time, declare it constexpr

### F.5: If a function is very small and time-critical, declare it inline

### F.16: For “in” parameters, pass cheaply-copied types by value and others by reference to const    
(Simple) ((Foundation)) Warn when a parameter being passed by value has a size greater than 4 * sizeof(int). Suggest using a reference to const instead.    
(Simple) ((Foundation)) Warn when a const parameter being passed by reference has a size less than 3 * sizeof(int). Suggest passing by value instead.    
(Simple) ((Foundation)) Warn when a const parameter being passed by reference is moved.    

### F.20: For “out” output values, prefer return values to output parameters
```
// OK: return pointers to elements with the value x
vector<const int*> find_all(const vector<int>&, int x);
```
值返回使用返回值，多个使用元组？？。大结构返回使用out引用传出参数。

### F.23: Use a not_null<T> to indicate that “null” is not a valid value
(Simple) Warn if a raw pointer is dereferenced without being tested against nullptr (or equivalent) within a function, suggest it is declared not_null instead.    
(Simple) Error if a raw pointer is sometimes dereferenced after first being tested against nullptr (or equivalent) within the function and sometimes is not.    
(Simple) Warn if a not_null pointer is tested against nullptr within a function.    

### F.26: Use a unique_ptr<T> to transfer ownership where a pointer is needed
transferring is an object from a class hierarchy 使用指针(智能指针？)
如果需要返回locally allocated raw pointer使用智能指针管理声明周期。

### F.27: Use a shared_ptr<T> to share ownership
管理共享对象生命周期。


### F.43: Never (directly or indirectly) return a pointer or a reference to a local object

### F.50: Use a lambda when a function won’t do (to capture local variables, or to write a local function)
Reason Functions can’t capture local variables or be declared at local scope;     
if you need those things, prefer a lambda where possible, and a handwritten function object where not.     
On the other hand, lambdas and function objects don’t overload;     
if you need to overload, prefer a function (the workarounds to make lambdas overload are ornate).     
If either will work, prefer writing a function; use the simplest tool necessary.

### F.51: Where there is a choice, prefer default arguments over overloading


### F.60: Prefer T* over T& when "no argument" is a valid option
无参是有效操作使用指针，因为对象没有引用 nullptr 的。


## C: Classes and class hierarchies

### C.1: Organize related data into structures (structs or classes)
A simple class without virtual functions implies no space or time overhead.

### C.2: Use class if the class has an invariant; use struct if the data members can vary independently
invariant ？ 如果成员独立使用 struct 否则使用 class 

### C.3: Represent the distinction between an interface and an implementation using a class
Ideally, and typically, an interface is far more stable than its implementation(s).

### C.4: Make a function a member only if it needs direct access to the representation of a class

### C.5: Place helper functions in the same namespace as the class they support
```Cpp
namespace Chrono { // here we keep time-related services

    class Time { /* ... */ };
    class Date { /* ... */ };

    // helper functions:
    bool operator==(Date, Date);
    Date next_weekday(Date);
    // ...
}
```

### C.7: Don't define a class or enum and declare a variable of its type in the same statement

### C.8: Use class rather than struct if any member is non-public

### C.9: Minimize exposure of members
protected data is a bad idea. a derived class might be allowed to skip a run-time check。

### C.concrete: Concrete types
A value of regular type can be copied and the result of a copy is an independent object with the same value as the original.(Like int)

### C.10: Prefer concrete types over class hierarchies
继承类使用指针 That implies more memory overhead, more allocations and deallocations, and more run-time overhead to perform the resulting indirections.

### C.11: Make concrete types regular

### C.ctor: Constructors, assignments, and destructors

### C.defop: Default Operations

### C.20: If you can avoid defining any default operations, do
当成员变量可以提供的时候，最好使用自动生成的。

### C.21: If you define or =delete any default operation, define or =delete them all
= default; 告诉编译器生成默认函数,用于被抑制情况。=delete; 告诉编译器不要生成默认函数。
 
### C.22: Make default operations consistent
```
class Silly {   // BAD: Inconsistent copy operations
    class Impl {
        // ...
    };
    shared_ptr<Impl> p;
public:
    Silly(const Silly& a) : p{a.p} { *p = *a.p; }   // deep copy
    Silly& operator=(const Silly& a) { p = a.p; }   // shallow copy
    // ...
};
```
	[Destructor rules:]

### C.30: Define a destructor if a class needs an explicit action at object destruction
如果需要释放资源，或析构后做一些处理，定义析构函数，否则默认析构函数做的更好。

### C.31: All resources acquired by a class must be released by the class’s destructor
A class can hold pointers and references to objects that it does not own. Obviously, such objects should not be deleted by the class's destructor. 

### C.32: If a class has a raw pointer (T*) or reference (T&), consider whether it might be owning
Look at the initialization of raw member pointers and member references and see if an allocation is used.(分配了就owner负责释放)

### C.33: If a class has an owning pointer member, define or =delete a destructor
Why not just require all owning pointers to be "smart pointers"? That would sometimes require non-trivial code changes and may affect ABIs.

### C.35: A base class destructor should be either public and virtual, or protected and nonvirtual

### C.36: A destructor may not fail

### C.37: Make destructors noexcept

	[Constructor rules:]

### C.40: Define a constructor if a class has an invariant

### C.41: A constructor should create a fully initialized object
If a valid object cannot conveniently be constructed by a constructor, use a factory function.

### C.42: If a constructor cannot construct a valid object, throw an exception

### C.43: Ensure that a copyable (value type) class has a default constructor

C.44: Prefer default constructors to be simple and non-throwing
C.45: Don't define a default constructor that only initializes data members; use member initializers instead
C.46: By default, declare single-argument constructors explicit
C.47: Define and initialize member variables in the order of member declaration
C.48: Prefer in-class initializers to member initializers in constructors for constant initializers
C.49: Prefer initialization to assignment in constructors
C.50: Use a factory function if you need "virtual behavior" during initialization
C.51: Use delegating constructors to represent common actions for all constructors of a class
C.52: Use inheriting constructors to import constructors into a derived class that does not need further explicit initialization

	Copy and move rules:

C.60: Make copy assignment non-virtual, take the parameter by const&, and return by non-const&
C.61: A copy operation should copy
C.62: Make copy assignment safe for self-assignment
C.63: Make move assignment non-virtual, take the parameter by &&, and return by non-const&
C.64: A move operation should move and leave its source in a valid state
C.65: Make move assignment safe for self-assignment
C.66: Make move operations noexcept
C.67: A polymorphic class should suppress copying


	Other default operations rules:

C.80: Use =default if you have to be explicit about using the default semantics
C.81: Use =delete when you want to disable default behavior (without wanting an alternative)
### C.82: Don’t call virtual functions in constructors and destructors
C.83: For value-like types, consider providing a noexcept swap function
C.84: A swap may not fail
C.85: Make swap noexcept
C.86: Make == symmetric with respect of operand types and noexcept
C.87: Beware of == on base classes
C.89: Make a hash noexcept

### C.140: Do not provide different default arguments for a virtual function and an overrider

## Enum: Enumerations

## R: Resource management

### R.1: Manage resources automatically using resource handles and RAII (Resource Acquisition Is Initialization)


## ES: Expressions and statements

### ES.65: Don't dereference an invalid pointer
[Introduction to type and resource safety](https://github.com/isocpp/CppCoreGuidelines/blob/master/docs/Introduction%20to%20type%20and%20resource%20safety.pdf)

## Per: Performance

## CP: Concurrency and parallelism

## E: Error handling

## Con: Constants and immutability

## T: Templates and generic programming

## CPL: C-style programming

## SF: Source files

## SL: The Standard Library

## A: Architectural ideas

### A.1: Separate stable code from less stable code

### A.2: Express potentially reusable parts as a library

### A.4: There should be no cycles among libraries
However, a library should not depend on another that depends on it.

## NR: Non-Rules and myths

### NR.1: Don’t: All declarations should be at the top of a function
需要的时候定义并初始化变量。

### NR.2: Don’t: Have only a single return-statement in a function
Keep functions short and simple
Feel free to use multiple return statements (and to throw exceptions).

### NR.3: Don’t: Don’t use exceptions
Exceptions are for reporting errors。要正确使用异常，C++异常一直都是很少触碰的点，还是要好好研究一下。

### NR.4: Don’t: Place each class declaration in its own source file
Use namespaces containing logically cohesive sets of classes and functions.

### NR.5: Don’t: Don’t do substantive work in a constructor; instead use two-phase initialization
Always establish a class invariant in a constructor.
Don't define an object before it is needed.

### NR.6: Don’t: Place all cleanup actions at the end of a function and goto exit
Use exceptions and RAII
for non-RAII resources, use finally.

### NR.7: Don’t: Make all data members protected
Make member data public or (preferably) private。

## RF: References

### RF.rules: Coding rules

### RF.books: Books with coding guidelines

### RF.C++: C++ Programming (C++11/C++14/C++17)

### RF.web: Websites

### RS.video: Videos about "modern C++"

### RF.man: Manuals
[ISO C++ Standard C++17. Committee Draft.](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/n4606.pdf)

### RF.core: Core Guidelines materials

## Pro: Profiles
定型（typing，又称类型指派）赋予一组比特某个意义。类型通常和存储器中的数值或对象（如变量）相联系。
因为在计算机中，任何数值都是以一组比特简单组成的，硬件无法区分存储器地址、脚本、字符、整数、以及浮点数。
类型可以告知程序和程序设计者，应该怎么对待那些比特。 

### Pro.safety: Type-safety profile
type-safety is defined 没按照变量类型的规则使用变量。
安全性包括[Bounds safety](https://github.com/isocpp/CppCoreGuidelines/blob/master/CppCoreGuidelines.md#SS-bounds) 
和 [Lifetime safety](https://github.com/isocpp/CppCoreGuidelines/blob/master/CppCoreGuidelines.md#SS-lifetime)

### Pro.bounds: Bounds safety profile
bounds-safety 不使用对象访问没分配给它的内存资源。

### Pro.lifetime: Lifetime safety profile
[Lifetime](https://github.com/isocpp/CppCoreGuidelines/blob/master/docs/Lifetime.pdf)

## GSL: Guidelines support library

### GSL.view: Views
没太看懂 view 倒底是个啥概念。

### GSL.owner
unique_ptr<T>, shared_ptr<T>, stack_array<T> // A stack-allocated array.dyn_array<T> // A heap-allocated array. 

### GSL.assert: Assertions
[[expects: p]], Ensures 

### GSL.util: Utilities
joining_thread // a RAII style version of std::thread that joins.

### GSL.concept: Concepts

### GSL.ptr: Smart pointer concepts
Pointer 

## NL: Naming and layout rules

### NL.1: Don't say in comments what can be clearly stated in code
代码可以清晰表达意思的，就不要写在注释中。

### NL.2: State intent in comments
注释说明代码做了什么。

### NL.3: Keep comments crisp
Use intelligible English. 专业点。

### NL.4: Maintain a consistent indentation style
保持一致缩进。

### NL.5: Avoid encoding type information in names
避免在名称中编码类型信息

### NL.7: Make the length of a name roughly proportional to the length of its scope
名字长度和作用域成正比, 避免冲突。

### NL.8: Use a consistent naming style
ISO Standard: 只使用小写字母，数字，和下划线。

### NL.9: Use ALL_CAPS for macro names only
宏大写？？

### NL.10: Prefer underscore_style names
自己的类型用大写，是为了和库区分嘛？

### NL.11: Make literals readable
使用数字分隔符来避免长串的数字,auto c = 299'792'458; // m/s2, 使用文字后缀, auto hello = "Hello!"s; // a std::string.

### NL.15: Use spaces sparingly
有节奏的使用空格。

### NL.16: Use a conventional class member declaration order
```
types: classes, enums, and aliases (using)
constructors, assignments, destructor
functions
data
```

### NL.17: Use K&R-derived layout
这点我做的很好了。If 等条件循环风格。

### NL.18: Use C++-style declarator layout
T& operator[](size_t);   // OK

### NL.19: Avoid names that are easily misread
不要拼错了英文单词。

### NL.20: Don't place two statements on the same line

### NL.21: Declare one name (only) per declaration

### NL.25: Don't use void as an argument type
不使用 void 作为参数类型。

### NL.26: Use conventional const notation
const int x = 7;    // OK

## FAQ: Answers to frequently asked questions
常见问题答案。

## Appendix A: Libraries

## Appendix B: Modernizing code

## Appendix C: Discussion
Use of =, {}, and () as initializers ??? 
Use a factory function if you need "virtual behavior" during initialization。
基类用于多态的时候使用 public virtual 析构函数，否则使用 protected 非虚析构函数。

## Appendix D: Supporting tools

## Glossary
A class is made abstract by having a pure virtual function or only protected constructors.

## To-do: Unclassified proto-rules