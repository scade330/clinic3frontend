import React from "react";

// --- Constants ---
const LOGO_PLACEHOLDER = "../images/logo.jpg"; 
const LOGO_ALT_TEXT = "Medical Management System Logo";

export default function App() {

  return (
    // Outer Wrapper: Use slightly off-white background (gray-50) for contrast
    <div className="min-h-screen bg-gray-50 font-sans">
      
      {/* Main Content Wrapper: Seamless white paper effect */}
      <div 
        className="w-full bg-white py-10 px-4 sm:px-8 lg:px-12 relative shadow-xl min-h-screen" 
      >
        
        {/* --- Header: High-Impact & Professional --- 
            Deep color for the system title, subtle padding.
        */}
        <header className="flex flex-row items-center justify-start gap-6 mb-12 pt-6 pb-6 border-b-4 border-indigo-700">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <img 
              src={LOGO_PLACEHOLDER}
              alt={LOGO_ALT_TEXT}
              // Increased size slightly for presence
              className="w-28 h-28 rounded-full object-cover shadow-md border-2 border-gray-200"
              onError={(e) => { 
                e.currentTarget.onerror = null; 
                e.currentTarget.src="https://placehold.co/64x64/374151/ffffff?text=MMS"; 
              }}
            />
          </div>

          {/* Title: Deeper color (blue-900) and cleaner alignment */}
          <div className="flex flex-col flex-grow min-w-0">
            <h1 className="text-5xl font-black text-blue-900 leading-tight truncate">
              Medical Management System
            </h1>
            <p className="text-2xl text-indigo-700 font-light tracking-wide mt-1 truncate">
              A Platform for Modern Healthcare Operations and Compliance
            </p>
          </div>

        </header>

        {/* --- MAIN CONTENT ROW: Clean, Well-Defined Sections --- 
            Larger vertical gap (gap-6) and standardized card structure.
        */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12">

          {/* Column 1: System Overview (General Info) */}
          <section className="w-full lg:w-1/3 p-6 bg-white rounded-lg shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-indigo-700 mb-3 border-b border-gray-200 pb-2">System Overview</h2>
            <p className="text-gray-700 text-base leading-relaxed">
              Our primary objective is to streamline clinic operations, ensuring **cost-effectiveness** and **optimal resource utilization**. The system is built for scalability, offering seamless integration for new clinical locations at no extra deployment cost.
            </p>
          </section>

          {/* Column 2: Key Features (Mid-section) */}
          <section className="w-full lg:w-1/3 p-6 bg-white rounded-lg shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-indigo-700 mb-3 border-b border-gray-200 pb-2">Integrated Modules</h2>
            <ul className="list-disc list-inside text-gray-700 text-base leading-relaxed space-y-2">
                <li>🏥 Comprehensive **EHR/EMR** & **Doctor's Notes**.</li>
                <li>💊 Full **Supply Chain & Pharmacy Management**.</li>
                <li>📅 Advanced **Appointment Scheduling & Billing**.</li>
                <li>📊 Robust **Reporting & Analytics** Tools.</li>
            </ul>
          </section>

          {/* Column 3: Development Team (Contacts) */}
          <section className="w-full lg:w-1/3 p-6 bg-white rounded-lg shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-indigo-700 mb-3 border-b border-gray-200 pb-2">Development Leadership</h2>
            
            {/* Developer Cards Grid: Forced 1-column stack for clarity in a limited horizontal space */}
            <div className="grid grid-cols-1 gap-4">
              
              {/* Developer Card 1: Cleaner typography and spacing */}
              <div className="p-3 border-l-4 border-indigo-500 bg-gray-50 rounded-md">
                <h3 className="text-lg font-extrabold text-gray-800">Dr. Zekerie Abdirahman</h3>
                <p className="text-indigo-600 font-medium text-sm">CEO / Alumnus of Amoud University</p>
                <p className="text-gray-600 text-sm mt-1">Contact: **063-3330801**</p>
              </div>

       

            </div>
          </section>
        </div>

        {/* --- Footer: Subtle and Formal --- */}
        <footer className="text-center mt-12 pt-6 border-t border-gray-300">
          <p className="text-xl text-blue-900 font-extrabold mb-1">
            Commitment to Excellence
          </p>
          <p className="text-gray-600 text-sm leading-snug">
            We are dedicated to making your workflow 
            <span className="text-indigo-600 font-bold"> smoother, faster, and more organized</span>.
          </p>
          <p className="text-gray-500 text-xs mt-2">© 2025 Medical Management Systems. All rights reserved.</p>
        </footer>

      </div>
    </div>
  );
}