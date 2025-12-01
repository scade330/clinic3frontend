// src/components/pharmacy/PharmacyList.jsx

import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import PharmacyDialogForm from './PharmacyDialogForm';

// Helper Icons
const EditIcon = () => <span role="img" aria-label="edit">✏️</span>;
const DeleteIcon = () => <span role="img" aria-label="delete">🗑️</span>;

const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch {
        return dateString;
    }
};

export default function PharmacyList() {
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [itemToEdit, setItemToEdit] = useState(null);

    const loadInventory = useCallback(async () => {
        setLoading(true);
        try {
            // GET /api/pharmacy - CORRECT
            const response = await axios.get('/api/pharmacy'); 
            setInventory(response.data.data || response.data || []);
        } catch (error) {
            console.error('Failed to load inventory:', error);
            toast.error('Failed to load pharmacy data.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadInventory();
    }, [loadInventory]);

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this inventory item?')) return;
        try {
            // --- CORRECTED API ENDPOINT ---
            await axios.delete(`/api/pharmacy/${id}`);
            // ------------------------------
            toast.success('Item deleted successfully!');
            loadInventory();
        } catch (err) {
            console.error('Delete failed:', err);
            toast.error('Deletion failed.');
        }
    };

    const handleEdit = (item) => {
        setItemToEdit(item);
    };

    const handleSuccess = () => {
        setItemToEdit(null);
        loadInventory();
    };
    
    const closeEditDialog = () => {
        setItemToEdit(null);
    }

    const filteredInventory = inventory.filter(item =>
        Object.values(item)
            .join(' ')
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    const headers = [
        'Item Name', 'Category', 'Stock', 'Price', 'Expiry Date', 'Supplier', 'Location'
    ];

    return (
        <div className="bg-white rounded-xl shadow-2xl border overflow-hidden">
            
            <div className="p-4 border-b">
                <input
                    type="text"
                    placeholder="Search item name, category, supplier..."
                    className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            
            {itemToEdit && (
                <PharmacyDialogForm 
                    itemToEdit={itemToEdit}
                    onSuccess={handleSuccess}
                    open={!!itemToEdit}
                    onOpenChange={closeEditDialog}
                />
            )}

            <div className="max-h-[70vh] overflow-y-auto">
                <table className="w-full text-left border-separate border-spacing-0">
                    <thead className="bg-blue-50 text-gray-600 uppercase text-sm sticky top-0 z-10 shadow-md">
                        <tr>
                            <th className="p-3 border-b border-gray-200">#</th>
                            {headers.map(header => (
                                <th key={header} className="p-3 border-b border-gray-200">{header}</th>
                            ))}
                            <th className="p-3 border-b border-gray-200 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading && (
                            <tr><td className="p-5 text-center text-blue-500 font-medium" colSpan={9}>Loading inventory...</td></tr>
                        )}
                        {!loading && filteredInventory.length === 0 && (
                            <tr><td className="p-5 text-center text-gray-500" colSpan={9}>No inventory items found.</td></tr>
                        )}
                        {!loading && filteredInventory.map((item, index) => (
                            <tr key={item._id} className="hover:bg-gray-50 transition border-b border-gray-100">
                                <td className="p-3 text-sm font-medium text-gray-500">{index + 1}</td>
                                <td className="p-3 font-medium">{item.itemName}</td>
                                <td className="p-3 text-sm">{item.category}</td>
                                <td className="p-3 font-mono text-center">{item.quantityInStock}</td>
                                <td className="p-3 text-green-700 font-semibold">${item.sellingPrice}</td>
                                <td className="p-3 text-red-600">{formatDate(item.expiryDate)}</td>
                                <td className="p-3">{item.supplier}</td>
                                <td className="p-3">{item.location}</td>
                                <td className="p-3 text-center space-x-2">
                                    <button 
                                        onClick={() => handleEdit(item)}
                                        className="text-yellow-600 hover:text-yellow-800 p-1 rounded transition"
                                    >
                                        <EditIcon />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="text-red-600 hover:text-red-800 p-1 rounded transition"
                                    >
                                        <DeleteIcon />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}