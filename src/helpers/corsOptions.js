const whiteList = ["httpp://localhost:3000"];

const corsOptions = (req, callback) => {
  let corsOptions;
  console.log(req.header("Origin"));
  if (whiteList.indexOf(req.header("Origin")) !== -1) {
    console.log("if içerisinde");
    corsOptions = { origin: true };
  } else {
    console.log("else içerisinde");
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};
module.exports = corsOptions;
