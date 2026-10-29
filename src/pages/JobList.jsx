import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getJobs, deleteJob, applyForJob, getCandidateById } from "../services/api";

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [experienceFilter, setExperienceFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  
  const navigate = useNavigate();

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    const data = await getJobs();
    setJobs(data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      await deleteJob(id);
      loadJobs(); 
    }
  };

  const handleApply = async (jobId) => {
    const candidateId = window.prompt("Enter your Candidate ID to apply (e.g., 1):");
    
    if (candidateId) {
      try {
        const candidate = await getCandidateById(candidateId);
        
        if (candidate && candidate.id) {
          const application = {
            jobId,
            candidateId,
            status: "Pending",
            appliedDate: new Date().toISOString().split("T")[0]
          };
          await applyForJob({ ...application, id: Date.now().toString() });
          alert("Successfully applied!");
        } else {
          alert("Candidate ID not found! Redirecting to registration page...");
          navigate("/candidates/new");
        }
      } catch (error) {
        alert("Candidate ID not found! Redirecting to registration page...");
        navigate("/candidates/new");
      }
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = search === "" || job.title.toLowerCase().includes(search.toLowerCase());
    const matchesLocation = locationFilter === "" || job.location.toLowerCase() === locationFilter.toLowerCase();
    const matchesExperience = experienceFilter === "" || job.experience === experienceFilter;
    const matchesRole = roleFilter === "" || job.title === roleFilter;
    
    return matchesSearch && matchesLocation && matchesExperience && matchesRole;
  });

  const uniqueLocations = [...new Set(jobs.map(job => job.location))];
  const uniqueExperiences = [...new Set(jobs.map(job => job.experience))];
  const uniqueRoles = [...new Set(jobs.map(job => job.title))]; 

  return (
    <div>
      <div className="header-bar">
        <h2>Job Listings</h2>
        <input 
          type="text" 
          className="search-input"
          placeholder="Search jobs by keyword..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      
      <div className="layout-split">
        
        <aside className="sidebar card">
          <h3>Filter Jobs</h3>
          
          <label>Location</label>
          <select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}>
            <option value="">All Locations</option>
            {uniqueLocations.map((loc, index) => <option key={index} value={loc}>{loc}</option>)}
          </select>

          <label>Experience</label>
          <select value={experienceFilter} onChange={(e) => setExperienceFilter(e.target.value)}>
            <option value="">Any Experience</option>
            {uniqueExperiences.map((exp, index) => <option key={index} value={exp}>{exp}</option>)}
          </select>

          <label>Role</label>
          <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
            <option value="">All Roles</option>
            {uniqueRoles.map((role, index) => <option key={index} value={role}>{role}</option>)}
          </select>
          
          <button className="outline" onClick={() => {
            setLocationFilter(""); setExperienceFilter(""); setRoleFilter(""); setSearch("");
          }}>
            Clear Filters
          </button>
        </aside>
        
        <main className="main-content">
          {filteredJobs.length === 0 ? (
            <div className="card text-center">
              <p>No jobs match your filter criteria.</p>
            </div>
          ) : (
            <ul>
              {filteredJobs.map(job => (
                <li key={job.id} className="job-item">
                  <div className="job-details">
                    <h3>{job.title}</h3>
                    <p>📍 {job.location} &nbsp;|&nbsp; 💼 {job.experience}</p>
                  </div>
                  
                  <div className="job-actions">
                    {/* NEW DETAILS BUTTON */}
                    <Link to={`/jobs/${job.id}`}>
                      <button className="outline" style={{ margin: 0 }}>Details</button>
                    </Link>
                    
                    <button style={{ margin: 0 }} onClick={() => handleApply(job.id)}>Apply Now</button>
                    
                    <Link to={`/jobs/edit/${job.id}`}>
                      <button className="info" style={{ margin: 0 }}>Edit</button>
                    </Link>
                    
                    <button className="danger" style={{ margin: 0 }} onClick={() => handleDelete(job.id)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </main>
      </div>
    </div>
  );
}