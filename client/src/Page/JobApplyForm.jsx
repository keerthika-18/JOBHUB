import React, { useState } from 'react';
import './JobApplyForm.css'; // Import CSS file
import { useParams } from 'react-router-dom';

const JobApplyForm = () => {
  const { jobId } = useParams(); // Get jobId from URL
  const [form, setForm] = useState({
    name: '',
    email: '',
    resume: null,
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('jobId', jobId);
    formData.append('name', form.name);
    formData.append('email', form.email);
    formData.append('resume', form.resume);

    try {
      const res = await fetch('http://localhost:5000/api/apply', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        setSuccess(true);
        setForm({ name: '', email: '', resume: null });

        setTimeout(() => {
          setSuccess(false);
        }, 3000); // Hide success after 3s
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="apply-container">
      <h2>Apply for this Job</h2>
      <form onSubmit={handleSubmit} className="apply-form" encType="multipart/form-data">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="file"
          name="resume"
          required
          onChange={handleChange}
        />
        <button type="submit">Submit Application</button>
      </form>
      {success && <div className="success-popup">✅ Application Submitted Successfully!</div>}
    </div>
  );
};

export default JobApplyForm;
