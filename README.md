## Cordova Plugin for TalkingData Analytics SDK 集成文档  

Cordova Plugin for TalkingData Analytics SDK 适用于 __Cordova__ 和 __PhoneGap__ 跨平台项目。

### 集成方式

1. 下载项目到本地目录：

	git clone https://github.com/TalkingData/TalkingData-Analytics-SDK-Cordova-Plugin.git

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

### Demo

下面的 Demo 中演示了不同平台上的集成方式，包括 Demo 的创建过程：

- [TalkingData/TalkingData-SDK-Cordova-iOS-Demo](https://github.com/TalkingData/TalkingData-SDK-Cordova-iOS-Demo)
- [TalkingData-SDK-PhoneGap-Android-Demo](https://github.com/TalkingData/TalkingData-SDK-PhoneGap-Android-Demo)
- [TalkingData/TalkingData-SDK-Cordova-Android-Demo](https://github.com/TalkingData/TalkingData-SDK-Cordova-Android-Demo)



