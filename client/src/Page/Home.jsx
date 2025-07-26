import React from 'react';
import './Home.css';
import jobImage from 'C:\\Users\\Keethika P\\job-recommendation-system\\client\\src\\assests\\image_job.jpg'; // Make sure the image path is correct


const Home = () => {
  return (
    <div className="pagewrapper">
    <div className="home-container">
      {/* Hero Section */}
      <section className="home-hero">
        <div className="text-section">
          <h1>Welcome to CareerPath AI</h1>
          <p className="intro">
            Get personalized job recommendations based on your resume and career goals.
          </p>
          <p className="details">
            Our intelligent system analyzes your skills and preferences to match you with the right opportunities.
          </p>
          <button className="start-button">Get Started</button>
        </div>
        <div className="image-section">
          <img src={jobImage} alt="Job Recommendation" />
        </div>
      </section>

      {/* Why Use Us */}
      <section className="why-section">
        <h2>Why Use CareerPath AI?</h2>
        <ul>
          <li>✅ Personalized job matching using AI</li>
          <li>✅ Saves time compared to manual searching</li>
          <li>✅ Increases your chances of getting hired</li>
          <li>✅ Tailored suggestions based on your resume</li>
        </ul>
      </section>

      {/* How It Works */}
      <section className="how-section">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <span>1</span>
            <p>Upload your resume</p>
          </div>
          <div className="step">
            <span>2</span>
            <p>Our system analyzes your profile</p>
          </div>
          <div className="step">
            <span>3</span>
            <p>We recommend the most relevant jobs</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <h2>What Users Say</h2>
        <div className="testimonial-cards">
          <div className="card">
            <p>"I found my dream job in just a week!"</p>
            <h4>- Priya R, Data Analyst</h4>
          </div>
          <div className="card">
            <p>"CareerPath AI saved me hours of job searching."</p>
            <h4>- Arjun M, Software Developer</h4>
          </div>
        </div>
      </section>
 </div>
      {/* Footer */}
      <footer className="footer">
        <p>© 2025 CareerPath AI | Contact: support@careerpath.ai</p>
      </footer>
   
    </div>
  );
};

export default Home;
