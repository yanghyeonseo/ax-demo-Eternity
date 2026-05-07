import { Factory, Hash, ListChecks, ShieldAlert, User } from "lucide-react";
import { ModuleStatusPill } from "@/components/common/StatusBadge";
import type { Batch } from "@/types";

export function BatchSummary({ batch }: { batch: Batch }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[10.5px] font-semibold uppercase tracking-widest text-slate-500">
            Batch Summary
          </p>
          <h2 className="mt-0.5 font-mono text-xl font-semibold text-slate-900">
            {batch.batchId}
          </h2>
          <p className="mt-1 text-sm text-slate-600">{batch.product}</p>
        </div>
        <div className="text-right">
          <ModuleStatusPill status={batch.status} />
          <p className="mt-2 text-[11px] text-slate-500">
            Yield rate
            <span
              className={`ml-1 text-base font-semibold ${
                batch.yieldRate >= 99
                  ? "text-emerald-600"
                  : batch.yieldRate >= 97
                    ? "text-amber-600"
                    : "text-red-600"
              }`}
            >
              {batch.yieldRate.toFixed(1)}%
            </span>
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-3">
        <Stat
          icon={<Hash className="h-3.5 w-3.5" />}
          label="Serial Range"
          value={batch.serialRange}
          mono
        />
        <Stat
          icon={<Factory className="h-3.5 w-3.5" />}
          label="Line"
          value={batch.line}
        />
        <Stat
          icon={<ListChecks className="h-3.5 w-3.5" />}
          label="Defect Count"
          value={String(batch.defectCount)}
          tone={batch.defectCount > 20 ? "critical" : batch.defectCount > 8 ? "warning" : "good"}
        />
        <Stat
          icon={<User className="h-3.5 w-3.5" />}
          label="Owner"
          value={batch.owner}
        />
      </div>

      <div className="mt-4 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50/60 p-3">
        <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-700">
            Main Issue
          </p>
          <p className="mt-0.5 text-sm font-medium text-slate-800">
            {batch.mainIssue}
          </p>
        </div>
      </div>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
  mono,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  mono?: boolean;
  tone?: "good" | "warning" | "critical";
}) {
  const valueClass =
    tone === "critical"
      ? "text-red-600"
      : tone === "warning"
        ? "text-amber-600"
        : tone === "good"
          ? "text-emerald-600"
          : "text-slate-900";
  return (
    <div className="rounded-lg border border-slate-100 bg-slate-50/60 p-2.5">
      <p className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-widest text-slate-500">
        {icon}
        {label}
      </p>
      <p
        className={`mt-1 text-[13px] font-semibold ${valueClass} ${mono ? "font-mono text-[12px]" : ""}`}
      >
        {value}
      </p>
    </div>
  );
}
