const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  jobId: String,
  experience: String,
  qualifications: String,
  salaryRange: String,
  location: String,
  country: String,
  latitude: Number,
  longitude: Number,
  workType: String,
  companySize: String,
  jobPostingDate: Date,
  preference: String,
  contactPerson: String,
  contact: String,
  jobTitle: String,
  role: String,
  jobPortal: String,
  jobDescription: String,
  benefits: String,
  skills: String,
  responsibilities: String,
  company: String,
  companyProfile: String,
   createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Job', JobSchema);
