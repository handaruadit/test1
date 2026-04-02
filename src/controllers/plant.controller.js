const { assignDeviceToPlant } = require("../services/plant.service");
const { checkPlantAccess } = require("../services/plant.service");
const { assignUserToPlant } = require("../services/plant.service");
const { getPlants } = require("../services/plant.service");
const { create } = require("../services/plant.service");

const addDeviceToPlant = async (req, res) => {
  try {
    const { deviceId, plantId } = req.body;
    const userId = req.user.userId;
  
    const allowed = await checkPlantAccess(userId, plantId);
    if (!allowed) {
      return res.status(403).json({ message: "Access denied" });
    }
  
    await assignDeviceToPlant(deviceId, plantId);
    res.json({ status: "device added" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createPlant = async (req, res) => {
  try {
    const userId = req.user.userId;
    const [plant] = await create(req.body, userId);

    res.json({ status: "success", data: plant });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const assignUserToPlantByEmail = async (req, res) => {
  try {
    const { plantId, email, role } = req.body;
    const userId = req.user.userId;

    const allowed = await checkPlantAccess(userId, plantId);
    if (!allowed) {
      return res.status(403).json({ message: "Access denied" });
    }

    await assignUserToPlant(email, plantId, role);

    res.json({ status: "user assigned", email: email });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getPlantData = async (req, res) => {
  try{
    const userId = req.user.userId;

    const data = await getPlants(userId);
    res.json({
      status: "success",
      data: data
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { 
    createPlant,
    addDeviceToPlant,
    assignUserToPlantByEmail,
    getPlantData,
};