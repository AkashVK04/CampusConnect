import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";

function Companies() {
  const [companies, setCompanies] = useState([]);

  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await api.get("/companies");
      setCompanies(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const applyToDrive = async (companyId) => {
    try {
      const email = localStorage.getItem("email");

      const studentResponse =
        await api.get(`/student/email/${email}`);

      const studentId =
        studentResponse.data.id;

      await api.post("/applications", {
        studentId,
        companyId,
        remarks: "Applied through CampusConnect",
      });

      alert("Application Submitted Successfully!");

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Application Failed"
      );
    }
  };

  const addCompany = async () => {
    const companyName = prompt("Company Name");
    if (!companyName) return;

    const jobRole = prompt("Job Role");
    if (!jobRole) return;

    const packageLpa = prompt("Package (LPA)");
    if (!packageLpa) return;

    const minCgpa = prompt("Minimum CGPA");
    if (!minCgpa) return;

    try {
      await api.post("/company", {
        companyName,
        jobRole,
        packageLpa,
        minCgpa,
      });

      alert("Company Added Successfully");

      fetchCompanies();

    } catch (error) {
      console.error(error);
      alert("Failed to Add Company");
    }
  };

  const editCompany = async (company) => {
    const companyName = prompt(
      "Company Name",
      company.companyName
    );

    if (!companyName) return;

    const jobRole = prompt(
      "Job Role",
      company.jobRole
    );

    if (!jobRole) return;

    const packageLpa = prompt(
      "Package (LPA)",
      company.packageLpa
    );

    if (!packageLpa) return;

    const minCgpa = prompt(
      "Minimum CGPA",
      company.minCgpa
    );

    if (!minCgpa) return;

    try {
      await api.put(`/company/${company.id}`, {
        companyName,
        jobRole,
        packageLpa,
        minCgpa,
      });

      alert("Company Updated Successfully");

      fetchCompanies();

    } catch (error) {
      console.error(error);
      alert("Update Failed");
    }
  };

  const deleteCompany = async (company) => {
    const confirmDelete = window.confirm(
      `Delete ${company.companyName}?`
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/company/${company.id}`);

      alert("Company Deleted Successfully");

      fetchCompanies();

    } catch (error) {
      console.error(error);
      alert("Delete Failed");
    }
  };

  const highestPackage =
    companies.length > 0
      ? Math.max(...companies.map((c) => c.packageLpa))
      : 0;

  return (
    <div className="flex bg-slate-50 min-h-screen">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-8 max-w-7xl mx-auto">

          <div className="flex justify-between items-center mb-10">

            <div>

              <h1 className="text-4xl font-bold text-slate-900">
                Placement Companies
              </h1>

              <p className="text-slate-500 mt-2">
                Explore placement opportunities from top recruiters.
              </p>

            </div>

            {(role === "ROLE_ADMIN" ||
              role === "ADMIN") && (

              <button
                onClick={addCompany}
                className="h-11 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow"
              >
                + Add Company
              </button>

            )}

          </div>

          {/* Stats */}

          <div className="grid md:grid-cols-3 gap-6 mb-10">

            <div className="bg-white rounded-2xl shadow p-6">

              <p className="text-slate-500">
                Total Companies
              </p>

              <h2 className="text-4xl font-bold mt-3 text-slate-900">
                {companies.length}
              </h2>

            </div>

            <div className="bg-white rounded-2xl shadow p-6">

              <p className="text-slate-500">
                Highest Package
              </p>

              <h2 className="text-4xl font-bold mt-3 text-green-600">
                {highestPackage} LPA
              </h2>

            </div>

            <div className="bg-white rounded-2xl shadow p-6">

              <p className="text-slate-500">
                Hiring Status
              </p>

              <h2 className="text-4xl font-bold mt-3 text-blue-600">
                Active
              </h2>

            </div>

          </div>

          {companies.length === 0 ? (

            <div className="bg-white rounded-2xl shadow p-12 text-center">

              <h2 className="text-2xl font-bold text-slate-900">
                No Companies Available
              </h2>

              <p className="text-slate-500 mt-3">
                Placement companies will appear here.
              </p>

            </div>

          ) : (

            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
                            {companies.map((company) => (

                <div
                  key={company.id}
                  className="bg-white rounded-2xl shadow hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6 border border-slate-200"
                >

                  <div className="flex items-center gap-4 mb-6">

                    <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-700 text-2xl font-bold">
                      {company.companyName?.charAt(0)}
                    </div>

                    <div>

                      <h2 className="text-2xl font-bold text-slate-900">
                        {company.companyName}
                      </h2>

                      <p className="text-slate-500">
                        Company ID #{company.id}
                      </p>

                    </div>

                  </div>

                  <div className="space-y-4">

                    <div className="flex justify-between">

                      <span className="text-slate-500">
                        Job Role
                      </span>

                      <span className="font-semibold text-slate-900">
                        {company.jobRole}
                      </span>

                    </div>

                    <div className="flex justify-between">

                      <span className="text-slate-500">
                        Package
                      </span>

                      <span className="font-semibold text-green-600">
                        {company.packageLpa} LPA
                      </span>

                    </div>

                    <div className="flex justify-between">

                      <span className="text-slate-500">
                        Minimum CGPA
                      </span>

                      <span className="font-semibold text-blue-600">
                        {company.minCgpa}
                      </span>

                    </div>

                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">

                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                      Hiring
                    </span>

                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      Open
                    </span>

                  </div>

                  {(role === "ROLE_STUDENT" ||
                    role === "STUDENT") && (

                    <button
                      onClick={() => applyToDrive(company.id)}
                      className="w-full mt-8 h-11 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
                    >
                      Apply Now
                    </button>

                  )}

                  {(role === "ROLE_ADMIN" ||
                    role === "ADMIN") && (

                    <div className="grid grid-cols-2 gap-3 mt-8">

                      <button
                        onClick={() => editCompany(company)}
                        className="h-11 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteCompany(company)}
                        className="h-11 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition"
                      >
                        Delete
                      </button>

                    </div>

                  )}

                </div>

              ))}

            </div>

          )}

        </div>

        <Footer />

      </div>

    </div>
  );
}

export default Companies;
            