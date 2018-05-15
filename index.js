const config = require('./config');
const server = require('./lib/server').create();
const db = require('./lib/db').create(
  config.dbName,
  config.dbUser,
  config.dbPassword
);

// Here the principle is to compose the server endpoints
// If we just comment this line, we can enable/disable trips endpoints
require('./trips')(server, db);

server.start(config.port);
