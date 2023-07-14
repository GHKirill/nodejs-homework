const { User } = require("../../models");
const { CustomHttpError } = require("../../utils");

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const currentUser = await User.findOne({ verificationToken });
  if (!currentUser) {
    throw new CustomHttpError(400, "not Found");
  }

  await User.findByIdAndUpdate(currentUser._id, {
    verify: true,
    verificationToken: "null",
  });

  res.status(200).json({
    result: {
      code: 200,
      status: "Verify success",
    },
  });
};

module.exports = verifyEmail;
