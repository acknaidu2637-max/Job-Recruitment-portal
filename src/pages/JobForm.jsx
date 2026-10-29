import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addJob, getJobById, updateJob } from "../services/api";

export default function JobForm() {
  const [job, setJob] = useState({ 
    title: "", 
    location: "", 
    experience: "", 
    companyName: "", 
    description: "" 
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getJobById(id).then(data => setJob(data));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!job.title || !job.location || !job.companyName) {
      setError("Title, Location, and Company Name are mandatory!");
      return;
    }

    if (id) {
      await updateJob(id, job);
    } else {
      await addJob({ ...job, id: Date.now().toString() });
    }
    navigate("/jobs");
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h2>{id ? "Edit Job" : "Post a Job"}</h2>
      {error && <p className="error-text" style={{ color: "red" }}>{error}</p>}
      
      <label>Job Title</label>
      <input 
        type="text" 
        placeholder="e.g., Frontend Developer" 
        value={job.title}
        onChange={(e) => setJob({...job, title: e.target.value})}
      />
      
      <label>Company Name </label>
      <input 
        type="text" 
        placeholder="e.g., L&T Tech Services " 
        value={job.companyName}
        onChange={(e) => setJob({...job, companyName: e.target.value})}
      />

      <label>Location</label>
      <input 
        type="text" 
        placeholder="e.g., Remote or Mumbai" 
        value={job.location}
        onChange={(e) => setJob({...job, location: e.target.value})}
      />
      
      <label>Experience</label>
      <input 
        type="text" 
        placeholder="Experience (e.g., 2-4 years)" 
        value={job.experience}
        onChange={(e) => setJob({...job, experience: e.target.value})}
      />

      <label>Job Description</label>
      <textarea 
        placeholder="Describe the role, responsibilities, and requirements..."
        value={job.description}
        onChange={(e) => setJob({...job, description: e.target.value})}
        rows="5"
        style={{ width: "100%", padding: "12px 15px", marginBottom: "18px", border: "1px solid var(--border-color)", borderRadius: "6px", fontFamily: "inherit" }}
      />
      
      <button type="submit" className="success">{id ? "Update Job" : "Post Job"}</button>
    </form>
  );
}