import {
  Bell,
  Search,
  UserCircle2,
  Sun,
  ChevronDown,
} from "lucide-react";

function Navbar() {
  const role = localStorage.getItem("role");
  const email = localStorage.getItem("email");

const roleName =
  role === "ROLE_ADMIN" || role === "ADMIN"
    ? "Administrator"
    : "Student";

  return (
    <header className="sticky top-0 z-50 h-[72px] bg-white/80 backdrop-blur-xl border-b border-slate-200 flex items-center justify-between px-8">

      {/* Search */}

      <div className="relative w-[420px]">

        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search companies, students, drives..."
          className="w-full h-11 rounded-xl border border-slate-300 bg-slate-50 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

      </div>

      {/* Right */}

      <div className="flex items-center gap-5">

        {/* Theme */}

        <button className="p-2 rounded-xl hover:bg-slate-100 transition">
          <Sun size={20} className="text-slate-600" />
        </button>

        {/* Notifications */}

        <button className="relative p-2 rounded-xl hover:bg-slate-100 transition">

          <Bell size={22} className="text-slate-700" />

          <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-white"></span>

        </button>

        {/* Profile */}

        <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-100 transition cursor-pointer">

          <UserCircle2
            size={42}
            className="text-blue-600"
          />

          <div>

           <p className="font-semibold text-slate-800">
  {roleName}
</p>

<p className="text-xs text-slate-500">
  CampusConnect
</p>

            <p className="text-xs text-slate-500 mt-1">

              {email || "CampusConnect"}

            </p>

          </div>

          <ChevronDown
            size={18}
            className="text-slate-500"
          />

        </div>

      </div>

    </header>
  );
}

export default Navbar;