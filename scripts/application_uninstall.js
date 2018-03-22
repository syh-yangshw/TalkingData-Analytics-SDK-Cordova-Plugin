module.exports = function(context) {
  //console.info('============================================:'+JSON.stringify(context));
	var fs = context.requireCordovaModule('fs'),
		path = context.requireCordovaModule('path');
	var platformRoot = path.join(context.opts.projectRoot, 'platforms/android/src');
  
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
  //console.info(packagePath);
  //通过packagePath取得mainActivitu.java的位置
  var mainActivity = path.join(platformRoot,packagePath,'MainActivity.java');
  //console.info(mainActivity);
	if(fs.existsSync(mainActivity)) {
		fs.readFile(mainActivity, 'utf8', function(err, data) {
			if(err) {
				throw new Error('Unable to find mainActivity.java: ' + err);
			}
      //console.info(JSON.stringify(data));
      //删除对应的talkingData需要导入的包
      var talkingDataPackage = "import com.tendcloud.tenddata.TCAgent;"+"\\n";
      data = data.replace(eval("/"+talkingDataPackage+"/g"),"");
      //删除对应初始化代码
      var startReplace = "TCAgent.LOG_ON";
      var endReplace = "TCAgent.setReportUncaughtExceptions(true);"+"\\n";
      data = data.replace(/TCAgent[\s\S]+;/g,"");
      //console.info(data);
      fs.writeFileSync(mainActivity, data);
		});
	}
}