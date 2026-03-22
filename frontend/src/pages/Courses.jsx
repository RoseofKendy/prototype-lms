import { useEffect, useState } from "react";
import API from "../api/api";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/courses")
      .then((res) => setCourses(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container">
      <h2>Courses</h2>

      {loading ? (
        <Spinner />
      ) : (
        courses.map((c) => (
          <div className="card" key={c.id}>
            <h3>{c.title}</h3>
            <p>{c.description}</p>
            <Link to={`/courses/${c.id}`}>View</Link>
          </div>
        ))
      )}
    </div>
  );
}

export default Courses;