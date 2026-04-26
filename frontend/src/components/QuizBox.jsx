import { useEffect, useState } from "react";
import { houseThemes, getSavedHouse } from "../utils/houseTheme";

export default function QuizBox() {
  const [house, setHouse] = useState(getSavedHouse());
  const theme = houseThemes[house];
  const [quizType, setQuizType] = useState("mcq");

  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "What is Retrieval-Augmented Generation (RAG)?",
      options: [
        "A UI design method",
        "A technique that combines retrieval with generation",
        "A database indexing method",
        "A CSS animation library",
      ],
      answer: "A technique that combines retrieval with generation",
    },
  ]);

  useEffect(() => {
    const syncHouse = () => setHouse(getSavedHouse());
    window.addEventListener("storage", syncHouse);
    window.addEventListener("house-changed", syncHouse);
    return () => {
      window.removeEventListener("storage", syncHouse);
      window.removeEventListener("house-changed", syncHouse);
    };
  }, []);

  return (
    <div className={`rounded-3xl border ${theme.border} ${theme.card} shadow-xl p-5`}>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-4">
        <div>
          <h2 className={`text-2xl font-black ${theme.text}`}>📝 Quiz Generator</h2>
          <p className="text-sm text-black/70">
            Generate MCQs, short-answer questions, or true/false quizzes.
          </p>
        </div>

        <select
          value={quizType}
          onChange={(e) => setQuizType(e.target.value)}
          className="rounded-xl border border-black/10 bg-white/80 px-3 py-2 text-sm outline-none"
        >
          <option value="mcq">MCQ</option>
          <option value="short">Short Questions</option>
          <option value="truefalse">True / False</option>
        </select>
      </div>

      <div className="space-y-4">
        {questions.map((q, index) => (
          <div key={q.id} className="rounded-2xl bg-white/70 border border-black/10 p-4">
            <p className="font-bold text-black mb-3">
              Q{index + 1}. {q.question}
            </p>

            {quizType === "mcq" && (
              <div className="space-y-2">
                {q.options.map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 border border-black/10"
                  >
                    <input type="radio" name={`question-${q.id}`} />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            )}

            {quizType !== "mcq" && (
              <div className="rounded-xl bg-white px-3 py-3 border border-black/10 text-sm text-black/60">
                Answer field will appear here based on quiz type.
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        className={`mt-5 rounded-2xl px-5 py-3 font-bold shadow-md transition hover:scale-[1.02] ${theme.accent} ${theme.accentText}`}
      >
        Generate New Quiz
      </button>
    </div>
  );
}