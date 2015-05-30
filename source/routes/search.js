var badMethodRoute = require('./bad-method');
var version = require('../../package').version;

module.exports = function(search) {
  return function(request, response, parameters, splats, level) {
    if (request.method === 'GET') {
      var name = parameters.name;
      var pattern = {predicate: search.predicate, object: name};
      response.write('{');
      response.write('"version":' + JSON.stringify(version) + ',');
      response.write(
        JSON.stringify(search.object.singular) + ':' +
        JSON.stringify(name) + ','
      );
      response.write(JSON.stringify(search.noun.plural) + ':[');
      level.createFormsReadStream(pattern)
        .on('data', function(result) {
          response.write(JSON.stringify(result));
        })
        .on('end', function() {
          response.end(']}');
        });
    } else {
      badMethodRoute(request, response);
    }
  };
};