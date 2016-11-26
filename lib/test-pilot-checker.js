var child = require('child_process');
var path = require('path');

module.exports.check = function (callback) {
  var bool;
  child.exec('npm ls', { cwd: __dirname }, function (error, stdout) {
    if (stdout.match(/avrga-tester/)) {
      bool = true;
    } else {
      bool = false;
    }

    return callback(error, bool);
  });
};

module.exports.runTester = function () {
  var tp = child.exec('node ' + path.join(__dirname, '..', 'tests', 'test-pilot.js'), function (error) {
    console.log(error);
  });

  tp.stdout.pipe(process.stdout);
};

module.exports.installTester = function (callback) {
  console.log('Thanks for helping! Installing test pilot, won\'t be long...');
  child.exec('npm install avrga-tester', { cwd: __dirname }, function (error) {
    return callback(error);
  });
};
