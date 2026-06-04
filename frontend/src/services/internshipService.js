import axios from "axios";

const API =
  "http://localhost:5000/api/internships";

export const getInternships =
  async () => {
    const res = await axios.get(API);

    return res.data;
  };

export const createInternship =
  async (data, token) => {
    const res = await axios.post(
      API,
      data,
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

    return res.data;
  };