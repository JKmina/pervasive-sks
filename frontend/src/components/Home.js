import packLogo from "../packlogo.png"

export default function Home() {
  return (
    <div className="home-container">
      <div className="dashboard">
        {/* HERO SECTION */}
        <section className="hero-section">
          <div className="hero-left">
            <h1>Inventory & Packing System</h1>
            <p>Manage your inventory, orders, and hardware efficiently.</p>

            <div className="hero-buttons">
              <button className="btns">Connect Hardware</button>
              <button className="btns primary">Start Scanning</button>
            </div>
          </div>

          <div className="hero-right">
            <img
              src={packLogo}
              alt="Inventory Management"
              className="hero-image"
            />
          </div>
        </section>

        {/* DASHBOARD CARDS */}
        <section className="card-section">
          <div className="card">
            <p className="card-title">Current Stock</p>
            <h2>— products</h2>
          </div>

          <div className="card">
            <p className="card-title">Orders Processed</p>
            <h2>— orders</h2>
          </div>

          <div className="card">
            <p className="card-title">Hardware Status</p>
            <h2>Disconnected</h2>
          </div>
        </section>
      </div>
    </div>
  );
}
