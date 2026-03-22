import { Link } from "react-router-dom";

function Navbar() {
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <nav style={{
      padding: "10px",
      borderBottom: "1px solid #ccc",
      marginBottom: "20px"
    }}>
      <Link to="/" style={{ marginRight: "10px" }}>Courses</Link>

      {role === "admin" && (
        <Link to="/admin" style={{ marginRight: "10px" }}>
          Admin
        </Link>
      )}

      <button onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
}

export default Navbar;