import { useState, useEffect } from "react";
import { supabase } from "../supabaseclient";
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

    const { data, error } = await supabase
      .from("user")
      .select("*")
      .eq("username", username)
      .eq("hash_passwd", password)
      .single();

    if (error || !data) {
      setErrorMsg("Invalid username or password");
    } else {
      setUser(data);
      localStorage.setItem("loggedUser", JSON.stringify(data));
      navigate("/");
    }
  };

  // If user already logged in, redirect
  useEffect(() => {
    const savedUser = localStorage.getItem("loggedUser");
    if (savedUser){}
  }, []);

  return (
    <div className="container mt-5 col-md-4">
      <h2 className="loginTitle">Welcome to Inventory & Packing System.</h2>

      <div className="login">
        <div className="loginbox">
          <form onSubmit={handleLogin}>
            <label>Username</label>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Password</label>
            <input
              type="password"
              className="form-control mb-3"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" className="btn btn-primary">
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
