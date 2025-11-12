const User = require("../../model/user");
const get_one_user = async (req, res) => {
  try {
    const { userId } = req.params;
    const searched_user = await User.findById(userId, { __v: 0, password: 0 });

    if (!searched_user) {
      return res.status(404).json({
        message: "Searched User Not Found!",
        data: null,
      });
    }

    return res.status(200).json({
      message: " Searched User Founded Successfully",
      data: searched_user,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error getting user",
      error: err.message,
    });
  }
};
module.exports = get_one_user;
