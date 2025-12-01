// src/pages/PharmacyviewPage.jsx

import PharmacyDialogForm from "../../components/pharmacy/PharmacyDialogForm";
import PharmacyList from "../../components/pharmacy/PharmacyList"; 

export default function PharmacyviewPage() {
    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
                <h1 className="text-3xl font-bold text-gray-800">
                    Pharmacy Inventory Management 💊
                </h1>
                <PharmacyDialogForm buttonTitle="+ Add New Item" />
            </div>
            <PharmacyList />
        </div>
    );
}