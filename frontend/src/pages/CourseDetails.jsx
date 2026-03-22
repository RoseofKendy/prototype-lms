import { useEffect, useState } from "react";
import API from "../api/api";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

function CourseDetails({ showNotification }) {
  const { id } = useParams();

  const [lessons, setLessons] = useState([]);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    Promise.all([
      API.get(`/lessons/${id}`),
      API.get(`/progress/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      }).catch(() => null)
    ])
      .then(([lessonsRes, progressRes]) => {
        setLessons(lessonsRes.data);
        if (progressRes) setProgress(progressRes.data);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const markComplete = (lesson_id) => {
    API.post(
      "/progress/complete",
      { course_id: parseInt(id), lesson_id },
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then(() => {
        showNotification("Lesson completed!", "success");
        return API.get(`/progress/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
      })
      .then((res) => setProgress(res.data))
      .catch(() => showNotification("Error updating progress", "error"));
  };

  return (
    <div className="container">
      <h2>Course Lessons</h2>

      {loading ? <Spinner /> : (
        <>
          {progress && <p>Progress: {progress.progress}</p>}

          {lessons.map((lesson) => (
            <div className="card" key={lesson.lesson_id}>
              <h4>{lesson.title}</h4>

              {lesson.type === "text" ? (
                <p>{lesson.content}</p>
              ) : (
                <a href={lesson.content} target="_blank" rel="noreferrer">
                  Watch Video
                </a>
              )}

              <button onClick={() => markComplete(lesson.lesson_id)}>
                Mark as Complete
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default CourseDetails;