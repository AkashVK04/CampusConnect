import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";

function ResumeUpload() {

  const [file, setFile] = useState(null);
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const response = await api.get("/resume");
      setResumes(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const uploadResume = async () => {

    if (!file) {
      alert("Please select a PDF file.");
      return;
    }

    const formData = new FormData();

    formData.append("studentId", 1);
    formData.append("file", file);

    try {

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

      fetchResumes();

    } catch (err) {
      console.error(err);
      alert("Upload Failed");
    }
  };

  return (
    <div className="flex bg-slate-100 min-h-screen">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-8">

          <h1 className="text-4xl font-bold mb-8">
            Resume Upload
          </h1>

          <div className="bg-white rounded-2xl shadow p-6 mb-8">

            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files[0])}
              className="border rounded-lg p-3 w-full"
            />

            <button
              onClick={uploadResume}
              className="mt-5 bg-blue-600 text-white px-6 py-3 rounded-lg"
            >
              Upload Resume
            </button>

          </div>

          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="text-2xl font-bold mb-5">
              Uploaded Resume
            </h2>

            {resumes.length === 0 ? (

              <p>No Resume Uploaded.</p>

            ) : (

              resumes.map((resume) => (

                <div
                  key={resume.id}
                  className="border rounded-xl p-5 flex justify-between items-center mb-4"
                >

                  <div>

                    <h3 className="font-bold">
                      {resume.fileName}
                    </h3>

                    <p className="text-gray-500">
                      Student ID : {resume.studentId}
                    </p>

                    <p className="text-gray-500">
                      Uploaded :
                      {" "}
                      {resume.uploadedAt}
                    </p>

                  </div>

                  <a
  href={`http://localhost:8080/api/resume/view/${resume.studentId}`}
  target="_blank"
  rel="noreferrer"
  className="bg-green-600 text-white px-5 py-2 rounded-lg"
>
  View
</a>

                </div>

              ))

            )}

          </div>

        </div>

        <Footer />

      </div>

    </div>
  );
}

export default ResumeUpload;