---
title: C++ Primer, Fifth Edition reading_note_one
date: 2016-12-01 10:38:24
tags:
---
总之先写点什么吧，对markdown的编辑格式还不是很熟悉  
排版就先这样好了，日后再修改，或许发个markdown编辑格式的博文也不错，  
分类什么的也比较乱，以后还是尽量写英文吧，从最短的地方补起来

## 下面正文开始

### Top-Level const
&nbsp;&nbsp;&nbsp;&nbsp;We user the term Top-Level const to indicate that the pointer itself
is a const. When a pointer can point to a const object, we refer to that
const as a low-level const.  
&nbsp;&nbsp;&nbsp;&nbsp;The distinction between top-level and low-level matters when we copy
an object. When we copy an object, top-level consts are ignored.   
&nbsp;&nbsp;&nbsp;&nbsp;简单的说指针和引用的基本类型部分（low-level const）当执行对象拷贝操作时，
常量可以拷贝给常量，非常量可以拷贝给常量（可以转换）反之不行。

### example

```cpp
  int i = 0;
  int* const p1 = &i;       // we can't change the value of p1; const is top-level
  const int ci = 42;        // we can't change ci; const is top-level
  const int* p2 = &ci;      // we can change p2; const is low-level
  const int* const p3 = p2; // right-most const is top-level, left-most is not
  const int& r = ci;        // const in reference types is always low-level
```

### Standard Container Iterator Operations
&nbsp;&nbsp;&nbsp;&nbsp;因为操作符重载和语言基本的(->)箭头操作，搞定我晕晕的，提一下
```cpp
  iter->mem;  // Dereferences iter and fetches the member named mem from
              // the underlying element. Equivalent to (*iter).mem
```

## 文章结束之前提一下 begin(),  end().
&nbsp;&nbsp;&nbsp;&nbsp;begin returns a pointer to the first, and end returns a pointer one past the last
element in the given array: These functions are defined in the iterator header
```cpp
  int ia[] = {0,1,2,3,4,5,6,7,8,9};   // ia is an array of ten ints
  int *beg = begin(ia);               // pointer to the first element in ia
  int *last = end(ia);                // pointer one past the last element in ia
```
## End 第一篇到这里了，Note 还有个vector无符号下标，内置数组有符号下标


## Chapter 1. Getting Started
当用 CMD 窗口执行程序后，那么这个窗口应该就是这个程序所有了？输入输出流的返回值还是输入输出流，这样可以连续使用 operator <<. 语言本身不支持输入输出。通过使用库 I/O。
临时变量只要还在 stack 中就是有效的对吧？只用点操作符访问成员方法，所以加 () 操作符之前只是没有调用为啥是不合法的？reading cin flushes cout ？



## Part I: The Basics
区分语言和库还是很重要的，要知道语言本身提供了什么东西，我们可以用来做什么，比如利用provides mechanisms that let us define our own data types.写库。


## Chapter 2. Variables and Basic Types
The smallest chunk of addressable memory is referred to as a “byte.”  类型设计是要更好的接近硬件层。
类型char，可能是有符号的也可能是无符号的，不要再算数表达式里面使用，使用时候要明确有符号还是无符号。
赋值给无符号类型，当超过范围的时候取值为 the compiler assigns the remainder of that value modulo 256(unsigned char).
If we assign an out-of-range value to an object of signed type, the result is undefined. Don’t Mix Signed and Unsigned Types.


#### 2.1.3. Literals (字面常量)
最基本的类型推断是不是就像这个东西一样。转义字符最多就转义3个数字。


### 2.2. Variables
初始化是在定义对象的时候给个初始值，赋值是删掉原有的值再给一个新值。所以要分清楚什么时候调用构造函数什么时候调用赋值操作符。
explicitly initialized 是要求构造对象的时候显示构造？
C++ is a statically typed language, which means that types are checked at compile time. 但是我可以通过模板(应该也是编译期确定的)或者继承等告诉运行时确定类型？


### 2.3. Compound Types
rvalue reference These references are primarily intended for use inside classes. void*可以接收任何类型的指针，但是我们不能通过他使用指向的对象。需要先确定类型。
Because references are not objects, we may not define a reference to a reference. 所以右值引用还要理解这句话。
scope 内的指针不初始化那么值是未定义的，那全局指针被初始化什么 ？是 0 吗 ，因为全局区域全部被填充了 0 ？指针是类型但是引用不是。


#### 2.3.3. Understanding Compound Type Declarations
从右往左读取声明，第一个遇见的修饰符是变量类型，再往走的修饰符都是变量形容的类型，最前面是基类型。int *&r = p; 引用类型，引用了指针类型，基类型是int。


### 2.4. const Qualifier
const int i = get_size(); // ok: initialized at run time。const Objects Are Local to a File。如果是compile-time constant那编译期会在使用的地方直接替换为值。
所以可以在不同文件中定义相同的 const 常量然后给不同的值？因为它只在当前文件可以访问？如果像多个文件公用一个运行期确定的常量，在声明和定义的地方都加上 extern。static is local ？
References to const 引用绑定的对象永远不可更改，所以都是const，“reference to const” 和 “const reference.” 都是说绑定的对象不可修改。const int &r = ir; const 修饰 int。right to left;

	double dval = 3.14;
	const int &ri = dval;
	// 当我们这样赋值的时候编译器做如下事情。我们不能通过临时对象更改原始对象。
	const int temp = dval; // create a temporary const int from the double
	const int &ri = temp; // bind ri to that temporary
	// 可以把非const 赋值给 const 引用，但是我们不能通过这个引用更改绑定的值，即便是绑定的值可以更改。

We use the term top-level const to indicate that the pointer itself is a const. When a pointer can point to a const object, we refer to that const as a low-level const.
When we copy an object, top-level consts are ignored。
A const object that is initialized from a constant expression is also a constant expression. const 对象用常量表达式初始化也是常量表达式，非const对象怎么都不是。
Generally, it is a good idea to use constexpr for variables that you intend to use as constant expressions。constexpr 显示表示必须用常量表达式赋值，包括常量函数。
constexpr 表示常量表达式，编译期必须可以推断。 const 表示赋值后不可修改，可以运行期赋值。


### 2.5. Dealing with Types
类型别名不能简单的替换来解释。typedef char *pstring; const char *cstr = 0; // wrong interpretation of const pstring cstr ，const 用来修饰整体，常量指针。
By implication, a variable that uses auto as its type specifier must have an initializer，如果像auto保持 top-level const 属性必须显示声明。
没有底层属性的时候，称为顶层属性吗？

	When we ask for a reference to an auto-deduced type, top-level consts in the initializer are not ignored. // 显示 auto& 被绑定的变量 const 属性保留
	As usual, consts are not top-level when we bind a reference to an initializer. // 很难理解啊  const auto & 用来形容被绑定的类型是 const 的。
	
decltype 当只想使用类型，不想用表达式初始化的时候使用，不需要执行表达式求结果。可以用来获取函数类型。decltype handles top-level const。
decltype returns a reference type for expressions that yield objects that can stand on the left-hand side of the assignment。并不是表达式的别名。
dereference operator 取消(解)引用返回的是引用类型。decltype(*p) is int&, not plain int。

	// decltype of a parenthesized variable is always a reference
	decltype((i)) d; // error: d is int& and must be initialized // 每次去掉括号都执行一次  decltype ？像这样 decltype(decltype(i)) ？
	decltype(i) e; // ok: e is an (uninitialized) int // double parentheses) is always a reference type，一层括号不是。
	
	
### 2.6. Defining Our Own Data Structures
The semicolon is needed because we can define variables after the class body，结构体或者类结尾括号后面一定要有分号。
in-class initializer 是编译期确定的还是运行期？还是由对象是不是常量决定？应该和普通的一样依据存储区域吧。
类定义不写到函数里面因为可见范围太小，当然是可以的。不写到CPP中因为写到头文件中，可以在多个头文件中引用。而不需要每个源文件都写相同的定义。当然一份定义多个声明也是可以的。
类定义到头文件后，我们还要避免多次包含头文件而有多个定义，使用预处理Preprocessor variable names do not respect C++ scoping rules.。当头文件更改的时候，需要重新编译源文件获取最新定义。
declarator(声明符) The part of a declaration that includes the name being defined and an optional type modifier.
temporary Unnamed object created by the compiler while evaluating an expression. 
A temporary exists until the end of the largest expression that encloses the expression for which it was created.
void* Pointer type that can point to any nonconst type. Such pointers may not be dereferenced.
word The natural unit of integer computation on a given machine. Usually a word is large enough to hold an address. On a 32-bit machine a word is typically 4 bytes.


## Chapter 3. Strings, Vectors, and Arrays
使用等号的拷贝初始化编译器执行 string temp(10, 'c'); // temp is cccccccccc 和 string s8 = temp; // copy temp into s8 两步，直接初始化不需要生成临时变量。？
当使用 + 操作符连接字符串的时候，必须每个 + 至少有一个是 string 类型。
Because references are not objects (§ 2.3.1, p. 50), we cannot have a vector of references。


### 3.5. Arrays
size_t is a machine-specific unsigned type that is guaranteed to be large enough to hold the size of any object in memory。

	int *ptrs[10]; // ptrs is an array of ten pointers to int
	int &refs[10] = /* ? */; // error: no arrays of references
	int (*Parray)[10] = &arr; // Parray points to an array of ten ints
	int (&arrRef)[10] = arr; // arrRef refers to an array of ten ints
	
	auto ia2(ia); // ia2 is an int* that points to the first element in ia。
	The type returned by decltype(ia) is array of ten ints

Like size_t, the ptrdiff_t type is a machine-specific type。

当前指向的位置，然后往后计算。有趣

	int *p = &ia[2]; // p points to the element indexed by 2
	int j = p[1]; // p[1] is equivalent to *(p + 1),
	// p[1] is the same element as ia[3]
	int k = p[-2]; // p[-2] is the same element as ia[0]
	
	
### 3.6. Multidimensional Arrays
多维数组实际布局也是连续的，所以可以接着选取？外层 for 范围循环总是用引用，避免被转换为指针。二维数组第一维是啥类型？不适用auto的时候for (int (*p)[4] = ai;;;) 这样定义？

	// assigns the first element of arr to the last element in the last row of ia
	ia[2][3] = arr[0][0][0];
	int (&row)[4] = ia[1]; // binds row to the second four-element array in ia
	
	size_t cnt = 0;
	for (auto &row : ia) // for every element in the outer array
		for (auto &col : row) { // for every element in the inner array
			col = cnt; // give this element the next value
			++cnt; // increment cnt
		}

Type Aliases Simplify Pointers to Multidimensional Arrays. using int_array = int[4]; for (int_array *p = ia; p != ia + 3; ++p)
value initialization 当不提供值的时候，或者没有默认构造函数的时候，使用拷贝编译器生成的变量初始化。提供了值才是值初始化。使用括号初始化的时候，什么时候是赋值初始化，什么时候是拷贝初始化。


## Chapter 4. Expressions
when we use an object as an rvalue, we use the object’s value (its contents). When we use an object as an lvalue, we use the object’s identity (its location in memory).
we apply decltype to an expression (other than a variable), the result is a reference type if the expression yields an lvalue.decltype(*p) is int&. decltype(&p) is int**,
没有定义操作符操作数的执行顺序，方便编译器进行优化。If you change the value of an operand, don’t use that operand elsewhere in the same expresion.
Compound Assignment Operators 只计算一次，a op= b == a = a op b; 除了性能上有一点点差异，两种完全相同。非组合的计算两次，一次在右边op一次在左边 = 。
后加加优先级更高，所以 *pbeg++ is equivalent to *(pbeg++).


### 4.6. The Member Access Operators


### 4.8. The Bitwise Operators
Moreover, doing a left shift that changes the value of the sign bit is undefined.

### 4.9. The sizeof Operator
The sizeof operator is unusual in that it does not evaluate its operand。sizeof returns a constant expression。返回常量表达式，可以用来确定数组大小。
sizeof (type) 类型大小，这个可以传递变量在括号里面吗？应该是不行的吧， sizeof expr 表达式类型的大小，returns the size of the type returned by the given expression.。
we can use the scope operator to ask for the size of a member of a class type。Note that sizeof does not convert the array to a pointer.

	// sizeof(ia)/sizeof(*ia) returns the number of elements in ia
	constexpr size_t sz = sizeof(ia)/sizeof(*ia);
	int arr2[sz]; // ok sizeof returns a constant expression

sizeof a string or a vector returns only the size of the fixed part of these types; it does not return the size used by the object’s elements. ？？？


#### 4.11.1. The Arithmetic Conversions
When the signedness differs and the type of the unsigned operand is the same as or larger than that of the signed operand, the signed operand is converted to unsigned.
A const_cast changes only a low-level (§ 2.4.3, p. 63) const in its operand。所以类型本来的那个const是底层的，复合类型带的那个是顶层的。


## Chapter 5. Statements
dangling else 匹配最近不匹配的 if。switch 执行第一个 case 开始，如果没有遇见 break，会一直执行后续case 即便是不匹配。不允许跳过case定义的变量。
we can do so by defining the variable inside a block, thereby ensuring that the variable is out of scope at the point of any subsequent label.
for (auto &r : v)  ==   for (auto beg = v.begin(), end = v.end(); beg != end; ++beg) {auto &r = *beg;} 缓存end？不能用来向容器中添加元素？
A do while ends with a semicolon after the parenthesized condition. Variables used in condition must be defined outside the body of the do while statement.
goto 使用的 Label 独立于变量系统，可以和任何变量重复，但是必须和 goto 在同一个函数内。goto同样不允许跳过变量定义。可以往会跳跃，并且销毁再重新构造变量。不建议使用。
Caution: Writing Exception Safe Code is Hard。书写异常安全的程序是很难的，异常这块还是要好好接触一下的。


## Chapter 6. Functions
Execution of a function begins with the (implicit) definition and initialization of its parameters.(右值是否需要定义只需声明？int&& val = 5;)
we have no guarantees about the order in which arguments are evaluated(函数参数的计算顺序没用保证，和if语句不同)。
For compatibility with C, we also can use the keyword void to indicate that there are no parameters(C++里面还是不要这样写了，尤其是构造析构函数)。
Moreover, local variables at the outermost scope of the function may not use the same name as any parameter。(函数最外层作用域？进入函数作用域但是没进入子作用域{})。
形式参数名可以省略，当不使用的时候可以不命名参数，但是必须传递实际参数的值的个数不可省略。所有这种做法是处于什么原因，是声明可以省略，而定义加上嘛。
However, the return type may not be an array type (§ 3.5, p. 113) or a function type. However, a function may return a pointer to an array or a function.


#### 6.1.1. Local Objects
In C++, names have scope (§ 2.2.4, p. 48), and objects have lifetimes. It is important to understand both of these concepts.
	• The scope of a name is the part of the program’s text in which that name is visible.
	• The lifetime of an object is the time during the program’s execution that the object exists.
	
Parameters and variables defined inside a function body are referred to as local variables.(形式参数是函数作用域内的本地变量)。
Automatic Objects，形式参数和函数内的本地变量都是在执行到的时候定义并初始化(形参通过实参初始化，本地变量提供初始化或者执行默认初始化，内置类型默认值为未定义的)，当函数结束的时候自动释放。
Local static Objects 第一次执行到的时候定义并初始化，不提供初始化执行默认初始(it is value initialized)程序结束才释放，可以用来统计函数执行次数。


#### 6.1.2. Function Declarations

#### 6.1.3. Separate Compilation

### 6.2. Argument Passing
As with any other variable, the type of a parameter determines the interaction between the parameter and its argument.(如果形参是引用那么它就会绑定到实参上)。
std::ostream& operator<<(std::ostream& out, const T&) (实参传入返回值传出，为的是可以连续使用嘛。不然实参不是已经传出了)。返回调用对象！！！！ return *this; 连续使用同一个对象 b.f().m();
top-level consts are ignored on a parameter(所有形参可以是 const 或者 非 const 但是形参都是不可更改的，需要避免重定义，形参是 const 和 非 const 是同一个定义)。
We can initialize an object with a low-level const from a nonconst object but not vice versa, and a plain reference must be initialized from an object of the same type.(？？？)
当需要把常量引用实参传递给非常量引用形参的时候，可以通过定义实参副本为普通引用，进行传递。当然最好是把形参定义为常量引用，这样可以接收的类型更广泛。除非你想函数内修改实参。


#### 6.2.4. Array Parameters
数组不可拷贝，使用时候通常转换为指针，不能拷贝所有不能用值传递参数，当传递数组的时候通常转换为指向首元素的指针。但是我们可以把形参声明为数组的样子。因为转换为指针所有不知道个数。

	f(int &arr[10]) // error: declares arr as an array of references
	f(int (&arr)[10]) // ok: arr is a reference to an array of ten ints

	int *matrix[10]; // array of ten pointers
	int (*matrix)[10]; // pointer to an array of ten ints
	// equivalent definition // In fact, the parameter is a pointer to an array of ten ints.
	void print(int matrix[][10], int rowSize) { /* . . . */ }
	
The size of the second (and any subsequent) dimension is part of the element type and must be specified。(多维数组的第二维度大小类型的一部分必须给出，不然不知道指针指向的类型。?).


#### 6.2.5. main: Handling Command-Line Options

#### 6.2.6. Functions with Varying Parameters
Ellipsis parameters 主要为了和C混用. In particular, objects of most class types are not copied properly when passed to an ellipsis parameter.

	void foo(parm_list, ...);   // 逗号是可选的。
	void foo(...);
	
	
	
### 6.3. Return Types and the return Statement
Never Return a Reference or Pointer to a Local Object。返回左值的函数可以放到等号左边，和其它左值一样。
int (*func(int i))[10]; 返回数组的函数声明。auto func(int i) -> int(*)[10]; (Using a Trailing Return Type). 
decltype(odd) *arrPtr(int i);(Using decltype). //The typereturned by decltype is an array type, to which we must add a * to indicate that arrPtr returns a pointer.


### 6.4. Overloaded Functions
top-level const 不能用来区别重载， low-level 可以。Names do not overload across scopes。(覆盖外层的)。

	string &shorterString(string &s1, string &s2)
	{
		auto &r = shorterString(const_cast<const string&>(s1),
					const_cast<const string&>(s2));
					return const_cast<string&>(r);
	}
	
	
### 6.5. Features for Specialized Uses
inline 函数在编译期展开，省去运行时调用函数的开销。但是编译期可能忽略这个展开请求。
constexpr 返回类型和形参类型也必须是字面值类型，而且函数只能有一个 return。编译期会进行验证确定常量值。隐含 inline。
A constexpr function body may contain other statements so long as those statements generate no actions at run time.
A constexpr function is not required to return a constant expression.(根据值确定，所以返回类型是字面值类型是个什么意思。)
As a result, inline and constexpr functions normally are defined in headers. (方便展开的地方都统一)


#### 6.5.3. Aids for Debugging
assert(expr); 在调试模式下使用，当 expr 为真的时候什么都不做，当表达式为假的时候，输出错误信息，并且结束程序。
是否启动  assert 根据 NDEBUG 预处理宏定义，默认不定义，assert 执行运行时检查。当定义的时候，什么都不做。(No debug ?).
可以通过 #ifndef NDEBUG ... #endif 来添加自己的调试信息。
	
	_ _func_ _ in every function. It is a local static array of const char that holds the name of the function。
	_ _FILE_ _ string literal containing the name of the file
	_ _LINE_ _ integer literal containing the current line number
	_ _TIME_ _ string literal containing the time the file was compiled
	_ _DATE_ _ string literal containing the date the file was compiled
	
	
### 6.6. Function Matching
Casts should not be needed to call an overloaded function. The need for a cast suggests that the parameter sets are designed poorly. 

### 6.7. Pointers to Functions
函数指针只需要用指针替换函数名就可以了，加上括号。不加括号就变成了返回类型是什么指针的函数了。pf = f 等价 pf = &f。
赋值的时候取值符可选。函数名被解为指针。(和数组名称类似?) 调用时可以直接调用，无需解引用，当然存在等效的。(*pf)() == pf();
函数指针间不存在转换，指向重载函数的时候必须指明重载的是那个函数，通过参数列表标明。可以当形参，实参函数名，实际是当指针使用。

	// third parameter is a function type and is automatically treated as a pointer to function
	void useBigger(const string &s1, const string &s2, bool pf(const string &, const string &));
	// equivalent declaration: explicitly define the parameter as a pointer to function
	void useBigger(const string &s1, const string &s2, bool (*pf)(const string &, const string &));
	
预定义类型别名，typedef 和 using 还有 decltype 还有后缀 返回类型声明，都可以方便函数指针的阅读。


## Chapter 7 Classes
When we call a member function, this is initialized with the address of the object on which the function was invoked。
紧跟参数列表后面的 const 表示 this 是一个指向常量的指针(对象内容不可变)。这样使用 const 的成员函数是常量成员函数。常量对象只能调用这种函数。
By default, the type of this is a const pointer to the nonconst version of the class type.(指向不可改变，实际的对象内容可变)。

#### 7.1.4. Constructors
Unlike other member functions, constructors may not be declared as const (§7.1.2, p. 258). (构造函数不可以是 const，构造结束才取得对象 const 属性)
When we create a const object of a class type, the object does not assume its “constness” until after the constructor completes the object’s initialization.
Thus, constructors can write to const objects during their construction. (构造期间可以写入 const 对象)

The compiler generates a default constructor automatically only if a class declares no constructors.
If we define any constructors, the class will not have a default constructor unless we define that constructor ourselves.
(已经声明了构造函数的情况下，可以通过 = default 声明默认构造函数，这样就不用都特殊初始化)
synthesized default constructor 对于 built-in or compound type 默认初始化是未定义的，可以通过 = 类内初始化(C++11)。或者提供构造函数。
If a class has a member that has a class type, and that class doesn’t have a default constructor(提供了特殊构造函数), then the compiler can’t initialize that member.

When a member is omitted from the constructor initializer list, it is implicitly initialized using the same process as is used by the synthesized default constructor. 
In this case, those members are initialized by the in-class initializers.(当初始化列表没有提供成员初始化的时候，使用和合成构造一样的方式，类内初始化或者默认初始化)
成员初始化在构造函数体执行之前，即便是提供的空初始化列表或者不专业的说没有初始化列表。(如果存在基类什么的，这之前要执行的事情应该还要更多，成员变量之间应该是没顺序的)。

#### 7.1.5. Copy, Assignment, and Destruction
编译器可以帮助生成 合成的拷贝构造函数，赋值操作符，析构函数，但是当对象需要分配对象外的资源时候，比如成员是动态分配内存的时候，他们没法正确执行，所以需要手动提供。


#### 7.2.1. Friends
通常是为了给和类关联的函数使用的。allow another class or function to access its nonpublic members by making that class or function a friend.(friend + 声明)。
Friends are not members of the class and are not affected by the access control of the section in which they are declared.(任何位置都可以定义)


### 7.3. Additional Class Features
A class can define its own local names for types. Type names defined by a class are subject to the same access controls as any other member(typedef / using = )
通过将类型成员声明为public的暴露在外面，要先定义后使用。这样可以隐藏实际使用的类型。using pos = std::string::size_type;  外面不知道使用了 string 类型。
可以在成员函数声明或者定义处使用 inline 声明成内联函数，两处都写也是合法的，一般只写在类外的定义处，并且把定义放到和类同一个头文件中。
将成员声明为 mutable 那么这个成员永远不会是 const ，可以在 const 成员函数中修改。
When we provide an in-class initializer, we must do so following an = sign or inside braces.
A const member function that returns *this as a reference should have a return type that is a reference to const. (??? 是否可以连续使用 . . 访问成员函数？只可以访问 const 函数)


#### 7.3.3. Class Types
在前向声明之后只是说明了有这么一种类类型，定义之前，类是一个不完全类型，不知道具体有那些成员，在我们创建对象之前，必须要有类的定义。
We can define pointers or references to such types, and we can declare (but not define) functions that use an incomplete type as a parameter or return type
类完全定义后才知道大小，所有类不能包含自己类型的成员，但是可以包含自己类型的指针或者引用，因为类名字出现过就是声明了。
Making a member function a friend requires careful structuring of our programs to accommodate interdependencies among the declarations and definitions(***)


### 7.4. Class Scope
We access type members from the class using the scope operator(::访问类型成员)。类外部定义的返回类型在类作用域外使用::访问类成员。
Member function definitions are processed after the compiler processes all of the declarations in the class.(不需要特意排版成员函数)先查找范围内，再查找范围外。
(针对成员函数内名字查找，不同于普通函数的名字查找，先范围内声明，再范围外声明，其它类范围外的还是要先声明名字才可以使用，包括返回值，参数列表，初始化列表)。
如果类外定义的类型，在类中已经使用，那么不可以在类中再定义相同类型并且使用，虽然有些编译器不报错。所有通常在已进入类就定义类型，在使用前可以覆盖类外相同定义。


### 7.5. Constructors Revisited
We must use the constructor initializer list to provide values for members that are const, reference, or of a class type that does not have a default constructor.
构造函数初始化列表负责初始化，先于构造函数体执行。所有写在函数体内的赋值，实际上是经历过先初始化的，然后才赋值，效率要低一些。还有上面提到的必须初始化的。
Delegating Constructors 委托构造函数可以把，具体的任务委托给其它构造函数，在初始化列表中调用，执行完受委托函数体后，返回自己的函数体。
A constructor that can be called with a single argument defines an implicit conversion from the constructor’s parameter type to the class type. (explicit)
一步类类型隐式转换，也就是说如果有提供一个参数的构造函数，那么这种类型的参数，可以当作这个类类型使用。当参数的时候生成临时对象。
explicit 用来抑制隐式转换，但是可以显示使用转换。只对一个参数构造函数生效，只能用于直接初始化。不能用于拷贝初始化 = 。


#### 7.5.5. Aggregate Classes
成员都是 public，无构造函数，无类内初始值，无基类，无 virtual 函数，使用 {} 初始值列表按序初始化。
除了算数类型，引用和指针外，数据成员都是字面值类型的聚合类，是字面值常量类。非聚合类满足成员都是字面值类型，至少含有一个 constexpr 构造函数()，等。。
constexpr 构造函数同时满足构造函数和 constexpr 函数要求，用于构造 constexpr 对象，用于参数和返回值。


### 7.6. static Class Members
static members can be public or private. The type of a static data member can be const, reference, array, class type, and so forth.
static member functions may not be declared as const(属于类不绑定对象), and we may not refer to this in the body of a static member。
```

## Chapter 8. The IO Library


## Part II: The C++ Library
[The_Cpp_Standard_Library_A_Tutorial_and_Reference_2n](https://israel-liu.github.io/2019/01/23/The-Cpp-Standard-Library-A-Tutorial-and-Reference-2nd-Edition/)


## Part III: Tools for Class Authors
[reading-note-two](https://israel-liu.github.io/2016/12/02/reading-note-two/)



