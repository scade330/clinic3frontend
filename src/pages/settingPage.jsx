import { useState, useEffect } from "react";

// Theme toggle button
function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="px-6 py-3 rounded-xl bg-gray-800 text-white dark:bg-gray-200 dark:text-black font-medium transition"
    >
      {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    </button>
  );
}

// Main Settings Page
export default function Settings() {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white transition">
      
      {/* Sidebar */}
      <aside className="w-72 bg-white dark:bg-gray-800 shadow-sm p-6 border-r border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-semibold mb-6">Settings</h1>

        <nav className="space-y-2">
          {["general", "language", "theme"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left px-4 py-3 rounded-xl font-medium transition
                ${activeTab === tab
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200"
                }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">

        {/* GENERAL TAB */}
        {activeTab === "general" && (
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-semibold mb-6">General Settings</h2>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow space-y-6">
              <div>
                <label className="block font-semibold mb-2">Clinic Name</label>
                <input
                  type="text"
                  className="w-full border rounded-xl p-3 pl-4 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-300"
                  placeholder="Enter clinic name"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">Address</label>
                <input
                  type="text"
                  className="w-full border rounded-xl p-3 pl-4 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-300"
                  placeholder="Enter clinic address"
                />
              </div>
            </div>
          </div>
        )}

        {/* LANGUAGE TAB */}
        {activeTab === "language" && (
          <div className="max-w-xl mx-auto">
            <h2 className="text-3xl font-semibold mb-6">Language</h2>

            <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-8">
              <label className="block font-semibold mb-2">Choose Language</label>
              <select
                className="w-full border p-3 rounded-xl bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-300"
              >
                <option>English</option>
                <option>Somali</option>
                <option>Arabic</option>
                <option>French</option>
              </select>
            </div>
          </div>
        )}

        {/* THEME TAB */}
        {activeTab === "theme" && (
          <div className="max-w-xl mx-auto">
            <h2 className="text-3xl font-semibold mb-6">Theme</h2>

            <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-8 flex justify-start">
              <ThemeToggle />
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
