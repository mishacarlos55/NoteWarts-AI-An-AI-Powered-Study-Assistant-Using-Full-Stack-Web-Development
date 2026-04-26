import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

export default function MagicLayout({ children }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [house, setHouse] = useState(
    localStorage.getItem("house") || "gryffindor"
  );

  const changeHouse = (newHouse) => {
    setHouse(newHouse);
    localStorage.setItem("house", newHouse);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className={`hp-page ${house}`}>
      <div className="castle-bg"></div>
      <div className="map-bg"></div>
      <div className="dark-overlay"></div>

      <div className="hp-container">
        <nav className="hp-navbar">
          <div className="hp-logo">⚡ NoteWarts AI</div>

          <div className="hp-navlinks">
            <Link to="/">Home</Link>

            {!token && (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            )}

            {token && (
              <>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/documents">Documents</Link>
                <Link to="/quiz">Quiz</Link>
                <Link to="/history">History</Link>
                <Link to="/chat">Chat</Link>
                <Link to="/profile">Profile</Link>
                <button className="nav-logout-btn" onClick={logout}>
                  Logout
                </button>
              </>
            )}
          </div>
        </nav>

        <div className="house-switcher">
          {["gryffindor", "slytherin", "ravenclaw", "hufflepuff"].map((h) => (
            <button
              key={h}
              className={house === h ? "active" : ""}
              onClick={() => changeHouse(h)}
            >
              {h === "gryffindor" && "🦁 Gryffindor"}
              {h === "slytherin" && "🐍 Slytherin"}
              {h === "ravenclaw" && "🦅 Ravenclaw"}
              {h === "hufflepuff" && "🦡 Hufflepuff"}
            </button>
          ))}
        </div>

        {children}
      </div>
    </div>
  );
}