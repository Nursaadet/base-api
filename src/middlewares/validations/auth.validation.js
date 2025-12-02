const joi = require("joi");
const APIError = require("../../utils/errors");

class AuthValidation {
  constructor() {}
  static register = async (req, res, next) => {
    try {
      await joi
        .object({
          name: joi.string().trim().min(3).max(40).required().messages({
            "string.base": "İsim alanı metin olmalıdır",
            "string.empty": "İsim alanı boş bırakılamaz",
            "string.min": "İsim alanı en az 3 karakter olmalıdır",
            "string.max": "İsim alanı en fazla 40 karakter olmalıdır",
            "any.required": "İsim alanı zorunludur",
          }),
          lastName: joi.string().trim().min(3).max(50).required().messages({
            "string.base": "Soyad alanı metin olmalıdır",
            "string.empty": "Soyad alanı boş bırakılamaz",
            "string.min": "Soyad alanı en az 3 karakter olmalıdır",
            "string.max": "Soyad alanı en fazla 50 karakter olmalıdır",
            "any.required": "Soyad alanı zorunludur",
          }),
          email: joi
            .string()
            .email()
            .trim()
            .min(3)
            .max(50)
            .required()
            .messages({
              "string.base": "Email alanı metin olmalıdır",
              "string.empty": "Email alanı boş bırakılamaz",
              "string.min": "Email alanı en az 3 karakter olmalıdır",
              "string.email": "Lütfen geçerli bir email adresi giriniz",
              "string.max": "Email alanı en fazla 50 karakter olmalıdır",
              "any.required": "Email alanı zorunludur",
            }),
          password: joi.string().trim().min(7).max(40).required().messages({
            "string.base": "Password alanı metin olmalıdır",
            "string.empty": "Password alanı boş bırakılamaz",
            "string.min": "Password alanı en az 7 karakter olmalıdır",
            "string.max": "Password alanı en fazla 40 karakter olmalıdır",
            "any.required": "Password alanı zorunludur",
          }),
        })
        .validateAsync(req.body, { abortEarly: false });

      next();
    } catch (error) {
      if (error.details && error.details[0] && error.details[0].message) {
        throw new APIError(error.details[0].message, 400);
      } else {
        throw new APIError("Geçersiz kayıt bilgileri", 400);
      }
    }
  };
  static login = async (req, res, next) => {
    try {
      await joi
        .object({
          email: joi
            .string()
            .email()
            .trim()
            .min(3)
            .max(50)
            .required()
            .messages({
              "string.base": "Email alanı metin olmalıdır",
              "string.empty": "Email alanı boş bırakılamaz",
              "string.min": "Email alanı en az 3 karakter olmalıdır",
              "string.email": "Lütfen geçerli bir email adresi giriniz",
              "string.max": "Email alanı en fazla 50 karakter olmalıdır",
              "any.required": "Email alanı zorunludur",
            }),
          password: joi.string().trim().min(7).max(40).required().messages({
            "string.base": "Password alanı metin olmalıdır",
            "string.empty": "Password alanı boş bırakılamaz",
            "string.min": "Password alanı en az 7 karakter olmalıdır",
            "string.max": "Password alanı en fazla 40 karakter olmalıdır",
            "any.required": "Password alanı zorunludur",
          }),
        })
        .validateAsync(req.body, { abortEarly: false });
    } catch (error) {
      if (error.details && error.details[0] && error.details[0].message) {
        throw new APIError(error.details[0].message, 400);
      } else {
        throw new APIError("Geçersiz kayıt bilgileri", 400);
      }
    }
    next();
  };
}

module.exports = AuthValidation;
