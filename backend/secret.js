require("dotenv").config();

const port = process.env.PORT || 3000;

const smtpUserName = process.env.EMAIL_USER;
const smtpPassword = process.env.EMAIL_PASS;

const refreshTokenKey = process.env.REFRESH_TOKEN_KEY;

module.exports = {
  port,
  smtpUserName,
  smtpPassword,
  refreshTokenKey
};
