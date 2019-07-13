---
title: The Design And Evolution Of Cpp
date: 2018-09-27 15:15:21
tags:
---

### [豆瓣书评](https://book.douban.com/subject/1456860/)


## 0 Notes to the Reader


### Introduction


### How to Read this Book
In particular, no two people seem to agree on what level of detail is appropriate for a discussion of this topic.

### Focus on Use and Users


### Programming Languages
[C++](http://www.stroustrup.com/C++.html)


### References


# Part I Chapters


## 1 The Prehistory of C++


### 1.1 Simula and Distributed Systems
支持类，高效，可移值。

### 1.2 C and Systems Programming


### 1.3 General Background
哲学啊，是想啊，文学啊，数学啊，各自乱七八糟的东西，也就是说思想达到一定高度才有这种设计水平。


## 2 C with Classes


### 2.1 The Birth of C with Classes


### 2.2 Feature overview


### 2.3 Classes


### 2.4 Run-Time Efficiency


#### 2.4.1 Inlining,


### 2.5 The Linkage Model


#### 2.5.1 Simple-Minded Implementations
link compatibility is much more important than source compatibility.

#### 2.5.2 The Object Layout Model
引入 this 的时候，C++ 还没有引用。所以 this 是指向对象的指针。


### 2.6 Static Type Checking


#### 2.6.1 Narrowing Conversions
类型截断

#### 2.6.2 Use of Warnings
warnings are used to compensate for problems that cannot be fixed through language changes。


### 2.7 Why C?


### 2.8 Syntax Problems


#### 2.8.1 The C Declaration Syntax


#### 2.8.2 Structure Tags vs. Type Names


#### 2.8.3 The Importance of Syntax
However, the syntax of a language should be designed to follow the semantic notions of the language, not the other way around.


### 2.9 Derived Classes
这时候还没有虚函数，但是它仍然是有意义的。they allowed list and task classes to be defined。


#### 2.9.1 Polymorphism without Virtual Functions
使用域操作符直接调用基类。


#### 2.9.2 Container Classes Without Templates
I soon defined a few "standard" token-pasting macros and recommended a stylized macro usage based on them for generic classes [Stroustrup,1986,§7.3.5].


#### 2.9.3 The Object Layout Model
子类基类直接连接到一起，实际的内存分布可能是分开的。子对象的概念。


#### 2.9.4 Retrospective
引入虚函数？


### 2.10 The Protection Model
最开始 only classes could be friends，后面才有别的。


### 2.11 Run-Time Guarantees


#### 2.11.1 Constructors and Destructors


#### 2.11.2 Allocation and Constructors


#### 2.11.3 Call and Return Functions
不存在于 C++ 中。


### 2.12 Minor Features


#### 2.12.1 Overloading of Assignment


#### 2.12.2 Default Arguments
However, C with Classes had default argument lists for years before general overloading became available in C++.


### 2.13 Features Considered, but not Provided
虚函数后来应用了，垃圾回收没用，并发性变成通过库实现，而不是语言。


### 2.14 Work Environment


## 3 The Birth of C++


### 3.1 From C with Classes to C++
The name C++ was suggested by Rick Mascitti.


### 3.2 Aims


### 3.3 Cfront
编译器前端，后端是 C 编译器。 Cpp -> Cfront -> Cc -> ObjectCode


#### 3.3.1 Generating C


#### 3.3.2 Parsing C++
解析器


#### 3.3.3 Linkage Problems


#### 3.3.4 Cfront Releases
1.0(The C+ + Programming Language), 2.0(The Annotated C++ Reference), 3.0(templates, exception handling)


### 3.4 Language Features


### 3.5 Virtual Functions
"The Simula67 INSPECT statement was deliberately not introduced into C++. 
The reason for that is to encourage modularity through the use of virtual functions[Stroustrup,1986]."


#### 3.5.1 The Object Layout Model
Each object of such a class contains a hidden pointer, often called the v p t r , to its class's virtual function table.
Have a single concept: a single set of layout rules, a single set of lookup rules, a single set of resolution rules, etc.


#### 3.5.2 Overriding and Virtual Function Matching


#### 3.5.3 Base Member Hiding


### 3.6 Overloading
[Stroustrup, 1984b]


#### 3.6.1 Basic Overloading
隐式转换避免爆炸增长.


#### 3.6.2 Members and Friends
I restricted operators [ ], (), and - > to be members.


#### 3.6.3 Operator Functions


#### 3.6.4 Efficiency and Overloading
Increasing run-time efficiency by eliminating temporaries, (+= 比 + 更高效)


#### 3.6.5 Mutation and New Operators
只可以重载现有内置操作符,而不是自己创建.而且有些内置的也不适合重载.


### 3.7 References
References were introduced primarily to support operator overloading.


#### 3.7.1 Lvalue vs. Rvalue

	class char_ref { // identify a character in a String
	friend class String;
		int i ;
		String* s;
		char_ref(String* ss, int ii) { s=ss; i=ii; }
	public:
		void operator=(char c);
		operator char();
	};

s l [ i ] = s 2 [ j ]; means s1.operator[](i) = s2.operator[](j) ->  s1.operator[](i).operator=(s2.operator[](j).operator char())


### 3.8 Constants
I had experimented further with c o n s t in C with Classes and found that c o n s t was a useful alternative to macros 
for representing constants only if global c o n s t s were implicitly local to their compilation unit.(全局才是C宏的替换)


### 3.9 Memory Management
By definition, t h i s points to the object for which a member function is called.(this = my_alloc(sizeof(X));)


### 3.10 Type Checking



### 3.11 Minor Features


#### 3.11.1 Comments


#### 3.11.2 Constructor Notation
The concept was extended to allow constructors to be used explicitly in expressions.


#### 3.11.3 Qualification
To alleviate 混淆, : : was introduced to mean membership of class, and . was retained exclusively for membership of object.

#### 3.11.4 Initialization of Global Objects
Dynamic initialization is done in declaration order within a translation unit.(不同单元没有顺序,static initialization 在 dynamic initialization 之前完成.)
全局对象调用构造函数,是动态初始化的,[3.11.4.1 Problems with Dynamic Initialization](依赖其它对象先初始化)[3.11.4.2 Workarounds for Order Dependencies](???)
[3.11.4.3 Dynamic Initialization of Built-in Types](completely general expressions for the initialization of class objects)


#### 3.11.5 Declaration Statements
I enabled an "initialize-only" or "single-assignment" style of programming that is less error-prone than traditional styles.
[3.11.5.1 Declarations in for-statements][3.11.5.2 Declarations in Conditions]if (Tok* ct = gettok()) 这竟然是推荐写法.依赖动态初始化.


### 3.12 Relationship to Classic C
C struct didn't constitute a scope, nested class scopes were reintroduced into C++ in 1989.
没有文件级别的范围,所以出现了名字空间.


### 3.13 Tools for Language Design


### 3.14 The C++ Programming Language (1st edition)


### 3.15 The Whatis? Paper


## 4 C++ Language Design Rules


### 4.1 Rules and Principles
The first contains overall ideals for the whole language.
The second set of rules primarily addresses C++'s role in supporting design.
The third addresses technicalities related to the form of the language.
The fourth focuses on C++'s role as a language for low-level systems programming.

### 4.2 General Rules
	C++'s evolution must be driven by real problems.
	Don't get involved in a sterile quest for perfection.
	C++ must be useful now.
	Every feature must have a reasonably obvious implementation.
	Always provide a transition path.
	C++ is a language, not a complete system.
	Provide comprehensive support for each supported style.
	Don't try to force people.

### 4.3 Design Support Rules
	Support sound design notions.
	Provide facilities for program organization.
	Say what you mean.
	All features must be affordable.
	It is more important to allow a useful feature than to prevent every misuse.
	Support composition of software from separately developed parts.
	
	
### 4.4 Language-Technical Rules
	No implicit violations of the static type system.
	Provide as good support for user-defined types as for built-in types.
	Locality is good.
	Avoid order dependencies.
	If in doubt, pick the variant of a feature that is easiest to teach.
	Syntax matters (often in perverse ways).
	Preprocessor usage should be eliminated.
	
	
	

















## 4 C++ Language Design Rules

## 5 Chronology 1985-1993

## 6 Standardization

## 7 Interest and Use

## 8 Libraries

## 9 Looking Ahead













































#### 2.11 Run-Time Guarantees