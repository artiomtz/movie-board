// const cors = require("cors"); //  npm install cors
const db = require("./database/access");
const express = require("express");
const app = express();
const telemetryRouter = require("./routes/telemetry");
require("dotenv").config();

// app.use(
//     cors({
//       origin: clientRoute,
//       methods: "GET,HEAD,PUT,POST,DELETE",
//       credentials: true,
//     })
//   );

const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use("/telemetry", telemetryRouter);
app.listen(PORT);

db.testConnection();
