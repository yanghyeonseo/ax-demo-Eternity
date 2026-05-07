import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import dashboardData from "@/data/dashboard.json";

export function DefectTrendChart() {
  const data = dashboardData.defectTrend.map((d) => ({
    ...d,
    label: d.date.slice(5),
  }));

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
      <div className="mb-3 flex items-end justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            Defect Rate Trend
          </h3>
          <p className="text-xs text-slate-500">
            Last 7 days · target ≤ {dashboardData.targetYieldRate.toFixed(1)}%
            yield
          </p>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-slate-600">
          <span className="inline-flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-red-500" /> Defect %
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="h-0.5 w-3 rounded bg-emerald-500" /> Yield %
          </span>
        </div>
      </div>

      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <defs>
              <linearGradient id="defectFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11, fill: "#64748b" }}
              axisLine={{ stroke: "#e2e8f0" }}
              tickLine={false}
            />
            <YAxis
              yAxisId="left"
              tick={{ fontSize: 11, fill: "#64748b" }}
              axisLine={{ stroke: "#e2e8f0" }}
              tickLine={false}
              domain={[0, 3]}
              tickFormatter={(v) => `${v}%`}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fontSize: 11, fill: "#64748b" }}
              axisLine={{ stroke: "#e2e8f0" }}
              tickLine={false}
              domain={[97, 100]}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip
              contentStyle={{
                fontSize: 12,
                borderRadius: 8,
                border: "1px solid #e2e8f0",
                boxShadow: "0 6px 20px rgba(15,23,42,0.08)",
              }}
              formatter={(value, name) => [
                `${Number(value).toFixed(1)}%`,
                name === "defectRate" ? "Defect Rate" : "Yield Rate",
              ]}
            />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="defectRate"
              stroke="#ef4444"
              strokeWidth={2}
              fill="url(#defectFill)"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="yieldRate"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ r: 3, fill: "#10b981" }}
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
