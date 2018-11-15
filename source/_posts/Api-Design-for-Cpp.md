---
title: Api Design for Cpp
date: 2018-10-18 13:47:22
tags:
---
[Api Design for Cpp](http://www.apibook.com/blog/)

### Introduction

#### More Robust Code
```CPP
Hides implementation.
Increases longevity.
Promotes modularization.
Reduces code duplication.
Removes hardcoded assumptions.
Easier to change the implementation.
Easier to optimize.
```
#### 1.3.3 Parallel Development
By stubbing out the API early on, you can write unit tests to validate the desired functionality and run these continuously   
to make sure that you haven’t broken your contract with your colleague.

#### 1.6 FILE FORMATS AND NETWORK PROTOCOLS
Whenever you create a file format or client/server protocol, you should also create an API for it. This allows details    
of the specification, and any future changes to it, to be centralized and hidden

### Qualities

#### 2.2 HIDE IMPLEMENTATION DETAILS
physical and logical hiding. Physical hiding means that the private source code is simply not made available to users. 
Physical hiding means storing internal details in a separate file (.cpp) from the public interface (.h).       
Logical hiding entails the use of language features to limit access to certain elements of the API.    
Logical hiding means using the C++ language features of protected and private to restrict access to internal details.

#### 2.2.3 Hide Member Variables
Data members of a class should always be declared private, never public or protected.   
If you make a variable protected, then it can be accessed directly by any clients that subclass your class,    
and then exactly the same arguments apply as for the public case.

#### 2.2.4 Hide Implementation Methods
Never return non-const pointers or references to private data members. This breaks encapsulation.   
Prefer declaring private functionality as static functions within the .cpp file rather than exposing them in public headers as private methods.    
(Using the Pimpl idiom is even better though.)

#### 2.3.2 Add Virtual Functions Judiciously
As a general rule of thumb, if your API does not call a particular method internally, then that method probably should not be virtual.   
interfaces should be non-virtual and they should use the Template Method design pattern where appropriate.    
This is often referred to as the Non-Virtual Interface idiom (NVI).   
Add convenience APIs as separate modules or libraries that sit on top of your minimal core API.   

#### 2.4 EASY TO USE

#### 2.4.3 Consistent
Instead, you should explicitly
design for this by manually identifying the common concepts across your classes and using the same conventions to represent these concepts in each class.    
This is often referred to as static polymorphism.
```Cpp
template <typename T>
class Coord2D
{
public:
	Coord2D(T x, T y) : mX(x), mY(y) {};
	T GetX() const { return mX; }
	T GetY() const { return mY; }
	void SetX(T x) { mX ¼ x; }
	void SetY(T y) { mY ¼ y; }
	void Add(T dx, T dy) { mX þ¼ dx; mY þ¼ dy; }
	void Multiply(T dx, T dy) { mX *¼ dx; mY *¼ dy; }
private:
	T mX;
	T mY;
};
```

#### 2.4.4 Orthogonal
1. Reduce redundancy. Ensure that the same information is not represented in more than one way.    
There should be a single authoritative source for each piece of knowledge.    
2. Increase independence. Ensure that there is no overlapping of meaning in the concepts that are    
exposed. Any overlapping concepts should be decomposed into their basal components.    

#### 2.4.5 Robust Resource Allocation
In general, if you have a function that returns a pointer that your clients should delete or if you    
expect the client to need the pointer for longer than the life of your object,    
then you should return it using a smart pointer, such as a boost::shared_ptr.     
However, if ownership of the pointer will be retained by your object, then you can return a standard pointer.   
```Cpp
// ownership of MyObject* is transferred to the caller
boost::shared_ptr<MyObject> GetObject() const;
// ownership of MyObject* is retained by the API
MyObject* GetObject() const;
```
Think of resource allocation and deallocation as object construction and destruction.   

#### 2.4.6 Platform Independent
Never put platform-specific #if or #ifdef statements into your public APIs. 写到实现中去。   
It exposes implementation details and makes your API appear different on different platforms.

#### 2.5 LOOSELY COUPLED

#### 2.5.2 Reducing Class Coupling
Prefer using non-member non-friend functions instead of member functions to reduce coupling.
```Cpp
// myobject.h
class MyObject
{
public:
	std::string GetName() const;
	. . .
protected:
	. . .
private:
	. . .
};

// myobjecthelper.h
namespace MyObjectHelper
{
	void PrintName(const MyObject &obj);
};
```

#### 2.5.4 Manager Classes
Manager classes can reduce coupling by encapsulating several lower-level classes.

#### 2.5.5 Callbacks, Observers, and Notifications
```Cpp
• Reentrancy. When writing an API that calls out to unknown user code, you have to consider that
this code may call back into your API. In fact, the client may not even realize that this is happening.
For example, if you are processing a queue of objects and you issue a callback as you process
each individual object, it is possible that the callback will attempt to modify the state of the queue
by adding or removing objects. At a minimum, your API should guard against this behavior with
a coding error. However, a more elegant solution would be to allow this reentrant behavior and
implement your code such that it maintains a consistent state.
• Lifetime management. Clients should have a clean way to disconnect from your API, that is, to
declare that they are no longer interested in receiving updates. This is particularly important when
the client object is deleted because further attempts to send messages to it could cause a crash.
Similarly, your API may wish to guard against duplicate registrations to avoid calling the same
client code multiple times for the same event.
• Event ordering. The sequence of callbacks or notifications should be clear to the user of your API.
For example, the Cocoa API does a good job ofmaking it clear whether a notification is sent before or
after an event by using names such as willChange and didChange. However, the Qt toolkit is less specific
about this: a changed signal is sometimes sent before the object in question is actually updated.
```

### Patterns

#### 3.1.1 Using Pimpl
When using the pimpl idiom use a private nested implementation class.     
Only use a public nested Impl class (or a public non-nested class) if other classes or free functions in the .cpp must access Impl members.

#### 3.1.2 Copy Semantics
Make your class uncopyable. OR Explicitly define the copy semantics. 避免对象被浅拷贝导致两次析构同一对象导致crash.

#### 3.1.5 Disadvantages of Pimpl

#### 3.2 SINGLETON

#### 3.2.1 Implementing Singletons in C++
The relative order of initialization of non-local static objects in different translation units is undefined (Meyers, 2005).
This means that it would be dangerous to initialize our singleton using a non-local static variable.    
A non-local object is one that is declared outside of a function.    
Static objects include global objects and objects declared as static inside of a class, function, or a file scope.   
```Cpp
Singleton &Singleton::GetInstance()
{
	static Singleton instance;
	return instance;
}
```

#### 3.2.2 Making Singletons Thread Safe
Creating a thread-safe Singleton in C++ is hard. Consider initializing it with a static constructor or an API initialization function.

#### 3.2.3 Singleton versus Dependency Injection
设置成员指针通过传递相关对象进行绑定。通过dependency container建立关系。

#### 3.2.4 Singleton versus Monostate
Consider using Monostate instead of Singleton if you don’t need lazy initialization of global data or if you want the singular nature of the class to be transparent.

#### 3.2.5 Singleton versus Session State
There are several alternatives to the Singleton pattern, including dependency injection, the Monostate pattern, and use of a session context.

### 3.3 FACTORY METHODS