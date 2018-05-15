// If you don't know NodeJS, process.env contains environment variables
// This way we allow the process to configure the server at runtime
const getEnv = (key, dflt) => (process.env[key] ? process.env[key] : dflt);

module.exports = {
  port: getEnv('PORT', '3000'),
  dbName: getEnv('DB_NAME', 'a'),
  dbUser: getEnv('DB_USER', 'b'),
  dbPassword: getEnv('DB_PASSWORD', 'c'),
  bufferAccount: getEnv('BUFFER_ACCOUNT', '123456789'),
  mySamAccount: getEnv('MY_SAM_ACCOUNT', '777777777'),
  mySamPaymentPercent: getEnv('MY_SAM_PAYMENT_PERCENT', 15)
};
