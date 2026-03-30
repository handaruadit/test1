const db = require("../config/db");
const bcrypt = require("bcrypt");
const { generateToken } = require("../config/jwt");

const registerUser = async ({ email, password, phone }) => {
  const hashed = await bcrypt.hash(password, 10);

  const [user] = await db("users")
    .insert({ email, password: hashed, phone })
    .returning("*");

  return user;
};

const loginUser = async ({ email, password }) => {
  const user = await db("users").where({ email }).first();

  if (!user) throw new Error("User not found");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Wrong password");

  const token = generateToken({ userId: user.id });

  return { token, user };
};

module.exports = { registerUser, loginUser };