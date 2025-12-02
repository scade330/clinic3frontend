// src/components/sales/RecordSalePage.jsx
import React, { useState, useEffect } from "react";
import { fetchAllDrugs, recordNewSale } from "@/lib/salesApi.js"; // Vite path

export default function RecordSalePage() {
  const [drugs, setDrugs] = useState([]);
  const [selectedDrug, setSelectedDrug] = useState("");
  const [quantity, setQuantity] = useState("1"); // keep as string for input
  const [loading, setLoading] = useState(false);
  const [fetchingDrugs, setFetchingDrugs] = useState(true);

  // Fetch all pharmacy items
  useEffect(() => {
    const loadDrugs = async () => {
      setFetchingDrugs(true);
      try {
        const data = await fetchAllDrugs();
        setDrugs(data || []);
      } catch (error) {
        console.error("Error fetching drugs:", error);
        alert("Failed to load pharmacy items.");
      } finally {
        setFetchingDrugs(false);
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
          {fetchingDrugs ? (
            <div className="p-3 bg-gray-100 text-gray-500 rounded text-center">
              Loading drugs....
            </div>
          ) : drugs.length === 0 ? (
            <div className="p-3 bg-yellow-100 text-yellow-800 rounded text-center">
              No drugs available in pharmacy.
            </div>
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
          disabled={loading || fetchingDrugs || drugs.length === 0}
          className="w-full bg-indigo-600 text-white p-3 rounded hover:bg-indigo-700 transition disabled:opacity-50"
        >
          {loading ? "Recording..." : "Record Sale"}
        </button>
      </form>
    </div>
  );
}
