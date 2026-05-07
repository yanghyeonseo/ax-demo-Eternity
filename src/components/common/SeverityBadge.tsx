import { AlertTriangle, AlertOctagon, Info } from "lucide-react";
import type { Severity } from "@/types";

export function SeverityBadge({ severity }: { severity: Severity }) {
  const map = {
    Info: {
      cls: "bg-sky-50 text-sky-700 border-sky-200",
      Icon: Info,
    },
    Warning: {
      cls: "bg-amber-50 text-amber-700 border-amber-200",
      Icon: AlertTriangle,
    },
    Critical: {
      cls: "bg-red-50 text-red-700 border-red-200",
      Icon: AlertOctagon,
    },
  } as const;
  const { cls, Icon } = map[severity];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${cls}`}
    >
      <Icon className="h-3 w-3" strokeWidth={2.4} />
      {severity}
    </span>
  );
}
