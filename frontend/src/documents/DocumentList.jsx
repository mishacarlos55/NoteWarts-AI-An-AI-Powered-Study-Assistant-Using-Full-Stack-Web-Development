import { useState } from "react";
import DocumentCard from "./DocumentCard";

export default function DocumentList() {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: "DBMS Unit 3 Notes.pdf",
      type: "pdf",
      size: "2.4 MB",
      uploadedAt: "2 hours ago",
    },
    {
      id: 2,
      name: "OS Short Notes.docx",
      type: "docx",
      size: "1.1 MB",
      uploadedAt: "Yesterday",
    },
    {
      id: 3,
      name: "CN Important Questions.txt",
      type: "txt",
      size: "0.2 MB",
      uploadedAt: "3 days ago",
    },
  ]);

  const handleDelete = (id) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
  };

  const handleOpen = (doc) => {
    alert(`Opening ${doc.name}`);
  };

  if (documents.length === 0) {
    return (
      <div className="rounded-3xl border border-black/10 bg-white/70 p-6 text-center text-black/60">
        No documents uploaded yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {documents.map((doc) => (
        <DocumentCard
          key={doc.id}
          name={doc.name}
          type={doc.type}
          size={doc.size}
          uploadedAt={doc.uploadedAt}
          onDelete={() => handleDelete(doc.id)}
          onOpen={() => handleOpen(doc)}
        />
      ))}
    </div>
  );
}