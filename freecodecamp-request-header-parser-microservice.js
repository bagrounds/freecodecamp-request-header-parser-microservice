/**
 * freecodecamp-request-header-parser-microservice
 *
 * Assignment:
 * https://www.freecodecamp.com/challenges/request-header-parser-microservice
 */
;(function () {
  'use strict'

  /* imports */
  var express = require('express')
  var useragent = require('useragent')

  var PORT = process.env.PORT || 8080
  var app = express()

  // handle dates and timestamps
  app.get('/', function (request, response) {
    response.json(parseHeader(request))
  })

  app.listen(PORT, function () {
    console.log('Listening on port ' + PORT)
  })

  /**
   * Parse the requester's ip address, language, and operating system from the
   * http request object.
   *
   * @function parseHeader
   *
   * @param {Object} request http request
   * @return {Object} containing ipaddress, language, and software fields
   */
  function parseHeader (request) {
    var agent = useragent.parse(request.headers['user-agent'])

    return {
      ipaddress: /:([\d\.]+)$/.exec(request.connection.remoteAddress)[1],
      language: /^(.*);/.exec(request.headers['accept-language'])[1],
      software: agent.os.family
    }
  }
})()

