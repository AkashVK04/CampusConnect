import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import api from "../services/api";

function AdminApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await api.get("/applications");
      setApplications(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const shortlist = async (id) => {
    try {
      await api.put(`/applications/${id}/shortlist`);
      fetchApplications();
    } catch (error) {
      console.error(error);
    }
  };

  const reject = async (id) => {
    try {
      await api.put(`/applications/${id}/reject`);
      fetchApplications();
    } catch (error) {
      console.error(error);
    }
  };

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

  return (
    <div className="flex bg-slate-100 min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-8">
          <h1 className="text-4xl font-bold mb-8">
            Application Management
          </h1>

          <div className="bg-white rounded-2xl shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="p-4 text-left">ID</th>
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
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {applications.map((app) => (
                  <tr
                    key={app.id}
                    className="border-b hover:bg-slate-50"
                  >
                    <td className="p-4 font-semibold">
                      #{app.id}
                    </td>

                    <td className="p-4">
                      <div>
                        <p className="font-semibold">
                          {app.studentName || "N/A"}
                        </p>

                        <p className="text-sm text-gray-500">
                          {app.usn || "-"}
                        </p>

                        <p className="text-sm text-gray-500">
                          {app.email || "-"}
                        </p>
                      </div>
                    </td>

                    <td className="p-4">
                      <div>
                        <p className="font-semibold">
                          {app.companyName ||
                            "Deleted Company"}
                        </p>

                        <p className="text-sm text-gray-500">
                          {app.jobRole || "-"}
                        </p>
                      </div>
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                          app.status
                        )}`}
                      >
                        {app.status}
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            shortlist(app.id)
                          }
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                        >
                          Shortlist
                        </button>

                        <button
                          onClick={() =>
                            reject(app.id)
                          }
                          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {applications.length === 0 && (
              <div className="p-10 text-center text-gray-500">
                No applications found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminApplications;