import { Link, useNavigate } from "react-router-dom";

export default function Home({ user, setUser }){

  return (
    <div className="home-container">
      <div className="dashboard">
        <section className="hero-section">
          <div className= "hero-left">
            <h1>Welcome to Inventory & Packing System</h1>
            <p>Manage your inventory and orders efficiently.</p>

            <div className="hero-buttons">
              <button className="btns">Connect to hardware</button>
              <button className="btns">Start Scanning!</button>
            </div>
          </div>
          <div className= "hero-right">
            <img src="https://www.pngmart.com/files/10/Inventory-Management-Software-PNG-Clipart.png" alt="Inventory Management Software" />
          </div>
        </section>

        <section className="card-section">
          <div className="card">
            <p className="card-title">Current stock : </p>
            <h2>Total products</h2>
          </div>

          <div className="card">
            <p className="card-title">Orders processed : </p>
            <h2>Orders processed</h2>
          </div>

          <div className="card">
            <p className="card-title">Hardware status</p>
            <h2>Connected?</h2>
          </div>
          
        </section>
        
      </div>
    </div>
  ); 
}
