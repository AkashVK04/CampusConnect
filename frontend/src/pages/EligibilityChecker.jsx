import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import api from "../services/api";
import Footer from "../components/Footer";
function EligibilityChecker() {
  const [cgpa, setCgpa] = useState("");
  const [companies, setCompanies] = useState([]);
  const [eligibleCompanies, setEligibleCompanies] = useState([]);

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

  const checkEligibility = () => {
    const eligible = companies.filter(
      (company) => Number(cgpa) >= company.minCgpa
    );

    setEligibleCompanies(eligible);
  };

  return (
    <div className="flex bg-slate-100 min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-8">

          <h1 className="text-4xl font-bold mb-8">
            Placement Eligibility Checker
          </h1>

          <div className="bg-white p-6 rounded-2xl shadow mb-8">

            <input
              type="number"
              step="0.01"
              placeholder="Enter CGPA"
              value={cgpa}
              onChange={(e) => setCgpa(e.target.value)}
              className="border p-3 rounded-lg w-full"
            />

            <button
              onClick={checkEligibility}
              className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg"
            >
              Check Eligibility
            </button>

          </div>

          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="text-2xl font-bold mb-4">
              Eligible Companies
            </h2>

            {eligibleCompanies.length === 0 ? (
              <p>No eligible companies found.</p>
            ) : (
              <div className="space-y-4">

                {eligibleCompanies.map((company) => (
                  <div
                    key={company.id}
                    className="border p-4 rounded-xl"
                  >
                    <h3 className="font-bold text-lg">
                      {company.companyName}
                    </h3>

                    <p>
                      Role: {company.jobRole}
                    </p>

                    <p>
                      Package: {company.packageLpa} LPA
                    </p>

                    <p>
                      Minimum CGPA: {company.minCgpa}
                    </p>
                  </div>
                ))}

              </div>
            )}

          </div>
<Footer />
        </div>
      </div>
    </div>
  );
}

export default EligibilityChecker;