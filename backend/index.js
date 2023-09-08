const cors = require("cors");
const db = require("./database/access");
const express = require("express");
const app = express();
const telemetryRouter = require("./routes/telemetry");
require("dotenv").config();

const allowedOrigins = [
  process.env.FRONTEND_DEV_URL,
  process.env.FRONTEND_PROD_URL,
];

app.use(
  cors({
    origin: (origin, callback) => {
      console.log("Request from origin:", origin);
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        console.warn("Not allowed origin:", origin);
      }
    },
  })
);

const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use("/telemetry", telemetryRouter);
app.listen(PORT);

db.testConnection();
