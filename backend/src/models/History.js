const mongoose = require("mongoose");

const historySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    document: { type: mongoose.Schema.Types.ObjectId, ref: "Document" },
    type: {
      type: String,
      enum: ["summary", "question", "quiz", "chat"],
      required: true,
    },
    prompt: { type: String, default: "" },
    response: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("History", historySchema);