const express = require("express");
const {
  generateSummary,
  askQuestion,
  generateQuiz,
  chatWithNotes,
  getHistory,
} = require("../controllers/aiController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/summary", protect, generateSummary);
router.post("/ask", protect, askQuestion);
router.post("/quiz", protect, generateQuiz);
router.post("/chat", protect, chatWithNotes);
router.get("/history", protect, getHistory);

module.exports = router;