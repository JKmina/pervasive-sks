import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Orders from "./components/Orders";
import Inventory from "./components/Inventory";

export default function App() {
  const [user, setUser] = useState(null);

  if (!user) return <Login setUser={setUser} />;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/orders" element={<Orders user={user} />} />
        <Route path="/inventory" element={<Inventory user={user} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
