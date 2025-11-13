const Users = require("../../model/user");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, password } = req.body;

    if (!firstName || !lastName || !email || !phoneNumber || !password) {
      return res.status(400).json({
        message: "All fields are required",
        data: null,
      });
    }

    const user_found = await Users.findOne({
      $or: [{ email }, { phoneNumber }],
    });

    if (user_found) {
      if (user_found.email == email && user_found.phoneNumber == phoneNumber) {
        return res.status(400).json({
          message: "Email and Phone number Already Exist",
          data: null,
        });
      } else if (user_found.email == email) {
        return res.status(400).json({
          message: "Email Already Exist",
          data: null,
        });
      } else if (user_found.phoneNumber == phoneNumber) {
        return res.status(400).json({
          message: "Phone number Already Exist",
          data: null,
        });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const new_user = new Users({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hashedPassword,
      role: "user",
    });

    await new_user.save();

    res
      .status(201)
      .json({ message: "User registered successfully", data: null });
  } catch (error) {
    res.status(500).json({ message: error.message, data: null });
  }
};

module.exports = register;
