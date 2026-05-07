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
  layout = "card",
}: {
  label: string;
  value: string | number;
  unit?: string;
  hint?: string;
  trend?: Trend;
  trendValue?: string;
  tone?: "default" | "warning" | "critical" | "good";
  icon?: ReactNode;
  layout?: "card" | "strip";
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
  const stripToneClasses =
    tone === "critical"
      ? {
          bg: "bg-gradient-to-br from-red-50 to-white",
          icon: "text-red-400",
        }
      : tone === "warning"
        ? {
            bg: "bg-gradient-to-br from-amber-50 to-white",
            icon: "text-amber-500",
          }
        : tone === "good"
          ? {
              bg: "bg-gradient-to-br from-emerald-50 to-white",
              icon: "text-emerald-500",
            }
          : {
              bg: "bg-white",
              icon: "text-slate-400",
            };

  if (layout === "strip") {
    return (
      <div
        className={`flex h-full min-w-0 flex-col justify-center gap-1.5 px-3 py-2 ${stripToneClasses.bg}`}
      >
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
            {label}
          </p>
          {icon && (
            <span className={`shrink-0 ${stripToneClasses.icon}`}>{icon}</span>
          )}
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-baseline gap-1">
            <span className="truncate text-[1.4rem] font-semibold tracking-tight text-slate-900">
              {value}
            </span>
            {unit && (
              <span className="shrink-0 text-[12px] font-medium text-slate-500">
                {unit}
              </span>
            )}
          </div>
          {(hint || trendValue) && (
            <div className="flex shrink-0 flex-col items-end justify-center gap-0.5 text-right leading-tight">
              {hint && (
                <span className="max-w-[112px] text-[10px] font-medium text-slate-500">
                  {hint}
                </span>
              )}
              {trend && trendValue && (
                <span
                  className={`inline-flex max-w-[112px] items-center justify-end gap-0.5 text-[10px] font-semibold ${trendColor}`}
                >
                  <TrendIcon className="h-3 w-3" />
                  <span>{trendValue}</span>
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

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
