const multer = require('multer');

// Multer memory storage configuration
const storage = multer.memoryStorage(); // Store files in memory instead of disk

// File filter to allow only specific image types (PNG, JPEG, JPG)
const fileFilter = (req, file, callback) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
    callback(null, true); // Accept the file
  } else {
    callback(null, false); // Reject the file
    return callback(new Error('Upload failed... only PNG, JPG, and JPEG formats are allowed'));
  }
};

// Multer configuration
const multerConfig = multer({
  storage, // Use memory storage instead of disk
  fileFilter, // Apply the file filter
});

module.exports = multerConfig;
