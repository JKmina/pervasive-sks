import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Layout from "./components/Layout";
import Login from "./components/Login";
import Home from "./components/Home";
import Orders from "./components/Orders";
import Inventory from "./components/Inventory";

function ProtectedRoute({ user, children }) {
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  const [user, setUser] = useState(null);
  const [loadingSession, setLoadingSession] = useState(true);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("loggedUser");
      if (savedUser && savedUser !== "undefined") {
        setUser(JSON.parse(savedUser));
      }
    } catch {
      localStorage.removeItem("loggedUser");
      localStorage.removeItem("token");
    } finally {
      setLoadingSession(false);
    }
  }, []);

  if (loadingSession) return <p>Loading...</p>;

  return (
    <Router>
      <Routes>
        {/* PUBLIC */}
        <Route path="/login" element={<Login setUser={setUser} />} />

        {/* PROTECTED */}
        <Route path="/" element={<Layout user={user} setUser={setUser} />}>
          <Route
            index
            element={
              <ProtectedRoute user={user}>
                <Home user={user} />
              </ProtectedRoute>
            }
          />

          <Route
            path="inventory"
            element={
              <ProtectedRoute user={user}>
                <Inventory />
              </ProtectedRoute>
            }
          />

          <Route
            path="orders"
            element={
              <ProtectedRoute user={user}>
                <Orders user={user} />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}
