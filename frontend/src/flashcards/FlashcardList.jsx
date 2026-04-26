import { useEffect, useState } from "react";
import Flashcard from "./Flashcard";
import { houseThemes, getSavedHouse } from "../utils/houseTheme";

const sampleFlashcards = [
  {
    id: 1,
    question: "What is Retrieval-Augmented Generation (RAG)?",
    answer:
      "A technique that retrieves relevant context before generating an AI response.",
    difficulty: "medium",
  },
  {
    id: 2,
    question: "What does JWT stand for?",
    answer: "JSON Web Token",
    difficulty: "easy",
  },
  {
    id: 3,
    question: "What is semantic search?",
    answer:
      "Search based on meaning using embeddings instead of keyword matching.",
    difficulty: "hard",
  },
];

export default function FlashcardList() {
  const [house, setHouse] = useState(getSavedHouse());
  const theme = houseThemes[house];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const syncHouse = () => setHouse(getSavedHouse());
    window.addEventListener("storage", syncHouse);
    window.addEventListener("house-changed", syncHouse);

    return () => {
      window.removeEventListener("storage", syncHouse);
      window.removeEventListener("house-changed", syncHouse);
    };
  }, []);

  const nextCard = () => {
    if (index < sampleFlashcards.length - 1) {
      setIndex(index + 1);
    }
  };

  const prevCard = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const progress =
    ((index + 1) / sampleFlashcards.length) * 100;

  return (
    <div
      className={`rounded-3xl border ${theme.border} ${theme.card} shadow-xl p-6`}
    >
      <div className="mb-5">
        <h2 className={`text-2xl font-black ${theme.text}`}>
          🃏 Flashcard Trainer
        </h2>
        <p className="text-sm text-black/70">
          Review important concepts generated from your study materials.
        </p>
      </div>

      <Flashcard {...sampleFlashcards[index]} />

      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={prevCard}
          disabled={index === 0}
          className="rounded-2xl px-4 py-2 bg-white border border-black/10 font-semibold disabled:opacity-40"
        >
          Previous
        </button>

        <span className="text-sm font-bold text-black/60">
          {index + 1} / {sampleFlashcards.length}
        </span>

        <button
          onClick={nextCard}
          disabled={index === sampleFlashcards.length - 1}
          className={`rounded-2xl px-4 py-2 font-semibold ${theme.accent} ${theme.accentText} disabled:opacity-40`}
        >
          Next
        </button>
      </div>

      <div className="mt-4 w-full h-2 bg-white/60 rounded-full overflow-hidden">
        <div
          className="h-full bg-purple-600 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}