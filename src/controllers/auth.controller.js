const { registerUser, loginUser } = require("../services/auth.service");

const register = async (req, res) => {
  try {
    const user = await registerUser(req.body);
    res.json({ status: "success", data: user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const data = await loginUser(req.body);
    res.json({ status: "success", ...data });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

module.exports = { register, login };