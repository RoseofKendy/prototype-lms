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
    <div>
      <h2 className="text-3xl font-bold mb-6 text-center">Courses</h2>

      {role === "admin" && (
        <div className="flex justify-end mb-4">
          <Link
            to="/admin"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Admin Panel
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((c) => (
          <div
            key={c.id}
            className="border rounded-lg p-6 shadow hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold mb-2">{c.title}</h3>
            <p className="text-gray-600 mb-4">{c.description}</p>
            <Link
              className="text-blue-600 hover:underline font-medium"
              to={`/courses/${c.id}`}
            >
              View Course
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;