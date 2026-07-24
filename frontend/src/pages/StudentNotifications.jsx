import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";

function StudentNotifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await api.get("/notifications");
      setNotifications(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex bg-slate-950 min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-8">
          <h1 className="text-4xl font-bold text-white mb-6">
            Notifications
          </h1>

          <div className="space-y-4">
            {notifications.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900 border border-slate-800 p-5 rounded-xl"
              >
                <h3 className="text-white text-xl font-semibold">
                  {item.title}
                </h3>

                <p className="text-slate-400 mt-2">
                  {item.message}
                </p>
              </div>
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default StudentNotifications;