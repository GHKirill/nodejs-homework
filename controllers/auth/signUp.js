const { User } = require("../../models");
// const bcrypt = require("bcrypt");
const { CustomHttpError } = require("../../utils");

const signup = async (req, res, next) => {
  const { email, password } = req.body;
  const candidate = await User.findOne({ email });
  if (candidate) {
    throw new CustomHttpError(409, `Email ${email} in use`);
  }

  const newUser = new User({ email });
  await newUser.setPassword(password);
  await newUser.save();
  const { subscription } = await User.findOne({ email });
  // const salt = await bcrypt.genSalt(10);
  // const hashedPassword = await bcrypt.hash(password, salt);
  // await User.create({ email, password: hashedPassword });
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
        subscription,
      },
    },
  });
};

// const signup = async (req, res, next) => {
//   console.log(req);
// };
module.exports = signup;
