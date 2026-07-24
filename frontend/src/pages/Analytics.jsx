import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

function Analytics() {
  const [companies, setCompanies] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const companiesRes = await api.get("/companies");
      const applicationsRes = await api.get("/applications");

      setCompanies(companiesRes.data);
      setApplications(applicationsRes.data);
    } catch (error) {
      console.error(error);
    }
  };

  const shortlisted = applications.filter(
    (a) => a.status === "SHORTLISTED"
  ).length;

  const rejected = applications.filter(
    (a) => a.status === "REJECTED"
  ).length;

  const pending = applications.length - shortlisted - rejected;

  const pieData = [
    { name: "Shortlisted", value: shortlisted },
    { name: "Rejected", value: rejected },
    { name: "Pending", value: pending },
  ];

  const barData = [
    {
      name: "Companies",
      value: companies.length,
    },
    {
      name: "Applications",
      value: applications.length,
    },
    {
      name: "Shortlisted",
      value: shortlisted,
    },
  ];

  const COLORS = [
    "#22c55e",
    "#ef4444",
    "#f59e0b",
  ];

  const successRate =
    applications.length > 0
      ? (
          (shortlisted / applications.length) *
          100
        ).toFixed(0)
      : 0;

  return (
    <div className="flex bg-slate-100 min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-8">

          <div className="mb-8">
            <h1 className="text-4xl font-bold">
              Placement Analytics
            </h1>

            <p className="text-gray-500 mt-2">
              Track placement performance and trends.
            </p>
          </div>

          {/* KPI Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">

            <div className="bg-blue-500 text-white p-6 rounded-2xl">
              <h3>Companies</h3>
              <p className="text-4xl font-bold mt-2">
                {companies.length}
              </p>
            </div>

            <div className="bg-purple-500 text-white p-6 rounded-2xl">
              <h3>Applications</h3>
              <p className="text-4xl font-bold mt-2">
                {applications.length}
              </p>
            </div>

            <div className="bg-green-500 text-white p-6 rounded-2xl">
              <h3>Shortlisted</h3>
              <p className="text-4xl font-bold mt-2">
                {shortlisted}
              </p>
            </div>

            <div className="bg-orange-500 text-white p-6 rounded-2xl">
              <h3>Success Rate</h3>
              <p className="text-4xl font-bold mt-2">
                {successRate}%
              </p>
            </div>

          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-2 gap-8">

            {/* Pie Chart */}
            <div className="bg-white rounded-2xl shadow p-6">

              <h2 className="text-xl font-bold mb-4">
                Application Status
              </h2>

              <ResponsiveContainer
                width="100%"
                height={300}
              >
                <PieChart>

                  <Pie
                    data={pieData}
                    dataKey="value"
                    outerRadius={100}
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={COLORS[index]}
                      />
                    ))}
                  </Pie>

                  <Tooltip />

                </PieChart>
              </ResponsiveContainer>

            </div>

            {/* Bar Chart */}
            <div className="bg-white rounded-2xl shadow p-6">

              <h2 className="text-xl font-bold mb-4">
                Placement Overview
              </h2>

              <ResponsiveContainer
                width="100%"
                height={300}
              >
                <BarChart data={barData}>

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="name" />

                  <YAxis />

                  <Tooltip />

                  <Bar dataKey="value" fill="#3b82f6" />

                </BarChart>
              </ResponsiveContainer>

            </div>

          </div>

        </div>

        <Footer />
      </div>
    </div>
  );
}

export default Analytics;