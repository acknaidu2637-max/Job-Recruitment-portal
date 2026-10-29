import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getJobById, getHirers } from "../services/api";

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [hrInfo, setHrInfo] = useState(null);

  useEffect(() => {
    loadJobDetails();
  }, [id]);

  const loadJobDetails = async () => {
    try {
      // 1. Fetch the specific job
      const jobData = await getJobById(id);
      setJob(jobData);

      // 2. Fetch all registered hirers
      const allHirers = await getHirers();
      
      // 3. Find the HR person whose company matches the job's company name
      const matchingHr = allHirers.find(
        (hirer) => hirer.companyName.toLowerCase() === jobData.companyName.toLowerCase()
      );
      
      if (matchingHr) {
        setHrInfo(matchingHr);
      }
    } catch (error) {
      console.error("Error loading job details:", error);
    }
  };

  if (!job) return <p style={{ textAlign: "center", color: "#666" }}>Loading job details...</p>;

  return (
    <div className="card profile-card" style={{ maxWidth: "700px", margin: "0 auto", background: "white" }}>
      
      <div className="profile-header">
        <h2 style={{ color: "var(--primary-color)", margin: 0, fontSize: "28px" }}>{job.title}</h2>
        <span className="badge id">Job ID: {job.id}</span>
      </div>
      
      <div className="profile-contact" style={{ marginTop: "15px" }}>
        <p><span>📍</span> <strong>Location:</strong> {job.location}</p>
        <p><span>💼</span> <strong>Experience:</strong> {job.experience}</p>
      </div>
      
      <hr />
      
      {/* NEW: Dynamic HR & Company Profile Box */}
      <div style={{ backgroundColor: "#f9fbfb", padding: "20px", borderRadius: "8px", border: "1px solid #eaeaea", marginBottom: "25px" }}>
        <p className="section-label" style={{ color: "#0056b3", marginBottom: "12px" }}>🏢 Company & HR Details</p>
        <p className="section-data" style={{ marginBottom: "8px" }}><strong>Company:</strong> {job.companyName}</p>
        
        {hrInfo ? (
          <>
            <p className="section-data" style={{ marginBottom: "8px" }}><strong>HR Contact:</strong> {hrInfo.fullName}</p>
            <p className="section-data" style={{ marginBottom: "8px" }}><strong>Contact Email:</strong> <a href={`mailto:${hrInfo.email}`} style={{ color: "#17a2b8", textDecoration: "none" }}>{hrInfo.email}</a></p>
            {hrInfo.companyWebsite && (
              <p className="section-data">
                <strong>Website:</strong> <a href={hrInfo.companyWebsite} target="_blank" rel="noreferrer" style={{ color: "#17a2b8", textDecoration: "none" }}>{hrInfo.companyWebsite}</a>
              </p>
            )}
          </>
        ) : (
          <p className="section-data" style={{ color: "#888", fontSize: "14px", fontStyle: "italic" }}>
            *Detailed HR contact info is not available for this company in the database.*
          </p>
        )}
      </div>
      
      <div className="profile-section">
        <p className="section-label">Job Description</p>
        <p className="section-data" style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}>
          {job.description || "No detailed description provided for this role."}
        </p>
      </div>
      
      <div className="profile-footer">
        <Link to="/jobs">
          <button className="outline">← Back to Job Board</button>
        </Link>
      </div>
      
    </div>
  );
}