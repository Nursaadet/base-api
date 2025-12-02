const express = require("express");
const app = express();
require("dotenv").config();
require("./src/db/dbConnection");
const port = process.env.PORT || 5001;
const router = require("./src/routers");
const errorHandlerMiddleware = require("./src/middlewares/errorHandler");
const cors = require("cors");
const corsOptions = require("./src/helpers/corsOptions");
const mongoSanitize = require("mongo-sanitize");
const Path = require("path");
const apiLimiter = require("./src/middlewares/rateLimiter");
const moment = require("moment-timezone")
moment.tz.setDefault("Europe/Istanbul")

// Middlewares
app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ extended: true, limit: "50mb", parameterLimit: 50000 })
);

// STATIC DOSYALAR
app.use(express.static(Path.join(__dirname, "public")));
app.use("/uploads", express.static(Path.join(__dirname, "public/uploads")));

// CORS
app.use(cors(corsOptions));

app.use("/api", apiLimiter)

// MONGO SANITIZE
app.use((req, res, next) => {
  req.body = mongoSanitize(req.body);
  req.query = mongoSanitize(req.query);
  req.params = mongoSanitize(req.params);
  next();
});

// ROUTER
app.use("/api", router);

app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

// ERROR HANDLER
app.use(errorHandlerMiddleware);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
