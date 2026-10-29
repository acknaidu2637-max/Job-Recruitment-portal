import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getCandidateById } from "../services/api";

export default function CandidateDetails() {
  const { id } = useParams();
  const [candidate, setCandidate] = useState(null);

  useEffect(() => {
    getCandidateById(id).then(setCandidate).catch(() => setCandidate(null));
  }, [id]);

  if (!candidate) return <p className="text-center">Loading profile...</p>;

  return (
    <div className="card profile-card">
      <div className="profile-header">
        <h2>{candidate.name}</h2>
        <span className="badge id">ID: {candidate.id}</span>
      </div>
      
      <div className="profile-contact">
        <p><span>📧</span> {candidate.email}</p>
        <p><span>🛠️</span> {candidate.skills}</p>
      </div>
      
      <hr />
      
      {candidate.hasExperience === "yes" ? (
        <div className="profile-section">
          <p className="section-label">💼 Work Experience</p>
          <p className="section-data">
            {candidate.years} years at {candidate.company} in {candidate.field}
          </p>
        </div>
      ) : (
        <div className="profile-section">
          <p className="section-label">🎓 Education</p>
          <p className="section-data">
            {candidate.education || "Fresher - No degree specified"}
          </p>
        </div>
      )}
      
      <div className="profile-footer">
        <Link to="/applications">
          <button className="outline">← Back to Applications</button>
        </Link>
      </div>
    </div>
  );
}