/* You should implement your request handler function in this file.
 * But you need to pass the function to http.createServer() in
 * basic-server.js.  So you must figure out how to export the function
 * from this file and include it in basic-server.js. Check out the
 * node module documentation at http://nodejs.org/api/modules.html. */

// var EventEmitter = require('events').EventEmitter;

 /* These headers will allow Cross-Origin Resource Sharing.
   * This CRUCIAL code allows this server to talk to websites that
   * are on different domains. (Your chat client is running from a url
   * like file://your/chat/client/index.html, which is considered a
   * different domain.) */
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

var messages = [];

module.exports.requestHandler = function(request, response) {
  // setTimeout(function() {
  //   module.exports.emit('ready');
  // }, 1000);
  /* Request is an http.ServerRequest object containing various data
   * about the client request - such as what URL the browser is
   * requesting. */


  console.log("Serving request type " + request.method + " for url " + request.url);
  if(request.url === '/1/classes/messages'){
    if (request.method === 'POST'){
      request.on('data', function(chunk){
        messages.push(JSON.parse(chunk));
        console.log(messages);
      });
      // console.log(request);
    } else if (request.method ===  'GET'){
      console.log('GET');
    }


  /* "Status code" and "headers" are HTTP concepts that you can
   * research on the web as and when it becomes necessary. */
  var statusCode = 200;

  /* Without this line, this server wouldn't work.  See the note
   * below about CORS. */
  var headers = defaultCorsHeaders;

  headers['Content-Type'] = "text/plain";

  /* Response is an http.ServerResponse object containing methods for
   * writing our response to the client. Documentation for both request
   * and response can be found at
   * http://nodemanual.org/0.8.14/nodejs_ref_guide/http.html*/
  response.writeHead(statusCode, headers);
  /* .writeHead() tells our server what HTTP status code to send back
   * to the client, and what headers to include on the response. */

  /* Make sure to always call response.end() - Node will not send
   * anything back to the client until you do. The string you pass to
   * response.end() will be the body of the response - i.e. what shows
   * up in the browser.*/
  response.write(JSON.stringify(messages));
  response.end();
  }
};