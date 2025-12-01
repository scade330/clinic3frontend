import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer
} from "recharts";

const COLORS = ["#1e40af", "#dc2626", "#f59e0b", "#10b981"];

export default function ReportPage() {
  const [ageData, setAgeData] = useState([]);
  const [genderData, setGenderData] = useState([]);

  useEffect(() => {
    // Fetch age group data
    fetch("http://localhost:5000/api/report/age-group")
      .then((res) => res.json())
      .then((data) => {
        const chartData = Object.keys(data).map((key) => ({
          name: key,
          count: data[key],
        }));
        setAgeData(chartData);
      });

    // Fetch gender data
    fetch("http://localhost:5000/api/report/gender")
      .then((res) => res.json())
      .then((data) => {
        const chartData = Object.keys(data).map((key) => ({
          name: key,
          value: data[key],
        }));
        setGenderData(chartData);
      });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Patient Reports Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Age Group Bar Chart */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Patients by Age Group</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ageData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#1e40af" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gender Pie Chart */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Patients by Gender</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={genderData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {genderData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
