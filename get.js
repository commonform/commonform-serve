var meta = require('./package.json')

module.exports = function get(bole, level, request, response) {
  var url = require('url').parse(request.url)
  if (url.pathname === '/') {
    response.setHeader('Content-Type', 'application/json')
    response.end(
      JSON.stringify({
        service: meta.name,
        version: meta.version })) }
  else {
    var digest = url.pathname.slice(1)
    level.get(digest, function(error, data) {
      if (error) {
        if (error.notFound) {
          response.statusCode = 404
          response.end() }
        else {
          response.statusCode = 500
          response.end() } }
      else {
        response.setHeader('Content-Type', 'application/json')
        response.end(data) } }) } }