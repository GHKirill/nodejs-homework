// const { v4 } = require("uuid");
const sendGridUtil = require("../../utils");
const User = require("../../models/user");
const { CustomHttpError } = require("../../utils");

const verifyEmailNext = async (req, res) => {
  const { email } = req.body;

  const currentUser = await User.findOne({ email });
  if (!currentUser) {
    throw new CustomHttpError(400, "not Found");
  }
  if (currentUser.verify) {
    throw new CustomHttpError(400, "Verification has already been passed");
  }
  // const verificationToken = v4();
  // await User.findByIdAndUpdate(currentUser._id, { verificationToken });

  const mail = {
    to: email,
    subject: "Please verify your email",
    html: `<a> target="_blank" href="http://localhost/3000/api/users/verify:${currentUser.verificationToken}"</a>`,
  };
  await sendGridUtil(mail);
  res.status(200).json({
    result: {
      code: 200,
      status: "Verification email sent",
    },
  });
};

module.exports = verifyEmailNext;
