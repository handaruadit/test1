const { 
    getDeviceData, 
    getDailyData, 
    getMonthlyData, 
    getYearlyData, 
    getLifetimeData, 
    checkDeviceAccess, 
    getDeviceIdData } = require("../services/data.service");
// const { formatByType } = require("../services/data.service");

const fetchDeviceData = async (req, res) => {
    try {
        const { plantId, category, limit, startDate, endDate } = req.query;
        const userId = req.user.userId;

        if (!plantId) {
            return res.status(400).json({
                status: "error",
                message: "plantId is required",
            });
        }

        const deviceIds = await getDeviceIdData(userId, plantId);
        console.log("🔍 Device IDs:", deviceIds);

        if (!deviceIds || deviceIds.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "No devices found for the specified plant",
            });
        }

        const types = req.query.type ? req.query.type.split(",") : null;

        let start, end;
        if (startDate && endDate) {
            start = new Date(startDate);
            end = new Date(endDate);
        }

        const data = await getDeviceData({
            deviceIds: deviceIds.map((d) => d.device_id),
            category,
            types,
            startDate: start,
            endDate: end,
            limit: limit ? parseInt(limit) : undefined,
        });

        res.json({
            status: "success",
            count: data.length,
            data,
        });

    } catch (err) {
        console.error("Error fetching device data:", err);
        res.status(500).json({ 
            status: "error", 
            message: "Internal server error" 
        });
    }
};

const getDaily = async (req, res) => {
    try {
        const { plantId, date, category } = req.query;
        const userId = req.user.userId;
        if (!plantId) {
            return res.status(400).json({
                status: "error",
                message: "plantId is required",
            });
        }

        const deviceIds = await getDeviceIdData(userId, plantId);

        if (!deviceIds || deviceIds.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "No devices found for the specified plant",
            });
        }

        if (!date) {
            return res.status(400).json({
                status: "error",
                message: "date is required (Format: YYYY-MM-DD)",
            });
        }

        const types = req.query.type ? req.query.type.split(",") : null;

        const data = await getDailyData({
            deviceId: deviceIds.map((d) => d.device_id),
            date,
            category,
            types,
            });

        res.json({
            status: "success",
            data,
        });
    } catch (err) {
        res.status(500).json({ status: "error" });
    }
};

const getMonthly = async (req, res) => {
    try {
        const { plantId, date, category } = req.query;
        const userId = req.user.userId;
        if (!plantId) {
            return res.status(400).json({
                status: "error",
                message: "plantId is required",
            });
        }

        const deviceIds = await getDeviceIdData(userId, plantId);

        if (!deviceIds || deviceIds.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "No devices found for the specified plant",
            });
        }

        if (!date) {
            return res.status(400).json({
                status: "error",
                message: "date is required (Format: YYYY-MM)",
            });
        }

        const types = req.query.type ? req.query.type.split(",") : null;

        const data = await getMonthlyData({
            deviceId: deviceIds.map((d) => d.device_id),
            month:date,
            category,
            types,
        });

        // const formatted = formatByType(data, "date");

        res.json({
            status: "success",
            data,
        });

    } catch (err) {
        res.status(500).json({ status: "error" });
    }
};

const getYearly = async (req, res) => {
    try {
        const { plantId, date, category } = req.query;
        const userId = req.user.userId;
        if (!plantId) {
            return res.status(400).json({
                status: "error",
                message: "plantId is required",
            });
        }

        const deviceIds = await getDeviceIdData(userId, plantId);

        if (!deviceIds || deviceIds.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "No devices found for the specified plant",
            });
        }

        if (!date) {
            return res.status(400).json({
                status: "error",
                message: "date is required (Format: YYYY)",
            });
        }

        const types = req.query.type ? req.query.type.split(",") : null;

        const data = await getYearlyData({
            deviceId: deviceIds.map((d) => d.device_id),
            year: date,
            category,
            types,
        });

        // const formatted = formatByType(data, "date");

        res.json({
            status: "success",
            data,
        });
    } catch (err) {res.status(500).json({ status: err.message });}
};

const getLifetime = async (req, res) => {
    try {
        const { plantId, category } = req.query;
        const userId = req.user.userId;
        if (!plantId) {
            return res.status(400).json({
                status: "error",
                message: "plantId is required",
            });
        }

        const deviceIds = await getDeviceIdData(userId, plantId);

        if (!deviceIds || deviceIds.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "No devices found for the specified plant",
            });
        }

        const types = req.query.type ? req.query.type.split(",") : null;

        const data = await getLifetimeData({
            deviceId: deviceIds.map((d) => d.device_id),
            category,
            types,
        });

        // const formatted = formatByType(data, "date");

        res.json({
            status: "success",
            data,
        });
    } catch (err) {res.status(500).json({ status: "error" });}
};


module.exports = {
    fetchDeviceData,
    getDaily,
    getMonthly,
    getYearly,
    getLifetime,
};