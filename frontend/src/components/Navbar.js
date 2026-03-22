import { Link } from "react-router-dom";

function Navbar() {
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <nav className="bg-gray-100 shadow-md sticky top-0 z-50 p-4 flex justify-between items-center">
      <div className="flex space-x-4">
        <Link className="text-gray-700 font-medium hover:text-blue-600" to="/">Courses</Link>
        {role === "admin" && (
          <Link className="text-gray-700 font-medium hover:text-blue-600" to="/admin">Admin</Link>
        )}
      </div>
      <button
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
        onClick={handleLogout}
      >
        Logout
      </button>
    </nav>
  );
}

export default Navbar;