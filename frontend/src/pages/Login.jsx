import { useState } from "react";
import API, { setAuthToken } from "../api/api";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

function Login({ showNotification }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role); // ✅ FIXED

      setAuthToken(res.data.token);

      showNotification("Login successful", "success");
      navigate("/");
    } catch (err) {
      showNotification("Login failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container form">
      <h2>Login</h2>

      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>

      {loading && <Spinner />}
    </div>
  );
}

export default Login;