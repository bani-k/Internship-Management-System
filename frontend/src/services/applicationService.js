import axios from "axios";

const API = "http://localhost:5000/api/applications";

export const applyInternship = async (internshipId, token) => {
  const res = await axios.post(
    API,
    { internshipId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data;
};

export const getMyApplications = async (token) => {
  const res = await axios.get(`${API}/my`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const getApplicants = async (internshipId, token) => {
  const res = await axios.get(`${API}/internship/${internshipId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const updateApplicationStatus = async (applicationId, status, token) => {
  const res = await axios.put(
    `${API}/${applicationId}/status`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data;
};