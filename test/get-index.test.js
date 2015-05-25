var concat = require('concat-stream');
var http = require('http');
var launchTestServer = require('./server');

var meta = require('../package.json');

require('tap').test('/', function(test) {
  launchTestServer(function(port, callback) {
    http.get({path: '/', port: port}, function(response) {
      test.equal(response.statusCode, 200);
      test.equal(response.headers['cache-control'], 'no-store');
      response.pipe(concat(function(buffer) {
        test.same(JSON.parse(buffer), {
          service: meta.name,
          version: meta.version
        });
        callback();
        test.end();
      }));
    });
  });
});