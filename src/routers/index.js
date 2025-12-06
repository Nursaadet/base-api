const router = require("express").Router();
const multer = require("multer");
const upload = require("../middlewares/lib/upload");
const { Response } = require("../utils/response");
const { APIError } = require("../utils/errors");

const auth = require("../app/auth/router");
const user = require("../app/users/router");

router.use(auth);
router.use(user);

router.post("/upload", function (req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError)
      throw new APIError("A Multer error occurred when uploading : ", err);
    else if (err) throw new APIError("A error occurred when uploading : ", err);
    else return new Response(req.savedImages, "Yükleme başarılı").success(res);
  });
});

module.exports = router;
