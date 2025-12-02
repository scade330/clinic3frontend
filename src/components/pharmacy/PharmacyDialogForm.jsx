// src/components/pharmacy/PharmacyDialogForm.jsx
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { createPharmacy, updatePharmacy } from "@/lib/pharmacyApi"; // Correct Vite path

export default function PharmacyDialogForm({
  buttonTitle = "Add New Item",
  itemToEdit,
  onSuccess,
  open: propOpen,
  onOpenChange: propOnOpenChange,
}) {
  const initialFormData = {
    itemName: "",
    category: "",
    quantityInStock: "",
    reorderLevel: "",
    costPrice: "",
    sellingPrice: "",
    batchNumber: "",
    expiryDate: "",
    supplier: "",
    purchaseDate: "",
    location: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);

  const [internalOpen, setInternalOpen] = useState(false);
  const open = propOpen !== undefined ? propOpen : internalOpen;
  const setOpen = propOnOpenChange || setInternalOpen;

  const isEditing = !!itemToEdit;

  useEffect(() => {
    if (isEditing && itemToEdit) {
      setFormData({
        itemName: itemToEdit.itemName || "",
        category: itemToEdit.category || "",
        quantityInStock: itemToEdit.quantityInStock || "",
        reorderLevel: itemToEdit.reorderLevel || "",
        costPrice: itemToEdit.costPrice || "",
        sellingPrice: itemToEdit.sellingPrice || "",
        batchNumber: itemToEdit.batchNumber || "",
        expiryDate: itemToEdit.expiryDate ? itemToEdit.expiryDate.split("T")[0] : "",
        supplier: itemToEdit.supplier || "",
        purchaseDate: itemToEdit.purchaseDate ? itemToEdit.purchaseDate.split("T")[0] : "",
        location: itemToEdit.location || "",
      });
    } else {
      setFormData(initialFormData);
    }
  }, [isEditing, itemToEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditing) {
        await updatePharmacy(itemToEdit._id, formData);
        toast.success("Pharmacy item updated successfully!");
      } else {
        await createPharmacy(formData);
        toast.success("Pharmacy item created successfully!");
      }

      setOpen(false);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const formFields = [
    "itemName", "category", "quantityInStock", "reorderLevel", "costPrice",
    "sellingPrice", "batchNumber", "expiryDate", "supplier", "purchaseDate", "location"
  ];

  const formatLabel = (field) => {
    const result = field.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {!propOpen && <Button className="bg-blue-600 hover:bg-blue-700">{buttonTitle}</Button>}
      </DialogTrigger>

      <DialogContent className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Update Pharmacy Item" : "Add New Item"}</DialogTitle>
          <DialogDescription>
            Fill out the form to {isEditing ? "update" : "add"} a pharmacy item.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          {formFields.map((field) => (
            <div
              key={field}
              className={["itemName", "supplier", "batchNumber", "location"].includes(field) ? "col-span-2" : "col-span-1"}
            >
              <Label htmlFor={field}>{formatLabel(field)}</Label>
              <Input
                type={
                  ["expiryDate", "purchaseDate"].includes(field)
                    ? "date"
                    : ["quantityInStock", "reorderLevel", "costPrice", "sellingPrice"].includes(field)
                    ? "number"
                    : "text"
                }
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
              />
            </div>
          ))}

          <DialogFooter className="col-span-2 mt-6">
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (isEditing ? "Updating..." : "Creating...") : "Submit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
