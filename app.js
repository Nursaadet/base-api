const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5001;

app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})