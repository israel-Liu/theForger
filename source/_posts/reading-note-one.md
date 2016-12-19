---
title: C++ Primer, Fifth Edition reading_note_one
date: 2016-12-01 10:38:24
tags: C++ Primer, reading note
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
