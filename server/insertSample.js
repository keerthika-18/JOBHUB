const mongoose = require('mongoose');
const Job = require('./Job');

mongoose.connect('mongodb://localhost:27017/job_recommender', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  await Job.create({
    jobTitle: 'Test Developer',
    experience: '2 years',
    location: 'Remote',
    company: 'Test Co',
    createdAt: new Date()
  });
  console.log('Test job inserted');
  process.exit();
});