import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";

function AdminDashboard() {
  const [students, setStudents] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [applications, setApplications] = useState([]);
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const studentsRes = await api.get("/student/profiles");
      const companiesRes = await api.get("/companies");
      const applicationsRes = await api.get("/applications");
      const resumesRes = await api.get("/resumes");

      setStudents(studentsRes.data);
      setCompanies(companiesRes.data);
      setApplications(applicationsRes.data);
      setResumes(resumesRes.data);
    } catch (error) {
      console.error(error);
    }
  };

  const shortlistedCount = applications.filter(
    (app) => app.status === "SHORTLISTED"
  ).length;

  const rejectedCount = applications.filter(
    (app) => app.status === "REJECTED"
  ).length;

  return (
    <div className="flex bg-slate-100 min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-8">

          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-800">
              Admin Dashboard
            </h1>

            <p className="text-gray-500 mt-2">
              Placement Officer Control Center
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">

            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-6 rounded-3xl shadow">
              <h3>Total Students</h3>
              <p className="text-4xl font-bold mt-2">
                {students.length}
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-3xl shadow">
              <h3>Total Companies</h3>
              <p className="text-4xl font-bold mt-2">
                {companies.length}
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6 rounded-3xl shadow">
              <h3>Applications</h3>
              <p className="text-4xl font-bold mt-2">
                {applications.length}
              </p>
            </div>

            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 rounded-3xl shadow">
              <h3>Uploaded Resumes</h3>
              <p className="text-4xl font-bold mt-2">
                {resumes.length}
              </p>
            </div>

          </div>

          {/* Quick Actions */}
          <div className="mt-8 bg-white rounded-3xl shadow p-6">

            <h2 className="text-2xl font-bold mb-5">
              Quick Actions
            </h2>

            <div className="grid md:grid-cols-4 gap-4">

              <button className="bg-blue-600 text-white p-4 rounded-xl">
                Add Company
              </button>

              <button className="bg-green-600 text-white p-4 rounded-xl">
                View Students
              </button>

              <button className="bg-purple-600 text-white p-4 rounded-xl">
                View Applications
              </button>

              <button className="bg-orange-600 text-white p-4 rounded-xl">
                View Resumes
              </button>

            </div>

          </div>

          {/* Analytics */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">

            <div className="bg-white rounded-3xl shadow p-6">

              <h2 className="text-xl font-bold mb-4">
                Placement Analytics
              </h2>

              <div className="space-y-4">

                <div className="flex justify-between">
                  <span>Total Applications</span>
                  <span className="font-bold">
                    {applications.length}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Shortlisted</span>
                  <span className="font-bold text-green-600">
                    {shortlistedCount}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Rejected</span>
                  <span className="font-bold text-red-600">
                    {rejectedCount}
                  </span>
                </div>

              </div>

            </div>

            <div className="bg-white rounded-3xl shadow p-6">

              <h2 className="text-xl font-bold mb-4">
                System Overview
              </h2>

              <div className="space-y-4">

                <div className="flex justify-between">
                  <span>Students</span>
                  <span>{students.length}</span>
                </div>

                <div className="flex justify-between">
                  <span>Companies</span>
                  <span>{companies.length}</span>
                </div>

                <div className="flex justify-between">
                  <span>Resumes</span>
                  <span>{resumes.length}</span>
                </div>

              </div>

            </div>

          </div>

          {/* Students Table */}
          <div className="bg-white rounded-3xl shadow mt-8 overflow-hidden">

            <div className="p-5 border-b">
              <h2 className="text-xl font-bold">
                Recent Students
              </h2>
            </div>

            <table className="w-full">

              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-left">USN</th>
                  <th className="p-4 text-left">Branch</th>
                  <th className="p-4 text-left">Year</th>
                </tr>
              </thead>

              <tbody>

                {students.slice(0, 5).map((student) => (
                  <tr
                    key={student.id}
                    className="border-b hover:bg-slate-50"
                  >
                    <td className="p-4">
                      {student.name}
                    </td>

                    <td className="p-4">
                      {student.usn}
                    </td>

                    <td className="p-4">
                      {student.branch}
                    </td>

                    <td className="p-4">
                      {student.year}
                    </td>
                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </div>

        <Footer />
      </div>
    </div>
  );
}

export default AdminDashboard;