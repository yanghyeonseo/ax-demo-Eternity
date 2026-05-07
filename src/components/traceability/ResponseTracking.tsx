import type { Batch } from "@/types";
import { CheckCheck, GitBranch, Wrench } from "lucide-react";

export function ResponseTracking({ batch }: { batch: Batch }) {
  const total = batch.timeline.length;
  const closed = batch.timeline.filter((e) =>
    /closed|verified|passed/i.test(e.status),
  ).length;
  const open = total - closed;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
      <h3 className="mb-3 text-sm font-semibold text-slate-900">
        Response Tracking
      </h3>
      <div className="grid grid-cols-3 gap-3">
        <Cell
          icon={<GitBranch className="h-3.5 w-3.5" />}
          label="Total Events"
          value={total}
        />
        <Cell
          icon={<Wrench className="h-3.5 w-3.5" />}
          label="Open Actions"
          value={open}
          tone={open > 0 ? "warning" : "good"}
        />
        <Cell
          icon={<CheckCheck className="h-3.5 w-3.5" />}
          label="Closed"
          value={closed}
          tone="good"
        />
      </div>
      <p className="mt-3 rounded-lg border border-slate-100 bg-slate-50 p-3 text-[12px] leading-snug text-slate-600">
        Owner <span className="font-semibold text-slate-800">{batch.owner}</span>{" "}
        is currently leading the response. Once all open actions are closed and
        retest passes, this batch can move to{" "}
        <span className="font-semibold text-slate-800">Closed</span>.
      </p>
    </div>
  );
}

function Cell({
  icon,
  label,
  value,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  tone?: "good" | "warning";
}) {
  const valueClass =
    tone === "warning"
      ? "text-amber-600"
      : tone === "good"
        ? "text-emerald-600"
        : "text-slate-900";
  return (
    <div className="rounded-lg border border-slate-100 bg-slate-50/60 p-3 text-center">
      <p className="inline-flex items-center gap-1 text-[10.5px] font-semibold uppercase tracking-widest text-slate-500">
        {icon}
        {label}
      </p>
      <p className={`mt-1 text-2xl font-semibold ${valueClass}`}>{value}</p>
    </div>
  );
}
