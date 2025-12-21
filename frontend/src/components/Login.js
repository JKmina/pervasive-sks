import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
        {
          username,
          password,
        }
      );

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("loggedUser", JSON.stringify(user));

      setUser(user);
      navigate("/");
    } catch (err) {
      setErrorMsg(
        err.response?.data?.message || "Invalid username or password"
      );
    }
  };

  return (
    <div className="container mt-5 col-md-4">
      <h2 className="loginTitle">Welcome to Inventory & Packing System</h2>

      <div className="login">
        <div className="loginbox">
          <form onSubmit={handleLogin}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              className="form-control mb-2"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className="form-control mb-3"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>

          {errorMsg && (
            <div className="alert alert-danger mt-3">{errorMsg}</div>
          )}
        </div>
      </div>
    </div>
  );
}
