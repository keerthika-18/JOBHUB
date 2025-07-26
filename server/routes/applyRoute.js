const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/resumes'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

router.post('/apply', upload.single('resume'), (req, res) => {
  const { name, email, jobId } = req.body;
  const resumePath = req.file.path;

  // Store to DB (Optional) or log
  console.log("Application received:", { name, email, jobId, resumePath });

  res.status(200).json({ message: 'Application submitted successfully' });
});

module.exports = router;
