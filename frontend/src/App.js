import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";

function App() {
  return (
    <Router>
      <Navbar />

      <div className="max-w-5xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Courses />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="*" element={<p className="text-center mt-8 text-gray-500">Page not found</p>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;