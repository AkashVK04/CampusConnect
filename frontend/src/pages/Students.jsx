import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";

function Students() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await api.get("/student/profiles");
      setStudents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredStudents = students.filter((student) =>
    student.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex bg-slate-100 min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-8">

          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-800">
              Students Management
            </h1>

            <p className="text-gray-500 mt-2">
              View and manage registered students.
            </p>
          </div>

          {/* Search */}
          <div className="bg-white p-5 rounded-2xl shadow mb-6">
            <input
              type="text"
              placeholder="Search Student..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border p-3 rounded-xl"
            />
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-6">

            <div className="bg-blue-500 text-white p-6 rounded-2xl">
              <h3>Total Students</h3>
              <p className="text-4xl font-bold mt-2">
                {students.length}
              </p>
            </div>

            <div className="bg-green-500 text-white p-6 rounded-2xl">
              <h3>Active Profiles</h3>
              <p className="text-4xl font-bold mt-2">
                {students.length}
              </p>
            </div>

            <div className="bg-purple-500 text-white p-6 rounded-2xl">
              <h3>Placement Ready</h3>
              <p className="text-4xl font-bold mt-2">
                {students.length}
              </p>
            </div>

          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl shadow overflow-hidden">

            <table className="w-full">

              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-left">USN</th>
                  <th className="p-4 text-left">Branch</th>
                  <th className="p-4 text-left">Year</th>
                  <th className="p-4 text-left">Email</th>
                </tr>
              </thead>

              <tbody>

                {filteredStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="border-b hover:bg-slate-50"
                  >
                    <td className="p-4 font-medium">
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

                    <td className="p-4">
                      {student.email}
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

export default Students;