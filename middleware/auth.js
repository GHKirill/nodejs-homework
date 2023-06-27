const { User } = require("../models");
const { CustomHttpError } = require("../utils");
const jwt = require("jsonwebtoken");

const { JWT_SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  try {
    if (bearer !== "Bearer") {
      throw new CustomHttpError(401, "Not authorized");
    }
    const { id } = jwt.verify(token, JWT_SECRET_KEY);
    const user = await User.findById(id);

    if (!user || !user.token || user.token !== token) {
      throw new CustomHttpError(401, "Not authorized");
    }
    req.user = user;
    next();
  } catch (error) {
    let newError = error;
    if (error.message === "invalid signature") {
      newError = new CustomHttpError(401, "Not authorized");
    }
    next(newError);
  }
};

module.exports = auth;
