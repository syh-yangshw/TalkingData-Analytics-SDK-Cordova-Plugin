module.exports = function(context) {
  //console.info('============================================:'+JSON.stringify(context));
	var fs = context.requireCordovaModule('fs'),
		path = context.requireCordovaModule('path');
  var platformRoot = path.join(context.opts.projectRoot, 'platforms/ios');
  var ConfigParser = null;
  try {
      //在cordova的nodemodules里面获取对象
      ConfigParser = context.requireCordovaModule('cordova-common').ConfigParser;
  } catch(e) {
      // fallback
      ConfigParser = context.requireCordovaModule('cordova-lib/src/configparser/ConfigParser');
  }
  var config = new ConfigParser(path.join(context.opts.projectRoot, "config.xml"));
  //获取应用名称
  var newProjectName = config.name();
  //获取APP_KEY
  var cmdLine = context.cmdLine;
  var appKey = cmdLine.match(/APP_KEY=([a-zA-Z0-9]+)/)&&cmdLine.match(/APP_KEY=([a-zA-Z0-9]+)/)[1];
  var appName = cmdLine.match(/APP_NAME=([a-zA-Z0-9]+)/)&&cmdLine.match(/APP_NAME=([a-zA-Z0-9]+)/)[1];
  if(!appKey || !appName){
    var plugins = config.getPlugins();
    if(!plugins || plugins.length == 0){
      throw new Error('Unable to find TalkingData');
    }else{
      plugins = plugins.filter(function (plugin){
        if(plugin.name == 'TalkingData')
          return true;
        return false;
      });
      if(plugins && plugins.length >0){
        appKey = plugins[0].variables['APP_KEY'];
        appName = plugins[0].variables['APP_NAME'];
      }
      if(!appKey || !appName){
        throw new Error('Unable to find this APP_KEY OR APP_NAME');
      }
    }
  }
  //定位ios的class存放的地方
  var classPath = path.join(platformRoot,newProjectName,"Classes","AppDelegate.m");
  //console.info(classPath);
  if(fs.existsSync(classPath)) {
    var data = fs.readFileSync(classPath,'utf-8');
    var appPackage = '#import "AppDelegate.h"';
    data = data.replace(appPackage,appPackage+"\n"+'#import "TalkingData.h"');
    var replaceValue = 'self.viewController = [[MainViewController alloc] init];';
    var talkingDataString = "[TalkingData setSignalReportEnabled:YES];"+"\n"
                          + "[TalkingData setLogEnabled:YES];"+"\n"
                          + '[TalkingData sessionStarted:@"'+appKey+'" withChannelId:@"'+appName+'"];'+"\n";
    data = data.replace(replaceValue,talkingDataString+replaceValue);
    //console.info(data);
    fs.writeFileSync(classPath, data);
	}
}