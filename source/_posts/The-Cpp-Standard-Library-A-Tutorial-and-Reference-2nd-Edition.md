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
	
### 3.2 Old “New” Language Features
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


#### 4.3.1 Standard Exception Classes
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
模板特殊化numeric_limits可以使用依赖平台的基础类型


### 5.4 Type Traits and Type Utilities


#### 5.4.1 Purpose of Type Traits

	template <typename T1, typename T2>
	struct common_type<T1, T2> {
		typedef decltype(true ? declval<T1>() : declval<T2>()) type; // true ?
	};
	
	
#### 5.4.2 Type Traits in Detail
[trivial type](https://blog.csdn.net/LaoJiu_/article/details/66472089)
Note again that a reference to a constant type is not constant, so you can’t remove constness there.


#### 5.4.3 Reference Wrappers
	std::vector<std::reference_wrapper<MyClass>> coll;
	

#### 5.4.4 Function Type Wrappers
	class C {
	public:
		void memfunc (int x, int y) const;
	};
	std::function<void(const C&,int,int)> mf;
	mf = &C::memfunc;
	mf(C(),42,77);

	
### 5.5 Auxiliary Functions


#### 5.5.1 Processing the Minimum and Maximum
For an initializer list, you need an internal temporary, so returning a reference would return a dangling reference.

#### 5.5.2 Swapping Two Values


#### 5.5.3 Supplementary Comparison Operators


### 5.6 Compile-Time Fractional Arithmetic with Class ratio<>
	namespace std {
		template <intmax_t N, intmax_t D = 1>
		class ratio {
		public:
			typedef ratio<num,den> type;
			static constexpr intmax_t num;
			static constexpr intmax_t den;
		};
	}

### 5.7 Clocks and Timers
C++ standard library provides the basic C and POSIX interfaces to deal with calendar time.
![](https://github.com/israel-Liu/theForger/raw/master/images/ClocksAndTime.png)

#### 5.7.1 Overview of the Chrono Library
	template <typename V, typename R>
		ostream& operator << (ostream& s, const chrono::duration<V,R>& d)
		{
			s << "[" << d.count() << " of " << R::num << "/" << R::den << "]";
			return s;
		}

	
#### 5.7.3 Clocks and Timepoints
系统时间调整？原点坐标调整吗，3种时钟还是有点没理解。各种定义比 Unicode 还难理解。
UNIX epoch, January 1, 1970 ？ universal time (UTC) ？ 00:00 in Greenwich, UK. ？summertime ？


#### 5.7.4 Date and Time Functions by C and POSIX
time_t usually is just the number of seconds since the UNIX epoch, which is January 1, 1970.


#### 5.7.5 Blocking with Timers
计时器时间并不靠谱，包括一些没计算的耗时，还可能根据系统时间调整而变化。


### 5.8 Header Files <cstddef>, <cstdlib>, and <cstring>
主要就是C里面一些重要的东西在C++里的定义

#### 5.8.2 Definitions in <cstdlib>
	...

## Chapter 6 The Standard Template Library

### 6.1 STL Components

### 6.2 Containers

#### 6.2.1 Sequence Containers

#### 6.2.2 Associative Containers

#### 6.2.4 Associative Arrays

#### 6.2.5 Other Containers

#### 6.2.6 Container Adapters


### 6.3 Iterators
Thus,
	for (type elem : coll) {
		...
	}
is interpreted as
	for (auto pos=coll.begin(), end=coll.end(); pos!=end; ++pos) {
		type elem = *pos;
		...
	}

	
#### 6.3.1 Further Examples of Using Associative and Unordered Containers

#### 6.3.2 Iterator Categories

### 6.4 Algorithms

#### 6.4.1 Ranges
要保证区间的有效性，防止结尾区间大于开始区间。

#### 6.4.2 Handling Multiple Ranges

### 6.5 Iterator Adapters

#### 6.5.1 Insert Iterators
分别使用了成员函数所以要求提供了相应的成员函数才可以使用。back_inserter --> push_back(val)

#### 6.5.2 Stream Iterators


#### 6.5.3 Reverse Iterators
Create reverse iterators via their member functions rbegin() and rend().

#### 6.5.4 Move Iterators


### 6.6 User-Defined Generic Functions


### 6.7 Manipulating Algorithms
These aspects are surprising and show the price of the STL concept that separates containers and algorithms with great flexibility.


#### 6.7.1 “Removing” Elements
迭代器不知道他们的容器. 使用迭代器的算法不能访问容器的成员函数。不能真正erase元素。

#### 6.7.2 Manipulating Associative and Unordered Containers
使用提供的成员函数操作元素。

#### 6.7.3 Algorithms versus Member Functions
如果存在成员函数比通用算法效率更高更准确使用成员函数代替算法。


### 6.8 Functions as Algorithm Arguments

#### 6.8.1 Using Functions as Algorithm Arguments


#### 6.8.2 Predicates
They should always yield the same result for the same value.

### 6.9 Using Lambdas
不能保存状态，必须在外部定义，在内部捕捉引用。函数对象可以在内部保存状态，在不同地方使用。

### 6.10 Function Objects

#### 6.10.1 Definition of Function Objects
Rarely are things not possible in C++.


#### 6.10.2 Predefined Function Objects
用于set等构造函数排序方式，用在算法中。

#### 6.10.3 Binders
也叫做函数适配器，通过低级函数对象组成高级函数对象。


### 6.11 Container Elements

#### 6.11.1 Requirements for Container Elements
自定义对象作为容器元素的时候需要满足这些条件，例如提供 operator <


#### 6.11.2 Value Semantics or Reference Semantics
STL容器提供值语义，放入容器中的是原始值的副本。可以通过其它方式实现引用语义，比如使用智能指针或者std::reference_wrapper<>


#### 6.12 Errors and Exceptions inside the STL

#### 6.12.1 Error Handling
可以使用安全版本的STL库。

#### 6.12.2 Exception Handling
STL提供了一些保证，在析构函数不抛出异常的情况，很多操作要么成功要么没有影响，出错不抛出异常。

### 6.13 Extending the STL

#### 6.13.1 Integrating Additional Types

#### 6.13.2 Deriving from STL Types
出于性能原因STL类没有提供虚函数，所以不能通过继承提供多态性，可以在内部使用STL类来定义新类。


## Chapter 7 STL Containers

### 7.1 Common Container Abilities and Operations

#### 7.1.1 Container Abilities
提供值语义，保证在不更改的前提下多次访问结果相同，不跑出异常需要调用者满足调用要求。

#### 7.1.2 Container Operations
() 和 = 构造有啥区别？
	// move all elements of the list into a vector
	std::vector<std::string> c(std::make_move_iterator(l.begin()), std::make_move_iterator(l.end()));
	
	
#### 7.1.3 Container Types
使用 typedef 和 typename 定义了一些类型 

### 7.2 Arrays

#### 7.2.1 Abilities of Arrays
So, iterators and references refer to the same container but different elements afterward. 这点和其它容器不同。


#### 7.2.2 Array Operations


#### 7.2.3 Using arrays as C-Style Arrays
Use data() where the ordinary C-style interface is required.

#### 7.2.4 Exception Handling

#### 7.2.5 Tuple Interface
	typedef std::array<std::string,5> FiveStrings;
	FiveStrings a = { "hello", "nico", "how", "are", "you" };
	std::tuple_size<FiveStrings>::value // yields 5
	std::tuple_element<1,FiveStrings>::type // yields std::string
	std::get<1>(a) // yields std::string("nico")
	

#### 7.2.6 Examples of Using Arrays


### 7.3 Vectors
使用 reserve() 成员函数分配大小，避免复杂类型初始化影响性能。


#### 7.3.1 Abilities of Vectors
std::vector<T>(v).swap(v); 缩小容器后iter有效，shrink_to_fit()(C++11)缩小容器大小后iter无效。


#### 7.3.2 Vector Operations
使用成员函数 at() 访问元素有范围检查，会抛出 out_of_range 异常。


#### 7.3.3 Using Vectors as C-Style Arrays


#### 7.3.4 Exception Handling


#### 7.3.5 Examples of Using Vectors
一般实现是默认申请 2k 空间，如果不够用翻倍。


#### 7.3.6 Class vector<bool>
vector<bool> 是动态调整的 bit 数组，如果你想使用固定大小的 bit 数组。使用 bitset。

	namespace std {
		template <typename Allocator> class vector<bool,Allocator> {
			public:
				// auxiliary proxy type for element modifications:
				class reference {
					...
					public:
						reference& operator= (const bool) noexcept; // assignments
						reference& operator= (const reference&) noexcept;
						operator bool() const noexcept; // automatic type conversion to bool
						void flip() noexcept; // bit complement
				};
				...
				// operations for element access return reference proxy instead of bool:
				reference operator[](size_type idx);
				reference at(size_type idx);
				reference front();
				reference back();
				...
		};
	}
	

#### 7.4 Deques
Deque is typically implemented as a bunch of individual blocks, 第一个和最后一个增长方向相反。


#### 7.4.1 Abilities of Deques


#### 7.4.2 Deque Operations


#### 7.4.3 Exception Handling


#### 7.4.4 Examples of Using Deques


### 7.5 Lists
C++ standard library does not specify the kind of the implementation, but it follows from the list’s name, constraints, and specifications.


#### 7.5.1 Abilities of Lists


#### 7.5.2 List Operations
两个相同  list 之间直接操作内部指针，合并什么的非常快。


#### 7.5.3 Exception Handling


#### 7.5.4 Examples of Using Lists


### 7.6 Forward Lists

#### 7.6.1 Abilities of Forward Lists
_after, 后入。

#### 7.6.2 Forward List Operations


#### 7.6.3 Exception Handling


#### 7.6.4 Examples of Using Forward Lists


### 7.7 Sets and Multisets
各种数学准则用于排序。


#### 7.7.1 Abilities of Sets and Multisets
不可以修改value，因为value就是key有顺序，需要remove然后insert。


#### 7.7.2 Set and Multiset Operations
```Cpp
	c.lower_bound(val) // 返回第一个 >= val 值的位置，val 插入的第一个位置
	c.upper_bound(val) // 返回第一个 > val 值的位置，val 插入的最后一个位置 [pos_val, end) 开区间
	c.equal_range(val) // [begin_val, end_val)
	
	c.emplace(args...) // args 用来初始化 set 里面成员
	
	std::multiset<Elem> coll;
	...
	/ remove first element with passed value
	std::multiset<Elem>::iterator pos;
	pos = coll.find(value);
	if (pos != coll.end()) {
		coll.erase(pos);              // set直接使用 coll.erase(value) multiset 使用单值的效率低。
	}
```
	
#### 7.7.3 Exception Handling


#### 7.7.4 Examples of Using Sets and Multisets


#### 7.7.5 Example of Specifying the Sorting Criterion at Runtime


### 7.8 Maps and Multimaps


#### 7.8.1 Abilities of Maps and Multimaps
不可以直接修改key但是可以修改value。


#### 7.8.2 Map and Multimap Operations
You can define the sorting criterion in two ways, 模板参数(sorting criterion is part of the type)编译期期确定和构造函数参数运行期确定。

	std::multimap<std::string,float> coll;
	...
	// do something with all elements having a certain value
	std::multimap<std::string,float>::iterator pos;
	for (pos = coll.begin(); pos != coll.end(); ++pos) {
		if (pos->second == value) {
			do_something(); // 如果是查询key请使用成员函数效率更高。
		}
	}

c1.swap(c2) 元素被交换的时候排序标准是否不交换。

	std::map<std::string,float> coll;
	...
	coll.insert(std::map<std::string,float>::value_type("otto", 22.3));
	or
	coll.insert(decltype(coll)::value_type("otto",22.3));

	
	std::map<std::string,std::complex<float>> m;
	m.emplace(std::piecewise_construct, // pass tuple elements as arguments
	std::make_tuple("hello"), // elements for the key
	std::make_tuple(3.4,7.8)); // elements for the value
	
	// remove all elements having a certain value // before C++11
	for (pos = coll.begin(); pos != coll.end(); ) {
		if (pos->second == value) {
			coll.erase(pos++);
		}
		else {
			++pos;
		}
	}
	
	
#### 7.8.3 Using Maps as Associative Arrays
一定要清醒每次操作都做了哪些看不到的事情，包括调用值的构造函数。std::cout << coll["ottto"]; // 同样会发生插入和赋初值对于不存在的key。


#### 7.8.4 Exception Handling


#### 7.8.5 Examples of Using Maps and Multimaps
查询key用成员函数，查询value用算法。使用value_type声明变量。


#### 7.8.6 Example with Maps, Strings, and Sorting Criterion at Runtime


### 7.9 Unordered Containers


#### 7.9.1 Abilities of Unordered Containers
重hash是不是就是因为当前出现了元素冲突。


#### 7.9.2 Creating and Controlling Unordered Containers
	std::size_t customer_hash_func (const Customer& c)
	{
		return ...
	};
	std::unordered_set<Customer,std::size_t(*)(const Customer&)>
	custset(20,customer_hash_func);


#### 7.9.3 Other Operations for Unordered Containers
当发生重新hash的时候迭代器无效但是对元素的引用还是有效的，可能是因为迭代器和buckets有关系。


#### 7.9.4 The Bucket Interface
了解内部结构，看啥函数都很清晰。


#### 7.9.5 Using Unordered Maps as Associative Arrays


#### 7.9.6 Exception Handling
所有不抛出异常的行为，都依赖于所使用的函数不抛出异常。


#### 7.9.7 Examples of Using Unordered Containers
重新hash保证等价元素相对位置，但是插入顺序不一定是等于相对位置。


### 7.10 Other STL Containers
侵入性提供自己的容器包含可访问内部元素。非侵入性提供访问迭代器访问容器。通过包装现有容器实现新容器。


#### 7.10.1 Strings as STL Containers
可以整个string处理，也可以单个处理里面的字符


#### 7.10.2 Ordinary C-Style Arrays as STL Containers
只能使用非侵入式和包装器方式。Using a global begin() and end() for ordinary C-style arrays.在C++11前使用raw pointers。


### 7.11 Implementing Reference Semantics
智能指针和引用包装器。


### 7.12 When to Use Which Container
多种选择多多尝试，有时候不同系统效率不同。



## Chapter 8 STL Container Members in Detail


### 8.1 Type Definitions
container::difference_type 突然忘记这个是干嘛的来着。


### 8.2 Create, Copy, and Destroy Operations
析构函数• Removes all elements and frees the memory. • Calls the destructor for every element.


### 8.3 Nonmodifying Operations


#### 8.3.1 Size Operations


#### 8.3.2 Comparison Operations


#### 8.3.3 Nonmodifying Operations for Associative and Unordered Containers


### 8.4 Assignments
	// 可能会调用元素的赋值操作符用于覆盖现有元素，调用构造函数对于新加入元素，调用析构函数对于移除的元素
	container& container::operator = (const container& c)
	container& container::operator = (container&& c) // 全部覆盖。

	container& container::operator = (initializer-list) // 同样调用很多函数
	void container::assign (initializer-list)  // 也是全部覆盖

	void container::swap (container& c)
	void swap (container& c1, container& c2)
	• Swap the contents with c or between c1 and c2, respectively.
	• Both swap:
	– The container’s elements
	– Their sorting criterion, equivalence predicate, and hash function object, if any.
	The references, pointers, and iterators referring to elements swap their containers, because they
	still refer to the same swapped elements afterward.
	Iterators and references refer to the same container but different elements afterward.

	
	
	
### 8.5 Direct Element Access
T* container::data ()  // 返回 C 数组 Provided by array, vector, string.
const T* container::data () const


### 8.6 Operations to Generate Iterators
	

### 8.7 Inserting and Removing Elements
#### 8.7.1 Inserting Single Elements
	void container::emplace_front (args) // 这个插入在前面还是替换第一个
	// 如果是从前面插入，和push_front有啥不同。
	
	
#### 8.7.2 Inserting Multiple Elements
	
	
#### 8.7.3 Removing Elements


#### 8.7.4 Resizing


### 8.8 Special Member Functions for Lists and Forward Lists


#### 8.8.1 Special Member Functions for Lists (and Forward Lists)
	
	
#### 8.8.2 Special Member Functions for Forward Lists Only

	
### 8.9 Container Policy Interfaces


#### 8.9.1 Nonmodifying Policy Functions	
	

#### 8.9.2 Modifying Policy Functions

	
#### 8.9.3 Bucket Interface for Unordered Containers
是否提供了 operator[]
	
	
### 8.10 Allocator Support

	
#### 8.10.1 Fundamental Allocator Members


#### 8.10.2 Constructors with Optional Allocator Parameters

	
## Chapter 9 STL Iterators	


### 9.1 Header Files for Iterators


### 9.2 Iterator Categories

	
#### 9.2.2 Input Iterators
后 pos++ 需要保存临时变量，没有前 ++pos 效率高。

	
#### 9.2.3 Forward Iterators	
	
	
#### 9.2.4 Bidirectional Iterators
	
	
#### 9.2.5 Random-Access Iterators
	
	
#### 9.2.6 The Increment and Decrement Problem of Vector Iterators	
当Iterator作为类实现的时候可以使用临时变量，当作为原始指针的时候不可以。


### 9.3 Auxiliary Iterator Functions


#### 9.3.1 advance()
按步移动，可以用来跳过某些输入流里面的项。	


#### 9.3.2 next() and prev()


#### 9.3.3 distance()


#### 9.3.4 iter_swap()


#### 9.4 Iterator Adapters


#### 9.4.1 Reverse Iterators
物理位置和逻辑位置要分清楚，(开闭区间反向取值也是开闭区间)


#### 9.4.2 Insert Iterators


#### 9.4.3 Stream Iterators
STL定义了输出输出流，又定义了流迭代器，这样算法就可以直接输入出了。


	
#### 9.4.4 Move Iterators
	
	
	
### 9.5 Iterator Traits

	namespace std {			// 具体怎么用也没看到例子
		template <typename T>
		struct iterator_traits {
			typedef typename T::iterator_category iterator_category;
			typedef typename T::value_type value_type;
			typedef typename T::difference_type difference_type;
			typedef typename T::pointer pointer;
			typedef typename T::reference reference;
		};
	}	
	
	
	
#### 9.5.1 Writing Generic Functions for Iterators
可以随意写这种代码的时候，STL就理解的差不多了。

	
	
#### 9.6 Writing User-Defined Iterators
At creation time the iterator stores its container in its container member。



## Chapter 10 STL Function Objects and Using Lambdas


### 10.1 The Concept of Function Objects


#### 10.1.1 Function Objects as Sorting Criteria


#### 10.1.2 Function Objects with Internal State
可以同模板构造函数参数来传递引用的函数对象，保持函数对象状态统一。



#### 10.1.3 The Return Value of for_each()


#### 10.1.4 Predicates versus Function Objects
A predicate should always be stateless，并且 operator() 返回值可以转换为bool。


### 10.2 Predefined Function Objects and Binders



#### 10.2.1 Predefined Function Objects



#### 10.2.2 Function Adapters and Binders
std::placeholders::_1 是编译器确定还是运行期间确定，表达式可以用变量表示吗？
	map<string,int> coll; // map of int values associated to strings
	...
	// accumulate all values (member second of the elements)
	int sum = accumulate (coll.begin(), coll.end(), 0,
							bind(plus<int>(),
							_1,
							bind(&map<string,int>::value_type::second,
							_2)));



#### 10.2.3 User-Defined Function Objects for Function Adapters


#### 10.2.4 Deprecated Function Adapters


### 10.3 Using Lambdas
Lambdas are a language feature.


#### 10.3.1 Lambdas versus Binders
需要理解好什么时候用那种。Lambdas一般在算法中看起来更直观, Binder 再callback时候用的比较多。


#### 10.3.2 Lambdas versus Stateful Function Objects
非引用捕获为啥是两个状态的lambdas函数，引用捕获的时候就是一个？涉及到状态的时候Lambda可能就比函数对象差点。

	remove_if(coll.begin(),coll.end(), // range
	[count] (int) mutable { // remove criterion
		return ++count == 3;
	});
```

#### 10.3.3 Lambdas Calling Global and Member Functions
注意区分捕获的变量，和参数传递的变量。



#### 10.3.4 Lambdas as Hash Function, Sorting, or Equivalence Criterion
Note again that you have to use decltype to pass the type of the lambda to the unordered_set because it creates its own instance of them.
所以模板构造和构造函数构造对象都提供的模板类，什么时候用，怎么选择.。


## Chapter 11 STL Algorithms


### 11.1 Algorithm Header Files
#include <algorithm>一般算法，#include <numeric>数学算法，#include <functional>函数对象。


### 11.2 Algorithm Overview



#### 11.2.1 A Brief Introduction




#### 11.2.2 Classification of Algorithms
Nevertheless, to be safe, you should call merge() only for sorted ranges.


### 11.3 Auxiliary Functions


### 11.4 The for_each() Algorithm


### 11.5 Nonmodifying Algorithms
访问元素 without modifying their values or changing their order.


#### 11.5.1 Counting Elements


#### 11.5.2 Minimum and Maximum


#### 11.5.3 Searching Elements


#### 11.5.4 Comparing Ranges


#### 11.5.5 Predicates for Ranges


### 11.6 Modifying Algorithms


#### 11.6.1 Copying Elements


#### 11.6.2 Moving Elements


#### 11.6.3 Transforming and Combining Elements


#### 11.6.4 Swapping Elements


#### 11.6.5 Assigning New Values


#### 11.6.6 Replacing Elements


### 11.7 Removing Algorithms


#### 11.7.1 Removing Certain Values


#### 11.7.2 Removing Duplicates


### 11.8 Mutating Algorithms


#### 11.8.1 Reversing the Order of Elements


#### 11.8.2 Rotating Elements


#### 11.8.3 Permuting Elements


#### 11.8.4 Shuffling Elements


#### 11.8.5 Moving Elements to the Front


#### 11.8.6 Partition into Two Subranges


### 11.9 Sorting Algorithms


#### 11.9.1 Sorting All Elements


#### 11.9.2 Partial Sorting


#### 11.9.3 Sorting According to the nth Element


#### 11.9.4 Heap Algorithms


### 11.10 Sorted-Range Algorithms


#### 11.10.1 Searching Elements


#### 11.10.2 Merging Elements


### 11.11 Numeric Algorithms


#### 11.11.1 Processing Results


#### 11.11.2 Converting Relative and Absolute Values


## Chapter 12 Special Containers
container adapters, which adapt standard STL containers to fit special needs, 
or a bitset, which is a containers for bits or Boolean values


### 12.1 Stacks
std::stack<int,std::vector<int>> st; // integer stack that uses a vector


#### 12.1.1 The Core Interface


#### 12.1.2 Example of Using Stacks
Note that pop() removes the next element but does not return it, whereas top() returns the next element without removing it


#### 12.1.3 A User-Defined Stack Class
[Stack](https://github.com/israel-Liu/fragments-of-time/blob/master/boruto/codeforces/basic_data_structures.h)


#### 12.1.4 Class stack<> in Detail


### 12.2 Queues
容器适配器是把底层实现用容器吗。这样容器就有特殊功能。


#### 12.2.1 The Core Interface


#### 12.2.3 A User-Defined Queue Class


#### 12.2.4 Class queue<> in Detail


### 12.3 Priority Queues
std::priority_queue<float,std::vector<float>, std::greater<float>> pbuffer;


####  12.3.1 The Core Interface


#### 12.3.2 Example of Using Priority Queues


#### 12.3.3 Class priority_queue<> in Detail


#### 12.4 Container Adapters in Detail


#### 12.4.1 Type Definitions


#### 12.4.2 Constructors


#### 12.4.3 Supplementary Constructors for Priority Queues


#### 12.4.4 Operations


### 12.5 Bitsets


#### 12.5.1 Examples of Using Bitsets


#### 12.5.2 Class bitset in Detail


## Chapter 13 Strings
C++11提供 ’\0‘ 作为结尾 s.data() returns the characters including a trailing end-of-string character。不在提供Reference-counted。


### 13.1 Purpose of the String Classes


#### 13.1.1 A First Example: Extracting a Temporary Filename


#### 13.1.2 A Second Example: Extracting Words and Printing Them Backward


### 13.2 Description of the String Classes


#### 13.2.1 String Types


#### 13.2.2 Operation Overview


#### 13.2.3 Constructors and Destructor


#### 13.2.4 Strings and C-Strings
const char* 可以用来构造string对象，string对象成员 data(C++11) 和 c_str 返回 ‘\0’ 结尾的 C-Strings。

	char buffer[100];
	s.copy(buffer,100); // copy at most 100 characters of s into buffer
	s.copy(buffer,100,2); // copy at most 100 characters of s into buffer
	// starting with the third character of s
	
	
#### 13.2.5 Size and Capacity


#### 13.2.6 Element Access


#### 13.2.7 Comparisons


#### 13.2.8 Modifiers

	s = ""; // assign the empty string
	s.clear(); // clear contents //erase(begin(), end()). capacity 保持不变，
	s.erase(); // erase all characters  // reserve 函数用来改变大小
	
#### 13.2.9 Substrings and String Concatenation


#### 13.2.10 Input/Output Operators
使用getline()可以自定义结束符号。


#### 13.2.11 Searching and Finding


#### 13.2.12 The Value npos
尽量返回值直接比较，使用 size_type 不会出错。
	const int NPOS = -1;
	if (idx == NPOS) { // works almost always
		...
	}
	
	
	
##### 13.2.13 Numeric Conversions


#### 13.2.14 Iterator Support for Strings


#### 13.2.15 Internationalization
通过struct ignorecase_traits : public std::char_traits<char>自定义string。


#### 13.2.16 Performance


#### 13.2.17 Strings and Vectors
String作为整体使用，Vector主要对里面的元素进行操作。


### 13.3 String Class in Detail


#### 13.3.1 Type Definitions and Static Values

	string::reverse_iterator
		• The type of reverse iterators.
		• It is equivalent to reverse_iterator<iterator>.
	string::const_reverse_iterator
		• The type of constant reverse iterators.
		• It is equivalent to reverse_iterator<const_iterator>.

		
#### 13.3.2 Create, Copy, and Destroy Operations

string::string (InputIterator beg, InputIterator end) 写重复了。


#### 13.3.3 Operations for Size and Capacity


#### 13.3.4 Comparisons


#### 13.3.5 Character Access
Before C++11, length() or size() was an invalid index value for nonconstant strings. length() as value is invalid for at(); operator [ ], which is faster.


#### 13.3.6 Generating C-Strings and Character Arrays
Before C++11, the return value of data() without any trailing ’\0’ character. use c_str(); copy() 不包括结尾 \0;


#### 13.3.7 Modifying Operations
swap() 比 copy() 更快，下面函数第一个参数有歧义对于 0 .

	string& string::insert (size_type idx, size_type num, char c)
	iterator string::insert (const_iterator pos, size_type num, char c)
	

#### 13.3.8 Searching and Finding
反向找的函数起点参数用来定义区间的 [pos, end) 在这个区间内从后往前查找。]



#### 13.3.9 Substrings and String Concatenation


#### 13.3.10 Input/Output Functions


#### 13.3.11 Numeric Conversions
If idxRet!=nullptr, it returns the index of the first character not processed for the conversion.


#### 13.3.12 Generating Iterators


#### 13.3.13 Allocator Support


## Chapter 14 Regular Expressions