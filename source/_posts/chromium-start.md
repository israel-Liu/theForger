---
title: chromium-learning
date: 2018-07-02 19:24:39
tags:
---

## [Learning your way around the code](https://www.chromium.org/developers/learning-your-way-around-the-code)
建议的学习步骤。


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



### [How to Add New Features](https://www.chromium.org/developers/design-documents/multi-process-architecture/how-to-add-new-features)
为了不膨胀原有代码添加新功能在各处，需要自己实现对应接口。当初在B站要是可以做到这些，应该会不太一样吧。虽然现在也不能。后面尝试一些。


### [Content API](https://www.chromium.org/developers/content-module/content-api)
DEPS rules would prevent chrome from reaching to the implementation files ??? 那我上面岂不是说反了，后续看代码确认，那些是底层那些是顶层。大概就是写代码的规则吧。



### [Process Models](https://www.chromium.org/developers/design-documents/process-models)
讲 chrome 依据站点或者tab页创建各种进程的方式，一共有4中，每种都有自己的优缺点，通过命令行设置使用哪一种。早上不是很清醒需要再看。


### [Site Isolation Design Document](https://www.chromium.org/developers/design-documents/site-isolation)
承接上一节，后面再看，目前继续往下。


### [Threading and Tasks in Chrome](https://chromium.googlesource.com/chromium/src/+/master/docs/threading_and_tasks.md)


### [Getting Around the Chromium Source Code Directory Structure](https://www.chromium.org/developers/how-tos/getting-around-the-chrome-source-code)


### [Sandbox](https://chromium.googlesource.com/chromium/src/+/master/docs/design/sandbox.md)

### [Net stack](https://chromium.googlesource.com/chromium/src/+/master/net/docs/life-of-a-url-request.md#life-of-a-urlrequest)
网络栈实现，具体怎么发送请求。处理请求。

### [Network-stack](https://www.chromium.org/developers/design-documents/network-stack)
老版本网络栈代码描述