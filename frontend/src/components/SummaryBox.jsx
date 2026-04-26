import { useEffect, useState } from "react";
import { houseThemes, getSavedHouse } from "../utils/houseTheme";

export default function SummaryBox() {
  const [house, setHouse] = useState(getSavedHouse());
  const theme = houseThemes[house];
  const [summaryType, setSummaryType] = useState("short");

  useEffect(() => {
    const syncHouse = () => setHouse(getSavedHouse());
    window.addEventListener("storage", syncHouse);
    window.addEventListener("house-changed", syncHouse);
    return () => {
      window.removeEventListener("storage", syncHouse);
      window.removeEventListener("house-changed", syncHouse);
    };
  }, []);

  const summaryContent = {
    short:
      "This document explains how RAG improves question answering by retrieving relevant chunks before generating a response.",
    detailed:
      "This document describes the AI Study Assistant architecture, including file upload, document parsing, chunking, vector embedding storage, semantic retrieval, and final answer generation using an LLM.",
    bullet: `• Upload files\n• Extract text\n• Split into chunks\n• Store embeddings\n• Retrieve relevant chunks\n• Generate grounded answer`,
  };

  return (
    <div className={`rounded-3xl border ${theme.border} ${theme.card} shadow-xl p-5`}>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-4">
        <div>
          <h2 className={`text-2xl font-black ${theme.text}`}>📚 Summary Generator</h2>
          <p className="text-sm text-black/70">
            Generate short, detailed, or bullet-format summaries.
          </p>
        </div>

        <select
          value={summaryType}
          onChange={(e) => setSummaryType(e.target.value)}
          className="rounded-xl border border-black/10 bg-white/80 px-3 py-2 text-sm outline-none"
        >
          <option value="short">Short</option>
          <option value="detailed">Detailed</option>
          <option value="bullet">Bullet Format</option>
        </select>
      </div>

      <div className="rounded-2xl bg-white/70 border border-black/10 p-4 whitespace-pre-line text-black leading-7">
        {summaryContent[summaryType]}
      </div>

      <button
        className={`mt-5 rounded-2xl px-5 py-3 font-bold shadow-md transition hover:scale-[1.02] ${theme.accent} ${theme.accentText}`}
      >
        Generate Summary
      </button>
    </div>
  );
}