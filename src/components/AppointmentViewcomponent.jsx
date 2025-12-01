import { useEffect, useState } from "react";
import { getAllPatients } from "../lib/patientApi";

export default function AppointmentView() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    loadPatients();
  }, []);

  async function loadPatients() {
    try {
      const response = await getAllPatients();
      let data = [];

      if (Array.isArray(response)) data = response;
      else if (Array.isArray(response?.patients)) data = response.patients;
      else if (Array.isArray(response?.data)) data = response.data;

      setPatients(data);
    } catch (error) {
      console.error("Failed to load patients:", error);
    }
  }

  // Filter helpers
  function isToday(date) {
    const d = new Date(date);
    const today = new Date();
    return d.toDateString() === today.toDateString();
  }

  function isTomorrow(date) {
    const d = new Date(date);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return d.toDateString() === tomorrow.toDateString();
  }

  function isThisWeek(date) {
    const d = new Date(date);
    const today = new Date();
    const endOfWeek = new Date();
    endOfWeek.setDate(today.getDate() + 7);
    return d >= today && d <= endOfWeek;
  }

  // Filtered patients
  const filtered = patients.filter((p) => {
    const appointment = p.nextAppointment;

    if (!appointment) return false;

    if (filterType === "today") return isToday(appointment);
    if (filterType === "tomorrow") return isTomorrow(appointment);
    if (filterType === "week") return isThisWeek(appointment);

    // Default search behavior
    return `${p.firstName} ${p.diagnosis} ${p.nextAppointment} ${p.reason} ${p.medicalHistory}`
      .toLowerCase()
      .includes(search.toLowerCase());
  });

  // Format date nicely
  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    return d.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Search Box */}
      <div className="bg-white p-4 rounded-lg shadow-md border">
        <input
          type="text"
          placeholder="Search patient, diagnosis, history..."
          className="w-full px-4 py-2 border rounded-lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Filter Buttons */}
      <div className="flex space-x-3">
        <button
          onClick={() => setFilterType("today")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Today
        </button>
        <button
          onClick={() => setFilterType("tomorrow")}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Tomorrow
        </button>
        <button
          onClick={() => setFilterType("week")}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          This Week
        </button>
        <button
          onClick={() => setFilterType("all")}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          All
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-md border overflow-hidden">
        <div className="max-h-[70vh] overflow-y-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 sticky top-0 z-20">
              <tr>
                <th className="p-3 border w-10">#</th>
                <th className="p-3 border w-40">Name</th>
                <th className="p-3 border w-40">Diagnosis</th>
                <th className="p-3 border w-40">Next Appointment</th>
                <th className="p-3 border w-40">Reason</th>
                <th className="p-3 border w-40">Medical History</th>
              </tr>
            </thead>

            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td className="p-5 text-center text-gray-500" colSpan={6}>
                    No patients found.
                  </td>
                </tr>
              )}

              {filtered.map((p, i) => (
                <tr key={p._id} className="hover:bg-gray-50 transition">
                  <td className="p-3 border">{i + 1}</td>
                  <td className="p-3 border font-medium">{p.firstName}</td>
                  <td className="p-3 border">{p.diagnosis}</td>
                  <td className="p-3 border">{formatDate(p.nextAppointment)}</td>
                  <td className="p-3 border">{p.reason || "-"}</td>
                  <td className="p-3 border">{p.medicalHistory}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
