import type { ProcessNode as ProcessNodeType } from "@/types";
import { AlertOctagon, AlertTriangle, CheckCircle2 } from "lucide-react";

const STATUS_CFG = {
  active: {
    border: "border-emerald-300/70",
    bg: "bg-white",
    accent: "before:bg-emerald-500",
    Icon: CheckCircle2,
    iconCls: "text-emerald-500",
    chip: "text-emerald-700 bg-emerald-50 border-emerald-200",
    label: "ACTIVE",
  },
  warning: {
    border: "border-amber-300",
    bg: "bg-amber-50/40",
    accent: "before:bg-amber-500",
    Icon: AlertTriangle,
    iconCls: "text-amber-600",
    chip: "text-amber-700 bg-amber-100 border-amber-200",
    label: "WARNING",
  },
  critical: {
    border: "border-red-300",
    bg: "bg-red-50/50",
    accent: "before:bg-red-500",
    Icon: AlertOctagon,
    iconCls: "text-red-600",
    chip: "text-red-700 bg-red-100 border-red-200",
    label: "CRITICAL",
  },
  inactive: {
    border: "border-slate-200",
    bg: "bg-slate-50",
    accent: "before:bg-slate-300",
    Icon: CheckCircle2,
    iconCls: "text-slate-400",
    chip: "text-slate-600 bg-slate-100 border-slate-200",
    label: "INACTIVE",
  },
} as const;

export function ProcessNode({
  node,
  selected,
  onClick,
  compact = false,
}: {
  node: ProcessNodeType;
  selected?: boolean;
  onClick?: () => void;
  compact?: boolean;
}) {
  const cfg = STATUS_CFG[node.status];
  const Icon = cfg.Icon;
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative w-full overflow-hidden rounded-lg border ${cfg.border} ${cfg.bg} px-3 py-2.5 text-left shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition before:absolute before:inset-y-0 before:left-0 before:w-1 ${cfg.accent} ${
        selected
          ? "ring-2 ring-navy-400 ring-offset-2 ring-offset-slate-100"
          : "hover:-translate-y-px hover:shadow-md"
      } ${node.status === "active" ? "" : "blink-warn"}`}
    >
      <div className="flex items-start justify-between gap-2 pl-1.5">
        <div className="min-w-0 flex-1">
          <p className="truncate text-[12.5px] font-semibold text-slate-800">
            {node.name}
          </p>
          {!compact && (
            <p className="mt-0.5 truncate text-[10.5px] uppercase tracking-wider text-slate-500">
              {node.group}
            </p>
          )}
        </div>
        <Icon
          className={`h-3.5 w-3.5 shrink-0 ${cfg.iconCls} ${node.status === "active" ? "" : "blink-warn"}`}
          strokeWidth={2.4}
        />
      </div>
      <div className="mt-1.5 flex items-center justify-between gap-2 pl-1.5">
        <span
          className={`inline-flex items-center rounded-full border px-1.5 py-0.5 text-[9.5px] font-bold tracking-wider ${cfg.chip}`}
        >
          {cfg.label}
        </span>
        <div className="text-right text-[10.5px] leading-tight text-slate-500">
          <span className="font-semibold text-slate-700">
            {node.defectCount}
          </span>
          <span> def · </span>
          <span
            className={`font-semibold ${
              node.defectRate >= 3
                ? "text-red-600"
                : node.defectRate >= 1.5
                  ? "text-amber-600"
                  : "text-emerald-600"
            }`}
          >
            {node.defectRate.toFixed(1)}%
          </span>
        </div>
      </div>
    </button>
  );
}
