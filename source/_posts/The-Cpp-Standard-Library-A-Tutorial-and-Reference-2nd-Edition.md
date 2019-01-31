---
title: The_Cpp_Standard_Library_A_Tutorial_and_Reference_2nd_Edition
date: 2019-01-23 14:04:08
tags:
---

最近看了WIN核心编程后想再提升下C++语言方面的知识，访问了网站 [IsoCpp](https://isocpp.org/get-started)，看到了几本相关书籍。   
   
经大佬前同事推荐然后选择先看这本书，首先这本书在我两年前看C++ Primer的时候是看过的。当初是从会用的角度，再看一遍以用好为目标。

	### Looking for the authoritative tutorial and reference for the C++ standard library?    

	A Tutorial and Reference by renowned ISO C++ member Nicolai Josuttis is the most respected book for learning and studying the standard library.    

	It provides comprehensive documentation of each library component, including an introduction to its purpose and design; clearly written explanations of complex concepts;    

	the practical programming details needed for effective use; traps and pitfalls; the exact signature and definition of the most important classes and functions;    

	and numerous examples of working code. You’ll find it all here – everything from concurrency and clocks, to the new hash-based containers and regular expressions,    
	to high-quality guidance on how to use key language features like lambdas with it all.

## Preface to the Second Edition


## Acknowledgments for the Second Edition


## Preface to the First Edition


## Acknowledgments for the First Edition


# Chapter 1 : About This Book


### 1.1 Why This Book
本书从概念的角度介绍了C11的库和组件，描述了使用细节。使用示例来演示组件的精确使用。


### 1.2 Before Reading This Book
主要描述库的实现细节，所以要求具备一定C++基础。


### 1.3 Style and Structure of the Book
本书先介绍了一般概念和库使用的实用程序(utilities), 然后在一章或多章介绍components第一个介绍STL。最后描述self-explanatory components。  

每个组件介绍从设计目的和用途开始，然后介绍使用方法和避免陷阱，最后细节描述和reference。


### 1.4 How to Read This Book
作为C++程序员就是从头阅读到位，然后自己使用组件编码。


## Chapter 2 Introduction to C++ and the Standard Library


### 2.1 History of the C++ Standards
第一个C++标准1998年发布的C++98，2003年对第一个标准打了补丁叫C++03，2007年发布了TR1是一个库扩展技术报告包含在std::tr1命名空间。  

C++0x是C++11的早期项目名称于2011年作为第二版标准发布称为C++11.这个可以本书侧重点。

#### 2.1.1 Common Questions about the C++11 Standard


#### 2.1.2 Compatibility between C++98 and C++11
	For C++11, the following definition holds when compiling a C++ translation unit:
	#define __cplusplus 201103L
	By contrast, with both C++98 and C++03, it was:
	#define __cplusplus 199711L
C++11编译器向后兼容C++98可以正确编译C++98标准的源代码，但是符合C++11标准的连接器没法正确连接C++98编译过的二进制。


### 2.2 Complexity and Big-O Notation
主要用来衡量算法效率的概念，不考虑其它时间消耗，不如插入效率不考虑内存不够需要分配内存所花费的时候。amortized？


## Chapter 3 : New Language Features


### 3.1 New C++11 Language Features


#### 3.1.1 Important Minor Syntax Cleanups
nullptr 类型是 std::nullptr_t 可以赋值为各种指针类型。


#### 3.1.2 Automatic Type Deduction with auto
[CppCon 2014: Scott Meyers "Type Deduction and Why You Care"](https://www.youtube.com/watch?v=wQxj20X-tIU)

#### 3.1.3 Uniform Initialization and Initializer Lists
C++11开始所有初始化都可以使用大括号。传递错误类型可能会导致初始化失败。std::initializer_list<>可以用来处理一列数据。

	int x1(5.3); // OK, but OUCH: x1 becomes 5
	int x2 = 5.3; // OK, but OUCH: x2 becomes 5
	int x3{5.0}; // ERROR: narrowing
	int x4 = {5.3}; // ERROR: narrowing
	char c1{7}; // OK: even though 7 is an int, this is not narrowing
	char c2{99999}; // ERROR: narrowing (if 99999 doesn’t fit into a char)
	std::vector<int> v1 { 1, 2, 4, 5 }; // OK
	std::vector<int> v2 { 1, 2.3, 4, 5.6 }; // ERROR: narrowing doubles to ints
	
explicit 关键字和 initializer lists 的结合使用，可以显示初始化多个值。

	Because of initializer lists, explicit now also becomes relevant for constructors taking more than one argument. 
	So, you can now disable automatic type conversions from multiple values, which is also used when an initialization uses the = syntax:
	In the same manner, an explicit constructor taking an initializer list disables implicit conversions for initializer lists with zero, one, or more initial values.
	
#### 3.1.4 Range-Based for Loops
添加引用避免拷贝。auto == vec 元素类型。No explicit type conversions are possible when elements are initialized as decl inside the for loop.
	
	for ( auto& elem : vec ) {
		elem *= 3;
	}
	
#### 3.1.5 Move Semantics and Rvalue References
当调用者不再使用传递的参数时，可以使用移动语义避免拷贝。右值只能出现在等号右边为啥还可以修改？
使用右值构造的对象，就相当于View如果他具备Owner就可以修改内部数据。如std::string内部维护的内存字符。

	Thus, you usually have to clear the contents of the passed argument (for example, by assigning nullptr to its internal member referring to its elements).
	
#### 3.1.6 New String Literals
原始字符串定义多用于正则表达式。

#### 3.1.7 Keyword noexcept
不确定如何补救的行为不抛出异常可以节约运行开销，只有出现异常无法执行的情况才需要抛出异常。

	If foo() throws — the program is terminated, calling std::terminate(), which by default calls std::abort()
	
#### 3.1.8 Keyword constexpr
用来在编译期确定表达式的值(metaprogramming)可以用表达式指定数值大小了。

	std::array<float, std::numeric_limits<short>::max()> a; // Since C++ 11
	
#### 3.1.9 New Template Features
	Note that it is currently under discussion whether the following example also is valid. The reason is
	that formally for a single argument the variadic form is ambiguous with the nonvariadic form for a
	single argument; however, compilers usually accept this code:
	template <typename T>
	void print (const T& arg)
	{
		std::cout << arg << std::endl;
	}
	template <typename T, typename... Types>
	void print (const T& firstArg, const Types&... args)
	{
		std::cout << firstArg << std::endl; // print first argument
		print(args...); // call print() for remaining arguments
	}
	Inside variadic templates, sizeof...(args) yields the number of arguments.
	Class std::tuple<> makes heavy use of this feature (see Section 5.1.2, page 68).
	
#### 3.1.10 Lambdas
使用mutable可以对按值捕获的外部变量进行改变。

#### 3.1.11 Keyword decltype
可以让编译器找到表达式类型。

#### 3.1.12 New Function Declaration Syntax
	template <typename T1, typename T2>
	auto add(T1 x, T2 y) -> decltype(x+y);
	
#### 3.1.13 Scoped Enumerations
使用std::underlying_type可以获取底层类型。
	enum class Salutation : char { mr, ms, co, none }; 
	
#### 3.1.14 New Fundamental Data Types
	• char16_t and char32_t
	• long long and unsigned long long
	• std::nullptr_t
	
#### 3.2 Old “New” Language Features
	// Nontype Template Parameters
	bitset<32> flags32; // bitset with 32 bits
	bitset<50> flags50; // bitset with 50 bits
	
	
	
	// Default Template Parameters
	template <typename T, typename container = vector<T>>
	class MyClass;
	
	
	
	// Keyword typename 这个在STL里面太常见了，理解了可以更好理解源码
	template <typename T>
	class MyClass {
		typename T::SubType * ptr;  // 这里声明是SubType个类型，要求T里面提供类型SubType
		...
	};
	
	class Q {
		typedef int SubType;
		...
	};
	MyClass<Q> x; // OK
	
	
	
	// Member Templates 模板构造函数。C++模板还是强大啊，还需要好好理解。
	class MyClass {
		...
		template <typename T>
		void f(T);				   // 这里f可以接收人任何类型的参数。
	};
	
	template <typename T>
	class MyClass {
		private:
			T value; // Support automatic type conversions for members in class templates.
		public:
			void assign (const MyClass<T>& x) { // x must have same type as *this
				value = x.value;
			}
		...
	};
	
	
#### 3.2.1 Explicit Initialization for Fundamental Types
	template <typename T>
	void f()
	{
		T x = T(); // zero initialized 我想这是个新叫法。没有的话使用
		...
	}

	
#### 3.2.2 Definition of main()
return 0; 不是必须的，可以调用 exit()，quick_exit()，terminate()。


## Chapter 4 General Concepts


### 4.1 Namespace std
Unlike a class, a namespace is open for extensions that might occur at any source。   
Thus, you could use a namespace to define components that are distributed over several physical modules.
要小心在头文件中使用 using namespace std; 这可能会导致名字冲突或因为重载导致不同行为。


### 4.2 Header Files
	#include <string> 		// 新的形式包含在 std 中
	#include <cstring>  	// 老式头的新文件在 std 中
	#include <stdlib.h> 	// 老版头在 std 和全局空间都有声明。
	#include <iostream.h> 	// 废弃的老版本C++头文件格式。
	
	
### 4.3 Error and Exception Handling
像 string 会检查可能错误并抛出异常。STL更喜欢效率很少检查逻辑错误，只在运行时出错抛出异常。


### 4.3.1 Standard Exception Classes
所有异常语言的还是库的都从exception类继承。![](https://github.com/israel-Liu/theForger/raw/master/images/exception.png)


#### 4.3.2 Members of Exception Classes 
错误条件(std::error_condition) -> 条件枚举值，错误代码(std::error_code) -> 含义。 ec is a error object. 
[Modernizing Legacy C++ Code](https://www.youtube.com/watch?v=LDxAgMe6D18&index=9&list=PLHTh1InhhwT7esTl1bRitiizeEnksGU7J&t=0s)
	if (ec == std::errc::invalid_argument) { // check for specific error condition
	...
	}
	if (ec == std::future_errc::no_state) { // check for specific error code
	...
	}

	
#### 4.3.3 Passing Exceptions with Class exception_ptr
This feature is especially useful to pass exception between threads (see Section 18.2.1, page 964).


#### 4.3.4 Throwing Standard Exceptions
非语言基本的异常错误(bad_cast, bad_typeid, bad_exception)都可以通过 what() 返回值进行构造异常对象。
	throw std::out_of_range ("out_of_range (somewhere, somehow)");
	throw std::system_error (std::make_error_code(std::errc::invalid_argument), "argument ... is not valid");
	
	
#### 4.3.5 Deriving from Standard Exception Classes
继承基类 exception 并且实现虚函数 what() 和 code() Shample: Stack in Section 12.1.3, page 635.


#### 4.4 Callable Objects
	• A function, where additional args are passed to as arguments
	• A pointer to a member function, which is called for the object passed as the first additional
	  argument (must be reference or pointer) and gets the remaining arguments as member function parameters
	• A function object (operator () for a passed object), where additional args are passed as arguments
	• A lambda (see Section 3.1.10, page 28), which strictly speaking is a kind of function object
	

#### 4.5 Concurrency and Multithreading 
STL是共享的当同时使用构造的对象时候就要考虑同步。[Overview of Parallel Programming in C++](https://www.youtube.com/watch?v=y0GSc5fKtl8&t=2229s)


#### 4.6 Allocators
分配器为分配内存加了一层封装，可以指定如何分配内存。默认分配器比较常用。后面细看都可以用于共享内存等哪些实现。



## Chapter 5 Utilities
	Type traits are used wherever complicated type conversions are necessary.
	
	
### 5.1 Pairs and Tuples


#### 5.1.1 Pairs


#### 5.1.2 Tuples


#### 5.1.3 I/O for Tuples
这个在boost里面有实现大量使用metaprogramming，并没有被移植到STL中。


#### 5.1.4 Conversions between tuples and pairs


### 5.2 Smart Pointers


#### 5.2.1 Class shared_ptr
提供 operators * and -> 就像使用原始指针一样使用智能指针对象。


#### 5.2.2 Class weak_ptr
The lifetime of a reference to an object outlives the object it refers to. weak_ptr 对象生命周期长于它引用的对象。


#### 5.2.3 Misusing Shared Pointers
Only one group of shared pointers owns an object. 防止多次析构。还有很多坑没搞清楚前不要乱用。


#### 5.2.4 Shared and Weak Pointers in Detail


#### 5.2.5 Class unique_ptr


#### 5.2.6 Class unique_ptr in Detail


#### 5.2.7 Class auto_ptr


#### 5.2.8 Final Words on Smart Pointers


### 5.3 Numeric Limits