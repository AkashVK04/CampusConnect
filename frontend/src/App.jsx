import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Companies from "./pages/Companies";
import Applications from "./pages/Applications";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import EligibilityChecker from "./pages/EligibilityChecker";
import Notifications from "./pages/Notifications";
import ResumeUpload from "./pages/ResumeUpload";
import Students from "./pages/Students";
import ResumeManagement from "./pages/ResumeManagement";
import Analytics from "./pages/Analytics";
import PlacementDrives from "./pages/PlacementDrives";
import Resume from "./pages/Resume";
import AdminApplications from "./pages/AdminApplications";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/companies"
          element={
            <ProtectedRoute>
              <Companies />
            </ProtectedRoute>
          }
        />

        <Route
          path="/applications"
          element={
            <ProtectedRoute>
              <Applications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
  path="/admin-dashboard"
  element={
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/eligibility"
  element={
    <ProtectedRoute>
      <EligibilityChecker />
    </ProtectedRoute>
  }
/>
<Route
  path="/notifications"
  element={
    <ProtectedRoute>
      <Notifications />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin-applications"
  element={<AdminApplications />}
/>
<Route
  path="/resume"
  element={
    <ProtectedRoute>
      <ResumeUpload />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin"
  element={
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/students"
  element={
    <ProtectedRoute>
      <Students />
    </ProtectedRoute>
  }
/>
<Route path="/resume" element={<Resume />} />
<Route
  path="/resume-management"
  element={
    <ProtectedRoute>
      <ResumeManagement />
    </ProtectedRoute>
  }
/>
<Route
  path="/analytics"
  element={
    <ProtectedRoute>
      <Analytics />
    </ProtectedRoute>
  }
/>
<Route
    path="/placement-drives"
    element={<PlacementDrives />}
/>
</Routes>
    </BrowserRouter>
  );
}

export default App;