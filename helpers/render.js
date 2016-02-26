var page   = require('webpage').create();
var system = require('system');
var code   = 400;
var url    = system.args[1];

page.open(url);

page.onResourceReceived = function (resource) {
  if (resource.url === url)
    code = resource.status;
};

page.onLoadFinished = function (status) {
  console.log(code + page.content);
  phantom.exit();
};

page.onError = function (message, trace) {};
