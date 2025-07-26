import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Page/Home";
import ResumeRecommend from "./Page/ResumeRecommend";
import PostJob from "./Page/PostJob";
import JobList from "./Page/JobList";
import JobApplyForm from './Page/JobApplyForm';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply/:jobId" element={<JobApplyForm />} />
        <Route path="/recommend" element={<ResumeRecommend />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/job-list" element={<JobList />} />
      </Routes>
    </Router>
  );
}
