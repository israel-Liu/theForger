---
title: Algorithm Design and Applications
date: 2019-03-24 17:30:38
tags:
---

## Chapter 1 Algorithm Analysis
Similarly, computer scientists must also deal with scale, 
but they deal with it primarily in terms of data volume rather than physical object size.
算法的 running time 和 space usage 用来 analysis 好坏。


### 1.1 Analyzing Algorithms
• Takes into account all possible inputs
• Allows us to evaluate the relative efficiency of any two algorithms in a way
  that is independent from the hardware and software environment
• Can be performed by studying a high-level description of the algorithm without
  actually implementing it or running experiments on it.
  
 
#### 1.1.1 Pseudo-Code
Pseudo-code is a mixture of natural language and high-level programming constructs
that describe the main ideas behind a generic implementation of a data structure or algorithm.


#### 1.1.2 The Random Access Machine (RAM) Model
Primitive operations 操作对应硬件指令，有固定操作时间，包括:

	• Assigning a value to a variable
	• Calling a method
	• Performing an arithmetic operation (for example, adding two numbers)
	• Comparing two numbers
	• Indexing into an array
	• Following an object reference
	• Returning from a method.
	
	
#### 1.1.3 Counting Primitive Operations
That is, designing for the worst case can lead to stronger algorithmic
“muscles,” much like a track star who always practices by running uphill.


#### 1.1.4 Analyzing Recursive Algorithms
一个结束状态，一个递归函数。即便是理解了栈，也好难理解递归调用。


#### 1.1.5 Asymptotic Notation
Let f(n) and g(n) be functions mapping nonnegative integers to real numbers.


#### 1.1.6 The Importance of Asymptotic Notation


### 1.2 A Quick Mathematical Review


#### 1.2.1 Summations

#### 1.2.2 Logarithms and Exponents

floor = the largest integer less than or equal to x
ceiling = the smallest integer greater than or equal to x.
	
#### 1.2.3 Simple Justification Techniques
counterexample(反例), contrapositive(对立), contradiction(矛盾), Induction(归纳), Loop Invariants(循环不变)


#### 1.2.4 Basic Probability
probability space(概率空间), mutually independent(互相独立), Conditional Probability(条件概率),
random variables(随机变量), expected value(期望值), Chernoff Bounds(切尔诺夫界限), 


### 1.3 A Case Study in Algorithm Analysis
maximum subarray problem(最大子序列),

#### 1.3.1 A First Solution to the Maximum Subarray Problem

```Cpp
int MaxSubSlow(const vector<int>& v)
{
  int sum = 0, n = v.size();
  for (int i = 0; i < n; ++i) {
    for (int j = i; j < n; ++j) {
      int s = 0;
      for (int k = i; k < j; ++k) {
        s += v[k];
      }
      if (s > sum) {
        sum = s;
      }
    }
  }

  return sum;
}
```

#### 1.3.2 An Improved Maximum Subarray Algorithm

```Cpp
int MaxSubFaster(const vector<int>& v)
{
  int n = v.size();
  vector<int> s(n);
  s[0] = v[0];

  for (int i = 1; i < n; ++i) {
    s[i] = s[i - 1] + v[i];
  }

  int max_sum = 0;

  for (int i = 1; i < n; ++i) {
    int sub_sum = 0;
    for (int j = i; j < n; ++j) {
      sub_sum = s[j] - s[i - 1];
      if (sub_sum > max_sum) max_sum = sub_sum;
    }
  }

  return max_sum;
}
```

#### 1.3.3 A Linear-Time Maximum Subarray Algorithm

```Cpp
int MaxSubFastest(const vector<int>& v)
{
  int n = v.size();
  vector<int> m(n);
  m[0] = v[0];

  for (int i = 1; i < n; ++i)
    m[i] = std::max(0, m[i - 1] + v[i]);

  int max_sum = 0;

  for (int i = 1; i < n; ++i)
    max_sum = std::max(max_sum, m[i]);

  return max_sum;
}
```

### 1.4 Amortization
clearable table(可擦除表), amortized running time(平坦运行时间)


#### 1.4.1 Amortization Techniques
The Accounting Method(会计方法), Potential Functions(), 


#### 1.4.2 Analyzing an Extendable Array Implementation
extendable array(扩展数组),


### 1.5 Exercises
Reinforcement(加固), Creativity(创意), Applications(应用)


### Chapter Notes



## Chapter 2 Basic Data Structures
producer-consumer model(生产者消费者模型), first-in, first-out (FIFO)
[basic_data_structures.h](https://github.com/israel-Liu/fragments-of-time/blob/master/boruto/codeforces/basic_data_structures.h)

### 2.1 Stacks and Queues 


#### 2.1.1 Stacks
last in first-out (LIFO), decltype(auto) 这是个啥类型,难道是先用 auto 接收了返回值类型。

Using Stacks for Procedure Calls and Recursion:
	More specifically, during the execution of a program thread, the runtime environment
	maintains a stack whose elements are descriptors of the currently active
	(that is, nonterminated) invocations of methods. These descriptors are called
	frames(栈帧). A frame for some invocation of method cool stores the current values of
	the local variables and parameters of method cool, as well as information on the
	method that called cool and on what needs to be returned to this method.

Recursion(递归):
	Each call of the same method will be associated with a different frame, 
	complete with its own values for local variables.
	
	
#### 2.1.2 Queues
first-in first-out (FIFO),	


### 2.2 Lists


#### 2.2.1 Index-Based Lists

#### 2.2.2 Linked Lists


### 2.2 Lists
### 2.3 Trees
### 2.4 Exercises

























## Chapter 8 Merge-Sort and Quick-Sort


### 8.1 Merge-Sort


#### 8.1.1 Divide-and-Conquer
分成小块进行处理，最后再 merge 到一起。大事化小，小事化了。



### 8.2 Quick-Sort
每次选择一个 pivot 把小于 pivot 的放到 L，大于 pivot 的放到 G，循环直到不可分。可以采用递归或者迭代法。


#### 8.2.1 Randomized Quick-Sort
增加随机选择 pivot 保证每次分配到 L 集合的合 G 集合的几乎均等，保证算法运行时间为 O(n log n).


#### 8.2.2 In-Place Quick-Sort
使用本身的存储空间进行排序。


### 8.3 A Lower Bound on Comparison-Based Sorting