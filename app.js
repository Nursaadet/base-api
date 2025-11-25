const express = require("express");
const app = express();
require("dotenv").config();
require("./src/db/dbConnection");
const port = process.env.PORT || 5001;
const router = require("./src/routers");

//middlewares
app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ extended: true, limit: "50mb", parameterLimit: 50000 })
);



app.use("/api", router);

app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
