const jwt = require("jsonwebtoken");
const APIError = require("../units/errors");

const createToken = async (user, res) => {
  const payload = {
    sub: user._id,
    name: user.name,
  };
  const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    algorithm: "HS512",
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return res.status(201).json({
    success: true,
    token,
    message: "Giriş başarılı",
  });
};

const tokenCheck = async (req, res, next) => {
  const headerToken =
    req.headers.authorization.startsWith("Bearer") && req.headers.authorization;
  if (!headerToken) {
    throw new APIError("Lütfen oturum açın", 401);
  }
};

module.exports = {
  createToken,
};
