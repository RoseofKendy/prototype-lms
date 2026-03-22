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

      <Routes>
        <Route path="/" element={<Courses />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
      </Routes>
    </Router>
  );
}

export default App;