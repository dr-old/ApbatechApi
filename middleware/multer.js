const moment = require("moment");
const multer = require("multer");
const uuid = require("uuid");
const path = require("path");
const helper = require("../utils/helper");

const upload = multer({
  storage: multer.diskStorage({
    destination: (request, file, callback) => {
      if (file.fieldname === "image") {
        callback(null, "./public/images");
      }
      // if (file.fieldname === "epod_url_pic") {
      //   callback(null, "./storage/images/epod-pics");
      // }
    },
    filename: (request, file, callback) => {
      if (file.fieldname === "image") {
        request.body.image = uuid.v4() + path.extname(file.originalname);
        callback(null, request.body.image);
      }
      // if (file.fieldname === "epod_url_pic") {
      //   request.body.epod_url_pic = uuid.v4() + path.extname(file.originalname);
      //   callback(null, request.body.epod_url_pic);
      // }
    },
  }),
});

upload.fileFilter = (request, file, callback) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    callback(null, true);

    return;
  }

  callback(new Error("Photo must be an image"));
};

upload.limits = {
  fileSize: 1024 * 1024,
};

const uploadFilter = (request, response, next) => {
  const uploaded = upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
  ]);

  uploaded(request, response, (err) => {
    if (err instanceof multer.MulterError) {
      return helper.response(response, 400, err.message);
    } else if (err) {
      return helper.response(response, 400, err.message);
    }

    next();
  });
};

module.exports = uploadFilter;
