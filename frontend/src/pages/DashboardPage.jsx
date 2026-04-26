import { useEffect, useState } from "react";
import axios from "axios";
import MagicLayout from "../components/MagicLayout";

export default function DashboardPage() {
  const [data, setData] = useState({
    documentsCount: 0,
    questionsCount: 0,
    quizzesCount: 0,
    recentDocuments: [],
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/dashboard", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <MagicLayout>
      <main className="dashboard-container">
        <h1 className="page-title">Dashboard</h1>

        <section className="page-grid">
          <div className="stat-card">
            <p>Uploaded Scrolls</p>
            <h3>{data.documentsCount}</h3>
          </div>

          <div className="stat-card">
            <p>Questions Asked</p>
            <h3>{data.questionsCount}</h3>
          </div>

          <div className="stat-card">
            <p>Quizzes Created</p>
            <h3>{data.quizzesCount}</h3>
          </div>
        </section>

        <h2 className="page-title" style={{ marginTop: "42px" }}>
          Recent Documents
        </h2>

        <section className="doc-list">
          {data.recentDocuments.length === 0 && <p>No documents uploaded yet.</p>}

          {data.recentDocuments.map((doc) => (
            <div className="doc-card" key={doc._id}>
              <div>
                <h3>📜 {doc.originalName}</h3>
                <p>{doc.fileType || "Uploaded document"}</p>
              </div>
            </div>
          ))}
        </section>
      </main>
    </MagicLayout>
  );
}