# Cordova Plugin for TalkingData Analytics SDK 集成文档  

<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
 
Created By: TalkingData SDK Team  
Last Modified Data: 2015-09-22



## 适用范围

Cordova Plugin for TalkingData Analytics SDK 适用于 __Cordova__ 和 __PhoneGap__ 跨平台项目。

## 集成方式

1. 下载项目到本地目录：

	git clone git@github.com:TalkingData/TalkingData-Analytics-SDK-Cordova-Plugin.git

2. 访问 [TalkingData 官网](https://www.talkingdata.com/) 下载最新版本的 Android 和 iOS 平台 Analytics SDK。Plugin 中的 SDK 可能不是最新版本，需要检查并使用刚刚下载的新版本，进入克隆到本地的 Plugin 目录：
	- Android 平台  
	使用最新版本 SDK 的 `jar` 包替换 Plugin 中的 `src\android\TalkingData.jar` 文件。


	- iOS 平台  
	使用最新版本 SDK 的 `.h` 头文件和 `.a` 静态库文件替换 Plugin 中 `src\ios` 文件夹下的同名文件。

	之后，参考 [Analytics SDK 集成文档](https://www.talkingdata.com/app/document_web/index.jsp?statistics) 配置工程。

3. 进入 Cordova 工程目录，执行下面的命令添加 Plugin

		cordova plugin add "[Plugin 路径]"

4. 访问 [TalkingData 官网](https://www.talkingdata.com/) 注册帐号并按照提示申请 `AppId`。
5. 使用申请到的 `AppId` 在 Cordova 工程的 Native 代码中集成 SDK 并初始化。
	- Android 平台  
	在继承自 `CordovaActivity` 类型的 JAVA 类文件，比如 `%Cordova工程目录%\platforms\android\src\com\talkingdata\demo\MainActivity.java` 中，找到 `onCreate` 方法，加入下面的初始化代码：

			TCAgent.LOG_ON = true;
	        TCAgent.init(this, "[Your AppId]", "[Your ChannelId]");
	        TCAgent.setReportUncaughtExceptions(true);

		`[Your AppId]` 就是刚刚申请的 AppId，`[Your ChannelId]` 是应用的渠道号。
	

	- iOS 平台  
	在 `%Cordova工程目录%\/platforms/ios/demo/Classes/AppDelegate.m` 文件中，找到方法 `(BOOL)application:(UIApplication*)application didFinishLaunchingWithOptions:(NSDictionary*)launchOptions`，添加下面的代码：

			[TalkingData setSignalReportEnabled:YES];
    		[TalkingData setLogEnabled:YES];
    		[TalkingData sessionStarted:@"[Your AppId]" withChannelId:@"[Your ChannelId]"];

		同样的，`[Your AppId]` 就是刚刚申请的 AppId，`[Your ChannelId]` 是应用的渠道号。

6. 编译工程：

		cordova build

## 接口说明

`TalkingData.js` 文件中定义了下面的接口：

	// 初始化 TalkingData Analytics SDK
    // appKey    : TalkingData appid, https://www.talkingdata.com/app/document_web/index.jsp?statistics
    // channelId : 渠道号
    init:function(appKey, channelId) {
        cordova.exec(null, null, "TalkingData", "init", [appKey, channelId]);
    },

    // 触发自定义事件
    // eventId   : 自定义事件的 eventId
    onEvent:function(eventId) {
        cordova.exec(null, null, "TalkingData", "onEvent", [eventId]);
    },

    // 触发自定义事件
    // eventId:    自定义事件的 eventId
    // eventLabel: 自定义事件的事件标签
    onEventWithLabel:function(eventId, eventLabel) {
        cordova.exec(null, null, "TalkingData", "onEventWithLabel", [eventId, eventLabel]);
    },

    // 触发自定义事件
    // eventId:    自定义事件的 eventId
    // eventLabel: 自定义事件的事件标签
    // eventData : 自定义事件的数据，Json 对象格式
    onEventWithExtraData:function(eventId, eventLabel, eventData) {
        var eventDataJson = JSON.stringify(eventData);
        cordova.exec(null, null, "TalkingData", "onEventWithExtraData", [eventId, eventLabel, eventDataJson]);
    },

    // 触发页面事件，在页面加载完毕的时候调用，记录页面名称和使用时长，一个页面调用这个接口后就不用再调用 onPageBegin 和 onPageEnd 接口了
    // pageName  : 页面自定义名称
    onPage:function(pageName) {
        cordova.exec(null, null, "TalkingData", "onPage", [pageName]);
    },

    // 触发页面事件，在页面加载完毕的时候调用，用于记录页面名称和使用时长，和 trackPageEnd 配合使用
    // pageName  : 页面自定义名称
    onPageBegin:function(pageName) {
        cordova.exec(null, null, "TalkingData", "onPageBegin", [pageName]);
    },

    // 触发页面事件，在页面加载完毕的时候调用，用于记录页面名称和使用时长，和 trackPageBegin 配合使用
    // pageName  : 页面自定义名称
    onPageEnd:function(pageName) {
        cordova.exec(null, null, "TalkingData", "onPageEnd", [pageName]);
    },

    // 设置位置经纬度
    // latitude  : 纬度
    // longitude : 经度
    setLocation:function(latitude, longitude) {
        cordova.exec(null, null, "TalkingData", "setLocation", [latitude, longitude]);
    },

    // 获取 TalkingData Device Id，并将其作为参数传入 JS 的回调函数
    // callBack  : 处理 deviceId 的回调函数
    getDeviceId:function(callBack) {
        cordova.exec(callBack, null, "TalkingData", "getDeviceId", []);
    },

    // 设置是否记录并上报程序异常信息
    // enabled   : true or false
    setExceptionReportEnability:function(enabled) {
        cordova.exec(null, null, "TalkingData", "setExceptionReportEnability", [enabled]);
    },

    // 设置是否记录并上传 iOS 平台的 signal
    // enabled   : true or false
    setSignalReportEnability:function(enabled) {
        cordova.exec(null, null, "TalkingData", "setSignalReportEnability", [enabled]);
    },

    // 设置是否在控制台（iOS）/LogCat（Android）中打印运行时日志
    // enabled   : true or false
    setLogEnability:function(enabled) {
        cordova.exec(null, null, "TalkingData", "setLogEnability", [enabled]);
    }

在项目的 JS 代码中调用时，可参考上面的接口说明和下面的调用方式进行：

获取 `deviceId`，其中 `displayDeviceId` 为回调函数：

	TalkingData.getDeviceId(displayDeviceId);

记录一个只包含 `id` 的自定义事件:

	TalkingData.onEvent('Event01');

记录一个包含 `id` 和 `label` 标签的自定义事件:

	TalkingData.onEventWithLabel('Event02', 'Label02');

记录一个包含 `id` 、`label` 标签和其他数据的自定义事件:

	onEventWithExtraData();

而 `onEventWithExtraData()` 函数的定义为：

	function onEventWithExtraData()
    {
        var eventData = new Object();
        eventData.name = "abcd";
        eventData.age = 28;
        TalkingData.onEventWithExtraData('Event03', 'Label03', eventData);
    }

记录某个页面的启动：

	TalkingData.onPageBegin('This is page name')

记录某个页面的消失：

	TalkingData.onPageEnd('This is the same name as in onPageBegin Api')

需要注意的是，`onPageBegin` 和 `onPageEnd` 应该成对调用，用来记录一个特定页面的活跃时间。更详细的文档和接口说明请参考：[Analytics SDK 集成文档](https://www.talkingdata.com/app/document_web/index.jsp?statistics)。

## Demo

下面的 Demo 中演示了不同平台上的集成方式，包括 Demo 的创建过程：

- [TalkingData/TalkingData-SDK-Cordova-iOS-Demo](https://github.com/TalkingData/TalkingData-SDK-Cordova-iOS-Demo)
- [TalkingData-SDK-PhoneGap-Android-Demo](https://github.com/TalkingData/TalkingData-SDK-PhoneGap-Android-Demo)
- [TalkingData/TalkingData-SDK-Cordova-Android-Demo](https://github.com/TalkingData/TalkingData-SDK-Cordova-Android-Demo)



