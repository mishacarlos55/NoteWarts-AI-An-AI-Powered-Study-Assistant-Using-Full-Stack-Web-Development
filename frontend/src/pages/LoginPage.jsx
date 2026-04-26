import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MagicLayout from "../components/MagicLayout";
import { loginUser } from "../services/authService";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("kamal@test.com");
  const [password, setPassword] = useState("123456");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await loginUser({ email, password });
      navigate("/documents");
      window.location.reload();
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <MagicLayout>
      <main className="auth-page">
        <section className="auth-left">
          <p className="auth-kicker">Owl Post • Smart Notes • AI Tutor</p>
          <h1>Welcome Back, Wizard ✨</h1>
          <p>
            Login to upload notes, ask questions from your documents, and
            generate quizzes from your study material.
          </p>

          <div className="auth-feature">
            <span>📜</span>
            <div>
              <strong>Upload & Summarize</strong>
              <p>Convert long notes into short revision points.</p>
            </div>
          </div>

          <div className="auth-feature">
            <span>🦉</span>
            <div>
              <strong>Chat with Notes</strong>
              <p>Ask questions and get answers from your files.</p>
            </div>
          </div>

          <div className="auth-feature">
            <span>🧪</span>
            <div>
              <strong>Generate Quizzes</strong>
              <p>Practice with AI-generated questions.</p>
            </div>
          </div>
        </section>

        <section className="auth-card">
          <div className="auth-icon">🪄</div>
          <h2>Login to Your Account</h2>

          <form onSubmit={handleLogin}>
            <label>Email</label>
            <input
              className="auth-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Password</label>
            <input
              className="auth-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="auth-btn" type="submit">
              Login
            </button>
          </form>

          {message && <p className="auth-error">{message}</p>}

          <p className="auth-link">
            Don’t have an account? <Link to="/register">Register here</Link>
          </p>
        </section>
      </main>
    </MagicLayout>
  );
}