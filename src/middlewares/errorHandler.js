const APIError = require("../units/errors");

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof APIError) {
    return res.status(err.statusCode || 400).json({
      success: false,
      message: err.message || "Bir hata oluştu",
    });
  }
  return res.status(500).json({
    success: false,
    message: "Api tarafında bir hata oluştu",
  });
};

module.exports = errorHandlerMiddleware;
