module.exports = function(context) {
  //console.info('============================================:'+JSON.stringify(context));
	var fs = context.requireCordovaModule('fs'),
		path = context.requireCordovaModule('path');
	var platformRoot = path.join(context.opts.projectRoot, 'platforms/android/src');
  //获取APP_KEY
  var cmdLine = context.cmdLine;
  var appKey = cmdLine.match(/APP_KEY=([a-zA-Z0-9]+)/)[1];
  //获取APP_NAME
  var appName = cmdLine.match(/APP_NAME=([a-zA-Z0-9]+)/)[1];
  //console.info(appKey);
  if(!appKey || !appName){
    throw new Error('Unable to find this APP_KEY OR APP_NAME');
  }
  //获取android包名列表
  var ConfigParser = null;
  try {
      ConfigParser = context.requireCordovaModule('cordova-common').ConfigParser;
  } catch(e) {
      // fallback
      ConfigParser = context.requireCordovaModule('cordova-lib/src/configparser/ConfigParser');
  }
  var config = new ConfigParser(path.join(context.opts.projectRoot, "config.xml"));
  var packageName = config.android_packageName() || config.packageName();
  var packagePath = packageName.replace(/\./g , "/");
  console.info(packagePath);
  //通过packagePath取得mainActivitu.java的位置
  var mainActivity = path.join(platformRoot,packagePath,'MainActivity.java');
  //console.info(mainActivity);
	if(fs.existsSync(mainActivity)) {
		fs.readFile(mainActivity, 'utf8', function(err, data) {
			if(err) {
				throw new Error('Unable to find mainActivity.java: ' + err);
			}
      //console.info(JSON.stringify(data));
      //定位到loadUrl(launchUrl);的位置,加入talkingData的代码
      var appPackage = "package "+packageName+";";
      data = data.replace(appPackage,appPackage+"\n"+"import com.tendcloud.tenddata.TCAgent;");

      var replaceValue = "loadUrl(launchUrl);"+"\n";
      var talkingDataString = "TCAgent.LOG_ON = true;"+"\n"
                            + 'TCAgent.init(this, "'+appKey+'","'+appName+'");'+"\n"
                            + "TCAgent.setReportUncaughtExceptions(true);"+"\n";
      data = data.replace(replaceValue,replaceValue+talkingDataString);
      //console.info(data);
      fs.writeFileSync(mainActivity, data);
		});
	}
}