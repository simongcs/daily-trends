export default {
  PORT: process.env.PORT || 3000,
  ENV: process.env.NODE_ENV || 'development',
  DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
};
