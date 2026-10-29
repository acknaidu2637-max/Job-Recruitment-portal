import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getApplications, updateApplicationStatus, getJobs, getCandidates } from "../services/api";

export default function ApplicationList() {
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [appsData, jobsData, candidatesData] = await Promise.all([
      getApplications(), getJobs(), getCandidates()
    ]);
    setApplications(appsData);
    setJobs(jobsData);
    setCandidates(candidatesData);
  };

  const handleStatusChange = async (app, newStatus) => {
    const updatedApp = { ...app, status: newStatus };
    await updateApplicationStatus(app.id, updatedApp);
    loadData(); 
  };

  const getJobTitle = (jobId) => {
    const job = jobs.find(j => j.id === jobId);
    return job ? job.title : "Unknown Job";
  };

  const getCandidateName = (candidateId) => {
    const candidate = candidates.find(c => c.id === candidateId);
    return candidate ? candidate.name : "Unknown Candidate";
  };

  return (
    <div>
      <h2>Job Applications Review</h2>
      
      {applications.length === 0 ? (
        <p>No applications have been submitted yet.</p>
      ) : (
        <ul>
          {applications.map(app => (
            <li key={app.id} className="app-item">
              <div className="app-details">
                <h3>Candidate: {getCandidateName(app.candidateId)}</h3>
                <p>Applied for: <strong>{getJobTitle(app.jobId)}</strong></p>
                <span className={`badge ${app.status.toLowerCase()}`}>
                  {app.status}
                </span>
              </div>
              
              <div className="app-actions">
                <Link to={`/candidates/${app.candidateId}`}>
                  <button className="info">View Profile</button>
                </Link>

                {app.status === "Pending" ? (
                  <>
                    <button className="success" onClick={() => handleStatusChange(app, "Accepted")}>Accept</button>
                    <button className="danger" onClick={() => handleStatusChange(app, "Rejected")}>Reject</button>
                  </>
                ) : (
                  <button className="outline" onClick={() => handleStatusChange(app, "Pending")}>Reset Status</button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}