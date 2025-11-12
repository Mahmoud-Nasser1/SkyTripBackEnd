const User = require("../../model/user");
const bcrypt = require("bcrypt");

const update_user = async (req, res) => {
  try {
    const { userId } = req.params;
    const updatedFields = { ...req.body };

    if (updatedFields.password) {
      const hashed_password = await bcrypt.hash(updatedFields.password, 8);
      updatedFields.password = hashed_password;
    }

    const updated_user = await User.findByIdAndUpdate(userId, updatedFields, {
      new: true,
      projection: { __v: 0, password: 0 },
    });

    if (!updated_user) {
      return res.status(404).json({
        message: "User Not Found!",
        data: null,
      });
    }
    return res.status(201).json({
      message: "User Updated Successfully",
      data: updated_user,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error updating user",
      error: err.message,
    });
  }
};
module.exports = update_user;
