import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  createPharmacy,
  updatePharmacy,
} from "../../lib/pharmacyApi"; // Vite path to your API

const PharmacyForm = ({ itemToEdit, onSuccess, onClose }) => {
  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    batchNumber: "",
    supplier: "",
    quantityInStock: "",
    reorderLevel: "",
    location: "",
    costPrice: "",
    sellingPrice: "",
    purchaseDate: "",
    expiryDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [batchError, setBatchError] = useState("");

  const isEditing = !!itemToEdit;

  // Prefill form if editing
  useEffect(() => {
    if (isEditing && itemToEdit) {
      setFormData({
        itemName: itemToEdit.itemName || "",
        category: itemToEdit.category || "",
        batchNumber: itemToEdit.batchNumber || "",
        supplier: itemToEdit.supplier || "",
        quantityInStock: itemToEdit.quantityInStock || "",
        reorderLevel: itemToEdit.reorderLevel || "",
        location: itemToEdit.location || "",
        costPrice: itemToEdit.costPrice || "",
        sellingPrice: itemToEdit.sellingPrice || "",
        purchaseDate: itemToEdit.purchaseDate
          ? itemToEdit.purchaseDate.split("T")[0]
          : "",
        expiryDate: itemToEdit.expiryDate
          ? itemToEdit.expiryDate.split("T")[0]
          : "",
      });
    }
  }, [isEditing, itemToEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "batchNumber") setBatchError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (new Date(formData.expiryDate) <= new Date(formData.purchaseDate)) {
      toast.error("Expiry date must be after purchase date!");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...formData,
        quantityInStock: Number(formData.quantityInStock),
        reorderLevel: Number(formData.reorderLevel),
        costPrice: Number(formData.costPrice),
        sellingPrice: Number(formData.sellingPrice),
      };

      if (isEditing) {
        await updatePharmacy(itemToEdit._id, payload);
        toast.success("Item updated successfully!");
      } else {
        await createPharmacy(payload);
        toast.success("Item added successfully!");
      }

      setFormData({
        itemName: "",
        category: "",
        batchNumber: "",
        supplier: "",
        quantityInStock: "",
        reorderLevel: "",
        location: "",
        costPrice: "",
        sellingPrice: "",
        purchaseDate: "",
        expiryDate: "",
      });

      if (onSuccess) onSuccess();
      if (onClose) onClose();
    } catch (error) {
      console.error(error);
      if (error.response?.data?.code === 11000) {
        setBatchError("Batch number already exists!");
      } else {
        toast.error("Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  };

  const FormField = ({ name, label, type = "text", placeholder, error, min }) => (
    <div className="flex flex-col space-y-1">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className={`border p-2 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        value={formData[name]}
        onChange={handleChange}
        min={min}
        required
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 shadow-2xl rounded-xl">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-5 rounded-t-lg mb-6 shadow-lg text-center">
        <h2 className="text-2xl font-extrabold tracking-tight">
          {isEditing ? "✏️ Edit Inventory Item" : "💊 Add New Inventory Item"}
        </h2>
        <p className="text-base opacity-95 mt-1">
          Please fill in all required item and inventory details.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Item Details */}
        <div className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
          <h3 className="text-lg font-semibold mb-3 text-blue-700 border-b pb-2">Item Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField name="itemName" label="Item Name" placeholder="Paracetamol 500mg" />
            <FormField name="category" label="Category" placeholder="Analgesics, Antibiotics" />
            <FormField name="batchNumber" label="Batch Number" placeholder="Unique batch" error={batchError} />
            <FormField name="supplier" label="Supplier" placeholder="Supplier Name" />
          </div>
        </div>

        {/* Inventory & Pricing */}
        <div className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
          <h3 className="text-lg font-semibold mb-3 text-blue-700 border-b pb-2">Inventory & Pricing</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <FormField name="quantityInStock" label="Quantity In Stock" type="number" />
            <FormField name="reorderLevel" label="Reorder Level" type="number" />
            <FormField name="location" label="Storage Location" />
            <FormField name="costPrice" label="Cost Price" type="number" />
            <FormField name="sellingPrice" label="Selling Price" type="number" />
          </div>
        </div>

        {/* Dates */}
        <div className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
          <h3 className="text-lg font-semibold mb-3 text-blue-700 border-b pb-2">Dates</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField name="purchaseDate" label="Purchase Date" type="date" />
            <FormField name="expiryDate" label="Expiry Date" type="date" min={formData.purchaseDate} />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-200 ease-in-out text-lg"
        >
          {loading ? (isEditing ? "Updating..." : "Creating...") : isEditing ? "Update Item" : "Add Item"}
        </button>
      </form>
    </div>
  );
};

export default PharmacyForm;
