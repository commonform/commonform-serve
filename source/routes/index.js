var meta = require('../../package.json');
var badMethodRoute = require('./bad-method');

module.exports = function indexRoute(request, response) {
  if (request.method === 'GET') {
    response.setHeader('cache-control', 'no-store');
    response.end(JSON.stringify({
      service: meta.name,
      version: meta.version
    }));
    request.log.info('Done');
  } else {
    badMethodRoute(request, response);
  }
};