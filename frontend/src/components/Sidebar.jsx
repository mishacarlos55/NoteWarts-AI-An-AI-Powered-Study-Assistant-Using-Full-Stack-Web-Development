import { useEffect, useState } from "react";
import { houseThemes, getSavedHouse } from "../utils/houseTheme";

const menuItems = [
  { icon: "🏠", label: "Dashboard" },
  { icon: "📂", label: "Documents" },
  { icon: "💬", label: "AI Chat" },
  { icon: "📚", label: "Summaries" },
  { icon: "📝", label: "Quizzes" },
  { icon: "🃏", label: "Flashcards" },
  { icon: "📊", label: "Analytics" },
  { icon: "⚙️", label: "Settings" },
];

export default function Sidebar() {
  const [house, setHouse] = useState(getSavedHouse());
  const theme = houseThemes[house];
  const [active, setActive] = useState("Dashboard");

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
    <aside className={`rounded-3xl border ${theme.border} ${theme.card} shadow-xl p-4`}>
      <h2 className={`text-xl font-black ${theme.text} mb-4`}>🗺️ Marauder Menu</h2>

      <div className="space-y-2">
        {menuItems.map((item) => {
          const isActive = active === item.label;

          return (
            <button
              key={item.label}
              onClick={() => setActive(item.label)}
              className={`w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-left font-semibold transition ${
                isActive
                  ? `${theme.accent} ${theme.accentText} shadow-md`
                  : "bg-white/60 text-black hover:bg-white"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}