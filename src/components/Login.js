import { useState } from "react";
import { supabase } from "../supabaseclient";
import "../App.css";
export default function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    // Check credentials in your custom "user" table
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
    }
  };

  return (
    <div className="container mt-5 col-md-4">
      <div className="loginbox">
        <h3 className="text-center mb-3">Login</h3>
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
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
        {errorMsg && <div className="alert alert-danger mt-3">{errorMsg}</div>}
      </div>
    </div>
      
  );
}
