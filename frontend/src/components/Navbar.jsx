import { useEffect, useRef, useState } from "react";
import { houseThemes, getSavedHouse } from "../utils/houseTheme";

export default function FileUpload() {
  const [house, setHouse] = useState(getSavedHouse());
  const theme = houseThemes[house];

  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const syncHouse = () => setHouse(getSavedHouse());
    window.addEventListener("storage", syncHouse);
    window.addEventListener("house-changed", syncHouse);
    return () => {
      window.removeEventListener("storage", syncHouse);
      window.removeEventListener("house-changed", syncHouse);
    };
  }, []);

  const handleFiles = (selectedFiles) => {
    const fileArray = Array.from(selectedFiles || []);
    setFiles((prev) => [...prev, ...fileArray]);
  };

  const removeFile = (indexToRemove) => {
    setFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div className={`rounded-3xl border ${theme.border} ${theme.card} shadow-xl p-5`}>
      <div className="mb-4">
        <h2 className={`text-2xl font-black ${theme.text}`}>📂 Upload Study Material</h2>
        <p className="text-sm text-black/70">
          Upload PDFs, DOCX files, or notes for chat, quiz, summary, and flashcards.
        </p>
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={`cursor-pointer rounded-3xl border-2 border-dashed p-8 text-center transition ${
          dragActive
            ? `${theme.accent} ${theme.accentText} border-transparent`
            : "border-black/20 bg-white/50 hover:bg-white/70"
        }`}
      >
        <div className="text-5xl mb-3">📜</div>
        <p className="text-lg font-bold">Drag & drop files here</p>
        <p className="text-sm opacity-80 mt-1">or click to browse from your device</p>

        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.txt"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      <div className="mt-5">
        <h3 className="text-sm font-bold uppercase tracking-wider text-black/60 mb-3">
          Selected Files
        </h3>

        {files.length === 0 ? (
          <div className="rounded-2xl bg-white/50 border border-black/10 px-4 py-3 text-sm text-black/60">
            No files selected yet.
          </div>
        ) : (
          <div className="space-y-3">
            {files.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between rounded-2xl bg-white/70 border border-black/10 px-4 py-3"
              >
                <div>
                  <p className="font-semibold text-black">{file.name}</p>
                  <p className="text-xs text-black/60">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>

                <button
                  onClick={() => removeFile(index)}
                  className="rounded-xl bg-red-500 px-3 py-2 text-sm font-semibold text-white hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        className={`mt-5 rounded-2xl px-5 py-3 font-bold shadow-md transition hover:scale-[1.02] ${theme.accent} ${theme.accentText}`}
      >
        Upload to MentorAI
      </button>
    </div>
  );
}