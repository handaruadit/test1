const db = require("../config/db");

const { assignDeviceToPlant } = require("../services/plant.service");
const { checkPlantAccess } = require("../services/plant.service");
const { assignUserToPlant } = require("../services/plant.service");

const addDeviceToPlant = async (req, res) => {
  const { deviceId, plantId } = req.body;
  const userId = req.user.userId;

  const allowed = await checkPlantAccess(userId, plantId);

  if (!allowed) {
    return res.status(403).json({ message: "Access denied" });
  }

  await assignDeviceToPlant(deviceId, plantId);

  res.json({ status: "device added" });
};

const createPlant = async (req, res) => {
  try {
    const userId = req.user.userId;

    const [plant] = await db("plants")
      .insert(req.body)
      .returning("*");

    // 🔥 otomatis assign creator sebagai owner
    await db("user_plants").insert({
      user_id: userId,
      plant_id: plant.id,
      role: "owner",
    });

    res.json({ status: "success", data: plant });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const assignUserToPlantByEmail = async (req, res) => {
  try {
    const { plantId, email, role } = req.body;
    const currentUserId = req.user.userId;

    // 🔥 1. cek akses user sekarang
    const access = await db("user_plants")
      .where({ user_id: currentUserId, plant_id: plantId })
      .first();

    if (!access) {
      return res.status(403).json({ message: "Access denied" });
    }

    // 🔥 2. cari user berdasarkan email
    const user = await db("users")
      .where({ email })
      .first();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🔥 3. insert ke user_plants
    assignUserToPlant(user.id, plantId, role);

    res.json({ status: "user assigned", userId: user.id });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { 
    createPlant,
    addDeviceToPlant,
    assignUserToPlantByEmail,
};