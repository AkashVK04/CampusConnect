import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import api from "../services/api";
import Footer from "../components/Footer";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await api.get("/notifications");
      setNotifications(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addNotification = async () => {
    try {
      await api.post("/notification", {
        title,
        message,
      });

      setTitle("");
      setMessage("");

      fetchNotifications();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteNotification = async (id) => {
    try {
      await api.delete(`/notification/${id}`);
      fetchNotifications();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex bg-slate-100 min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-8">
          <h1 className="text-4xl font-bold mb-8">
            Notifications
          </h1>

          {/* ADMIN ONLY - CREATE NOTIFICATION */}
          {role === "ROLE_ADMIN" && (
            <div className="bg-white p-6 rounded-2xl shadow mb-8">
              <h2 className="text-2xl font-bold mb-4">
                Create Notification
              </h2>

              <input
                className="border p-3 rounded-lg w-full mb-3"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <textarea
                className="border p-3 rounded-lg w-full mb-3"
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

              <button
                onClick={addNotification}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
              >
                Publish
              </button>
            </div>
          )}

          {/* NOTIFICATIONS LIST */}
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="bg-white p-5 rounded-2xl shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">
                      🔔 {notification.title}
                    </h3>

                    <p className="text-gray-600 mt-2">
                      {notification.message}
                    </p>
                  </div>

                  {/* ADMIN ONLY - DELETE BUTTON */}
                  {role === "ROLE_ADMIN" && (
                    <button
                      onClick={() =>
                        deleteNotification(notification.id)
                      }
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Notifications;