const Document = require("../models/Document");
const History = require("../models/History");
const { callAI } = require("../services/openaiService");

const limitText = (text, max = 3000) => {
  if (!text) return "";
  return text.length > max ? text.slice(0, max) : text;
};

const generateSummary = async (req, res) => {
  try {
    const { documentId } = req.body;

    const document = await Document.findOne({
      _id: documentId,
      user: req.user._id,
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    const prompt = `
Summarize these notes for exam preparation.

Give:
1. Short overview
2. Important points
3. Revision notes

Notes:
${limitText(document.extractedText)}
`;

    const response = await callAI(prompt);

    await History.create({
      user: req.user._id,
      document: document._id,
      type: "summary",
      prompt: "Generate summary",
      response: response || "No summary generated",
    });

    res.json({ success: true, summary: response });
  } catch (error) {
    console.error("Summary error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const askQuestion = async (req, res) => {
  try {
    const { documentId, question } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

    const document = await Document.findOne({
      _id: documentId,
      user: req.user._id,
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    const prompt = `
Answer using only the notes below.

Question:
${question}

Notes:
${limitText(document.extractedText)}
`;

    const response = await callAI(prompt);

    await History.create({
      user: req.user._id,
      document: document._id,
      type: "question",
      prompt: question,
      response: response || "No answer generated",
    });

    res.json({ success: true, answer: response });
  } catch (error) {
    console.error("Question error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const generateQuiz = async (req, res) => {
  try {
    const { documentId, numberOfQuestions = 5 } = req.body;

    const document = await Document.findOne({
      _id: documentId,
      user: req.user._id,
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    if (!document.extractedText) {
      return res.status(400).json({
        success: false,
        message: "This document has no extracted text.",
      });
    }

    const notes = limitText(document.extractedText, 3000);

    const prompt = `
Create ${numberOfQuestions} multiple choice questions from the study notes below.

Return only JSON array. No markdown.

Rules:
- Do not use placeholder text.
- Do not write "Question text".
- Do not write "Option A".
- Use actual content from the notes.
- Each question needs 4 options.
- The answer must exactly match one option.

Study notes:
${notes}

Return JSON now.
`;

    const aiResponse = await callAI(prompt);

    let quiz = [];

    try {
      const cleaned = String(aiResponse)
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const start = cleaned.indexOf("[");
      const end = cleaned.lastIndexOf("]");

      if (start !== -1 && end !== -1) {
        quiz = JSON.parse(cleaned.slice(start, end + 1));
      }
    } catch (error) {
      console.log("AI parse failed:", aiResponse);
    }

    quiz = Array.isArray(quiz) ? quiz : [];

    quiz = quiz.filter(
      (q) =>
        q.question &&
        !q.question.toLowerCase().includes("question text") &&
        Array.isArray(q.options) &&
        q.options.length >= 4 &&
        !q.options.some((opt) =>
          String(opt).toLowerCase().includes("option a")
        ) &&
        q.answer
    );

    if (quiz.length === 0) {
      const lines = notes
        .split(/\n|\.|\?|!/)
        .map((s) => s.trim())
        .filter((s) => s.length > 25);

      const sourceLines =
        lines.length > 0
          ? lines
          : ["This topic is explained in the uploaded document."];

      quiz = Array.from({ length: Number(numberOfQuestions) }).map((_, index) => {
        const correct = sourceLines[index % sourceLines.length].slice(0, 140);

        return {
          question: `According to the uploaded notes, which statement is correct?`,
          options: [
            correct,
            "This statement is not related to the uploaded notes.",
            "This is only a formatting instruction.",
            "The document does not discuss any study topic.",
          ],
          answer: correct,
          explanation: "This answer is taken from the uploaded document content.",
        };
      });
    }

    quiz = quiz.slice(0, Number(numberOfQuestions)).map((q) => ({
      question: q.question,
      options: q.options.slice(0, 4),
      answer: q.options.includes(q.answer) ? q.answer : q.options[0],
      explanation: q.explanation || "Explanation not provided.",
    }));

    await History.create({
      user: req.user._id,
      document: document._id,
      type: "quiz",
      prompt: `Generate ${numberOfQuestions} MCQ questions`,
      response: JSON.stringify(quiz),
    });

    res.json({
      success: true,
      quiz,
    });
  } catch (error) {
    console.error("Quiz error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Quiz generation failed",
    });
  }
};
const chatWithNotes = async (req, res) => {
  try {
    const { documentId, message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const document = await Document.findOne({
      _id: documentId,
      user: req.user._id,
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    const prompt = `
You are an AI chatbot for uploaded study notes.

Reply clearly, like a helpful tutor.

Student message:
${message}

Uploaded notes:
${limitText(document.extractedText)}
`;

    const response = await callAI(prompt);

    await History.create({
      user: req.user._id,
      document: document._id,
      type: "chat",
      prompt: message,
      response: response || "No reply generated",
    });

    res.json({
      success: true,
      reply: response,
    });
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getHistory = async (req, res) => {
  try {
    const history = await History.find({ user: req.user._id })
      .populate("document", "originalName")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      history,
    });
  } catch (error) {
    console.error("History error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  generateSummary,
  askQuestion,
  generateQuiz,
  chatWithNotes,
  getHistory,
};