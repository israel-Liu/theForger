---
title: Standard for Programming Language C++ (n4727)
date: 2017-11-16 15:27:29
tags: n4800
---
1. [reading_note_one](https://israel-liu.github.io/2016/12/01/reading-note-one/#more)
2. [Declarations](http://en.cppreference.com/w/cpp/language/declarations)
3. [Storage class specifiers](http://en.cppreference.com/w/cpp/language/storage_duration)
4. [Unnamed namespaces in a translation unit have the same identifier this identifier differs from all other identifiers in the translation unit. In addition, all names declared in unnamed namespace or a namespace within an unnamed namespace, even ones explicitly declared extern, have internal linkage.](http://en.cppreference.com/w/cpp/language/namespace)
6. [Input/output library](http://en.cppreference.com/w/cpp/io) std::basic_streambuf store data std::basic_ios operator.(write log class)
7. [Strings library](http://en.cppreference.com/w/cpp/string) Null-terminated strings is string array, std::char_traits provide charT operator.

# 1 Scope 1
# 2 Normative references 2
# 3 Terms and definitions 3
# 4 General principles 6
4.1 Implementation compliance . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 6
4.2 Structure of this document . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 7
4.3 Syntax notation . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 7
4.4 Acknowledgments . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 8
# 5 Lexical conventions 9
5.1 Separate translation . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 9
5.2 Phases of translation . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 9
5.3 Character sets . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 10
5.4 Preprocessing tokens . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 11
5.5 Alternative tokens . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 12
5.6 Tokens . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 12
5.7 Comments . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 12
5.8 Header names . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 12
5.9 Preprocessing numbers . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 13
5.10 Identifiers . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 13
5.11 Keywords . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 14
5.12 Operators and punctuators . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 14
5.13 Literals . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 15
# 6 Basics 24
6.1 Declarations and definitions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 24
6.2 One-definition rule . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 26
6.3 Scope . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 29
6.4 Name lookup . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 34
6.5 Program and linkage . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 46
6.6 Memory and objects . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 48
6.7 Types . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 61
6.8 Program execution . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 67
# 7 Expressions 79
7.1 Preamble . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 79
7.2 Properties of expressions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 80
7.3 Standard conversions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 83
7.4 Usual arithmetic conversions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 87
7.5 Primary expressions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 88
7.6 Compound expressions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 103
7.7 Constant expressions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 131
# 8 Statements 136
8.1 Labeled statement . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 136
8.2 Expression statement . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 137
8.3 Compound statement or block . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 137
8.4 Selection statements . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 137
8.5 Iteration statements . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 139
8.6 Jump statements . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 141
8.7 Declaration statement . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 143
8.8 Ambiguity resolution . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 143
# 9 Declarations 145
9.1 Specifiers . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 146
9.2 Declarators . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 162
9.3 Initializers . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 176
9.4 Function definitions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 191
9.5 Structured binding declarations . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 194

## 9.6 Enumeration declarations . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 195
The enumeration type declared with an enum-key of only enum is an unscoped enumeration, and its enumerators are unscoped enumerators.

## 9.7 Namespaces . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 197

9.8 The using declaration . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 204
9.9 The asm declaration . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 209
9.10 Linkage specifications . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 209
9.11 Attributes . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 212
# 10 Classes 222
10.1 Properties of classes . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 223
10.2 Class names . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 224
10.3 Class members . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 225
10.4 Unions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 247
10.5 Local class declarations . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 249
10.6 Derived classes . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 249
10.7 Member name lookup . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 258
10.8 Member access control . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 260
10.9 Initialization . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 269
10.10 Comparisons . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 280
10.11 Free store . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 281

### Classes
10.[plain old data](https://www.cppfans.org/1431.html) A POD struct109 is a non-union class that is both a trivial class and a standard-layout class, and has no   
non-static data members of type non-POD struct, non-POD union (or array of such types). Similarly, a POD   
union is a union that is both a trivial class and a standard-layout class, and has no non-static data members   
of type non-POD struct, non-POD union (or array of such types). A POD class is a class that is either a POD struct or a POD union.
```Cpp
[ Example:

struct N { // neither trivial nor standard-layout
	int i;
	int j;
	virtual ~N();
};

struct T { // trivial but not standard-layout
	int i;
	private:
	int j;
};

struct SL { // standard-layout but not trivial
	int i;
	int j;
	~SL();
};

struct POD { // both trivial and standard-layout
	int i;
	int j;
};

—end example ]
```

# 11 Overloading 284
11.1 Overloadable declarations . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 284
11.2 Declaration matching . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 286
11.3 Overload resolution . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 287
11.4 Address of overloaded function . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 306
11.5 Overloaded operators . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 308
11.6 Built-in operators . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 311
# 12 Templates 315
12.1 Template parameters . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 317
12.2 Names of template specializations . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 320
12.3 Template arguments . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 322
12.4 Template constraints . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 328
12.5 Type equivalence . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 331
12.6 Template declarations . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 332
12.7 Name resolution . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 350
12.8 Template instantiation and specialization . . . . . . . . . . . . . . . . . . . . . . . . . . . 364
12.9 Function template specializations . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 376
12.10 Deduction guides . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 395
# 13 Exception handling 396
13.1 Throwing an exception . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 397
13.2 Constructors and destructors . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 398
13.3 Handling an exception . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 399
13.4 Exception specifications . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 400
13.5 Special functions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 403
# 14 Preprocessing directives 405
14.1 Conditional inclusion . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 406
14.2 Source file inclusion . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 408
14.3 Macro replacement . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 409
14.4 Line control . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 415
14.5 Error directive . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 415
14.6 Pragma directive . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 415
14.7 Null directive . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 415
14.8 Predefined macro names . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 416
14.9 Pragma operator . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 418
# 15 Library introduction 419
15.1 General . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 419
15.2 The C standard library . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 420
15.3 Definitions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 420
15.4 Method of description . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 423
15.5 Library-wide requirements . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 429
# 16 Language support library 449
16.1 General . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 449
16.2 Common definitions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 449
16.3 Implementation properties . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 453
16.4 Integer types . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 463
16.5 Start and termination . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 464
16.6 Dynamic memory management . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 466
16.7 Type identification . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 473
16.8 Contract violation handling . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 475
16.9 Exception handling . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 475
16.10 Initializer lists . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 479
16.11 Comparisons . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 480
16.12 Other runtime support . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 488
# 17 Concepts library 491
17.1 General . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 491
17.2 Equality preservation . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 491
17.3 Header <concepts> synopsis . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 492
17.4 Language-related concepts . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 494
17.5 Comparison concepts . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 499
17.6 Object concepts . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 501
17.7 Callable concepts . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 501
# 18 Diagnostics library 503
18.1 General . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 503
18.2 Exception classes . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 503
18.3 Assertions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 506
18.4 Error numbers . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 507
18.5 System error support . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 508
# 19 General utilities library 518
19.1 General . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 518
19.2 Utility components . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 518
19.3 Compile-time integer sequences . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 522
19.4 Pairs . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 522
19.5 Tuples . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 527
19.6 Optional objects . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 536
19.7 Variants . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 549
19.8 Storage for any type . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 560
19.9 Bitsets . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 565
19.10 Memory . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 571

## 19.11 Smart pointers . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 592

### 19.11.1 Class template unique_ptr
u is said to own p, u 析构 p 析构 p 指向的资源释放。u不允许拷贝保证唯一性。

## 19.12 Memory resources . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 619
19.13 Class template scoped_allocator_adaptor . . . . . . . . . . . . . . . . . . . . . . . . . . 628
19.14 Function objects . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 631
19.15 Metaprogramming and type traits . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 656
19.16 Compile-time rational arithmetic . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 679
19.17 Class type_index . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 682
19.18 Execution policies . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 683
19.19 Primitive numeric conversions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 685
# 20 Strings library 688
20.1 General . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 688
20.2 Character traits . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 688
20.3 String classes . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 693
20.4 String view classes . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 720
20.5 Null-terminated sequence utilities . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 729
# 21 Containers library 734
21.1 General . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 734
21.2 Container requirements . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 734
21.3 Sequence containers . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 768
21.4 Associative containers . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 795
21.5 Unordered associative containers . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 813
21.6 Container adaptors . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 835
21.7 Views . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 843
# 22 Iterators library 849
22.1 General . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 849
22.2 Header <iterator> synopsis . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 849
22.3 Iterator requirements . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 855
22.4 Iterator primitives . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 874
22.5 Iterator adaptors . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 877
22.6 Stream iterators . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 899
22.7 Range access . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 905
# 23 Ranges library 907
23.1 General . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 907
23.2 Header <ranges> synopsis . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 907
23.3 Range access . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 910
23.4 Range requirements . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 913
23.5 Range utilities . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 916
23.6 Range factories . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 921
23.7 Range adaptors . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 928
# 24 Algorithms library 956
24.1 General . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 956
24.2 Algorithms requirements . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 956
24.3 Parallel algorithms . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 958
24.4 Header <algorithm> synopsis . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 960
24.5 Non-modifying sequence operations . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 995
24.6 Mutating sequence operations . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1007
24.7 Sorting and related operations . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1024
24.8 Header <numeric> synopsis . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1051
24.9 Generalized numeric operations . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1055
24.10 C library algorithms . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1063
# 25 Numerics library 1064
25.1 General . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1064
25.2 Numeric type requirements . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1064
25.3 The floating-point environment . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1065
25.4 Complex numbers . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1066
25.5 Bit manipulation . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1074
25.6 Random number generation . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1075
25.7 Numeric arrays . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1112
25.8 Mathematical functions for floating-point types . . . . . . . . . . . . . . . . . . . . . . . . 1131
# 26 Time library 1146
26.1 General . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1146
26.2 Header <chrono> synopsis . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1146
26.3 Cpp17Clock requirements . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1161
26.4 Time-related traits . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1162
26.5 Class template duration . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1163
26.6 Class template time_point . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1170
26.7 Clocks . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1173
26.8 The civil calendar . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1185
26.9 Class template time_of_day . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1214
26.10 Time zones . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1219
26.11 Formatting . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1232
26.12 Parsing . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1235
26.13 Header <ctime> synopsis . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1238
# 27 Localization library 1240
27.1 General . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1240
27.2 Header <locale> synopsis . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1240
27.3 Locales . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1241
27.4 Standard locale categories . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1248
27.5 C library locales . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1278
# 28 Input/output library 1280
28.1 General . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1280
28.2 Iostreams requirements . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1280
28.3 Forward declarations . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1281
28.4 Standard iostream objects . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1283
28.5 Iostreams base classes . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1284
28.6 Stream buffers . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1300
28.7 Formatting and manipulators . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1308
28.8 String-based streams . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1331
28.9 File-based streams . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1340
28.10 Synchronized output streams . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1353
28.11 File systems . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1358
28.12 C library files . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1403
# 29 Regular expressions library 1407
29.1 General . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1407
29.2 Definitions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1407
29.3 Requirements . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1408
29.4 Header <regex> synopsis . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1409
29.5 Namespace std::regex_constants . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1415
29.6 Class regex_error . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1418
29.7 Class template regex_traits . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1418
29.8 Class template basic_regex . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1420
29.9 Class template sub_match . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1425
29.10 Class template match_results . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1429
29.11 Regular expression algorithms . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1434
29.12 Regular expression iterators . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1438
29.13 Modified ECMAScript regular expression grammar . . . . . . . . . . . . . . . . . . . . . . 1443
# 30 Atomic operations library 1446
30.1 General . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1446
30.2 Header <atomic> synopsis . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1446
30.3 Type aliases . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1450
30.4 Order and consistency . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1450
30.5 Lock-free property . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1451
30.6 Class template atomic_ref . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1452
30.7 Class template atomic . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1457
30.8 Non-member functions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1466
30.9 Flag type and operations . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1466
30.10 Fences . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1467
# 31 Thread support library 1469
31.1 General . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1469
31.2 Requirements . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1469
31.3 Threads . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1471
31.4 Mutual exclusion . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1476
31.5 Condition variables . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1494
31.6 Futures . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1500