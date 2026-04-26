import { useEffect, useRef, useState } from "react";
import { houseThemes, getSavedHouse } from "../utils/houseTheme";

export default function ChatBox() {
  const [house, setHouse] = useState(getSavedHouse());
  const theme = houseThemes[house];

  const [input, setInput] = useState("");
  const [difficulty, setDifficulty] = useState("intermediate");
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      text: "Welcome to MentorAI. Ask me anything from your uploaded study materials.",
      time: "Now",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    const syncHouse = () => setHouse(getSavedHouse());
    window.addEventListener("storage", syncHouse);
    window.addEventListener("house-changed", syncHouse);
    return () => {
      window.removeEventListener("storage", syncHouse);
      window.removeEventListener("house-changed", syncHouse);
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      text: input,
      time: "Just now",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const aiReply = {
        id: Date.now() + 1,
        role: "assistant",
        text: `Here is a ${difficulty}-level explanation based on your uploaded documents. Later, this will come from your RAG backend.`,
        time: "Just now",
      };

      setMessages((prev) => [...prev, aiReply]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className={`rounded-3xl border ${theme.border} ${theme.card} shadow-xl p-5`}>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-4">
        <div>
          <h2 className={`text-2xl font-black ${theme.text}`}>💬 AI Chat Assistant</h2>
          <p className="text-sm text-black/70">
            Ask questions from your uploaded PDFs, DOCX files, and notes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-black/70">Difficulty</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="rounded-xl border border-black/10 bg-white/80 px-3 py-2 text-sm outline-none"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>

      <div className="h-[420px] overflow-y-auto rounded-2xl bg-white/50 border border-black/10 p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${
                msg.role === "user"
                  ? `${theme.accent} ${theme.accentText}`
                  : "bg-white text-black border border-black/10"
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
              <p className="mt-2 text-[11px] opacity-70">{msg.time}</p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="rounded-2xl px-4 py-3 bg-white border border-black/10 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="text-sm text-black/70">MentorAI is typing</span>
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-black/50 animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-black/50 animate-bounce [animation-delay:0.15s]" />
                  <span className="w-2 h-2 rounded-full bg-black/50 animate-bounce [animation-delay:0.3s]" />
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="mt-4 flex flex-col gap-3 md:flex-row">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={3}
          placeholder="Ask a question from your uploaded documents..."
          className="flex-1 rounded-2xl border border-black/10 bg-white/80 px-4 py-3 outline-none resize-none"
        />
        <button
          onClick={handleSend}
          className={`rounded-2xl px-6 py-3 font-bold shadow-md transition hover:scale-[1.02] ${theme.accent} ${theme.accentText}`}
        >
          Send ✨
        </button>
      </div>
    </div>
  );
}