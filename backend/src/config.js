export default {
  port: process.env.PORT,
  mongoUri: process.env.MONGO_URI,
  mongoTestUri: process.env.TEST_MONGO_URI,
  tokenSecret: process.env.TOKEN_SECRET,
  mailHost: process.env.MAIL_HOST,
  mailPort: process.env.MAIL_PORT,
  mailUser: process.env.MAIL_USER,
  mailPassword: process.env.MAIL_PASSWORD,
  mailFrom: process.env.MAIL_FROM,
};
