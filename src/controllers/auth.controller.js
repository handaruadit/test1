const { registerUser, loginUser } = require("../services/auth.service");

const validateEmail = (email) => {
  return typeof email === "string" && /^\S+@\S+\.\S+$/.test(email);
};

const validateRegisterData = ({ email, password, phone }) => {
  if (!email) return { status: 400, message: "Email is required" };
  if (!validateEmail(email)) return { status: 422, message: "Invalid email format" };
  if (!password) return { status: 400, message: "Password is required" };
  if (typeof password !== "string" || password.length < 6) return { status: 422, message: "Password must be at least 6 characters" };
  if (!phone) return { status: 400, message: "Phone is required" };
  return null;
};

const validateLoginData = ({ email, password }) => {
  if (!email) return { status: 400, message: "Email is required" };
  if (!password) return { status: 400, message: "Password is required" };
  return null;
};

const register = async (req, res) => {
  const validationError = validateRegisterData(req.body);
  if (validationError) {
    return res.status(validationError.status).json({ status: "error", message: validationError.message });
  }

  try {
    const user = await registerUser(req.body);
    res.json({ status: "success", data: user });
  } catch (err) {
    if (err.message.includes("already registered")) {
      return res.status(409).json({ status: "error", message: err.message });
    }
    res.status(500).json({ status: "error", message: err.message });
  }
};

const login = async (req, res) => {
  const validationError = validateLoginData(req.body);
  if (validationError) {
    return res.status(validationError.status).json({ status: "error", message: validationError.message });
  }

  try {
    const data = await loginUser(req.body);
    res.json({ status: "success", ...data });
  } catch (err) {
    if (err.message === "User not found" || err.message === "Wrong password") {
      return res.status(401).json({ status: "error", message: err.message });
    }
    res.status(500).json({ status: "error", message: err.message });
  }
};

module.exports = { register, login };