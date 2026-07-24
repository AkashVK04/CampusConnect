import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Dashboard() {
  const role = localStorage.getItem("role");

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-8">

          {/* Hero Banner */}

          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 rounded-3xl p-8 text-white shadow-lg mb-8">

            <div className="flex justify-between items-center">

              <div>

                <h1 className="text-4xl font-bold">
                  Welcome Back 👋
                </h1>

                <p className="mt-3 text-blue-100 text-lg">
                  CampusConnect keeps your placement journey organized in one place.
                </p>

              </div>

              <button className="bg-white text-blue-600 hover:bg-slate-100 px-6 py-3 rounded-xl font-semibold transition">
                + Quick Action
              </button>

            </div>

          </div>

          {/* KPI Cards */}

          <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-6 mb-10">

            {/* Card */}

            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

              <p className="text-slate-500">
                Placement Drives
              </p>

              <h2 className="text-5xl font-bold mt-4 text-blue-600">
                24
              </h2>

              <p className="text-green-600 mt-3 font-medium">
                ↑ 12% this month
              </p>

            </div>

            {/* Card */}

            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

              <p className="text-slate-500">
                Companies
              </p>

              <h2 className="text-5xl font-bold mt-4 text-emerald-600">
                18
              </h2>

              <p className="text-green-600 mt-3 font-medium">
                Active Recruiters
              </p>

            </div>

            {/* Card */}

            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

              <p className="text-slate-500">
                Applications
              </p>

              <h2 className="text-5xl font-bold mt-4 text-purple-600">
                42
              </h2>

              <p className="text-green-600 mt-3 font-medium">
                +5 This Week
              </p>

            </div>

            {/* Card */}

            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

              <p className="text-slate-500">
                Resume Score
              </p>

              <h2 className="text-5xl font-bold mt-4 text-orange-500">
                89%
              </h2>

              <p className="text-green-600 mt-3 font-medium">
                Excellent
              </p>

            </div>

          </div>

          {/* Main Layout */}

          <div className="grid lg:grid-cols-3 gap-8">

            {/* LEFT */}

            <div className="lg:col-span-2 space-y-8">

              {/* Recent Activity */}

              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">

                <h2 className="text-2xl font-bold text-slate-800 mb-8">
                  Recent Activity
                </h2>

                <div className="space-y-6">

                  <div className="flex justify-between items-start border-l-4 border-blue-600 pl-5">

                    <div>

                      <h3 className="font-semibold text-lg">
                        Resume Uploaded
                      </h3>

                      <p className="text-slate-500 mt-1">
                        Successfully uploaded the latest resume.
                      </p>

                    </div>

                    <span className="text-sm text-slate-400">
                      Today
                    </span>

                  </div>

                  <div className="flex justify-between items-start border-l-4 border-green-600 pl-5">

                    <div>

                      <h3 className="font-semibold text-lg">
                        Applied to Infosys
                      </h3>

                      <p className="text-slate-500 mt-1">
                        Placement application submitted.
                      </p>

                    </div>

                    <span className="text-sm text-slate-400">
                      Yesterday
                    </span>

                  </div>

                  <div className="flex justify-between items-start border-l-4 border-purple-600 pl-5">

                    <div>

                      <h3 className="font-semibold text-lg">
                        Profile Updated
                      </h3>

                      <p className="text-slate-500 mt-1">
                        Academic details updated successfully.
                      </p>

                    </div>

                    <span className="text-sm text-slate-400">
                      2 Days Ago
                    </span>

                  </div>

                </div>

              </div>

              {/* Upcoming Drives */}

              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">

                <h2 className="text-2xl font-bold mb-8">
                  Upcoming Placement Drives
                </h2>

                <div className="space-y-5">

                  <div className="border border-slate-200 rounded-2xl p-5 hover:shadow-md transition">

                    <div className="flex justify-between">

                      <div>

                        <h3 className="font-bold text-lg">
                          Infosys
                        </h3>

                        <p className="text-slate-500">
                          Software Engineer
                        </p>

                      </div>

                      <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm">
                        8 LPA
                      </span>

                    </div>

                  </div>

                  <div className="border border-slate-200 rounded-2xl p-5 hover:shadow-md transition">

                    <div className="flex justify-between">

                      <div>

                        <h3 className="font-bold text-lg">
                          TCS
                        </h3>

                        <p className="text-slate-500">
                          Ninja Hiring
                        </p>

                      </div>

                      <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm">
                        7 LPA
                      </span>

                    </div>

                  </div>

                  <div className="border border-slate-200 rounded-2xl p-5 hover:shadow-md transition">

                    <div className="flex justify-between">

                      <div>

                        <h3 className="font-bold text-lg">
                          Accenture
                        </h3>

                        <p className="text-slate-500">
                          Associate Software Engineer
                        </p>

                      </div>

                      <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm">
                        6.5 LPA
                      </span>

                    </div>

                  </div>

                </div>

              </div>
                          {/* RIGHT */}

            <div className="space-y-8">

              {/* AI Insights */}

              <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 rounded-3xl text-white p-8 shadow-lg">

                <h2 className="text-2xl font-bold">
                  AI Placement Insights
                </h2>

                <p className="mt-5 text-blue-100 leading-7">
                  Your placement readiness has increased by
                  <span className="font-bold text-white"> 8%</span>
                  this month. Upload an updated resume and apply to
                  more drives to maximize your interview opportunities.
                </p>

                <button className="mt-6 bg-white text-blue-600 px-5 py-3 rounded-xl font-semibold hover:bg-slate-100 transition">
                  View Suggestions
                </button>

              </div>

              {/* Profile Status */}

              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">

                <div className="flex justify-between items-center mb-6">

                  <h2 className="text-xl font-bold">
                    Profile Completion
                  </h2>

                  <span className="font-bold text-green-600">
                    95%
                  </span>

                </div>

                <div className="w-full bg-slate-200 rounded-full h-3">

                  <div
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full"
                    style={{ width: "95%" }}
                  ></div>

                </div>

                <div className="mt-6 space-y-4">

                  <div className="flex justify-between">

                    <span className="text-slate-500">
                      Resume
                    </span>

                    <span className="text-green-600 font-semibold">
                      Uploaded
                    </span>

                  </div>

                  <div className="flex justify-between">

                    <span className="text-slate-500">
                      Profile
                    </span>

                    <span className="text-green-600 font-semibold">
                      Complete
                    </span>

                  </div>

                  <div className="flex justify-between">

                    <span className="text-slate-500">
                      Eligibility
                    </span>

                    <span className="text-blue-600 font-semibold">
                      Ready
                    </span>

                  </div>

                </div>

              </div>

              {/* Quick Actions */}

              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">

                <h2 className="text-xl font-bold mb-6">
                  Quick Actions
                </h2>

                <div className="space-y-4">

                  <button className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-xl font-semibold">
                    Upload Resume
                  </button>

                  <button className="w-full bg-green-600 hover:bg-green-700 transition text-white py-3 rounded-xl font-semibold">
                    Apply Placement Drive
                  </button>

                  <button className="w-full bg-purple-600 hover:bg-purple-700 transition text-white py-3 rounded-xl font-semibold">
                    Update Profile
                  </button>

                  {role === "ROLE_ADMIN" || role === "ADMIN" ? (
                    <button className="w-full bg-orange-500 hover:bg-orange-600 transition text-white py-3 rounded-xl font-semibold">
                      Manage Companies
                    </button>
                  ) : null}

                </div>

              </div>

              {/* System Status */}

              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">

                <h2 className="text-xl font-bold mb-6">
                  CampusConnect Status
                </h2>

                <div className="space-y-4">

                  <div className="flex justify-between">

                    <span className="text-slate-500">
                      Server
                    </span>

                    <span className="text-green-600 font-semibold">
                      ● Online
                    </span>

                  </div>

                  <div className="flex justify-between">

                    <span className="text-slate-500">
                      Database
                    </span>

                    <span className="text-green-600 font-semibold">
                      Connected
                    </span>

                  </div>

                  <div className="flex justify-between">

                    <span className="text-slate-500">
                      Placement Portal
                    </span>

                    <span className="text-green-600 font-semibold">
                      Active
                    </span>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

        <Footer />

      </div>

    </div>
    </div>
  );
}

export default Dashboard;