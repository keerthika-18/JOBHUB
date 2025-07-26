import { useState } from "react";
import axios from "axios";
import "./ResumeRecommend.css"; // Custom CSS file

export default function ResumeRecommend() {
  const [file, setFile] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [expandedJob, setExpandedJob] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await axios.post("http://localhost:5000/api/recommend", formData);
      setJobs(res.data);
    } catch (err) {
      console.error("Upload error", err);
    }
  };

  const toggleExpand = (index) => {
    setExpandedJob(expandedJob === index ? null : index);
  };

  return (
    <div className="recommend-container">
      
      <h2 className="title">Upload Resume for Job Recommendations</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} className="file-input" />
      <button onClick={handleUpload} className="upload-button">Upload</button>

      {jobs.length > 0 && (
        <div className="jobs-list">
          <h3 className="subtitle">Recommended Jobs:</h3>
          {jobs.map((job, i) => (
            <div key={i} className="job-card" onClick={() => toggleExpand(i)}>
              <div className="job-header">
                <h4 className="job-title">{job["Job Title"]}</h4>
                <p className="company">{job["Company"]}</p>
                <p className="match">Match: {(job.similarity_score * 100).toFixed(2)}%</p>
              </div>
              {expandedJob === i && (
                <div className="job-details">
                  <p><strong>Location:</strong> {job["Location"]}</p>
                  <p><strong>Salary:</strong> {job["Salary Range"]}</p>
                  <p><strong>Experience:</strong> {job["Experience"]}</p>
                  <p><strong>Skills:</strong> {job["Skills"]}</p>
                  <p><strong>Description:</strong> {job["Job Description"]}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      <div className="about-box">
  <h3>About CareerPath AI</h3>
  <p>
    CareerPath AI uses cutting-edge AI to match your resume with the best-fitting job opportunities.
    Whether you're a fresher or an experienced professional, we help you find where your skills shine best.
    Just upload your resume and get instant smart recommendations.
  </p>
</div>


    </div>
  );
}
