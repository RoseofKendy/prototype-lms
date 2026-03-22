import { useEffect, useState } from "react";
import API from "../api/api";
import { Link } from "react-router-dom";

function Courses() {
  const [courses, setCourses] = useState([]);

  const role = localStorage.getItem("role");

  useEffect(() => {
    API.get("/courses")
      .then((res) => setCourses(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Courses</h2>

      {/* ✅ Admin-only action */}
      {role === "admin" && (
        <button style={{ marginBottom: "20px" }}>
          Create Course
        </button>
      )}

      {courses.map((c) => (
        <div
          key={c.id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "10px",
            borderRadius: "8px"
          }}
        >
          <h3>{c.title}</h3>
          <p>{c.description}</p>
          <Link to={`/courses/${c.id}`}>View</Link>
        </div>
      ))}
    </div>
  );
}

export default Courses;