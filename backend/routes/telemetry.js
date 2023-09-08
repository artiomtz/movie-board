const db = require("../database/access");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  console.log("Fetching telemetry...");
  try {
    const results = await db.getTelemetry();
    console.log("Getting telemetry query results:", results);
    res.status(200).json({ results });
  } catch (error) {
    console.error("Error getting telemetry");
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  console.log("Saving new telemetry...");
  const telemetryData = req.body;
  try {
    await db.saveTelemetry(telemetryData);
    console.log("Telemetry data saved successfully");
    res.status(201).json({ message: "Telemetry data saved successfully" });
  } catch (error) {
    console.error("Error saving telemetry");
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
