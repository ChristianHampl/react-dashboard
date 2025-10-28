import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "Total", value: 63 },
  { name: "Einkauf", value: 37 },
];

const COLORS = ["#8C00FF", "#FF3F7F", "#FFC400", "#450693"];

export default function PieChartExample() {
  return (
     <div style={{ width: "70%", height: "70%" }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
            outerRadius="80%"
            dataKey="value"
            stroke="none" 
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
