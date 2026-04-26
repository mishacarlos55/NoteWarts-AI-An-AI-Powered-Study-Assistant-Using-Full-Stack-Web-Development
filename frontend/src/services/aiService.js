import API from "./api";

export const generateSummary = async (documentId) => {
  const res = await API.post("/ai/summary", { documentId });
  return res.data;
};

export const askQuestion = async (documentId, question) => {
  const res = await API.post("/ai/ask", { documentId, question });
  return res.data;
};

export const generateQuiz = async (documentId, numberOfQuestions = 5) => {
  const res = await API.post("/ai/quiz", {
    documentId,
    numberOfQuestions,
  });

  return res.data;
};

export const chatWithNotes = async (documentId, message) => {
  const res = await API.post("/ai/chat", {
    documentId,
    message,
  });

  return res.data;
};

export const getHistory = async () => {
  const res = await API.get("/ai/history");
  return res.data;
};