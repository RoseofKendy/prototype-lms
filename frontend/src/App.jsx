import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Notification from "./components/Notification";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";

function App() {
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = "default") => {
    setNotification({ message, type });
  };

  return (
    <Router>
      <Navbar />

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      <Routes>
        <Route path="/" element={<Courses showNotification={showNotification} />} />
        <Route path="/login" element={<Login showNotification={showNotification} />} />
        <Route path="/register" element={<Register showNotification={showNotification} />} />
        <Route path="/admin" element={<Admin showNotification={showNotification} />} />
        <Route path="/courses/:id" element={<CourseDetails showNotification={showNotification} />} />
      </Routes>
    </Router>
  );
}

export default App;