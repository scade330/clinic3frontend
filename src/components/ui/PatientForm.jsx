import { useState } from "react";
import axios from "axios";

export default function PatientForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/patient", formData);

      console.log(res.data);
      alert("Patient created successfully");
    } catch (error) {
      console.error(error);
      alert("Error creating patient");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="patient-form">
      <h2>Create New Patient</h2>

      <input
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="First Name"
        required
      />

      <input
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="Last Name"
        required
      />

      <input
        name="age"
        type="number"
        value={formData.age}
        onChange={handleChange}
        placeholder="Age"
      />

      <select
        name="gender"
        value={formData.gender}
        onChange={handleChange}
      >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      <input
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone Number"
      />

      <input
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="Address"
      />

      <button type="submit">Save Patient</button>
    </form>
  );
}
