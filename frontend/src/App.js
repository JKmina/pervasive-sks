import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { supabase } from "./supabaseclient";
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

  // Restore session on refresh
  useEffect(() => {
    const loadSession = async () => {
      const savedUser = localStorage.getItem("loggedUser");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    };

    loadSession();
  }, []);

  return (
    <Router>
      <Routes>
        
        {/* LOGIN (no layout) */}
        <Route path="/login" element={<Login setUser={setUser} />} />

        {/* AUTHENTICATED PAGES */}
        <Route
          element={<Layout user={user} setUser={setUser} />}
        >
          <Route
            path="/"
            element={
              <ProtectedRoute user={user}>
                <Home user={user} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/inventory"
            element={
              <ProtectedRoute user={user}>
                <Inventory user={user} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders"
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
