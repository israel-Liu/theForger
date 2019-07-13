---
title: Standard for Programming Language C++ (n4727)
date: 2017-11-16 15:27:29
tags:
---
1. [reading_note_one](https://israel-liu.github.io/2016/12/01/reading-note-one/#more)
2. [Declarations](http://en.cppreference.com/w/cpp/language/declarations)
3. [Storage class specifiers](http://en.cppreference.com/w/cpp/language/storage_duration)
4. [Unnamed namespaces in a translation unit have the same identifier this identifier differs from all other identifiers in the translation unit. In addition, all names declared in unnamed namespace or a namespace within an unnamed namespace, even ones explicitly declared extern, have internal linkage.](http://en.cppreference.com/w/cpp/language/namespace)
6. [Input/output library](http://en.cppreference.com/w/cpp/io) std::basic_streambuf store data std::basic_ios operator.(write log class)
7. [Strings library](http://en.cppreference.com/w/cpp/string) Null-terminated strings is string array, std::char_traits provide charT operator.

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


## 17 Templates

