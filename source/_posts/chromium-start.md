---
title: chromium-learning
date: 2018-07-02 19:24:39
tags:
---

### [developers](https://www.chromium.org/developers)
全部开发文档，有点老。


### [Chromium docs](https://chromium.googlesource.com/chromium/src/+/master/docs/README.md)
较新的文档。

### [Code Browsing in Chromium](https://www.chromium.org/developers/code-browsing-in-chromium)
一些浏览代码的工具，我选择visual studio 。


### [Learning your way around the code](https://www.chromium.org/developers/learning-your-way-around-the-code)
建议的学习步骤。


### [Content API](https://www.chromium.org/developers/content-module/content-api)
将Chrome开发人员与Content的内部工作隔离开来.


### [Chrome C++ Lock and ConditionVariable](https://www.chromium.org/developers/lock-and-condition-variable)
锁相关，chromium 里面通过PostTask异步很少用锁，需要使用来这里看看。


### [Design Documents](https://www.chromium.org/developers/design-documents)


### [servicification](https://www.chromium.org/servicification)
把各个部分拆分成服务的形式，通过 Mojo 交互。


### [Service Development Guidelines](https://chromium.googlesource.com/chromium/src/+/master/services)


### [The Service Manager & Services](https://chromium.googlesource.com/chromium/src/+/master/services/service_manager/README.md)


### [Network Service in Chrome](https://docs.google.com/document/d/1wAHLw9h7gGuqJNCgG1mP1BmLtCGfZ2pys-PdZQ1vg7M/edit#)


### [Mojo](https://chromium.googlesource.com/chromium/src/+/master/mojo/README.md)
交互接口。


### [Multi-process Architecture](https://www.chromium.org/developers/design-documents/multi-process-architecture)
chromium 分为浏览器主进程和多个渲染进程，他们直接通过ipc通信，主进程中存在和渲染进程对应的类对象。他们之间进行对应通信。


### [Inter-process Communication (IPC)](https://www.chromium.org/developers/design-documents/inter-process-communication)
通过 IPC::Channel 进行通信，通过使用 IPC::ChannelProxy 可以把一些资源请求筛选掉，放到 io 线程处理


### [How Chromium Displays Web Pages](https://www.chromium.org/developers/design-documents/displaying-a-web-page-in-chrome)
The WebKit glue 作为 chromium 使用 webkit 的一层接口，这样可以剥离对 webkit 的直接使用，这才是使用第三方库的正确姿势。
渲染和排版都弄好了那边传到 WebContents 然后又给chrome浏览器的都是需要做什么平台相关的事情，还是说真正的渲染？那前面渲染进程中都做啥了除了排版。
Life of a "set cursor" message 和 Life of a "mouse click" message 两个例子需要再好好理解一下，明确每个部分倒底做了什么事情。


### [Multi-process Resource Loading](https://www.chromium.org/developers/design-documents/multi-process-resource-loading)
Blink(ResourceLoader::WebURLLoader, ResourceLoader:WebURLLoaderClient(Renderer_Callback))<--->
Renderer(WebURLLoader::WebURLLoaderImpl, ResourceDispatcher(发送), RequestPeer(接受))<--->
Browser(RenderProcessHost(接受renderer，ipc请求)——> 发送到 ResourceDispatcherHost转换为URLRequest对象，发送到具体的URLRequestJob处理)然后返回请求响应。
等下写那个 web source load 转换的时候参考一下。


### [Content module](https://www.chromium.org/developers/content-module)
核心 render a page 功能被单独放到 src/content 作为一层， chrome等应用可以直接使用，通过 content api 也可以反过来调用chrome函数。


### [Layered Components: Design](https://www.chromium.org/developers/design-documents/layered-components-design)
分成设计，主要为了ios上可用。


### [How to Add New Features](https://www.chromium.org/developers/design-documents/multi-process-architecture/how-to-add-new-features)
为了不膨胀原有代码添加新功能在各处，需要自己实现对应接口。当初在B站要是可以做到这些，应该会不太一样吧。虽然现在也不能。后面尝试一些。


### [Content API](https://www.chromium.org/developers/content-module/content-api)
DEPS rules would prevent chrome from reaching to the implementation files ??? 那我上面岂不是说反了，后续看代码确认，那些是底层那些是顶层。大概就是写代码的规则吧。



### [Process Models](https://www.chromium.org/developers/design-documents/process-models)
讲 chrome 依据站点或者tab页创建各种进程的方式，一共有4中，每种都有自己的优缺点，通过命令行设置使用哪一种。早上不是很清醒需要再看。


### [Site Isolation Design Document](https://www.chromium.org/developers/design-documents/site-isolation)
承接上一节，后面再看，目前继续往下。


### [Threading and Tasks in Chrome](https://chromium.googlesource.com/chromium/src/+/master/docs/threading_and_tasks.md)
Task 要执行的任务，通过提过几种runner可以让任务并行多个thread上运行，或者串行多个或者单个thread上运行。
If one thread updates it based on expensive computation or through disk access, then that slow work should be done without holding the lock. 
Only when the result is available should the lock be used to swap in the new data. 
To post a task to the current thread, use base::ThreadTaskRunnerHandle，post到任意线程 base::SequencedTaskRunnerHandle::Get()。
base::TaskTraits encapsulate information about a task that helps the thread pool make better scheduling decisions.


### [Threading and Tasks in Chrome - FAQ](https://chromium.googlesource.com/chromium/src/+/master/docs/threading_and_tasks_faq.md)


### [Chrome C++ Lock and ConditionVariable](https://www.chromium.org/developers/lock-and-condition-variable)


### [Getting Around the Chromium Source Code Directory Structure](https://www.chromium.org/developers/how-tos/getting-around-the-chrome-source-code)
[Chromium-Source-Code-Directory-Structure](https://israel-liu.github.io/2018/06/12/Chromium-Source-Code-Directory-Structure/)
目录结构。Application startup, Tab startup & initial navigation, Navigating from the URL bar, Navigations and session history


### [Important Abstractions and Data Structures](https://www.chromium.org/developers/coding-style/important-abstractions-and-data-structures)
其实就是一些重要轮子，这里没有全部列出，自己也要撸这些轮子才行。
TaskRunner & SequencedTaskRunner & SingleThreadTaskRunner, MessageLoop & MessageLoopProxy & BrowserThread & RunLoop
base::SequencedWorkerPool & base::WorkerPool, base::Callback and base::Bind(), Singleton & base::LazyInstance


### [Smart Pointer Guidelines](https://www.chromium.org/developers/smart-pointer-guidelines)
就是把指针用对象包装起来，提供指针访问操作符。利用生命周期自动析构。RAII - Resource Acquisition Is Initialization.


### [Chromium String usage](https://www.chromium.org/developers/chromium-string-usage)
In the frontend, we use std::string/char for UTF-8 and string16/char16 for UTF-16 on all platforms. 
临时字符串对象拷贝，Each copy makes a call to malloc, which needs a lock, and slows things down. 


### [How Blink works](https://docs.google.com/document/d/1aitSOucL0VHZa9Z2vbRJSyAIsAz24kX8LFByQ5xQnUg/edit#heading=h.v5plba74lfde)


### [Sandbox](https://chromium.googlesource.com/chromium/src/+/master/docs/design/sandbox.md)


### [Net stack](https://chromium.googlesource.com/chromium/src/+/master/net/docs/life-of-a-url-request.md#life-of-a-urlrequest)
网络栈实现，具体怎么发送请求。处理请求。

### [Network-stack](https://www.chromium.org/developers/design-documents/network-stack)
老版本网络栈代码描述