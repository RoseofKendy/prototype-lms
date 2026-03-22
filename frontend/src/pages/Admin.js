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
      await API.post("/courses", { title, description, category }, { headers: { Authorization: `Bearer ${token}` } });
      alert("Course created!");
      setTitle(""); setDescription(""); setCategory("");
    } catch (err) {
      alert(err.response?.data?.error || "Error creating course");
    }
  };

  const fetchLogs = async () => {
    try {
      const res = await API.get("/audit", { headers: { Authorization: `Bearer ${token}` } });
      setLogs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6 text-center">Admin Panel</h2>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Create Course</h3>
        <input
          className="border rounded-md w-full p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="border rounded-md w-full p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          className="border rounded-md w-full p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          onClick={createCourse}
        >
          Create Course
        </button>
      </div>

      <div>
        <button
          className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors mb-4"
          onClick={fetchLogs}
        >
          Load Audit Logs
        </button>

        <h3 className="text-xl font-semibold mb-2">Audit Logs</h3>
        {logs.length === 0 ? (
          <p className="text-gray-500">No logs yet</p>
        ) : (
          <div className="space-y-4">
            {logs.map((log, index) => (
              <div key={index} className="border p-4 rounded-md shadow hover:shadow-md transition-shadow">
                <p className="font-medium">{log.action}</p>
                <small className="text-gray-500">{log.timestamp}</small>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;