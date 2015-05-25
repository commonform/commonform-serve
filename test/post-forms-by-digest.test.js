require('tap').test('POST /forms/:digest', function(test) {
  require('./server')(function(port, callback) {
    var request = {method: 'POST', path: '/forms/x', port: port};
    require('http').request(request, function(response) {
      test.equal(response.statusCode, 405);
      callback();
      test.end();
    }).end();
  });
});