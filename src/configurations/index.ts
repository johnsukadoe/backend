import * as process from 'process';

export default () => ({
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
});
