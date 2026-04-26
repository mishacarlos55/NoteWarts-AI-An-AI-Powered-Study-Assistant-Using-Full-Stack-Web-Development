const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    originalName: { type: String, required: true },
    storedName: { type: String, required: true },
    filePath: { type: String, required: true },
    fileType: { type: String },
    fileSize: { type: Number },
    extractedText: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Document", documentSchema);