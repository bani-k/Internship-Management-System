import { useEffect, useState } from "react";

import { createInternship } from "../services/internshipService";

export default function PostInternship() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    duration: "",
    stipend: "",
  });

  const submit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await createInternship(form, token);

      alert("Internship Created");
    } catch {
      alert("Creation Failed");
    }
  };

  return (
    <div>
      <h2>Post Internship</h2>

      <form onSubmit={submit}>
        <input
          placeholder="Title"
          onChange={(e) =>
            setForm({
              ...form,
              title: e.target.value,
            })
          }
        />

        <textarea
          placeholder="Description"
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
        />

        <input
          placeholder="Duration"
          onChange={(e) =>
            setForm({
              ...form,
              duration: e.target.value,
            })
          }
        />

        <input
          placeholder="Stipend"
          onChange={(e) =>
            setForm({
              ...form,
              stipend: e.target.value,
            })
          }
        />

        <button>Create</button>
      </form>
    </div>
  );
}
