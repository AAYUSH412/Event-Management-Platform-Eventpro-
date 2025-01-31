import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Save,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Settings = () => {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    fullName: user?.user_metadata?.full_name || "",
    email: user?.email || "",
    notifications: {
      emailUpdates: true,
      eventReminders: true,
      marketingEmails: false,
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        notifications: {
          ...prev.notifications,
          [name]: checked,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const { error } = await updateUser({
        data: {
          full_name: formData.fullName,
        },
      });

      if (error) throw error;
      setSuccess("Settings updated successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Account Settings</h1>

        <div className="space-y-6">
          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    disabled
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Notifications Section */}
              <div className="pt-6">
                <h3 className="text-lg font-medium mb-4">Notifications</h3>
                <div className="space-y-3">
                  {[
                    { name: "emailUpdates", label: "Email Updates" },
                    { name: "eventReminders", label: "Event Reminders" },
                    { name: "marketingEmails", label: "Marketing Emails" },
                  ].map((item) => (
                    <div key={item.name} className="flex items-center">
                      <input
                        type="checkbox"
                        id={item.name}
                        name={item.name}
                        checked={formData.notifications[item.name]}
                        onChange={handleChange}
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <label
                        htmlFor={item.name}
                        className="ml-3 text-sm text-gray-700"
                      >
                        {item.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Success/Error Messages */}
              {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                  {success}
                </div>
              )}
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                  {error}
                </div>
              )}

              {/* Save Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-indigo-600 text-white px-8 py-3 rounded-xl hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center gap-2 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Saving..." : "Save Changes"}
                <Save className="h-5 w-5" />
              </button>
            </form>
          </motion.div>

           
        </div>
      </div>
    </div>
  );
};

export default Settings;
