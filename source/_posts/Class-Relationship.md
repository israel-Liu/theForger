---
title: Class Relationship
date: 2017-11-03 19:43:17
tags:
---
&ensp;&ensp;&ensp;&ensp; 在面向对象的程序设计中设计一个简单的类可能相对简单一些，但往往单一类是不能完成比较复杂的功能的，  
这就需要我们不但会设计单独的类，还要知道如何更好的处理类之间的关系。下面介绍类之间的几种关系。

#### Association
```cpp
// Association X -> Y (X knows a Y)
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
```cpp
// Dependency X ---> Y (X uses a Y)
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
```cpp
// Composition X ◆-> Y (X has a Y)
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
```cpp
// Aggregation (X has a Y)
// A class contains other classes as members
// Cascading delete is often
// An aggregated instance can be shared
// Following Larman OOAD: use of aggregation is NOT recommended
// No example here use Association instead of Aggregation
```
#### Inheritance
```cpp
// Inheritance (X is a Y)
// A class is derived from another class
class Y
{

};

class X : public Y
{

};
```

#### Class Template
```cpp
// Class Template (Y use parameterized class X)
template<class T>
class X
{

};

X<Y> a;
```
