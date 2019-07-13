---
title: C++ Primer, Fifth Edition reading-note-two
date: 2016-12-02 11:01:50
tags:
---
先写个概要内容

##正文开始
### 范围for循环，前++后++，auto
The auto specifier was only allowed for objects declared at block scope or in function parameter lists. It indicated automatic storage duration, which is the default for these kinds of declarations. 


## Part III: Tools for Class Authors

### Chapter 13. Copy Control

#### 13.1. Copy, Assign, and Destroy
拷贝构造的赋值可以放到初始化列表中。(也就是说构造函数都有初始列表？),拷贝初始化和直接初始化(普通函数匹配规则)的不同。
Copy initialization happens not only when we define variables using an =, but also when we
	• Pass an object as an argument to a parameter of nonreference type
	• Return an object from a function that has a nonreference return type
	• Brace initialize the elements in an array or the members of an aggregate class
	
emplace 使用直接初始化。剩下很多都是拷贝初始化，比如 insert 和 push。不能隐式的使用显示构造，所有拷贝构造不能用显示构造的参数。
拷贝构造用来初始化非引用参数 explains why the copy constructor’s own parameter must be a reference，否则会无限循环。
使用 () 相比使用 = 创建对象(而不是赋值给一个已经有值的对象)，实际上是编译器选择省略了拷贝构造函数，直接创建对象。
When an operator is a member function, the left-hand operand is bound to the implicit this parameter (§ 7.1.2, p. 257). 
The right-hand operand in a binary operator, such as assignment, is passed as an explicit parameter.

Because 析构函数 takes no parameters, it cannot be overloaded. There is always only one destructor for a given class。
在析构函数中，函数体先执行，可以在这里最后使用对象，做一些资源释放。然后析构成员，析构顺序和构造顺序相反。(智能指针式对象，调用对象析构函数)
The implicit destruction of a member of built-in pointer type(包括指向对象的指针) does not delete the object to which that pointer points.

	Elements in a container—whether a library container or an array—are destroyed when the container is destroyed.
	Dynamically allocated objects are destroyed when the delete operator is applied to a pointer to the object (§ 12.1.2, p. 460).
	Temporary objects are destroyed at the end of the full expression in which the temporary was created.

If a class needs a destructor, it almost surely also needs the copy-assignment operator and a copy constructor.(避免多个指针指向同一个对象，删除后还使用)
If we do not want the synthesized member to be an inline function, we can specify = default on the member’s definition.
we cannot define variables or members of such types, we can dynamically allocate objects with a deleted destructor. However, we cannot free them.

#### 13.2. Copy Control and Resource Management
What we do when we copy the pointer member determines whether a class like HasPtr has valuelike or pointerlike behavior.


#### 13.3. Swap
If there is a type-specific version of swap, calls to swap will match that typespecific version. 
If there is no type-specific version, then—assuming there is a using declaration for swap in scope.

	// note rhs is passed by value, which means the HasPtr copy constructor
	// copies the string in the right-hand operand into rhs
	HasPtr& HasPtr::operator=(HasPtr rhs)
	{
		// swap the contents of the left-hand operand with the local variable rhs
		swap(*this, rhs); // rhs now points to the memory this object had used
		return *this; // rhs is destroyed, which deletes the pointer in rhs
	}
	
#### 13.4. A Copy-Control Example


#### 13.5. Classes That Manage Dynamic Memory

#### 13.6. Moving Objects
Generally speaking, an lvalue expression refers to an object’s identity whereas an rvalue expression refers to an object’s value.

	int &&rr1 = 42; // ok: literals are rvalues
	int &&rr2 = rr1; // error: the expression rr1 is an lvalue!
	
难道是 Cpp 实习自定义类是靠库实现的吗，为啥 noexcept 是通知标准库不抛出异常，还是异常是靠库实现的，应该是我们使用标准库存放自定义对象。(语言超集的子集)。
Understanding why noexcept is needed can help deepen our understanding of how the library interacts with objects of the types we write.(给库调用了)
The compiler will synthesize a move constructor or a move-assignment operator only if the class doesn’t define any of its own copy-control members 
and if every nonstatic data member of the class can be moved.定义了移动构造/赋值函数必须定义拷贝的，因为编译器会定义拷贝的为删除的。不会合成。

	class HasPtr {    // 很有趣的是，赋值运算符因为提供了拷贝和移动构造函数，而同时具备了拷贝和移动赋值操作符的功能。
		public:
			// added move constructor
			HasPtr(HasPtr &&p) noexcept : ps(p.ps), i(p.i) {p.ps = 0;}
			// assignment operator is both the move- and copy-assignment operator
			HasPtr& operator=(HasPtr rhs)
			{ swap(*this, rhs); return *this; }
	};

The Rule of Three / Five，拷贝控制成员包括，copy constructor, copy-assignment operator, and destructor，控制对象拷贝，资源分配。move constructor and move-assignment operator。(3+2=5)
The reference qualifier can be either & or &&, indicating that this may point to an rvalue or lvalue, respectively. (同时出现在声明和定义的地方。同时使用放 const 后)

	class Foo {
	public:
		Foo sorted() &&;
		Foo sorted() const; // error: must have reference qualifier
		// Comp is type alias for the function type (see § 6.7 (p. 249))
		// that can be used to compare int values
		using Comp = bool(const int&, const int&);
		Foo sorted(Comp*); // ok: different parameter list
		Foo sorted(Comp*) const; // ok: neither version is reference qualified
	};
	
### Chapter 14. Overloaded Operations and Conversions
重载 I/O 应该是非成员函数，If these operators are members of any class, they would have to be members of istream or ostream. ？

	std::string& operator*() const
	{ 
		auto p = check(curr, "dereference past end");
		return (*p)[curr]; // (*p) is the vector to which this object points
	}
	std::string* operator->() const
	{ 
		// delegate the real work to the dereference operator
		return & this->operator*();
	}
	
The overloaded arrow operator must return either a pointer to a class type or an object of a class type that defines its own operator arrow。(无限箭头)


### Chapter 15. Object-Oriented Programming
A derived class may include the virtual keyword on these functions but is not required to do so.
The scope of a derived class is nested inside the scope of its base class.
If the base class has one or more virtual functions, we can use a dynamic_cast to request a conversion that is checked at run time. (运行时间可以优化)
Alternatively, in those cases when we know that the conversion from base to derived is safe, we can use a static_cast to override the compiler.
派生类的作用域嵌套在基类的作用域内，所以派生类可以使用基类成员，但是基类成员就不可以直接使用派生类成员了。
虚函数可以有默认实参，如果某次调用使用了默认实参，实参值由本次调用的静态类型决定。
可以为纯虚函数提供定义，但是函数体必须在类的外部。不能在声明 = 0 的地方提供 {};
派生类对象只初始化直接基类，在构造函数初始化列表中，调用基类构造函数。
只能通过对象访问受保护成员，而不是类。(就是访问自己对象中的基类子对象受保护部分)
当对一个调用查找时候，(不停的往基类查)当定位到函数是虚函数的时候，编译器产生的代码将在运行时确定倒底运行虚函数的那个版本。
构造函数或析构函数调用了某个虚函数 ，应该执行与构造函数或析构函数所属类型想对应的虚函数版本，也就是类内函数调用。(之类的不行)

### Summary
这一章，很多编译器规则还是比较难理解和记忆的，还是要不停的看理解。


### Chapter 16. Templates and Generic Programming
[reading-note-fourth](https://israel-liu.github.io/2018/04/10/reading-note-fourth/)
