const http = require('http');

const server = http.createServer((request, response) => {
  const url = request.url;
  const method = request.method;
  switch (url) {
    case '/favicon.ico':
      response.end();
      break;
    case '/abc':
      response.write('You visited /abc');
      response.end();
      break;
    case '/abc/def':
      response.write('This is /abc/def');
      response.end();
      break;
    default:
      response.statusCode = 404;
      response.write('Page not found');
      response.end();
  }
});

server.listen(3000);
