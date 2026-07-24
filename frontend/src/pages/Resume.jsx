import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";

function Resume() {
  const [file, setFile] = useState(null);

  const uploadResume = async () => {

    if (!file) {
      alert("Please choose a PDF");
      return;
    }

    try {

      const email = localStorage.getItem("email");

      const studentResponse =
        await api.get(`/student/email/${email}`);

      const studentId = studentResponse.data.id;

      const formData = new FormData();

      formData.append("studentId", studentId);
      formData.append("file", file);

      await api.post(
        "/resume/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Resume Uploaded Successfully");

      setFile(null);

    } catch (error) {
      console.error(error);
      alert("Upload Failed");
    }
  };

  return (
    <div className="flex bg-slate-950 min-h-screen">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-8">

          <h1 className="text-4xl font-bold text-white mb-8">
            Resume Upload
          </h1>

          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800">

            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files[0])}
              className="text-white"
            />

            <button
              onClick={uploadResume}
              className="mt-6 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl text-white font-semibold"
            >
              Upload Resume
            </button>

          </div>

        </div>

        <Footer />

      </div>

    </div>
  );
}

export default Resume;