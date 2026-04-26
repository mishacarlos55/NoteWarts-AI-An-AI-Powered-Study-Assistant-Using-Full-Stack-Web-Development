import { useRef, useState } from "react";
import axios from "axios";
import MagicLayout from "../components/MagicLayout";

export default function DocumentsPage() {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChooseFile = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setMessage("");
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage("Please choose a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("document", selectedFile);

    try {
      setLoading(true);
      setMessage("");

      const res = await axios.post(
        "http://localhost:5000/api/documents/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage("Document uploaded successfully.");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MagicLayout>
      <main className="page-card" style={{ marginTop: "34px" }}>
        <h1 className="page-title">Magical Documents</h1>

        <div className="upload-box">
          <span>📜</span>
          <h2>Upload Scroll</h2>
          <p>PDF, DOCX, TXT supported</p>

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx,.txt"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />

          <button type="button" className="magic-btn" onClick={handleChooseFile}>
            Choose File
          </button>

          {selectedFile && (
            <p style={{ marginTop: "12px" }}>
              Selected: {selectedFile.name}
            </p>
          )}

          <button
            type="button"
            className="magic-btn"
            onClick={handleUpload}
            disabled={loading}
            style={{ marginTop: "14px" }}
          >
            {loading ? "Uploading..." : "Upload Document"}
          </button>

          {message && <p style={{ marginTop: "12px" }}>{message}</p>}
        </div>
      </main>
    </MagicLayout>
  );
}