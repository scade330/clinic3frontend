import { useState } from "react";
import { createPatient } from "../../lib/patientApi";
import Header from "../Header";

export default function PatientForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    phone: "",
    address: "",
    medicalHistory: "",
    currentMedications: "",
    allergies: "",
    diagnosis: "",
    physicalExam: "",
    labResults: "",
    treatmentPlan: "",
    nextAppointment: "",  // New field
    reason: "",           // New field
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createPatient(formData);
      alert("Patient created successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        age: "",
        gender: "",
        phone: "",
        address: "",
        medicalHistory: "",
        currentMedications: "",
        allergies: "",
        diagnosis: "",
        physicalExam: "",
        labResults: "",
        treatmentPlan: "",
        nextAppointment: "",
        reason: "",
      });
    } catch (error) {
      console.error("Error creating patient:", error);
      alert("Error creating patient");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
  

      <div className="w-full max-w-7xl mx-auto p-4 md:p-8">
        <form
          className="w-full bg-white shadow-2xl rounded-xl p-8 md:p-12"
          onSubmit={handleSubmit}
        >
          <h2 className="text-4xl font-extrabold text-center mb-10 text-gray-900">
            Create Patient Record
          </h2>

          {/* --- Personal Info --- */}
          <div className="mb-10 p-6 border border-blue-100 rounded-xl bg-blue-50">
            <h3 className="text-2xl font-bold mb-6 pb-3 border-b-2 border-blue-300 text-blue-800">
              Personal Info
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="p-4 border-2 border-gray-400 rounded-lg text-lg font-semibold focus:ring-blue-600 focus:border-blue-600 transition duration-200"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="p-4 border-2 border-gray-400 rounded-lg text-lg font-semibold focus:ring-blue-600 focus:border-blue-600 transition duration-200"
              />
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
                required
                className="p-4 border-2 border-gray-400 rounded-lg text-lg font-semibold focus:ring-blue-600 focus:border-blue-600 transition duration-200"
              />
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="p-4 border-2 border-gray-400 rounded-lg text-lg font-semibold focus:ring-blue-600 focus:border-blue-600 bg-white transition duration-200"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="p-4 border-2 border-gray-400 rounded-lg text-lg font-semibold focus:ring-blue-600 focus:border-blue-600 transition duration-200"
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
                className="p-4 border-2 border-gray-400 rounded-lg text-lg font-semibold focus:ring-blue-600 focus:border-blue-600 transition duration-200"
              />
            </div>
          </div>

          {/* --- Medical Info --- */}
          <div className="mb-10 p-6 border border-green-100 rounded-xl bg-green-50">
            <h3 className="text-2xl font-bold mb-6 pb-3 border-b-2 border-green-300 text-green-800">
              Medical Info
            </h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <textarea
                name="medicalHistory"
                placeholder="Medical History"
                value={formData.medicalHistory}
                onChange={handleChange}
                className="p-4 border-2 border-gray-400 rounded-lg h-40 text-lg font-medium focus:ring-green-600 focus:border-green-600 transition duration-200 md:col-span-1"
              />
              <textarea
                name="currentMedications"
                placeholder="Current Medications"
                value={formData.currentMedications}
                onChange={handleChange}
                className="p-4 border-2 border-gray-400 rounded-lg h-40 text-lg font-medium focus:ring-green-600 focus:border-green-600 transition duration-200 md:col-span-1"
              />
              <textarea
                name="allergies"
                placeholder="Allergies"
                value={formData.allergies}
                onChange={handleChange}
                className="p-4 border-2 border-gray-400 rounded-lg h-40 text-lg font-medium focus:ring-green-600 focus:border-green-600 transition duration-200 md:col-span-1"
              />
              <textarea
                name="diagnosis"
                placeholder="Diagnosis"
                value={formData.diagnosis}
                onChange={handleChange}
                className="p-4 border-2 border-gray-400 rounded-lg h-40 text-lg font-medium focus:ring-green-600 focus:border-green-600 transition duration-200 md:col-span-1"
              />
              <textarea
                name="physicalExam"
                placeholder="Physical Examination"
                value={formData.physicalExam}
                onChange={handleChange}
                className="p-4 border-2 border-gray-400 rounded-lg h-40 text-lg font-medium focus:ring-green-600 focus:border-green-600 transition duration-200 md:col-span-2"
              />
              <textarea
                name="labResults"
                placeholder="Laboratory Results"
                value={formData.labResults}
                onChange={handleChange}
                className="p-4 border-2 border-gray-400 rounded-lg h-40 text-lg font-medium focus:ring-green-600 focus:border-green-600 transition duration-200 md:col-span-2"
              />
              <textarea
                name="treatmentPlan"
                placeholder="Treatment Plan"
                value={formData.treatmentPlan}
                onChange={handleChange}
                className="p-4 border-2 border-gray-400 rounded-lg h-40 text-lg font-medium focus:ring-green-600 focus:border-green-600 transition duration-200 md:col-span-2"
              />
            </div>
          </div>

          {/* --- Next Appointment --- */}
          <div className="mb-10 p-6 border border-yellow-100 rounded-xl bg-yellow-50">
            <h3 className="text-2xl font-bold mb-6 pb-3 border-b-2 border-yellow-300 text-yellow-800">
              Next Appointment
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="datetime-local"
                name="nextAppointment"
                value={formData.nextAppointment}
                onChange={handleChange}
                className="p-4 border-2 border-gray-400 rounded-lg text-lg font-medium focus:ring-yellow-600 focus:border-yellow-600 transition duration-200"
              />
              <input
                type="text"
                name="reason"
                placeholder="Reason for Appointment"
                value={formData.reason}
                onChange={handleChange}
                className="p-4 border-2 border-gray-400 rounded-lg text-lg font-medium focus:ring-yellow-600 focus:border-yellow-600 transition duration-200"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-extrabold text-xl py-4 px-4 rounded-xl mt-6 transition duration-300 ease-in-out transform hover:scale-[1.01]"
          >
            {loading ? "Creating..." : "CREATE PATIENT RECORD"}
          </button>
        </form>
      </div>
    </div>
  );
}
