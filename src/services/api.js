const BASE_URL = "http://localhost:3000";

// --- JOBS API ---
export const getJobs = async () => {
  const res = await fetch(`${BASE_URL}/jobs`);
  return res.json();
};
export const getJobById = async (id) => {
  const res = await fetch(`${BASE_URL}/jobs/${id}`);
  return res.json();
};
export const addJob = async (job) => {
  const res = await fetch(`${BASE_URL}/jobs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(job),
  });
  return res.json();
};
export const updateJob = async (id, job) => {
  const res = await fetch(`${BASE_URL}/jobs/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(job),
  });
  return res.json();
};
export const deleteJob = async (id) => {
  await fetch(`${BASE_URL}/jobs/${id}`, { method: "DELETE" });
};

// --- CANDIDATES API ---
export const getCandidates = async () => {
  const res = await fetch(`${BASE_URL}/candidates`);
  return res.json();
};
export const getCandidateById = async (id) => {
  const res = await fetch(`${BASE_URL}/candidates/${id}`);
  return res.json();
};
export const addCandidate = async (candidate) => {
  const res = await fetch(`${BASE_URL}/candidates`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(candidate),
  });
  return res.json();
};

// --- APPLICATIONS API ---
export const getApplications = async () => {
  const res = await fetch(`${BASE_URL}/applications`);
  return res.json();
};
export const applyForJob = async (application) => {
  const res = await fetch(`${BASE_URL}/applications`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(application),
  });
  return res.json();
};
export const updateApplicationStatus = async (id, application) => {
  const res = await fetch(`${BASE_URL}/applications/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(application),
  });
  return res.json();
};



// --- HIRERS API ---
export const getHirers = async () => {
  const res = await fetch(`${BASE_URL}/hirers`);
  return res.json();
};

export const addHirer = async (hirer) => {
  const res = await fetch(`${BASE_URL}/hirers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(hirer),
  });
  return res.json();
};