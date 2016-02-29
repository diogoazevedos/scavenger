var page   = require('webpage').create();
var system = require('system');
var flag   = true;
var code   = 400;
var url    = system.args[1];

page.open(url);

page.onResourceReceived = function (resource) {
  if (flag && resource.url === url) {
    code = resource.status;
    flag = false;
  }
};

page.onLoadFinished = function (status) {
  console.log(code + page.content);
  phantom.exit();
};

page.onError = function (message, trace) {};
