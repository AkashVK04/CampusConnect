import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import api from "../services/api";

function Applications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

 

  const getStatusColor = (status) => {
    switch (status) {
      case "SHORTLISTED":
        return "bg-green-100 text-green-700";

      case "REJECTED":
        return "bg-red-100 text-red-700";

      case "APPLIED":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };
  const fetchApplications = async () => {
  try {
    const response = await api.get("/applications");

    console.log("APPLICATION DATA =", response.data);

    setApplications(response.data);
  } catch (error) {
    console.error(error);
  }
};
console.log(applications);
  return (
    <div className="flex bg-slate-100 min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-8">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-800">
              My Applications
            </h1>

            <p className="text-gray-500 mt-2">
              Track all placement applications and statuses.
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">

            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-6 rounded-2xl shadow">
              <h3>Total Applications</h3>
              <p className="text-3xl font-bold mt-2">
                {applications.length}
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6 rounded-2xl shadow">
              <h3>Shortlisted</h3>
              <p className="text-3xl font-bold mt-2">
                {
                  applications.filter(
                    (a) => a.status === "SHORTLISTED"
                  ).length
                }
              </p>
            </div>

            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-6 rounded-2xl shadow">
              <h3>Rejected</h3>
              <p className="text-3xl font-bold mt-2">
                {
                  applications.filter(
                    (a) => a.status === "REJECTED"
                  ).length
                }
              </p>
            </div>

          </div>

          {/* Applications Table */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

            <div className="p-5 border-b">
              <h2 className="text-xl font-bold">
                Application History
              </h2>
            </div>

            {applications.length === 0 ? (
              <div className="p-10 text-center text-gray-500">
                No applications found.
              </div>
            ) : (
              <table className="w-full">

                <thead className="bg-slate-900 text-white">
                  <tr>
                    <th className="p-4 text-left">
                      Application ID
                    </th>

                    <th className="p-4 text-left">
                      Student Details
                    </th>

                    <th className="p-4 text-left">
                      Company Details
                    </th>

                    <th className="p-4 text-left">
                      Status
                    </th>

                    <th className="p-4 text-left">
                      Remarks
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {applications.map((app) => (
                    <tr
                      key={app.id}
                      className="border-b hover:bg-slate-50 transition"
                    >
                      <td className="p-4 font-medium">
                        #{app.id}
                      </td>

                      {/* Student Details */}
                      <td className="p-4">
                        <div>
                          <p className="font-semibold">
                            {app.studentName}
                          </p>

                          <p className="text-sm text-gray-500">
                            {app.usn}
                          </p>

                          <p className="text-sm text-gray-500">
                            {app.email}
                          </p>
                        </div>
                      </td>

                      {/* Company Details */}
                      <td className="p-4">
                        <div>
                          <p className="font-semibold">
                            {app.companyName}
                          </p>

                          <p className="text-sm text-gray-500">
                            {app.jobRole}
                          </p>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                            app.status
                          )}`}
                        >
                          {app.status}
                        </span>
                      </td>

                      {/* Remarks */}
                      <td className="p-4">
                        {app.remarks || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            )}
          </div>

        </div>

        <Footer />
      </div>
    </div>
  );
}

export default Applications;