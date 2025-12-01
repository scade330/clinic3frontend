import React from "react";
import PharmacyForm from "../../components/pharmacy/PharmacyForm.jsx";
import { createPharmacy } from "../../lib/pharmacyApi.js";
import { useNavigate } from "react-router-dom";

export default function CreatePharmacy() {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      await createPharmacy(data);
      navigate("/pharmacylist");
    } catch (err) {
      console.error(err);
    }
  };

  // Function to handle the back navigation
  const handleBack = () => {
    navigate(-1); // Go back to the previous page in history
  };

  return (
    <div className="p-6">
      {/* 🔥 Removed the h1 tag: 
        <h1 className="text-xl font-bold mb-4">Add New Pharmacy Item</h1> 
      */}
      <PharmacyForm 
        onSubmit={handleSubmit} 
        onBack={handleBack} // ⬅️ Pass the back navigation handler here
      />
    </div>
  );
}