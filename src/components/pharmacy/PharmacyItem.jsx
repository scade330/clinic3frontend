import React from "react";
import { useNavigate } from "react-router-dom";

const PharmacyItem = ({ item, onDelete }) => {
  const navigate = useNavigate();

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-4 py-2">{item.itemName}</td>
      <td className="px-4 py-2">{item.category}</td>
      <td className="px-4 py-2">{item.quantityInStock}</td>
      <td className="px-4 py-2">{item.reorderLevel}</td>
      <td className="px-4 py-2">${item.costPrice}</td>
      <td className="px-4 py-2">${item.sellingPrice}</td>
      <td className="px-4 py-2">{item.batchNumber}</td>
      <td className="px-4 py-2">{new Date(item.expiryDate).toLocaleDateString()}</td>
      <td className="px-4 py-2">{item.supplier}</td>
      <td className="px-4 py-2">{new Date(item.purchaseDate).toLocaleDateString()}</td>
      <td className="px-4 py-2">{item.location}</td>
      <td className="px-4 py-2 flex gap-2">
        <button
          onClick={() => navigate(`/pharmacy/edit/${item._id}`)}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(item._id)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default PharmacyItem;
