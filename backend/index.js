// const cors = require("cors"); //  npm install cors
const express = require("express");
const app = express();
const telemetryRouter = require("./routes/telemetry");

// app.use(
//     cors({
//       origin: clientRoute,
//       methods: "GET,HEAD,PUT,POST,DELETE",
//       credentials: true,
//     })
//   );

app.use(express.json());
app.use("/telemetry", telemetryRouter);
app.listen(3000);
