const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const storage = multer.memoryStorage();

exports.uploads = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.split("/")[0] == "image") {
      cb(null, true);
    } else {
      cb("Invalid file Please upload image", false);
    }
  },
});

exports.resize = (fileService) => async (req, res, next) => {
  if (!req.file) return next();
  let fileName;
  if (fileService == "cabin") {
    fileName = `cabin-${uuidv4()}.jpeg`;
    await sharp(req.file.buffer)
      .resize(2000, 1333)
      .toFormat("jpeg")
      .jpeg({ quality: 100 })
      .toFile(`${__dirname}/../public/img/cabins/${fileName}`);
    req.body.image = fileName;
  } else {
    fileName = `user-${uuidv4()}.jpeg`;
    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat("jpeg")
      .jpeg({ quality: 80 })
      .toFile(`${__dirname}/../public/img/users/${fileName}`);

    req.body.avatar = fileName;
  }
  next();
};
