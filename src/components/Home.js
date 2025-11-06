import { Link, useNavigate } from "react-router-dom";

export default function Home({ user, setUser }){
  const navigate = useNavigate();

  const handleLogout = () => {
  if (window.confirm("Are you sure you want to log out?")) {
    setUser(null);
    navigate("/Login");
  }
};
  return (
    <div className="home-container">
      <h2 className="welcome-text">Welcome, {user.username}!</h2>
      <p className="role-text">
        Role: <strong>{user.role}</strong>
      </p>

      <div className="dashboard">
        {/* Inventory Section */}
        <div className="card inventory-card">
          <div className="card-header inventory-header">
            <Link to="/inventory" className="tab-link">
              Inventory
            </Link>
          </div>
          <div className="card-body">
            <div className="placeholder-table">
              <p>Inventory table preview will appear here.</p>
            </div>
          </div>
        </div>

        {/* Orders Section */}
        <div className="card orders-card">
          <div className="card-header orders-header">
            <Link to="/orders" className="tab-link">
              Orders
            </Link>
          </div>
          <div className="card-body">
            <div className="placeholder-table">
              <p>Orders table preview will appear here.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bottom-buttons">
        <button className="btn btn-secondary connect-btn">
          Connect to hardware
        </button>
        <button className="btn btn-danger logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  ); 
}
