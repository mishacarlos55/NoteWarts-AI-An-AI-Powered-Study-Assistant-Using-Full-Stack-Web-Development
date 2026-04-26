import { useEffect, useMemo, useState } from "react";
import QuizCard from "./QuizCard";
import QuizResult from "./QuizResult";
import { houseThemes, getSavedHouse } from "../utils/houseTheme";

const sampleQuiz = [
  {
    id: 1,
    type: "MCQ",
    question: "What is Retrieval-Augmented Generation (RAG)?",
    options: [
      "A frontend animation library",
      "A technique that combines document retrieval with answer generation",
      "A database schema",
      "A JWT authentication method",
    ],
    correctAnswer: "A technique that combines document retrieval with answer generation",
    explanation:
      "RAG first retrieves relevant chunks from stored documents and then uses them as context for LLM response generation.",
  },
  {
    id: 2,
    type: "MCQ",
    question: "Which library is commonly used for vector-based AI workflows in this project?",
    options: ["React Router", "Tailwind CSS", "LangChain", "Framer Motion"],
    correctAnswer: "LangChain",
    explanation:
      "LangChain helps manage document loading, chunking, embedding, retrieval, and LLM orchestration.",
  },
  {
    id: 3,
    type: "MCQ",
    question: "Why is semantic search better than keyword search in MentorAI?",
    options: [
      "It only works on images",
      "It searches by exact word count",
      "It understands meaning and contextual similarity",
      "It removes authentication",
    ],
    correctAnswer: "It understands meaning and contextual similarity",
    explanation:
      "Semantic search uses embeddings to find conceptually relevant content, even when exact words differ.",
  },
];

export default function QuizList() {
  const [house, setHouse] = useState(getSavedHouse());
  const theme = houseThemes[house];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const syncHouse = () => setHouse(getSavedHouse());
    window.addEventListener("storage", syncHouse);
    window.addEventListener("house-changed", syncHouse);

    return () => {
      window.removeEventListener("storage", syncHouse);
      window.removeEventListener("house-changed", syncHouse);
    };
  }, []);

  const currentQuestion = sampleQuiz[currentIndex];

  const handleSelectAnswer = (option) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: option,
    }));
  };

  const handleNext = () => {
    if (currentIndex < sampleQuiz.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const score = useMemo(() => {
    return sampleQuiz.reduce((total, question) => {
      return total + (answers[question.id] === question.correctAnswer ? 1 : 0);
    }, 0);
  }, [answers]);

  const progress = ((currentIndex + 1) / sampleQuiz.length) * 100;

  if (submitted) {
    return (
      <QuizResult
        score={score}
        total={sampleQuiz.length}
        questions={sampleQuiz}
        answers={answers}
        onRetake={() => {
          setAnswers({});
          setCurrentIndex(0);
          setSubmitted(false);
        }}
      />
    );
  }

  return (
    <div className={`rounded-3xl border ${theme.border} ${theme.card} shadow-xl p-6`}>
      <div className="mb-5">
        <h2 className={`text-2xl font-black ${theme.text}`}>📝 Quiz Challenge</h2>
        <p className="text-sm text-black/70">
          Test your understanding of concepts generated from uploaded study material.
        </p>
      </div>

      <div className="mb-5 w-full h-2 bg-white/60 rounded-full overflow-hidden">
        <div
          className="h-full bg-purple-600 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <QuizCard
        questionData={currentQuestion}
        questionNumber={currentIndex + 1}
        totalQuestions={sampleQuiz.length}
        selectedAnswer={answers[currentQuestion.id]}
        onSelectAnswer={handleSelectAnswer}
      />

      <div className="mt-6 flex items-center justify-between gap-3">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="rounded-2xl px-4 py-3 bg-white border border-black/10 font-semibold disabled:opacity-40"
        >
          Previous
        </button>

        {currentIndex === sampleQuiz.length - 1 ? (
          <button
            onClick={handleSubmit}
            className={`rounded-2xl px-5 py-3 font-bold ${theme.accent} ${theme.accentText}`}
          >
            Submit Quiz
          </button>
        ) : (
          <button
            onClick={handleNext}
            className={`rounded-2xl px-5 py-3 font-bold ${theme.accent} ${theme.accentText}`}
          >
            Next Question
          </button>
        )}
      </div>
    </div>
  );
}