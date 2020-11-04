var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');
var fs = require('fs-extra');
var Jasmine = require('jasmine');
var jasmineobj = new Jasmine();

var reporter = new HtmlScreenshotReporter({
  dest: '../target/screenshots',
  filename: 'my-report.html'
});

// An example configuration file.
exports.config = {
  directConnect: true,

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      'args': ['show-fps-counter=true']
    }
  },

  // Framework to use. Jasmine is recommended.
  framework: 'jasmine',

  // Spec patterns are relative to the current working directory when
  // protractor is called.
  specs: ['../tests/calculator.js'],

  // Options to be passed to Jasmine.
  jasmineNodeOpts: {
    timer: new jasmineobj.jasmine.Timer(),
    showColors: true,
    defaultTimeoutInterval: 30000
  },

// Setup the report before any tests start
  beforeLaunch: function() {
    return new Promise(function(resolve){
      reporter.beforeLaunch(resolve);
    });
  },

  // Assign the test reporter to each running instance
  onPrepare: function() {
    //jasmine.getEnv().addReporter(reporter);
    var jasmineReporters = require('jasmine-reporters');
    jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
             consolidateAll: true,
             filePrefix: 'xmlresults',
             savePath: '../target/'
            }));


    var AllureReporter = require('jasmine-allure-reporter');
    jasmine.getEnv().addReporter(new AllureReporter({
      resultsDir: '../allure-results'
    }));

    jasmine.getEnv().addReporter({
      specDone: function (result) {
          //if (result.status == 'failed') {
    browser.getCapabilities().then(function (caps) {
      var browserName = caps.get('browserName');

      browser.takeScreenshot().then(function (png) {
        var stream = fs.createWriteStream('../target/screenshots/' + browserName + '-' + result.fullName + '.png');
        stream.write(new Buffer.from(png, 'base64'));
        stream.end();
      });
    });
          //}
      }
  });
  },

  // Close the report after all tests finish
  afterLaunch: function(exitCode) {
    return new Promise(function(resolve){
      reporter.afterLaunch(resolve.bind(this, exitCode));
    });
  },

  //HTMLReport called once tests are finished
onComplete: function() {
  var browserName, browserVersion;
  var capsPromise = browser.getCapabilities();

     capsPromise.then(function (caps) {
      browserName = caps.get('browserName');
      browserVersion = caps.get('version');
      platform = caps.get('platform');

      var HTMLReport = require('protractor-html-reporter-2');

  testConfig = {
          reportTitle: 'Protractor Test Execution Report',
          outputPath: '../target/',
          outputFilename: 'ProtractorTestReport',
          screenshotPath: '../target/screenshots',
          testBrowser: browserName,
          browserVersion: browserVersion,
          modifiedSuiteName: false,
          screenshotsOnlyOnFailure: false,
          testPlatform: platform
      };
      new HTMLReport().from('../target/xmlresults.xml', testConfig);
 });

    /*var execSync = require('child_process').execSync;
		var cmd = "node ../utility/sendmail.js";
		var options = {
			encoding: 'utf8'
		};
		console.log(execSync(cmd, options));*/

}

};
