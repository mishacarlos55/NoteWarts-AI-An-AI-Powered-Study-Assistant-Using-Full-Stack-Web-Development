import { Link } from "react-router-dom";
import MagicLayout from "../components/MagicLayout";

export default function LandingPage() {
  return (
    <MagicLayout>
      <section className="hp-hero">
        <div className="hero-left">
          <p className="hp-kicker">Owl Post • Magical Archive • Smart Revision</p>

          <h1 className="hp-title">
            Welcome to
            <br />
            NoteWarts AI
          </h1>

          <p className="hp-subtitle">
            Upload your notes, ask questions from documents, generate summaries,
            and create quizzes inside a magical AI study room.
          </p>

          <div className="hp-actions">
            <Link to="/documents" className="hp-btn">
              Unlock the Notes
            </Link>

            <Link to="/chat" className="hp-btn secondary">
              Enter the Castle
            </Link>
          </div>
        </div>

        <div className="home-showcase">
          <div className="castle-card">
            <h2>Hogwarts Archive</h2>
            <p>Your AI-powered magical study chamber.</p>
          </div>

          <div className="home-mini-grid">
            <div className="mini-card">
              <span>📜</span>
              <h3>Summaries</h3>
              <p>Turn long notes into revision points.</p>
            </div>

            <div className="mini-card">
              <span>🦉</span>
              <h3>Ask Notes</h3>
              <p>Chat with uploaded documents.</p>
            </div>

            <div className="mini-card">
              <span>🪄</span>
              <h3>Quiz</h3>
              <p>Generate exam-style questions.</p>
            </div>

            <div className="mini-card">
              <span>🗺️</span>
              <h3>History</h3>
              <p>Track your magical study trail.</p>
            </div>
          </div>
        </div>
      </section>
    </MagicLayout>
  );
}