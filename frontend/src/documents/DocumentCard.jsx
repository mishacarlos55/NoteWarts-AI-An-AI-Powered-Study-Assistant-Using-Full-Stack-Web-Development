import { useEffect, useState } from "react";
import { houseThemes, getSavedHouse } from "../utils/houseTheme";

export default function DocumentCard({
  name,
  type,
  size,
  uploadedAt,
  onDelete,
  onOpen,
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

  const fileEmoji =
    type === "pdf" ? "📕" : type === "docx" ? "📘" : type === "txt" ? "📄" : "📚";

  return (
    <div className={`rounded-3xl border ${theme.border} ${theme.card} p-5 shadow-lg`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-4">
          <div className="text-4xl">{fileEmoji}</div>

          <div>
            <h3 className={`text-lg font-black ${theme.text}`}>{name}</h3>
            <p className="text-sm text-black/70 uppercase">{type}</p>
            <p className="mt-1 text-sm text-black/60">
              {size} • Uploaded {uploadedAt}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          onClick={onOpen}
          className={`rounded-2xl px-4 py-2 font-semibold ${theme.accent} ${theme.accentText}`}
        >
          Open
        </button>

        <button className="rounded-2xl px-4 py-2 font-semibold bg-white text-black border border-black/10">
          Summarize
        </button>

        <button className="rounded-2xl px-4 py-2 font-semibold bg-white text-black border border-black/10">
          Generate Quiz
        </button>

        <button
          onClick={onDelete}
          className="rounded-2xl px-4 py-2 font-semibold bg-red-500 text-white"
        >
          Delete
        </button>
      </div>
    </div>
  );
}