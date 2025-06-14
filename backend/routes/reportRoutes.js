const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// ✅ Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// ✅ Upload report route
router.post('/upload-report', upload.single('report'), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    res.json({ message: 'File uploaded successfully', filePath: `/uploads/${req.file.filename}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Upload failed' });
  }
});

module.exports = router;
