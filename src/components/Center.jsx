// HomePage.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const currentYear = new Date().getFullYear();
const navigate = useNavigate();

  const buttons = [
    {
      to: "/appointment",
      title: "🗓️ Appointments",
      subtitle: "Schedule & View Bookings",
      color: "from-indigo-500 to-indigo-700 hover:to-indigo-800",
    },
    {
      to: "/patients",
      title: "🧑 Patients",
      subtitle: "Access Records & Vitals",
      color: "from-teal-500 to-teal-700 hover:to-teal-800",
    },
    {
      to: "/pharmacyview",
      title: "💊 Pharmacy",
      subtitle: "Inventory & Prescriptions",
      color: "from-pink-500 to-pink-700 hover:to-pink-800",
    },
  ];

  const NavLink = ({ to, icon, label }) => (
    <Link
      to={to}
      className="flex items-center gap-3 p-3 rounded-lg text-gray-300 hover:bg-indigo-700 hover:text-white transition-all duration-200 group"
    >
      <span className="text-xl group-hover:scale-110 transition-transform">{icon}</span>
      <span className="font-medium text-[15px]">{label}</span>
    </Link>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* 🚀 MODERN SIDEBAR */}
      <aside className="w-64 bg-gray-900 text-gray-100 flex flex-col p-6 shadow-2xl h-screen sticky top-0">

        <h2 className="text-2xl font-extrabold text-indigo-400 mb-8 border-b border-indigo-700 pb-4">
          ⚕️ Sahlan Clinic
        </h2>

        <nav className="space-y-1">
          <NavLink to="/recordsale" icon="🏠" label="Add Sales" />
          <NavLink to="/appointment" icon="🗓️" label="Appointments" />
          <NavLink to="/patients" icon="🧑" label="Patients" />
          <NavLink to="/pharmacyview" icon="💊" label="Pharmacy" />
          <NavLink to="/salesdashboard" icon="📊" label="Financial Reports" />
          <NavLink to="/lowstockpage" icon="⚙️" label="LowstockDrugs" />
        </nav>

        <div className="mt-auto text-xs text-gray-400 pt-8 border-t border-gray-700">
          <p className="font-semibold">Sahlan Clinic</p>
          <p className="mt-1">© {currentYear} All rights reserved.</p>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col overflow-y-auto">

        {/* ✨ PROFESSIONAL HEADER */}
        <header className="w-full bg-white text-gray-800 shadow-md p-6 sticky top-0 z-10">
          <div className="flex justify-between items-center px-8">

            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Welcome, Administrator
            </h1>

            {/* ✅ Updated Status Button */}
      <button
  onClick={() => navigate("/login")}
  className="px-3 py-1 text-sm font-semibold rounded-full 
             bg-red-400 text-black border border-red-500
             hover:bg-red-500 hover:text-white transition"
>
  Logout
</button>


          </div>
        </header>

        {/* CONTENT SECTION */}
        <main className="flex-1">

          <h2 className="text-xl font-semibold text-gray-700 mb-6 border-b pb-2 px-8 pt-8">
            Quick Access Modules
          </h2>

          {/* GRID BUTTONS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8 pb-8">

            {buttons.map((b) => (
              <Link key={b.to} to={b.to}>
                <div
                  className={`relative bg-gradient-to-br ${b.color} text-white rounded-2xl p-8 h-[200px] flex flex-col justify-center items-center shadow-2xl hover:shadow-indigo-500/50 transition-all duration-300 transform hover:scale-[1.03] overflow-hidden`}
                >
                  <svg className="absolute top-0 right-0 h-full w-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <rect width="100" height="100" fill="url(#pattern-circles)" />
                    <defs>
                      <pattern id="pattern-circles" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                        <circle cx="5" cy="5" r="1.5" fill="white" />
                      </pattern>
                    </defs>
                  </svg>

                  <span className="text-5xl mb-4 relative z-10">{b.title.split(" ")[0]}</span>
                  <span className="text-2xl font-extrabold tracking-wide relative z-10">
                    {b.title.substring(b.title.indexOf(" ") + 1)}
                  </span>
                  <span className="text-sm opacity-80 mt-2 relative z-10">{b.subtitle}</span>
                </div>
              </Link>
            ))}

          </div>

          {/* SYSTEM OVERVIEW */}
          <div className="pb-12 px-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
              System Overview
            </h2>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <p className="text-gray-500">
                *Data charts and key metrics would appear here.*
              </p>

              <div className="h-40 flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-300 rounded-lg mt-4">
                Recent Activity Log / Key Performance Indicators
              </div>
            </div>
          </div>

        </main>

        {/* FOOTER */}
        <footer className="w-full bg-gray-800 text-gray-400 py-4 text-center text-sm shadow-inner mt-auto">
          <div className="flex justify-between px-8">
            <span>Version 2.0.1 — Licensed to ZultanMed</span>
            <span>© {currentYear} Sahlan Clinic</span>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default HomePage;
