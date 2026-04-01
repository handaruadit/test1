const { getDeviceData } = require("../services/data.service");
const { getDailyData } = require("../services/data.service");
const { getMonthlyData } = require("../services/data.service");
const { getYearlyData } = require("../services/data.service");
const { getLifetimeData } = require("../services/data.service");
// const { formatByType } = require("../services/data.service");
const { checkDeviceAccess } = require("../services/data.service");


const fetchDeviceData = async (req, res) => {
    try {
        const { deviceId, category, limit, startDate, endDate } = req.query;
        
        if (!deviceId) {
            return res.status(400).json({
                status: "error",
                message: "deviceId is required",
            });
        }
        
        const userId = req.user.userId;
        const allowed = await checkDeviceAccess(userId, deviceId);
        if (!allowed) {
            return res.status(403).json({ message: "Access denied" });
        }
        
        const types = req.query.type
        ? req.query.type.split(",")
        : null;

        let start, end;

        if (startDate && endDate) {
            start = new Date(startDate);
            end = new Date(endDate);
        }

        const data = await getDeviceData({
            deviceId,
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

    } catch (err) {res.status(500).json({ status: "error" });
    }
};

const getDaily = async (req, res) => {
    try {
        const { deviceId, date, category } = req.query;
        const userId = req.user.userId;
        const allowed = await checkDeviceAccess(userId, deviceId);
        if (!allowed) {
            return res.status(403).json({ message: "Access denied" });
        }

        if (!deviceId) {
                return res.status(400).json({
                    status: "error",
                    message: "deviceId is required",
                });
        }
        if (!date) {
            return res.status(400).json({
                status: "error",
                message: "date is required",
            });
        }

        const types = req.query.type
            ? req.query.type.split(",")
            : null;

        const data = await getDailyData({
            deviceId,
            date,
            category,
            types,
            });

        res.json({
            status: "success",
            data,
        });
    } catch (err) {res.status(500).json({ status: "error" });}
};

const getMonthly = async (req, res) => {
    try {
        const { deviceId, month, category } = req.query;
        const userId = req.user.userId;
        const allowed = await checkDeviceAccess(userId, deviceId);
        if (!allowed) {
            return res.status(403).json({ message: "Access denied" });
        }
        if (!deviceId) {
            return res.status(400).json({
                status: "error",
                message: "deviceId is required",
            });
        }
        if (!month) {
            return res.status(400).json({
                status: "error",
                message: "month is required",
            });
        }

        const types = req.query.type
        ? req.query.type.split(",")
        : null;

        const data = await getMonthlyData({
            deviceId,
            month,
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
        const { deviceId, year, category } = req.query;
        const userId = req.user.userId;
        const allowed = await checkDeviceAccess(userId, deviceId);
        if (!allowed) {
            return res.status(403).json({ message: "Access denied" });
        }
        if (!deviceId) {
            return res.status(400).json({
                status: "error",
                message: "deviceId is required",
            });
        }
        if (!year) {
            return res.status(400).json({
                status: "error",
                message: "year is required",
            });
        }

        const types = req.query.type
        ? req.query.type.split(",")
        : null;

        const data = await getYearlyData({
            deviceId,
            year,
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
        const { deviceId, category } = req.query;
        const userId = req.user.userId;
        const allowed = await checkDeviceAccess(userId, deviceId);
        if (!allowed) {
            return res.status(403).json({ message: "Access denied" });
        }
        if (!deviceId) {
            return res.status(400).json({
                status: "error",
                message: "deviceId is required",
            });
        }

        const types = req.query.type
        ? req.query.type.split(",")
        : null;

        const data = await getLifetimeData({
            deviceId,
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