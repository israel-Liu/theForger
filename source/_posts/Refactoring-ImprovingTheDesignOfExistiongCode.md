---
title: Refactoring_ImprovingTheDesignOfExistiongCode
date: 2018-09-29 18:46:42
tags:
---

### 第一个案例

近期需要对维护的代码进行重构，主要针对一个很大的类进行重构，为了不影响其他使用这个代码的人。     
我们在保证对外接口不变的情况下对类进行分解。为了影响最小化先定规矩，每次只改当前任务涉及代码。   
更改方式主要依据一下[两点](https://israel-liu.github.io/2018/09/21/CppCoreGuidelines/)  

#### I.27: For stable library ABI, consider the Pimpl idiom
Reason Because private data members participate in class layout and private member functions participate in overload resolution,     
changes to those implementation details require recompilation of all users of a class that uses them.     
A non-polymorphic interface class holding a pointer to implementation (Pimpl) can isolate the users of a class from changes in its implementation at the cost of an indirection. 
Example interface (widget.h)
```Cpp
class widget {
    class impl;
    std::unique_ptr<impl> pimpl;
public:
    void draw(); // public API that will be forwarded to the implementation
    widget(int); // defined in the implementation file
    ~widget();   // defined in the implementation file, where impl is a complete type
    widget(widget&&) = default;
    widget(const widget&) = delete;
    widget& operator=(widget&&); // defined in the implementation file
    widget& operator=(const widget&) = delete;
};

// implementation (widget.cpp)

class widget::impl {
    int n; // private data
public:
    void draw(const widget& w) { /* ... */ }
    impl(int n) : n(n) {}
};

void widget::draw() { pimpl->draw(*this); }
widget::widget(int n) : pimpl{std::make_unique<impl>(n)} {}
widget::~widget() = default;
widget& widget::operator=(widget&&) = default;
```

#### C.5: Place helper functions in the same namespace as the class they support
Reason A helper function is a function (usually supplied by the writer of a class) that does not need direct access to the representation of the class,     
yet is seen as part of the useful interface to the class.     
Placing them in the same namespace as the class makes their relationship to the class obvious and allows them to be found by argument dependent lookup.

```Cpp
namespace Chrono { // here we keep time-related services

    class Time { /* ... */ };
    class Date { /* ... */ };

    // helper functions:
    bool operator==(Date, Date);
    Date next_weekday(Date);
    // ...
}
```

### 重构原则
我不是个伟大的程序员，我只是个有着一些优秀习惯的好程序员。    
当你要修改某个函数名称时，请留下旧函数，让它调用新函数。

### 代码的坏味道
Long Parameter List(通常不应该超过7个)应该制造出一个“参数对象”。    
Divergent Change 是指“一个类受多种变化的影响”为此，    
你应该找出某特定原因而造成的所有变化，将他们提炼到另外一个类中。   
Shotgun Surgery 是指“一种变化引发多个类相应修改”需要创造一个类安放他们。    
Data Clumps 删掉众多数据中的一项，如果其它数据不再有意义，应该为他们产生一个新对象。   
Switch Statements 使用面向对象中的多态概念优雅的解决(看来我需要做个实践了)    
Message Chains 如果你看到用户向一个对象请求另外一个对象，然后再向后者请求另外一个对象。
Middle Man 如果某个类有一半的函数都委托给了其它类。不干实事的不要太多。    

### 构筑测试体系
1.类应该包含自己的测试代码 (编译器测试运行期测试)
2.学习一下如何写测试代码

### 重构列表