import React, { useState, useEffect } from "react";
import PharmacyForm from "../../components/pharmacy/PharmacyForm.jsx";
import { getPharmacy, updatePharmacy } from "../../lib/pharmacyApi.js";
import { useParams, useNavigate } from "react-router-dom";

export default function PharmacyEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const data = await getPharmacy(id);
        setInitialData(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  const handleSubmit = async (updatedData) => {
    try {
      await updatePharmacy(id, updatedData);
      navigate("/pharmacy");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Edit Pharmacy Item</h1>
      <PharmacyForm onSubmit={handleSubmit} initialData={initialData} />
    </div>
  );
}
