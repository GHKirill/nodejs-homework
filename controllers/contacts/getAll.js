const { Contact } = require("../../models");

const getAll = async (req, res) => {
  console.log(req.query);
  const { page = 1, limit = 10, favorite = { $in: [true, false] } } = req.query;

  const skip = (page - 1) * limit;
  const { _id } = req.user;

  const contacts = await Contact.find({ owner: _id, favorite }, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id email subscription");

  res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts,
    },
  });
};

module.exports = getAll;
