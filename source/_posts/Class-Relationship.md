---
title: Class Relationship
date: 2017-11-03 19:43:17
tags:
---
&ensp;&ensp;&ensp;&ensp; 在面向对象的程序设计中设计一个简单的类可能相对简单一些，但往往单一类是不能完成比较复杂的功能的，  
这就需要我们不但会设计单独的类，还要知道如何更好的处理类之间的关系。下面介绍类之间的几种关系。

#### Association
![](https://github.com/israel-Liu/theForger/raw/master/images/Association.png)
```cpp
// X knows a Y
// One object is aware of another, it cantains a pointer or reference to another object
class X
{
public:
  X(Y* y) : y_ptr(y)
  {}

  void SetY(Y* y)
  {
    y_ptr = y;
  }

  void Fun()
  {
    y_ptr->Foo();
  }

private:
  Y* y_ptr = nullptr;
};
```
#### Dependency
![](https://github.com/israel-Liu/theForger/raw/master/images/Dependency.png)
```cpp
// X uses a Y
// One object issues a function call to a member function of another object
class X
{
public:
  void Fun1(Y y)
  {
    y.Foo();
  }

  void Fun2(Y* y)
  {
    y->Foo();
  }

  void Fun3(Y& y)
  {
    y.Foo();
  }

  void Fun4()
  {
    Y y;
    y.Foo();
  }

  void Fun5()
  {
    Y::StaticFoo();
  }
};
```
#### Composition
![](https://github.com/israel-Liu/theForger/raw/master/images/Composition.png)
```cpp
// X has a Y
// A class contains other classes as members
// A stronger variety of aggregation, the part object may belong to only one whole
// Expected to live and die with the whole (delete whole -> delete part)
class X
{
public:
  Y a;        // 1; Composition
  Y b[10];    // 0..10; Composition
};

class X
{
public:
  X()
  {
    a = new Y[10];
  }

  ~X()
  {
    delete[] a;
  }

private:
  Y* a;       // 0..10; Composition
};

class X
{
private:
  std::vector<Y> v; // Composition of std::vector<Y> not composition of Y;
};
```
#### Aggregation
![](https://github.com/israel-Liu/theForger/raw/master/images/Aggregation.png)
```cpp
// X has a Y
// A class contains other classes as members
// Cascading delete is often
// An aggregated instance can be shared
// Following Larman OOAD: use of aggregation is NOT recommended
// No example here use Association instead of Aggregation
```
#### Inheritance
![](https://github.com/israel-Liu/theForger/raw/master/images/Inheritance.png)
```cpp
// X is a Y
// A class is derived from another class
class Y
{

};

class X : public Y
{

};
```

#### Class Template
![](https://github.com/israel-Liu/theForger/raw/master/images/ClassTemplate.png)
```cpp
// Class Template (Y use parameterized class X)
template<class T>
class X
{

};

X<Y> a;
```
#### 程序设计中模块间通信简化为类间通讯,了解类之间的关系后可以进一步设计模块
```cpp
class PT
	: public PTAPI, // pt write interface and implement
	  public UI_CALL_BACK_SINK // ui write interface pt write implement
{
public:
	// PTAPI // also need write call back
private:
	UIAPI ui_api_; // use to control ui // also use for call back
};

class UI
	: public UIAPI, // ui write interface and implement
	  public PT_CALL_BACK_SINK // pt write interface ui write implement
{
public:
	// UIAPI // also need write call back
private:
	PTAPI pt_api_; // use to control pt // also use for call back
};
```
#### 最后附带一个使用STL的Composition图示
![](https://github.com/israel-Liu/theForger/raw/master/images/CompositionExample.png)
