import multer from "multer";

const imageFilter = (req, file, cb) => {
  // Array of allowed files
  const array_of_allowed_files = ["png", "jpg"];
  const array_of_allowed_file_types = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
  // Get the extension of the uploaded file
  const file_extension = file.originalname.slice(((file.originalname.lastIndexOf(".") - 1) >>> 0) + 2);

  // Check if the uploaded file is allowed
  if (!array_of_allowed_files.includes(file_extension) || !array_of_allowed_file_types.includes(file.mimetype)) {
    cb(null, false);
    return cb(new Error("Only .png and .jpg format allowed!"));
  }
  cb(null, true);
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const maxSize = 5 * 1024 * 1024; // for 5MB

export const upload = multer({
  storage: storage,
  fileFilter: imageFilter,
  limits: { fileSize: maxSize },
});
