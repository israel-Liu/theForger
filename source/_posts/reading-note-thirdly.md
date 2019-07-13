---
title: C++ Primer, Fifth Edition reading-note-thirdly
date: 2018-03-28 20:00:43
tags:
---
#### The Basics
&nbsp;&nbsp;&nbsp;&nbsp;前面两篇写的都是我自己觉得比较难以理解的，现在开始为了某人就写一些基础知识，鉴于也不是完全的初学者，所以只能根据我的了解写，所以也不适合所有人看，当然我的blog也就没啥人看，菜鸡一个，哈哈，现在小透明课堂开课啦
##### Variables and Basic Types

1.基本内置类型包括 数据类型（整型 int, bool, char, 和 浮点型 float, double）和空类型 void
  对于内置类型我们需要知道每个类型占多少字节（1 bytes == 8 bit）x86和x64相同类型可能占不同字节数我们可以用（sizeof）获取
  char一般是（1 byte）， C++规定 short <= int <=long <= long long，类型转换时候大到小会丢失数据(static_cast<>()）

2.字面值常量包括数值，字符，字符串，字符又有转移字符，单双字节和Unicod编码（请自行学习）

3.变量在C++里等同对象，为程序员提供一个可操作的存储空间，要使用一个变量首选要给出变量的定义（定义不同于声明，为了支持分离式编译，C++把声明和定义分开，声明declaration使名字为程序所知道，如果一个文件想使用一个变量必须包含这个变量的声明。而定义definition负责创建实体分配空间）一般来说头文件里面写声明，如果分配了空间就是定义，赋值需要内存空间。（学习关键字extern）。变量可多次声明只可一次定义。
（C++是statically typed 静态类型语言，在编译阶段做type checking类型检查，了解这个有助于理解多态），命名规范和作用域请自己了解。

4.复合类型是基于其他类型定义的类型。下面只介绍指针和引用，基本数据类型+声明符[declarator](http://en.cppreference.com/w/cpp/language/declarations)列表组成

4.1 引用reference就是为已经存在的对象起另外一个名字，把引用和初值绑定（bind）在一起如 int val = 1024; int& ref_val = val;这时候val和ref_val就是一个内存空间，更改任何一个另外一个也就变了（因为就是一个啦）

4.2 指针pointer指向另外一种类型，实现对其他对象的间接访问。指针本身是一个对象（占用4字节）所以你可以对指针进行拷贝和赋值而且无需在定义时候赋初值 int val = 42; int* p = &val;(指针存放某个对象的地址，用取地址符&获取对象地址), 指针访问对象通过解引用符（*）。空指针请自行了解。


## Part II: The C++ Library