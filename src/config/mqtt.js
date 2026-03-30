require("dotenv").config();
const { getIO } = require("../sockets/socket");
const mqtt = require("mqtt");
const { saveDeviceData } = require("../services/data.service");

const parseValue = (val) => {
  // number langsung
  if (typeof val === "number") return val;

  // boolean → convert
  if (typeof val === "boolean") return val ? 1 : 0;

  // string angka → convert
  if (!isNaN(val)) return Number(val);

  // selain itu → skip (atau null)
  return null;
};

const connectUrl = `${process.env.MQTT_PROTOCOL}://${process.env.MQTT_HOST}:${process.env.MQTT_PORT}`;

const options = {
  clientId: process.env.MQTT_CLIENT_ID,
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASSWORD,
  clean: true,
  connectTimeout: 4000,
  reconnectPeriod: 1000,
};

const client = mqtt.connect(connectUrl, options);

client.on("connect", () => {
  console.log("✅ MQTT Connected");
  try {
    client.subscribe("app/+/baterai");
    client.subscribe("app/+/inverter");
    console.log(`📡 Subscribed to All device data`);
  } catch (err) {
    console.error("❌ MQTT Subscribe Error:", err.message);
  }
});

client.on("error", (err) => {
  console.error("❌ MQTT Error:", err.message);
});

client.on("reconnect", () => {
  console.log("🔄 Reconnecting MQTT...");
});

client.on("message", (topic, message) => {
  try {
    const payload = JSON.parse(message.toString());

    const deviceId = payload.deviceId;
    if (!deviceId) return;

    // const ONE_DAY = 24 * 60 * 60 * 1000;
    const timestamp = Date.now();
    const parsedData = [];

    // LOOP CATEGORY (untuk parsing data)
    for (const category in payload) {
      if (category === "deviceId") continue;

      const data = payload[category];

      // pastikan object
      if (typeof data !== "object" || data === null) continue;

      // LOOP TYPE
      for (const key in data) {
        const value = data[key];

        if (Array.isArray(value)) { // HANDLE ARRAY VALUE (misal cell_voltages)
          value.forEach((v, i) => {
            parsedData.push({
              deviceId,
              category,
              type: `${key}_${i + 1}`,
              value: parseValue(v),
              timestamp,
            });
          });
        } else { // HANDLE SINGLE VALUE
          parsedData.push({
            deviceId,
            category,
            type: key,
            value: parseValue(value),
            timestamp,
          });
        }
      }
    }

    // WEBSOCKET (REALTIME)
    try {
      const io = getIO();
      io.to(deviceId).emit("mqtt_message", parsedData);
    } catch (err) {
      console.error("❌ WEBSOCKET Error:", err.message);
    }

    // BULK INSERT (EFISIEN)
    saveDeviceData(parsedData);

    // DEBUG LOG
    console.log("📩 Parsed Data:", parsedData.length, "rows");

  } catch (err) {
    console.error("❌ MQTT ERROR:", err.message);
  }
});

const publishMessage = (topic, message) => {
  if (!client.connected) {
    console.log("❌ MQTT not connected");
    return;
  }

  client.publish(topic, message, { qos: 1 }, (err) => {
    if (err) {
      console.error("❌ Publish error:", err);
    } else {
      console.log(`📤 Published to ${topic}`);
      console.log(`📦 Message: ${message}`);
    }
  });
};

module.exports = { client, publishMessage };