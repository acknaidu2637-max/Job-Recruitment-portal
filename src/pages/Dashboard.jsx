import { useState, useEffect } from "react";
import { getJobs, getCandidates, getApplications } from "../services/api";

export default function Dashboard() {
  const [stats, setStats] = useState({ jobs: 0, candidates: 0, applications: 0 });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    const [jobs, candidates, applications] = await Promise.all([
      getJobs(),
      getCandidates(),
      getApplications()
    ]);
    
    setStats({
      jobs: jobs.length,
      candidates: candidates.length,
      applications: applications.length
    });
  };

  return (
    <div>
      <h2>Portal Overview</h2>
      <div className="dashboard-grid">
        <div className="card">
          <h3>Active Jobs</h3>
          <p>{stats.jobs}</p>
        </div>
        <div className="card">
          <h3>Registered Candidates</h3>
          <p>{stats.candidates}</p>
        </div>
        <div className="card">
          <h3>Total Applications</h3>
          <p>{stats.applications}</p>
        </div>
      </div>
    </div>
  );
}