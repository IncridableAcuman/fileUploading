import { useState, useEffect, useContext } from "react";
import axiosInstance from "../api/api";
import { toast } from "react-toastify";
import { ThemeContext } from "../contexts/ThemeProvider";

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const {theme} = useContext(ThemeContext);
  // Fayllarni olish
  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const res = await axiosInstance.get("/files/my-file");
      setFiles(res.data);
    } catch (error) {
      console.error("Error fetching files:", error);
      toast.error("Error fetching files")
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return toast.info("Please select a file");
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    
    try {
      await axiosInstance.post("/files/upload", formData);
      toast.success("File uploaded successfully");
      fetchFiles();
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("File upload failed");
    }
    setLoading(false);
  };

  return (
    <div className={`p-6 max-w-lg mx-auto ${theme === "light" ? "text-white bg-slate-950 shadow-white" :"text-black"} shadow-md rounded-xl`}>
      <h2 className="text-xl font-semibold mb-4">File Upload</h2>
      <input type="file" onChange={handleFileChange} className="mb-2" />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>

      <h3 className="text-lg font-semibold mt-6">My Files</h3>
      <ul className="mt-2">
        {files.map((file) => (
          <li key={file._id} className="flex justify-between items-center border-b py-2">
            <span>{file.fileName}</span>
            <a
              href={`http://localhost:8080/api/files/download/${file._id}`}
              className="text-blue-600 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
