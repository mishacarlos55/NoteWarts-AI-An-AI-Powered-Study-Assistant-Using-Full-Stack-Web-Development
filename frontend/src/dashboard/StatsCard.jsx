import { useEffect, useState } from "react";
import { houseThemes, getSavedHouse } from "../utils/houseTheme";

export default function StatsCard({ title, value, icon, change, positive = true }) {
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
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-black/60">
            {title}
          </p>
          <h3 className={`mt-2 text-3xl font-black ${theme.text}`}>{value}</h3>
        </div>

        <div className="text-3xl">{icon}</div>
      </div>

      <div className="mt-4">
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
            positive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {change}
        </span>
      </div>
    </div>
  );
}