import { useEffect, useState } from "react";
import API from "../api/api";
import { useParams } from "react-router-dom";

function CourseDetails() {
  const { id } = useParams();

  const [lessons, setLessons] = useState([]);
  const [progress, setProgress] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    // Fetch lessons
    API.get(`/lessons/${id}`)
      .then((res) => setLessons(res.data))
      .catch((err) => console.error(err));

    // Fetch progress (protected)
    API.get(`/progress/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => setProgress(res.data))
      .catch(() => {
        // Not logged in OR no progress yet
        setProgress(null);
      });
  }, [id]);

  // Mark lesson as complete
  const markComplete = (lesson_id) => {
    API.post(
      "/progress/complete",
      {
        course_id: parseInt(id),
        lesson_id: lesson_id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then(() => {
        alert("Lesson completed!");

        // Refresh progress
        return API.get(`/progress/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      })
      .then((res) => setProgress(res.data))
      .catch((err) => console.error(err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Course Lessons</h2>

      {/* Progress */}
      {progress && (
        <p>
          Progress: {progress.progress}
        </p>
      )}

      {/* Lessons List */}
      {lessons.map((lesson) => (
        <div key={lesson.lesson_id} style={{ marginBottom: "15px" }}>
          <h4>{lesson.title}</h4>

          {lesson.type === "text" ? (
            <p>{lesson.content}</p>
          ) : (
            <a href={lesson.content} target="_blank" rel="noreferrer">
              Watch Video
            </a>
          )}

          <br />

          <button onClick={() => markComplete(lesson.lesson_id)}>
            Mark as Complete
          </button>
        </div>
      ))}
    </div>
  );
}

export default CourseDetails;