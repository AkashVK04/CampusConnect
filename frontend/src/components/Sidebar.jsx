import {
  LayoutDashboard,
  Users,
  Building2,
  Briefcase,
  FileText,
  UserCircle,
  ClipboardList,
  LogOut,
  GraduationCap,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const adminMenus = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      name: "Students",
      icon: Users,
      path: "/students",
    },
    {
      name: "Companies",
      icon: Building2,
      path: "/companies",
    },
    {
      name: "Placement Drives",
      icon: Briefcase,
      path: "/placement-drives",
    },
    {
      name: "Applications",
      icon: ClipboardList,
      path: "/admin-applications",
    },
    {
      name: "Resume",
      icon: FileText,
      path: "/resume-management",
    },
    {
      name: "Profile",
      icon: UserCircle,
      path: "/profile",
    },
  ];

  const studentMenus = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      name: "Companies",
      icon: Building2,
      path: "/companies",
    },
    {
      name: "Placement Drives",
      icon: Briefcase,
      path: "/placement-drives",
    },
    {
      name: "Applications",
      icon: ClipboardList,
      path: "/applications",
    },
    {
      name: "Profile",
      icon: UserCircle,
      path: "/profile",
    },
  ];

  const menus =
    role === "ROLE_ADMIN" || role === "ADMIN"
      ? adminMenus
      : studentMenus;

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <aside className="w-[280px] bg-slate-950 border-r border-slate-800 text-white flex flex-col min-h-screen">

      {/* Logo */}

      <div className="px-8 py-8 border-b border-slate-800">

        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center">

            <GraduationCap size={24} />

          </div>

          <div>

            <h1 className="text-2xl font-bold">
              CampusConnect
            </h1>

            <p className="text-slate-400 text-sm mt-1">
              Enterprise Platform
            </p>

          </div>

        </div>

      </div>

      {/* Navigation */}

      <nav className="flex-1 px-5 py-8 space-y-2">

        {menus.map((menu) => (
          <NavLink
            key={menu.name}
            to={menu.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200 font-medium ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            <menu.icon size={21} />
            <span>{menu.name}</span>
          </NavLink>
        ))}

      </nav>

      {/* Bottom */}

      <div className="border-t border-slate-800 p-6">

        <div className="bg-slate-900 rounded-2xl p-4 mb-5">

          <p className="text-sm text-slate-400">
            Logged in as
          </p>

          <h3 className="font-semibold mt-1">

            {role === "ROLE_ADMIN" || role === "ADMIN"
              ? "Administrator"
              : "Student"}

          </h3>

        </div>

        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-red-600 hover:bg-red-700 transition font-semibold"
        >
          <LogOut size={20} />
          Logout
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;