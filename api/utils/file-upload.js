const multer = require('multer');
const path = require('path');
const fs = require('fs');

class FileUploadUtil {
  // Constructor for initialization
  constructor(uploadDir = 'uploads') {
    this.uploadDir = uploadDir;
    this.ensureUploadDirExists();
  }

  // Ensure the upload directory exists
  ensureUploadDirExists() {
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  // Set up multer storage engine
  getStorageEngine() {
    return multer.diskStorage({
      destination: (req, file, next) => {
        next(null, this.uploadDir);  // Destination folder for uploads
      },
      filename: (req, file, next) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        next(null, `${uniqueSuffix}${path.extname(file.originalname)}`);  // Unique filename
      }
    });
  }

  // Set up multer upload middleware
  getUploader() {
    return multer({
      storage: this.getStorageEngine(),
      limits: { fileSize: 10 * 1024 * 1024 },  // 10 MB size limit
      fileFilter: (req, file, next) => {
        this.fileFilter(req, file, next);
      }
    });
  }

  // Optional file filter (can customize to allow only specific file types)
  fileFilter(req, file, next) {
    const allowedFileTypes = /jpeg|jpg|png/;  // Allowed extensions
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedFileTypes.test(file.mimetype);

    if (mimetype && extname) {
      return next(null, true);
    } else {
      next(new Error('Only images and PDFs are allowed!'), false);
    }
  }
}

module.exports = FileUploadUtil;
