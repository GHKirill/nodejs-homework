const { CustomHttpError } = require("../../utils");
const path = require("path");
const fs = require("fs/promises");
const { User } = require("../../models/user");
const { imageOptimize } = require("../../utils");

const avatarDir = path.join(__dirname, "../../", "public", "avatars");

const avatarUpdate = async (req, res) => {
  const { _id, email, subscription } = req.user;
  const { path: tempUpload, originalname } = req.file;

  try {
    await imageOptimize(tempUpload);

    const updatedName = `${_id}_${originalname}`;

    const resultUpload = path.join(avatarDir, updatedName);
    await fs.rename(tempUpload, resultUpload);
    const avatarUrl = path.join("avatars", updatedName);
    await User.findByIdAndUpdate(_id, { avatarUrl });

    res.status(200).json({
      status: "Success",
      code: 200,
      data: {
        user: {
          email,
          subscription,
          avatarUrl,
        },
      },
    });
  } catch (error) {
    await fs.unlink(tempUpload);
    const errorCode = error.status || 400;
    const errorMessage =
      error.message || "new avatar ia not uploaded. Try it later";
    throw new CustomHttpError(errorCode, errorMessage);
  }
};
module.exports = avatarUpdate;
