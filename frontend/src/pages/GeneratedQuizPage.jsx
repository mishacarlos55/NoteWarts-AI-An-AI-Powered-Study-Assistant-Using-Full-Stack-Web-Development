import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import MagicLayout from "../components/MagicLayout";

export default function GeneratedQuizPage() {
  const location = useLocation();
  const quiz = Array.isArray(location.state?.quiz)
  ? location.state.quiz
  : [];

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  if (!Array.isArray(quiz) || quiz.length === 0) {
    return (
      <MagicLayout>
        <main className="page-card">
          <h1 className="page-title">Generated Quiz</h1>
          <p>No quiz generated yet.</p>
          <Link to="/quiz" className="magic-btn">
            Go to Quiz Chamber
          </Link>
        </main>
      </MagicLayout>
    );
  }

  const score = quiz.reduce((total, q, index) => {
    return selectedAnswers[index] === q.answer ? total + 1 : total;
  }, 0);

  return (
    <MagicLayout>
      <main className="page-card">
        <h1 className="page-title">Generated Quiz</h1>

        {submitted && (
          <div className="quiz-score-box">
            <h2>Your Score</h2>
            <p>
              {score} / {quiz.length}
            </p>
          </div>
        )}

        <section className="quiz-list">
          {quiz.map((q, index) => (
            <div className="quiz-card" key={index}>
              <h3>
                {index + 1}. {q.question}
              </h3>

              <div className="quiz-options">
                {q.options.map((option) => {
                  const isCorrect = option === q.answer;
                  const isSelected = selectedAnswers[index] === option;

                  return (
                    <label
                      key={option}
                      className={
                        submitted
                          ? isCorrect
                            ? "quiz-option correct"
                            : isSelected
                            ? "quiz-option wrong"
                            : "quiz-option"
                          : "quiz-option"
                      }
                    >
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={option}
                        disabled={submitted}
                        checked={isSelected}
                        onChange={() =>
                          setSelectedAnswers({
                            ...selectedAnswers,
                            [index]: option,
                          })
                        }
                      />
                      <span>{option}</span>
                    </label>
                  );
                })}
              </div>

              {submitted && (
                <div className="quiz-explanation">
                  <p>
                    <b>Correct Answer:</b> {q.answer}
                  </p>
                  <p>
                    <b>Explanation:</b> {q.explanation}
                  </p>
                </div>
              )}
            </div>
          ))}
        </section>

        {!submitted ? (
          <button
            type="button"
            className="magic-btn"
            onClick={() => setSubmitted(true)}
          >
            Submit Quiz
          </button>
        ) : (
          <Link to="/quiz" className="magic-btn">
            Generate Another Quiz
          </Link>
        )}
      </main>
    </MagicLayout>
  );
}