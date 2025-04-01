interface OverviewCardProps {
    title: string;
    value: string;
    color: "green" | "blue" | "red";
  }
  
  export default function OverviewCard({ title, value, color }: OverviewCardProps) {
    const colors = {
      green: "bg-green-100 text-green-700",
      blue: "bg-blue-100 text-blue-700",
      red: "bg-red-100 text-red-700",
    };
  
    return (
      <div className={`p-4 rounded-xl shadow ${colors[color]}`}>
        <h3 className="text-sm font-medium">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    );
  }
  