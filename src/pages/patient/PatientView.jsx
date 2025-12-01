// frontend/src/pages/PatientView.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import PatientCard from "../../components/AppointmentViewcomponent.jsx";

const PatientView = () => {
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        // Fetch the first patient or all patients and pick the first
        const res = await axios.get("http://localhost:8000/api/patients");
        if (res.data && res.data.length > 0) {
          setPatient(res.data[0]); // show the first patient
        }
      } catch (err) {
        console.error("Failed to fetch patient:", err);
      }
    };

    fetchPatient();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <PatientCard patient={patient} />
    </div>
  );
};

export default PatientView;
