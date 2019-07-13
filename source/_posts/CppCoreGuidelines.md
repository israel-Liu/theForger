---
title: CppCoreGuidelines
date: 2018-09-21 11:19:27
tags:
---

## [静态分析](https://docs.microsoft.com/en-us/visualstudio/code-quality/code-analysis-for-c-cpp-overview?view=vs-2019)

## [C++ Core Guidelines](http://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines)

### In: Introduction

#### In.target: Target readership
文档适用于 C++ / C 程序员

#### In.aims: Aims
目标是写出和底层语言效率相当的代码。[A rationale for semantically enhanced library languages](http://www.stroustrup.com/SELLrationale.pdf)
The result is a subset of a superset of a language called a Semantically Enhanced Library Language.

#### In.not: Non-aims

#### In.force: Enforcement
#### In.struct: The structure of this document
#### In.sec: Major sections

### P: Philosophy

#### P.1: Express ideas directly in code   
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

#### P.3: Express intent
```Cpp
simple for loops vs. range-for loops
f(T*, int) interfaces vs. f(span<T>) interfaces
loop variables in too large a scope
naked new and delete
functions with many parameters of built-in types
```

#### P.4: Ideally, a program should be statically type safe
```Cpp
unions – use variant (in C++17)
casts – minimize their use; templates can help
array decay – use span (from the GSL)
range errors – use span
narrowing conversions – minimize their use and use narrow or narrow_cast (from the GSL) where they are necessary
```

#### P.5: Prefer compile-time checking to run-time checking
```Cpp
Look for pointer arguments.
Look for run-time checks for range violations.

// Int is an alias used for integers
static_assert(sizeof(Int) >= 4);    // do: compile-time check

void read(span<int> r); // read into the range of integers r

int a[100];
read(a);        // better: let the compiler figure out the number of elements
```

#### P.6: What cannot be checked at compile time should be checkable at run time
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

### I: Interfaces

#### I.3: Avoid singletons
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

#### I.11: Never transfer ownership by a raw pointer (T*) or reference (T&)
(Simple) Warn if the return value of new or a function call with an owner return value is assigned to a raw pointer or non-owner reference.   

#### I.12: Declare a pointer that must not be null as not_null    
(Complex) If a function with pointer return value ensures it is not nullptr on all return paths, then warn the return type should be declared [not_null](https://github.com/Microsoft/GSL/blob/831584d94778e360d1616edc8b1562516795a853/include/gsl/pointers)

#### I.27: For stable library ABI, consider the Pimpl idiom
```Cpp
Reason Because private data members participate in class layout and private member functions participate in overload resolution, 
changes to those implementation details require recompilation of all users of a class that uses them. 
A non-polymorphic interface class holding a pointer to implementation (Pimpl) can isolate the users of a class from changes in its implementation at the cost of an indirection.
```
#### I.30: Encapsulate rule violations

### F: Functions
#### F.1: “Package” meaningful operations as carefully named functions    
Note If you write a non-trivial lambda that potentially can be used in more than one place, give it a name by assigning it to a (usually non-local) variable.
```CPP
auto lessT = [](T x, T y) { return x.rank() < y.rank() && x.value() < y.value(); };

sort(a, b, lessT);
find_if(a, b, lessT);
```

#### F.2: A function should perform a single logical operation
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

#### F.4: If a function may have to be evaluated at compile time, declare it constexpr

#### F.5: If a function is very small and time-critical, declare it inline

#### F.16: For “in” parameters, pass cheaply-copied types by value and others by reference to const    
(Simple) ((Foundation)) Warn when a parameter being passed by value has a size greater than 4 * sizeof(int). Suggest using a reference to const instead.    
(Simple) ((Foundation)) Warn when a const parameter being passed by reference has a size less than 3 * sizeof(int). Suggest passing by value instead.    
(Simple) ((Foundation)) Warn when a const parameter being passed by reference is moved.    

#### F.23: Use a not_null<T> to indicate that “null” is not a valid value
(Simple) Warn if a raw pointer is dereferenced without being tested against nullptr (or equivalent) within a function, suggest it is declared not_null instead.    
(Simple) Error if a raw pointer is sometimes dereferenced after first being tested against nullptr (or equivalent) within the function and sometimes is not.    
(Simple) Warn if a not_null pointer is tested against nullptr within a function.    

#### F.43: Never (directly or indirectly) return a pointer or a reference to a local object

#### F.50: Use a lambda when a function won’t do (to capture local variables, or to write a local function)
Reason Functions can’t capture local variables or be declared at local scope;     
if you need those things, prefer a lambda where possible, and a handwritten function object where not.     
On the other hand, lambdas and function objects don’t overload;     
if you need to overload, prefer a function (the workarounds to make lambdas overload are ornate).     
If either will work, prefer writing a function; use the simplest tool necessary.

### C: Classes and class hierarchies

#### C.4: Make a function a member only if it needs direct access to the representation of a class

#### C.5: Place helper functions in the same namespace as the class they support
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

#### C.31: All resources acquired by a class must be released by the class’s destructor

#### C.82: Don’t call virtual functions in constructors and destructors