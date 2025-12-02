const router = require("express").Router();
const multer = require("multer");
const upload = require("../middlewares/lib/upload");
const auth = require("./auth.routes");
const { Response } = require("../utils/response");
const { APIError } = require("../utils/errors");

router.use(auth);

router.post("/upload", function (req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError)
      throw new APIError("A Multer error occurred when uploading : ", err);
    else if (err) throw new APIError("A error occurred when uploading : ", err);
    else return new Response(req.savedImages, "Yükleme başarılı").success(res);
  });
});

module.exports = router;
