import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import JobList from "./pages/JobList";
import JobForm from "./pages/JobForm";
import JobDetails from "./pages/JobDetails";
import CandidateList from "./pages/CandidateList";
import CandidateForm from "./pages/CandidateForm";
import ApplicationList from "./pages/ApplicationList";
import CandidateDetails from "./pages/CandidateDetails";
import RegisterSelection from "./pages/RegisterSelection";
import HirerForm from "./pages/HirerForm";

function App() {
  return (
    <Router>
      <nav>
        <div className="nav-links">
          <Link to="/">🚀 Job Portal</Link>
          <Link to="/">Dashboard</Link>
          <Link to="/jobs">Find-Jobs</Link>
          <Link to="/post">Post</Link>
          <Link to="/candidates">Candidates</Link>
          <Link to="/applications">Applications</Link>
        </div>
        <div>
          <Link to="/register-role">
            <button>Register</button>
          </Link>
        </div>
      </nav>
      
      <div className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/jobs" element={<JobList />} />
          <Route path="/jobs/new" element={<JobForm />} />
          <Route path="/jobs/edit/:id" element={<JobForm />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/candidates" element={<CandidateList />} />
          <Route path="/post" element={<JobForm/>}/>
          <Route path="/candidates/new" element={<CandidateForm />} />
          <Route path="/candidates/:id" element={<CandidateDetails />} />
          <Route path="/applications" element={<ApplicationList />} />
          <Route path="/register-role" element={<RegisterSelection />} />
          <Route path="/hirers/new" element={<HirerForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;