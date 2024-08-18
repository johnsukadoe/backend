import * as process from 'process';

export default () => ({
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  secret_jwt: process.env.SECRET_JWT,
  expire_jwt: process.env.EXPIRE_JWT,
});
