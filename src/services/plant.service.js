const db = require("../config/db");

// CHECK USER PUNYA PLANT
const checkPlantAccess = async (userId, plantId) => {
  const data = await db("user_plants")
    .where({ user_id: userId, plant_id: plantId })
    .first();

  return !!data;
};

// ASSIGN PLANT KE USER
const assignUserToPlant = async (userId, plantId, role = "viewer") => {
  return await db("user_plants").insert({
    user_id: userId,
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

module.exports = {
  checkPlantAccess,
  assignUserToPlant,
  updatePlant,
  assignDeviceToPlant,
};