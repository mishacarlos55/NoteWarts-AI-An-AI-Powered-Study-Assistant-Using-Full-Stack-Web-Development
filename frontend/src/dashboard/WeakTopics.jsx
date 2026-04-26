import { useEffect, useState } from "react";
import { houseThemes, getSavedHouse } from "../utils/houseTheme";

const weakTopicsData = [
  { topic: "DBMS Normalization", score: 42 },
  { topic: "Operating System Deadlocks", score: 55 },
  { topic: "Computer Networks Routing", score: 48 },
  { topic: "RAG Architecture", score: 61 },
];

export default function WeakTopics() {
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

  return (
    <div className={`rounded-3xl border ${theme.border} ${theme.card} p-5 shadow-xl`}>
      <div className="mb-4">
        <h2 className={`text-2xl font-black ${theme.text}`}>🎯 Weak Topics</h2>
        <p className="text-sm text-black/70">
          Areas where the learner may need more revision.
        </p>
      </div>

      <div className="space-y-4">
        {weakTopicsData.map((item) => (
          <div key={item.topic}>
            <div className="mb-1 flex items-center justify-between">
              <span className="font-semibold text-black">{item.topic}</span>
              <span className="text-sm font-bold text-black/70">{item.score}%</span>
            </div>

            <div className="h-3 w-full rounded-full bg-white/70 overflow-hidden">
              <div
                className="h-full rounded-full bg-red-500"
                style={{ width: `${item.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}