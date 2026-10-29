import { Link } from "react-router-dom";

export default function RegisterSelection() {
  return (
    <div className="selection-page">
      <h2>How would you like to use the portal?</h2>
      <p>Choose your role to continue with the registration process.</p>

      <div className="dashboard-grid">
        <div className="card">
          <h3>👨‍🎓 Aspirant</h3>
          <p className="card-description">
            I am a candidate looking for opportunities. I want to build my profile and apply to open positions.
          </p>
          <Link to="/candidates/new">
            <button>Register as Aspirant</button>
          </Link>
        </div>

        <div className="card">
          <h3>🏢 Hirer</h3>
          <p className="card-description">
            I am a recruiter or company. I want to register my company and manage candidate applications.
          </p>
          <Link to="/hirers/new">
            <button className="success">Register as Hirer</button>
          </Link>
        </div>
      </div>
    </div>
  );
}