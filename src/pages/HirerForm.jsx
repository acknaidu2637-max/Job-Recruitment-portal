import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addHirer } from "../services/api";

export default function HirerForm() {
  const [hirer, setHirer] = useState({ 
    fullName: "", 
    email: "", 
    companyName: "",
    companyWebsite: ""
  });
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addHirer({ ...hirer, id: Date.now().toString() });
    alert("Company profile registered successfully! Let's post your first job.");
    navigate("/jobs/new"); 
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="card">
        <h2>🏢 Hirer Registration</h2>
        <p>Create your company profile to start posting jobs.</p>
        
        <label>Full Name (HR / Recruiter)</label>
        <input 
          type="text" 
          placeholder="e.g., John Smith" 
          required
          value={hirer.fullName}
          onChange={(e) => setHirer({...hirer, fullName: e.target.value})}
        />

        <label>Official Email</label>
        <input 
          type="email" 
          placeholder="hr@company.com" 
          required
          value={hirer.email}
          onChange={(e) => setHirer({...hirer, email: e.target.value})}
        />

        <label>Company Name</label>
        <input 
          type="text" 
          placeholder="e.g., L&T Technology Services" 
          required
          value={hirer.companyName}
          onChange={(e) => setHirer({...hirer, companyName: e.target.value})}
        />

        <label>Company Website (Optional)</label>
        <input 
          type="url" 
          placeholder="https://www.company.com" 
          value={hirer.companyWebsite}
          onChange={(e) => setHirer({...hirer, companyWebsite: e.target.value})}
        />

        <button type="submit" className="success">
          Register Company & Post Job
        </button>
      </form>
    </div>
  );
}