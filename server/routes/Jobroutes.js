const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Save posted jobs to local JSON or database
router.post('/', (req, res) => {
  const newJob = { ...req.body, postedAt: new Date() };

  // For demo: Append to a JSON file
  const filePath = path.join(__dirname, '../data/jobs.json');

  let jobs = [];
  if (fs.existsSync(filePath)) {
    const raw = fs.readFileSync(filePath);
    jobs = JSON.parse(raw);
  }

  jobs.push(newJob);
  fs.writeFileSync(filePath, JSON.stringify(jobs, null, 2));

  res.status(201).json({ message: "Job posted successfully", job: newJob });
});

module.exports = router;
