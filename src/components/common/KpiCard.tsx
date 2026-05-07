import type { ReactNode } from "react";
import { TrendingDown, TrendingUp, Minus } from "lucide-react";

type Trend = "up" | "down" | "flat";

export function KpiCard({
  label,
  value,
  unit,
  hint,
  trend,
  trendValue,
  tone = "default",
  icon,
}: {
  label: string;
  value: string | number;
  unit?: string;
  hint?: string;
  trend?: Trend;
  trendValue?: string;
  tone?: "default" | "warning" | "critical" | "good";
  icon?: ReactNode;
}) {
  const toneClasses =
    tone === "critical"
      ? "border-red-200 bg-gradient-to-br from-red-50 to-white"
      : tone === "warning"
        ? "border-amber-200 bg-gradient-to-br from-amber-50 to-white"
        : tone === "good"
          ? "border-emerald-200 bg-gradient-to-br from-emerald-50 to-white"
          : "border-slate-200 bg-white";

  const TrendIcon =
    trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
  const trendColor =
    trend === "up"
      ? "text-emerald-600"
      : trend === "down"
        ? "text-red-600"
        : "text-slate-400";

  return (
    <div
      className={`relative flex h-full flex-col gap-2 rounded-xl border p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)] ${toneClasses}`}
    >
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          {label}
        </p>
        {icon && <span className="text-slate-400">{icon}</span>}
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-semibold tracking-tight text-slate-900">
          {value}
        </span>
        {unit && (
          <span className="text-sm font-medium text-slate-500">{unit}</span>
        )}
      </div>
      <div className="mt-auto flex items-center justify-between">
        {hint && <p className="text-xs text-slate-500">{hint}</p>}
        {trend && trendValue && (
          <span className={`inline-flex items-center gap-0.5 text-xs font-semibold ${trendColor}`}>
            <TrendIcon className="h-3 w-3" />
            {trendValue}
          </span>
        )}
      </div>
    </div>
  );
}
