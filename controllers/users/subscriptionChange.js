const CustomHttpError = require("../../utils/customHttpError");
const { User } = require("../../models");

const subscriptionChange = async (req, res, next) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  const subscriptionTypes = ["starter", "pro", "business"];
  const isNewValueCorrect = subscriptionTypes.includes(subscription);
  if (!isNewValueCorrect) {
    throw new CustomHttpError(
      404,
      `Subscription could be defined only as 'starter', 'pro' or 'business' `
    );
  }
  const { email } = await User.findByIdAndUpdate(_id, {
    $set: { subscription },
  });
  res.json({
    status: "success",
    code: 200,
    data: {
      user: {
        email,
        subscription,
      },
    },
  });
};

module.exports = subscriptionChange;
