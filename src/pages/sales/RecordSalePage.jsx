// src/components/sales/RecordSalePage.jsx
import React, { useState, useEffect } from "react";
import { fetchAllDrugs, recordNewSale } from "@/lib/salesApi.js";

export default function RecordSalePage() {
  const [drugs, setDrugs] = useState([]);
  const [selectedDrug, setSelectedDrug] = useState("");
  const [quantity, setQuantity] = useState("1"); // string for input
  const [loading, setLoading] = useState(false);
  const [loadingDrugs, setLoadingDrugs] = useState(true);

  // Fetch all pharmacy items
  useEffect(() => {
    const loadDrugs = async () => {
      try {
        const res = await fetchAllDrugs();
        // Ensure res is always an array
        const drugList = Array.isArray(res) ? res : res?.data || [];
        setDrugs(drugList);
      } catch (error) {
        console.error("Error fetching drugs:", error);
        setDrugs([]);
        alert("Failed to load pharmacy items.");
      } finally {
        setLoadingDrugs(false);
      }
    };
    loadDrugs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const qty = Number(quantity);

    if (!selectedDrug) {
      alert("Please select a drug.");
      return;
    }
    if (qty <= 0) {
      alert("Quantity must be greater than 0.");
      return;
    }

    setLoading(true);
    try {
      const res = await recordNewSale({
        pharmacyItem: selectedDrug,
        quantitySold: qty,
      });

      alert(`Sale recorded successfully: ${res?.sale?.itemName || "Unknown"}`);
      setSelectedDrug("");
      setQuantity("1");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to record sale.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded-xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Record New Sale</h2>

        <div>
          <label className="block mb-1 font-medium">Select Drug</label>
          {loadingDrugs ? (
            <p className="text-gray-500">Loading drugs...</p>
          ) : drugs.length === 0 ? (
            <p className="text-red-500">No drugs available in inventory.</p>
          ) : (
            <select
              className="w-full p-2 border rounded focus:ring-indigo-500 focus:border-indigo-500"
              value={selectedDrug}
              onChange={(e) => setSelectedDrug(e.target.value)}
            >
              <option value="">-- Select a drug --</option>
              {drugs.map((d) => (
                <option key={d._id} value={d._id}>
                  {d.itemName} (Stock: {d.quantityInStock})
                </option>
              ))}
            </select>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Quantity Sold</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full p-2 border rounded focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading || loadingDrugs || drugs.length === 0}
          className="w-full bg-indigo-600 text-white p-3 rounded hover:bg-indigo-700 transition disabled:opacity-50"
        >
          {loading ? "Recording..." : "Record Sale"}
        </button>
      </form>
    </div>
  );
}
