// server/server.js
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const { spawn } = require('child_process');
const cors = require('cors');
const applyRoute = require('./routes/applyRoute');
const path = require('path');
const app = express();
app.use(cors());
app.use(express.json());

// Multer setup for text file upload
const upload = multer({ dest: 'uploads/' });
const Job = require('./Job');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', applyRoute);
app.post('/api/jobs/post', async (req, res) => {
  try {
    const newJob = new Job(req.body);
    await newJob.save();
    res.status(201).json({ message: "Job saved to DB" });
  } catch (err) {
    res.status(500).json({ error: "Error saving job" });
  }
});
app.get('/api/jobs', async (req, res) => {
  try {
    const jobs = await Job.find(); 
    console.log("Fetched from DB:", jobs);
    res.json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/job_recommender', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB connected");
});

app.post('/api/recommend', upload.single('resume'), (req, res) => {
  const resumePath = req.file.path;

  fs.readFile(resumePath, 'utf8', (err, resumeText) => {
    if (err) return res.status(500).send('Error reading file.');

    const python = spawn('python', ['ml_model/recommender.py']);

    let result = '';
    python.stdout.on('data', (data) => {
      result += data.toString();
    });

    python.stderr.on('data', (data) => {
      console.error('Python Error:', data.toString());
    });

    python.on('close', () => {
      res.send(JSON.parse(result));
    });

    python.stdin.write(resumeText);
    python.stdin.end();
  });
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
