import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 Import useNavigate
import './JobList.css';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [expandedJobId, setExpandedJobId] = useState(null);
  const navigate = useNavigate(); // 👈 Init navigate

  useEffect(() => {
    fetch("http://localhost:5000/api/jobs")
      .then(res => res.json())
      .then(data => setJobs(data))
      .catch(err => console.error(err));
  }, []);

  const isNewJob = (createdAt) => {
    const postedTime = new Date(createdAt);
    const now = new Date();
    const diffInMinutes = (now - postedTime) / (1000 * 60);
    return diffInMinutes <= 5;
  };

  const toggleDetails = (id) => {
    setExpandedJobId(prev => (prev === id ? null : id));
  };

  const handleApply = (jobId) => {
    navigate(`/apply/${jobId}`); // 👈 Navigate to JobApplyForm
  };

  return (
    <div className="job-list">
      <h2>Available Jobs</h2>
      {jobs.map(job => (
        <div key={job._id} className="job-card" onClick={() => toggleDetails(job._id)}>
          <div className="job-header">
            <h3>{job.jobTitle}</h3>
            <p>{job.company} - {job.location}</p>
            <p><strong>Experience:</strong> {job.experience}</p>
            {isNewJob(job.createdAt) && <span className="new-tag">New</span>}
          </div>

          {expandedJobId === job._id && (
            <div className="job-details">
              <p><strong>Role:</strong> {job.role}</p>
              <p><strong>Salary:</strong> {job.salaryRange}</p>
              <p><strong>Skills:</strong> {job.skills}</p>
              <p><strong>Description:</strong> {job.jobDescription}</p>
              <p><strong>Responsibilities:</strong> {job.responsibilities}</p>
              <p><strong>Contact:</strong> {job.contactPerson} - {job.contact}</p>
              <button className="apply-btn" onClick={(e) => {
                e.stopPropagation(); // 👈 prevent toggling details
                handleApply(job._id);
              }}>
                Apply
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default JobList;
