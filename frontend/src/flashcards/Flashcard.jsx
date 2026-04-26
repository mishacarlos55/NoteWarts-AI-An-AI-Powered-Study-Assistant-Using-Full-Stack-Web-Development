import { useEffect, useState } from "react";
import { houseThemes, getSavedHouse } from "../utils/houseTheme";

export default function Flashcard({ question, answer, difficulty = "medium" }) {
  const [house, setHouse] = useState(getSavedHouse());
  const [flipped, setFlipped] = useState(false);

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

  const difficultyColor = {
    easy: "bg-green-100 text-green-700",
    medium: "bg-yellow-100 text-yellow-700",
    hard: "bg-red-100 text-red-700",
  };

  return (
    <div
      onClick={() => setFlipped(!flipped)}
      className={`cursor-pointer rounded-3xl border ${theme.border} ${theme.card} shadow-xl p-6 min-h-[220px] flex flex-col justify-between transition hover:scale-[1.02]`}
    >
      <div className="flex justify-between items-center mb-4">
        <span
          className={`text-xs font-bold px-3 py-1 rounded-full ${
            difficultyColor[difficulty]
          }`}
        >
          {difficulty.toUpperCase()}
        </span>

        <span className="text-xs text-black/50">Click to flip</span>
      </div>

      <div className="flex items-center justify-center text-center flex-1">
        <p className={`text-lg font-semibold ${theme.text}`}>
          {flipped ? answer : question}
        </p>
      </div>

      <div className="mt-4 text-xs text-black/50 text-center">
        {flipped ? "Answer side" : "Question side"}
      </div>
    </div>
  );
}