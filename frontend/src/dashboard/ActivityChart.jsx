import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { houseThemes, getSavedHouse } from "../utils/houseTheme";

const data = [
  { day: "Mon", uploads: 2, quizzes: 1 },
  { day: "Tue", uploads: 3, quizzes: 2 },
  { day: "Wed", uploads: 1, quizzes: 4 },
  { day: "Thu", uploads: 4, quizzes: 3 },
  { day: "Fri", uploads: 2, quizzes: 5 },
  { day: "Sat", uploads: 5, quizzes: 2 },
  { day: "Sun", uploads: 3, quizzes: 4 },
];

export default function ActivityChart() {
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
        <h2 className={`text-2xl font-black ${theme.text}`}>📈 Study Activity</h2>
        <p className="text-sm text-black/70">
          Weekly uploads and quiz generation activity.
        </p>
      </div>

      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="uploads" stroke="#7c3aed" strokeWidth={3} />
            <Line type="monotone" dataKey="quizzes" stroke="#f59e0b" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}