---
title: Algorithm Design and Applications
date: 2018-09-19 14:21:18
tags:
---
### [CS:3330 (22C:031) Algorithms, Spring 2018](http://homepage.divms.uiowa.edu/~hzhang/c31/)
### Tree

#### Depth
Let v be a node of a tree T. The depth of v is the number of ancestors of v,    
excluding v itself. Note that this definition implies that the depth of the root of T    
is 0. The depth of a node v can also be recursively defined as follows:    
• If v is the root, then the depth of v is 0.
• Otherwise, the depth of v is one plus the depth of the parent of v.    
```CPP
Algorithm depth(T, v):
if T.isRoot(v) then
return 0
else
return 1 + depth(T, T.parent(v))
```

#### 
using the following recursive definition of the height of a node v in a tree T:     
• If v is an external node, then the height of v is 0.    
• Otherwise, the height of v is one plus the maximum height of a child of v.  
The height of a tree T is the height of the root of T.      
```CPP
Algorithm height(T, v):
if T.isExternal(v) then
return 0
else
h = 0
for each w ∈ T.children(v) do
h = max(h, height(T,w))
return 1 + h
```

#### Preorder Traversal

#### Postorder Traversal