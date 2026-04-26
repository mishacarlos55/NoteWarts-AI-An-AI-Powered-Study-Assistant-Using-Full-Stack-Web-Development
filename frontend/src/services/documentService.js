import API from "./api";

export const uploadDocument = async (file) => {
  const formData = new FormData();
  formData.append("document", file);

  const res = await API.post("/documents/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const getDocuments = async () => {
  const res = await API.get("/documents");
  return res.data;
};

export const deleteDocument = async (id) => {
  const res = await API.delete(`/documents/${id}`);
  return res.data;
};