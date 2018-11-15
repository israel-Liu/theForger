---
title: chromium_base_callback
date: 2018-06-21 19:01:33
tags:
---
# Callback<> and Bind()

[官方文档](https://chromium.googlesource.com/chromium/src/+/master/docs/callback.md)

## Introduction
模板类 `base::Callback<>` 是一个一般化的函数对象。
和 base/bind.h 中的函数 `base::Bind()` 一起提供一种线程安全的方式来执行应用程序的功能。

Partial application (or "currying") is the process of binding a subset of a
function's arguments to produce another function that takes fewer arguments.
This can be used to pass around a unit of delayed execution, much like lexical
closures are used in other languages. For example, it is used in Chromium code
to schedule tasks on different MessageLoops.

A callback with no unbound input parameters (`base::Callback<void()>`) is
called a `base::Closure`. Note that this is NOT the same as what other
languages refer to as a closure -- it does not retain a reference to its
enclosing environment.

## Implementation notes

### Where Is This Design From:

The design of `base::Callback` and `base::Bind` is heavily influenced by C++'s
`tr1::function` / `tr1::bind`, and by the "Google Callback" system used inside
Google.

### Customizing the behavior
暂时跳过

### How The Implementation Works:

There are three main components to the system:
  1) The `base::Callback<>` classes.
  2) The `base::Bind()` functions.
  3) The arguments wrappers (e.g., `base::Unretained()` and `base::ConstRef()`).

类 Callback 代表一个通用函数指针. 内部存储一个代表目标函数和参数状态的引用计数类。
The `base::Callback` constructor takes a
`base::BindStateBase*`, which is upcasted from a `base::BindState<>`. In the
context of the constructor, the static type of this `base::BindState<>` pointer
uniquely identifies the function it is representing, all its bound parameters,
and a `Run()` method that is capable of invoking the target.

`base::Bind()` creates the `base::BindState<>` that has the full static type,
and erases the target function type as well as the types of the bound
parameters. It does this by storing a pointer to the specific `Run()` function,
and upcasting the state of `base::BindState<>*` to a `base::BindStateBase*`.
This is safe as long as this `BindStateBase` pointer is only used with the
stored `Run()` pointer.

To `base::BindState<>` objects are created inside the `base::Bind()` functions.
These functions, along with a set of internal templates, are responsible for

 - Unwrapping the function signature into return type, and parameters
 - Determining the number of parameters that are bound
 - Creating the BindState storing the bound parameters
 - Performing compile-time asserts to avoid error-prone behavior
 - Returning an `Callback<>` with an arity matching the number of unbound
   parameters and that knows the correct refcounting semantics for the
   target object if we are binding a method.

The `base::Bind` functions do the above using
[type-inference](https://en.wikipedia.org/wiki/Type_inference) and
[variadic templates](https://en.wikipedia.org/wiki/Variadic_template).

By default `base::Bind()` will store copies of all bound parameters, and
attempt to refcount a target object if the function being bound is a class
method. These copies are created even if the function takes parameters as const
references. (Binding to non-const references is forbidden, see bind.h.)

To change this behavior, we introduce a set of argument wrappers (e.g.,
`base::Unretained()`, and `base::ConstRef()`).  These are simple container
templates that are passed by value, and wrap a pointer to argument.  See the
file-level comment in base/bind_helpers.h for more info.

These types are passed to the `Unwrap()` functions to modify the behavior of
`base::Bind()`.  The `Unwrap()` functions change behavior by doing partial
specialization based on whether or not a parameter is a wrapper type.

`base::ConstRef()` is similar to `tr1::cref`.  `base::Unretained()` is specific
to Chromium.

### Missing Functionality
今天实在是太困了，后续重新翻译。果然不能太放纵了。
