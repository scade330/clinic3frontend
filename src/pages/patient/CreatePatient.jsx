// src/pages/CreatePatient.jsx
import PatientForm from "../../components/patient/PatientForm"
export default function CreatePatient() {
  const handleSuccess = (newPatient) => {
    // for example, redirect, show toast, or update a list
    console.log("new patient created:", newPatient);
  };

  return (
  <div className="form-container">
  <PatientForm />
</div>

  );
}
