import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

function Register({ showNotification }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async () => {
    setLoading(true);
    try {
      await API.post("/auth/register", {
        email,
        password,
        role: "learner"
      });

      showNotification("Registration successful", "success");
      navigate("/login");
    } catch {
      showNotification("Registration failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container form">
      <h2>Register</h2>

<input
  id="email"
  name="email"
  type="email"
  placeholder="Email"
  autoComplete="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

<input
  id="password"
  name="password"
  type="password"
  placeholder="Password"
  autoComplete="new-password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

      <button onClick={handleRegister} disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>

      {loading && <Spinner />}
    </div>
  );
}

export default Register;