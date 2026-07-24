import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";
import {
  Calendar,
  MapPin,
  Briefcase,
  Building2,
  Users,
  Pencil,
  Trash2,
  Eye,
  Send,
} from "lucide-react";

function PlacementDrives() {
  const [drives, setDrives] = useState([]);

  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchDrives();
  }, []);

  const fetchDrives = async () => {
    try {
      const response = await api.get("/drives");
      setDrives(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const applyToDrive = async (driveId) => {
    try {
      await api.post("/applications", {
        studentId: 1,
        companyId: driveId,
        remarks: "Applied through CampusConnect",
      });

      alert("Application Submitted Successfully");
    } catch (error) {
      console.error(error);
      alert("Application Failed");
    }
  };

  const deleteDrive = async (driveId) => {
    if (!window.confirm("Delete this placement drive?")) return;

    try {
      await api.delete(`/drives/${driveId}`);
      fetchDrives();
    } catch (error) {
      console.error(error);
    }
  };

  const editDrive = async (drive) => {
    const companyName = prompt(
      "Company Name",
      drive.companyName
    );

    const roleName = prompt(
      "Role",
      drive.role
    );

    const location = prompt(
      "Location",
      drive.location
    );

    if (!companyName || !roleName || !location)
      return;

    try {
      await api.put(`/drives/${drive.id}`, {
        ...drive,
        companyName,
        role: roleName,
        location,
      });

      fetchDrives();
    } catch (error) {
      console.error(error);
    }
  };

  const viewApplicants = async (driveId) => {
    try {
      const response = await api.get(
        `/applications/company/${driveId}`
      );

      if (response.data.length === 0) {
        alert("No Applicants");
        return;
      }

      alert(
        response.data
          .map(
            (a) =>
              `${a.studentName}\n${a.email}\n${a.status}`
          )
          .join("\n\n")
      );
    } catch (error) {
      console.error(error);
    }
  };

  const statusColor = (status) => {
    switch (status) {
      case "ONGOING":
        return "bg-green-100 text-green-700";

      case "UPCOMING":
        return "bg-blue-100 text-blue-700";

      case "COMPLETED":
        return "bg-slate-200 text-slate-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <div className="flex bg-slate-50 min-h-screen">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <main className="p-8">

          {/* Header */}

          <div className="flex justify-between items-center mb-10">

            <div>

              <h1 className="text-4xl font-bold text-slate-900">
                Placement Drives
              </h1>

              <p className="text-slate-500 mt-2">
                Manage recruitment drives and applications.
              </p>

            </div>

            <button className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
              + New Drive
            </button>

          </div>

          {/* KPI */}

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-10">

            <div className="bg-white rounded-2xl shadow p-6">

              <p className="text-slate-500">
                Total Drives
              </p>

              <h2 className="text-4xl font-bold mt-3 text-blue-600">
                {drives.length}
              </h2>

            </div>

            <div className="bg-white rounded-2xl shadow p-6">

              <p className="text-slate-500">
                Ongoing
              </p>

              <h2 className="text-4xl font-bold mt-3 text-green-600">
                {
                  drives.filter(
                    d => d.status === "ONGOING"
                  ).length
                }
              </h2>

            </div>

            <div className="bg-white rounded-2xl shadow p-6">

              <p className="text-slate-500">
                Upcoming
              </p>

              <h2 className="text-4xl font-bold mt-3 text-orange-500">
                {
                  drives.filter(
                    d => d.status === "UPCOMING"
                  ).length
                }
              </h2>

            </div>

            <div className="bg-white rounded-2xl shadow p-6">

              <p className="text-slate-500">
                Companies
              </p>

              <h2 className="text-4xl font-bold mt-3 text-purple-600">
                {new Set(drives.map(d => d.companyName)).size}
              </h2>

            </div>

          </div>

          {/* Cards */}

          <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-6">
            
{drives.map((drive) => (
  <div
    key={drive.id}
    className="bg-white rounded-2xl shadow hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200"
  >

    {/* Card Header */}

    <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-6 text-white">

      <div className="flex justify-between items-start">

        <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">

          <Building2 size={30} />

        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor(
            drive.status
          )}`}
        >
          {drive.status}
        </span>

      </div>

      <h2 className="text-2xl font-bold mt-5">
        {drive.companyName}
      </h2>

      <p className="opacity-90 mt-2">
        {drive.role}
      </p>

    </div>

    {/* Card Body */}

    <div className="p-6 space-y-5">

      <div className="flex items-center gap-3">

        <Calendar
          size={18}
          className="text-blue-600"
        />

        <span className="text-slate-700">
          {drive.driveDate}
        </span>

      </div>

      <div className="flex items-center gap-3">

        <MapPin
          size={18}
          className="text-red-500"
        />

        <span className="text-slate-700">
          {drive.location}
        </span>

      </div>

      <div className="flex items-center gap-3">

        <Briefcase
          size={18}
          className="text-green-600"
        />

        <span className="text-slate-700">
          {drive.role}
        </span>

      </div>

      {/* Student Buttons */}

      {role === "ROLE_STUDENT" && (

        <button
          onClick={() => applyToDrive(drive.id)}
          className="w-full h-11 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center justify-center gap-2 transition"
        >

          <Send size={18} />

          Apply Now

        </button>

      )}

      {/* Admin Buttons */}

      {role === "ROLE_ADMIN" && (

        <div className="grid grid-cols-3 gap-3">

          <button
            onClick={() => editDrive(drive)}
            className="h-11 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 transition"
          >

            <Pencil size={16} />

            Edit

          </button>

          <button
            onClick={() => deleteDrive(drive.id)}
            className="h-11 rounded-xl bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-2 transition"
          >

            <Trash2 size={16} />

            Delete

          </button>

          <button
            onClick={() =>
              viewApplicants(drive.id)
            }
            className="h-11 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-2 transition"
          >

            <Eye size={16} />

            View

          </button>

        </div>

      )}

    </div>

  </div>
))}

</div>

{/* Empty State */}

{drives.length === 0 && (

  <div className="bg-white rounded-2xl shadow p-16 text-center border border-slate-200">

    <Users
      size={64}
      className="mx-auto text-slate-300"
    />

    <h2 className="text-2xl font-bold mt-6 text-slate-800">
      No Placement Drives
    </h2>

    <p className="text-slate-500 mt-2">
      New placement drives will appear here.
    </p>

  </div>

)}

</main>

<Footer />

</div>

</div>

);
}

export default PlacementDrives;