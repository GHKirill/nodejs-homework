const jwt = require("jsonwebtoken");
const { User } = require("../../models");
const { CustomHttpError } = require("../../utils");

const { JWT_SECRET_KEY } = process.env;

const logIn = async (req, res, next) => {
  const { email, password } = req.body;
  const candidate = await User.findOne({ email });

  if (!candidate || !candidate.checkPassword(password)) {
    throw new CustomHttpError(401, "Email or password is wrong");
  }
  const payload = {
    id: candidate._id,
  };
  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "2h" });
  candidate.setToken(token);
  candidate.save();

  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      token,
    },
  });
};

module.exports = logIn;
