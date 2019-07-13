---
title: C++ Primer, Fifth Edition reading-note-fourth
date: 2018-04-10 19:12:59
tags:
---


## Chapter 16. Templates and Generic Programming


### 16.1. Defining a Template


#### 16.1.1. Function Templates


#### 16.1.2. Class Templates
By default, a member function of a class template is instantiated only if the program uses that member function


#### 16.1.3. Template Parameters
为了区分类型和静态成员，我们在类型前面加上 typename 显示说明。


#### 16.1.4. Member Templates
	template <typename T> // type parameter for the class
	template <typename It> // type parameter for the constructor
	Blob<T>::Blob(It b, It e):
		data(std::make_shared<std::vector<T>>(b, e)) {
	}
	
	
#### 16.1.5. Controlling Instantiations
每个编译单元都会生成一份模板实例，通过显示声明，可以共享一份。但是连接后必须存在一份。


#### 16.1.6. Efficiency and Flexibility
shared_ptr 删除器在运行期确定，保存在本地执行，不绑定模板参数更好自定义。 unique_ptr 提供模板参数，在编译器确定，每个实例有自己的删除器。



### 16.2. Template Argument Deduction


#### 16.2.1. Conversions and Template Type Parameters
	template <typename T> ostream& print(ostream& os, const T& obj) 
	{
		return os << obj; // 这个返回类型，干嘛用的呢。
	}
	

#### 16.2.2. Function-Template Explicit Arguments
在函数名称后，参数前使用尖括号指定返回值类型。sum<long long>(i, lng);



#### 16.2.3. Trailing Return Types and Type Transformation
	// a trailing return lets us declare the return type after the parameter list is seen
	template <typename It> // 因为放到前面还没有确定参数。放到后面已经知道参数了。
	auto fcn(It beg, It end) -> decltype(*beg)
	{
		// process the range
		return *beg; // return a reference to an element from the range
	}
	
	
	// must use typename to use a type member of a template parameter; see § 16.1.3 (p.670)
	template <typename It>
	auto fcn2(It beg, It end) -> typename remove_reference<decltype(*beg)>::type // typename 用来表示 ::type 不是静态变量而是类型。
	{
		// process the range
		return *beg; // return a copy of an element from the range
	}
	
	
	
#### 16.2.4. Function Pointers and Argument Deduction
func(compare<int>); 为函数指针提供显示的模板参数类型。



#### 16.2.5. Template Argument Deduction and References
	template <typename T> void f2(const T&); // can take an rvalue
	f2(5); // a const & parameter can be bound to an rvalue; T is int
	
	
	
#### 16.2.6. Understanding std::move
通过模板类型坍塌和移掉引用然后静态类型转换到 rvalue 引用，可以使用 move 函数实现 rvalue(先转换为 右值引用) 赋值给 lvalue 和 rvalue。



#### 16.2.7. Forwarding
用来保持参数原有的类型信息，包括 const 属性什么的，为了完全理解这种东西，还需要好好理解 rvalue 和 又值引用 和 模板类型推断，类型坍塌的结果。
	template <typename F, typename T1, typename T2>
	void flip(F f, T1 &&t1, T2 &&t2)
	{
		f(std::forward<T2>(t2), std::forward<T1>(t1));
	}
	
	

### 16.3. Overloading and Templates
模板 overload 优先匹配更 specialized 的那个。nontemplate 更特别对比 Template Overloads 优先被选择，但需要类型转换的时候匹配更精确的模板版本，除非用户显示转换。


### 16.4. Variadic Templates

	template <typename T, typename... Args>   				// sizeof...(Args)
	void foo(const T &t, const Args& ... rest);				// sizeof...(rest)


#### 16.4.1. Writing a Variadic Function Template
递归解包，有一个终止的函数，剩下的都是自己调用自己，每次调用少一个参数。


#### 16.4.2. Pack Expansion
每次解包都实例化了一个对应参数的函数版本？The pattern in an expansion applies separately to each element in the pack。


#### 16.4.3. Forwarding Parameter Packs
同样可以保存解包参数类型？ 这个函数还是要好好看下。


### 16.5. Template Specializations
先声明通用的，然后再声明特殊的，因为特殊的 In order to specialize a template, a declaration for the original template must be in scope.

	// first version; can compare any two types
	template <typename T> int compare(const T&, const T&);
	// second version to handle string literals
	template<size_t N, size_t M>
	int compare(const char (&)[N], const char (&)[M]);
		
	// special version of compare to handle pointers to character arrays
	template <>
	int compare(const char* const &p1, const char* const &p2)
	{
		return strcmp(p1, p2);
	}

Differently from function templates, a class template specialization does not have to supply an argument for every template parameter. 类模板偏特化。
A member template may not be virtual.


## Part IV: Advanced Topics






















