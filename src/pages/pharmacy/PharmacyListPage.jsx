import React, { useEffect, useState } from "react";
import { getAllPharmacies, deletePharmacy } from "../../lib/pharmacyApi.js";
import PharmacyItem from "../../components/pharmacy/PharmacyItem.jsx";
import { useNavigate } from "react-router-dom";

export default function PharmacyListPage() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const data = await getAllPharmacies();
      setItems(Array.isArray(data) ? data : data?.pharmacies || []);
    } catch (err) {
      console.error("Failed to load pharmacy items:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this item?")) return;
    try {
      await deletePharmacy(id);
      fetchItems();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // --- SEARCH FILTER ---
  const filtered = items.filter((i) =>
    `${i.itemName} ${i.batchNumber}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Pharmacy Inventory</h1>

        <button
          onClick={() => navigate("/createpharmacy")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add New Item
        </button>
      </div>

      {/* Search Field */}
      <input
        type="text"
        placeholder="Search by name or batch number..."
        className="w-full px-3 py-2 border rounded-md"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Scrollable Table */}
      <div className="w-full max-h-[75vh] overflow-y-auto overflow-x-auto border border-gray-300 rounded-lg">
        <table className="min-w-full table-fixed">
          <thead>
            <tr className="bg-gray-100 sticky top-0 z-10 text-left shadow-sm">
              <th className="px-4 py-2 w-40">Item Name</th>
              <th className="px-4 py-2 w-32">Category</th>
              <th className="px-4 py-2 w-20">Stock</th>
              <th className="px-4 py-2 w-28">Reorder Level</th>
              <th className="px-4 py-2 w-28">Cost Price</th>
              <th className="px-4 py-2 w-28">Selling Price</th>
              <th className="px-4 py-2 w-32">Batch No</th>
              <th className="px-4 py-2 w-32">Expiry</th>
              <th className="px-4 py-2 w-40">Supplier</th>
              <th className="px-4 py-2 w-32">Purchase Date</th>
              <th className="px-4 py-2 w-28">Location</th>
              <th className="px-4 py-2 w-28">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={12} className="text-center p-4">
                  No matching items found.
                </td>
              </tr>
            )}

            {filtered.map((item) => (
              <PharmacyItem
                key={item._id}
                item={item}
                onDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
