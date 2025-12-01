import { useEffect, useState } from "react";
import { getAllPatients, deletePatient } from "../../lib/patientApi";
import { useNavigate } from "react-router-dom";
import PatientDialogForm from "../../components/patient/PatientDialogForm";

// Helper component for detail items
const DetailItem = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="font-semibold text-gray-700">{label}:</span>
    <span className="text-gray-600 truncate">{value || "N/A"}</span>
  </div>
);

// Helper component for expanded patient details
const PatientDetailsRow = ({ patient }) => (
  <tr className="bg-gray-50 border-t border-b border-gray-200">
    <td colSpan="7" className="p-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <DetailItem label="Address" value={patient.address} />
        <DetailItem label="Medical History" value={patient.medicalHistory} />
        <DetailItem label="Current Medications" value={patient.currentMedications} />
        <DetailItem label="Allergies" value={patient.allergies} />
        <DetailItem label="Physical Exam" value={patient.physicalExam} />
        <DetailItem label="Lab Results" value={patient.labResults} />
        <DetailItem label="Diagnosis" value={patient.diagnosis} />
        <DetailItem label="Treatment Plan" value={patient.treatmentPlan} />
        <DetailItem label="Next Appointment" value={patient.nextAppointment ? new Date(patient.nextAppointment).toLocaleString() : "None"} />
        <DetailItem label="Reason for Visit" value={patient.reason} />
      </div>
    </td>
  </tr>
);

export default function PatientList() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [expandedRow, setExpandedRow] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadPatients();
  }, []);

  // Load patients with safe array check
  async function loadPatients() {
    try {
      const response = await getAllPatients();
      // Normalize data: ensure it's always an array
      const patientData = Array.isArray(response) ? response : response?.patients || [];
      setPatients(patientData);
    } catch (error) {
      console.error("Failed to load patients:", error);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this patient?")) return;
    try {
      await deletePatient(id);
      loadPatients();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  }

  const filtered = patients.filter((p) =>
    `${p.firstName} ${p.lastName} ${p.phone} ${p.diagnosis}`.toLowerCase().includes(search.toLowerCase())
  );

  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div className="p-6 md:p-8 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold text-gray-800">🏥 Patient Directory</h1>
        <button
          onClick={() => navigate("/create")}
          className="bg-green-600 text-white font-medium px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition duration-150 ease-in-out transform hover:scale-105"
        >
          + Add New Patient
        </button>
      </div>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by Name, Phone, or Diagnosis..."
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Patient Table */}
      <div className="w-full shadow-xl rounded-lg overflow-hidden border border-gray-200">
        <div className="max-h-[70vh] overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-600 text-white sticky top-0 z-20">
              <tr>
                <th className="p-3 text-left w-10">#</th>
                <th className="p-3 text-left w-64">Name</th>
                <th className="p-3 text-left w-16">Age</th>
                <th className="p-3 text-left w-24">Gender</th>
                <th className="p-3 text-left w-32">Phone</th>
                <th className="p-3 text-center w-24">Details</th>
                <th className="p-3 text-center w-40">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filtered.length === 0 && (
                <tr>
                  <td className="p-6 text-center text-gray-500" colSpan={7}>
                    No patients found matching your search.
                  </td>
                </tr>
              )}

              {filtered.map((p, index) => (
                <tbody key={p._id}>
                  <tr
                    className="hover:bg-blue-50 transition duration-100 cursor-pointer"
                    onClick={() => toggleRow(p._id)}
                  >
                    <td className="p-3 text-sm font-medium text-gray-900">{index + 1}</td>
                    <td className="p-3 text-sm font-semibold text-blue-700">{p.firstName} {p.lastName}</td>
                    <td className="p-3 text-sm text-gray-500">{p.age}</td>
                    <td className="p-3 text-sm text-gray-500">{p.gender}</td>
                    <td className="p-3 text-sm text-gray-500">{p.phone}</td>
                    <td className="p-3 text-center">
                      <button className="text-blue-500 hover:text-blue-700 font-medium text-xs">
                        {expandedRow === p._id ? "▲ Hide" : "▼ Show"}
                      </button>
                    </td>
                    <td className="p-3 flex space-x-2 justify-center">
                      <PatientDialogForm
                        patientToEdit={p}
                        buttonTitle="Edit"
                        onSuccess={loadPatients}
                        className="bg-yellow-500 text-white text-xs px-3 py-1 rounded hover:bg-yellow-600"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(p._id);
                        }}
                        className="bg-red-600 text-white text-xs px-3 py-1 rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>

                  {expandedRow === p._id && <PatientDetailsRow patient={p} />}
                </tbody>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
