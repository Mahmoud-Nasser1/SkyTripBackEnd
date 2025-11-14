const Users = require("../../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jwt-encode");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        data: null,
      });
    }
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "The email address you entered isn't connected to an account",
        data: null,
      });
    } else {
      const checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword) {
        return res
          .status(400)
          .json({ message: "Incorrect password", data: null });
      }
    }

    const token = jwt(
      {
        id: user._id,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
      },
      process.env.SECRET_KEY
    );
    res.status(200).json({
      message: "Login successful",
      data: {
        token,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = login;
