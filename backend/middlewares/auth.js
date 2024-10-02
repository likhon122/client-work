const { verifyJsonWebToken } = require("../helper/jsonWebToken");
const { refreshTokenKey } = require("../secret");

const userIsLoggedIn = async (req, res, next) => {
  try {
    const affiliate = req.cookies?.affiliate;

    if (!affiliate) {
      return res
        .status(401)
        .send({ msg: "You are already logged out. Please login first." });
    }

    const userInfo = verifyJsonWebToken(affiliate, refreshTokenKey);

    if (!userInfo) {
      return res.status(401).send({
        msg: "Token verification failed! Please logOut and login again!!"
      });
    }

    req.email = userInfo.email;
    req.id = userInfo.id;
    next();
  } catch (error) {
    return next(error);
  }
};

const userIsLoggedOut = async (req, res, next) => {
  try {
    const affiliate = req.cookies?.affiliate;

    if (!affiliate) {
      return next();
    }

    const userInfo = verifyJsonWebToken(affiliate, refreshTokenKey);

    if (userInfo) {
      return res
        .status(400)
        .send({ msg: "You are already logged in please log out first!!" });
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { userIsLoggedIn, userIsLoggedOut };
