import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MagicLayout from "../components/MagicLayout";

export default function QuizPage() {
  const navigate = useNavigate();

  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/documents", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setDocuments(res.data.documents || []);
      } catch (err) {
        console.error("Fetch documents error:", err);
      }
    };

    fetchDocuments();
  }, []);

  const handleGenerateQuiz = async () => {
    if (!selectedDocument) {
      alert("Please select a document first");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/ai/quiz",
        {
          documentId: selectedDocument,
          numberOfQuestions,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("QUIZ RESPONSE:", res.data);
      console.log("FINAL QUIZ SENT TO PAGE:", res.data.quiz);



      if (!Array.isArray(res.data.quiz)) {
        console.log("Invalid quiz response:", res.data);
        alert("Quiz was generated in wrong format. Please try again.");
        return;
      }

      navigate("/generated-quiz", {
        state: { quiz: res.data.quiz },
      });
    } catch (err) {
      console.error("Quiz generation error:", err);
      alert(err.response?.data?.message || "Quiz generation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MagicLayout>
      <main className="page-card">
        <h1 className="page-title">Quiz Chamber</h1>

        <section className="page-grid">
          <select
            className="select"
            value={selectedDocument}
            onChange={(e) => setSelectedDocument(e.target.value)}
          >
            <option value="">Select Document</option>

            {documents.map((doc) => (
              <option key={doc._id} value={doc._id}>
                {doc.originalName}
              </option>
            ))}
          </select>

          <select
            className="select"
            value={numberOfQuestions}
            onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
          >
            <option value={5}>5 Questions</option>
            <option value={10}>10 Questions</option>
          </select>

          <button
            type="button"
            className="magic-btn"
            onClick={handleGenerateQuiz}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Quiz"}
          </button>
        </section>
      </main>
    </MagicLayout>
  );
}