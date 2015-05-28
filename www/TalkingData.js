/*  
    Javascript interface of Cordova plugin for TalkingData Analytics SDK 
*/

var TalkingData = {

    // 初始化 TalkingData Analytics SDK
    // appKey    : TalkingData appid, https://www.talkingdata.com/app/document_web/index.jsp?statistics
    // channelId : 渠道号
    init:function(appKey, channelId) {
        cordova.exec(null, null, "TalkingData", "sessionStarted", [appKey, channelId]);
    },

    // 触发自定义事件
    // eventId   : 自定义事件的 eventId
    trackEvent:function(eventId) {
        cordova.exec(null, null, "TalkingData", "trackEvent", [eventId]);
    },

    // 触发自定义事件
    // eventId:    自定义事件的 eventId
    // eventLabel: 自定义事件的事件标签
    trackEventWithLabel:function(eventId, eventLabel) {
        cordova.exec(null, null, "TalkingData", "trackEventWithLabel", [eventId, eventLabel]);
    },

    // 触发自定义事件
    // eventId:    自定义事件的 eventId
    // eventLabel: 自定义事件的事件标签
    // eventData : 自定义事件的数据，Json 对象格式
    trackEventWithParameters:function(eventId, eventLabel, eventData) {
        var eventDataJson = JSON.stringify(eventData);
        cordova.exec(null, null, "TalkingData", "trackEventWithParameters", [eventId, eventLabel, eventDataJson]);
    },

    // 触发页面事件，在页面加载完毕的时候调用，记录页面名称和使用时长，一个页面调用这个接口后就不用再调用 trackPageBegin 和 trackPageEnd 接口了
    // pageName  : 页面自定义名称
    trackPage:function(pageName) {
        cordova.exec(null, null, "TalkingData", "trackPage", [pageName]);
    },

    // 触发页面事件，在页面加载完毕的时候调用，记录页面名称和使用时长，和 trackPageEnd 配合使用。
    // pageName  : 页面自定义名称
    trackPageBegin:function(pageName) {
        cordova.exec(null, null, "TalkingData", "trackPageBegin", [pageName]);
    },

    // 触发页面事件，在页面加载完毕的时候调用，记录页面名称和使用时长，和 trackPageBegin 配合使用。
    // pageName  : 页面自定义名称
    trackPageEnd:function(pageName) {
        cordova.exec(null, null, "TalkingData", "trackPageEnd", [pageName]);
    },

    // 设置位置经纬度
    // latitude  : 纬度
    // longitude : 经度
    setLocation:function(latitude, longitude) {
        cordova.exec(null, null, "TalkingData", "setLocation", [latitude, longitude]);
    },

    // 获取 TalkingData Device Id
    // callBack  : 处理 deviceId 的回调函数
    getDeviceId:function(callBack) {
        cordova.exec(callBack, null, "TalkingData", "getDeviceId", []);
    },

    // 设置是否记录并上报程序异常信息
    // enabled   : true or false
    setExceptionReportEnabled:function(enabled) {
        cordova.exec(null, null, "TalkingData", "setExceptionReportEnabled", [enabled]);
    },

    // 设置是否记录并上传 iOS 平台的 signal
    // enabled   : true or false
    setSignalReportEnabled:function(enabled) {
        cordova.exec(null, null, "TalkingData", "setSignalReportEnabled", [enabled]);
    },

    // 设置是否在控制台（iOS）/LogCat（Android）中打印运行时日志
    // enabled   : true or false
    setLogEnabled:function(enabled) {
        cordova.exec(null, null, "TalkingData", "setLogEnabled", [enabled]);
    }
};

module.exports = TalkingData; 
