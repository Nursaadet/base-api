const user = require("../models/user.model");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  console.log(req.body);
  return res.json(req.body);
};
const register = async (req, res) => {
  const { email } = req.body;

  const userCheck = await user.findOne({ email });

  if (userCheck) {
    throw new Error("Girmiş olduğunuz mail kullanımda !", 401);
    console.log("Girmiş olduğunuz mail kullanımda !");
  }

  req.body.password = await bcrypt.hash(req.body.password, 10);

  console.log("hash şifre: ", req.body.password);

  try {
    const userSave = new user(req.body);
    await userSave
      .save()

      .then((response) => {
        return res.status(201).json({
          success: true,
          data: response,
          message: "Kullanıcı başarıyla oluşturuldu",
        });
      })
      .catch((err) => {
        return res.status(500).json({
          success: false,
          message: "Kullanıcı oluşturulamadı",
          error: err.message,
        });
      });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  login,
  register,
};
