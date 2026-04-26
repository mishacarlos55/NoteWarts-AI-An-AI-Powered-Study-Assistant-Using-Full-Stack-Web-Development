import { useEffect, useState } from "react";
import { houseThemes, getSavedHouse } from "../utils/houseTheme";

export default function QuizCard({
  questionData,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onSelectAnswer,
}) {
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

  if (!questionData) return null;

  return (
    <div className={`rounded-3xl border ${theme.border} ${theme.card} shadow-xl p-6`}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-bold uppercase tracking-wider text-black/60">
          Question {questionNumber} of {totalQuestions}
        </span>
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${theme.accent} ${theme.accentText}`}>
          {questionData.type || "MCQ"}
        </span>
      </div>

      <h2 className={`text-xl md:text-2xl font-black ${theme.text} mb-5`}>
        {questionData.question}
      </h2>

      <div className="space-y-3">
        {questionData.options?.map((option, index) => {
          const isSelected = selectedAnswer === option;

          return (
            <label
              key={index}
              className={`flex items-center gap-3 rounded-2xl border px-4 py-3 cursor-pointer transition ${
                isSelected
                  ? `${theme.accent} ${theme.accentText} border-transparent`
                  : "bg-white/70 text-black border-black/10 hover:bg-white"
              }`}
            >
              <input
                type="radio"
                name={`question-${questionNumber}`}
                checked={isSelected}
                onChange={() => onSelectAnswer(option)}
                className="accent-black"
              />
              <span className="font-medium">{option}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}