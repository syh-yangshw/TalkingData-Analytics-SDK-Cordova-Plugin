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
  //定位ios的class存放的地方
  var classPath = path.join(platformRoot,newProjectName,"Classes","AppDelegate.m");
  if(fs.existsSync(classPath)) {
		fs.readFile(classPath, 'utf8', function(err, data) {
			if(err) {
				throw new Error('Unable to find mainActivity.java: ' + err);
      }
      var appPackage = '#import "TalkingData.h"'+"\\n";
      data = data.replace(eval("/"+appPackage+"/g"),"");
      data = data.replace(/\[TalkingData[^\n]+\];\n/g,"");
      //console.info(data);
      fs.writeFileSync(classPath, data);
		});
	}
}