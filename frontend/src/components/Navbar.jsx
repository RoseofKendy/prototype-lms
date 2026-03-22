import { Link } from "react-router-dom";

function Navbar() {
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <nav className="navbar">
      <Link to="/">Courses</Link>

      {role === "admin" && <Link to="/admin">Admin</Link>}

      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;