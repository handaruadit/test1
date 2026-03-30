const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const { fetchDeviceData } = require("../controllers/data.controller");
const { getDaily } = require("../controllers/data.controller");
const { getMonthly } = require("../controllers/data.controller");
const { getYearly } = require("../controllers/data.controller");
const { getLifetime } = require("../controllers/data.controller");

// GET data endpoint
router.get("/", auth, fetchDeviceData);
router.get("/daily", auth, getDaily);
router.get("/monthly", auth, getMonthly);
router.get("/yearly", auth, getYearly);
router.get("/lifetime", auth, getLifetime);


module.exports = router;