import React, { useState } from "react";
import "./JobForm.css";

const JobForm = () => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    experience: "",
    qualifications: "",
    salaryRange: "",
    location: "",
    country: "",
    workType: "",
    companySize: "",
    jobPostingDate: new Date().toISOString().split("T")[0],
    preference: "",
    contactPerson: "",
    contact: "",
    role: "",
    jobPortal: "",
    jobDescription: "",
    benefits: "",
    skills: "",
    responsibilities: "",
    company: "",
    companyProfile: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/jobs/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Job posted successfully!");
      setFormData({ ...formData, jobTitle: "" }); // reset some fields if needed
    } else {
      alert("Failed to post job.");
    }
  };

  return (
    <form className="job-form" onSubmit={handleSubmit}>
      <h2>Post a New Job</h2>

      <label>Job Title</label>
      <input name="jobTitle" value={formData.jobTitle} onChange={handleChange} required />

      <label>Experience</label>
      <input name="experience" value={formData.experience} onChange={handleChange} />

      <label>Qualifications</label>
      <input name="qualifications" value={formData.qualifications} onChange={handleChange} />

      <label>Salary Range</label>
      <input name="salaryRange" value={formData.salaryRange} onChange={handleChange} />

      <label>Location</label>
      <input name="location" value={formData.location} onChange={handleChange} />

      <label>Country</label>
      <input name="country" value={formData.country} onChange={handleChange} />

      <label>Work Type</label>
      <input name="workType" value={formData.workType} onChange={handleChange} />

      <label>Company Size</label>
      <input name="companySize" value={formData.companySize} onChange={handleChange} />

      <label>Job Posting Date</label>
      <input type="date" name="jobPostingDate" value={formData.jobPostingDate} onChange={handleChange} />

      <label>Preference</label>
      <input name="preference" value={formData.preference} onChange={handleChange} />

      <label>Contact Person</label>
      <input name="contactPerson" value={formData.contactPerson} onChange={handleChange} />

      <label>Contact</label>
      <input name="contact" value={formData.contact} onChange={handleChange} />

      <label>Role</label>
      <input name="role" value={formData.role} onChange={handleChange} />

      <label>Job Portal</label>
      <input name="jobPortal" value={formData.jobPortal} onChange={handleChange} />

      <label>Job Description</label>
      <textarea name="jobDescription" value={formData.jobDescription} onChange={handleChange} />

      <label>Benefits</label>
      <textarea name="benefits" value={formData.benefits} onChange={handleChange} />

      <label>Skills (comma-separated)</label>
      <input name="skills" value={formData.skills} onChange={handleChange} />

      <label>Responsibilities</label>
      <textarea name="responsibilities" value={formData.responsibilities} onChange={handleChange} />

      <label>Company</label>
      <input name="company" value={formData.company} onChange={handleChange} />

      <label>Company Profile</label>
      <textarea name="companyProfile" value={formData.companyProfile} onChange={handleChange} />

      <button type="submit">Post Job</button>
    </form>
  );
};

export default JobForm;
