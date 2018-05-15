// Http server library

// Mock server methods
const server = {
  start: () => {},
  endpoint: () => {},
  // This method will be the default match if no endpoint is matched
  // And will return a 404 http status
  onUnknowEndpoint: () => {
    return '404';
  }
};

module.exports.create = () => {
  return server;
};
