// ==============================
// TOKEN HELPERS
// ==============================

export const getToken = () => {
  return localStorage.getItem("mentorai-token");
};

export const setToken = (token) => {
  localStorage.setItem("mentorai-token", token);
};

export const removeToken = () => {
  localStorage.removeItem("mentorai-token");
};


// ==============================
// DATE FORMATTERS
// ==============================

export const formatDate = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const formatTime = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);

  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const timeAgo = (dateString) => {
  if (!dateString) return "";

  const seconds = Math.floor(
    (new Date() - new Date(dateString)) / 1000
  );

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (let key in intervals) {
    const interval = Math.floor(seconds / intervals[key]);

    if (interval >= 1) {
      return `${interval} ${key}${interval > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
};


// ==============================
// FILE HELPERS
// ==============================

export const formatFileSize = (bytes) => {
  if (!bytes) return "0 KB";

  const sizes = ["Bytes", "KB", "MB", "GB"];

  const i = Math.floor(Math.log(bytes) / Math.log(1024));

  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
};

export const getFileTypeIcon = (filename) => {
  if (!filename) return "📄";

  const extension = filename.split(".").pop().toLowerCase();

  switch (extension) {
    case "pdf":
      return "📕";
    case "doc":
    case "docx":
      return "📘";
    case "ppt":
    case "pptx":
      return "📊";
    case "txt":
      return "📄";
    default:
      return "📚";
  }
};


// ==============================
// QUIZ HELPERS
// ==============================

export const calculateScore = (questions, answers) => {
  let score = 0;

  questions.forEach((q) => {
    if (answers[q.id] === q.correctAnswer) {
      score++;
    }
  });

  return score;
};

export const calculatePercentage = (score, total) => {
  if (!total) return 0;

  return Math.round((score / total) * 100);
};


// ==============================
// FLASHCARD HELPERS
// ==============================

export const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};


// ==============================
// TEXT HELPERS
// ==============================

export const truncateText = (text, maxLength = 120) => {
  if (!text) return "";

  return text.length > maxLength
    ? text.substring(0, maxLength) + "..."
    : text;
};

export const capitalize = (text) => {
  if (!text) return "";

  return text.charAt(0).toUpperCase() + text.slice(1);
};


// ==============================
// MARKDOWN SAFE RENDER HELPER
// ==============================

export const safeMarkdown = (text) => {
  if (!text) return "";

  return text
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
};


// ==============================
// STUDY ANALYTICS HELPERS
// ==============================

export const estimateStudyTime = (wordCount) => {
  if (!wordCount) return "0 min";

  const minutes = Math.ceil(wordCount / 200);

  return `${minutes} min read`;
};

export const weakTopicLabel = (score) => {
  if (score >= 80) return "Strong";
  if (score >= 50) return "Moderate";
  return "Weak";
};


// ==============================
// RANDOM ID GENERATOR
// ==============================

export const generateId = () => {
  return Math.random().toString(36).substring(2, 10);
};


// ==============================
// API ERROR PARSER
// ==============================

export const parseApiError = (error) => {
  return (
    error?.response?.data?.message ||
    error?.message ||
    "Something went wrong"
  );
};