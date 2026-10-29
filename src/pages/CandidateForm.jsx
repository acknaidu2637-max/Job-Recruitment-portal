import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addCandidate } from "../services/api";

export default function CandidateForm() {
  const [candidate, setCandidate] = useState({ 
    name: "", email: "", skills: "", hasExperience: "no", company: "", years: "", field: "", education: ""
  });
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addCandidate({ ...candidate, id: Date.now().toString() });
    navigate("/candidates");
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h2>Candidate Registration</h2>
      
      <label>Full Name</label>
      <input type="text" required value={candidate.name} onChange={(e) => setCandidate({...candidate, name: e.target.value})} />
      
      <label>Email Address</label>
      <input type="email" required value={candidate.email} onChange={(e) => setCandidate({...candidate, email: e.target.value})} />
      
      <label>Skills</label>
      <input type="text" required value={candidate.skills} onChange={(e) => setCandidate({...candidate, skills: e.target.value})} />

      <div className="toggle-box card">
        <p>Do you have work experience?</p>
        <label>
          <input type="radio" name="experience" value="yes" checked={candidate.hasExperience === "yes"} onChange={() => setCandidate({...candidate, hasExperience: "yes"})} /> Yes
        </label>
        <label>
          <input type="radio" name="experience" value="no" checked={candidate.hasExperience === "no"} onChange={() => setCandidate({...candidate, hasExperience: "no"})} /> No (Fresher)
        </label>
      </div>

      {candidate.hasExperience === "yes" ? (
        <div className="conditional-box">
          <h4>Experience Details</h4>
          <label>Company Name</label>
          <input type="text" required={candidate.hasExperience === "yes"} value={candidate.company} onChange={(e) => setCandidate({...candidate, company: e.target.value})} />
          <label>Number of Years</label>
          <input type="number" required={candidate.hasExperience === "yes"} value={candidate.years} onChange={(e) => setCandidate({...candidate, years: e.target.value})} />
          <label>Field</label>
          <input type="text" required={candidate.hasExperience === "yes"} value={candidate.field} onChange={(e) => setCandidate({...candidate, field: e.target.value})} />
        </div>
      ) : (
        <div className="conditional-box">
          <h4>Education Details</h4>
          <label>Highest Degree & University</label>
          <input type="text" required={candidate.hasExperience === "no"} value={candidate.education} onChange={(e) => setCandidate({...candidate, education: e.target.value})} />
        </div>
      )}

      <button type="submit">Register Profile</button>
    </form>
  );
}