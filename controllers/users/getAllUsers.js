const User = require("../../model/user");
const get_all_users = async (req, res) => {
  try {
    const users = await User.find({}, { __v: 0, password: 0 });

    if (users.length == 0) {
      return res.status(404).json({
        message: "No users found!",
        data: null,
      });
    }

    return res.status(200).json({
      message: "Users Founded Successfully",
      data: users,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error getting users",
      error: err.message,
    });
  }
};

module.exports = get_all_users;
