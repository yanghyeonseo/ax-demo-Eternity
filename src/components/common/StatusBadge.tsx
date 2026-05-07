import type { ProcessStatus } from "@/types";

const STATUS_STYLES: Record<ProcessStatus, { dot: string; label: string; text: string; bg: string; border: string }> = {
  active: {
    dot: "bg-emerald-500",
    label: "Active",
    text: "text-emerald-700",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
  },
  warning: {
    dot: "bg-amber-500",
    label: "Warning",
    text: "text-amber-700",
    bg: "bg-amber-50",
    border: "border-amber-200",
  },
  critical: {
    dot: "bg-red-500",
    label: "Critical",
    text: "text-red-700",
    bg: "bg-red-50",
    border: "border-red-200",
  },
  inactive: {
    dot: "bg-slate-400",
    label: "Inactive",
    text: "text-slate-600",
    bg: "bg-slate-100",
    border: "border-slate-200",
  },
};

export function StatusBadge({
  status,
  withDot = true,
  className = "",
}: {
  status: ProcessStatus;
  withDot?: boolean;
  className?: string;
}) {
  const s = STATUS_STYLES[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${s.bg} ${s.text} ${s.border} ${className}`}
    >
      {withDot && (
        <span
          className={`h-1.5 w-1.5 rounded-full ${s.dot} ${status === "active" ? "pulse-active" : status === "warning" || status === "critical" ? "blink-warn" : ""}`}
        />
      )}
      {s.label}
    </span>
  );
}

export function ModuleStatusPill({ status }: { status: string }) {
  const lower = status.toLowerCase();
  const tone = lower.includes("critical")
    ? "bg-red-50 text-red-700 border-red-200"
    : lower.includes("warning")
      ? "bg-amber-50 text-amber-700 border-amber-200"
      : lower.includes("pending")
        ? "bg-slate-100 text-slate-600 border-slate-200"
        : lower.includes("info")
          ? "bg-sky-50 text-sky-700 border-sky-200"
          : lower.includes("rework")
            ? "bg-violet-50 text-violet-700 border-violet-200"
            : lower.includes("verified") || lower.includes("passed") || lower.includes("closed")
              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
              : "bg-slate-50 text-slate-600 border-slate-200";
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-medium ${tone}`}
    >
      {status}
    </span>
  );
}
