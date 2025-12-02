import React from "react";
import { useNavigate } from "react-router-dom";
import { deletePharmacy } from "../../lib/pharmacyApi"; // Correct Vite path to API
import toast from "react-hot-toast";

const formatDate = (dateStr) => {
  if (!dateStr) return "N/A";
  try {
    return new Date(dateStr).toLocaleDateString();
  } catch {
    return dateStr;
  }
};

const PharmacyItem = ({ item, onSuccess }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      await deletePharmacy(id);
      toast.success("Item deleted successfully!");
      if (onSuccess) onSuccess(); // reload list
    } catch (err) {
      console.error(err);
      toast.error("Deletion failed.");
    }
  };

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-4 py-2">{item.itemName}</td>
      <td className="px-4 py-2">{item.category}</td>
      <td className="px-4 py-2">{item.quantityInStock}</td>
      <td className="px-4 py-2">{item.reorderLevel}</td>
      <td className="px-4 py-2">${item.costPrice}</td>
      <td className="px-4 py-2">${item.sellingPrice}</td>
      <td className="px-4 py-2">{item.batchNumber}</td>
      <td className="px-4 py-2">{formatDate(item.expiryDate)}</td>
      <td className="px-4 py-2">{item.supplier}</td>
      <td className="px-4 py-2">{formatDate(item.purchaseDate)}</td>
      <td className="px-4 py-2">{item.location}</td>
      <td className="px-4 py-2 flex gap-2">
        <button
          onClick={() => navigate(`/pharmacy/edit/${item._id}`)}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(item._id)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default PharmacyItem;
