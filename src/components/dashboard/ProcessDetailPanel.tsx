import {
  AlertOctagon,
  CheckCircle2,
  Factory,
  PackageSearch,
  ShieldAlert,
  Wrench,
  X,
  DollarSign,
} from "lucide-react";
import { useAppStore } from "@/store/AppStore";
import { StatusBadge } from "@/components/common/StatusBadge";

export function ProcessDetailPanel() {
  const { processNodes, selectedProcessId, setSelectedProcessId } =
    useAppStore();
  const node = processNodes.find((n) => n.id === selectedProcessId);

  if (!node) {
    return (
      <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white p-6 text-center text-sm text-slate-500">
        Select a process node on the map to view its detail.
      </div>
    );
  }

  const fmtUsd = (v: number) =>
    v.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
      <div
        className={`flex items-start justify-between gap-3 border-b px-5 py-4 ${
          node.status === "critical"
            ? "border-red-200 bg-gradient-to-r from-red-50 to-white"
            : node.status === "warning"
              ? "border-amber-200 bg-gradient-to-r from-amber-50 to-white"
              : "border-slate-200 bg-gradient-to-r from-slate-50 to-white"
        }`}
      >
        <div className="min-w-0">
          <p className="text-[10.5px] font-semibold uppercase tracking-widest text-slate-500">
            Process Detail · {node.id}
          </p>
          <h3 className="mt-0.5 truncate text-base font-semibold text-slate-900">
            {node.name}
          </h3>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <StatusBadge status={node.status} />
            {node.productLine && (
              <span className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-0.5 text-[11px] font-medium text-slate-600">
                <Factory className="h-3 w-3 text-slate-400" />
                {node.productLine}
              </span>
            )}
            <span className="inline-flex items-center rounded-md border border-slate-200 bg-white px-2 py-0.5 text-[11px] font-medium text-slate-600">
              {node.group}
            </span>
          </div>
        </div>
        <button
          type="button"
          aria-label="Close detail"
          onClick={() => setSelectedProcessId(null)}
          className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 border-b border-slate-100 px-5 py-4">
        <Stat
          label="Defect Rate"
          value={`${node.defectRate.toFixed(1)}%`}
          tone={
            node.defectRate >= 3
              ? "critical"
              : node.defectRate >= 1.5
                ? "warning"
                : "good"
          }
        />
        <Stat label="Defect Count Today" value={String(node.defectCount)} />
        <Stat
          label="Estimated Cost Impact"
          value={node.estimatedCost ? fmtUsd(node.estimatedCost) : "—"}
          tone={node.estimatedCost && node.estimatedCost > 8000 ? "critical" : undefined}
          icon={<DollarSign className="h-3.5 w-3.5" />}
        />
        <Stat
          label="Affected Batch"
          value={node.affectedBatch ?? "—"}
          mono
          icon={<PackageSearch className="h-3.5 w-3.5" />}
        />
      </div>

      <div className="space-y-4 overflow-y-auto px-5 py-4 text-sm">
        <Section
          icon={<ShieldAlert className="h-3.5 w-3.5 text-red-500" />}
          title="Main Defect Type"
        >
          <p className="text-slate-700">
            {node.mainDefectType ?? "No defect data available."}
          </p>
        </Section>

        <Section
          icon={<CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />}
          title="Current Response"
        >
          <p className="text-slate-700">
            {node.currentResponse ?? "No response yet."}
          </p>
        </Section>

        <Section
          icon={<Wrench className="h-3.5 w-3.5 text-navy-500" />}
          title="Recommended Action"
        >
          <p className="rounded-lg border border-navy-100 bg-navy-50/50 p-3 text-slate-700">
            {node.recommendedAction ?? "Continue monitoring."}
          </p>
        </Section>

        {node.status !== "active" && (
          <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-[12px] text-amber-800">
            <AlertOctagon className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span>
              This node requires attention. Open Defect Records or
              Traceability to dig deeper.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  tone,
  icon,
  mono,
}: {
  label: string;
  value: string;
  tone?: "warning" | "critical" | "good";
  icon?: React.ReactNode;
  mono?: boolean;
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
        className={`mt-1 text-base font-semibold ${valueClass} ${mono ? "font-mono text-[13px]" : ""}`}
      >
        {value}
      </p>
    </div>
  );
}

function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-1.5 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-slate-500">
        {icon}
        {title}
      </p>
      {children}
    </div>
  );
}
