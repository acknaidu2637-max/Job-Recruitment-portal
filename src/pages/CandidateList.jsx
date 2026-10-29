import { useState, useEffect } from "react";
import { getCandidates } from "../services/api";

export default function CandidateList() {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    getCandidates().then(setCandidates);
  }, []);

  return (
    <div>
      <h2>Registered Candidates</h2>
      
      {candidates.length === 0 ? (
        <p>No candidates registered yet.</p>
      ) : (
        <ul>
          {candidates.map(candidate => (
            <li key={candidate.id}>
              
              <div className="list-header">
                <h3>{candidate.name}</h3>
                <span className="badge id">ID: {candidate.id}</span>
              </div>
              
              <div className="list-contact">
                <span>📧 {candidate.email}</span>
                <span>🛠️ {candidate.skills}</span>
              </div>
              
              <hr />
              
              {candidate.hasExperience === "yes" ? (
                <p>
                  💼 <strong>Experience:</strong> {candidate.years} years at {candidate.company} in {candidate.field}
                </p>
              ) : (
                <p>
                  🎓 <strong>Education:</strong> {candidate.education || "Fresher - No degree specified"}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}