---
title: Chromium_Source_Code_Directory_Structure
date: 2018-06-12 20:08:39
tags:
---
[Chromium Source Code Directory Structure](https://www.chromium.org/developers/how-tos/getting-around-the-chrome-source-code)

#### High-level overview
Chromium 主要由browser，renderer，Webkit三部分构成。浏览器是主进程represents所有的UI和。渲染器通常是per-tab sub-process由浏览器驱动。  
嵌入Webkit负责渲染和布局。

#### Quick introduction to the solution file
这里跳过，和我看到的工程目录不太一样，需要了解的可以看英文原版。

#### Top-level projects
 * android_webview: 这里是给Android用的，目前不介绍。
 * apps: Chrome打包应用程序。
 * ash:
 * base: 所有top-level project公用的基础库。希望自己可以学会造这样的轮子。
 * blink: In the renderer, Blink is the client.
 * build: 所有工程共享的build相关配置。
 * build_overrides:
 * buildtools: 工程编译工具。
 * cc: 用于打印排版？(The Chromium compositor implementation.)
 * chrome: 浏览器， chrome/test/data: 运行某些测试的数据文件。
 * chrome_elf:
 * chromecast: [the Chrome feature system](https://chromium.googlesource.com/chromium/src/+/master/base/feature_list.h).
 * chromeos:
 * cloud_print:
 * components: 顶层模块依赖的组件。
 * content: 多进程沙箱浏览器核心代码，[更多信息](https://www.chromium.org/developers/content-module)
 * courgette:
 * crypto:
 * dbus:
 * device: 硬件层跨平台APIs。
 * docs:
 * extensions:
 * gin:
 * google_apis:
 * google_update:
 * gpu:
 * headless:
 * infra:
 * ios:
 * ipc:
 * jingle:
 * mash:
 * media:
 * mojo:
 * native_client:
 * native_client_sdk:
 * net: 为Chromium开发的网络库，可单独用于webkit的简单test_shell测试。
 * out: 存放编译后生成的文件，可以在这里使用visual studio 2017打开all.sln查看整个工程。[生成解决方案查看这里](https://israel-liu.github.io/2018/06/12/Building-Chromium-for-Windows/)
 * pdf:
 * ppapi:
 * printing:
 * remoting:
 * rlz:
 * sandbox: 阻止通过修改系统入侵渲染器？(The sandbox project which tries to prevent a hacked renderer from modifying the system.)
 * services:
 * skia: 从 Android 项目拷贝过来的图形库。我们在 ui/gfx 里面做了封装。
 * sql: 对 sqlite 做的封装。
 * storage:
 * styleguide:
 * testing: 单元测试开源工程 GTest
 * third_party: 外部依赖库。一些 Chrome-specific 存放在 chrome/third_party。
 * tools:
 * ui: ui/gfx: 图形库。 ui/views: 简单 UI 开发框架提供渲染，布局和时间处理。一些 browser-specific 放在 chrome/browser/ui/views。
 * url: 标准化 URL 解析库？(Google's open source URL parsing and canonicalization library.)
 * v8: Javascript V8 引擎。
 * webrunner:

 ==== 上面是我使用的代码目录 ====
 * breakpad: 崩溃上报程序
 * webkit:

 ==== 这俩是文章开始连接上包含的内容 ====

 *** 理想目标是按照应用分配目录，应用相关的所有子目录放到一个应用目录下。(e.g. Chrome, Android WebView, Ash) ***

 #### 依赖关系图
 下级的模块不能直接包含更高级别模块的代码，必须通过嵌入的 APIs 进行交流。
 ![](https://github.com/israel-Liu/theForger/raw/master/images/dependencies_diagram.png)

 #### Quick reference for the directory tree under "content/"
 * app:
 * browser: The backend for the application which handles all I/O and communication with the child processes . This talks to the renderer to manage web pages.
 * child:
 * common: Files shared between the multiple processes (i.e. browser and renderer, renderer and plugin, etc...). This is the code specific to Chromium (and not applicable to being in base).
 * gpu: Code for the GPU process, which is used for 3D compositing and 3D APIs.
 * plugin: Code for running browser plugins in other processes.(只在文档列出)
 * ppapi_plugin: Code for the Pepper plugin process.
 * public:
 * renderer: Code for the subprocess in each tab. This embeds WebKit and talks to browser for I/O.
 * shell:
 * test:
 * utility: Code for running random operations in a sandboxed process.  The browser process uses it when it wants to run an operation on untrusted data.
 * worker: Code for running HTML5 Web Workers.(只在文档列出)
 * zygote:

 #### Quick reference for the directory tree under "chrome/"
 暂时不学习这块，先不列出。需要的时候补上。

 #### A personal learning plan

 #### Code paths for common operations

 #### 后续先进行轮子学习。
