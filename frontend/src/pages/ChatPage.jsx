import { useEffect, useState } from "react";
import axios from "axios";
import MagicLayout from "../components/MagicLayout";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Welcome. Select a document and ask me anything from your notes.",
    },
  ]);

  const [input, setInput] = useState("");
  const [documents, setDocuments] = useState([]);
  const [selectedDocumentId, setSelectedDocumentId] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/documents", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setDocuments(res.data.documents || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDocuments();
  }, [token]);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    if (!selectedDocumentId) {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Please select one uploaded document first.",
        },
      ]);
      return;
    }

    const userText = input;
    setInput("");
    setLoading(true);

    setMessages((prev) => [...prev, { role: "user", text: userText }]);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/ai/chat",
        {
          documentId: selectedDocumentId,
          message: userText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: res.data.reply || "No reply received.",
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text:
            error.response?.data?.message ||
            "AI chat failed. Check backend, token, document upload, and Ollama.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MagicLayout>
      <section className="chat-page">
        <aside className="chat-sidebar">
          <img src="/images/hegwig.gif" className="hedwig-chat" alt="Hedwig" />

          <h2>Spell Books</h2>
          <p>Select one document before asking questions.</p>

          {documents.length === 0 ? (
            <p>No uploaded documents found.</p>
          ) : (
            documents.map((doc) => (
              <button
                key={doc._id}
                type="button"
                className={selectedDocumentId === doc._id ? "active-doc" : ""}
                onClick={() => setSelectedDocumentId(doc._id)}
              >
                📜 {doc.originalName || doc.fileName || doc.filename}
              </button>
            ))
          )}
        </aside>

        <main className="chat-main">
          <div className="chat-header">
            <div>
              <p>AI Study Familiar</p>
              <h1>🦉 Ask Your Notes</h1>
            </div>
            <span>{loading ? "Thinking..." : "Online"}</span>
          </div>

          <div className="chat-window">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={
                  msg.role === "user"
                    ? "bubble user-bubble"
                    : "bubble bot-bubble"
                }
              >
                <b>{msg.role === "user" ? "🧙 You" : "🦉 NoteWarts AI"}</b>
                <p>{msg.text}</p>
              </div>
            ))}

            {loading && (
              <div className="bubble bot-bubble">
                <b>🦉 NoteWarts AI</b>
                <p>Reading your notes...</p>
              </div>
            )}
          </div>

          <form className="chat-form" onSubmit={sendMessage}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something from your selected notes..."
            />
            <button type="submit" disabled={loading}>
              {loading ? "Casting..." : "Cast"}
            </button>
          </form>
        </main>
      </section>
    </MagicLayout>
  );
}