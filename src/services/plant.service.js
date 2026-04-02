const db = require("../config/db");

// CHECK USER PUNYA PLANT
const checkPlantAccess = async (userId, plantId) => {
  const data = await db("user_plants")
    .where({ user_id: userId, plant_id: plantId })
    .first();

  return !!data;
};

// AMBIL DATA PLANT USER
const getPlants = async (userId) => {
  return await db("plants as p")
    .join("user_plants as up", "p.id", "up.plant_id")
    .where("up.user_id", userId)
    .select("p.*", "up.role");
};

// ASSIGN PLANT KE USER
const assignUserToPlant = async (email, plantId, role = "viewer") => {
  const user = await db("users")
    .where({ email })
    .first();

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  
  return await db("user_plants").insert({
    user_id: user.id,
    plant_id: plantId,
    role,
  });
};

// ASSIGN DEVICE KE PLANT
const assignDeviceToPlant = async (deviceId, plantId) => {
  return await db("plant_devices").insert({
    device_id: deviceId,
    plant_id: plantId,
  });
};

// UPDATE PLANT
const updatePlant = async (plantId, data) => {
  return await db("plants")
    .where({ id: plantId })
    .update(data);
};

// CREATE PLANT
const create = async (data, userId) => {
  const [plant] = await db("plants")
      .insert(data)
      .returning("*");

  await db("user_plants").insert({
    user_id: userId,
    plant_id: plant.id,
    role: "owner",
  });

  return plant;
};

module.exports = {
  checkPlantAccess,
  assignUserToPlant,
  updatePlant,
  assignDeviceToPlant,
  getPlants,
  create,
};