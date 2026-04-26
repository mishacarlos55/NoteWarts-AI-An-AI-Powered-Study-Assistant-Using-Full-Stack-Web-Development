import { useEffect, useState } from "react";
import { houseThemes, getSavedHouse } from "../utils/houseTheme";

export default function QuizResult({ score, total, questions, answers, onRetake }) {
  const [house, setHouse] = useState(getSavedHouse());
  const theme = houseThemes[house];

  useEffect(() => {
    const syncHouse = () => setHouse(getSavedHouse());
    window.addEventListener("storage", syncHouse);
    window.addEventListener("house-changed", syncHouse);

    return () => {
      window.removeEventListener("storage", syncHouse);
      window.removeEventListener("house-changed", syncHouse);
    };
  }, []);

  const percentage = Math.round((score / total) * 100);

  const getRemark = () => {
    if (percentage >= 80) return "Outstanding magical work ✨";
    if (percentage >= 60) return "Good job — keep revising 📚";
    if (percentage >= 40) return "Decent effort, but some topics need review 🎯";
    return "Time to revisit your notes and strengthen weak areas 🪄";
  };

  return (
    <div className={`rounded-3xl border ${theme.border} ${theme.card} shadow-xl p-6`}>
      <div className="text-center mb-6">
        <h2 className={`text-3xl font-black ${theme.text}`}>🏆 Quiz Result</h2>
        <p className="mt-2 text-black/70">{getRemark()}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="rounded-2xl bg-white/70 border border-black/10 p-4 text-center">
          <p className="text-sm text-black/60 font-semibold">Score</p>
          <p className={`text-3xl font-black ${theme.text}`}>{score}/{total}</p>
        </div>

        <div className="rounded-2xl bg-white/70 border border-black/10 p-4 text-center">
          <p className="text-sm text-black/60 font-semibold">Percentage</p>
          <p className={`text-3xl font-black ${theme.text}`}>{percentage}%</p>
        </div>

        <div className="rounded-2xl bg-white/70 border border-black/10 p-4 text-center">
          <p className="text-sm text-black/60 font-semibold">Status</p>
          <p className={`text-xl font-black ${theme.text}`}>
            {percentage >= 50 ? "Passed" : "Needs Revision"}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {questions.map((question, index) => {
          const userAnswer = answers[question.id];
          const isCorrect = userAnswer === question.correctAnswer;

          return (
            <div
              key={question.id}
              className="rounded-2xl bg-white/70 border border-black/10 p-4"
            >
              <p className="font-bold text-black mb-2">
                Q{index + 1}. {question.question}
              </p>

              <p className="text-sm">
                <span className="font-semibold">Your Answer:</span>{" "}
                <span className={isCorrect ? "text-green-700 font-semibold" : "text-red-700 font-semibold"}>
                  {userAnswer || "Not Attempted"}
                </span>
              </p>

              <p className="text-sm mt-1">
                <span className="font-semibold">Correct Answer:</span>{" "}
                <span className="text-green-700 font-semibold">{question.correctAnswer}</span>
              </p>

              <p className="text-sm mt-2 text-black/70">
                <span className="font-semibold">Explanation:</span> {question.explanation}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={onRetake}
          className={`rounded-2xl px-6 py-3 font-bold ${theme.accent} ${theme.accentText}`}
        >
          Retake Quiz
        </button>
      </div>
    </div>
  );
}