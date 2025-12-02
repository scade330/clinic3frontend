import React, { useState, useEffect } from "react";
import { fetchAllDrugs, recordNewSale } from "@/lib/salesApi.js";

export default function RecordSalePage() {
  const [drugs, setDrugs] = useState([]);
  const [selectedDrug, setSelectedDrug] = useState("");
  const [quantity, setQuantity] = useState("1"); // string for input
  const [loading, setLoading] = useState(false);

  // Fetch all pharmacy items
  useEffect(() => {
    const loadDrugs = async () => {
      const data = await fetchAllDrugs();
      setDrugs(data);
    };
    loadDrugs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const qty = Number(quantity);

    if (!selectedDrug) return alert("Please select a drug.");
    if (qty <= 0) return alert("Quantity must be greater than 0.");

    setLoading(true);
    try {
      const res = await recordNewSale({
        pharmacyItem: selectedDrug,
        quantitySold: qty,
      });
      alert(`Sale recorded successfully: ${res?.sale?.itemName || "Unknown"}`);
      setSelectedDrug("");
      setQuantity("1");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to record sale.");
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
          disabled={loading}
          className="w-full bg-indigo-600 text-white p-3 rounded hover:bg-indigo-700 transition disabled:opacity-50"
        >
          {loading ? "Recording..." : "Record Sale"}
        </button>
      </form>
    </div>
  );
}
