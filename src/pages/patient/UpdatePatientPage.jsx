// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { getPatientById, updatePatient } from "../../lib/patientApi";
// import PatientForm from "../../components/patient/PatientForm";

// export default function UpdatePatientPage() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [patient, setPatient] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function load() {
//       try {
//         const res = await getPatientById(id);
//         setPatient(res);
//       } catch (err) {
//         console.error("Failed to load patient", err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     load();
//   }, [id]);

//   async function handleSubmit(updatedData) {
//     try {
//       await updatePatient(id, updatedData);
//       navigate("/patients"); // redirect back after update
//     } catch (err) {
//       console.error("Update failed", err);
//     }
//   }

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Update Patient</h1>

//       <PatientForm initialData={patient} onSubmit={handleSubmit} />
//     </div>
//   );
// }
