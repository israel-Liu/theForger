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
基于数组的实现。

#### 2.2.2 Linked Lists
基于链表的实现。

### 2.3 Trees
A binary tree is proper if each internal node has two children.


#### 2.3.1 A Tree Definition
树深度，根是 0 ，往下数深度。 树高度，叶子是 0 ，往上数高度，根最高，是树高。


#### 2.3.2 Tree Traversal
Preorder Traversal(前序遍历, 先根后子)->阅读文档。Postorder Traversal(后续遍历, 先子后根)


#### 2.3.3 Binary Trees
```Cpp
	// L -> L -> R - R 等到里面的左递归结束，正好开始执行父亲的右兄弟。\
	Algorithm binaryPreorder(T, v):
		perform the “visit” action for node v       // 真正的访问执行，先根
		if v is an internal node then
			binaryPreorder(T, T.leftChild(v)) 	    // recursively traverse left subtree
			binaryPreorder(T, T.rightChild(v))      // recursively traverse right subtree


	Algorithm binaryPostorder(T, v):
		if v is an internal node then
			binaryPostorder(T, T.leftChild(v)) 		// recursively traverse left subtree
			binaryPostorder(T, T.rightChild(v)) 	// recursively traverse right subtree
		perform the “visit” action for the node v   // 真正的访问执行，后根
		
		
	Algorithm inorder(T, v):
		if v is an internal node then
			inorder(T, T.leftChild(v)) 				// recursively traverse left subtree
		perform the “visit” action for node v       // 真正的访问执行，中根(二叉树特有) 当然了任何树都是可以转换为二叉树的
		if v is an internal node then
			inorder(T, T.rightChild(v)) 			// recursively traverse right subtree
			
			
	Algorithm eulerTour(T, v):
		perform the action for visiting node v on the left
		if v is an internal node then
			recursively tour the left subtree of v by calling eulerTour(T, T.leftChild(v))
		perform the action for visiting node v from below
		if v is an internal node then
			recursively tour the right subtree of v by calling eulerTour(T, T.rightChild(v))
		perform the action for visiting node v on the right
```

#### 2.3.4 Data Structures for Representing Trees
linked structure(链式存储结构),


### 2.4 Exercises
Reinforcement(巩固), Creativity(创造力), Applications(应用)


### Chapter Notes



## Chapter 3 Binary Search Trees
binary space partitioning(二进制空间分区), binary search tree(二叉查找树),


### 3.1 Searches and Updates . . . . . . . . . . . . . . . . . . . 91

```Cpp
	Algorithm BinarySearch(A, k, low, high):
	Input: An ordered array, A, storing n items, whose keys are accessed with method key(i) and whose elements are accessed with method elem(i); 
		   a search key k; and integers low and high
	Output: An element of A with key k and index between low and high, if such an element exists, and otherwise the special element null
	
	if low > high then
		return null
	else
		mid ← (low + high)/2 				// 取整
	if k = key(mid) then
		return elem(mid)
	else if k < key(mid) then
		return BinarySearch(A, k, low, mid − 1)
	else
		return BinarySearch(A, k, mid + 1, high)
```

#### 3.1.1 Binary Search Tree Definition
左 <= 根 <= 右


#### 3.1.2 Searching in a Binary Search Tree
```Cpp
	Algorithm TreeSearch(k, v):
	Input: A search key k, and a node v of a binary search tree T
	Output: A node w of the subtree T(v) of T rooted at v, such that either w is an
            internal node storing key k or w is the external node where an item with key k would belong if it existed
			
	if v is an external node then
		return v
	if k = key(v) then
		return v
	else if k < key(v) then
		return TreeSearch(k, T.leftChild(v))
	else
		return TreeSearch(k, T.rightChild(v))
		
```


#### 3.1.3 Insertion in a Binary Search Tree
先找到位置然后插入，并满足BST。

	Let w ← TreeSearch(k, T.root())
	while w is an internal node do
	// There is item with key equal to k in T in this case
	Let w ← TreeSearch(k, T.leftChild(w))
	Expand w into an internal node with two external-node children
	Store (k, e) at w
	
	
#### 3.1.4 Deletion in a Binary Search Tree
比较复杂，我们要先找到需要删除的点，然后删除最后移动恢复BST。


#### 3.1.5 The Performance of Binary Search Trees


### 3.2 RangeQueries . . . . . . . . . . . . . . . . . . . . . . . . 101
```Cpp

	Algorithm RangeQuery(k1, k2, v):
	Input: Search keys k1 and k2, and a node v of a binary search tree T
	Output: The elements stored in the subtree of T rooted at v whose keys are in the range [k1, k2]
	
	if T.isExternal(v) then
		return null;
	if k1 ≤ key(v) ≤ k2 then
		L ← RangeQuery(k1, k2, T.leftChild(v))
		R ← RangeQuery(k1, k2, T.rightChild(v))
		return L ∪ {element(v)} ∪ R
	else if key(v) < k1 then
		return RangeQuery(k1, k2, T.rightChild(v))
	else if k2 < key(v) then
		return RangeQuery(k1, k2, T.leftChild(v))

```


### 3.3 Index-Based Searching . . . . . . . . . . . . . . . . . . 104

```Cpp
	Algorithm TreeSelect(i, v, T):
	Input: Search index i and a node v of a binary search tree T
	Output: The item with ith smallest key stored in the subtree of T rooted at v
	
	Let w ← T.leftChild(v)
	if i ≤ nw then
		return TreeSelect(i,w, T)
	else if i = nw + 1 then
		return (key(v), element(v))
	else
		return TreeSelect(i − nw − 1, T.rightChild(v), T)

```


### 3.4 Randomly Constructed Search Trees . . . . . . . . . . 107
随机构造的查找树，有点复杂，都是数学论证。



### 3.5 Exercises . . . . . . . . . . . . . . . . . . . . . . . . . . . 110
Reinforcement(巩固), 习题都没怎么细看。后面刷题实际练习吧。


### Chapter Notes


## Chapter 4 Balanced Binary Search Trees
nearest-neighbor query(邻近查询), balanced binary search trees(平衡二叉查找树), 


### 4.1 Ranks and Rotations . . . . . . . . . . . . . . . . . . . . 117
```Cpp
	Algorithm IterativeTreeSearch(k, T):
	Input: A search key k and a binary search tree, T
	Output: A node in T that is either an internal node storing key k or the external
	        node where an item with key k would belong in T if it existed
			
	v ← T.root()
	while v is not an external node do
		if k = key(v) then
			return v
		else if k < key(v) then
			v ← T.leftChild(v)
		else
			v ← T.rightChild(v)
	return v
	
	Algorithm 4.1: Searching a binary search tree iteratively.
```

rotation(旋转), of which there are four types. trinode restructuring(重组), which combines the four types of rotations into one action.

### 4.2 AVL Trees . . . . . . . . . . . . . . . . . . . . . . . . . . 120
Height-balance Property: For every internal node, v, in T, 
the heights of the children of v may differ by at most 1. 
That is, if a node, v, in T has children, x and y, then |r(x) − r(y)| ≤ 1.

```Cpp
	Algorithm insertAVL(k, e, T):
	Input: A key-element pair, (k, e), and an AVL tree, T
	Output: An update of T to now contain the item (k, e)
	
	v ← IterativeTreeSearch(k, T)
	if v is not an external node then
		return “An item with key k is already in T”
	Expand v into an internal node with two external-node children
	v.key ← k
	v.element ← e
	v.height ← 1
	rebalanceAVL(v, T)
	
```	
```Cpp
	Algorithm removeAVL(k, T):
	Input: A key, k, and an AVL tree, T
	Output: An update of T to now have an item (k, e) removed
	
	v ← IterativeTreeSearch(k, T)
	if v is an external node then
		return “There is no item with key k in T”
	if v has no external-node child then
	Let u be the node in T with key nearest to k
	Move u’s key-value pair to v
	v ← u
	Let w be v’s smallest-height child
	Remove w and v from T, replacing v with w’s sibling, z
	rebalanceAVL(z, T)
```
```Cpp
	
	Algorithm rebalanceAVL(v, T):
	Input: A node, v, where an imbalance may have occurred in an AVL tree, T
	Output: An update of T to now be balanced
	
	v.height ← 1 + max{v.leftChild().height, v.rightChild().height}
	while v is not the root of T do
		v ← v.parent()
		if |v.leftChild().height − v.rightChild().height| > 1 then
			Let y be the tallest child of v and let x be the tallest child of y
			v ← restructure(x) // trinode restructure operation
		v.height ← 1+max{v.leftChild().height, v.rightChild().height}

```


### 4.3 Red-Black Trees . . . . . . . . . . . . . . . . . . . . . . . 126
基于颜色的定义。
External-Node Property: Every external node is black.(根是黑色，可以是红？？)
Internal-node Property: The children of a red node are black.
Black-depth Property: All the external nodes have the same black depth(到根黑色节点的个数，包括根), 
                      that is, the same number of black nodes as proper ancestors.
					  

等价的 Rank 定义。当进行插入和删除的时候更容易维护定义。
External-Node Property: Every external node has rank 0 and its parent, if it exists, has rank 1.
Parent Property: The rank difference of every node, other than the root, is 0 or 1.
Grandparent Property: Any node with rank difference 0 is either a child of the root or its parent has rank difference 1.

					  
### 4.4 WeakAVL Trees . . . . . . . . . . . . . . . . . . . . . . . 130
结构上是红黑树的平衡树。have features of both AVL trees and red-black trees。
Every AVL tree is a weak AVL tree, and every weak AVL tree can be colored as a red-black tree.


Rank-Difference Property: The rank difference of any non-root node is 1 or 2.
External-Node Property: Every external node has rank 0.
Internal-Node Property: An internal node with two external-node children cannot be a 2, 2-node.


### 4.5 Splay Trees . . . . . . . . . . . . . . . . . . . . . . . . . . 139
zig-zig, zig-zag, zig, 没大看懂干嘛用的，反正就是各种 splay 然后满足一个比较小的高度。每次翻转减少高度。



### 4.6 Exercises . . . . . . . . . . . . . . . . . . . . . . . . . . . 149
Reinforcement, Creativity, Applications


### Chapter Notes


## Chapter 5 Priority Queues and Heaps
matching engines(匹配引擎), continuous limit order book


### 5.1 Priority Queues . . . . . . . . . . . . . . . . . . . . . . . 157
• Reflexive property: k ≤ k.
• Antisymmetric property: if k1 ≤ k2 and k2 ≤ k1, then k1 = k2.
• Transitive property: if k1 ≤ k2 and k2 ≤ k3, then k1 ≤ k3.


### 5.2 PQ-Sort, Selection-Sort, and Insertion-Sort . . . . . . 158
```Cpp
	Algorithm PQ-Sort(C, P):
	Input: An n-element array, C, index from 1 to n, and a priority queue P that
	       compares keys, which are elements of C, using a total order relation
	Output: The array C sorted by the total order relation
	
	for i ← 1 to n do
		e ← C[i]
		P.insert(e, e) // the key is the element itself
	for i ← 1 to n do
		e ← P.removeMin() // remove a smallest element from P
		C[i] ← e
```

#### 5.2.1 Selection-Sort
```Cpp
	Algorithm SelectionSort(A):
	Input: An array A of n comparable elements, indexed from 1 to n
	Output: An ordering of A so that its elements are in nondecreasing order
	
	for i ← 1 to n − 1 do
		// Find the index, s, of the smallest element in A[i..n].
		s ← i
		for j ← i + 1 to n do
			if A[j] < A[s] then
				s ← j
		if i != s then
			// Swap A[i] and A[s]
			t ← A[s]; A[s] ← A[i]; A[i] ← t
	return A
```

#### 5.2.2 Insertion-Sort
```Cpp
	Algorithm InsertionSort(A):
	Input: An array, A, of n comparable elements, indexed from 1 to n
	Output: An ordering of A so that its elements are in nondecreasing order.
	
	for i ← 2 to n do
		x ← A[i]
		// Put x in the right place in A[1..i], moving larger elements up as needed.
		j ← i
		while j > 1 and x < A[j − 1] do
			A[j] ← A[j − 1] // move A[j − 1] up one cell
			j ← j − 1
		A[j] ← x
	return A
```


### 5.3 Heaps . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 163
Heap-Order Property: In a heap T, for every node v other than the root, 
					 the key stored at v is greater than or equal to the key stored at v’s parent.
					 
					 
Complete Binary Tree: A binary tree T with height h is complete if the levels
					  0, 1, 2, . . . , h−1 have the maximum number of nodes possible 
					  (that is, level i has 2i nodes, for 0 ≤ i ≤ h − 1) and in level h − 1 
					  all the internal nodes are to the left of the external nodes.					 


#### 5.3.1 An Array-Based Structure for Binary Trees
p(v) 可以作为数组下标:
• If v is the root of T, then p(v) = 1.
• If v is the left child of node u, then p(v) = 2p(u).
• If v is the right child of node u, then p(v) = 2p(u) + 1.


#### 5.3.2 Insertion in a Heap
up-heap bubbling(向上堆冒泡)

```Cpp
	Algorithm HeapInsert(k, e):
	Input: A key-element pair
	Output: An update of the array, A, of n elements, for a heap, to add (k, e)
	
	n ← n + 1
	A[n] ← (k, e)
	i ← n
	while i > 1 and A[i/2(下整)] > A[i] do
		Swap A[i/2(下整)] and A[i]
		i ← i/2(下整)
```

#### 5.3.3 Removal in a Heap
```Cpp
	Algorithm HeapRemoveMin():
	Input: None
	Output: An update of the array, A, of n elements, for a heap, to remove and return an item with smallest key
	
	temp ← A[1]
	A[1] ← A[n]
	n ← n − 1
	i ← 1
	while i < n do
		if 2i + 1 ≤ n then // this node has two internal children
			if A[i] ≤ A[2i] and A[i] ≤ A[2i + 1] then
				return temp // we have restored the heap-order property
			else
				Let j be the index of the smaller of A[2i] and A[2i + 1]
				Swap A[i] and A[j]
				i ← j
		else // this node has zero or one internal child
			if 2i ≤ n then // this node has one internal child (the last node)
				if A[i] > A[2i] then
					Swap A[i] and A[2i]
			return temp // we have restored the heap-order property
	return temp // we reached the last node or an external node
```


### 5.4 Heap-Sort . . . . . . . . . . . . . . . . . . . . . . . . . . 174
```Cpp
	Algorithm BottomUpHeap(S):
	Input: A list S storing n = 2h − 1 keys
	Output: A heap T storing the keys in S.
	
	if S is empty then
		return an empty heap (consisting of a single external node).
	Remove the first key, k, from S.
	Split S into two lists, S1 and S2, each of size (n − 1)/2.
	T1 ← BottomUpHeap(S1)
	T2 ← BottomUpHeap(S2)
	Create binary tree T with root r storing k, left subtree T1, and right subtree T2.
	Perform a down-heap bubbling from the root r of T, if necessary.
	return T
```


### 5.5 Extending Priority Queues . . . . . . . . . . . . . . . . 179
element(): Return the element of the item associated with Locators(定位器).
key(): Return the key of the item associated with Locators(定位器).

min(): Return the locator to an item of P with smallest key.
insert(k, e): Insert a new item with element e and key k into P and
return a locator to the item.
remove(): Remove from P the item with locator .
replaceElement(, e): Replace with e and return the element of the item of P with locator .
replaceKey(, k): Replace with k and return the key of the item of P with locator 


### 5.6 Exercises . . . . . . . . . . . . . . . . . . . . . . . . . . . 182
Reinforcement, Creativity, Applications


### Chapter Notes


## Chapter 6 Hash Tables
hash table(哈希表),

### 6.1 Maps . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 189
dictionary or map(字典, 图), multimap(多重映射)


#### 6.1.1 The Map Definition
get(k): If M contains an item with key equal to k, then return the value of such an item; else return a special element NULL.
put(k, v): Insert an item with key k and value v; if there is already an item with key k, then replace its value with v.
remove(k): Remove from M an item with key equal to k, and return this item. If M has no such item, then return the special element NULL.


#### 6.1.2 Lookup Tables
bucket(桶),


### 6.2 Hash Functions . . . . . . . . . . . . . . . . . . . . . . . 192
collision(冲突),
The standard convention for hash functions is to view keys in one of two ways:
• Each key, k, is a tuple of integers, (x1, x2, . . . , xd), with each xi being an integer in the range [0,M − 1], for some M and d.
• Each key, k, is a nonnegative integer, which could possibly be very large.


#### 6.2.1 Summing Components


#### 6.2.2 Polynomial-Evaluation Functions
polynomial-evaluation(多项式求值),


#### 6.2.3 Tabulation-Based Hashing


#### 6.2.4 Modular Division


#### 6.2.5 Random Linear and Polynomial Functions
random linear hash function(随机线性哈希函数), random polynomial hash function(随机多项式哈希函数), 


### 6.3 Handling Collisions and Rehashing . . . . . . . . . . . 198


#### 6.3.1 Separate Chaining
load factor(负载系数)


#### 6.3.2 Open Addressing
开放寻址


#### 6.3.3 Linear Probing
```Cpp
get(k):
	i ← h(k)
	while A[i] 	= NULL do
		if A[i].key = k then
			return A[i]
		i ← (i + 1) mod N
	return NULL
```
```Cpp
put(k, v):
	i ← h(k)
	while A[i] 	= NULL do
		if A[i].key = k then
			A[i] ← (k, v) // replace the old (k, v撇)
		i ← (i + 1) mod N
	A[i] ← (k, v)
```
```Cpp
remove(k):
	i ← h(k)
	while A[i] 	= NULL do
		if A[i].key = k then
			temp ← A[i]
			A[i] ← NULL
			Call Shift(i) to restore A to a stable state without k
			return temp
		i ← (i + 1) mod N
	return NULL
```
```Cpp
Shift(i):
	s ← 1 // the current shift amount
	while A[(i + s) mod N] 	= NULL do
		j ← h(A[(i + s) mod N].key) // preferred index for this item
		if j 	∈ (i, i + s] mod N then
			A[i] ← A[(i + s) mod N] // fill in the “hole”
			A[(i + s) mod N] ← NULL // move the “hole”
			i ← (i + s) mod N
			s ← 1
		else
			s ← s + 1
```


#### 6.3.4 Quadratic Probing
quadratic probing(二次探测),


#### 6.3.5 Double Hashing


#### 6.3.6 Rehashing
Insert all the existing hash-table elements into the new bucket array using the new hash function


### 6.4 Cuckoo Hashing. . . . . . . . . . . . . . . . . . . . . . . 206
It mimics the breeding habits of the Common Cuckoo bird.(两个窝)
```Cpp
get(k):
	if T0[h0(k)] 	= NULL and T0[h0(k)].key = k then
		return T0[h0(k)]
	if T1[h1(k)] 	= NULL and T1[h1(k)].key = k then
		return T1[h1(k)]
	return NULL
```
```Cpp
remove(k):
	if T0[h0(k)] 	= NULL and T0[h0(k)].key = k then
		temp ← T0[h0(k)]
		T0[h0(k)] ← NULL
		return temp
	if T1[h1(k)] 	= NULL and T1[h1(k)].key = k then
		temp ← T1[h1(k)]
		T1[h1(k)] ← NULL
		return temp
	return NULL
```
```Cpp
put(k, v):
	if T0[h0(k)] 	= NULL and T0[h0(k)].key = k then
		T0[h0(k)] ← (k, v)
		return
	if T1[h1(k)] 	= NULL and T1[h1(k)].key = k then
		T1[h1(k)] ← (k, v)
		return
	i ← 0
	repeat
		if Ti[hi(k)] = NULL then
			Ti[hi(k)] ← (k, v)
			return
		temp ← Ti[hi(k)]
		Ti[hi(k)] ← (k, v) // cuckoo eviction
		(k, v) ← temp
		i ← (i + 1) mod 2
	until a cycle occurs
	Rehash all the items, plus (k, v), using new hash functions, h0 and h1.
```

### 6.5 Universal Hashing . . . . . . . . . . . . . . . . . . . . . 212
全域散列


### 6.6 Exercises . . . . . . . . . . . . . . . . . . . . . . . . . . . 215
Reinforcement, Creativity, Applications


### Chapter Notes


## Chapter 7 Union-Find Structures
并查集, social network(社交网络), 

### 7.1 Union-Find and Its Applications . . . . . . . . . . . . . 221


#### 7.1.1 Connected Components
```Cpp
Algorithm UFConnectedComponents(S,E):
	Input: A set, S, of n people and a set, E, of m pairs of people from S defining pairwise relationships
	Output: An identification, for each x in S, of the connected component containing x
	
	for each x in S do
		makeSet(x)
	for each (x, y) in E do
		if find(x) 	= find(y) then
			union(find(x), find(y))
	for each x in S do
	Output “Person x belongs to connected component” find(x)
```

#### 7.1.2 Maze Construction and Percolation Theory
```Cpp
Algorithm MazeGenerator(G,E):
	Input: A grid, G, consisting of n cells and a set, E, of m “walls,” each of which divides two cells, x and y, 
		   such that the walls in E initially separate and isolate all the cells in G
	Output: A subset, R of E, such that removing the edges in R from E creates a maze defined on G by the remaining walls

	while R has fewer than n − 1 edges do
		Choose an edge, (x, y), in E uniformly at random from among those previously unchosen
		if find(x) 	= find(y) then
			union(find(x), find(y))
			Add the edge (x, y) to R
	return R
```

### 7.2 A List-Based Implementation . . . . . . . . . . . . . . . 225
```Cpp
Algorithm makeSet():
	for each singleton element, x do 
		create a linked-list header node, u,
		u.name ←“x”
		add x to the list u
		x.head ← u
```
```Cpp
Algorithm find(x):
	return x.head
```
```Cpp
Algorithm union(u, v):
	if the set u is smaller than v then
		for each element, x, in the set u do
			remove x from u and add it v
			x.head ← v
	else
		for each element, x, in the set v do
			remove x from v and add it u
			x.head ← u
```

### 7.3 A Tree-Based Implementation . . . . . . . . . . . . . . . 228
```Cpp
Algorithm makeSet():
	for each singleton element, x do
		x.parent ← x
		x.size ← 1
```
```Cpp
Algorithm union(x, y):
	if x.size < y.size then
		x.parent ← y
		y.size ← y.size + x.size
	else
		y.parent ← x
		x.size ← x.size + y.size
```
```Cpp
Algorithm find(x):
	r ← x
	while r.parent 	= r do // find the root
		r ← r.parent
	z ← x
	while z.parent 	= z do // path compression
		w ← z
		z ← z.parent
		w.parent ← r
```


#### 7.3.1 Analyzing the Tree-Based Implementation
Ackermann function(阿克曼函数), 


### 7.4 Exercises . . . . . . . . . . . . . . . . . . . . . . . . . . . 236
Reinforcement, Creativity, Applications

### Chapter Notes



## Chapter 8 Merge-Sort and Quick-Sort
inverted file(倒排文件), lexicographic(字典序),


### 8.1 Merge-Sort
merge-sort(归并排序), 


#### 8.1.1 Divide-and-Conquer
divide-and-conquer(分而治之), 分成小块进行处理，最后再 merge 到一起。大事化小，小事化了。
```Cpp
Algorithm merge(S1, S2, S):
	Input: Two arrays, S1 and S2, of size n1 and n2, respectively, 
		   sorted in nondecreasing order, and an empty array, S, of size at least n1 + n2
	Output: S, containing the elements from S1 and S2 in sorted order
	
	i ← 1
	j ← 1
	while i ≤ n and j ≤ n do
		if S1[i] ≤ S2[j] then
			S[i + j − 1] ← S1[i]
			i ← i + 1
		else
			S[i + j − 1] ← S2[j]
			j ← j + 1
	while i ≤ n do
		S[i + j − 1] ← S1[i]
		i ← i + 1
	while j ≤ n do
		S[i + j − 1] ← S2[j]
		j ← j + 1
```

#### 8.1.2 Merge-Sort and Recurrence Equations



### 8.2 Quick-Sort
每次选择一个 pivot 把小于 pivot 的放到 L，大于 pivot 的放到 G，循环直到不可分。可以采用递归或者迭代法。


#### 8.2.1 Randomized Quick-Sort
增加随机选择 pivot 保证每次分配到 L 集合的合 G 集合的几乎均等，保证算法运行时间为 O(n log n).


#### 8.2.2 In-Place Quick-Sort
使用本身的存储空间进行排序。
```Cpp
Algorithm inPlacePartition(S, a, b):
	Input: An array, S, of distinct elements; integers a and b such that a ≤ b
	Output: An integer, l, such that the subarray S[a .. b] is partitioned into S[a..l−1] and S[l..b] 
			so that every element in S[a..l−1] is less than each element in S[l..b] 
			
	Let r be a random integer in the range [a, b]
	Swap S[r] and S[b]
	p ← S[b] // the pivot
	l ← a // l will scan rightward
	r ← b − 1 // r will scan leftward
	while l ≤ r do // find an element larger than the pivot
		while l ≤ r and S[l] ≤ p do
			l ← l + 1
		while r ≥ l and S[r] ≥ p do // find an element smaller than the pivot
			r ← r − 1
		if l < r then
			Swap S[l] and S[r]
	Swap S[l] and S[b] // put the pivot into its final place
	return l
```
```Cpp
Algorithm inPlaceQuickSort(S, a, b):
	Input: An array, S, of distinct elements; integers a and b
	Output: The subarray S[a .. b] arranged in nondecreasing order
	
	if a ≥ b then return // subrange with 0 or 1 elements
	l ←inPlacePartition(S, a, b)
	inPlaceQuickSort(S, a, l − 1)
	inPlaceQuickSort(S, l + 1, b)
```

```Cpp
Algorithm CorrectInPlaceQuickSort(S, a, b):
	Input: An array, S, of distinct elements; integers a and b
	Output: The subarray S[a .. b] arranged in nondecreasing order

	while a < b do
		l ←inPlacePartition(S, a, b) // from Algorithm 8.9
		if l − a < b − l then // first subarray is smaller
			CorrectInPlaceQuickSort(S, a, l − 1)
			a ← l + 1
		else
			CorrectInPlaceQuickSort(S, l + 1, b)
			b ← l − 1
```


### 8.3 A Lower Bound on Comparison-Based Sorting


### 8.4 Exercises . . . . . . . . . . . . . . . . . . . . . . . . . . . 259
Reinforcement, Creativity, Applications

### Chapter Notes


## Chapter 9 Fast Sorting and Selection

### 9.1 Bucket-Sort and Radix-Sort . . . . . . . . . . . . . . . . 267


#### 9.1.1 Bucket-Sort
```Cpp
Algorithm bucketSort(S):
	Input: Sequence S of items with integer keys in the range [0,N − 1]
	Output: Sequence S sorted in nondecreasing order of the keys
	
	let B be an array of N lists, each of which is initially empty
	for each item x in S do
		let k be the key of x
		remove x from S and insert it at the end of bucket (list) B[k]
	for i ← 0 to N − 1 do
		for each item x in list B[i] do
			remove x from B[i] and insert it at the end of S
```

#### 9.1.2 Radix-Sort
The radix-sort algorithm sorts a sequence of pairs such as S, by applying a stable bucket-sort on the sequence twice


### 9.2 Selection . . . . . . . . . . . . . . . . . . . . . . . . . . . 270
Queries that ask for an element with a given rank are called order statistics(次序统计).
Prune-and-Search(剪枝和搜索)


#### 9.2.1 Randomized Quick-Select
```Cpp
Algorithm quickSelect(S, k):
	Input: Sequence S of n comparable elements, and an integer k ∈ [1, n]
	Output: The kth smallest element of S
	
	if n = 1 then
		return the (first) element of S
	pick a random element x of S
	remove all the elements from S and put them into three sequences:
		• L, storing the elements in S less than x
		• E, storing the elements in S equal to x
		• G, storing the elements in S greater than x.
	if k ≤ |L| then
		quickSelect(L, k)
	else if k ≤ |L| + |E| then
		return x // each element in E is equal to x
	else
		quickSelect(G, k − |L| − |E|)
```

#### 9.2.2 Deterministic Selection
```Cpp
Algorithm DeterministicSelect(S, k):
	Input: Sequence S of n comparable elements, and an integer k ∈ [1, n]
	Output: The kth smallest element of S
	
	if n = 1 then
		return the (first) element of S
	Divide S into g = n/5 groups, S1, . . . , Sg, such that each of groups
	S1, . . . , Sg−1 has 5 elements and group Sg has at most 5 elements.
	for i ← 1 to g do
		Find the baby median, xi, in Si (using any method)
	x ← DeterministicSelect({x1, . . . , xg}, g/2)
	remove all the elements from S and put them into three sequences:
		• L, storing the elements in S less than x
		• E, storing the elements in S equal to x
		• G, storing the elements in S greater than x.
	if k ≤ |L| then
		DeterministicSelect(L, k)
	else if k ≤ |L| + |E| then
		return x // each element in E is equal to x
	else
		DeterministicSelect(G, k − |L| − |E|)
```


### 9.3 Weighted Medians . . . . . . . . . . . . . . . . . . . . . 276
```Cpp
Algorithm SortedMedian(X):
	Input: A set, X, of distinct elements, with each xi in X having a positive weight, wi
	Output: The weighted median for X
	
	Let W be the sum of all the weights of the elements in X
	Let the sequence (x1, x2, . . . , xn) be the result of sorting X
	w ← 0
	for i ← 1 to n do
		w ← w + wi
		if w >W/2 then
			return xi
```
```Cpp
Algorithm PruneMedian(X,W):
	Input: A set, X, of distinct elements, {x1, . . . , xn}, with each xi in X having a positive weight, wi; and a weight, W
	Output: The element, y, in X, such that the total weight of the elements in X less than y is at most W and 
	        the total weight of the elements in X less than or equal to y is greater than or equal to W
			
	if n = 1 then
		return x1
	Let y ← DeterministicSelect(X, n/2)
	Let w1 ← 
	xi<y wi
	Let w2 ← 
	xi≤y wi
	if w1 >W then // y is too large
		Let X be the set of elements in X that are less than y
		Call PruneMedian(X,W)
	else if w2 <W then // y is too small
		Let X be the set of elements in X greater than y
		Let W be the sum of the weights of the elements in X − X
		Call PruneMedian(X,W −W)
	else
		return y

```

### 9.4 Exercises . . . . . . . . . . . . . . . . . . . . . . . . . . . 279
Reinforcement, Creativity, Applications


### Chapter Notes


## Chapter 10 The Greedy Method
multi-lot(多路), greedy method(贪心), knapsack(背包), fractional knapsack(部分背包)

The greedy method is applied to optimization problems—that is, problems that involve
searching through a set of configurations to find one that minimizes or maximizes
an objective function defined on these configurations


### 10.1 The Fractional Knapsack Problem . . . . . . . . . . . . 286
```Cpp
Algorithm FractionalKnapsack(S,W):
	Input: Set S of items, such that each item i ∈ S has a positive benefit bi and a
		   positive weight wi; positive maximum total weight W
	Output: Amount xi of each item i ∈ S that maximizes the total benefit while
			not exceeding the maximum total weight W
			
	for each item i ∈ S do
		xi ← 0
		vi ← bi/wi // value index of item i
	w ← 0 // total weight
	while w < W and S != null do
		remove from S an item i with highest value index // greedy choice
		a ← min{wi, W − w} // more than W − w causes a weight overflow
		xi ← a
		w ← w + a
```


### 10.2 Task Scheduling. . . . . . . . . . . . . . . . . . . . . . . 289
```Cpp
Algorithm TaskSchedule(T):
	Input: A set T of tasks, such that each task has a start time si and a finish time fi
	Output: A nonconflicting schedule of the tasks in T using a minimum number of machines
	
	m ← 0 // optimal number of machines
	while T != null do
		remove from T the task i with smallest start time si
		if there is a machine j with no task conflicting with task i then
			schedule task i on machine j // 然后对结束时间进行排序不是更好
		else
			m ← m + 1 // add a new machine
			schedule task i on machine m
```

### 10.3 Text Compression and Huffman Coding . . . . . . . . . 292
```Cpp
Algorithm Huffman(C):
	Input: A set, C, of d characters, each with a given weight, f(c)
	Output: A coding tree, T, for C, with minimum total path weight
	
	Initialize a priority queue Q.
	for each character c in C do
		Create a single-node binary tree T storing c.
		Insert T into Q with key f(c).
	while Q.size() > 1 do
		f1 ← Q.minKey()
		T1 ← Q.removeMin()
		f2 ← Q.minKey()
		T2 ← Q.removeMin()
		Create a new binary tree T with left subtree T1 and right subtree T2.
		Insert T into Q with key f1 + f2.
	return tree Q.removeMin()
```


### 10.4 Exercises . . . . . . . . . . . . . . . . . . . . . . . . . . . 298
Reinforcement, Creativity, Applications


### Chapter Notes


## Chapter 11 Divide-and-Conquer

11.1 Recurrences and the Master Theorem. . . . . . . . . . 305
11.2 Integer Multiplication . . . . . . . . . . . . . . . . . . . . 313
11.3 Matrix Multiplication . . . . . . . . . . . . . . . . . . . . 315
11.4 The Maxima-SetProblem . . . . . . . . . . . . . . . . . 317
11.5 Exercises . . . . . . . . . . . . . . . . . . . . . . . . . . . 319