import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}

export default Layout;