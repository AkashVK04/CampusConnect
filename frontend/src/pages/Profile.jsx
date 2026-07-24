import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";

function Profile() {
  const [profile, setProfile] = useState(null);

  const placementReadiness = 85;

  useEffect(() => {
    fetchProfile();
  }, []);
  const role = localStorage.getItem("role");

const roleName =
  role === "ROLE_ADMIN" || role === "ADMIN"
    ? "Administrator"
    : "Student";

  const fetchProfile = async () => {
    try {
      const response = await api.get("/student/profiles");

      if (response.data.length > 0) {
        setProfile(response.data[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!profile) {
    return (
      <div className="flex">
        <Sidebar />

        <div className="flex-1">
          <Navbar />

          <div className="p-8">
            <h1 className="text-2xl font-bold">
              Loading Profile...
            </h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-slate-100 min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-8">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-800">
              Student Profile
            </h1>

            <p className="text-gray-500 mt-2">
              Manage your personal and academic information.
            </p>
          </div>

          {/* Profile Card */}
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

            {/* Banner */}
            <div className="bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-700 h-40"></div>

            <div className="px-8 pb-8">

              {/* Avatar */}
              <div className="-mt-16">
                <div className="w-32 h-32 rounded-full bg-white p-2 shadow-xl">
                  <div className="w-full h-full rounded-full bg-slate-200 flex items-center justify-center text-4xl font-bold text-slate-700">
                    {profile.name?.charAt(0)}
                  </div>
                </div>
              </div>

              {/* Basic Info */}
              <div className="mt-4">
                <h2 className="text-3xl font-bold text-slate-800">
                  {profile.name}
                </h2>

                <p className="text-gray-500">
  {roleName} • CampusConnect
</p>
              </div>

              {/* Stats */}
              <div className="grid md:grid-cols-4 gap-4 mt-8">

                <div className="bg-blue-50 p-5 rounded-2xl">
                  <h3 className="text-gray-500">
                    Placement Readiness
                  </h3>

                  <p className="text-3xl font-bold text-blue-600">
                    {placementReadiness}%
                  </p>
                </div>

                <div className="bg-green-50 p-5 rounded-2xl">
                  <h3 className="text-gray-500">
                    Resume Status
                  </h3>

                  <p className="text-3xl font-bold text-green-600">
                    Uploaded
                  </p>
                </div>

                <div className="bg-purple-50 p-5 rounded-2xl">
                  <h3 className="text-gray-500">
                    Profile Completion
                  </h3>

                  <p className="text-3xl font-bold text-purple-600">
                    95%
                  </p>
                </div>

                <div className="bg-orange-50 p-5 rounded-2xl">
                  <h3 className="text-gray-500">
                    CGPA
                  </h3>

                  <p className="text-3xl font-bold text-orange-600">
                    7.54
                  </p>
                </div>

              </div>

              {/* Information Grid */}
              <div className="grid md:grid-cols-2 gap-6 mt-8">

                <div className="bg-slate-50 p-6 rounded-2xl">
                  <h3 className="font-bold text-xl mb-4">
                    Academic Information
                  </h3>

                  <div className="space-y-4">

                    <div className="flex justify-between">
                      <span className="text-gray-500">
                        USN
                      </span>

                      <span className="font-semibold">
                        {profile.usn}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-500">
                        Branch
                      </span>

                      <span className="font-semibold">
                        {profile.branch}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-500">
                        Year
                      </span>

                      <span className="font-semibold">
                        {profile.year}
                      </span>
                    </div>

                  </div>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl">
                  <h3 className="font-bold text-xl mb-4">
                    Contact Information
                  </h3>

                  <div className="space-y-4">

                    <div className="flex justify-between">
                      <span className="text-gray-500">
                        Email
                      </span>

                      <span className="font-semibold">
                        {profile.email}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-500">
                        Phone
                      </span>

                      <span className="font-semibold">
                        {profile.phone}
                      </span>
                    </div>

                  </div>
                </div>

              </div>

              {/* Skills */}
              <div className="mt-8">

                <h3 className="text-2xl font-bold mb-4">
                  Skills
                </h3>

                <div className="flex flex-wrap gap-3">

                  <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
                    Java
                  </span>

                  <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">
                    Spring Boot
                  </span>

                  <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full">
                    React
                  </span>

                  <span className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full">
                    MySQL
                  </span>

                  <span className="bg-red-100 text-red-700 px-4 py-2 rounded-full">
                    JWT
                  </span>

                  <span className="bg-cyan-100 text-cyan-700 px-4 py-2 rounded-full">
                    Git
                  </span>

                  <span className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full">
                    GitHub
                  </span>

                  <span className="bg-pink-100 text-pink-700 px-4 py-2 rounded-full">
                    REST API
                  </span>

                </div>

              </div>

              {/* Completion Bar */}
              <div className="mt-8">

                <div className="flex justify-between mb-2">
                  <span className="font-semibold">
                    Profile Completion
                  </span>

                  <span className="font-bold">
                    95%
                  </span>
                </div>

                <div className="w-full bg-slate-200 rounded-full h-4">

                  <div
                    className="bg-green-500 h-4 rounded-full"
                    style={{ width: "95%" }}
                  ></div>

                </div>

              </div>

              {/* Placement Ready Banner */}
              <div className="mt-8 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-6">

                <h3 className="text-xl font-bold">
                  Placement Ready 🚀
                </h3>

                <p className="mt-2">
                  Your profile is complete and eligible for placement opportunities.
                </p>

              </div>

            </div>
          </div>

          <Footer />

        </div>
      </div>
    </div>
  );
}

export default Profile;