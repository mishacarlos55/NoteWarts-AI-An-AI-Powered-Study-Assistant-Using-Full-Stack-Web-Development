import { useEffect, useState } from "react";
import axios from "axios";
import MagicLayout from "../components/MagicLayout";

export default function HistoryPage() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/history", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setHistory(res.data.history || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchHistory();
  }, []);

  return (
    <MagicLayout>
      <main className="page-card" style={{ marginTop: "34px" }}>
        <h1 className="page-title">Marauder History Trail</h1>

        <div className="activity-list">
          {history.length === 0 && <p>No history yet.</p>}

          {history.map((item) => (
            <div className="activity-card" key={item._id}>
              <h3>{item.type}</h3>
              <p>
                <b>{item.document?.originalName || "Document"}</b>
              </p>
              <p>{item.prompt}</p>
              <p>{item.response?.slice(0, 180)}...</p>
            </div>
          ))}
        </div>
      </main>
    </MagicLayout>
  );
}