const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log("fetching telemetry...");
  res.status(200).json({ results: "ok" });
});

router.post("/", (req, res) => {
  console.log("saving new telemetry...");
  //   const { telemetry } = req.body;
  res.status(200).json({ results: "ok" });
});

module.exports = router;
