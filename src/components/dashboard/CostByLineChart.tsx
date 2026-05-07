import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import dashboardData from "@/data/dashboard.json";

export function CostByLineChart() {
  const data = dashboardData.costByLine;
  const totalAll = data.reduce(
    (acc, l) => acc + l.scrap + l.rework + l.claim,
    0,
  );

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
      <div className="mb-3 flex items-end justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            Cost Impact by Line
          </h3>
          <p className="text-xs text-slate-500">
            Scrap · Rework · Claim — total{" "}
            <span className="font-semibold text-slate-700">
              ${totalAll.toLocaleString()}
            </span>
          </p>
        </div>
      </div>

      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
            barCategoryGap={18}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="line"
              tick={{ fontSize: 10.5, fill: "#64748b" }}
              axisLine={{ stroke: "#e2e8f0" }}
              tickLine={false}
              interval={0}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#64748b" }}
              axisLine={{ stroke: "#e2e8f0" }}
              tickLine={false}
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                fontSize: 12,
                borderRadius: 8,
                border: "1px solid #e2e8f0",
                boxShadow: "0 6px 20px rgba(15,23,42,0.08)",
              }}
              formatter={(v) => `$${Number(v).toLocaleString()}`}
            />
            <Legend
              verticalAlign="top"
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: 11, color: "#475569" }}
            />
            <Bar
              dataKey="scrap"
              stackId="a"
              fill="#ef4444"
              name="Scrap"
              radius={[0, 0, 0, 0]}
            />
            <Bar dataKey="rework" stackId="a" fill="#f59e0b" name="Rework" />
            <Bar
              dataKey="claim"
              stackId="a"
              fill="#6366f1"
              name="Claim"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
