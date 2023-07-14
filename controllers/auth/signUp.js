// const gravatar = require("gravatar");
const { User } = require("../../models");
const { v4 } = require("uuid");
// const bcrypt = require("bcrypt");
const { CustomHttpError } = require("../../utils");
const { sendSGemail } = require("../../utils");

const signup = async (req, res, next) => {
  const { email, password } = req.body;
  const candidate = await User.findOne({ email });
  if (candidate) {
    throw new CustomHttpError(409, `Email ${email} in use`);
  }

  const verificationToken = v4();

  const newUser = new User({ email, verificationToken });
  await newUser.setPassword(password);

  // ==========================
  // const verifyToken = v4();
  // await newUser.setVerifyToken(verifyToken);
  const mail = {
    to: email,
    subject: "Please verify your email",
    html: `<a> target="_blank" href="http://localhost/3000/api/users/verify:${verificationToken}"</a>`,
  };
  await sendSGemail(mail);
  // ==========================

  await newUser.save();
  const { subscription, avatarURL } = await User.findOne({ email });
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
        avatarURL,
        verificationToken,
      },
    },
  });
};

// const signup = async (req, res, next) => {
//   console.log(req);
// };
module.exports = signup;
