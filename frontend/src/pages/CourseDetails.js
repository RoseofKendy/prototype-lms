import { useEffect, useState } from "react";
import API from "../api/api";
import { useParams } from "react-router-dom";

function CourseDetails() {
  const { id } = useParams();
  const [lessons, setLessons] = useState([]);
  const [progress, setProgress] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    API.get(`/lessons/${id}`).then((res) => setLessons(res.data)).catch(console.error);
    API.get(`/progress/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setProgress(res.data))
      .catch(() => setProgress(null));
  }, [id]);

  const markComplete = async (lesson_id) => {
    try {
      await API.post(
        "/progress/complete",
        { course_id: parseInt(id), lesson_id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Lesson completed!");
      const res = await API.get(`/progress/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setProgress(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-center">Course Lessons</h2>

      {progress && <p className="text-lg font-medium mb-4">Progress: {progress.progress}</p>}

      <div className="space-y-6">
        {lessons.map((lesson) => (
          <div key={lesson.lesson_id} className="p-4 border rounded-lg shadow hover:shadow-md transition-shadow">
            <h4 className="text-xl font-semibold mb-2">{lesson.title}</h4>
            {lesson.type === "text" ? (
              <p className="text-gray-700">{lesson.content}</p>
            ) : (
              <a
                href={lesson.content}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                Watch Video
              </a>
            )}
            <button
              className="mt-3 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
              onClick={() => markComplete(lesson.lesson_id)}
            >
              Mark as Complete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseDetails;