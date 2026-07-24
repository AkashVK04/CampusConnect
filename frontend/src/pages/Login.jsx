import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("email", response.data.email);

      if (response.data.role === "ROLE_ADMIN") {
        navigate("/admin-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10">

        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-blue-600">
            CampusConnect
          </h1>

          <p className="text-slate-500 mt-2">
            Smart Campus Ecosystem
          </p>

        </div>

        <div className="space-y-5">

          <input
            type="email"
            placeholder="College Email"
            className="w-full h-12 rounded-xl border border-slate-300 px-4 focus:ring-2 focus:ring-blue-500 outline-none"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full h-12 rounded-xl border border-slate-300 px-4 focus:ring-2 focus:ring-blue-500 outline-none"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
          >
            Login
          </button>

        </div>

      </div>

    </div>
  );
}

export default Login;