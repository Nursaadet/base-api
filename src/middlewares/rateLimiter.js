const rateLimit = require("express-rate-limit");
const allowList = ["::1"];
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: (req, res) => {
    console.log("api url:", req.url);
    console.log("api ip:", req.ip);
    if (req.url === "/login" || req.url === "/register") return 3;
    else return 6;
  },
  message: {
    success: false,
    message: "Too many requests from this IP",
  },
  //   skip: (req, res) => allowList.includes(req.ip),
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = apiLimiter;
