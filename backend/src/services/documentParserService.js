const fs = require("fs");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");

const parseDocument = async (filePath, mimetype) => {
  if (mimetype === "application/pdf") {
    const buffer = fs.readFileSync(filePath);
    const data = await pdfParse(buffer);
    return data.text || "";
  }

  if (mimetype === "text/plain") {
    return fs.readFileSync(filePath, "utf-8");
  }

  if (
    mimetype ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value || "";
  }

  return "";
};

module.exports = parseDocument;