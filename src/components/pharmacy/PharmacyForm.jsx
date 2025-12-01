import React, { useState } from "react";

const PharmacyForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    itemName: initialData.itemName || "",
    category: initialData.category || "",
    quantityInStock: initialData.quantityInStock || "",
    reorderLevel: initialData.reorderLevel || "",
    costPrice: initialData.costPrice || "",
    sellingPrice: initialData.sellingPrice || "",
    batchNumber: initialData.batchNumber || "",
    supplier: initialData.supplier || "",
    location: initialData.location || "",
    expiryDate: initialData.expiryDate
      ? initialData.expiryDate.split("T")[0]
      : "",
    purchaseDate: initialData.purchaseDate
      ? initialData.purchaseDate.split("T")[0]
      : "",
  });

  const [batchError, setBatchError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "batchNumber") setBatchError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (new Date(formData.expiryDate) <= new Date(formData.purchaseDate)) {
      alert("Expiry date must be after purchase date!");
      return;
    }

    try {
      await onSubmit({
        ...formData,
        quantityInStock: Number(formData.quantityInStock),
        reorderLevel: Number(formData.reorderLevel),
        costPrice: Number(formData.costPrice),
        sellingPrice: Number(formData.sellingPrice),
      });

      alert("Item saved successfully!");
    } catch (error) {
      if (error.response?.data?.code === 11000) {
        setBatchError("Batch number already exists!");
      } else {
        alert("Something went wrong.");
      }
    }
  };

  // Define a reusable input field component with label
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
    // Increased max-w- to 'max-w-4xl' for a significantly wider form
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-gray-50 shadow-2xl rounded-xl">
      
      {/* Professional Header - Using a calming blue gradient */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-5 rounded-t-lg mb-6 shadow-lg text-center">
        <h2 className="text-2xl font-extrabold tracking-tight">💊 Inventory Item Management</h2>
        <p className="text-base opacity-95 mt-1">Please enter all necessary item and inventory details.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* --- Primary Item Details Section --- */}
        <div className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
          <h3 className="text-lg font-semibold mb-3 text-blue-700 border-b pb-2">Item Information</h3>
          {/* Two-column layout for Item Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              name="itemName"
              label="Item Name"
              placeholder="e.g., Paracetamol 500mg"
            />
            <FormField
              name="category"
              label="Category"
              placeholder="e.g., Analgesics, Antibiotics"
            />
            <FormField
              name="batchNumber"
              label="Batch Number"
              placeholder="Unique identifier for the batch"
              error={batchError}
            />
            <FormField
              name="supplier"
              label="Supplier"
              placeholder="Supplier Name"
            />
          </div>
        </div>

        {/* --- Inventory & Stock Details Section --- */}
        <div className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
          <h3 className="text-lg font-semibold mb-3 text-blue-700 border-b pb-2">Inventory and Pricing</h3>
          {/* Three-column layout for numerical/inventory fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <FormField
              name="quantityInStock"
              label="Quantity In Stock"
              type="number"
              placeholder="Current stock level"
            />
            <FormField
              name="reorderLevel"
              label="Reorder Level"
              type="number"
              placeholder="Minimum stock for reorder"
            />
            <FormField
              name="location"
              label="Storage Location"
              placeholder="Shelf ID, Bin Number, etc."
            />
            <FormField
              name="costPrice"
              label="Cost Price (per unit)"
              type="number"
              placeholder="0.00"
            />
            <FormField
              name="sellingPrice"
              label="Selling Price (per unit)"
              type="number"
              placeholder="0.00"
            />
          </div>
        </div>
        
        {/* --- Date Details Section --- */}
        <div className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
          <h3 className="text-lg font-semibold mb-3 text-blue-700 border-b pb-2">Dates</h3>
          {/* Two-column layout for Date fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              name="purchaseDate"
              label="Purchase Date"
              type="date"
            />
            <FormField
              name="expiryDate"
              label="Expiry Date"
              type="date"
              min={formData.purchaseDate}
            />
          </div>
        </div>
        
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-200 ease-in-out tracking-wider text-lg"
        >
          ✅ Save Item to Inventory
        </button>

      </form>
    </div>
  );
};

export default PharmacyForm;