// import React from "react";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import PatientDialogForm from "./PatientDialogForm";

// export default function PatientCard({ patient, onDelete, onUpdate }) {
//   return (
//     <Card className="mb-4">
//       <CardHeader>
//         <CardTitle>{patient.firstName} {patient.lastName}</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <CardDescription>Age: {patient.age}</CardDescription>
//         <CardDescription>Gender: {patient.gender}</CardDescription>
//         <CardDescription>Phone: {patient.phone}</CardDescription>
//         <CardDescription>Address: {patient.address}</CardDescription>
//         <CardDescription>Medical History: {patient.medicalHistory}</CardDescription>

//         <div className="flex justify-end space-x-2 mt-4">
//           <PatientDialogForm
//             patientToEdit={patient}
//             buttonTitle="Update Patient"
//             onSuccess={onUpdate} // refresh list
//           />
//           <Button
//             onClick={() => onDelete(patient._id)}
//             className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
//           >
//             Delete
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }
