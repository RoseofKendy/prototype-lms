import { useState } from "react";
import API from "../api/api";
import Spinner from "../components/Spinner";

function Admin({ showNotification }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const createCourse = async () => {
    setLoading(true);
    try {
      await API.post(
        "/courses",
        { title, description, category },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      showNotification("Course created!", "success");
    } catch (err) {
        console.error(err);
        console.log(err.response);
      showNotification("Error creating course", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await API.get("/audit", {
        headers: { Authorization: `Bearer ${token}` }
      });

      setLogs(res.data);
    } catch {
      showNotification("Failed to load logs", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Admin Panel</h2>

      <div className="card">
        <h3>Create Course</h3>

        <input placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
        <input placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
        <input placeholder="Category" onChange={(e) => setCategory(e.target.value)} />

        <button onClick={createCourse}>Create Course</button>
      </div>

      <button onClick={fetchLogs}>Load Audit Logs</button>

      {loading && <Spinner />}

      <h3>Audit Logs</h3>

      {logs.length === 0 ? (
        <p>No logs yet</p>
      ) : (
        logs.map((log, i) => (
          <div className="card" key={i}>
            <p><strong>{log.action}</strong></p>
            <small>{log.timestamp}</small>
          </div>
        ))
      )}
    </div>
  );
}

export default Admin;