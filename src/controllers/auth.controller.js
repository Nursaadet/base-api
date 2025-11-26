const user = require("../models/user.model");
const bcrypt = require("bcrypt");
const { Response } = require("../units/response");
const APIError = require("../units/errors");

const login = async (req, res) => {
  console.log(req.body);
  return res.json(req.body);
};
const register = async (req, res) => {
  const { email } = req.body;

  const userCheck = await user.findOne({ email });

  if (userCheck) {
    throw new APIError("Girmiş olduğunuz mail kullanımda !", 401);
    console.log("Girmiş olduğunuz mail kullanımda !");
  }

  req.body.password = await bcrypt.hash(req.body.password, 10);

  console.log("hash şifre: ", req.body.password);

  const userSave = new user(req.body);
  await userSave
    .save()

    .then((data) => {
      return new Response(data, "Kullanıcı başarıyla oluşturuldu").created(res);
    })
    .catch((err) => {
      throw new APIError("Kullanıcı oluşturulurken bir hata oluştu", 400);
    });
};
module.exports = {
  login,
  register,
};
