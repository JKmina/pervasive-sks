import { Outlet, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Layout({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("loggedUser");
      setUser(null);
      navigate("/login");
    }
  };

  return (
    <div>
      <div className="navbar-container">
        <header className="home-navbar">
          <h2 className="welcome-text">
            {user?.username}'s <strong>{user?.role}</strong> dashboard
          </h2>

          <nav className="nav-links">
            <Link to="/"><strong>Home</strong></Link>
            <Link to="/inventory"><strong>Inventory</strong></Link>
            <Link to="/orders"><strong>Orders</strong></Link>
          </nav>

          <button className="btns" onClick={handleLogout}>Logout</button>
        </header>
      </div>

      <Outlet />
    </div>
  );
}
