const axios = require("axios");

const callAI = async (prompt) => {
  try {
    const model = process.env.OLLAMA_MODEL || "qwen2:0.5b";
    const url = process.env.OLLAMA_URL || "http://localhost:11434";

    const response = await axios.post(`${url}/api/chat`, {
      model,
      messages: [
        {
          role: "system",
          content:
            "You are a helpful AI study assistant. Answer clearly from the provided notes.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      stream: false,
    });

    return response.data.message.content;
  } catch (error) {
    console.error("Ollama error:", error.message);
    throw new Error("Local AI error. Ensure Ollama is running.");
  }
};

module.exports = { callAI };