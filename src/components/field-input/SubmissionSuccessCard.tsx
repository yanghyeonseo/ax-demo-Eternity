import { ArrowRight, CheckCircle2, X } from "lucide-react";
import type { DefectInput, DefectRecord } from "@/types";
import { useAppStore } from "@/store/AppStore";

export function SubmissionSuccessCard({
  record,
  draft,
  onDismiss,
}: {
  record: DefectRecord;
  draft: DefectInput;
  onDismiss: () => void;
}) {
  const { setPage } = useAppStore();

  return (
    <div className="overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
      <div className="flex items-start justify-between border-b border-emerald-200/70 px-6 py-4">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-white shadow">
            <CheckCircle2 className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-base font-semibold text-emerald-900">
              Defect report submitted successfully.
            </h3>
            <p className="text-xs text-emerald-800/80">
              Record <span className="font-mono">{record.id}</span> · added to
              runtime state.
            </p>
          </div>
        </div>
        <button
          type="button"
          aria-label="Dismiss"
          onClick={onDismiss}
          className="rounded-md p-1 text-emerald-600 hover:bg-emerald-100"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 px-6 py-4 text-[12.5px] text-slate-700">
        <Row k="Product" v={draft.product} />
        <Row k="Module" v={draft.module} />
        <Row k="Process" v={draft.process} />
        <Row k="Defect Type" v={draft.defectType} />
        <Row k="Quantity" v={String(draft.quantity)} />
        <Row k="Severity" v={draft.severity} />
        {draft.batchId && <Row k="Batch ID" v={draft.batchId} mono />}
      </div>

      <div className="border-t border-emerald-200/70 bg-emerald-50/40 px-6 py-3">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-emerald-700">
          Updated
        </p>
        <ul className="grid grid-cols-2 gap-y-1 text-[12px] text-emerald-800">
          <li>✓ Defect Records table</li>
          <li>✓ Dashboard Recent Records</li>
          <li>✓ Field Input Recent Inputs</li>
          <li>✓ Process map status updated</li>
        </ul>
      </div>

      <div className="flex flex-wrap gap-2 border-t border-emerald-200/70 px-6 py-3">
        <button
          type="button"
          onClick={() => setPage("dashboard")}
          className="inline-flex items-center gap-1.5 rounded-lg bg-navy-600 px-3 py-2 text-xs font-semibold text-white hover:bg-navy-700"
        >
          View on Dashboard
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={() => setPage("defect-records")}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:border-navy-300 hover:text-navy-700"
        >
          Open Defect Records
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

function Row({ k, v, mono }: { k: string; v: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between border-b border-emerald-100/60 py-1 last:border-b-0">
      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
        {k}
      </span>
      <span
        className={`font-medium text-slate-800 ${mono ? "font-mono text-[12px]" : ""}`}
      >
        {v}
      </span>
    </div>
  );
}
