import { useEffect, useState } from "react";
import API from "../api/api";
import { Link } from "react-router-dom";

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    API.get("/courses").then((res) => setCourses(res.data));
  }, []);

  return (
    <div>
      <h2>Courses</h2>
      {courses.map((c) => (
        <div key={c.id}>
          <h3>{c.title}</h3>
          <p>{c.description}</p>
          <Link to={`/courses/${c.id}`}>View</Link>
        </div>
      ))}
    </div>
  );
}

export default Courses;