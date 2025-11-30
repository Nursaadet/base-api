const multer = require("multer");
const path = require("path");
const fs = require("fs");

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/jpg",
  ];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    cb(
      new Error("Invalid file type. Only JPEG, PNG, GIF, and JPG are allowed."),
      false
    );
  }
  cb(null, true);
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const rootDir = path.dirname(require.main.filename);
    fs.mkdirSync(path.join(rootDir, "/public/uploads"), { recursive: true });
    cb(null, path.join(rootDir, "/public/uploads"));
  },
  filename: (req, file, cb) => {
    const extension = file.mimetype.split("/")[1];

    if (!req.savedImages) req.savedImages = [];
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    let url = `image_${uniqueSuffix}.${extension}`;
    req.savedImages = [...req.savedImages, path.join(url)];
  },
});
