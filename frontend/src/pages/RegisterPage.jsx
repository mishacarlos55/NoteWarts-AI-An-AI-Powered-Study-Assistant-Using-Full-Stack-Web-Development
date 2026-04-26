import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MagicLayout from "../components/MagicLayout";
import { registerUser } from "../services/authService";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    house: "Gryffindor",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await registerUser(form);
      navigate("/documents");
      window.location.reload();
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <MagicLayout>
      <main className="register-page">
        <section className="register-card">
          <div className="auth-icon">🎩</div>

          <h1>Create Your Wizard Profile</h1>
          <p>Join NoteWarts AI and start your magical learning adventure.</p>

          <form onSubmit={handleRegister} className="register-grid">
            <div>
              <label>Full Name</label>
              <input
                className="auth-input"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Hermione Granger"
              />
            </div>

            <div>
              <label>Email</label>
              <input
                className="auth-input"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="owlpost@example.com"
              />
            </div>

            <div>
              <label>Password</label>
              <input
                className="auth-input"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Create password"
              />
            </div>

            <div>
              <label>Favorite House</label>
              <select
                className="auth-input"
                name="house"
                value={form.house}
                onChange={handleChange}
              >
                <option>Gryffindor</option>
                <option>Slytherin</option>
                <option>Ravenclaw</option>
                <option>Hufflepuff</option>
              </select>
            </div>

            <button className="auth-btn register-btn" type="submit">
              Create Account
            </button>
          </form>

          {message && <p className="auth-error">{message}</p>}

          <p className="auth-link">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </section>
      </main>
    </MagicLayout>
  );
}