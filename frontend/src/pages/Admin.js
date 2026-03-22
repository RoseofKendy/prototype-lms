import { useState } from "react";
import API from "../api/api";

function Admin() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [logs, setLogs] = useState([]);

  const token = localStorage.getItem("token");

  const createCourse = async () => {
    try {
      await API.post(
        "/courses",
        { title, description, category },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert("Course created!");
    } catch (err) {
      alert("Error creating course");
    }
  };

  const fetchLogs = async () => {
  try {
    const res = await API.get("/audit", {
      headers: { Authorization: `Bearer ${token}` }
    });

    setLogs(res.data);
  } catch (err) {
    console.error(err);
  }
};

  return (
  <div style={{ padding: "20px" }}>
    <h2>Admin Panel</h2>

    <h3>Create Course</h3>

    <input placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
    <br /><br />

    <input placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
    <br /><br />

    <input placeholder="Category" onChange={(e) => setCategory(e.target.value)} />
    <br /><br />

    <button onClick={createCourse}>Create Course</button>
    <br /><br />

    <button onClick={fetchLogs}>Load Audit Logs</button>

    {/* 👇 ADD THIS PART */}
    <h3>Audit Logs</h3>

    {logs.length === 0 ? (
      <p>No logs yet</p>
    ) : (
      logs.map((log, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ccc",
            marginTop: "10px",
            padding: "10px"
          }}
        >
          <p><strong>{log.action}</strong></p>
          <small>{log.timestamp}</small>
        </div>
      ))
    )}
  </div>
);
}

export default Admin;