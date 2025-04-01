import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const data = [
  { name: "Jan", value: 1200 },
  { name: "Fev", value: 800 },
  { name: "Mar", value: 1500 },
  { name: "Abr", value: 1000 },
  { name: "Mai", value: 900 },
  { name: "Jun", value: 1300 },
];

export default function ExpenseChart() {
  return (
    <ResponsiveContainer width="40%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#4B5563" />
        <YAxis stroke="#4B5563" />
        <Tooltip />
        <Bar dataKey="value" fill="#16A34A" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
